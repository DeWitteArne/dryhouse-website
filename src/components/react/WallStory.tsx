import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';

/**
 * Rising damp, told in four scroll steps on a wall in a living room (opstijgend-vocht page).
 * 1. moisture rises from the floor  2. we drill and inject a barrier
 * 3. the wall above the barrier dries out  4. 30 years guarantee.
 *
 * Desktop: the scene is pinned and driven by scroll. Small screens: it plays on a loop.
 * Reduced motion: the finished, dry state, no movement.
 */

const TEXT = {
  nl: {
    steps: [
      { title: 'Vocht trekt op uit de grond', body: 'Grondwater trekt via de poriën van baksteen en voegen omhoog. Gevolg: zoutkringen, loszittende pleister en afbladderende verf.' },
      { title: 'We injecteren een vochtscherm', body: 'Net boven de vloer boren we een rij gaatjes en injecteren een waterafstotende crème die een ondoordringbare barrière vormt.' },
      { title: 'Je muur droogt uit', body: 'Boven de barrière kan geen nieuw vocht meer omhoog. De muur droogt, en daarna werken we hem strak af.' },
      { title: '30 jaar garantie', body: 'We staan achter ons werk: op de behandeling tegen opstijgend vocht krijg je 30 jaar garantie.' },
    ],
    section: 'Zo maakt Dryhouse je muur droog',
    scene: 'Doorsnede van een binnenmuur waarin opstijgend vocht wordt behandeld met een injectie',
    meter: 'Vochtmeting muur',
    status: ['Kritiek', 'Droogt op', 'Droog'],
    seal: ['jaar', 'garantie'],
    scroll: 'Scroll en zie hoe we je muur droog maken',
  },
  fr: {
    steps: [
      { title: 'L’humidité remonte du sol', body: 'L’eau du sol monte par les pores des briques et des joints. Résultat : salpêtre, enduit qui se détache et peinture qui s’écaille.' },
      { title: 'Nous injectons une barrière', body: 'Juste au-dessus du sol, nous forons une rangée de trous et injectons une crème hydrofuge qui forme une barrière étanche.' },
      { title: 'Votre mur sèche', body: 'Au-dessus de la barrière, l’humidité ne peut plus remonter. Le mur sèche, puis nous le refaisons proprement.' },
      { title: '30 ans de garantie', body: 'Nous assumons notre travail : le traitement contre l’humidité ascensionnelle est garanti 30 ans.' },
    ],
    section: 'Comment Dryhouse assèche votre mur',
    scene: 'Coupe d’un mur intérieur traité contre l’humidité ascensionnelle par injection',
    meter: 'Mesure d’humidité du mur',
    status: ['Critique', 'Sèche', 'Sec'],
    seal: ['ans de', 'garantie'],
    scroll: 'Faites défiler pour voir comment nous asséchons votre mur',
  },
};
type Text = (typeof TEXT)['nl'];

const FLOOR = 440;
const WET_TOP = 190;
const BARRIER_Y = 405;
const HOLES = [28, 85, 142, 199, 256, 313, 370];

export default function WallStory({ children, lang = 'nl' }: { children: ReactNode; lang?: 'nl' | 'fr' }) {
  // Used in the middle of a page, so no room is kept for the fixed header above it.
  const t = TEXT[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [pinned, setPinned] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (min-height: 640px)');
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const loop = useMotionValue(0);
  const scrollSmooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  // Small screens: autoplay the story while the scene is in view.
  useEffect(() => {
    if (pinned || reduce) return;
    const controls = animate(loop, [0, 0, 1, 1], { duration: 11, times: [0, 0.08, 0.85, 1], ease: 'easeInOut', repeat: Infinity });
    return () => controls.stop();
  }, [pinned, reduce, loop]);

  const finished = useMotionValue(1);
  const progress = reduce ? finished : pinned ? scrollSmooth : loop;

  return (
    <section ref={sectionRef} className="relative bg-sand-100 grain lg:h-[260vh]" aria-label={t.section}>
      <div className="lg:sticky lg:top-0 lg:flex lg:h-dvh lg:items-center lg:pt-16">
        <div className="container-x grid items-center gap-10 py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-0">
          <div>{children}</div>
          <Scene progress={progress} pinned={pinned && !reduce} t={t} />
        </div>
      </div>
    </section>
  );
}

function Scene({ progress, pinned, t }: { progress: MotionValue<number>; pinned: boolean; t: Text }) {
  const STEPS = t.steps;
  // The wall starts wet (also in the server-rendered HTML), so the problem is visible before any JS runs.
  const rise = useMotionValue(1);

  const drill = useTransform(progress, [0.14, 0.4], [0, 1], { clamp: true });
  const barrier = useTransform(progress, [0.32, 0.52], [0, 1], { clamp: true });
  const dry = useTransform(progress, [0.5, 0.8], [0, 1], { clamp: true });
  const done = useTransform(progress, [0.82, 0.92], [0, 1], { clamp: true });

  const stainTop = useTransform([rise, dry], ([r, d]: number[]) => {
    const wet = FLOOR - (FLOOR - WET_TOP) * r;
    return wet + (BARRIER_Y - 6 - wet) * d;
  });
  const stainHeight = useTransform(stainTop, (y) => FLOOR - y);
  const tideTop = useTransform(stainTop, (y) => y - 8);
  const sealScale = useTransform(done, [0, 1], [0.6, 1]);
  const sealRotate = useTransform(done, [0, 1], [-20, -8]);
  const damage = useTransform([rise, dry], ([r, d]: number[]) => r * (1 - d));
  const tideOpacity = useTransform(damage, (d) => d * 0.55);
  const freshPaint = useTransform(done, [0, 1], [0, 1]);
  const barrierWidth = useTransform(barrier, [0, 1], [0, 400]);

  const moisture = useTransform([rise, dry], ([r, d]: number[]) => 1.8 + 16.6 * r * (1 - d));
  const [reading, setReading] = useState(18.4);
  const [step, setStep] = useState(0);
  useMotionValueEvent(moisture, 'change', (v) => setReading(v));
  useMotionValueEvent(progress, 'change', (v) => setStep(v < 0.14 ? 0 : v < 0.48 ? 1 : v < 0.82 ? 2 : 3));
  useEffect(() => {
    setReading(moisture.get());
    const v = progress.get();
    setStep(v < 0.14 ? 0 : v < 0.48 ? 1 : v < 0.82 ? 2 : 3);
  }, [moisture, progress]);

  const status = reading > 10 ? { label: t.status[0], cls: 'bg-amber-100 text-amber-800' } : reading > 4 ? { label: t.status[1], cls: 'bg-tide-50 text-tide-600' } : { label: t.status[2], cls: 'bg-emerald-50 text-emerald-700' };

  return (
    <div className="relative mx-auto w-full max-w-[34rem]">
      <div className="relative aspect-[4/5] max-h-[calc(100dvh-16rem)] w-full overflow-hidden rounded-[2rem] bg-sand-200 shadow-[0_40px_80px_-40px_rgb(12_24_34/0.45)] ring-1 ring-ink/5">
        <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 size-full" role="img" aria-label={t.scene}>
          <defs>
            <pattern id="bricks" width="56" height="26" patternUnits="userSpaceOnUse">
              <rect width="56" height="26" fill="#b4643f" />
              <rect x="1" y="1" width="54" height="11" rx="1.5" fill="#c4734c" />
              <rect x="-27" y="14" width="54" height="11" rx="1.5" fill="#bd6c45" />
              <rect x="29" y="14" width="54" height="11" rx="1.5" fill="#c97a52" />
            </pattern>
            <linearGradient id="light" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fffdf8" />
              <stop offset="1" stopColor="#efe7da" />
            </linearGradient>
            <linearGradient id="stain" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" stopColor="#0a5086" stopOpacity="0.42" />
              <stop offset="0.55" stopColor="#2f92c9" stopOpacity="0.22" />
              <stop offset="0.92" stopColor="#6cb7e0" stopOpacity="0.14" />
              <stop offset="1" stopColor="#8a7350" stopOpacity="0.3" />
            </linearGradient>
            <filter id="organic" x="-10%" y="-20%" width="120%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.011 0.035" numOctaves="3" seed="7" />
              <feDisplacementMap in="SourceGraphic" scale="44" />
            </filter>
            <clipPath id="cutaway">
              <path d="M18 228c40-18 92-6 140 6s56 52 48 92-4 74 20 99H10c-6-60-14-178 8-197Z" />
            </clipPath>
            <clipPath id="wall">
              <rect width="400" height={FLOOR - 15} />
            </clipPath>
          </defs>

          {/* Wall, window light, picture frame and socket */}
          <rect width="400" height={FLOOR} fill="url(#light)" />
          <rect x="246" y="96" width="92" height="116" rx="3" fill="#f7f2ea" stroke="#d9cbb5" strokeWidth="5" />
          <path d="M262 190l22-30 16 18 10-12 18 24z" fill="#d9cbb5" />
          <rect x="300" y="350" width="22" height="30" rx="4" fill="#fbf9f5" stroke="#d9cbb5" />

          {/* Exposed bricks where the plaster came off */}
          <g clipPath="url(#cutaway)">
            <rect width="400" height="500" fill="url(#bricks)" />
          </g>
          <path d="M18 228c40-18 92-6 140 6s56 52 48 92-4 74 20 99" fill="none" stroke="#e2d6c3" strokeWidth="4" strokeLinecap="round" />

          {/* Moisture stain with salt tide line */}
          <g clipPath="url(#wall)">
            <motion.rect x="-30" width="460" y={tideTop} height="18" fill="#c9b08a" filter="url(#organic)" style={{ opacity: tideOpacity }} />
            <motion.rect x="-30" width="460" y={stainTop} height={stainHeight} fill="url(#stain)" filter="url(#organic)" style={{ mixBlendMode: 'multiply' }} />
            <motion.g style={{ opacity: damage }}>
              {[
                [262, 300], [214, 262], [350, 318], [118, 214], [290, 236], [170, 290], [52, 300],
              ].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={2 + (i % 3)} fill="#fff" opacity="0.7" />
              ))}
              <path d="M236 268c8-4 18-2 22 5s-2 14-10 14-16-3-16-9 1-7 4-10Z" fill="#f4ede1" stroke="#d9cbb5" />
              <path d="M330 248c6-3 13-1 15 4s-2 10-8 10-11-3-11-7 2-5 4-7Z" fill="#f4ede1" stroke="#d9cbb5" />
            </motion.g>
            {/* Capillary droplets */}
            <motion.g style={{ opacity: damage }}>
              {[40, 120, 190, 270, 345].map((x, i) => (
                <circle key={x} cx={x} cy={FLOOR - 20} r="2.4" fill="#00c0ff" className="animate-[capillary_3.2s_ease-in_infinite]" style={{ animationDelay: `${i * 0.6}s` }} />
              ))}
            </motion.g>
          </g>

          {/* Fresh plaster after drying */}
          <motion.rect width="400" height={BARRIER_Y - 12} fill="url(#light)" style={{ opacity: freshPaint }} />
          <motion.rect x="246" y="96" width="92" height="116" rx="3" fill="#f7f2ea" stroke="#d9cbb5" strokeWidth="5" style={{ opacity: freshPaint }} />
          <motion.path d="M262 190l22-30 16 18 10-12 18 24z" fill="#d9cbb5" style={{ opacity: freshPaint }} />
          <motion.rect x="300" y="350" width="22" height="30" rx="4" fill="#fbf9f5" stroke="#d9cbb5" style={{ opacity: freshPaint }} />

          {/* Injection barrier */}
          <motion.rect x="0" y={BARRIER_Y - 7} height="14" fill="#00c0ff" opacity="0.85" width={barrierWidth} rx="7" />
          {HOLES.map((x, i) => (
            <Hole key={x} x={x} drill={drill} index={i} />
          ))}

          {/* Skirting and floor */}
          <rect y={FLOOR - 15} width="400" height="15" fill="#fbf9f5" />
          <rect y={FLOOR - 15} width="400" height="2" fill="#e2d6c3" />
          <rect y={FLOOR} width="400" height="60" fill="#c9b79c" />
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M${-20 + i * 130} 500 L${60 + i * 120} ${FLOOR}`} stroke="#b9a586" strokeWidth="1.5" />
          ))}
        </svg>

        {/* Moisture meter */}
        <div className="absolute top-4 left-4 rounded-2xl bg-white/90 p-3.5 pr-5 shadow-lg ring-1 ring-ink/5 backdrop-blur sm:top-5 sm:left-5">
          <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-ink/50 uppercase">{t.meter}</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-display text-3xl font-semibold tabular-nums tracking-tight text-ink" aria-live="off">
              {reading.toLocaleString('nl-BE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%
            </span>
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold transition-colors duration-500 ${status.cls}`}>{status.label}</span>
          </div>
          <div className="mt-2 h-1.5 w-40 overflow-hidden rounded-full bg-sand-200">
            <div className="h-full rounded-full bg-gradient-to-r from-spark to-tide-500 transition-[width] duration-200" style={{ width: `${Math.min(100, (reading / 18.4) * 100)}%` }} />
          </div>
        </div>

        {/* Guarantee seal */}
        <motion.div
          className="absolute top-5 right-5 grid size-24 place-items-center rounded-full bg-tide-500 text-center text-white shadow-xl sm:size-28"
          style={{ opacity: done, scale: sealScale, rotate: sealRotate }}
          aria-hidden="true"
        >
          <span>
            <span className="block font-display text-4xl leading-none font-bold">30</span>
            <span className="block text-[0.65rem] font-semibold tracking-[0.14em] uppercase">{t.seal[0]}<br />{t.seal[1]}</span>
          </span>
        </motion.div>
      </div>

      {/* Step caption */}
      <div className="mt-3 rounded-2xl bg-tide-800 p-4 text-white sm:p-5">
        <div className="flex items-center gap-3">
          <span className="font-display text-sm font-semibold text-spark tabular-nums">0{step + 1}</span>
          <div className="flex flex-1 gap-1.5" aria-hidden="true">
            {STEPS.map((_, i) => (
              <span key={i} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= step ? 'bg-spark' : 'bg-white/20'}`} />
            ))}
          </div>
        </div>
        <div className="relative mt-3 min-h-[5.5rem] sm:min-h-[4.5rem]">
          {STEPS.map((s, i) => (
            <div key={s.title} className={`absolute inset-0 transition-all duration-500 ${i === step ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'}`} aria-hidden={i !== step}>
              <p className="font-display text-lg leading-tight font-semibold">{s.title}</p>
              <p className="mt-1 text-sm leading-snug text-white/75">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
      {pinned && (
        <p className="mt-3 flex items-center justify-center gap-2 text-xs font-medium tracking-wide text-ink/50">
          <span className="relative block h-6 w-4 rounded-full border border-current">
            <span className="absolute top-1 left-1/2 h-1.5 w-0.5 -translate-x-1/2 animate-bounce rounded bg-current" />
          </span>
          {t.scroll}
        </p>
      )}
      {/* Steps as text for screen readers and search engines */}
      <ol className="sr-only">
        {STEPS.map((s) => (
          <li key={s.title}>{s.title}: {s.body}</li>
        ))}
      </ol>
    </div>
  );
}

function Hole({ x, drill, index }: { x: number; drill: MotionValue<number>; index: number }) {
  const start = index / HOLES.length;
  const t = useTransform(drill, [start * 0.8, start * 0.8 + 0.25], [0, 1], { clamp: true });
  const nozzle = useTransform(t, [0, 0.4, 0.8, 1], [0, 1, 1, 0]);
  const nozzleY = useTransform(nozzle, [0, 1], [-14, 0]);
  return (
    <g>
      <motion.circle cx={x} cy={BARRIER_Y} r="5" fill="#6b5a45" style={{ opacity: t }} />
      <motion.g style={{ opacity: nozzle, y: nozzleY }}>
        <rect x={x - 3} y={BARRIER_Y - 40} width="6" height="36" rx="3" fill="#0c1822" />
        <rect x={x - 9} y={BARRIER_Y - 52} width="18" height="14" rx="4" fill="#0a5086" />
      </motion.g>
    </g>
  );
}
