// Seite /kontakt
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

// Kontakt-Tabs
$$('#tabs button').forEach((b) => (b.onclick = () => {
  $$('#tabs button').forEach((x) => x.classList.toggle('on', x === b));
  ['allg', 'zaehler', 'gravur'].forEach((t) => ($(`#f-${t}`).hidden = t !== b.dataset.t));
}));
const H = { '#zaehlerablesung': 'zaehler', '#zaehler': 'zaehler', '#gravur': 'gravur', '#allgemein': 'allg' }[location.hash];
if (H) $(`[data-t=${H}]`).click();

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
