import { useEffect, useRef, useState } from 'react';
import { animate, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import Building, { type ZoneState } from './Building';

/**
 * Homepage scroll story: the whole building, zone by zone. Each step first shows the problem
 * in that zone, then the treatment; the moisture meter follows the zone and ends on "Droog".
 *
 * Desktop: the scene is pinned and driven by scroll. Small screens: it plays by itself while
 * in view, and the steps can be tapped. Reduced motion: the finished state, all steps listed.
 */

const TEXT = {
  nl: {
    eyebrow: 'Onze aanpak',
    title: 'Van kelder tot dak, zone per zone.',
    scene: 'Doorsnede van een gebouw met vijf zones: kelder, muurvoet, gevel, balkon en binnenlucht',
    steps: [
      { zone: 'Kelder', title: 'Kelderdichting en drainage', body: 'Grondwater dringt binnen via naden en de kimnaad. Een bekuiping en drainage naar een pompput houden de kelder droog.', meter: 'Vochtmeting keldermuur', wet: 21.6, dry: 2.4 },
      { zone: 'Muurvoet', title: 'Opstijgend vocht', body: 'Vocht uit de grond trekt op in het metselwerk. Een injectie in de muurvoet sluit de muur af.', meter: 'Vochtmeting muurvoet', wet: 18.4, dry: 2.1 },
      { zone: 'Gevel', title: 'Gevelrenovatie en isolatie', body: 'Regen dringt door poreuze stenen en voegen. Herstel, bescherming en isolatie maken de gevel weer duurzaam.', meter: 'Vochtmeting gevel', wet: 12.8, dry: 2.6 },
      { zone: 'Balkon en beton', title: 'Betonrotherstel en coatings', body: 'Roestende wapening doet beton afspringen. We herstellen de constructie en beschermen ze met een coating.', meter: 'Vochtmeting balkonplaat', wet: 9.6, dry: 2.8 },
      { zone: 'Binnenlucht', title: 'Ventilatie', body: 'Condens en schimmel ontstaan door te weinig luchtverversing. Een ventilatiesysteem zorgt voor een gezond binnenklimaat.', meter: 'Luchtvochtigheid binnen', wet: 78, dry: 52 },
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
    scene: 'Coupe d’un bâtiment en cinq zones : cave, pied de mur, façade, balcon et air intérieur',
    steps: [
      { zone: 'Cave', title: 'Étanchéité et drainage de cave', body: 'L’eau souterraine s’infiltre par les joints et la jonction mur-sol. Un cuvelage et un drainage vers un puisard gardent la cave au sec.', meter: 'Humidité du mur de cave', wet: 21.6, dry: 2.4 },
      { zone: 'Pied de mur', title: 'Humidité ascensionnelle', body: 'L’humidité du sol remonte dans la maçonnerie. Une injection au pied du mur coupe les remontées.', meter: 'Humidité du pied de mur', wet: 18.4, dry: 2.1 },
      { zone: 'Façade', title: 'Rénovation et isolation de façade', body: 'La pluie traverse les briques et les joints poreux. Réparation, protection et isolation rendent la façade durable.', meter: 'Humidité de la façade', wet: 12.8, dry: 2.6 },
      { zone: 'Balcon et béton', title: 'Réparation de béton et revêtements', body: 'Les armatures rouillées font éclater le béton. Nous réparons la structure et la protégeons par un revêtement.', meter: 'Humidité de la dalle de balcon', wet: 9.6, dry: 2.8 },
      { zone: 'Air intérieur', title: 'Ventilation', body: 'Condensation et moisissures naissent d’un renouvellement d’air insuffisant. Un système de ventilation assure un climat intérieur sain.', meter: 'Humidité de l’air intérieur', wet: 78, dry: 52 },
    ],
    more: () => 'En savoir plus',
    status: ['Critique', 'Sèche', 'Sec'],
    closing: 'Un seul interlocuteur, du diagnostic à la réception des travaux. Jusqu’à 30 ans de garantie.',
    scroll: 'Faites défiler pour découvrir notre approche.',
    step: 'Étape',
  },
};

/** 5 zones × (problem, treated) + the finished state. */
const LAST = 10;

interface Props {
  lang?: 'nl' | 'fr';
  /** Service page per step, in the visitor's language. */
  links: string[];
  cta: { label: string; href: string };
}

export default function BuildingStory({ lang = 'nl', links, cta }: Props) {
  const t = TEXT[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [pinned, setPinned] = useState(true);
  const [pos, setPos] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (min-height: 640px)');
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const fromScroll = (v: number) => Math.min(LAST, Math.floor(v * (LAST + 1)));
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (pinned && !reduce) setPos(fromScroll(v));
  });
  // The island can hydrate while the visitor is already halfway the section.
  useEffect(() => {
    if (pinned && !reduce) setPos(fromScroll(scrollYProgress.get()));
  }, [pinned, reduce, scrollYProgress]);

  // Small screens: play the steps by themselves while the scene is in view.
  useEffect(() => {
    if (pinned || reduce) return;
    const el = sectionRef.current!;
    let timer = 0;
    const tick = () => {
      setPos((p) => (p >= LAST ? 0 : p + 1));
      timer = window.setTimeout(tick, 2400);
    };
    const io = new IntersectionObserver(([e]) => {
      window.clearTimeout(timer);
      if (e.isIntersecting) timer = window.setTimeout(tick, 1600);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, [pinned, reduce]);

  const shown = reduce ? LAST : pos;
  const step = Math.min(4, Math.floor(shown / 2));
  const treated = shown >= step * 2 + 1;
  const states: ZoneState[] = t.steps.map((_, z) => (shown >= z * 2 + 1 ? 'treated' : z === step ? 'problem' : 'dim'));
  const active = shown < LAST ? step : -1;
  const expandAll = !!reduce;

  // Meter: counts down to the dry value once the zone is treated.
  const s = t.steps[step];
  const [reading, setReading] = useState(s.wet);
  useEffect(() => {
    if (reduce) return setReading(t.steps[4].dry);
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

  /** Desktop: jump to a step by scrolling; small screens: show it straight away. */
  const goTo = (i: number) => {
    const el = sectionRef.current;
    if (pinned && el && !reduce) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      const range = el.offsetHeight - window.innerHeight;
      window.scrollTo({ top: top + ((i * 2 + 0.5) / (LAST + 1)) * range, behavior: 'smooth' });
    } else setPos(i * 2);
  };

  return (
    <section ref={sectionRef} className={`relative bg-sand-100 grain ${reduce ? '' : 'lg:h-[460vh]'}`} aria-labelledby="aanpak-title">
      <div className={reduce ? '' : 'lg:sticky lg:top-0 lg:flex lg:h-dvh lg:items-center lg:pt-20'}>
        <div className="container-x grid gap-8 py-20 sm:py-24 lg:grid-cols-[1fr_1.05fr] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-6 lg:py-0">
          <div className="lg:col-start-1">
            <p className="eyebrow">{t.eyebrow}</p>
            <h2 id="aanpak-title" className="mt-4 text-title">{t.title}</h2>
          </div>

          <div className="relative mx-auto w-full max-w-[32rem] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
            <div className="relative aspect-[480/520] max-h-[calc(100dvh-13rem)] w-full overflow-hidden rounded-[2rem] bg-white shadow-[0_40px_80px_-40px_rgb(12_24_34/0.45)] ring-1 ring-ink/5">
              <Building id="story" states={states} active={active} label={t.scene} />
            </div>
            <div className="mt-3 flex items-center justify-between gap-4 rounded-2xl bg-white px-5 py-3 shadow-sm ring-1 ring-ink/5">
              <p className="text-[0.68rem] font-semibold tracking-[0.14em] text-ink/55 uppercase">{s.meter}</p>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl font-semibold tabular-nums tracking-tight" aria-live="off">
                  {reading.toLocaleString(lang === 'fr' ? 'fr-BE' : 'nl-BE', { minimumFractionDigits: unitIsPercentRH ? 0 : 1, maximumFractionDigits: unitIsPercentRH ? 0 : 1 })}
                  {lang === 'fr' ? '\u00a0%' : '%'}
                </span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold transition-colors duration-500 ${status.cls}`}>{status.label}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-start-1 lg:row-start-2">
            <div className="flex items-center gap-3" aria-hidden="true">
              <span className="font-display text-sm font-semibold text-tide-500 tabular-nums">0{step + 1}</span>
              <div className="flex flex-1 gap-1.5">
                {t.steps.map((_, i) => (
                  <span key={i} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i < step || (i === step && treated) ? 'bg-tide-500' : i === step ? 'bg-tide-300' : 'bg-ink/12'}`} />
                ))}
              </div>
            </div>
            <ol className="mt-5 grid gap-1">
              {t.steps.map((st, i) => {
                const open = expandAll || i === step;
                return (
                  <li key={st.title} className={`rounded-2xl transition-colors duration-500 ${open ? 'bg-white p-4 shadow-sm ring-1 ring-ink/5' : 'max-lg:hidden px-4 py-1.5'}`}>
                    <button type="button" onClick={() => goTo(i)} className="flex w-full items-baseline gap-3 text-left" aria-current={i === step ? 'step' : undefined}>
                      <span className={`font-display text-sm font-semibold tabular-nums ${open ? 'text-tide-500' : 'text-ink/40'}`}>0{i + 1}</span>
                      <span className={`font-display font-semibold tracking-tight ${open ? 'text-lg' : 'text-ink/55'}`}>
                        {st.title} <span className="sr-only">({t.step} {i + 1}: {st.zone})</span>
                      </span>
                      <span className={`ml-auto shrink-0 text-xs font-medium tracking-wide uppercase ${open ? 'text-ink/50' : 'text-ink/35'}`} aria-hidden="true">{st.zone}</span>
                    </button>
                    <div className={`grid transition-[grid-template-rows] duration-500 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                      <div className="overflow-hidden">
                        <p className="mt-2 pl-8 leading-snug text-ink/70">{st.body}</p>
                        <a href={links[i]} className="mt-2 ml-8 inline-flex items-center gap-1.5 text-sm font-semibold text-tide-500 hover:underline" tabIndex={open ? undefined : -1}>
                          {t.more(st.title)} <span aria-hidden="true">→</span>
                        </a>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
            <p className="mt-6 font-display text-lg leading-snug font-semibold">{t.closing}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href={cta.href} className="btn-primary">{cta.label} <span aria-hidden="true">→</span></a>
              {pinned && !reduce && (
                <p className="flex items-center gap-2 text-xs font-medium tracking-wide text-ink/50">
                  <span className="relative block h-6 w-4 rounded-full border border-current">
                    <span className="absolute top-1 left-1/2 h-1.5 w-0.5 -translate-x-1/2 animate-bounce rounded bg-current" />
                  </span>
                  {t.scroll}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
