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


reveal();
initI18n();
