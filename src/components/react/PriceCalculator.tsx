import { useEffect, useState } from 'react';
import { calculator, VAT_RENOVATION } from '@/data/pricing';
import { currentLand, type Land } from '@/lib/country';
import { euro, round50 } from '@/lib/price';
import type { Lang } from '@/i18n';

/**
 * Price calculator on the opstijgend-vocht and kelder pages (briefing Robbe): the visitor enters
 * lopende meter wall, or the basement's floor area and height, and gets a range. Belgian visitors
 * see it incl. 6 % btw, Dutch visitors excl. btw. The quote button carries the input to the form.
 */

const TEXT = {
  nl: {
    title: 'Bereken een richtprijs',
    rising: 'Lengte van de aangetaste muren',
    risingUnit: 'lopende meter',
    floor: 'Vloeroppervlakte van de kelder',
    floorUnit: 'm²',
    height: 'Hoogte van de kelder',
    heightUnit: 'm',
    result: 'Richtprijs',
    vat: { be: 'incl. 6 % btw', nl: 'excl. btw' },
    note: 'Indicatief, exacte prijs na gratis diagnose.',
    button: 'Vraag advies of offerte aan',
    info: (input: string, price: string) => `Rekenmodule: ${input}, richtprijs ${price}.`,
    risingInput: (lm: number) => `${lm} lopende meter muur`,
    basementInput: (floor: number, height: number) => `kelder van ${floor} m², ${height.toLocaleString('nl-BE')} m hoog`,
  },
  fr: {
    title: 'Calculez un prix indicatif',
    rising: 'Longueur des murs touchés',
    risingUnit: 'mètres courants',
    floor: 'Surface au sol de la cave',
    floorUnit: 'm²',
    height: 'Hauteur de la cave',
    heightUnit: 'm',
    result: 'Prix indicatif',
    vat: { be: 'TVA 6 % incl.', nl: 'hors TVA' },
    note: 'Indicatif, prix exact après le diagnostic gratuit.',
    button: 'Demandez conseil ou un devis',
    info: (input: string, price: string) => `Calculateur : ${input}, prix indicatif ${price}.`,
    risingInput: (lm: number) => `${lm} mètres courants de mur`,
    basementInput: (floor: number, height: number) => `cave de ${floor} m², ${height.toLocaleString('fr-BE')} m de haut`,
  },
};

interface Props {
  lang: Lang;
  kind: 'rising' | 'basement';
  /** Quote form URL including ?probleem=<slug>. */
  quote: string;
}

export default function PriceCalculator({ lang, kind, quote }: Props) {
  const t = TEXT[lang];
  const [land, setLand] = useState<Land>('be');
  const [lm, setLm] = useState(20);
  const [floor, setFloor] = useState(40);
  const [height, setHeight] = useState(2.2);

  useEffect(() => {
    setLand(currentLand());
    const onLand = (e: Event) => setLand((e as CustomEvent<Land>).detail);
    window.addEventListener('dh:land', onLand);
    return () => window.removeEventListener('dh:land', onLand);
  }, []);

  // Calculator prices are incl. 6 % btw; Dutch visitors see them excl. btw.
  const vat = land === 'nl' ? 1 / (1 + VAT_RENOVATION) : 1;
  let low: number;
  let high: number;
  let input: string;
  if (kind === 'rising') {
    low = Math.max(calculator.minimum, lm * calculator.rising.low);
    high = Math.max(calculator.minimum, lm * calculator.rising.high);
    input = t.risingInput(lm);
  } else {
    const perimeter = 4 * Math.sqrt(floor);
    const walls = perimeter * height;
    const { perM2, jointPerLm } = calculator.basement;
    low = Math.max(calculator.minimum, walls * perM2 + perimeter * jointPerLm);
    high = Math.max(calculator.minimum, (walls + floor) * perM2 + perimeter * jointPerLm);
    input = t.basementInput(floor, height);
  }
  const price = `${euro(round50(low * vat), lang)} – ${euro(round50(high * vat), lang)}`;
  const href = `${quote}&info=${encodeURIComponent(t.info(input, `${price} ${t.vat[land]}`))}`;

  const field = 'w-24 rounded-xl border-0 bg-white px-3 py-2.5 text-right text-base font-semibold tabular-nums ring-1 ring-ink/10 focus:ring-2 focus:ring-tide-500 focus:outline-none';
  const row = (label: string, value: number, set: (v: number) => void, unit: string, min: number, max: number, step: number) => (
    <label className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
      <span className="text-sm font-medium text-ink/75">{label}</span>
      <span className="flex items-center gap-2">
        <input type="number" inputMode="decimal" min={min} max={max} step={step} value={value} onChange={(e) => set(Math.min(max, Math.max(0, Number(e.target.value) || 0)))} className={field} />
        <span className="w-24 text-sm text-ink/60">{unit}</span>
      </span>
    </label>
  );

  return (
    <div className="mt-8 rounded-2xl bg-sand-100 p-5 sm:p-6">
      <p className="font-display text-lg font-semibold">{t.title}</p>
      <div className="mt-4 grid gap-3">
        {kind === 'rising' ? (
          row(t.rising, lm, setLm, t.risingUnit, 1, 500, 1)
        ) : (
          <>
            {row(t.floor, floor, setFloor, t.floorUnit, 1, 1000, 1)}
            {row(t.height, height, setHeight, t.heightUnit, 1, 6, 0.1)}
          </>
        )}
      </div>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-t border-ink/10 pt-5">
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-ink/55 uppercase">{t.result}</p>
          <p className="mt-1 font-display text-2xl font-semibold tracking-tight text-tide-600 tabular-nums sm:text-3xl" aria-live="polite">{price}</p>
          <p className="mt-1 text-sm text-ink/60">{t.vat[land]} · {t.note}</p>
        </div>
        <a href={href} className="btn-primary">{t.button} <span aria-hidden="true">→</span></a>
      </div>
    </div>
  );
}
