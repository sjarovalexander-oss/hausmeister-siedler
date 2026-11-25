// Großer, interaktiver Kostenrechner (Vollbild, 4 Schritte, 3D-Haus reagiert)
import { SERVICES, CATS, VAT, SITE } from './config.js';
import { icon } from './icons.js';
import { $, $$, eur, fileDrop, submitForm } from './shared.js';
import { OBJECTS, CALC, newItem, priceOf, totals } from './calc-core.js';
import { t } from './i18n.js';

const STEPS = ['Objekt', 'Leistungen', 'Details', 'Angebot'];
const START = ['So bald wie möglich', 'In 4 Wochen', 'In 1–3 Monaten', 'Noch offen'];

let root, house, drop;
const S = { step: 0, obj: { type: null, id: null, we: 8, etagen: 3, th: 1 }, items: new Map(), start: null, gross: false, page: false };

export function openWizard({ preset, page = false } = {}) {
  S.page = page;
  if (!root) build();
  if (preset && CALC[preset] && !S.items.has(preset)) S.items.set(preset, newItem(preset));
  root.classList.add('open'); document.documentElement.style.overflow = 'hidden';
  go(S.step); refresh();
  $('video', root)?.play().catch(() => {});
}
function close() {
  if (S.page) { location.href = '/'; return; }
  root.classList.remove('open'); document.documentElement.style.overflow = '';
  $('video', root)?.pause();
}

function build() {
  root = document.createElement('div');
  root.className = 'wiz';
  root.innerHTML = `
  <div class="wiz-bg"><video muted playsinline loop preload="none" poster="/assets/media/court.jpg"><source src="/assets/media/court.mp4" type="video/mp4"></video></div>
  <div class="wiz-shell">
    <header class="wiz-top">
      <div class="wiz-brand"><img src="/assets/logo-sm.png" alt="" width="40" height="39"><b>Kostenrechner</b></div>
      <div class="wiz-prog">${STEPS.map((s, i) => `<button class="seg-s" data-go="${i}"><i></i><span>${i + 1}. ${s}</span></button>`).join('')}</div>
      <button class="wiz-x" aria-label="Schließen">${icon('close')}</button>
    </header>
    <div class="wiz-body">
      <aside class="wiz-side">
        <div class="wiz-3d"><canvas></canvas><div class="wiz-hint">${icon('sparkle', 16)} <span>Das Haus reagiert auf Ihre Auswahl</span></div></div>
        <div class="wiz-price empty">
          <div class="vat"><button class="on" data-v="0">netto</button><button data-v="1">brutto</button></div>
          <small>monatlich ca.</small>
          <span class="wiz-empty-p">Wählen Sie Leistungen – der Preis erscheint sofort.</span>
          <b class="wiz-mon">0 €</b>
          <div class="wiz-sub"><span>einmalig</span><em class="wiz-one">–</em></div>
          <div class="wiz-bar"><i></i></div>
        </div>
      </aside>
      <main class="wiz-main">
        <section class="wiz-step" data-s="0">
          <span class="eyebrow">Schritt 1 von 4</span><h2>Um welches Objekt geht es?</h2>
          <div class="w-objs">${OBJECTS.map((o) => `<button class="w-obj" data-o="${o.id}"><span class="w-ic">${icon(o.ic, 34)}</span><b>${o.label}</b><small>${o.we ? o.we + ' WE · ' : ''}${o.etagen} Etagen</small><i class="w-check">${icon('check', 16)}</i></button>`).join('')}</div>
          <div class="w-steppers">${[['we', 'Wohneinheiten', 0, 200], ['etagen', 'Etagen', 1, 20], ['th', 'Treppenhäuser', 1, 20]].map(([k, l, mi, ma]) => `
            <div class="w-stepper"><label>${l}</label><div><button data-dec="${k}">−</button><input type="number" data-obj="${k}" min="${mi}" max="${ma}"><button data-inc="${k}">+</button></div></div>`).join('')}</div>
        </section>
        <section class="wiz-step" data-s="1">
          <span class="eyebrow">Schritt 2 von 4</span><h2>Welche Unterstützung benötigen Sie?</h2>
          ${Object.entries(CATS).map(([c, label]) => `<h4 class="w-cat">${label}</h4><div class="w-tiles">${SERVICES.filter((s) => s.cat === c).map((s) => `
            <button class="w-tile" data-s="${s.id}"><span class="w-ic">${icon(s.icon, 26)}</span><b>${s.title}</b><small>${s.short}</small><i class="w-check">${icon('check', 16)}</i></button>`).join('')}</div>`).join('')}
          <h4 class="w-cat">Wann soll es losgehen?</h4>
          <div class="w-chips">${START.map((x) => `<button data-start="${x}">${x}</button>`).join('')}</div>
        </section>
        <section class="wiz-step" data-s="2">
          <span class="eyebrow">Schritt 3 von 4</span><h2>Größe & Rhythmus anpassen</h2>
          <div class="w-cfg"></div>
          <p class="w-empty">Bitte wählen Sie zuerst mindestens eine Leistung.</p>
        </section>
        <section class="wiz-step" data-s="3">
          <span class="eyebrow">Schritt 4 von 4</span><h2>Ihre Schätzung</h2>
          <div class="w-result">
            <div class="w-donut"><svg viewBox="0 0 42 42"><circle cx="21" cy="21" r="15.9" fill="none" stroke="#E5EEF6" stroke-width="5"></circle><g class="w-arcs"></g></svg><div><small>pro Monat</small><b class="w-dmon">0 €</b></div></div>
            <div class="w-lines"></div>
          </div>
          <form class="form w-form">
            <h3>Unverbindliches Angebot anfordern</h3>
            <div class="grid2">
              <div class="field"><label>Ihr Name <em>*</em></label><input name="name" required></div>
              <div class="field"><label>Firma / Hausverwaltung</label><input name="firma"></div>
              <div class="field"><label>Telefon <em>*</em></label><input name="telefon" type="tel" required></div>
              <div class="field"><label>E-Mail <em>*</em></label><input name="email" type="email" required></div>
              <div class="field full"><label>Objektadresse <em>*</em></label><input name="objektadresse" required placeholder="Straße, Hausnummer, PLZ, Ort"></div>
              <div class="field"><label>Wunschtermin Besichtigung</label><input name="wunschtermin" type="date"></div>
              <div class="field"><label>Rückruf am besten</label><select name="rueckruf"><option>Vormittags</option><option>Nachmittags</option><option>Abends</option><option>Egal</option></select></div>
            </div>
            <div class="field"><label>Fotos vom Objekt</label><div data-drop></div></div>
            <div class="field"><label>Mitteilung</label><textarea name="mitteilung" placeholder="Besonderheiten, Zugang, Schlüssel, Fragen …"></textarea></div>
            <label class="consent"><input type="checkbox" name="datenschutz" required><span>Mit Absenden dieses Formulars stimmen Sie der Übermittlung und Verarbeitung Ihrer Daten wie in unserer <a href="/datenschutz" target="_blank">Datenschutzerklärung</a> beschrieben zu. <em class="blue">*</em></span></label>
            <button class="btn btn-primary" type="submit">Angebot anfordern →</button>
          </form>
          <div class="w-done" hidden><div class="w-done-ic">${icon('check', 46)}</div><h2>Vielen Dank!</h2><p>Ihre Anfrage ist eingegangen. Wir melden uns schnellstmöglich für die kostenlose Besichtigung.</p><a class="btn btn-ghost" href="tel:${SITE.phone}">${icon('phone', 18)} ${SITE.phoneDisplay}</a></div>
        </section>
      </main>
    </div>
    <footer class="wiz-foot">
      <button class="btn btn-ghost w-back">← Zurück</button>
      <span class="w-count"></span>
      <button class="btn btn-primary w-next">Weiter →</button>
    </footer>
  </div>`;
  document.body.append(root);

  import('./house3d.js').then((m) => { house = m.house3d($('.wiz-3d canvas', root), { mouse: true }); house.set([...S.items.keys()]); }).catch(() => {});
  drop = fileDrop($('[data-drop]', root), { max: 8, label: 'Fotos vom Objekt hochladen' });

  $('.wiz-x', root).onclick = close;
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && root.classList.contains('open') && !S.page) close(); });
  $$('[data-go]', root).forEach((b) => (b.onclick = () => go(+b.dataset.go)));
  $('.w-back', root).onclick = () => go(S.step - 1);
  $('.w-next', root).onclick = () => go(S.step + 1);

  $$('.w-obj', root).forEach((b) => (b.onclick = () => {
    const o = OBJECTS.find((x) => x.id === b.dataset.o);
    Object.assign(S.obj, { id: o.id, type: o.label, we: o.we, etagen: o.etagen, th: o.th });
    if (!S.items.size) o.suggest.forEach((id) => S.items.set(id, newItem(id)));
    refresh(); setTimeout(() => go(1), 350);
  }));
  $$('[data-obj]', root).forEach((i) => (i.oninput = () => { S.obj[i.dataset.obj] = clamp(i); refresh(); }));
  $$('[data-inc],[data-dec]', root).forEach((b) => (b.onclick = () => {
    const k = b.dataset.inc || b.dataset.dec, i = $(`[data-obj=${k}]`, root);
    i.value = +i.value + (b.dataset.inc ? 1 : -1); S.obj[k] = clamp(i); refresh();
  }));
  $$('.w-tile', root).forEach((b) => (b.onclick = () => {
    const id = b.dataset.s; S.items.has(id) ? S.items.delete(id) : S.items.set(id, newItem(id)); refresh();
  }));
  $$('[data-start]', root).forEach((b) => (b.onclick = () => { S.start = b.dataset.start; refresh(); }));
  $$('.vat button', root).forEach((b) => (b.onclick = () => { S.gross = b.dataset.v === '1'; $$('.vat button', root).forEach((x) => x.classList.toggle('on', x === b)); refresh(); }));

  $('.w-form', root).onsubmit = async (e) => {
    e.preventDefault();
    const ok = await submitForm(e.target, 'Kostenrechner-Anfrage', { files: drop.files, calc: summary() });
    if (ok) { e.target.hidden = true; $('.w-done', root).hidden = false; drop.reset(); }
  };
}

const clamp = (i) => Math.max(+i.min, Math.min(+i.max, Math.round(+i.value || 0)));
const k = () => (S.gross ? 1 + VAT : 1);
const span = (p) => `${eur(p.min * k())} – ${eur(p.max * k())}`;

function go(n) {
  S.step = Math.max(0, Math.min(3, n));
  $$('.wiz-step', root).forEach((s) => s.classList.toggle('on', +s.dataset.s === S.step));
  $$('.seg-s', root).forEach((b, i) => { b.classList.toggle('done', i < S.step); b.classList.toggle('on', i === S.step); });
  $('.w-back', root).style.visibility = S.step ? 'visible' : 'hidden';
  $('.w-next', root).style.visibility = S.step < 3 ? 'visible' : 'hidden';
  $('.wiz-main', root).scrollTop = 0;
  if (S.step === 2) renderCfg();
  if (S.step === 3) renderResult();
}

function refresh() {
  $$('.w-obj', root).forEach((b) => b.classList.toggle('on', b.dataset.o === S.obj.id));
  $$('[data-obj]', root).forEach((i) => { if (document.activeElement !== i) i.value = S.obj[i.dataset.obj]; });
  $$('.w-tile', root).forEach((b) => b.classList.toggle('on', S.items.has(b.dataset.s)));
  $$('[data-start]', root).forEach((b) => b.classList.toggle('on', b.dataset.start === S.start));
  house?.set([...S.items.keys()]);
  const n = S.items.size;
  $('.w-count', root).textContent = n ? `${n} ${n === 1 ? 'Leistung' : 'Leistungen'} gewählt` : '';
  price();
}

let last = { min: 0, max: 0 };
function price() {
  const { rec, once } = totals(S.items, S.obj);
  const to = { min: rec.min * k(), max: rec.max * k() }, from = { ...last }, t0 = performance.now(); last = to;
  const el = $('.wiz-mon', root);
  (function step(tm) {
    const p = Math.min(1, (tm - t0) / 500), e = 1 - (1 - p) ** 3;
    el.textContent = to.max || from.max ? `${eur(from.min + (to.min - from.min) * e)} – ${eur(from.max + (to.max - from.max) * e)}` : '0 €';
    if (p < 1 && last === to) requestAnimationFrame(step);
  })(t0);
  $('.wiz-price', root).classList.toggle('empty', !S.items.size);
  $('.wiz-one', root).textContent = once.max ? span(once) : '–';
  $('.wiz-bar i', root).style.width = `${Math.min(100, (rec.max / 2500) * 100)}%`;
  if (S.step === 3) renderResult();
}

function renderCfg() {
  const box = $('.w-cfg', root);
  $('.w-empty', root).hidden = !!S.items.size;
  box.innerHTML = '';
  for (const [id, st] of S.items) {
    const s = SERVICES.find((x) => x.id === id), c = CALC[id];
    const el = document.createElement('div'); el.className = 'w-item'; el.dataset.id = id;
    const fromObj = c.obj ? `<div class="w-from">${icon('building', 16)} ${c.obj.map((o) => `${S.obj[o]} ${{ we: 'Wohneinheiten', etagen: 'Etagen', th: 'Treppenhäuser' }[o]}`).join(' · ')}</div>` : '';
    el.innerHTML = `<div class="w-item-h"><span class="w-ic">${icon(s.icon, 22)}</span><b>${s.title}</b><em class="w-p"></em><button class="w-rm" aria-label="Entfernen">${icon('close', 14)}</button></div>
      ${fromObj}
      ${c.fields.map((f) => `<div class="w-range"><label><span>${f.label}</span><b><output>${st.v[f.k]}</output> ${f.unit}</b></label><input type="range" data-k="${f.k}" min="${f.min}" max="${f.max}" step="${f.step}" value="${st.v[f.k]}"></div>`).join('')}
      ${c.freq.length > 1 ? `<div class="w-seg">${c.freq.map((f, i) => `<button data-f="${i}" class="${i === st.f ? 'on' : ''}">${f.label}</button>`).join('')}</div>` : `<div class="w-seg"><button class="on">${c.freq[0].label}</button></div>`}`;
    const upd = () => { const p = priceOf(id, st, S.obj); $('.w-p', el).innerHTML = `${span(p)}<small>${p.kind === 'rec' ? '/Monat' : p.kind === 'once' ? 'einmalig' : 'je Einsatz'}</small>`; };
    $$('input[type=range]', el).forEach((r) => {
      const paint = () => r.style.setProperty('--p', `${((r.value - r.min) / (r.max - r.min)) * 100}%`); paint();
      r.oninput = () => { st.v[r.dataset.k] = +r.value; $('output', r.parentElement).textContent = r.value; paint(); upd(); price(); };
    });
    $$('[data-f]', el).forEach((b) => (b.onclick = () => { st.f = +b.dataset.f; $$('[data-f]', el).forEach((x) => x.classList.toggle('on', x === b)); upd(); price(); }));
    $('.w-rm', el).onclick = () => { S.items.delete(id); el.remove(); refresh(); $('.w-empty', root).hidden = !!S.items.size; };
    upd(); box.append(el);
  }
}

const COLORS = ['#008EEF', '#0B0F14', '#FFA7A9', '#979592', '#5CB8F5', '#2E3A46', '#FFD2D3', '#C9CDD1'];
function renderResult() {
  const { rec, once, items } = totals(S.items, S.obj);
  $('.w-dmon', root).textContent = rec.max ? span(rec) : '0 €';
  const recs = items.filter((i) => i.kind === 'rec'), sum = recs.reduce((a, i) => a + (i.min + i.max) / 2, 0) || 1;
  let off = 25;
  $('.w-arcs', root).innerHTML = recs.map((i, n) => {
    const pct = (((i.min + i.max) / 2) / sum) * 100;
    const a = `<circle cx="21" cy="21" r="15.9" fill="none" stroke="${COLORS[n % 8]}" stroke-width="5" stroke-dasharray="${pct} ${100 - pct}" stroke-dashoffset="${off}"></circle>`;
    off -= pct; return a;
  }).join('');
  let n = 0;
  $('.w-lines', root).innerHTML = items.map((i) => {
    const s = SERVICES.find((x) => x.id === i.id);
    const dot = i.kind === 'rec' ? COLORS[n++ % 8] : 'transparent';
    return `<div class="w-line"><i style="background:${dot};border-color:${dot === 'transparent' ? '#C9CDD1' : dot}"></i><span>${s.title}<small>${i.fr.label}</small></span><b>${span(i)}<small>${i.kind === 'rec' ? '/Monat' : i.kind === 'once' ? 'einmalig' : 'je Einsatz'}</small></b></div>`;
  }).join('') + `<div class="w-line tot"><span>Gesamt pro Jahr</span><b>${rec.max ? span({ min: rec.min * 12, max: rec.max * 12 }) : '–'}</b></div>
    ${once.max ? `<div class="w-line tot"><span>Einmalige Leistungen</span><b>${span(once)}</b></div>` : ''}
    <p class="fine">${t('Unverbindliche Richtwerte auf Basis üblicher Marktpreise 2026 in Deutschland. Der genaue Preis hängt von Zugänglichkeit, Verschmutzung und Aufwand vor Ort ab. Besichtigung und Angebot sind kostenlos.')}</p>`;
}

function summary() {
  const rows = [...S.items].map(([id, st]) => {
    const p = priceOf(id, st, S.obj), s = SERVICES.find((x) => x.id === id), c = CALC[id];
    const vals = c.fields.map((f) => `${f.label}: ${st.v[f.k]} ${f.unit}`).join(', ');
    return `• ${s.title} (${p.fr.label}${vals ? ', ' + vals : ''}): ${eur(p.min)}–${eur(p.max)} netto${p.kind === 'rec' ? '/Monat' : p.kind === 'once' ? ' einmalig' : ' je Einsatz'}`;
  });
  const { rec, once } = totals(S.items, S.obj);
  return `Objekt: ${S.obj.type || '–'} · ${S.obj.we} WE · ${S.obj.etagen} Etagen · ${S.obj.th} Treppenhäuser\nStart: ${S.start || '–'}\n${rows.join('\n')}\nMonatlich: ${eur(rec.min)}–${eur(rec.max)} netto · Einmalig: ${once.max ? `${eur(once.min)}–${eur(once.max)} netto` : '–'}`;
}
