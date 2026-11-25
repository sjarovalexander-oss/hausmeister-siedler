// Vercel Serverless Function: nimmt alle Formulare entgegen.
// Versand per Resend, sobald RESEND_API_KEY gesetzt ist.
// ENV: RESEND_API_KEY, MAIL_TO (Empfänger), MAIL_FROM (verifizierte Absenderadresse)
//      optional: TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID für Sofort-Benachrichtigung

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const LABELS = {
  anrede: 'Anrede', vorname: 'Vorname', name: 'Name', firma: 'Firma', postfach: 'Postfach', plz: 'PLZ', ort: 'Ort', strasse: 'Straße', hausnr: 'Hausnummer',
  telefon: 'Telefon', telefon_geschaeftlich: 'Telefon (geschäftlich)', telefon_mobil: 'Telefon (mobil)', email: 'E-Mail', erreichbar: 'Erreichbar',
  anliegen: 'Informationen zu', mitteilung: 'Mitteilung', kopie: 'Kopie an Absender', datenschutz: 'Datenschutz akzeptiert', sprache: 'Sprache der Website',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false });
  const { type = 'Anfrage', data = {}, files = [], calc } = req.body || {};
  if (!data.datenschutz) return res.status(400).json({ ok: false, error: 'Datenschutz nicht akzeptiert' });
  if (JSON.stringify(req.body).length > 4_300_000) return res.status(413).json({ ok: false, error: 'Dateien zu groß' });

  const rows = Object.entries(data).filter(([k]) => k !== 'datenschutz')
    .map(([k, v]) => `<tr><td style="padding:6px 12px;color:#5E6670">${esc(LABELS[k] || k)}</td><td style="padding:6px 12px"><b>${esc(v).replace(/\n/g, '<br>')}</b></td></tr>`).join('');
  const html = `<div style="font-family:Arial,sans-serif"><h2 style="color:#008EEF">Neue Anfrage: ${esc(type)}</h2>
    <table style="border-collapse:collapse">${rows}</table>
    ${calc ? `<h3>Kostenrechner</h3><pre style="background:#F5F7FA;padding:12px;border-radius:8px">${esc(calc)}</pre>` : ''}
    <p style="color:#979592">${files.length} Datei(en) im Anhang · gesendet über die Website</p></div>`;

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log('[DEMO] Anfrage', type, data, calc, `${files.length} Dateien`);
    return res.status(200).json({ ok: true, demo: true });
  }

  const attachments = files.slice(0, 8).map((f, i) => ({ filename: f.name || `datei-${i + 1}.jpg`, content: String(f.data).split(',')[1] }));
  const from = process.env.MAIL_FROM || 'Website <onboarding@resend.dev>';
  const send = (to, subject, body, att) => fetch('https://api.resend.com/emails', {
    method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to, subject, html: body, reply_to: data.email || undefined, attachments: att }),
  });

  const r = await send(process.env.MAIL_TO, `${type} – ${data.name || data.vorname || ''}`.trim(), html, attachments);
  if (!r.ok) { console.error(await r.text()); return res.status(502).json({ ok: false, error: 'Versand fehlgeschlagen' }); }

  if (data.kopie === 'ja' && data.email) await send(data.email, 'Kopie Ihrer Anfrage – Hausmeisterservice Siedler', html, []).catch(() => {});

  const tg = process.env.TELEGRAM_BOT_TOKEN, chat = process.env.TELEGRAM_CHAT_ID;
  if (tg && chat) {
    await fetch(`https://api.telegram.org/bot${tg}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chat, text: `🔔 ${type}\n${data.vorname || ''} ${data.name || ''}\n☎ ${data.telefon || data.telefon_mobil || '-'}` }) }).catch(() => {});
  }
  return res.status(200).json({ ok: true });
}

export const config = { api: { bodyParser: { sizeLimit: '4.5mb' } } };
