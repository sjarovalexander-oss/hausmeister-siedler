// Seite /karriere
import { SITE } from './config.js';
import { icon } from './icons.js';
import { $, $$, chrome, reveal, fileDrop, submitForm, modal } from './shared.js';
import { initI18n, t } from './i18n.js';

chrome();
$$('[data-i]').forEach((el) => el.insertAdjacentHTML('afterbegin', icon(el.dataset.i, el.classList.contains('btn') ? 18 : 20)));
$$('[data-calc]').forEach((b) => (b.onclick = (e) => { e.preventDefault(); import('./wizard.js').then((m) => m.openWizard({ preset: b.dataset.calc || undefined })); }));
$$('section video').forEach((v) => {
  new IntersectionObserver(([e]) => { if (e.isIntersecting) { v.preload = 'auto'; v.play().catch(() => {}); } else v.pause(); }).observe(v);
  v.addEventListener('timeupdate', () => { v.style.opacity = v.duration && v.duration - v.currentTime < 0.6 ? 0.35 : 1; });
});

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


reveal();
initI18n();
