import { useEffect, useState } from 'react';
import { calculator, VAT_RENOVATION } from '@/data/pricing';
import { currentLand, type Land } from '@/lib/country';
import { euro, round50 } from '@/lib/price';
import type { Lang } from '@/i18n';

/**
 * Price calculator (briefing Robbe; flow modelled on sanumur.be): rising damp wall by wall, with the
 * state of the building and repair yes/no per wall, or a basement from its floor area and height.
 * Unlike Sanu Mur the range shows straight away, without asking for contact details first.
 * Belgian visitors see it incl. 6 % btw, Dutch visitors excl. btw. The quote button carries the
 * input to the form.
 */

type Kind = 'rising' | 'basement';
type State = 'bewoond' | 'ruwbouw';
interface Wall {
  id: number;
  /** As typed, so the field can be empty while the visitor types (no "0" stuck in front). */
  length: string;
  repair: boolean;
}

/** "2,5" or "2.5" → 2.5, empty → 0, kept between 0 and max. */
const parse = (value: string, max: number) => Math.min(max, Math.max(0, parseFloat(value.replace(',', '.')) || 0));
/** Digits and one decimal separator only. */
const clean = (value: string) => value.replace(/[^\d.,]/g, '').replace(/([.,].*)[.,]/g, '$1');
const MAX_LENGTH = 200;

const TEXT = {
  nl: {
    title: 'Bereken een richtprijs',
    tabs: { rising: 'Opstijgend vocht', basement: 'Kelder waterdicht maken' },
    state: 'Staat van het gebouw',
    states: {
      bewoond: { name: 'Bewoond', text: 'Je woont er. We injecteren en kunnen de vochtschade herstellen: afkappen, zoutmembraan en nieuw pleisterwerk tot 1 m hoog.' },
      ruwbouw: { name: 'In renovatie (onbewoond)', text: 'We injecteren de blote muren. De afwerking doet je aannemer of stukadoor.' },
    },
    walls: 'Aangetaste muren',
    wall: (n: number) => `Muur ${n}`,
    length: 'Lengte',
    m: 'm',
    treatment: 'Behandeling',
    injectionOnly: 'Enkel injectie',
    withRepair: 'Injectie + herstel',
    addWall: 'Muur toevoegen',
    removeWall: (n: number) => `Muur ${n} verwijderen`,
    floor: 'Vloeroppervlakte van de kelder',
    floorUnit: 'm²',
    height: 'Hoogte van de kelder',
    heightUnit: 'm',
    result: 'Richtprijs',
    summary: (walls: number, lm: number) => `${walls} ${walls === 1 ? 'muur' : 'muren'}, ${lm.toLocaleString('nl-BE')} lopende meter`,
    minimum: (amount: string) => `Inclusief het minimumbedrag per opdracht (${amount}).`,
    vat: { be: 'incl. 6\u00a0% btw', nl: 'excl. btw' },
    note: 'Indicatief, exacte prijs na gratis diagnose.',
    button: 'Vraag advies of offerte aan',
    info: (input: string, price: string) => `Rekenmodule: ${input}; richtprijs ${price}.`,
    risingInput: (state: State, walls: Wall[]) =>
      `opstijgend vocht, ${state === 'bewoond' ? 'bewoond' : 'in renovatie'}; ` +
      walls.map((w, i) => `muur ${i + 1}: ${parse(w.length, MAX_LENGTH)} m ${state === 'bewoond' && w.repair ? 'injectie + herstel' : 'injectie'}`).join('; '),
    basementInput: (floor: number, height: number) => `kelder van ${floor} m², ${height.toLocaleString('nl-BE')} m hoog`,
  },
  fr: {
    title: 'Calculez un prix indicatif',
    tabs: { rising: 'Humidité ascensionnelle', basement: 'Étanchéité de cave' },
    state: 'État du bâtiment',
    states: {
      bewoond: { name: 'Habité', text: 'Vous y habitez. Nous injectons et pouvons réparer les dégâts : piquage, membrane anti-sels et nouvel enduit jusqu’à 1 m de haut.' },
      ruwbouw: { name: 'En rénovation (inhabité)', text: 'Nous injectons les murs nus. La finition est pour votre entrepreneur ou votre plafonneur.' },
    },
    walls: 'Murs touchés',
    wall: (n: number) => `Mur ${n}`,
    length: 'Longueur',
    m: 'm',
    treatment: 'Traitement',
    injectionOnly: 'Injection seule',
    withRepair: 'Injection + réparation',
    addWall: 'Ajouter un mur',
    removeWall: (n: number) => `Supprimer le mur ${n}`,
    floor: 'Surface au sol de la cave',
    floorUnit: 'm²',
    height: 'Hauteur de la cave',
    heightUnit: 'm',
    result: 'Prix indicatif',
    summary: (walls: number, lm: number) => `${walls} mur${walls === 1 ? '' : 's'}, ${lm.toLocaleString('fr-BE')} mètres courants`,
    minimum: (amount: string) => `Montant minimum par chantier compris (${amount}).`,
    vat: { be: 'TVA 6 % incl.', nl: 'hors TVA' },
    note: 'Indicatif, prix exact après le diagnostic gratuit.',
    button: 'Demandez conseil ou un devis',
    info: (input: string, price: string) => `Calculateur : ${input} ; prix indicatif ${price}.`,
    risingInput: (state: State, walls: Wall[]) =>
      `humidité ascensionnelle, ${state === 'bewoond' ? 'habité' : 'en rénovation'} ; ` +
      walls.map((w, i) => `mur ${i + 1} : ${parse(w.length, MAX_LENGTH)} m ${state === 'bewoond' && w.repair ? 'injection + réparation' : 'injection'}`).join(' ; '),
    basementInput: (floor: number, height: number) => `cave de ${floor} m², ${height.toLocaleString('fr-BE')} m de haut`,
  },
};

const MAX_WALLS = 10;
const SERVICE: Record<Kind, string> = { rising: 'opstijgend-vocht', basement: 'kelder-waterdicht-maken' };

interface Props {
  lang: Lang;
  /** One calculator, or both with tabs (the calculator page). */
  kind: Kind | 'both';
  /** Quote form URL, without query. */
  quote: string;
}

export default function PriceCalculator({ lang, kind, quote }: Props) {
  const t = TEXT[lang];
  const [land, setLand] = useState<Land>('be');
  const [tab, setTab] = useState<Kind>(kind === 'basement' ? 'basement' : 'rising');
  const [state, setState] = useState<State>('bewoond');
  const [walls, setWalls] = useState<Wall[]>([{ id: 1, length: '8', repair: true }]);
  const [floorText, setFloor] = useState('40');
  const [heightText, setHeight] = useState('2,2');
  const floor = parse(floorText, 1000);
  const height = parse(heightText, 6);

  useEffect(() => {
    setLand(currentLand());
    const onLand = (e: Event) => setLand((e as CustomEvent<Land>).detail);
    window.addEventListener('dh:land', onLand);
    return () => window.removeEventListener('dh:land', onLand);
  }, []);

  // Calculator prices are incl. 6 % btw; Dutch visitors see them excl. btw.
  const vat = land === 'nl' ? 1 / (1 + VAT_RENOVATION) : 1;
  const { minimum } = calculator;
  let low: number;
  let high: number;
  let input: string;
  let summary = '';
  if (tab === 'rising') {
    const [inLow, inHigh] = calculator.rising.injection;
    const per = (w: Wall) => (state === 'bewoond' && w.repair ? calculator.rising.repair : 0);
    const lm = (w: Wall) => parse(w.length, MAX_LENGTH);
    low = walls.reduce((sum, w) => sum + lm(w) * (inLow + per(w)), 0);
    high = walls.reduce((sum, w) => sum + lm(w) * (inHigh + per(w)), 0);
    input = t.risingInput(state, walls);
    summary = t.summary(walls.length, walls.reduce((sum, w) => sum + parse(w.length, MAX_LENGTH), 0));
  } else {
    const perimeter = 4 * Math.sqrt(floor);
    const wallArea = perimeter * height;
    const { perM2, jointPerLm } = calculator.basement;
    low = wallArea * perM2 + perimeter * jointPerLm;
    high = (wallArea + floor) * perM2 + perimeter * jointPerLm;
    input = t.basementInput(floor, height);
  }
  const atMinimum = low < minimum;
  low = Math.max(minimum, low);
  high = Math.max(minimum, high);
  // The minimum is shown exactly (not rounded to € 50), and once as a single amount when the whole range is below it.
  const show = (amount: number) => euro(amount === minimum ? amount * vat : round50(amount * vat), lang);
  const price = high === minimum ? show(minimum) : `${show(low)} – ${show(high)}`;
  const href = `${quote}?probleem=${SERVICE[tab]}&info=${encodeURIComponent(t.info(input, `${price} ${t.vat[land]}`))}`;

  const updateWall = (id: number, change: Partial<Wall>) => setWalls((ws) => ws.map((w) => (w.id === id ? { ...w, ...change } : w)));
  const addWall = () => setWalls((ws) => [...ws, { id: Math.max(...ws.map((w) => w.id)) + 1, length: '5', repair: ws[ws.length - 1].repair }]);

  const field = 'rounded-xl border-0 bg-white px-3 py-2.5 text-base text-ink ring-1 ring-ink/10 focus:ring-2 focus:ring-tide-500 focus:outline-none';
  const numberField = `${field} w-20 text-right font-semibold tabular-nums`;
  // Text fields with a decimal keyboard: number fields keep a "0" the visitor has to delete first.
  // The content is selected on focus (after the click that focused it), so typing replaces it.
  const numberInput = (value: string, set: (v: string) => void) => (
    <input type="text" inputMode="decimal" autoComplete="off" value={value} onFocus={(e) => { const el = e.target; requestAnimationFrame(() => el.select()); }} onChange={(e) => set(clean(e.target.value))} className={numberField} />
  );
  const row = (label: string, value: string, set: (v: string) => void, unit: string) => (
    <label className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
      <span className="text-sm font-medium text-ink/75">{label}</span>
      <span className="flex items-center gap-2">
        {numberInput(value, set)}
        <span className="w-8 text-sm text-ink/60">{unit}</span>
      </span>
    </label>
  );

  return (
    <div className="rounded-2xl bg-sand-100 p-5 sm:p-6">
      <p className="font-display text-lg font-semibold">{t.title}</p>

      {kind === 'both' && (
        <div role="tablist" className="mt-4 grid grid-cols-2 gap-1 rounded-full bg-white p-1 ring-1 ring-ink/8">
          {(['rising', 'basement'] as const).map((k) => (
            <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={`rounded-full px-3 py-2.5 text-sm font-semibold transition-colors ${tab === k ? 'bg-tide-500 text-white' : 'text-ink/70 hover:bg-sand-100'}`}>
              {t.tabs[k]}
            </button>
          ))}
        </div>
      )}

      {tab === 'rising' ? (
        <div className="mt-5 grid gap-6">
          <fieldset>
            <legend className="text-sm font-semibold">{t.state}</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {(['bewoond', 'ruwbouw'] as const).map((st) => (
                <label key={st} className={`cursor-pointer rounded-xl bg-white p-3.5 ring-1 transition-shadow ${state === st ? 'ring-2 ring-tide-500' : 'ring-ink/10 hover:ring-tide-500/40'}`}>
                  <span className="flex items-center gap-2 font-semibold">
                    <input type="radio" name={`dh-state-${lang}`} checked={state === st} onChange={() => setState(st)} className="size-4 accent-tide-500" />
                    {t.states[st].name}
                  </span>
                  <span className="mt-1 block text-sm leading-snug text-ink/65">{t.states[st].text}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-semibold">{t.walls}</legend>
            <ol className="mt-2 grid gap-2">
              {walls.map((w, i) => (
                <li key={w.id} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2 rounded-xl bg-white p-3 ring-1 ring-ink/8 sm:grid-cols-[5rem_auto_1fr_auto]">
                  <span className="text-sm font-semibold sm:order-none">{t.wall(i + 1)}</span>
                  {walls.length > 1 ? (
                    <button type="button" onClick={() => setWalls((ws) => ws.filter((x) => x.id !== w.id))} aria-label={t.removeWall(i + 1)} className="grid size-9 place-items-center justify-self-end rounded-full text-ink/50 hover:bg-sand-100 hover:text-ink sm:order-last">
                      <span aria-hidden="true" className="text-xl leading-none">×</span>
                    </button>
                  ) : (
                    <span className="sm:order-last sm:w-9" aria-hidden="true" />
                  )}
                  <label className="flex items-center gap-2">
                    <span className="sr-only">{t.length} {t.wall(i + 1)}</span>
                    {numberInput(w.length, (v) => updateWall(w.id, { length: v }))}
                    <span className="text-sm text-ink/60">{t.m}</span>
                  </label>
                  {state === 'bewoond' ? (
                    <label className="max-sm:col-span-2">
                      <span className="sr-only">{t.treatment} {t.wall(i + 1)}</span>
                      <select value={w.repair ? 'repair' : 'injection'} onChange={(e) => updateWall(w.id, { repair: e.target.value === 'repair' })} className={`${field} w-full`}>
                        <option value="repair">{t.withRepair}</option>
                        <option value="injection">{t.injectionOnly}</option>
                      </select>
                    </label>
                  ) : (
                    <span className="text-sm text-ink/60 max-sm:col-span-2">{t.injectionOnly}</span>
                  )}
                </li>
              ))}
            </ol>
            {walls.length < MAX_WALLS && (
              <button type="button" onClick={addWall} className="mt-2 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-tide-500 hover:bg-white">
                <span aria-hidden="true" className="text-lg leading-none">+</span> {t.addWall}
              </button>
            )}
          </fieldset>
        </div>
      ) : (
        <div className="mt-5 grid gap-3">
          {row(t.floor, floorText, setFloor, t.floorUnit)}
          {row(t.height, heightText, setHeight, t.heightUnit)}
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-ink/10 pt-5">
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-ink/65 uppercase">{t.result}</p>
          <p className="mt-1 font-display text-2xl font-semibold tracking-tight text-tide-600 tabular-nums sm:text-3xl" aria-live="polite">{price}</p>
          <p className="mt-1 text-sm text-ink/60">
            {summary && <>{summary} · </>}
            {t.vat[land]} · {t.note}
          </p>
          {atMinimum && <p className="mt-1 text-sm text-ink/60">{t.minimum(euro(minimum * vat, lang))}</p>}
        </div>
        <a href={href} className="btn-primary">{t.button} <span aria-hidden="true">→</span></a>
      </div>
    </div>
  );
}
