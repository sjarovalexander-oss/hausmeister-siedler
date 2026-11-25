# Hausmeisterservice – Siedler GmbH · Website

Statische Seite + Vercel-Funktion `/api/anfrage` (alle Formulare).

- `js/config.js` – Firmendaten, 18 Leistungen und **alle Preise des Kostenrechners** (Richtwerte, netto). Hier ändern.
- `index.html` – Startseite (3D-Haus, Leistungen, Über uns, Galerie, Karriere, Kontakt mit 3 Formularen)
- `kostenrechner.html` – Konfigurator mit Preisspanne + Anfrage mit Foto-Upload
- `impressum.html`, `datenschutz.html`

## Vercel Environment Variables
| Variable | Zweck |
|---|---|
| `RESEND_API_KEY` | E-Mail-Versand (ohne Key: Demo-Modus, Anfragen nur im Log) |
| `MAIL_TO` | Empfänger der Anfragen |
| `MAIL_FROM` | Verifizierter Absender, z. B. `Website <web@hausmeisterservice-siedler.de>` |
| `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | optional, Sofort-Benachrichtigung |
