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
// Startseite zeigt diese 7, alle 18 stehen auf /leistungen
export const FEATURED = ['hausmeister', 'treppenhaus', 'gruen', 'winter', 'glas', 'solar', 'notdienst'];

export const SERVICES = [
  { id: 'hausmeister', scene: 'hausmeister', long: 'Als fester Hausmeister kümmern wir uns um Ihr Objekt, als wäre es unser eigenes. Wir gehen regelmäßig durch das Gebäude, erkennen Mängel früh und beheben Kleinigkeiten sofort. Für Mieter, Eigentümer und Hausverwaltung sind wir der direkte Ansprechpartner vor Ort – alles dokumentiert und nachvollziehbar.', cat: 'technik', icon: 'tool', title: 'Hausmeister-Services', short: 'Ihr fester Ansprechpartner fürs Objekt – Kontrollgänge, Mülltonnendienst, kleine Sofortmaßnahmen.',
    points: ['Regelmäßige Objektbegehungen mit Protokoll', 'Mülltonnen raus- und reinstellen', 'Kontrolle von Beleuchtung, Türen, Schließanlagen', 'Ansprechpartner für Mieter und Verwaltung'] },
  { id: 'treppenhaus', scene: 'treppe', long: 'Das Treppenhaus ist die Visitenkarte jedes Hauses. Wir reinigen es in einem festen Rhythmus, den wir gemeinsam mit Ihnen festlegen – inklusive Handläufen, Eingangsbereich und Glastüren. Jede Reinigung wird auf dem Reinigungsplan bestätigt.', cat: 'reinigung', icon: 'stairs', title: 'Treppenhausreinigung', short: 'Saubere Treppenhäuser im festen Rhythmus – wöchentlich oder 14-tägig.',
    points: ['Kehren und Nasswischen aller Stufen und Podeste', 'Handläufe, Geländer und Lichtschalter', 'Eingangsbereich, Briefkästen, Glastüren', 'Keller- und Dachbodenflure nach Absprache'] },
  { id: 'gruen', scene: 'gruen', long: 'Von Frühjahr bis Herbst halten wir Rasen, Hecken, Beete und Wege in Form. Wir arbeiten mit eigenen Maschinen und entsorgen Grünschnitt und Laub fachgerecht. So bleibt Ihre Außenanlage das ganze Jahr gepflegt und einladend.', cat: 'aussen', icon: 'leaf', title: 'Grünanlagenpflege', short: 'Rasen, Hecken, Beete und Wege – gepflegt durch die ganze Saison.',
    points: ['Rasenmähen und Kantenpflege', 'Hecken- und Strauchschnitt', 'Unkraut entfernen, Beetpflege', 'Laub- und Grünschnittentsorgung'] },
  { id: 'winter', scene: 'winter', long: 'Als Eigentümer tragen Sie die Verkehrssicherungspflicht – wir nehmen sie Ihnen ab. Von November bis März sind wir in Bereitschaft, räumen und streuen nach der Satzung der Gemeinde und dokumentieren jeden Einsatz mit Uhrzeit. Bei Glätte sind wir schon unterwegs, bevor die ersten Bewohner aus dem Haus gehen.', cat: 'aussen', icon: 'snow', title: 'Winterdienst', short: 'Räumen und Streuen nach Satzung – dokumentiert und haftungssicher.',
    points: ['Bereitschaft von November bis März', 'Räumen und Streuen von Gehwegen, Zufahrten, Eingängen', 'Einsatzdokumentation mit Uhrzeit', 'Übernahme der Verkehrssicherungspflicht'] },
  { id: 'muelltonnen', scene: 'tonnen', long: 'Verschmutzte Mülltonnen riechen unangenehm und ziehen Ungeziefer an. Wir reinigen Ihre Tonnen direkt vor Ort mit heißem Wasser, desinfizieren sie und säubern auch den Stellplatz. Auf Wunsch im Abo – automatisch nach der Leerung.', cat: 'reinigung', icon: 'bin', title: 'Mülltonnenreinigung', short: 'Hygienisch saubere Tonnen – gegen Gerüche, Maden und Keime.',
    points: ['Reinigung mit Heißwasser direkt vor Ort', 'Desinfektion und Geruchsneutralisierung', 'Reinigung des Tonnenstellplatzes', 'Im Abo nach jeder Leerung oder monatlich'] },
  { id: 'glas', scene: 'glas', long: 'Saubere Fenster lassen mehr Licht herein und wirken sofort gepflegt. Wir reinigen Fenster, Rahmen, Glasfassaden, Wintergärten und Schaufenster streifenfrei – mit Leiter, Teleskopstange oder Hebebühne, je nach Höhe.', cat: 'reinigung', icon: 'window', title: 'Glasreinigung', short: 'Streifenfreie Fenster, Glastüren und Wintergärten.',
    points: ['Fenster inkl. Rahmen und Falze', 'Glasfassaden und Schaufenster', 'Wintergärten und Lichtkuppeln', 'Regelmäßig oder als Einzelauftrag'] },
  { id: 'fassade', scene: 'fassade', long: 'Algen, Moos und Witterung lassen Fassaden schnell alt aussehen. Mit schonender Niederdruck- und Heißwassertechnik reinigen wir Putz, Klinker und Metall, ohne die Oberfläche zu beschädigen. Auf Wunsch schützen wir die Fassade anschließend mit einer Imprägnierung.', cat: 'reinigung', icon: 'building', title: 'Fassadenreinigung', short: 'Algen, Moos und Schmutz schonend entfernen – die Fassade wirkt wie neu.',
    points: ['Schonende Niederdruck- oder Heißwasserreinigung', 'Entfernung von Algen und Grünbelag', 'Imprägnierung auf Wunsch', 'Putz-, Klinker- und Metallfassaden'] },
  { id: 'tiefgarage', scene: 'garage', long: 'Reifenabrieb, Ölflecken und Streusalz setzen Tiefgaragen stark zu. Mit Scheuersaugmaschinen reinigen wir große Flächen schnell und gründlich, säubern Abläufe und Rinnen und sorgen für ein sicheres, gepflegtes Parkdeck.', cat: 'reinigung', icon: 'car', title: 'Tiefgaragenreinigung', short: 'Maschinelle Reinigung von Tiefgaragen und Parkdecks.',
    points: ['Kehren und Scheuersaugen der Flächen', 'Reinigung von Abläufen und Rinnen', 'Ölflecken und Reifenabrieb entfernen', 'Frühjahrsreinigung nach dem Winter'] },
  { id: 'doppelparker', scene: 'garage', long: 'Doppelparker und Parklifte brauchen regelmäßige Pflege, damit Technik und Grube sauber und funktionsfähig bleiben. Wir reinigen Plattformen, Grube und Pumpensumpf und melden Auffälligkeiten an den Wartungsdienst.', cat: 'reinigung', icon: 'parking', title: 'Doppelparkerreinigung', short: 'Reinigung von Doppelparkern und Parkliften inkl. Grube.',
    points: ['Reinigung der Plattformen', 'Grube und Pumpensumpf säubern', 'Laub und Schmutz entfernen', 'Sichtkontrolle auf Auffälligkeiten'] },
  { id: 'grund', scene: 'wohnung', long: 'Manchmal reicht die normale Reinigung nicht mehr – nach einem Wasserschaden, einer Renovierung oder vor einem Neustart. Unsere Grund- und Sonderreinigung geht in die Tiefe: Böden, Fliesen, Fugen, Küchen und Sanitärbereiche.', cat: 'reinigung', icon: 'sparkle', title: 'Grund- & Sonderreinigung', short: 'Intensive Reinigung, wenn die normale Pflege nicht mehr reicht.',
    points: ['Böden, Fliesen und Fugen intensiv', 'Küchen und Sanitärbereiche', 'Nach Wasserschaden oder Renovierung', 'Spezielle Verschmutzungen nach Absprache'] },
  { id: 'gravur', scene: 'gravur', long: 'Neue Mieter, neuer Name an der Klingel? Wir gravieren Klingel-, Briefkasten-, Tür- und Stellplatzschilder passend zu Ihrer Anlage und montieren sie direkt. Einfach das Formular ausfüllen – wir erledigen den Rest.', cat: 'sonder', icon: 'tag', title: 'Gravurdienst', short: 'Klingel-, Briefkasten- und Türschilder – passend graviert und montiert.',
    points: ['Namensschilder für Klingel und Briefkasten', 'Tür- und Stellplatzschilder', 'Hausnummern', 'Montage inklusive'] },
  { id: 'reparatur', scene: 'reparatur', long: 'Tropfende Wasserhähne, klemmende Türen, defekte Leuchten – kleine Reparaturen erledigen wir schnell und unkompliziert. Für größere Arbeiten koordinieren wir zuverlässige Fachfirmen aus der Region.', cat: 'technik', icon: 'wrench', title: 'Reparaturdienste / Kleinreparaturen', short: 'Tropfender Hahn, klemmende Tür, defekte Lampe – wir kümmern uns.',
    points: ['Leuchtmittel und Kleinteile tauschen', 'Türen, Schlösser und Beschläge einstellen', 'Kleine Maler- und Ausbesserungsarbeiten', 'Koordination von Fachfirmen'] },
  { id: 'end', scene: 'wohnung', long: 'Bei Auszug, Einzug oder Verkauf übergeben wir Ihre Wohnung besenrein oder übergabefertig. Küche, Bad, Fenster und Böden – alles so sauber, dass Vermieter und Käufer zufrieden sind.', cat: 'reinigung', icon: 'key', title: 'Endreinigung', short: 'Besenrein oder übergabefertig – bei Auszug, Einzug oder Verkauf.',
    points: ['Komplette Wohnungsreinigung', 'Küche, Bad und Fenster', 'Übergabefertig für Vermieter', 'Kurzfristige Termine möglich'] },
  { id: 'bau', scene: 'wohnung', long: 'Nach dem Bau oder der Sanierung bleiben Staub, Farb- und Mörtelreste zurück. Wir übernehmen die Grob-, Zwischen- und Endreinigung, damit das Objekt pünktlich bezugsfertig übergeben werden kann.', cat: 'reinigung', icon: 'helmet', title: 'Baureinigung', short: 'Grob-, Zwischen- und Feinreinigung nach Bau oder Sanierung.',
    points: ['Baugrob- und Zwischenreinigung', 'Bauendreinigung vor Übergabe', 'Entfernung von Farb- und Mörtelresten', 'Fenster- und Rahmenreinigung'] },
  { id: 'solar', scene: 'solar', long: 'Verschmutzte Solarmodule verlieren Leistung. Wir reinigen Ihre Photovoltaik- und Solaranlage schonend mit entmineralisiertem Wasser und ohne aggressive Mittel – sicher, gründlich und mit Sichtkontrolle der Module.', cat: 'aussen', icon: 'sun', title: 'Solar- & Photovoltaikreinigung', short: 'Saubere Module bringen wieder volle Leistung.',
    points: ['Schonende Reinigung mit entmineralisiertem Wasser', 'Ohne aggressive Reinigungsmittel', 'Sichtkontrolle der Module', 'Für Wohn- und Gewerbedächer'] },
  { id: 'notdienst', scene: 'notdienst', long: 'Rohrbruch in der Nacht, Sturmschaden am Wochenende – unser 24-Stunden-Notdienst ist erreichbar, wenn es darauf ankommt. Wir sichern die Situation, leisten Erstmaßnahmen und koordinieren sofort die passenden Fachbetriebe.', cat: 'technik', icon: 'siren', title: '24-Stunden-Notdienst', short: 'Rund um die Uhr erreichbar, wenn es schnell gehen muss.',
    points: ['Wasserschäden und Rohrbrüche erstversorgen', 'Sturmschäden sichern', 'Ausgesperrt? Wir koordinieren den Schlüsseldienst', 'Sofortige Weitergabe an Fachfirmen'] },
  { id: 'buero', scene: 'buero', long: 'Ein sauberes Büro steigert Wohlbefinden und Eindruck bei Kunden. Wir reinigen Arbeitsplätze, Böden, Teeküchen und Sanitärbereiche zuverlässig vor oder nach Ihren Arbeitszeiten – täglich, wöchentlich oder nach Bedarf.', cat: 'reinigung', icon: 'desk', title: 'Büroreinigung', short: 'Saubere Arbeitsplätze – zuverlässig vor oder nach Ihren Arbeitszeiten.',
    points: ['Arbeitsplätze, Böden und Teeküchen', 'Sanitärbereiche mit Hygienestandard', 'Müllentsorgung und Nachfüllservice', 'Täglich, wöchentlich oder nach Bedarf'] },
  { id: 'entruempelung', scene: 'entruempel', long: 'Keller, Dachboden, Wohnung oder ganzes Haus: Wir räumen schnell und diskret, entsorgen fachgerecht und übergeben besenrein. Nach einer kostenlosen Besichtigung erhalten Sie einen Festpreis.', cat: 'sonder', icon: 'box', title: 'Entrümpelung', short: 'Keller, Dachboden, Wohnung oder Haus – besenrein geräumt.',
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

// URL-Kürzel je Leistung, z. B. „Grund- & Sonderreinigung“ → grund-sonderreinigung
export const slug = (s) => s.title.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const serviceUrl = (s) => `/leistungen/${slug(s)}`;
