// Seite /leistungen (Übersicht) und /leistungen/<kürzel> (Detail)
import { SITE, SERVICES, CATS, serviceUrl, slug } from './config.js';
import { icon } from './icons.js';
import { $, $$, chrome, reveal, eur } from './shared.js';
import { newItem, priceOf, CALC } from './calc-core.js';
import { initI18n, t } from './i18n.js';

chrome();
const img = (s) => `/assets/media/s-${s.scene}.jpg`;
const DEMO = { we: 8, etagen: 3, th: 1 };
const hint = (s) => {
  if (!CALC[s.id]) return '';
  const p = priceOf(s.id, newItem(s.id), DEMO);
  return `ab ${eur(p.min)} ${p.kind === 'rec' ? '/Monat' : p.kind === 'once' ? 'einmalig' : 'je Einsatz'}`;
};
const card = (s, i = 0) => `
  <a class="l-card reveal" href="${serviceUrl(s)}" data-cat="${s.cat}" style="transition-delay:${(i % 3) * 0.06}s">
    <div class="l-img"><img src="${img(s)}" alt="${s.title}" loading="lazy"><span class="l-ic">${icon(s.icon, 22)}</span></div>
    <div class="l-txt"><small>${CATS[s.cat]}</small><h3>${s.title}</h3><p>${s.short}</p>
    <div class="l-foot"><span class="l-price">${hint(s)}</span><span class="l-more">Details ${icon('arrow', 16)}</span></div></div>
  </a>`;

const page = document.body.dataset.page;

if (page === 'list') {
  $('#grid').innerHTML = SERVICES.map(card).join('');
  $('#filters').innerHTML = `<button class="on" data-c="all">Alle</button>` + Object.entries(CATS).map(([k, v]) => `<button data-c="${k}">${v}</button>`).join('');
  $$('#filters button').forEach((b) => (b.onclick = () => {
    $$('#filters button').forEach((x) => x.classList.toggle('on', x === b));
    $$('.l-card').forEach((c) => (c.hidden = b.dataset.c !== 'all' && c.dataset.cat !== b.dataset.c));
  }));
}

if (page === 'detail') {
  const id = document.body.dataset.id || location.pathname.split('/').pop();
  const s = SERVICES.find((x) => x.id === id || slug(x) === id) || SERVICES[0];
  const related = SERVICES.filter((x) => x.cat === s.cat && x.id !== s.id).slice(0, 3);
  $('#detail').innerHTML = `
  <section class="l-hero l-hero-d" style="--img:url(${img(s)})">
    <div class="wrap">
      <nav class="crumbs"><a href="/">Startseite</a><span>/</span><a href="/leistungen">Leistungen</a><span>/</span><b>${s.title}</b></nav>
      <span class="eyebrow">${CATS[s.cat]}</span>
      <h1>${s.title}</h1>
      <p class="lead">${s.short}</p>
      <div class="hero-cta"><button class="btn btn-primary" data-calc="${s.id}">${icon('calc', 18)} Preis berechnen</button><a class="btn btn-ghost" href="/#kontakt">Anfragen</a></div>
    </div>
  </section>
  <section class="l-body">
    <div class="wrap l-cols">
      <div>
        <span class="eyebrow">Unsere Leistung</span>
        <h2 class="reveal">So kümmern wir uns</h2>
        <p class="l-long reveal">${s.long}</p>
        <h3 class="l-h3">Das ist enthalten</h3>
        <ul class="l-points">${s.points.map((p) => `<li class="reveal">${icon('check', 20)}<span>${p}</span></li>`).join('')}</ul>
        <h3 class="l-h3">So läuft es ab</h3>
        <div class="l-steps">
          <div class="reveal"><b>01</b><h4>Anfrage</h4><p>Per Formular, Telefon oder WhatsApp – gerne mit Fotos.</p></div>
          <div class="reveal"><b>02</b><h4>Kostenlose Besichtigung</h4><p>Wir sehen uns das Objekt an und erstellen ein festes Angebot.</p></div>
          <div class="reveal"><b>03</b><h4>Zuverlässige Umsetzung</h4><p>Feste Termine, ein Ansprechpartner, dokumentierte Einsätze.</p></div>
        </div>
      </div>
      <aside class="l-side">
        <div class="l-box">
          <small>Richtwert</small>
          <b>${hint(s) || 'Preis auf Anfrage'}</b>
          <p>Unverbindlicher Richtwert, netto. Das genaue Angebot folgt nach der kostenlosen Besichtigung.</p>
          <button class="btn btn-primary" data-calc="${s.id}">${icon('calc', 18)} Genau berechnen</button>
        </div>
        <div class="l-box dark">
          <h4>Direkt erreichen</h4>
          <a href="tel:${SITE.phone}">${icon('phone', 20)} ${SITE.phoneDisplay}</a>
          <a href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener">${icon('wa', 20)} WhatsApp</a>
          <a href="mailto:${SITE.email}">${icon('mail', 20)} ${SITE.email}</a>
        </div>
      </aside>
    </div>
  </section>
  ${related.length ? `<section class="l-rel"><div class="wrap"><div class="sec-head"><div><span class="eyebrow">Passt dazu</span><h2>Weitere Leistungen</h2></div><a class="btn btn-ghost" href="/leistungen">Alle Leistungen →</a></div><div class="l-grid">${related.map(card).join('')}</div></div></section>` : ''}`;
}

$$('[data-calc]').forEach((b) => (b.onclick = (e) => { e.preventDefault(); import('./wizard.js').then((m) => m.openWizard({ preset: b.dataset.calc || undefined })); }));
reveal();
initI18n();
