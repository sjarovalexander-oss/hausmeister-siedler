import { SITE } from './config.js';
import { icon } from './icons.js';

export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];
export const eur = (n) => n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

const NAV = [
  ['/#leistungen', 'Leistungen'],
  ['/kostenrechner', 'Kostenrechner'],
  ['/#ueber-uns', 'Über uns'],
  ['/#galerie', 'Galerie'],
  ['/#karriere', 'Karriere'],
  ['/#kontakt', 'Kontakt'],
];

export function chrome() {
  const header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = `
    <a class="brand" href="/" aria-label="Startseite">
      <img src="/assets/logo-sm.png" alt="Hausmeisterservice Siedler Logo" width="52" height="50">
      <span><b>Hausmeisterservice</b><i>Siedler GmbH</i></span>
    </a>
    <nav class="nav">${NAV.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}</nav>
    <a class="btn btn-primary btn-sm hide-m" href="tel:${SITE.phone}">${icon('phone', 18)} Anrufen</a>
    <button class="burger" aria-label="Menü">${icon('menu')}</button>`;
  document.body.prepend(header);
  $('.burger', header).onclick = () => header.classList.toggle('open');
  $$('.nav a', header).forEach((a) => (a.onclick = () => header.classList.remove('open')));
  const onScroll = () => header.classList.toggle('scrolled', scrollY > 20);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Kontakt-Buttons rechts
  const fab = document.createElement('div');
  fab.className = 'fab';
  const items = [
    ['wa', `https://wa.me/${SITE.whatsapp}`, 'WhatsApp', 'wa'],
    ['phone', `tel:${SITE.phone}`, 'Anrufen', 'call'],
    ['mail', `mailto:${SITE.email}`, 'E-Mail', 'mail'],
    ['ig', SITE.instagram, 'Instagram', 'ig'],
    ['fb', SITE.facebook, 'Facebook', 'fb'],
  ].filter((i) => i[1]);
  fab.innerHTML = items.map(([ic, href, label, cls]) => `<a class="fab-${cls}" href="${href}" target="${href.startsWith('http') ? '_blank' : '_self'}" rel="noopener" aria-label="${label}">${icon(ic, 22)}<span>${label}</span></a>`).join('');
  document.body.append(fab);

  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="wrap foot-grid">
      <div>
        <img src="/assets/logo-sm.png" alt="" width="96" height="93">
        <p><b>${SITE.name}</b><br>${SITE.street}<br>${SITE.zip} ${SITE.city}</p>
      </div>
      <div><h4>Kontakt</h4>
        <p><a href="tel:${SITE.phone}">${SITE.phoneDisplay}</a><br><a href="mailto:${SITE.email}">${SITE.email}</a><br>${SITE.hours}</p></div>
      <div><h4>Service</h4>
        <p><a href="/#leistungen">Alle Leistungen</a><br><a href="/kostenrechner">Kostenrechner</a><br><a href="/#kontakt">Zählerablesung</a><br><a href="/#karriere">Jobs</a></p></div>
      <div><h4>Rechtliches</h4>
        <p><a href="/impressum">Impressum</a><br><a href="/datenschutz">Datenschutzerklärung</a></p></div>
    </div>
    <div class="wrap foot-bottom">© ${new Date().getFullYear()} ${SITE.name} · Alle Rechte vorbehalten</div>`;
  document.body.append(footer);
}

export function reveal() {
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
  $$('.reveal').forEach((el) => io.observe(el));
}

// Bilder vor dem Upload verkleinern (max. 1600 px, JPEG)
export async function compressImage(file, max = 1600, q = 0.78) {
  if (!file.type.startsWith('image/')) return readAsDataURL(file);
  const url = URL.createObjectURL(file);
  const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
  const s = Math.min(1, max / Math.max(img.width, img.height));
  const c = document.createElement('canvas');
  c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
  c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
  URL.revokeObjectURL(url);
  return c.toDataURL('image/jpeg', q);
}
const readAsDataURL = (f) => new Promise((res) => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(f); });

export function fileDrop(root, { accept = 'image/*', max = 6, label = 'Fotos hochladen' } = {}) {
  const files = [];
  root.classList.add('drop');
  root.innerHTML = `<input type="file" multiple accept="${accept}" hidden>
    <div class="drop-hint">${icon('camera', 28)}<b>${label}</b><small>Hierher ziehen oder klicken · max. ${max} Dateien</small></div>
    <div class="thumbs"></div>`;
  const input = $('input', root), thumbs = $('.thumbs', root);
  const add = async (list) => {
    for (const f of list) {
      if (files.length >= max) break;
      if (f.size > 15e6) continue;
      const data = await compressImage(f);
      files.push({ name: f.name.replace(/\.(heic|png|webp)$/i, '.jpg'), data });
      render();
    }
  };
  const render = () => {
    thumbs.innerHTML = files.map((f, i) => `<figure>${f.data.startsWith('data:image') ? `<img src="${f.data}" alt="">` : `<span>${f.name}</span>`}<button type="button" data-i="${i}" aria-label="Entfernen">×</button></figure>`).join('');
    $$('button', thumbs).forEach((b) => (b.onclick = (e) => { e.stopPropagation(); files.splice(+b.dataset.i, 1); render(); }));
  };
  root.onclick = (e) => { if (!e.target.closest('figure')) input.click(); };
  input.onchange = () => add(input.files);
  root.ondragover = (e) => { e.preventDefault(); root.classList.add('over'); };
  root.ondragleave = () => root.classList.remove('over');
  root.ondrop = (e) => { e.preventDefault(); root.classList.remove('over'); add(e.dataTransfer.files); };
  return { get files() { return files; }, reset() { files.length = 0; render(); } };
}

// Formular an /api/anfrage senden
export async function submitForm(form, type, extra = {}) {
  const data = {};
  for (const [k, v] of new FormData(form).entries()) {
    if (v instanceof File) continue;
    data[k] = k in data ? `${data[k]}, ${v}` : v;
  }
  const btn = $('button[type=submit]', form);
  const msg = $('.form-msg', form) || form.appendChild(Object.assign(document.createElement('div'), { className: 'form-msg' }));
  btn.disabled = true; btn.dataset.t = btn.dataset.t || btn.innerHTML; btn.innerHTML = 'Wird gesendet …';
  try {
    const r = await fetch('/api/anfrage', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type, data, ...extra }) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || !j.ok) throw new Error(j.error || 'Fehler');
    msg.className = 'form-msg ok';
    msg.innerHTML = `${icon('check', 20)} Vielen Dank! Ihre Anfrage ist eingegangen – wir melden uns schnellstmöglich.`;
    form.reset();
    return true;
  } catch (e) {
    msg.className = 'form-msg err';
    msg.textContent = 'Senden fehlgeschlagen. Bitte rufen Sie uns an oder schreiben Sie per WhatsApp.';
    return false;
  } finally { btn.disabled = false; btn.innerHTML = btn.dataset.t; }
}

export function modal(html) {
  const m = document.createElement('div');
  m.className = 'modal';
  m.innerHTML = `<div class="modal-card"><button class="modal-x" aria-label="Schließen">${icon('close')}</button>${html}</div>`;
  document.body.append(m); document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => m.classList.add('show'));
  const close = () => { m.classList.remove('show'); document.body.style.overflow = ''; setTimeout(() => m.remove(), 250); };
  m.onclick = (e) => { if (e.target === m || e.target.closest('.modal-x')) close(); };
  addEventListener('keydown', function k(e) { if (e.key === 'Escape') { close(); removeEventListener('keydown', k); } });
  return { el: m, close };
}
