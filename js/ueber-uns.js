// Seite /ueber-uns (Über uns + Galerie)
import { SITE } from './config.js';
import { icon } from './icons.js';
import { $, $$, chrome, reveal } from './shared.js';
import { initI18n } from './i18n.js';

chrome();
$$('[data-i]').forEach((el) => el.insertAdjacentHTML('afterbegin', icon(el.dataset.i, 20)));
// Einsatzgebiet
$('#areas').innerHTML = SITE.areas.map((a) => `<span>${icon('pin', 14)}${a}</span>`).join('');

// Galerie-Platzhalter
const galItems = [['Treppenhaus vorher/nachher', 'stairs'], ['Grünpflege', 'leaf'], ['Winterdienst', 'snow'], ['Unser Team', 'user'], ['Fassade', 'building'], ['PV-Reinigung', 'sun'], ['Tiefgarage', 'car']];
$('#gal').innerHTML = galItems.map(([t, i]) => `<figure>${icon(i, 40)}<figcaption>${t} · Foto folgt</figcaption></figure>`).join('');


reveal();
initI18n();
