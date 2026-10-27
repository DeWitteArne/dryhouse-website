/**
 * Cloudflare Pages Function: POST /api/offerte
 * Validates the quote request (or a message left in the website assistant, bron=chat)
 * and emails it to Dryhouse through Resend.
 *
 * Env (Cloudflare dashboard → Settings → Variables and Secrets):
 *   RESEND_API_KEY  secret
 *   OFFERTE_TO      recipient, default info@dryhouse.be
 *   OFFERTE_FROM    verified sender, e.g. "Dryhouse website <website@dryhouse.be>"
 */
interface Env {
  RESEND_API_KEY?: string;
  OFFERTE_TO?: string;
  OFFERTE_FROM?: string;
}

const MAX_FILES = 3;
const MAX_TOTAL_BYTES = 8 * 1024 * 1024;
const REQUIRED = ['voornaam', 'familienaam', 'email', 'telefoon', 'straat', 'postcode', 'gemeente', 'omschrijving'] as const;
const CHAT_REQUIRED = ['naam', 'contact', 'bericht'] as const;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  const wantsJson = request.headers.get('Accept')?.includes('application/json');
  let form: FormData | undefined;
  try {
    form = await request.formData();
  } catch {}
  // French pages post taal=fr; without JavaScript the visitor is redirected to the page in their language.
  const fr = form?.get('taal') === 'fr';
  const page = (nl: string, frPath: string) => new URL(fr ? frPath : nl, request.url).toString();
  const fail = (status: number, message: string) =>
    wantsJson ? Response.json({ ok: false, message }, { status }) : Response.redirect(page('/offerte-aanvragen?fout=1', '/fr/demande-devis?fout=1'), 303);
  const done = () => (wantsJson ? Response.json({ ok: true }) : Response.redirect(page('/bedankt', '/fr/merci'), 303));

  if (!form) return fail(400, 'Ongeldig formulier');

  // Bots fill the hidden field; pretend it worked.
  if (String(form.get('website') ?? '').trim()) return done();

  const value = (k: string) => String(form.get(k) ?? '').trim().slice(0, 4000);
  const taal = fr ? 'Frans (antwoord in het Frans)' : 'Nederlands';
  if (value('bron') === 'chat') return chatMessage(value, taal, env, fail);

  const missing = REQUIRED.filter((k) => !value(k));
  const problems = form.getAll('probleem').map(String);
  if (missing.length || !problems.length || !form.get('akkoord')) return fail(422, 'Vul alle verplichte velden in');
  if (!EMAIL.test(value('email'))) return fail(422, 'Ongeldig e-mailadres');

  if (!env.RESEND_API_KEY) return fail(503, 'E-mailverzending is nog niet ingesteld');

  const files = form.getAll('fotos').filter((f): f is File => f instanceof File && f.size > 0 && f.type.startsWith('image/')).slice(0, MAX_FILES);
  let total = 0;
  const attachments = [];
  for (const file of files) {
    total += file.size;
    if (total > MAX_TOTAL_BYTES) break;
    attachments.push({ filename: file.name, content: toBase64(await file.arrayBuffer()) });
  }

  const rows: [string, string][] = [
    ['Probleem', problems.join(', ')],
    ['Naam', `${value('voornaam')} ${value('familienaam')}`],
    ['E-mail', value('email')],
    ['Telefoon', value('telefoon')],
    ['Adres', `${value('straat')}, ${value('postcode')} ${value('gemeente')} (${value('land') || 'België'})`],
    ['Omschrijving', value('omschrijving')],
    ['Taal', taal],
  ];
  const html = `<h2>Nieuwe aanvraag voor een vochtdiagnose</h2>${table(rows)}`;

  const sent = await sendMail(env, {
    reply_to: value('email'),
    subject: `Diagnose-aanvraag: ${value('voornaam')} ${value('familienaam')}, ${value('gemeente')}`,
    html,
    text: rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
    attachments,
  });
  if (!sent) return fail(502, 'Verzenden mislukt');

  return done();
};

/** A message left in the website assistant: name, phone or e-mail, question, plus the conversation. */
async function chatMessage(value: (k: string) => string, taal: string, env: Env, fail: (status: number, message: string) => Response) {
  if (CHAT_REQUIRED.some((k) => !value(k))) return fail(422, 'Vul alle velden in');
  if (!env.RESEND_API_KEY) return fail(503, 'E-mailverzending is nog niet ingesteld');

  const contact = value('contact');
  const rows: [string, string][] = [
    ['Naam', value('naam')],
    ['Contact', contact],
    ['Land', value('land')],
    ['Taal', taal],
    ['Vraag', value('bericht')],
    ['Pagina', value('pagina')],
    ['Gesprek', value('gesprek')],
  ];
  const html = `<h2>Nieuw bericht via de website-assistent</h2>${table(rows)}`;
  const sent = await sendMail(env, {
    ...(EMAIL.test(contact) && { reply_to: contact }),
    subject: `Bericht via de website: ${value('naam')}`,
    html,
    text: rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
  });
  return sent ? Response.json({ ok: true }) : fail(502, 'Verzenden mislukt');
}

async function sendMail(env: Env, mail: Record<string, unknown>) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.OFFERTE_FROM ?? 'Dryhouse website <website@dryhouse.be>',
      to: [env.OFFERTE_TO ?? 'info@dryhouse.be'],
      ...mail,
    }),
  });
  return res.ok;
}

function table(rows: [string, string][]) {
  return `<table cellpadding="6">${rows.map(([k, v]) => `<tr><td valign="top"><b>${k}</b></td><td>${escape(v).replace(/\n/g, '<br>')}</td></tr>`).join('')}</table>`;
}

function escape(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

function toBase64(buf: ArrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(binary);
}
