import { SITE, SERVICES, FEATURED, serviceUrl } from './config.js';
import { icon } from './icons.js';
import { $, $$, chrome, reveal, fileDrop, submitForm, modal } from './shared.js';
import { initI18n, t } from './i18n.js';

chrome();

// data-i="name" → Icon voranstellen
$$('[data-i]').forEach((el) => el.insertAdjacentHTML('afterbegin', icon(el.dataset.i, el.classList.contains('btn') ? 18 : 20)));

// Kostenrechner (Vollbild)
$$('[data-calc]').forEach((b) => (b.onclick = (e) => { e.preventDefault(); import('./wizard.js').then((m) => m.openWizard({ preset: b.dataset.calc || undefined })); }));
if (location.hash === '#rechner') import('./wizard.js').then((m) => m.openWizard());

// Videos: sanft überblenden beim Loop, nur abspielen wenn sichtbar
$$('section video').forEach((v) => {
  new IntersectionObserver(([e]) => { if (e.isIntersecting) { v.preload = 'auto'; v.play().catch(() => {}); } else v.pause(); }).observe(v);
  v.addEventListener('timeupdate', () => { v.style.opacity = v.duration && v.duration - v.currentTime < 0.6 ? 0.35 : 1; });
});

// Laufband
const mq = SERVICES.map((s) => `<span>${s.title}</span>`).join('');
$('#mq').innerHTML = mq + mq;

// Leistungen: 6 auf der Startseite, alle auf /leistungen
const grid = $('#svc');
const feat = FEATURED.map((id) => SERVICES.find((s) => s.id === id));
grid.innerHTML = feat.map((s, i) => `
  <a class="svc reveal" href="${serviceUrl(s)}" style="text-decoration:none">
    <span class="num">${String(i + 1).padStart(2, '0')}</span>
    <div class="ic">${icon(s.icon, 28)}</div>
    <h3>${s.title}</h3><p>${s.short}</p>
    <span class="more">Details ${icon('arrow', 16)}</span>
  </a>`).join('') + `
  <a class="svc svc-all reveal" href="/leistungen">
    <div class="ic">${icon('plus', 28)}</div>
    <div><h3>+ ${SERVICES.length - feat.length} weitere Leistungen</h3><p>Fassade, Tiefgarage, Büro, Entrümpelung, Gravur, Reparaturen und mehr.</p></div>
    <span class="more">Alle Leistungen ansehen ${icon('arrow', 16)}</span>
  </a>`;
$$('.svc').forEach((c) => {
  c.onpointermove = (e) => {
    const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    c.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
  };
  c.onpointerleave = () => (c.style.transform = '');
});

// Einsatzgebiet
$('#areas').innerHTML = SITE.areas.map((a) => `<span>${icon('pin', 14)}${a}</span>`).join('');

// Galerie-Platzhalter
const galItems = [['Treppenhaus vorher/nachher', 'stairs'], ['Grünpflege', 'leaf'], ['Winterdienst', 'snow'], ['Unser Team', 'user'], ['Fassade', 'building'], ['PV-Reinigung', 'sun'], ['Tiefgarage', 'car']];
$('#gal').innerHTML = galItems.map(([t, i]) => `<figure>${icon(i, 40)}<figcaption>${t} · Foto folgt</figcaption></figure>`).join('');

// Jobs
const JOBS = [
  { area: 'Gebäudereinigung', title: 'Reinigung und Pflege von Treppenhäusern',
    intro: 'Sie arbeiten gerne sorgfältig und sehen sofort, wo es glänzen muss? Sie sind zuverlässig und arbeiten gerne selbstständig, aber auch im Team? Dann suchen wir Sie zum nächstmöglichen Zeitpunkt.',
    tasks: ['Reinigung von Treppenhäusern und Eingangsbereichen', 'Pflege von Glastüren, Handläufen und Briefkastenanlagen', 'Reinigung von Keller- und Gemeinschaftsräumen', 'Kurze Dokumentation der Einsätze'],
    needs: ['Erfahrung in der Reinigung von Vorteil', 'Zuverlässigkeit und Sorgfalt', 'Gepflegtes und freundliches Auftreten', 'Deutsche Sprachkenntnisse', 'Führerschein Klasse B wünschenswert'] },
  { area: 'Grün- und Außenanlagenpflege', title: 'Außenreinigung und Grünanlagenpflege',
    intro: 'Mögen Sie auch den Geruch von frisch gemähtem Rasen? Sie haben Spaß am Umgang mit Menschen? Arbeiten gerne alleine, aber auch im Team? Sie haben Freude an anspruchsvollen Aufgabenstellungen? Dann suchen wir Sie zum nächstmöglichen Zeitpunkt.',
    tasks: ['Reinigung und Pflege von Außen- und Grünanlagen', 'Schneiden von Hecken und Büschen', 'Rasenmähen', 'Winterdienst'],
    needs: ['Gärtnerische Fähigkeiten', 'Bereitschaft, Neues zu lernen', 'Gepflegtes und freundliches Auftreten', 'Führerschein Klasse B bzw. 3 erforderlich', 'Deutsche Sprachkenntnisse', 'Teamfähigkeit'] },
];
const OFFER = ['Eine verantwortungsvolle und abwechslungsreiche Tätigkeit', 'Ein inhabergeführtes Familienunternehmen', 'Technisch gut ausgestattete Fahrzeuge', 'Modernste Maschinen', 'Gute Bezahlung', 'Geburtstagsprämie', '30 Tage Urlaub', 'Förderung bei Weiterbildungsmaßnahmen', 'Regelmäßige Teamevents'];
const li = (a) => `<ul>${a.map((x) => `<li>${x}</li>`).join('')}</ul>`;
$('#jobs').innerHTML = JOBS.map((j, i) => `
  <details class="job reveal"${i === 0 ? ' open' : ''}>
    <summary><div><small>${j.area}</small><h3>${j.title}</h3></div><span class="tog">${icon('plus')}</span></summary>
    <div class="job-body">
      <p class="intro">${j.intro}</p>
      <div><h4>Welche Aufgaben erwarten Sie?</h4>${li(j.tasks)}</div>
      <div><h4>Was bringen Sie mit?</h4>${li(j.needs)}</div>
      <div><h4>Was können Sie von uns erwarten?</h4>${li(OFFER)}</div>
      <div class="apply">
        <button class="btn btn-primary" data-apply="${j.title}">Hier online bewerben →</button>
        <a class="btn btn-ghost" href="tel:${SITE.phone}">${icon('phone', 18)} ${SITE.phoneDisplay}</a>
        <span class="note">Oder per E-Mail an ${SITE.email}</span>
      </div>
    </div>
  </details>`).join('');

$$('[data-apply]').forEach((b) => (b.onclick = () => {
  const m = modal(`<span class="eyebrow">Bewerbung</span><h2 style="font-size:1.7rem;margin-bottom:20px">${b.dataset.apply}</h2>
  <form class="form" id="f-job">
    <input type="hidden" name="stelle" value="${b.dataset.apply}">
    <div class="grid2">
      <div class="field"><label>Vorname <em>*</em></label><input name="vorname" required></div>
      <div class="field"><label>Name <em>*</em></label><input name="name" required></div>
      <div class="field"><label>Telefon <em>*</em></label><input name="telefon" type="tel" required></div>
      <div class="field"><label>E-Mail</label><input name="email" type="email"></div>
      <div class="field"><label>Frühester Eintritt</label><input name="eintritt" type="date"></div>
      <div class="field"><label>Führerschein Klasse B?</label><select name="fuehrerschein"><option>Ja</option><option>Nein</option></select></div>
    </div>
    <div class="field"><label>Kurz zu Ihnen</label><textarea name="nachricht" placeholder="Erfahrung, Verfügbarkeit, Fragen …"></textarea></div>
    <div class="field"><label>Lebenslauf, Zeugnisse, Empfehlungen (PDF oder Foto)</label><div data-drop></div></div>
    <label class="consent"><input type="checkbox" name="datenschutz" required><span>Ich stimme der Verarbeitung meiner Bewerbungsdaten gemäß <a href="/datenschutz" target="_blank">Datenschutzerklärung</a> zu. <em class="blue">*</em></span></label>
    <button class="btn btn-primary" type="submit">Bewerbung absenden →</button>
  </form>`);
  const drop = fileDrop($('[data-drop]', m.el), { accept: 'image/*,application/pdf', max: 5, label: 'Dateien hochladen' });
  $('#f-job', m.el).onsubmit = async (e) => { e.preventDefault(); if (await submitForm(e.target, 'Bewerbung', { files: drop.files })) drop.reset(); };
}));

// Kontakt-Tabs
$$('#tabs button').forEach((b) => (b.onclick = () => {
  $$('#tabs button').forEach((x) => x.classList.toggle('on', x === b));
  ['allg', 'zaehler', 'gravur'].forEach((t) => ($(`#f-${t}`).hidden = t !== b.dataset.t));
}));
if (location.hash === '#zaehlerablesung') $('[data-t=zaehler]').click();

// Info-Karte
$('#info').innerHTML = `
  <h3 style="margin-bottom:10px">Direkt erreichen</h3>
  <a class="it" href="tel:${SITE.phone}">${icon('phone')}<div><small>Telefon / Notdienst</small>${SITE.phoneDisplay}</div></a>
  <a class="it" href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener">${icon('wa')}<div><small>WhatsApp</small>Nachricht schreiben</div></a>
  <a class="it" href="mailto:${SITE.email}">${icon('mail')}<div><small>E-Mail</small>${SITE.email}</div></a>
  <div class="it">${icon('pin')}<div><small>Adresse</small>${SITE.street}<br>${SITE.zip} ${SITE.city}</div></div>
  <div class="it" style="border:0">${icon('clock')}<div><small>Bürozeiten</small>${SITE.hours}</div></div>`;

// Zähler 1–3
const meterOpts = ['Strom', 'Gas', 'Wasser (kalt)', 'Wasser (warm)', 'Heizung / Wärmemengenzähler', 'Heizkostenverteiler', 'Sonstiges'];
$('#meters').innerHTML = [1, 2, 3].map((n) => `<div class="meter-row">
  <div class="field"><label>Zähler ${n}: ${n === 1 ? '<em>*</em>' : ''}</label><select name="zaehler${n}" ${n === 1 ? 'required' : ''}><option value="">bitte wählen Sie</option>${meterOpts.map((o) => `<option>${o}</option>`).join('')}</select></div>
  <div class="field"><label>Zählernummer</label><input name="zaehlernummer${n}"></div></div>`).join('');
$$('[name=gleiche_adresse]').forEach((r) => (r.onchange = () => ($('#other-addr').hidden = r.value === 'ja' && r.checked)));

// Gespeicherte Adresse (nur bei „Ja“)
const KEY = 'siedler_adresse', ADDR = ['anrede', 'vorname', 'name', 'firma', 'plz', 'ort', 'strasse', 'hausnr', 'telefon', 'email'];
try {
  const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
  if (saved) ['#f-zaehler', '#f-allg'].forEach((f) => ADDR.forEach((k) => { const el = $(`${f} [name=${k}]`); if (el && saved[k]) el.value = saved[k]; }));
} catch {}

// Formulare
const drops = {};
$$('form.panel').forEach((f) => {
  const d = $('[data-drop]', f);
  if (d) drops[f.id] = fileDrop(d);
  f.onsubmit = async (e) => {
    e.preventDefault();
    if (f.id === 'f-allg' && !$$('[data-phone]', f).some((i) => i.value.trim())) {
      $('[data-phone]', f).focus(); alert(t('Bitte geben Sie mindestens eine Telefonnummer an.')); return;
    }
    if (f.id === 'f-gravur' && !$$('[name=schild]:checked', f).length) { alert(t('Bitte wählen Sie die Art des Schildes.')); return; }
    if (f.id === 'f-zaehler') {
      try {
        if ($('[name=speichern]:checked', f).value === 'ja') localStorage.setItem(KEY, JSON.stringify(Object.fromEntries(ADDR.map((k) => [k, $(`[name=${k}]`, f)?.value || '']))));
        else localStorage.removeItem(KEY);
      } catch {}
    }
    const ok = await submitForm(f, f.dataset.type, { files: drops[f.id]?.files || [] });
    if (ok) drops[f.id]?.reset();
  };
});

reveal();
initI18n();
