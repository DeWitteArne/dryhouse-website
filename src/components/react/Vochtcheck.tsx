import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

/**
 * Online moisture check: five questions, a weighted score per problem type,
 * and a result that links to the right service and the quote form.
 * It's a first indication, not a diagnosis, and the result says so.
 */

type Problem = 'rising' | 'penetrating' | 'condensation' | 'basement' | 'concrete';
type Score = Partial<Record<Problem, number>>;
interface Option {
  label: string;
  hint?: string;
  score: Score;
}
interface Question {
  id: string;
  title: string;
  help?: string;
  multi?: boolean;
  options: Option[];
}

const QUESTIONS: Question[] = [
  {
    id: 'waar',
    title: 'Waar zie je het vochtprobleem?',
    options: [
      { label: 'Onderaan de muur', hint: 'tot ongeveer een meter hoog', score: { rising: 3 } },
      { label: 'Hoger op de muur of aan het plafond', score: { penetrating: 2, condensation: 1 } },
      { label: 'In de kelder', score: { basement: 3 } },
      { label: 'Rond ramen, in hoeken of achter kasten', score: { condensation: 3 } },
      { label: 'In de badkamer', score: { condensation: 3 } },
      { label: 'In beton', hint: 'garage, terras, liftput', score: { concrete: 3 } },
    ],
  },
  {
    id: 'wat',
    title: 'Wat zie je precies?',
    help: 'Kies alles wat van toepassing is.',
    multi: true,
    options: [
      { label: 'Een witte zoutrand of kring', score: { rising: 3 } },
      { label: 'Zwarte of groene schimmelvlekken', score: { condensation: 3 } },
      { label: 'Bladderende verf of loskomende pleister', score: { rising: 1, penetrating: 1 } },
      { label: 'Water dat binnensijpelt', score: { basement: 2, penetrating: 1, concrete: 1 } },
      { label: "'s Ochtends beslagen ramen", score: { condensation: 3 } },
      { label: 'Scheuren of roest in beton', score: { concrete: 3 } },
    ],
  },
  {
    id: 'wanneer',
    title: 'Wanneer is het het ergst?',
    options: [
      { label: 'Na een regenbui', score: { penetrating: 3, basement: 1 } },
      { label: 'In de winter, als het koud is', score: { condensation: 3 } },
      { label: 'In de zomer', score: { basement: 1, condensation: 1 } },
      { label: 'Het hele jaar door', score: { rising: 2, basement: 1 } },
      { label: 'Geen idee', score: {} },
    ],
  },
  {
    id: 'muur',
    title: 'Over welke muur gaat het?',
    options: [
      { label: 'Een buitenmuur aan de weerkant', hint: 'meestal west of zuidwest', score: { penetrating: 2, condensation: 1 } },
      { label: 'Een binnenmuur of tussenmuur', score: { rising: 2 } },
      { label: 'Een keldermuur', score: { basement: 2 } },
      { label: 'Meerdere muren of ik weet het niet', score: {} },
    ],
  },
  {
    id: 'leeftijd',
    title: 'Hoe oud is je woning?',
    options: [
      { label: 'Gebouwd voor 1950', score: { rising: 2 } },
      { label: 'Tussen 1950 en 1990', score: { rising: 1, penetrating: 1 } },
      { label: 'Na 1990 of recent gerenoveerd', score: { condensation: 2 } },
      { label: 'Weet ik niet', score: {} },
    ],
  },
];

const RESULTS: Record<Problem, { name: string; slug: string; summary: string; tip: string }> = {
  rising: {
    name: 'Opstijgend vocht',
    slug: 'opstijgend-vocht',
    summary: 'Vocht uit de grond kruipt omhoog in je muren, omdat er geen (werkende) vochtkering is. Dat zie je aan een zoutrand en schade onderaan de muur.',
    tip: 'Verf of folie verstopt het probleem enkel. Een injectie met een vochtscherm pakt de oorzaak aan.',
  },
  penetrating: {
    name: 'Doorslaand vocht',
    slug: 'doorslaand-vocht',
    summary: 'Regenwater dringt van buitenaf door je gevel naar binnen, via poreuze steen of versleten voegen.',
    tip: 'Kijk eens naar de voegen aan de buitenkant: holle of gescheurde voegen zijn een typische oorzaak.',
  },
  condensation: {
    name: 'Condensatie en schimmel',
    slug: 'condensatie-schimmels',
    summary: 'Er zit te veel vocht in de lucht in huis. Dat slaat neer op koude plekken en zorgt voor schimmel.',
    tip: 'Verlucht dagelijks kort en krachtig, en zet geen kasten tegen koude buitenmuren. Blijft het terugkomen, dan is ventilatie op maat nodig.',
  },
  basement: {
    name: 'Vochtige kelder',
    slug: 'kelderdichtingen',
    summary: 'Je kelder krijgt water binnen van buitenaf (infiltratie), heeft last van condensatie, of beide.',
    tip: 'Is je kelder vooral in de zomer vochtig? Verlucht dan net niet op warme dagen: de warme lucht brengt vocht mee naar binnen.',
  },
  concrete: {
    name: 'Schade aan beton',
    slug: 'betoninjectie',
    summary: 'Scheuren in beton laten water door. Bereikt dat de wapening, dan kan betonrot ontstaan.',
    tip: 'Hoe sneller je een lekkende scheur laat injecteren, hoe eenvoudiger en goedkoper het herstel.',
  },
};

export default function Vochtcheck() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const reduce = useReducedMotion();
  const done = step >= QUESTIONS.length;
  const q = QUESTIONS[Math.min(step, QUESTIONS.length - 1)];
  const selected = answers[q.id] ?? [];

  const ranking = useMemo(() => {
    const totals: Record<Problem, number> = { rising: 0, penetrating: 0, condensation: 0, basement: 0, concrete: 0 };
    for (const question of QUESTIONS) {
      for (const i of answers[question.id] ?? []) {
        for (const [k, v] of Object.entries(question.options[i].score)) totals[k as Problem] += v ?? 0;
      }
    }
    const sum = Object.values(totals).reduce((a, b) => a + b, 0) || 1;
    return (Object.entries(totals) as [Problem, number][])
      .sort((a, b) => b[1] - a[1])
      .map(([problem, score]) => ({ problem, share: score / sum }));
  }, [answers]);

  const choose = (i: number) => {
    if (q.multi) {
      setAnswers({ ...answers, [q.id]: selected.includes(i) ? selected.filter((x) => x !== i) : [...selected, i] });
      return;
    }
    setAnswers({ ...answers, [q.id]: [i] });
    setTimeout(() => setStep((s) => s + 1), reduce ? 0 : 280);
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
  };

  const slide = reduce
    ? {}
    : { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -40 }, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } };

  return (
    <div className="card overflow-hidden">
      <div className="h-1.5 bg-sand-200" role="progressbar" aria-label="Voortgang vochtcheck" aria-valuemin={0} aria-valuemax={QUESTIONS.length} aria-valuenow={Math.min(step, QUESTIONS.length)}>
        <motion.div className="h-full bg-gradient-to-r from-spark to-tide-500" style={{ width: '0%' }} initial={false} animate={{ width: `${(Math.min(step, QUESTIONS.length) / QUESTIONS.length) * 100}%` }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} />
      </div>
      <div className="relative min-h-[34rem] p-6 sm:p-10">
        <AnimatePresence mode="wait" initial={false}>
          {!done ? (
            <motion.fieldset key={q.id} {...slide}>
              <legend className="contents">
                <span className="text-sm font-semibold text-tide-500">
                  Vraag {step + 1} van {QUESTIONS.length}
                </span>
                <span className="mt-2 block font-display text-[clamp(1.6rem,1.2rem+1.6vw,2.4rem)] leading-tight font-semibold tracking-tight">{q.title}</span>
              </legend>
              {q.help && <p className="mt-2 text-ink/60">{q.help}</p>}
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {q.options.map((o, i) => {
                  const on = selected.includes(i);
                  return (
                    <button
                      key={o.label}
                      type="button"
                      onClick={() => choose(i)}
                      aria-pressed={on}
                      className={`group flex items-center gap-4 rounded-2xl p-4 text-left ring-1 transition-all duration-300 sm:p-5 ${on ? 'bg-tide-500 text-white ring-tide-500' : 'bg-sand-50 ring-ink/8 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg hover:ring-tide-500/30'}`}
                    >
                      <span className={`grid size-6 shrink-0 place-items-center border-2 transition-colors ${q.multi ? 'rounded-md' : 'rounded-full'} ${on ? 'border-white bg-white text-tide-500' : 'border-ink/20 group-hover:border-tide-500'}`}>
                        {on && (
                          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                            <path d="m5 12.5 4.5 4.5L19 7.5" />
                          </svg>
                        )}
                      </span>
                      <span>
                        <span className="block font-medium">{o.label}</span>
                        {o.hint && <span className={`block text-sm ${on ? 'text-white/75' : 'text-ink/55'}`}>{o.hint}</span>}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-8 flex items-center justify-between gap-4">
                <button type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} className={`text-sm font-semibold text-ink/60 hover:text-ink ${step === 0 ? 'invisible' : ''}`}>
                  ← Vorige vraag
                </button>
                {q.multi && (
                  <button type="button" onClick={() => setStep((s) => s + 1)} disabled={selected.length === 0} className="btn-primary disabled:pointer-events-none disabled:opacity-40">
                    Volgende
                  </button>
                )}
              </div>
            </motion.fieldset>
          ) : (
            <motion.div key="result" {...slide} aria-live="polite">
              <Result ranking={ranking} onRestart={restart} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Result({ ranking, onRestart }: { ranking: { problem: Problem; share: number }[]; onRestart: () => void }) {
  const [top, second] = ranking;
  if (!top || top.share === 0) {
    return (
      <div>
        <p className="font-display text-3xl font-semibold">We kunnen het niet goed inschatten.</p>
        <p className="mt-3 text-ink/70">Geen probleem: een vochtdiagnose ter plaatse geeft zekerheid, en die is gratis.</p>
        <a href="/offerte-aanvragen" className="btn-primary mt-8">Gratis diagnose aanvragen</a>
      </div>
    );
  }
  const r = RESULTS[top.problem];
  const pct = Math.round(top.share * 100);
  const showSecond = second && second.share > 0.2;

  return (
    <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-start">
      <Gauge pct={pct} />
      <div>
        <p className="text-sm font-semibold text-tide-500">Waarschijnlijk gaat het om</p>
        <h2 className="mt-1 font-display text-[clamp(2rem,1.5rem+2vw,3rem)] leading-tight font-semibold tracking-tight">{r.name}</h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/75">{r.summary}</p>
        <p className="mt-5 max-w-xl rounded-2xl bg-sand-100 p-4 text-[0.95rem] leading-relaxed">
          <strong className="font-semibold">Tip: </strong>
          {r.tip}
        </p>
        {showSecond && (
          <p className="mt-4 text-sm text-ink/60">
            Ook mogelijk: <a className="font-semibold text-tide-500 underline underline-offset-4" href={`/${RESULTS[second.problem].slug}`}>{RESULTS[second.problem].name.toLowerCase()}</a>. Vochtproblemen komen vaak samen voor.
          </p>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`/offerte-aanvragen?probleem=${r.slug}`} className="btn-primary">Laat het gratis nakijken</a>
          <a href={`/${r.slug}`} className="btn-ghost">Meer over {r.name.toLowerCase()}</a>
        </div>
        <p className="mt-6 text-xs text-ink/50">
          Dit is een eerste inschatting op basis van je antwoorden, geen diagnose. Alleen een meting ter plaatse geeft zekerheid.{' '}
          <button type="button" onClick={onRestart} className="font-semibold underline underline-offset-2">Opnieuw beginnen</button>
        </p>
      </div>
    </div>
  );
}

function Gauge({ pct }: { pct: number }) {
  const reduce = useReducedMotion();
  const r = 70;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative mx-auto size-44 lg:mx-0" aria-hidden="true">
      <svg viewBox="0 0 160 160" className="size-full -rotate-90">
        <circle cx="80" cy="80" r={r} fill="none" stroke="var(--color-sand-200)" strokeWidth="12" />
        <motion.circle
          cx="80"
          cy="80"
          r={r}
          fill="none"
          stroke="url(#gauge)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: reduce ? c * (1 - pct / 100) : c }}
          animate={{ strokeDashoffset: c * (1 - pct / 100) }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
        <defs>
          <linearGradient id="gauge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#00c0ff" />
            <stop offset="1" stopColor="#0a5086" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <span>
          <span className="block font-display text-4xl font-semibold tabular-nums">{pct}%</span>
          <span className="block text-xs font-medium text-ink/55">match</span>
        </span>
      </div>
    </div>
  );
}
