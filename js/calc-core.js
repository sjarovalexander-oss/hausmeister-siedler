// Rechenlogik des Kostenrechners (Preise in config.js)
import { PRICES as P } from './config.js';

export const OBJECTS = [
  { id: 'efh', label: 'Einfamilienhaus', ic: 'home', we: 1, etagen: 2, th: 1, suggest: ['gruen', 'winter', 'muelltonnen'] },
  { id: 'mfh', label: 'Mehrfamilienhaus', ic: 'building', we: 8, etagen: 3, th: 1, suggest: ['hausmeister', 'treppenhaus', 'winter'] },
  { id: 'weg', label: 'Wohnanlage / WEG', ic: 'city', we: 24, etagen: 4, th: 2, suggest: ['hausmeister', 'treppenhaus', 'gruen', 'winter'] },
  { id: 'gew', label: 'Gewerbe & Büro', ic: 'desk', we: 0, etagen: 2, th: 1, suggest: ['buero', 'glas', 'winter'] },
];

const F = (perYear, label) => ({ perYear, label });
const ONCE = F(0, 'einmalig');
const range = (k, label, unit, def, min, max, step = 1) => ({ k, label, unit, def, min, max, step });
const rr = (p, f = 1) => ({ min: p.min * f, max: p.max * f });

export const CALC = {
  hausmeister: { fields: [], obj: ['we'], freq: [F(12, 'monatlich')],
    visit: (v, o) => ({ min: Math.max(o.we * P.hausmeister_we.min, P.hausmeister_we.minMonth), max: Math.max(o.we * P.hausmeister_we.max, P.hausmeister_we.minMonth * 1.5) }) },
  treppenhaus: { fields: [], obj: ['etagen', 'th'], freq: [F(52, 'wöchentlich'), F(26, '14-tägig'), F(12, 'monatlich')],
    visit: (v, o) => rr(P.treppe_etage, o.etagen * o.th) },
  gruen: { fields: [range('m2', 'Grünfläche', 'm²', 300, 50, 3000, 10)], freq: [F(30, 'wöchentlich (Saison)'), F(15, '14-tägig (Saison)'), F(7, 'monatlich (Saison)'), ONCE],
    visit: (v) => rr(P.gruen_h, Math.max(1, v.m2 / P.gruen_m2_per_h)) },
  winter: { fields: [range('m2', 'Gehweg & Zufahrt', 'm²', 40, 10, 600, 5)], freq: [F(1, 'Saison Nov–März')],
    visit: (v) => ({ min: P.winter_bereit.min * 5 + v.m2 * P.winter_m2.min * P.winter_einsaetze, max: P.winter_bereit.max * 5 + v.m2 * P.winter_m2.max * P.winter_einsaetze }) },
  muelltonnen: { fields: [range('n', 'Anzahl Tonnen', 'Stk.', 4, 1, 40)], freq: [F(12, 'monatlich'), F(6, 'alle 2 Monate'), F(4, 'quartalsweise'), ONCE], visit: (v) => rr(P.tonne, v.n) },
  glas: { fields: [range('m2', 'Glasfläche', 'm²', 60, 10, 1500, 5)], freq: [ONCE, F(2, '2× jährlich'), F(4, '4× jährlich'), F(12, 'monatlich')], visit: (v) => rr(P.glas_m2, v.m2) },
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

export function newItem(id) {
  return { v: Object.fromEntries(CALC[id].fields.map((f) => [f.k, f.def])), f: 0 };
}

export function priceOf(id, st, obj) {
  const c = CALC[id], fr = c.freq[st.f], per = c.visit(st.v, obj);
  if (fr.perYear === -1) return { kind: 'use', ...per, fr };
  if (fr.perYear === 0) return { kind: 'once', ...per, fr };
  return { kind: 'rec', min: (per.min * fr.perYear) / 12, max: (per.max * fr.perYear) / 12, fr };
}

export function totals(state, obj) {
  const rec = { min: 0, max: 0 }, once = { min: 0, max: 0 }, items = [];
  for (const [id, st] of state) {
    const p = priceOf(id, st, obj); items.push({ id, ...p });
    if (p.kind === 'rec') { rec.min += p.min; rec.max += p.max; }
    if (p.kind === 'once') { once.min += p.min; once.max += p.max; }
  }
  return { rec, once, items };
}
