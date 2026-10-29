import { useEffect, useRef, useState } from 'react';
import { animate, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import Building, { type ZoneState } from './Building';

/**
 * Homepage scroll story: the whole building, zone by zone. Each step first shows the problem
 * in that zone, then the treatment; the moisture meter follows the zone and ends on "Droog".
 *
 * Scroll drives it on every screen: the scene is pinned (on phones under the header, with only the
 * current step below it) while a tall track scrolls past. Reduced motion: the finished state, all steps listed.
 */

const TEXT = {
  nl: {
    eyebrow: 'Onze aanpak',
    title: 'Van kelder tot dak, zone per zone.',
    scene: 'Doorsnede van een gebouw met zes zones: kelder, liftput, muurvoet, gevel, balkon en binnenlucht',
    steps: [
      { z: 0, zone: 'Kelder', title: 'Kelderdichting en drainage', body: 'Grondwater dringt binnen via naden en de kimnaad. Een bekuiping en drainage naar een pompput houden de kelder droog.', meter: 'Vochtmeting keldermuur', wet: 21.6, dry: 2.4 },
      { z: 5, zone: 'Liftput', title: 'Liftputten', body: 'Een liftput ligt het diepst in het grondwater. Water dringt binnen via naden en scheuren; een bekuiping en injectie maken de put waterdicht.', meter: 'Vochtmeting liftput', wet: 19.2, dry: 2.3 },
      { z: 1, zone: 'Muurvoet', title: 'Opstijgend vocht', body: 'Vocht uit de grond trekt op in het metselwerk. Een injectie in de muurvoet sluit de muur af.', meter: 'Vochtmeting muurvoet', wet: 18.4, dry: 2.1 },
      { z: 2, zone: 'Gevel', title: 'Gevelrenovatie en isolatie', body: 'Regen dringt door poreuze stenen en voegen. Herstel, bescherming en isolatie maken de gevel weer duurzaam.', meter: 'Vochtmeting gevel', wet: 12.8, dry: 2.6 },
      { z: 3, zone: 'Balkon en beton', title: 'Betonrotherstel en coatings', body: 'Roestende wapening doet beton afspringen. We herstellen de constructie en beschermen ze met een coating.', meter: 'Vochtmeting balkonplaat', wet: 9.6, dry: 2.8 },
      { z: 4, zone: 'Binnenlucht', title: 'Ventilatie', body: 'Condens en schimmel ontstaan door te weinig luchtverversing. Een ventilatiesysteem zorgt voor een gezond binnenklimaat.', meter: 'Luchtvochtigheid binnen', wet: 78, dry: 52 },
    ],
    more: (name: string) => `Meer over ${name.toLowerCase()}`,
    status: ['Kritiek', 'Droogt op', 'Droog'],
    closing: 'Eén aanspreekpunt, van diagnose tot oplevering. Tot 30 jaar garantie.',
    scroll: 'Scroll en ontdek onze aanpak.',
    step: 'Stap',
  },
  fr: {
    eyebrow: 'Notre approche',
    title: 'De la cave au toit, zone par zone.',
    scene: 'Coupe d’un bâtiment en six zones : cave, fosse d’ascenseur, pied de mur, façade, balcon et air intérieur',
    steps: [
      { z: 0, zone: 'Cave', title: 'Étanchéité et drainage de cave', body: 'L’eau souterraine s’infiltre par les joints et la jonction mur-sol. Un cuvelage et un drainage vers un puisard gardent la cave au sec.', meter: 'Humidité du mur de cave', wet: 21.6, dry: 2.4 },
      { z: 5, zone: 'Fosse d’ascenseur', title: 'Fosses d’ascenseur', body: 'La fosse d’ascenseur est la partie la plus profonde, dans la nappe. L’eau entre par les joints et les fissures ; un cuvelage et une injection rendent la fosse étanche.', meter: 'Humidité de la fosse', wet: 19.2, dry: 2.3 },
      { z: 1, zone: 'Pied de mur', title: 'Humidité ascensionnelle', body: 'L’humidité du sol remonte dans la maçonnerie. Une injection au pied du mur coupe les remontées.', meter: 'Humidité du pied de mur', wet: 18.4, dry: 2.1 },
      { z: 2, zone: 'Façade', title: 'Rénovation et isolation de façade', body: 'La pluie traverse les briques et les joints poreux. Réparation, protection et isolation rendent la façade durable.', meter: 'Humidité de la façade', wet: 12.8, dry: 2.6 },
      { z: 3, zone: 'Balcon et béton', title: 'Réparation de béton et revêtements', body: 'Les armatures rouillées font éclater le béton. Nous réparons la structure et la protégeons par un revêtement.', meter: 'Humidité de la dalle de balcon', wet: 9.6, dry: 2.8 },
      { z: 4, zone: 'Air intérieur', title: 'Ventilation', body: 'Condensation et moisissures naissent d’un renouvellement d’air insuffisant. Un système de ventilation assure un climat intérieur sain.', meter: 'Humidité de l’air intérieur', wet: 78, dry: 52 },
    ],
    more: () => 'En savoir plus',
    status: ['Critique', 'Sèche', 'Sec'],
    closing: 'Un seul interlocuteur, du diagnostic à la réception des travaux. Jusqu’à 30 ans de garantie.',
    scroll: 'Faites défiler pour découvrir notre approche.',
    step: 'Étape',
  },
};

/** 6 steps × (problem, treated) + the finished state. */
const STEPS = 6;
const LAST = STEPS * 2;

interface Props {
  lang?: 'nl' | 'fr';
  /** Service page per step, in the visitor's language. */
  links: string[];
  cta: { label: string; href: string };
}

export default function BuildingStory({ lang = 'nl', links, cta }: Props) {
  const t = TEXT[lang];
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [pos, setPos] = useState(0);

  // Scroll drives the story on every screen size: the scene stays pinned while the track scrolls past.
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });
  const fromScroll = (v: number) => Math.min(LAST, Math.floor(v * (LAST + 1)));
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!reduce) setPos(fromScroll(v));
  });
  // The island can hydrate while the visitor is already halfway the section.
  useEffect(() => {
    if (!reduce) setPos(fromScroll(scrollYProgress.get()));
  }, [reduce, scrollYProgress]);

  const shown = reduce ? LAST : pos;
  const step = Math.min(STEPS - 1, Math.floor(shown / 2));
  const treated = shown >= step * 2 + 1;
  // Steps run bottom to top; `z` is the step's zone in the drawing.
  const states: ZoneState[] = [];
  t.steps.forEach((st, i) => (states[st.z] = shown >= i * 2 + 1 ? 'treated' : i === step ? 'problem' : 'dim'));
  const active = shown < LAST ? t.steps[step].z : -1;
  const expandAll = !!reduce;

  // Meter: counts down to the dry value once the zone is treated.
  const s = t.steps[step];
  const [reading, setReading] = useState(s.wet);
  useEffect(() => {
    if (reduce) return setReading(t.steps[STEPS - 1].dry);
    const to = treated ? s.dry : s.wet;
    if (!treated) return setReading(to);
    const controls = animate(reading, to, { duration: 1.4, ease: 'easeOut', onUpdate: setReading });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, treated, reduce]);
  const isDry = treated && Math.abs(reading - s.dry) < 0.05;
  const status = !treated
    ? { label: t.status[0], cls: 'bg-amber-100 text-amber-800' }
    : isDry
      ? { label: t.status[2], cls: 'bg-emerald-50 text-emerald-700' }
      : { label: t.status[1], cls: 'bg-tide-50 text-tide-600' };
  const unitIsPercentRH = s.wet > 50;

  /** Jump to a step by scrolling to its place in the track. */
  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el || reduce) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((i * 2 + 0.5) / (LAST + 1)) * range, behavior: 'smooth' });
  };

  const heading = (id: string) => (
    <>
      <p className="eyebrow">{t.eyebrow}</p>
      <h2 id={id} className="mt-4 text-title">{t.title}</h2>
    </>
  );
  const hint = (
    <p className="flex items-center gap-2 text-xs font-medium tracking-wide text-ink/50">
      <span className="relative block h-6 w-4 rounded-full border border-current">
        <span className="absolute top-1 left-1/2 h-1.5 w-0.5 -translate-x-1/2 animate-bounce rounded bg-current" />
      </span>
      {t.scroll}
    </p>
  );
  const closing = (
    <>
      <p className="font-display text-lg leading-snug font-semibold">{t.closing}</p>
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a href={cta.href} className="btn-primary">{cta.label} <span aria-hidden="true">→</span></a>
      </div>
    </>
  );

  return (
    <section className="relative bg-sand-100 grain" aria-label={t.title}>
      {/* Small screens: the heading scrolls away, then the scene pins under the header. */}
      <div className="container-x pt-20 sm:pt-24 lg:hidden">
        {heading('aanpak-title')}
        {!reduce && <div className="mt-5">{hint}</div>}
      </div>

      <div ref={trackRef} className={reduce ? '' : 'h-[440svh] lg:h-[540vh]'}>
        <div className={reduce ? '' : 'sticky top-[4.5rem] lg:top-0 lg:flex lg:h-dvh lg:items-center lg:pt-20'}>
          <div className="container-x grid w-full gap-3 py-4 sm:gap-4 lg:grid-cols-[1fr_1.05fr] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-6 lg:py-0">
            <div className="hidden lg:col-start-1 lg:block">{heading('aanpak-title-lg')}</div>

            <div className="relative mx-auto w-full max-w-[32rem] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
              <div className="relative mx-auto aspect-[480/520] h-[min(36svh,26rem)] overflow-hidden rounded-[1.5rem] bg-white shadow-[0_30px_60px_-36px_rgb(12_24_34/0.45)] ring-1 ring-ink/5 lg:h-auto lg:max-h-[calc(100dvh-13rem)] lg:w-full lg:rounded-[2rem]">
                <Building id="story" states={states} active={active} label={t.scene} />
              </div>
              <div className="mt-2 flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-2 shadow-sm ring-1 ring-ink/5 lg:mt-3 lg:px-5 lg:py-3">
                <p className="text-[0.66rem] leading-tight font-semibold tracking-[0.12em] text-ink/55 uppercase">{s.meter}</p>
                <div className="flex shrink-0 items-baseline gap-2">
                  <span className="font-display text-xl font-semibold tabular-nums tracking-tight lg:text-2xl" aria-live="off">
                    {reading.toLocaleString(lang === 'fr' ? 'fr-BE' : 'nl-BE', { minimumFractionDigits: unitIsPercentRH ? 0 : 1, maximumFractionDigits: unitIsPercentRH ? 0 : 1 })}
                    {lang === 'fr' ? '\u00a0%' : '%'}
                  </span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold transition-colors duration-500 ${status.cls}`}>{status.label}</span>
                </div>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[32rem] lg:col-start-1 lg:row-start-2 lg:mx-0 lg:max-w-none">
              <div className="flex items-center gap-3" aria-hidden="true">
                <span className="font-display text-sm font-semibold text-tide-500 tabular-nums">0{step + 1}</span>
                <div className="flex flex-1 gap-1.5">
                  {t.steps.map((_, i) => (
                    <span key={i} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i < step || (i === step && treated) ? 'bg-tide-500' : i === step ? 'bg-tide-300' : 'bg-ink/12'}`} />
                  ))}
                </div>
              </div>
              <ol className="mt-3 grid gap-1 lg:mt-5">
                {t.steps.map((st, i) => {
                  const open = expandAll || i === step;
                  return (
                    <li key={st.title} className={`rounded-2xl transition-colors duration-500 ${open ? 'bg-white p-3.5 shadow-sm ring-1 ring-ink/5 lg:p-4' : 'px-4 py-1.5 max-lg:hidden'}`}>
                      <button type="button" onClick={() => goTo(i)} className="flex w-full items-baseline gap-3 text-left" aria-current={i === step ? 'step' : undefined}>
                        <span className={`font-display text-sm font-semibold tabular-nums ${open ? 'text-tide-500' : 'text-ink/40'}`}>0{i + 1}</span>
                        <span className={`font-display font-semibold tracking-tight ${open ? 'text-lg' : 'text-ink/55'}`}>
                          {st.title} <span className="sr-only">({t.step} {i + 1}: {st.zone})</span>
                        </span>
                        <span className={`ml-auto shrink-0 text-xs font-medium tracking-wide uppercase ${open ? 'text-ink/50' : 'text-ink/35'}`} aria-hidden="true">{st.zone}</span>
                      </button>
                      <div className={`grid transition-[grid-template-rows] duration-500 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                        <div className="overflow-hidden">
                          <p className="mt-1.5 pl-8 text-[0.95rem] leading-snug text-ink/70 lg:mt-2 lg:text-base">{st.body}</p>
                          <a href={links[i]} className="mt-1.5 ml-8 inline-flex items-center gap-1.5 py-1 text-sm font-semibold text-tide-500 hover:underline" tabIndex={open ? undefined : -1}>
                            {t.more(st.title)} <span aria-hidden="true">→</span>
                          </a>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
              <div className="mt-6 hidden lg:block">
                {closing}
                {!reduce && <div className="mt-4">{hint}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-x pt-6 pb-20 lg:hidden">{closing}</div>
    </section>
  );
}
