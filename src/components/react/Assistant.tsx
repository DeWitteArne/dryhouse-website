import { useCallback, useEffect, useRef, useState, type SubmitEvent, type ReactNode } from 'react';
import * as nl from '@/data/assistant';
import * as fr from '@/data/assistant.fr';
import { landFromPostcode, type Option } from '@/data/assistant';
import { paths, type Lang } from '@/i18n';
import { currentLand, phoneFor, setLand, type Land } from '@/lib/country';
import { site } from '@/data/site';

/**
 * Website assistant: a guided chat bubble on every page (conversation content in
 * data/assistant.ts). The conversation survives page navigation via sessionStorage.
 */

interface Msg {
  from: 'bot' | 'user';
  text: string;
}
interface Saved {
  open: boolean;
  msgs: Msg[];
  node: string | null;
  form: boolean;
}

const TEASER = 'dh-chat-teaser';
const NO_TEASER = [...Object.values(paths.offerte), ...Object.values(paths.bedankt)];

const UI = {
  nl: {
    leaveMessage: 'Laat je naam, je telefoonnummer of e-mailadres en je vraag achter. We nemen zo snel mogelijk contact met je op.',
    sent: 'Bericht verstuurd',
    failed: (phone: string, email: string) => `Het versturen lukte helaas niet. Bel ons op ${phone} of mail naar ${email}.`,
    call: (phone: string) => `Bel ${phone}`,
    teaser: ['Vochtprobleem?', 'Ik help je in een minuutje op weg.'],
    close: 'Sluiten',
    closeAssistant: 'Assistent sluiten',
    openAssistant: 'Stel je vraag aan de Dryhouse-assistent',
    name: 'Dryhouse-assistent',
    status: 'Antwoordt meteen',
    restart: 'Opnieuw beginnen',
    typing: 'De assistent typt',
    fields: { name: ['Naam', 'Je naam'], contact: ['Telefoon of e-mail', 'Telefoon of e-mailadres'], message: ['Je vraag', 'Je vraag of een korte omschrijving'] },
    privacy: 'We gebruiken je gegevens enkel om je te antwoorden.',
    privacyLink: 'Privacy',
    sending: 'Versturen…',
    send: 'Verstuur bericht',
    ask: 'Typ je vraag',
    askPlaceholder: 'Typ je vraag…',
    submit: 'Verstuur',
    countries: { be: 'België', nl: 'Nederland' },
  },
  fr: {
    leaveMessage: 'Laissez votre nom, votre numéro de téléphone ou votre adresse e-mail et votre question. Nous vous recontactons dans les plus brefs délais.',
    sent: 'Message envoyé',
    failed: (phone: string, email: string) => `L’envoi n’a malheureusement pas fonctionné. Appelez-nous au ${phone} ou écrivez à ${email}.`,
    call: (phone: string) => `Appeler le ${phone}`,
    teaser: ['Un problème d’humidité ?', 'Je vous aide en une minute.'],
    close: 'Fermer',
    closeAssistant: 'Fermer l’assistant',
    openAssistant: 'Posez votre question à l’assistant Dryhouse',
    name: 'Assistant Dryhouse',
    status: 'Répond immédiatement',
    restart: 'Recommencer',
    typing: 'L’assistant écrit',
    fields: { name: ['Nom', 'Votre nom'], contact: ['Téléphone ou e-mail', 'Téléphone ou adresse e-mail'], message: ['Votre question', 'Votre question ou une courte description'] },
    privacy: 'Nous utilisons vos données uniquement pour vous répondre.',
    privacyLink: 'Vie privée',
    sending: 'Envoi…',
    send: 'Envoyer le message',
    ask: 'Tapez votre question',
    askPlaceholder: 'Tapez votre question…',
    submit: 'Envoyer',
    countries: { be: 'Belgique', nl: 'Pays-Bas' },
  },
};
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function load(STORE: string): Saved | null {
  try {
    return JSON.parse(sessionStorage.getItem(STORE) ?? 'null');
  } catch {
    return null;
  }
}
function save(STORE: string, state: Saved) {
  try {
    sessionStorage.setItem(STORE, JSON.stringify(state));
  } catch {}
}

/** [text](/path) → link; everything else is plain text. */
function rich(text: string): ReactNode[] {
  return text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    return link ? (
      <a key={i} href={link[2]} className="font-semibold text-tide-500 underline decoration-tide-500/30 underline-offset-2 hover:decoration-tide-500">
        {link[1]}
      </a>
    ) : (
      part
    );
  });
}

export default function Assistant({ lang = 'nl' }: { lang?: Lang }) {
  // One conversation per language: switching language starts the assistant fresh.
  const STORE = `dh-chat-${lang}`;
  const { nodes, intents } = lang === 'fr' ? fr : nl;
  const t = UI[lang];
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [node, setNode] = useState<string | null>(null);
  const [form, setForm] = useState(false);
  const [typing, setTyping] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [land, setLandState] = useState<Land>('be');
  const [sending, setSending] = useState(false);
  const [restored, setRestored] = useState(false);
  const playing = useRef(0);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  // Restore after hydration (the server render is always the closed bubble).
  useEffect(() => {
    const saved = load(STORE);
    if (saved) {
      setOpen(saved.open);
      setMsgs(saved.msgs);
      // Navigated away mid-answer: offer the menu again instead of an empty prompt.
      setNode(saved.node ?? (saved.msgs.length && !saved.form ? 'menu' : null));
      setForm(saved.form);
    }
    setLandState(currentLand());
    setRestored(true);
    const onLand = (e: Event) => setLandState((e as CustomEvent<Land>).detail);
    window.addEventListener('dh:land', onLand);

    let seen = false;
    try {
      seen = sessionStorage.getItem(TEASER) !== null;
    } catch {}
    const timer = !saved && !seen && !NO_TEASER.some((p) => location.pathname.startsWith(p)) ? setTimeout(() => setTeaser(true), 9000) : undefined;
    return () => {
      window.removeEventListener('dh:land', onLand);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (restored) save(STORE, { open, msgs, node, form });
  }, [STORE, restored, open, msgs, node, form]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
  }, [msgs, typing, node, form]);

  const play = useCallback(async (id: string) => {
    const run = ++playing.current;
    const target = nodes[id] ?? nodes.onbekendeVraag;
    setNode(null);
    setForm(false);
    for (const text of target.say) {
      setTyping(true);
      await wait(Math.min(1300, 380 + text.length * 9));
      if (run !== playing.current) return;
      setTyping(false);
      setMsgs((m) => [...m, { from: 'bot', text }]);
      await wait(180);
    }
    if (run === playing.current) setNode(id);
  }, [nodes]);

  const dismissTeaser = () => {
    setTeaser(false);
    try {
      sessionStorage.setItem(TEASER, '1');
    } catch {}
  };

  const toggle = (next = !open) => {
    setOpen(next);
    dismissTeaser();
    if (next && msgs.length === 0) play('start');
    if (next) setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 250);
    else launcherRef.current?.focus();
  };

  const say = (text: string) => setMsgs((m) => [...m, { from: 'user', text }]);

  const choose = (option: Option) => {
    say(option.label);
    if ('next' in option) return play(option.next);
    if ('action' in option) {
      if (option.action === 'message') {
        setNode(null);
        setMsgs((m) => [...m, { from: 'bot', text: t.leaveMessage }]);
        return setForm(true);
      }
      const chosen = option.action === 'land-nl' ? 'nl' : 'be';
      setLand(chosen);
      return play(`regio-${chosen}`);
    }
  };

  const ask = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = inputRef.current?.value.trim();
    if (!text) return;
    inputRef.current!.value = '';
    say(text);
    const match = intents.find(([re]) => re.test(text))?.[1];
    // "1234 AB" is always a Dutch postcode; four bare digits only count when the question is about location.
    const fromPostcode = landFromPostcode(text);
    const aboutPlace = node === 'regio' || match === 'regio' || /postcode|woon|wonen/i.test(text) || /^\s*\d{4}/.test(text);
    const chosen = fromPostcode && (fromPostcode === 'nl' || aboutPlace) ? fromPostcode : match === 'regio-nl' ? 'nl' : match === 'regio-be' ? 'be' : null;
    if (chosen) {
      setLand(chosen);
      return play(`regio-${chosen}`);
    }
    play(match ?? 'onbekendeVraag');
  };

  const send = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.set('bron', 'chat');
    data.set('taal', lang);
    data.set('land', UI.nl.countries[land]);
    data.set('pagina', location.pathname);
    data.set('gesprek', msgs.map((m) => `${m.from === 'bot' ? 'Assistent' : 'Bezoeker'}: ${m.text}`).join('\n'));
    setSending(true);
    try {
      const res = await fetch('/api/offerte', { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      say(t.sent);
      play('bedankt');
    } catch {
      const phone = phoneFor(land);
      setMsgs((m) => [...m, { from: 'bot', text: t.failed(phone.display, site.email) }]);
    } finally {
      setSending(false);
    }
  };

  const restart = () => {
    playing.current++;
    setMsgs([]);
    setForm(false);
    setTyping(false);
    play('start');
  };

  const optionHref = (href: string) => (href === '$tel' ? `tel:${phoneFor(land).tel}` : href === '$mail' ? `mailto:${site.email}` : href);
  const optionLabel = (o: Option) => ('href' in o && o.href === '$tel' ? t.call(phoneFor(land).display) : o.label);
  const current = node ? nodes[node] : null;
  const chip =
    'inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-left text-sm font-medium text-tide-600 ring-1 ring-tide-500/25 transition-colors hover:bg-tide-500 hover:text-white hover:ring-tide-500';
  const field = 'block w-full rounded-xl border-0 bg-white px-3.5 py-2.5 text-base ring-1 ring-ink/10 placeholder:text-ink/40 sm:text-sm focus:ring-2 focus:ring-tide-500 focus:outline-none';

  return (
    <div className="print:hidden" onKeyDown={(e) => e.key === 'Escape' && open && toggle(false)}>
      {teaser && !open && (
        <div className="fixed right-5 bottom-24 z-40 flex max-w-[16rem] animate-[chat-in_.5s_var(--ease-out-expo)_both] items-start gap-2 rounded-2xl rounded-br-md bg-white p-4 text-sm shadow-xl ring-1 ring-ink/5">
          <button type="button" onClick={() => toggle(true)} className="text-left">
            <span className="block font-semibold">{t.teaser[0]}</span>
            <span className="mt-0.5 block text-ink/65">{t.teaser[1]}</span>
          </button>
          <button type="button" onClick={dismissTeaser} aria-label={t.close} className="-mt-1 -mr-1 grid size-7 shrink-0 place-items-center rounded-full text-ink/40 hover:bg-sand-100 hover:text-ink">
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m6 6 12 12M18 6 6 18" /></svg>
          </button>
        </div>
      )}

      <button
        ref={launcherRef}
        type="button"
        onClick={() => toggle()}
        aria-expanded={open}
        aria-controls="dh-assistant"
        aria-label={open ? t.closeAssistant : t.openAssistant}
        className={`fixed right-5 bottom-5 z-40 grid size-15 place-items-center rounded-full bg-tide-500 text-white shadow-[0_10px_30px_-8px_rgb(10_80_134/0.7)] transition-[transform,background-color] duration-300 ease-(--ease-out-expo) hover:scale-105 hover:bg-tide-600 active:scale-95 ${open ? 'max-sm:hidden' : ''}`}
      >
        {!open && msgs.length === 0 && <span aria-hidden="true" className="absolute inset-0 animate-[chat-ping_2.8s_ease-out_infinite] rounded-full bg-tide-500" />}
        <svg viewBox="0 0 24 24" className={`relative size-7 transition-transform duration-300 ${open ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {open ? (
            <path d="m6 6 12 12M18 6 6 18" />
          ) : (
            <>
              <path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12Z" />
              <path d="M12 8.2c1.2 1.4 1.8 2.4 1.8 3.1a1.8 1.8 0 0 1-3.6 0c0-.7.6-1.7 1.8-3.1Z" fill="#00c0ff" stroke="none" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <section
          id="dh-assistant"
          role="dialog"
          aria-label={t.name}
          className="fixed inset-x-3 bottom-3 z-40 flex h-[min(38rem,calc(100dvh-1.5rem))] origin-bottom-right animate-[chat-open_.4s_var(--ease-out-expo)_both] flex-col overflow-hidden rounded-3xl bg-sand-50 shadow-[0_30px_80px_-20px_rgb(12_24_34/0.45)] ring-1 ring-ink/10 sm:inset-x-auto sm:right-5 sm:bottom-24 sm:w-[24rem] sm:h-[min(38rem,calc(100dvh-8rem))]"
        >
          <header className="flex items-center gap-3 bg-tide-800 px-4 py-3.5 text-white">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white">
              <img src="/images/brand/dryhouse-mark.svg" alt="" width="103" height="108" className="h-6 w-auto" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold">{t.name}</span>
              <span className="flex items-center gap-1.5 text-xs text-white/65">
                <span className="size-1.5 rounded-full bg-emerald-400" /> {t.status}
              </span>
            </span>
            <button type="button" onClick={restart} aria-label={t.restart} title={t.restart} className="grid size-9 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white">
              <svg viewBox="0 0 24 24" className="size-[1.1rem]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12a8 8 0 1 0 2.4-5.7L4 8.5M4 4v4.5h4.5" /></svg>
            </button>
            <button type="button" onClick={() => toggle(false)} aria-label={t.close} className="grid size-9 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="m6 6 12 12M18 6 6 18" /></svg>
            </button>
          </header>

          <div ref={logRef} className="flex-1 space-y-2.5 overflow-y-auto overscroll-contain px-4 py-5" aria-live="polite">
            {msgs.map((m, i) => (
              <p
                key={i}
                className={`w-fit max-w-[85%] animate-[chat-in_.35s_var(--ease-out-expo)_both] rounded-2xl px-4 py-2.5 text-[0.94rem] leading-snug ${
                  m.from === 'bot' ? 'rounded-bl-md bg-white text-ink ring-1 ring-ink/5' : 'ml-auto rounded-br-md bg-tide-500 text-white'
                }`}
              >
                {m.from === 'bot' ? rich(m.text) : m.text}
              </p>
            ))}
            {typing && (
              <p className="flex w-fit gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3.5 ring-1 ring-ink/5" aria-label={t.typing}>
                {[0, 1, 2].map((d) => (
                  <span key={d} className="size-1.5 animate-[chat-dot_1s_ease-in-out_infinite] rounded-full bg-ink/40" style={{ animationDelay: `${d * 0.15}s` }} />
                ))}
              </p>
            )}
            {current && (
              <div className="flex animate-[chat-in_.35s_var(--ease-out-expo)_both] flex-wrap gap-2 pt-1">
                {current.options.map((o) =>
                  'href' in o ? (
                    <a key={o.label} href={optionHref(o.href)} className={chip} onClick={() => say(optionLabel(o))}>
                      {optionLabel(o)}
                      <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
                    </a>
                  ) : (
                    <button key={o.label} type="button" className={chip} onClick={() => choose(o)}>
                      {o.label}
                    </button>
                  ),
                )}
              </div>
            )}
            {form && (
              <form onSubmit={send} className="animate-[chat-in_.35s_var(--ease-out-expo)_both] space-y-2 rounded-2xl bg-sand-100 p-3">
                <label className="sr-only" htmlFor="dh-naam">{t.fields.name[0]}</label>
                <input id="dh-naam" name="naam" required autoComplete="name" placeholder={t.fields.name[1]} className={field} />
                <label className="sr-only" htmlFor="dh-contact">{t.fields.contact[0]}</label>
                <input id="dh-contact" name="contact" required autoComplete="email" placeholder={t.fields.contact[1]} className={field} />
                <label className="sr-only" htmlFor="dh-bericht">{t.fields.message[0]}</label>
                <textarea id="dh-bericht" name="bericht" required rows={3} placeholder={t.fields.message[1]} className={field} />
                <div aria-hidden="true" className="absolute -left-[9999px]">
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </div>
                <p className="px-1 text-xs text-ink/65">
                  {t.privacy}{' '}
                  <a href={paths.privacy[lang]} className="underline">
                    {t.privacyLink}
                  </a>
                </p>
                <button type="submit" disabled={sending} className="btn-primary w-full !py-2.5 disabled:opacity-60">
                  {sending ? t.sending : t.send}
                </button>
              </form>
            )}
          </div>

          <form onSubmit={ask} className="flex items-center gap-2 border-t border-ink/8 bg-white p-2.5">
            <label htmlFor="dh-vraag" className="sr-only">{t.ask}</label>
            <input id="dh-vraag" ref={inputRef} autoComplete="off" placeholder={t.askPlaceholder} className="min-w-0 flex-1 rounded-full bg-sand-100 px-4 py-2.5 text-base placeholder:text-ink/45 sm:text-sm focus:ring-2 focus:ring-tide-500 focus:outline-none" />
            <button type="submit" aria-label={t.submit} className="grid size-10 shrink-0 place-items-center rounded-full bg-tide-500 text-white transition-colors hover:bg-tide-600">
              <svg viewBox="0 0 24 24" className="size-[1.1rem]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
            </button>
          </form>
        </section>
      )}
    </div>
  );
}
