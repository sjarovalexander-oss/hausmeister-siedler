// ============================================================
//  Hausmeisterservice – Siedler GmbH · zentrale Inhalte & Preise
//  Alles, was der Kunde bestätigen/ändern soll, steht HIER.
// ============================================================

export const SITE = {
  name: 'Hausmeisterservice – Siedler GmbH',
  short: 'Siedler',
  owner: 'Katya Siedler',
  street: 'Seidenweg 1',
  zip: '79639',
  city: 'Grenzach-Wyhlen',
  phone: '+49 152 31767316',
  phoneDisplay: '+49 152 317 67 316',
  whatsapp: '4915231767316',
  email: 'info@hausmeisterservice-siedler.de',
  // Social-Links: null = Button wird ausgeblendet
  instagram: null,
  facebook: null,
  hours: 'Mo–Fr 08:00–13:00 & 14:00–17:00 Uhr', // TODO: vom Kunden bestätigen
  register: 'Amtsgericht Freiburg i. Br., HRB 727437',
  vat: 'DE 357275445',
  areas: ['Grenzach-Wyhlen', 'Lörrach', 'Rheinfelden (Baden)', 'Weil am Rhein', 'Inzlingen', 'Schopfheim', 'Bad Säckingen', 'Steinen'], // TODO: Einsatzgebiet bestätigen
};

// Kategorien
export const CATS = {
  reinigung: 'Reinigung',
  aussen: 'Außen & Grün',
  technik: 'Technik & Hausmeister',
  sonder: 'Sonderleistungen',
};

// 18 Leistungen aus den Kundennotizen
export const SERVICES = [
  { id: 'hausmeister', cat: 'technik', icon: 'tool', title: 'Hausmeister-Services', short: 'Ihr fester Ansprechpartner fürs Objekt – Kontrollgänge, Mülltonnendienst, kleine Sofortmaßnahmen.',
    points: ['Regelmäßige Objektbegehungen mit Protokoll', 'Mülltonnen raus- und reinstellen', 'Kontrolle von Beleuchtung, Türen, Schließanlagen', 'Ansprechpartner für Mieter und Verwaltung'] },
  { id: 'treppenhaus', cat: 'reinigung', icon: 'stairs', title: 'Treppenhausreinigung', short: 'Saubere Treppenhäuser im festen Rhythmus – wöchentlich oder 14-tägig.',
    points: ['Kehren und Nasswischen aller Stufen und Podeste', 'Handläufe, Geländer und Lichtschalter', 'Eingangsbereich, Briefkästen, Glastüren', 'Keller- und Dachbodenflure nach Absprache'] },
  { id: 'gruen', cat: 'aussen', icon: 'leaf', title: 'Grünanlagenpflege', short: 'Rasen, Hecken, Beete und Wege – gepflegt durch die ganze Saison.',
    points: ['Rasenmähen und Kantenpflege', 'Hecken- und Strauchschnitt', 'Unkraut entfernen, Beetpflege', 'Laub- und Grünschnittentsorgung'] },
  { id: 'winter', cat: 'aussen', icon: 'snow', title: 'Winterdienst', short: 'Räumen und Streuen nach Satzung – dokumentiert und haftungssicher.',
    points: ['Bereitschaft von November bis März', 'Räumen und Streuen von Gehwegen, Zufahrten, Eingängen', 'Einsatzdokumentation mit Uhrzeit', 'Übernahme der Verkehrssicherungspflicht'] },
  { id: 'muelltonnen', cat: 'reinigung', icon: 'bin', title: 'Mülltonnenreinigung', short: 'Hygienisch saubere Tonnen – gegen Gerüche, Maden und Keime.',
    points: ['Reinigung mit Heißwasser direkt vor Ort', 'Desinfektion und Geruchsneutralisierung', 'Reinigung des Tonnenstellplatzes', 'Im Abo nach jeder Leerung oder monatlich'] },
  { id: 'glas', cat: 'reinigung', icon: 'window', title: 'Glasreinigung', short: 'Streifenfreie Fenster, Glastüren und Wintergärten.',
    points: ['Fenster inkl. Rahmen und Falze', 'Glasfassaden und Schaufenster', 'Wintergärten und Lichtkuppeln', 'Regelmäßig oder als Einzelauftrag'] },
  { id: 'fassade', cat: 'reinigung', icon: 'building', title: 'Fassadenreinigung', short: 'Algen, Moos und Schmutz schonend entfernen – die Fassade wirkt wie neu.',
    points: ['Schonende Niederdruck- oder Heißwasserreinigung', 'Entfernung von Algen und Grünbelag', 'Imprägnierung auf Wunsch', 'Putz-, Klinker- und Metallfassaden'] },
  { id: 'tiefgarage', cat: 'reinigung', icon: 'car', title: 'Tiefgaragenreinigung', short: 'Maschinelle Reinigung von Tiefgaragen und Parkdecks.',
    points: ['Kehren und Scheuersaugen der Flächen', 'Reinigung von Abläufen und Rinnen', 'Ölflecken und Reifenabrieb entfernen', 'Frühjahrsreinigung nach dem Winter'] },
  { id: 'doppelparker', cat: 'reinigung', icon: 'parking', title: 'Doppelparkerreinigung', short: 'Reinigung von Doppelparkern und Parkliften inkl. Grube.',
    points: ['Reinigung der Plattformen', 'Grube und Pumpensumpf säubern', 'Laub und Schmutz entfernen', 'Sichtkontrolle auf Auffälligkeiten'] },
  { id: 'grund', cat: 'reinigung', icon: 'sparkle', title: 'Grund- & Sonderreinigung', short: 'Intensive Reinigung, wenn die normale Pflege nicht mehr reicht.',
    points: ['Böden, Fliesen und Fugen intensiv', 'Küchen und Sanitärbereiche', 'Nach Wasserschaden oder Renovierung', 'Spezielle Verschmutzungen nach Absprache'] },
  { id: 'gravur', cat: 'sonder', icon: 'tag', title: 'Gravurdienst', short: 'Klingel-, Briefkasten- und Türschilder – passend graviert und montiert.',
    points: ['Namensschilder für Klingel und Briefkasten', 'Tür- und Stellplatzschilder', 'Hausnummern', 'Montage inklusive'] },
  { id: 'reparatur', cat: 'technik', icon: 'wrench', title: 'Reparaturdienste / Kleinreparaturen', short: 'Tropfender Hahn, klemmende Tür, defekte Lampe – wir kümmern uns.',
    points: ['Leuchtmittel und Kleinteile tauschen', 'Türen, Schlösser und Beschläge einstellen', 'Kleine Maler- und Ausbesserungsarbeiten', 'Koordination von Fachfirmen'] },
  { id: 'end', cat: 'reinigung', icon: 'key', title: 'Endreinigung', short: 'Besenrein oder übergabefertig – bei Auszug, Einzug oder Verkauf.',
    points: ['Komplette Wohnungsreinigung', 'Küche, Bad und Fenster', 'Übergabefertig für Vermieter', 'Kurzfristige Termine möglich'] },
  { id: 'bau', cat: 'reinigung', icon: 'helmet', title: 'Baureinigung', short: 'Grob-, Zwischen- und Feinreinigung nach Bau oder Sanierung.',
    points: ['Baugrob- und Zwischenreinigung', 'Bauendreinigung vor Übergabe', 'Entfernung von Farb- und Mörtelresten', 'Fenster- und Rahmenreinigung'] },
  { id: 'solar', cat: 'aussen', icon: 'sun', title: 'Solar- & Photovoltaikreinigung', short: 'Saubere Module bringen wieder volle Leistung.',
    points: ['Schonende Reinigung mit entmineralisiertem Wasser', 'Ohne aggressive Reinigungsmittel', 'Sichtkontrolle der Module', 'Für Wohn- und Gewerbedächer'] },
  { id: 'notdienst', cat: 'technik', icon: 'siren', title: '24-Stunden-Notdienst', short: 'Rund um die Uhr erreichbar, wenn es schnell gehen muss.',
    points: ['Wasserschäden und Rohrbrüche erstversorgen', 'Sturmschäden sichern', 'Ausgesperrt? Wir koordinieren den Schlüsseldienst', 'Sofortige Weitergabe an Fachfirmen'] },
  { id: 'buero', cat: 'reinigung', icon: 'desk', title: 'Büroreinigung', short: 'Saubere Arbeitsplätze – zuverlässig vor oder nach Ihren Arbeitszeiten.',
    points: ['Arbeitsplätze, Böden und Teeküchen', 'Sanitärbereiche mit Hygienestandard', 'Müllentsorgung und Nachfüllservice', 'Täglich, wöchentlich oder nach Bedarf'] },
  { id: 'entruempelung', cat: 'sonder', icon: 'box', title: 'Entrümpelung', short: 'Keller, Dachboden, Wohnung oder Haus – besenrein geräumt.',
    points: ['Kostenlose Besichtigung vor Ort', 'Fachgerechte Entsorgung und Recycling', 'Wertanrechnung möglich', 'Besenreine Übergabe'] },
];

// ============================================================
//  PREISE – unverbindliche Richtwerte (netto, zzgl. MwSt.)
//  Quelle je Zeile im Kommentar. „Schätzung“ = grobe Schätzung,
//  bitte vom Kunden durch die eigenen Preise ersetzen.
// ============================================================
export const PRICES = {
  hausmeister_we:   { min: 20, max: 35, minMonth: 120 },  // €/Wohneinheit/Monat – Marktspanne 2026 (clean-invoice.com, Basispauschale)
  hourly:           { min: 35, max: 48 },                  // €/Std – Marktspanne 30–50 € (clean-invoice, 11880)
  treppe_etage:     { min: 20, max: 30 },                  // €/Etage/Reinigung – 11880.com
  gruen_h:          { min: 35, max: 45 },                  // €/Std – 11880 / trustlocal
  gruen_m2_per_h:   180,                                   // m² Rasen pro Std – Schätzung
  winter_bereit:    { min: 20, max: 45 },                  // €/Monat Bereitschaft, Nov–März – 11880.com
  winter_m2:        { min: 0.5, max: 2.0 },                // €/m²/Einsatz – 11880.com
  winter_einsaetze: 12,                                    // Einsätze pro Saison am Hochrhein – Schätzung
  tonne:            { min: 4, max: 8 },                    // €/Tonne/Reinigung – Schätzung
  glas_m2:          { min: 2.5, max: 4.5 },                // €/m² Glasfläche – Schätzung
  fassade_m2:       { min: 4, max: 10 },                   // €/m² – Schätzung
  tiefgarage_m2:    { min: 0.6, max: 1.2 },                // €/m²/Reinigung – Schätzung
  doppelparker:     { min: 25, max: 45 },                  // €/Stellplatz/Reinigung – Schätzung
  grund_m2:         { min: 3, max: 6 },                    // €/m² – Schätzung
  end_m2:           { min: 3.5, max: 6 },                  // €/m² – Schätzung
  bau_m2:           { min: 3, max: 8 },                    // €/m² – Schätzung
  solar_m2:         { min: 1.5, max: 3.5 },                // €/m² Modulfläche – energiefluss24.de 2026
  buero_m2:         { min: 0.10, max: 0.18, minVisit: 45 },// €/m²/Reinigung – Schätzung
  entruempel_m3:    { min: 40, max: 70, minJob: 250 },     // €/m³ – Schätzung
  gravur:           { min: 18, max: 35 },                  // €/Schild inkl. Montage – Schätzung
  notdienst:        { min: 90, max: 150 },                 // € Einsatzpauschale inkl. 1. Std – Schätzung
  zaehler:          { min: 33.6, max: 33.6 },              // 40 € inkl. MwSt. – laut Kundennotiz
};

export const VAT = 0.19;
