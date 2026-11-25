import { SERVICES, PRICES as P, VAT } from './config.js';
import { icon } from './icons.js';
import { $, $$, chrome, eur, fileDrop, submitForm } from './shared.js';

chrome();

const OBJECTS = [
  { id: 'efh', label: 'Einfamilienhaus', ic: 'building', we: 1, etagen: 2, th: 1, suggest: ['gruen', 'winter', 'muelltonnen'] },
  { id: 'mfh', label: 'Mehrfamilienhaus', ic: 'building', we: 8, etagen: 3, th: 1, suggest: ['hausmeister', 'treppenhaus', 'winter'] },
  { id: 'weg', label: 'Wohnanlage / WEG', ic: 'building', we: 24, etagen: 4, th: 2, suggest: ['hausmeister', 'treppenhaus', 'gruen', 'winter'] },
  { id: 'gew', label: 'Gewerbe & Büro', ic: 'desk', we: 0, etagen: 2, th: 1, suggest: ['buero', 'glas', 'winter'] },
];
const obj = { type: null, we: 8, etagen: 3, th: 1 };

const F = (perYear, label) => ({ perYear, label });
const ONCE = F(0, 'einmalig');
const range = (k, label, unit, def, min, max, step = 1) => ({ k, label, unit, def, min, max, step });
const rr = (p, f = 1) => ({ min: p.min * f, max: p.max * f });

// Jede Leistung: Regler, Rhythmus, Preis je Einsatz (oder je Jahr)
const CALC = {
  hausmeister: { fields: [], freq: [F(12, 'monatlich')], unitText: 'je Monat',
    visit: () => ({ min: Math.max(obj.we * P.hausmeister_we.min, P.hausmeister_we.minMonth), max: Math.max(obj.we * P.hausmeister_we.max, P.hausmeister_we.minMonth * 1.5) }) },
  treppenhaus: { fields: [], freq: [F(52, 'wöchentlich'), F(26, '14-tägig'), F(12, 'monatlich')],
    visit: () => rr(P.treppe_etage, obj.etagen * obj.th) },
  gruen: { fields: [range('m2', 'Grünfläche', 'm²', 300, 50, 3000, 10)], freq: [F(30, 'wöchentlich (Saison)'), F(15, '14-tägig (Saison)'), F(7, 'monatlich (Saison)'), ONCE],
    visit: (v) => rr(P.gruen_h, Math.max(1, v.m2 / P.gruen_m2_per_h)) },
  winter: { fields: [range('m2', 'Gehweg & Zufahrt', 'm²', 40, 10, 600, 5)], freq: [F(1, 'Saison Nov–März')],
    visit: (v) => ({ min: P.winter_bereit.min * 5 + v.m2 * P.winter_m2.min * P.winter_einsaetze, max: P.winter_bereit.max * 5 + v.m2 * P.winter_m2.max * P.winter_einsaetze }) },
  muelltonnen: { fields: [range('n', 'Anzahl Tonnen', 'Stk.', 4, 1, 40)], freq: [F(12, 'monatlich'), F(6, 'alle 2 Monate'), F(4, 'quartalsweise'), ONCE],
    visit: (v) => rr(P.tonne, v.n) },
  glas: { fields: [range('m2', 'Glasfläche', 'm²', 60, 10, 1500, 5)], freq: [ONCE, F(2, '2× jährlich'), F(4, '4× jährlich'), F(12, 'monatlich')],
    visit: (v) => rr(P.glas_m2, v.m2) },
  fassade: { fields: [range('m2', 'Fassadenfläche', 'm²', 200, 20, 3000, 10)], freq: [ONCE], visit: (v) => rr(P.fassade_m2, v.m2) },
  tiefgarage: { fields: [range('m2', 'Fläche', 'm²', 600, 100, 6000, 50)], freq: [ONCE, F(1, '1× jährlich'), F(2, '2× jährlich')], visit: (v) => rr(P.tiefgarage_m2, v.m2) },
  doppelparker: { fields: [range('n', 'Stellplätze', 'Stk.', 8, 1, 80)], freq: [ONCE, F(1, '1× jährlich'), F(2, '2× jährlich')], visit: (v) => rr(P.doppelparker, v.n) },
  grund: { fields: [range('m2', 'Fläche', 'm²', 80, 10, 1500, 5)], freq: [ONCE], visit: (v) => rr(P.grund_m2, v.m2) },
  gravur: { fields: [range('n', 'Anzahl Schilder', 'Stk.', 2, 1, 60)], freq: [ONCE], visit: (v) => rr(P.gravur, v.n) },
  reparatur: { fields: [range('h', 'Arbeitszeit', 'Std.', 3, 1, 40)], freq: [ONCE, F(12, 'monatliches Kontingent')], visit: (v) => rr(P.hourly, v.h) },
  end: { fields: [range('m2', 'Wohnfläche', 'm²', 70, 20, 500, 5)], freq: [ONCE], visit: (v) => rr(P.end_m2, v.m2) },
  bau: { fields: [range('m2', 'Fläche', 'm²', 120, 20, 3000, 10)], freq: [ONCE], visit: (v) => rr(P.bau_m2, v.m2) },
  solar: { fields: [range('m2', 'Modulfläche', 'm²', 50, 10, 1500, 5)], freq: [ONCE, F(1, '1× jährlich')], visit: (v) => rr(P.solar_m2, v.m2) },
  notdienst: { fields: [], freq: [F(-1, 'pro Einsatz')], visit: () => rr(P.notdienst) },
  buero: { fields: [range('m2', 'Bürofläche', 'm²', 150, 20, 3000, 10)], freq: [F(52, '1× pro Woche'), F(104, '2× pro Woche'), F(156, '3× pro Woche'), F(260, '5× pro Woche')],
    visit: (v) => ({ min: Math.max(v.m2 * P.buero_m2.min, P.buero_m2.minVisit), max: Math.max(v.m2 * P.buero_m2.max, P.buero_m2.minVisit * 1.4) }) },
  entruempelung: { fields: [range('m3', 'Volumen', 'm³', 10, 2, 120)], freq: [ONCE],
    visit: (v) => ({ min: Math.max(v.m3 * P.entruempel_m3.min, P.entruempel_m3.minJob), max: Math.max(v.m3 * P.entruempel_m3.max, P.entruempel_m3.minJob * 1.4) }) },
};

const state = new Map(); // id -> { v:{}, f:index }
let gross = false;

// --- Schritt 1: Objekt
$('#objs').innerHTML = OBJECTS.map((o) => `<button class="obj" data-o="${o.id}">${icon(o.ic, 34)}${o.label}</button>`).join('');
const objFields = [['we', 'Wohneinheiten', 0, 200], ['etagen', 'Etagen', 1, 20], ['th', 'Treppenhäuser', 1, 20]];
$('#objFields').innerHTML = objFields.map(([k, l, mi, ma]) => `<div class="field"><label>${l}</label><input type="number" data-obj="${k}" min="${mi}" max="${ma}" value="${obj[k]}"></div>`).join('');
$$('[data-obj]').forEach((i) => (i.oninput = () => { obj[i.dataset.obj] = Math.max(+i.min, Math.min(+i.max, +i.value || 0)); render(); }));
$$('.obj').forEach((b) => (b.onclick = () => {
  const o = OBJECTS.find((x) => x.id === b.dataset.o);
  $$('.obj').forEach((x) => x.classList.toggle('on', x === b));
  Object.assign(obj, { type: o.label, we: o.we, etagen: o.etagen, th: o.th });
  $$('[data-obj]').forEach((i) => (i.value = obj[i.dataset.obj]));
  if (!state.size) o.suggest.forEach(add);
  render();
}));

// --- Schritt 2: Leistungen
$('#pick').innerHTML = SERVICES.map((s) => `<button data-s="${s.id}">${icon(s.icon, 18)}${s.title}</button>`).join('');
$$('#pick button').forEach((b) => (b.onclick = () => { state.has(b.dataset.s) ? state.delete(b.dataset.s) : add(b.dataset.s); render(); }));

function add(id) {
  const c = CALC[id]; if (!c || state.has(id)) return;
  state.set(id, { v: Object.fromEntries(c.fields.map((f) => [f.k, f.def])), f: 0 });
}

function priceOf(id) {
  const c = CALC[id], st = state.get(id), fr = c.freq[st.f], per = c.visit(st.v);
  if (fr.perYear === -1) return { kind: 'use', ...per, fr };
  if (fr.perYear === 0) return { kind: 'once', ...per, fr };
  return { kind: 'rec', min: (per.min * fr.perYear) / 12, max: (per.max * fr.perYear) / 12, fr };
}
const k = () => (gross ? 1 + VAT : 1);
const span = (p) => `${eur(p.min * k())} – ${eur(p.max * k())}`;

// --- Schritt 3 + Summe
function render() {
  $$('#pick button').forEach((b) => b.classList.toggle('on', state.has(b.dataset.s)));
  $('#cfgWrap').hidden = !state.size;
  const cfg = $('#cfg');
  // vorhandene Karten behalten (sonst springen Regler beim Ziehen)
  [...cfg.children].forEach((el) => { if (!state.has(el.dataset.id)) el.remove(); });
  for (const [id, st] of state) {
    let el = $(`.item[data-id="${id}"]`, cfg);
    if (!el) {
      const s = SERVICES.find((x) => x.id === id), c = CALC[id];
      el = document.createElement('div'); el.className = 'item'; el.dataset.id = id;
      el.innerHTML = `<div class="item-h"><div class="ic">${icon(s.icon, 22)}</div><h3>${s.title}</h3><div class="price"></div><button class="rm" aria-label="Entfernen">${icon('close', 16)}</button></div>
        <div class="ctrls">
          ${c.fields.map((f) => `<div class="ctrl"><label>${f.label} <b data-out="${f.k}">${st.v[f.k]} ${f.unit}</b></label><input type="range" data-k="${f.k}" min="${f.min}" max="${f.max}" step="${f.step}" value="${st.v[f.k]}"></div>`).join('')}
          ${id === 'treppenhaus' ? `<div class="ctrl"><label>Aus Schritt 1 <b data-th>${obj.etagen} Etagen × ${obj.th} TH</b></label></div>` : ''}
          ${id === 'hausmeister' ? `<div class="ctrl"><label>Aus Schritt 1 <b data-we>${obj.we} Wohneinheiten</b></label></div>` : ''}
          ${c.freq.length > 1 ? `<div class="ctrl"><label>Rhythmus</label><div class="seg">${c.freq.map((f, i) => `<button type="button" data-f="${i}" class="${i === st.f ? 'on' : ''}">${f.label}</button>`).join('')}</div></div>` : ''}
        </div>`;
      $('.rm', el).onclick = () => { state.delete(id); render(); };
      $$('input[type=range]', el).forEach((r) => (r.oninput = () => {
        st.v[r.dataset.k] = +r.value;
        const f = c.fields.find((x) => x.k === r.dataset.k);
        $(`[data-out="${r.dataset.k}"]`, el).textContent = `${r.value} ${f.unit}`;
        totals();
      }));
      $$('[data-f]', el).forEach((b) => (b.onclick = () => { st.f = +b.dataset.f; $$('[data-f]', el).forEach((x) => x.classList.toggle('on', x === b)); totals(); }));
      cfg.append(el);
    }
    const th = $('[data-th]', el); if (th) th.textContent = `${obj.etagen} Etagen × ${obj.th} TH`;
    const we = $('[data-we]', el); if (we) we.textContent = `${obj.we} Wohneinheiten`;
  }
  totals();
}

let last = { mon: 0 };
function totals() {
  let rec = { min: 0, max: 0 }, once = { min: 0, max: 0 };
  const lines = [];
  for (const id of state.keys()) {
    const p = priceOf(id), s = SERVICES.find((x) => x.id === id);
    const suffix = p.kind === 'rec' ? '/Monat' : p.kind === 'once' ? ' einmalig' : ' je Einsatz';
    $(`.item[data-id="${id}"] .price`).innerHTML = `${span(p)}<small>${suffix.trim()}</small>`;
    lines.push(`<div class="l"><span>${s.title} · ${p.fr.label}</span><b>${span(p)}${p.kind === 'rec' ? '' : '*'}</b></div>`);
    if (p.kind === 'rec') { rec.min += p.min; rec.max += p.max; }
    if (p.kind === 'once') { once.min += p.min; once.max += p.max; }
  }
  $('#lines').innerHTML = lines.join('') || '<p class="empty">Noch keine Leistung gewählt.</p>';
  animate($('#mon'), rec);
  $('#yr').textContent = rec.max ? span({ min: rec.min * 12, max: rec.max * 12 }) : '–';
  $('#one').textContent = once.max ? span(once) : '–';
  $('#goReq').disabled = !state.size;
}

function animate(el, r) {
  const to = { min: r.min * k(), max: r.max * k() }, from = { ...last }, t0 = performance.now();
  last = to;
  if (!to.max) { el.textContent = '0 €'; last = { min: 0, max: 0 }; return; }
  (function step(t) {
    const p = Math.min(1, (t - t0) / 450), e = 1 - (1 - p) ** 3;
    const a = (from.min || 0) + (to.min - (from.min || 0)) * e, b = (from.max || 0) + (to.max - (from.max || 0)) * e;
    el.textContent = `${eur(a)} – ${eur(b)}`;
    if (p < 1 && last === to) requestAnimationFrame(step);
  })(t0);
}

$$('.vat button').forEach((b) => (b.onclick = () => { gross = b.dataset.v === '1'; $$('.vat button').forEach((x) => x.classList.toggle('on', x === b)); totals(); }));

// --- Anfrage
const drop = fileDrop($('#f-calc [data-drop]'), { max: 8, label: 'Fotos vom Objekt hochladen' });
$('#goReq').onclick = () => { $('#anfrage').hidden = false; $('#anfrage').scrollIntoView({ behavior: 'smooth' }); };

function summary() {
  const rows = [...state.keys()].map((id) => {
    const p = priceOf(id), s = SERVICES.find((x) => x.id === id), st = state.get(id), c = CALC[id];
    const vals = c.fields.map((f) => `${f.label}: ${st.v[f.k]} ${f.unit}`).join(', ');
    return `• ${s.title} (${p.fr.label}${vals ? ', ' + vals : ''}): ${eur(p.min)}–${eur(p.max)} netto${p.kind === 'rec' ? '/Monat' : p.kind === 'once' ? ' einmalig' : ' je Einsatz'}`;
  });
  return `Objekt: ${obj.type || '–'} · ${obj.we} WE · ${obj.etagen} Etagen · ${obj.th} Treppenhäuser\n${rows.join('\n')}\nMonatlich: ${$('#mon').textContent} (${gross ? 'brutto' : 'netto'}) · Einmalig: ${$('#one').textContent}`;
}
$('#f-calc').onsubmit = async (e) => {
  e.preventDefault();
  if (await submitForm(e.target, 'Kostenrechner-Anfrage', { files: drop.files, calc: summary() })) drop.reset();
};

// Vorauswahl ?s=winter
const pre = new URLSearchParams(location.search).get('s');
if (pre && CALC[pre]) add(pre);
render();
