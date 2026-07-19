/**
 * Netlify event function — runs automatically after every VERIFIED contact-form
 * submission (spam filtered by Netlify first). It emails, via Resend:
 *
 *   1. the visitor  — a confirmation carrying the KDT-… reference and a copy of
 *                     their message (reply-to: the artist), in the language of
 *                     the form they used (contact = EN, contact-fr = FR);
 *   2. the artist   — the full message with the same reference
 *                     (reply-to: the visitor, so she can answer directly).
 *
 * Both sides hold the same reference code, so any follow-up can point to the
 * exact message. Configuration (Netlify → Environment variables):
 *
 *   RESEND_API_KEY        required for sending. If absent, this function logs
 *                         and exits 200 — the submission is still stored in
 *                         Netlify → Forms and the dashboard email notification
 *                         (deployment.md §3b) still reaches the artist.
 *   CONTACT_FROM          optional sender override.
 *                         Default: Kunga DEMPA TSANG <contact@kungadempatsang.com>
 *                         (the domain must be verified in Resend — see docs).
 *   CONTACT_ARTIST_EMAIL  optional recipient override. Default: dempatsang@gmail.com
 */

// Shared with the on-page generator — only used when a submission arrives
// without a reference (e.g. JavaScript disabled).
import { makeRef } from '../../src/lib/reference.mjs';

const RESEND_URL = 'https://api.resend.com/emails';

const escapeHtml = (s = '') =>
  String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const T = {
  en: {
    subjectVisitor: (ref) => `Your message to Kunga DEMPA TSANG (${ref})`,
    greeting: (name) => `Hello ${name},`,
    received:
      'Thank you for your message — it has been received. I read every note and will reply to you at this address.',
    refLine: 'Your reference — please keep it for any follow-up:',
    copyLabel: 'A copy of your message',
    signoff: 'Kunga DEMPA TSANG',
    location: 'Painter — Paris, France',
  },
  fr: {
    subjectVisitor: (ref) => `Votre message à Kunga DEMPA TSANG (${ref})`,
    greeting: (name) => `Bonjour ${name},`,
    received:
      'Merci pour votre message — il a bien été reçu. Je lis chaque note et je vous répondrai à cette adresse.',
    refLine: 'Votre référence — à conserver pour tout échange :',
    copyLabel: 'Copie de votre message',
    signoff: 'Kunga DEMPA TSANG',
    location: 'Peintre — Paris, France',
  },
};

// Minimal, quiet HTML shell on the site's palette (cool fog / ink).
const shell = (inner) => `
<div style="margin:0;padding:32px 16px;background:#e7e8e6;">
  <div style="max-width:560px;margin:0 auto;padding:32px 28px;background:#ffffff;border:1px solid #d3d5d0;
              font-family:Georgia, 'Times New Roman', serif;color:#1b2027;font-size:16px;line-height:1.65;">
    ${inner}
  </div>
</div>`;

const refBox = (ref) => `
<div style="margin:20px 0;padding:10px 14px;display:inline-block;background:#eeefec;border:1px solid #d3d5d0;">
  <span style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#5b6168;">Ref&nbsp;</span>
  <strong style="font-size:16px;letter-spacing:1px;">${escapeHtml(ref)}</strong>
</div>`;

const quoted = (label, message) => `
<p style="margin:24px 0 6px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#5b6168;">${label}</p>
<blockquote style="margin:0;padding:2px 0 2px 14px;border-left:3px solid #3d4c5e;color:#3a4048;white-space:pre-wrap;">${escapeHtml(message)}</blockquote>`;

function visitorEmail({ lang, name, message, reference }) {
  const t = T[lang];
  const html = shell(`
    <p style="margin:0 0 16px;">${escapeHtml(t.greeting(name))}</p>
    <p style="margin:0 0 8px;">${t.received}</p>
    <p style="margin:16px 0 0;">${t.refLine}</p>
    ${refBox(reference)}
    ${quoted(t.copyLabel, message)}
    <p style="margin:28px 0 0;">—<br>${t.signoff}<br>
      <span style="color:#5b6168;font-size:14px;">${t.location}</span></p>
  `);
  const text = [
    t.greeting(name),
    '',
    t.received,
    '',
    `${t.refLine} ${reference}`,
    '',
    `${t.copyLabel}:`,
    message,
    '',
    `— ${t.signoff}`,
  ].join('\n');
  return { subject: t.subjectVisitor(reference), html, text };
}

function artistEmail({ lang, name, email, message, reference }) {
  const html = shell(`
    <p style="margin:0 0 4px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#5b6168;">
      Nouveau message — site kungadempatsang.com (${lang === 'fr' ? 'formulaire FR' : 'formulaire EN'})</p>
    <p style="margin:12px 0 2px;"><strong>${escapeHtml(name)}</strong>
      &lt;<a href="mailto:${escapeHtml(email)}" style="color:#3d4c5e;">${escapeHtml(email)}</a>&gt;</p>
    ${refBox(reference)}
    ${quoted('Message', message)}
    <p style="margin:24px 0 0;color:#5b6168;font-size:14px;">
      Répondre à cet e-mail répond directement au visiteur (le même code référence lui a été envoyé).</p>
  `);
  const text = [
    `Nouveau message — ${lang === 'fr' ? 'formulaire FR' : 'formulaire EN'}`,
    `De : ${name} <${email}>`,
    `Référence : ${reference}`,
    '',
    message,
  ].join('\n');
  return { subject: `Nouveau message de ${name} (${reference})`, html, text };
}

async function send(apiKey, payload) {
  const res = await fetch(RESEND_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  return res.json();
}

export const handler = async (event) => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM || 'Kunga DEMPA TSANG <contact@kungadempatsang.com>';
  const artist = process.env.CONTACT_ARTIST_EMAIL || 'dempatsang@gmail.com';

  let data = {};
  let formName = '';
  try {
    const payload = JSON.parse(event.body || '{}').payload || {};
    data = payload.data || {};
    formName = payload.form_name || data['form-name'] || '';
  } catch {
    console.error('submission-created: unparseable event body');
    return { statusCode: 200, body: 'ignored' };
  }

  const lang = formName === 'contact-fr' ? 'fr' : 'en';
  const name = (data.name || '').toString().trim() || (lang === 'fr' ? 'visiteur' : 'visitor');
  const email = (data.email || '').toString().trim();
  const message = (data.message || '').toString();
  const reference = (data.reference || '').toString().trim() || makeRef();

  if (!apiKey) {
    console.log(`submission-created: RESEND_API_KEY not set — skipping emails (ref ${reference}).`);
    return { statusCode: 200, body: 'no mailer configured' };
  }

  const jobs = [];
  if (email) {
    const v = visitorEmail({ lang, name, message, reference });
    jobs.push(
      send(apiKey, {
        from,
        to: [email],
        reply_to: artist,
        subject: v.subject,
        html: v.html,
        text: v.text,
      }),
    );
  }
  const a = artistEmail({ lang, name, email, message, reference });
  jobs.push(
    send(apiKey, {
      from,
      to: [artist],
      ...(email ? { reply_to: email } : {}),
      subject: a.subject,
      html: a.html,
      text: a.text,
    }),
  );

  const results = await Promise.allSettled(jobs);
  results.forEach((r, i) => {
    if (r.status === 'rejected') console.error(`submission-created: email ${i} failed —`, r.reason);
  });

  // Always 200: the submission itself is already safely stored by Netlify Forms.
  return { statusCode: 200, body: `ok (${reference})` };
};
