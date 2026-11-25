// Zweite Sprache: Bulgarisch. Deutsch steht im HTML, hier nur DE → BG.
// Neue Texte: einfach eine Zeile „'Deutsch': 'Български',“ ergänzen.

export const LANGS = ['de', 'bg'];
export const lang = (() => { try { return localStorage.getItem('siedler_lang') === 'bg' ? 'bg' : 'de'; } catch { return 'de'; } })();
export const setLang = (l) => { try { localStorage.setItem('siedler_lang', l); } catch {} location.reload(); };

const BG = {
  // Navigation & allgemein
  'Hausmeisterservice': 'Hausmeisterservice', 'Leistungen': 'Услуги', 'Kostenrechner': 'Калкулатор', 'Über uns': 'За нас', 'Galerie': 'Галерия',
  'Karriere': 'Кариери', 'Kontakt': 'Контакт', 'Anrufen': 'Обадете се', 'Startseite': 'Начало', 'Menü': 'Меню', 'Schließen': 'Затвори', 'Entfernen': 'Премахни',
  'WhatsApp': 'WhatsApp', 'E-Mail': 'Имейл', 'Instagram': 'Instagram', 'Facebook': 'Facebook',
  'Hausmeisterservice Siedler Logo': 'Лого на Hausmeisterservice Siedler', '3D-Haus Animation': '3D анимация на къща',
  'Hausmeister Siedler Maskottchen': 'Талисман на Siedler', 'Siedler Maskottchen': 'Талисман на Siedler',

  // Hero
  'Facility Management · Grenzach-Wyhlen': 'Фасилити мениджмънт · Гренцах-Вилен',
  'Ihr Haus.': 'Вашият дом.', 'Unsere': 'Нашата', 'Sorge.': 'грижа.',
  'Hausmeisterdienste, Reinigung, Grünpflege und Winterdienst aus einer Hand – mit festem Ansprechpartner, sauberer Dokumentation und 24-Stunden-Notdienst.':
    'Домоуправителски услуги, почистване, поддръжка на зелени площи и зимно почистване от една фирма – с постоянно лице за контакт, ясна документация и денонощна аварийна служба.',
  'Kosten berechnen': 'Изчислете цената', 'Kostenlose Besichtigung': 'Безплатен оглед', 'Versichert & zuverlässig': 'Застраховани и надеждни',
  '24h Notdienst': 'Аварийна служба 24/7', 'Ein Ansprechpartner': 'Едно лице за контакт', 'Grünpflege': 'Зелени площи', 'Winterdienst': 'Зимно почистване', 'Reinigung': 'Почистване',

  // Leistungen – Titel
  'Hausmeister-Services': 'Домоуправителски услуги', 'Treppenhausreinigung': 'Почистване на стълбища', 'Grünanlagenpflege': 'Поддръжка на зелени площи',
  'Mülltonnenreinigung': 'Почистване на кофи за боклук', 'Glasreinigung': 'Почистване на стъкла', 'Fassadenreinigung': 'Почистване на фасади',
  'Tiefgaragenreinigung': 'Почистване на подземни гаражи', 'Doppelparkerreinigung': 'Почистване на двойни паркинг системи',
  'Grund- & Sonderreinigung': 'Основно и специално почистване', 'Gravurdienst': 'Гравиране на табелки', 'Reparaturdienste / Kleinreparaturen': 'Ремонти / дребни ремонти',
  'Endreinigung': 'Финално почистване', 'Baureinigung': 'Почистване след строеж', 'Solar- & Photovoltaikreinigung': 'Почистване на соларни и фотоволтаични панели',
  '24-Stunden-Notdienst': 'Денонощна аварийна служба', 'Büroreinigung': 'Почистване на офиси', 'Entrümpelung': 'Извозване на вещи и разчистване',

  // Stats
  'Leistungen aus einer Hand': 'услуги от една фирма', 'Notdienst erreichbar': 'аварийна служба на линия', 'Besichtigung & Angebot': 'оглед и оферта', 'fester Ansprechpartner': 'постоянно лице за контакт',

  // Leistungen – Bereich
  'Dienstleistungen': 'Услуги', 'Alles rund um': 'Всичко за', 'Ihre Immobilie': 'Вашия имот', 'Alle': 'Всички',
  'Außen & Grün': 'Двор и зелени площи', 'Technik & Hausmeister': 'Техника и поддръжка', 'Sonderleistungen': 'Специални услуги', 'Details': 'Подробно',
  'Ihr fester Ansprechpartner fürs Objekt – Kontrollgänge, Mülltonnendienst, kleine Sofortmaßnahmen.': 'Вашето постоянно лице за контакт за сградата – обходи, изнасяне на кофите, бързи дребни мерки.',
  'Saubere Treppenhäuser im festen Rhythmus – wöchentlich oder 14-tägig.': 'Чисти стълбища по постоянен график – всяка седмица или на 14 дни.',
  'Rasen, Hecken, Beete und Wege – gepflegt durch die ganze Saison.': 'Трева, жив плет, лехи и алеи – поддържани през целия сезон.',
  'Räumen und Streuen nach Satzung – dokumentiert und haftungssicher.': 'Почистване на сняг и опесъчаване по наредбата – документирано и с поета отговорност.',
  'Hygienisch saubere Tonnen – gegen Gerüche, Maden und Keime.': 'Хигиенично чисти кофи – без миризми, ларви и бактерии.',
  'Streifenfreie Fenster, Glastüren und Wintergärten.': 'Прозорци, стъклени врати и зимни градини без следи.',
  'Algen, Moos und Schmutz schonend entfernen – die Fassade wirkt wie neu.': 'Щадящо премахване на водорасли, мъх и мръсотия – фасадата изглежда като нова.',
  'Maschinelle Reinigung von Tiefgaragen und Parkdecks.': 'Машинно почистване на подземни гаражи и паркинги.',
  'Reinigung von Doppelparkern und Parkliften inkl. Grube.': 'Почистване на двойни паркинг системи и паркинг асансьори, вкл. шахтата.',
  'Intensive Reinigung, wenn die normale Pflege nicht mehr reicht.': 'Интензивно почистване, когато обичайната поддръжка не стига.',
  'Klingel-, Briefkasten- und Türschilder – passend graviert und montiert.': 'Табелки за звънец, пощенска кутия и врата – гравирани и монтирани.',
  'Tropfender Hahn, klemmende Tür, defekte Lampe – wir kümmern uns.': 'Капещ кран, заяждаща врата, изгоряла лампа – ние се грижим.',
  'Besenrein oder übergabefertig – bei Auszug, Einzug oder Verkauf.': 'Почистено или готово за предаване – при изнасяне, нанасяне или продажба.',
  'Grob-, Zwischen- und Feinreinigung nach Bau oder Sanierung.': 'Грубо, междинно и финално почистване след строеж или ремонт.',
  'Saubere Module bringen wieder volle Leistung.': 'Чистите панели отново дават пълна мощност.',
  'Rund um die Uhr erreichbar, wenn es schnell gehen muss.': 'На разположение денонощно, когато трябва да е бързо.',
  'Saubere Arbeitsplätze – zuverlässig vor oder nach Ihren Arbeitszeiten.': 'Чисти работни места – надеждно преди или след работното Ви време.',
  'Keller, Dachboden, Wohnung oder Haus – besenrein geräumt.': 'Мазе, таван, апартамент или къща – разчистени и пометени.',

  // Leistungen – Details (Modal)
  'Regelmäßige Objektbegehungen mit Protokoll': 'Редовни обходи на сградата с протокол', 'Mülltonnen raus- und reinstellen': 'Изнасяне и прибиране на кофите',
  'Kontrolle von Beleuchtung, Türen, Schließanlagen': 'Проверка на осветление, врати и брави', 'Ansprechpartner für Mieter und Verwaltung': 'Лице за контакт за наематели и управител',
  'Kehren und Nasswischen aller Stufen und Podeste': 'Метене и мокро почистване на всички стъпала и площадки', 'Handläufe, Geländer und Lichtschalter': 'Ръкохватки, парапети и ключове за осветление',
  'Eingangsbereich, Briefkästen, Glastüren': 'Входно пространство, пощенски кутии, стъклени врати', 'Keller- und Dachbodenflure nach Absprache': 'Коридори в мазето и тавана по договаряне',
  'Rasenmähen und Kantenpflege': 'Косене на трева и оформяне на кантове', 'Hecken- und Strauchschnitt': 'Подрязване на жив плет и храсти',
  'Unkraut entfernen, Beetpflege': 'Плевене и поддръжка на лехи', 'Laub- und Grünschnittentsorgung': 'Извозване на листа и окосена растителност',
  'Bereitschaft von November bis März': 'Дежурство от ноември до март', 'Räumen und Streuen von Gehwegen, Zufahrten, Eingängen': 'Почистване и опесъчаване на тротоари, алеи и входове',
  'Einsatzdokumentation mit Uhrzeit': 'Документиране на всяко излизане с час', 'Übernahme der Verkehrssicherungspflicht': 'Поемаме отговорността за безопасността',
  'Reinigung mit Heißwasser direkt vor Ort': 'Почистване с гореща вода на място', 'Desinfektion und Geruchsneutralisierung': 'Дезинфекция и неутрализиране на миризми',
  'Reinigung des Tonnenstellplatzes': 'Почистване на мястото за кофите', 'Im Abo nach jeder Leerung oder monatlich': 'Абонамент след всяко извозване или месечно',
  'Fenster inkl. Rahmen und Falze': 'Прозорци вкл. рамки и уплътнения', 'Glasfassaden und Schaufenster': 'Стъклени фасади и витрини',
  'Wintergärten und Lichtkuppeln': 'Зимни градини и светлинни куполи', 'Regelmäßig oder als Einzelauftrag': 'Редовно или еднократно',
  'Schonende Niederdruck- oder Heißwasserreinigung': 'Щадящо почистване с нисък натиск или гореща вода', 'Entfernung von Algen und Grünbelag': 'Премахване на водорасли и зелен налеп',
  'Imprägnierung auf Wunsch': 'Импрегниране при желание', 'Putz-, Klinker- und Metallfassaden': 'Мазилка, клинкер и метални фасади',
  'Kehren und Scheuersaugen der Flächen': 'Метене и машинно миене на настилката', 'Reinigung von Abläufen und Rinnen': 'Почистване на сифони и улеи',
  'Ölflecken und Reifenabrieb entfernen': 'Премахване на маслени петна и следи от гуми', 'Frühjahrsreinigung nach dem Winter': 'Пролетно почистване след зимата',
  'Reinigung der Plattformen': 'Почистване на платформите', 'Grube und Pumpensumpf säubern': 'Почистване на шахтата и помпената яма',
  'Laub und Schmutz entfernen': 'Премахване на листа и мръсотия', 'Sichtkontrolle auf Auffälligkeiten': 'Визуална проверка за нередности',
  'Böden, Fliesen und Fugen intensiv': 'Интензивно почистване на подове, плочки и фуги', 'Küchen und Sanitärbereiche': 'Кухни и санитарни помещения',
  'Nach Wasserschaden oder Renovierung': 'След наводнение или ремонт', 'Spezielle Verschmutzungen nach Absprache': 'Специфични замърсявания по договаряне',
  'Namensschilder für Klingel und Briefkasten': 'Табелки с имена за звънец и пощенска кутия', 'Tür- und Stellplatzschilder': 'Табелки за врати и паркоместа',
  'Hausnummern': 'Номера на сгради', 'Montage inklusive': 'Монтажът е включен',
  'Leuchtmittel und Kleinteile tauschen': 'Смяна на крушки и дребни части', 'Türen, Schlösser und Beschläge einstellen': 'Регулиране на врати, брави и обков',
  'Kleine Maler- und Ausbesserungsarbeiten': 'Дребни бояджийски и поправки', 'Koordination von Fachfirmen': 'Координация със специализирани фирми',
  'Komplette Wohnungsreinigung': 'Пълно почистване на апартамента', 'Küche, Bad und Fenster': 'Кухня, баня и прозорци',
  'Übergabefertig für Vermieter': 'Готово за предаване на хазяина', 'Kurzfristige Termine möglich': 'Възможни са спешни часове',
  'Baugrob- und Zwischenreinigung': 'Грубо и междинно почистване на обекта', 'Bauendreinigung vor Übergabe': 'Финално почистване преди предаване',
  'Entfernung von Farb- und Mörtelresten': 'Премахване на остатъци от боя и хоросан', 'Fenster- und Rahmenreinigung': 'Почистване на прозорци и рамки',
  'Schonende Reinigung mit entmineralisiertem Wasser': 'Щадящо почистване с деминерализирана вода', 'Ohne aggressive Reinigungsmittel': 'Без агресивни препарати',
  'Sichtkontrolle der Module': 'Визуална проверка на панелите', 'Für Wohn- und Gewerbedächer': 'За покриви на жилищни и търговски сгради',
  'Wasserschäden und Rohrbrüche erstversorgen': 'Първа реакция при наводнения и спукани тръби', 'Sturmschäden sichern': 'Обезопасяване след буря',
  'Ausgesperrt? Wir koordinieren den Schlüsseldienst': 'Заключили сте се? Организираме ключар', 'Sofortige Weitergabe an Fachfirmen': 'Веднага възлагаме на специализирани фирми',
  'Arbeitsplätze, Böden und Teeküchen': 'Работни места, подове и кухненски кътове', 'Sanitärbereiche mit Hygienestandard': 'Санитарни помещения по хигиенен стандарт',
  'Müllentsorgung und Nachfüllservice': 'Изхвърляне на боклука и зареждане на консумативи', 'Täglich, wöchentlich oder nach Bedarf': 'Ежедневно, седмично или при нужда',
  'Kostenlose Besichtigung vor Ort': 'Безплатен оглед на място', 'Fachgerechte Entsorgung und Recycling': 'Правилно изхвърляне и рециклиране',
  'Wertanrechnung möglich': 'Възможно приспадане на стойността на ценни вещи', 'Besenreine Übergabe': 'Предаване разчистено и пометено',
  'Anfragen': 'Запитване',

  // Rechner-Teaser
  'Was kostet das?': 'Колко струва?', 'In 60 Sekunden': 'Разберете за 60 секунди', 'wissen.': '',
  'Objekt wählen, Leistungen anklicken, Flächen eingeben – und sofort eine ehrliche Preisspanne sehen. Danach mit einem Klick ein unverbindliches Angebot anfordern, gerne mit Fotos vom Objekt.':
    'Изберете обект, отбележете услугите, въведете площите – и веднага виждате реален ценови диапазон. След това с един клик поискайте оферта без ангажимент, по желание със снимки на обекта.',
  'Jetzt berechnen →': 'Изчислете сега →', 'Treppenhaus': 'Стълбище', 'Hausmeister': 'Домоуправител', 'pro Monat, ca.': 'на месец, около',

  // Ablauf
  'So arbeiten wir': 'Как работим', 'In drei Schritten': 'В три стъпки', 'zum gepflegten Objekt': 'до поддържан имот',
  'Anfrage & Besichtigung': 'Запитване и оглед', 'Sie melden sich per Formular, Telefon oder WhatsApp. Wir sehen uns das Objekt kostenlos vor Ort an.': 'Пишете ни през формата, по телефона или WhatsApp. Оглеждаме обекта безплатно на място.',
  'Festes Angebot': 'Ясна оферта', 'Sie erhalten ein klares Angebot mit Leistungsverzeichnis – ohne versteckte Kosten.': 'Получавате ясна оферта със списък на услугите – без скрити разходи.',
  'Zuverlässige Betreuung': 'Надеждна поддръжка', 'Ein fester Ansprechpartner, feste Intervalle und dokumentierte Einsätze.': 'Едно лице за контакт, постоянен график и документирана работа.',

  // Über uns
  'Inhabergeführt.': 'Семейна фирма.', 'Aus der Region.': 'От региона.',
  'Die Hausmeisterservice – Siedler GmbH mit Sitz in Grenzach-Wyhlen betreut Wohnanlagen, Gewerbeobjekte und Privathäuser am Hochrhein. Geführt von Inhaberin und Geschäftsführerin Katya Siedler.':
    'Hausmeisterservice – Siedler GmbH със седалище в Гренцах-Вилен поддържа жилищни комплекси, търговски обекти и частни къщи по Горен Рейн. Фирмата се ръководи от собственичката и управител Катя Зидлер.',
  'Persönlicher Ansprechpartner statt Callcenter': 'Лично лице за контакт вместо кол център', 'Eigenes, geschultes Team und moderne Maschinen': 'Собствен обучен екип и модерна техника',
  'Dokumentierte Einsätze – nachvollziehbar für Verwaltung & Eigentümer': 'Документирана работа – прозрачна за управители и собственици', 'Kurze Wege im Dreiländereck': 'Бързо на място в района на трите граници',
  'Platzhaltertext – Geschichte und Fotos der Firma folgen.': 'Временен текст – историята и снимките на фирмата предстоят.',

  // Galerie
  'Bilder & Videos': 'Снимки и видео', 'Einblicke in': 'Поглед към', 'unsere Arbeit': 'нашата работа',
  'Vorher/Nachher, Teamfotos und Videos unserer Einsätze – die Galerie wird gerade befüllt.': 'Преди/след, снимки на екипа и видео от работата ни – галерията се попълва.',
  'Treppenhaus vorher/nachher': 'Стълбище преди/след', 'Unser Team': 'Нашият екип', 'Fassade': 'Фасада', 'PV-Reinigung': 'Почистване на панели', 'Tiefgarage': 'Подземен гараж', 'Foto folgt': 'снимката предстои',

  // Karriere
  'Werden Sie Teil': 'Станете част', 'unseres Teams': 'от нашия екип', 'Offene Stellen – einfach aufklappen und direkt online bewerben.': 'Свободни позиции – отворете и кандидатствайте директно онлайн.',
  'Gebäudereinigung': 'Почистване на сгради', 'Reinigung und Pflege von Treppenhäusern': 'Почистване и поддръжка на стълбища',
  'Sie arbeiten gerne sorgfältig und sehen sofort, wo es glänzen muss? Sie sind zuverlässig und arbeiten gerne selbstständig, aber auch im Team? Dann suchen wir Sie zum nächstmöglichen Zeitpunkt.':
    'Работите прецизно и веднага виждате къде трябва да блести? Надеждни сте и обичате да работите самостоятелно, но и в екип? Тогава търсим Вас – с възможно най-ранно постъпване.',
  'Welche Aufgaben erwarten Sie?': 'Какви задачи Ви очакват?', 'Reinigung von Treppenhäusern und Eingangsbereichen': 'Почистване на стълбища и входове',
  'Pflege von Glastüren, Handläufen und Briefkastenanlagen': 'Поддръжка на стъклени врати, парапети и пощенски кутии', 'Reinigung von Keller- und Gemeinschaftsräumen': 'Почистване на мазета и общи помещения',
  'Kurze Dokumentation der Einsätze': 'Кратко документиране на работата', 'Was bringen Sie mit?': 'Какво предлагате Вие?',
  'Erfahrung in der Reinigung von Vorteil': 'Опит в почистването е предимство', 'Zuverlässigkeit und Sorgfalt': 'Надеждност и прецизност',
  'Gepflegtes und freundliches Auftreten': 'Спретнат вид и любезно отношение', 'Deutsche Sprachkenntnisse': 'Познания по немски език',
  'Führerschein Klasse B wünschenswert': 'Шофьорска книжка кат. B е желателна', 'Was können Sie von uns erwarten?': 'Какво предлагаме ние?',
  'Eine verantwortungsvolle und abwechslungsreiche Tätigkeit': 'Отговорна и разнообразна работа', 'Ein inhabergeführtes Familienunternehmen': 'Семейна фирма, ръководена от собственика',
  'Technisch gut ausgestattete Fahrzeuge': 'Добре оборудвани автомобили', 'Modernste Maschinen': 'Най-модерна техника', 'Gute Bezahlung': 'Добро заплащане',
  'Geburtstagsprämie': 'Бонус за рожден ден', '30 Tage Urlaub': '30 дни отпуск', 'Förderung bei Weiterbildungsmaßnahmen': 'Подкрепа за квалификации и обучения',
  'Regelmäßige Teamevents': 'Редовни събития с екипа', 'Hier online bewerben →': 'Кандидатствайте онлайн →',
  'Oder per E-Mail an info@hausmeisterservice-siedler.de': 'Или по имейл на info@hausmeisterservice-siedler.de',
  'Grün- und Außenanlagenpflege': 'Поддръжка на зелени и открити площи', 'Außenreinigung und Grünanlagenpflege': 'Външно почистване и поддръжка на зелени площи',
  'Mögen Sie auch den Geruch von frisch gemähtem Rasen? Sie haben Spaß am Umgang mit Menschen? Arbeiten gerne alleine, aber auch im Team? Sie haben Freude an anspruchsvollen Aufgabenstellungen? Dann suchen wir Sie zum nächstmöglichen Zeitpunkt.':
    'Обичате ли и Вие миризмата на прясно окосена трева? Харесва Ви да работите с хора? Работите добре сам, но и в екип? Обичате предизвикателни задачи? Тогава търсим Вас – с възможно най-ранно постъпване.',
  'Reinigung und Pflege von Außen- und Grünanlagen': 'Почистване и поддръжка на открити и зелени площи', 'Schneiden von Hecken und Büschen': 'Подрязване на жив плет и храсти',
  'Rasenmähen': 'Косене на трева', 'Gärtnerische Fähigkeiten': 'Градинарски умения', 'Bereitschaft, Neues zu lernen': 'Желание да учите нови неща',
  'Führerschein Klasse B bzw. 3 erforderlich': 'Задължителна шофьорска книжка кат. B', 'Teamfähigkeit': 'Умение за работа в екип',
  'Bewerbung': 'Кандидатура', 'Frühester Eintritt': 'Най-ранна дата за постъпване', 'Führerschein Klasse B?': 'Книжка кат. B?', 'Kurz zu Ihnen': 'Накратко за Вас',
  'Lebenslauf, Zeugnisse, Empfehlungen (PDF oder Foto)': 'CV, удостоверения, препоръки (PDF или снимка)', 'Dateien hochladen': 'Качете файлове',
  'Ich stimme der Verarbeitung meiner Bewerbungsdaten gemäß': 'Съгласен/съгласна съм данните от кандидатурата ми да бъдат обработени съгласно', 'zu.': '.',
  'Bewerbung absenden →': 'Изпратете кандидатурата →', 'Erfahrung, Verfügbarkeit, Fragen …': 'Опит, наличност, въпроси …',

  // Kontakt
  'Wie können wir': 'Как можем', 'Ihnen helfen?': 'да помогнем?', 'Allgemeine Anfrage': 'Общо запитване', 'Zählerablesung beauftragen': 'Отчитане на уреди',
  'Gravur für Klingel- & Türschilder': 'Гравиране на табелки за звънец и врата', 'Name & Adressdaten': 'Име и адрес', 'Anrede': 'Обръщение', 'bitte wählen Sie': 'моля, изберете',
  'Frau': 'Г-жа', 'Herr': 'Г-н', 'Divers': 'Друго', 'Firma': 'Фирма', 'Vorname': 'Име', 'Name': 'Фамилия', 'Postfach': 'Пощенска кутия', 'PLZ': 'Пощенски код', 'Ort': 'Град',
  'Straße': 'Улица', 'Hausnummer': 'Номер', 'Kontaktdaten & Mitteilung': 'Контакти и съобщение', 'Telefon': 'Телефон', 'Telefon (geschäftlich)': 'Телефон (служебен)', 'Telefon (mobil)': 'Телефон (мобилен)',
  '** Bitte geben Sie mindestens eine Telefonnummer an. ·': '** Моля, посочете поне един телефон. ·', 'Pflichtfelder': 'задължителни полета',
  'Wann können wir Sie am besten erreichen?': 'Кога е най-удобно да се свържем с Вас?', 'Vormittags (8–12 Uhr)': 'Сутрин (8–12 ч.)', 'Mittags (12–14 Uhr)': 'По обед (12–14 ч.)',
  'Nachmittags (14–17 Uhr)': 'Следобед (14–17 ч.)', 'Abends (ab 17 Uhr)': 'Вечер (след 17 ч.)', 'Jederzeit': 'По всяко време',
  'Ich wünsche Informationen zu …': 'Искам информация за …', 'Hausmeisterdienste': 'Домоуправителски услуги', 'Gehwegreinigung': 'Почистване на тротоари',
  'Technische Betreuung': 'Техническа поддръжка', 'Kontrolldienste': 'Контролни обходи', 'Mitteilung': 'Съобщение', 'Fotos vom Objekt (optional)': 'Снимки на обекта (по желание)',
  'Fotos hochladen': 'Качете снимки', 'Bitte schicken Sie eine Kopie meiner Anfrage unverschlüsselt an meine E-Mail-Adresse:': 'Изпратете копие от запитването ми (некриптирано) на моя имейл:',
  'Ja': 'Да', 'Nein': 'Не', 'ja': 'да', 'Mit Absenden dieses Formulars stimmen Sie der Übermittlung und Verarbeitung Ihrer Daten wie in unserer': 'С изпращането на формата се съгласявате данните Ви да бъдат предадени и обработени, както е описано в нашата',
  'Datenschutzerklärung': 'Политика за поверителност', 'beschrieben zu.': '.', 'Anfrage absenden →': 'Изпратете запитването →',
  'Adressdaten speichern:': 'Запазване на адреса:', 'Ich will Name & Adressdaten auf diesem Gerät speichern, damit ich sie das nächste Mal nicht erneut eingeben muss.': 'Искам името и адресът да се запазят на това устройство, за да не ги въвеждам отново следващия път.',
  'Informationen & Mitteilung': 'Информация и съобщение', 'Abzulesender Zähler in der angegebenen Adresse?': 'Уредът за отчитане на посочения адрес ли е?', 'nein, andere Adresse': 'не, на друг адрес',
  'Objektadresse des Zählers': 'Адрес на уреда', 'Wohnungsnummer': 'Номер на апартамента', 'Etage': 'Етаж', 'Untergeschoss / Keller': 'Сутерен / мазе', 'Erdgeschoss': 'Партер',
  '1. OG': '1. етаж', '2. OG': '2. етаж', '3. OG': '3. етаж', '4. OG': '4. етаж', '5. OG oder höher': '5. етаж или по-висок', 'Dachgeschoss': 'Таванско ниво',
  'Zähler 1:': 'Уред 1:', 'Zähler 2:': 'Уред 2:', 'Zähler 3:': 'Уред 3:', 'Strom': 'Ток', 'Gas': 'Газ', 'Wasser (kalt)': 'Вода (студена)', 'Wasser (warm)': 'Вода (топла)',
  'Heizung / Wärmemengenzähler': 'Отопление / топломер', 'Heizkostenverteiler': 'Разпределител за отопление', 'Sonstiges': 'Друго', 'Zählernummer': 'Номер на уреда',
  'Kostenpflichtige Ablesung:': 'Платено отчитане:', 'Zähler, obwohl er frei zugänglich ist, gegen eine Aufwandsentschädigung von': 'Отчитане на уреда, въпреки че е свободно достъпен, срещу такса от',
  '40,00 EUR inkl. MwSt.': '40,00 EUR с ДДС', 'ablesen.': '.', 'Ablesung beauftragen →': 'Заявете отчитане →',
  'Ihre Daten': 'Вашите данни', 'Straße & Hausnummer': 'Улица и номер', 'PLZ & Ort': 'Пощенски код и град', 'Was soll graviert werden?': 'Какво да гравираме?',
  'Art des Schildes': 'Вид табелка', 'Klingelschild': 'Табелка за звънец', 'Briefkastenschild': 'Табелка за пощенска кутия', 'Türschild': 'Табелка за врата',
  'Stellplatz / Parkplatz': 'Паркомясто', 'Anzahl Schilder': 'Брой табелки', 'Wohnung / Stellplatz-Nr.': 'Апартамент / № паркомясто',
  'Gewünschter Text': 'Желан текст', 'Foto vom vorhandenen Schild (hilft bei Größe & Material)': 'Снимка на сегашната табелка (помага за размер и материал)', 'Gravur anfragen →': 'Поръчайте гравиране →',
  'Direkt erreichen': 'Директен контакт', 'Telefon / Notdienst': 'Телефон / аварийна служба', 'Nachricht schreiben': 'Напишете съобщение', 'Adresse': 'Адрес', 'Bürozeiten': 'Работно време',
  'Mo–Fr 08:00–13:00 & 14:00–17:00 Uhr': 'пон–пет 08:00–13:00 и 14:00–17:00 ч.',
  'Beschreiben Sie kurz Ihr Anliegen …': 'Опишете накратко какво Ви трябва …', 'Straße, Hausnummer, PLZ, Ort': 'Улица, номер, пощенски код, град',
  'z. B. „Müller / Schmidt“ – bitte genau wie gewünscht (Groß-/Kleinschreibung)': 'напр. „Müller / Schmidt“ – точно както желаете (главни/малки букви)',
  'Wird gesendet …': 'Изпращане …', 'Vielen Dank! Ihre Anfrage ist eingegangen – wir melden uns schnellstmöglich.': 'Благодарим! Получихме запитването Ви – ще се свържем с Вас възможно най-скоро.',
  'Senden fehlgeschlagen. Bitte rufen Sie uns an oder schreiben Sie per WhatsApp.': 'Изпращането не успя. Моля, обадете ни се или пишете в WhatsApp.',
  'Bitte geben Sie mindestens eine Telefonnummer an.': 'Моля, посочете поне един телефон.', 'Bitte wählen Sie die Art des Schildes.': 'Моля, изберете вид табелка.',

  // Footer
  'Service': 'Обслужване', 'Alle Leistungen': 'Всички услуги', 'Zählerablesung': 'Отчитане на уреди', 'Jobs': 'Работа', 'Rechtliches': 'Правна информация', 'Impressum': 'Импресум',

  // Kostenrechner
  'Was kostet Ihr': 'Колко струва Вашата', 'Rundum-Service?': 'цялостна поддръжка?',
  'Objekt wählen, Leistungen zusammenstellen, Größen anpassen – Sie sehen sofort eine realistische Preisspanne. Das verbindliche Angebot folgt nach der kostenlosen Besichtigung.':
    'Изберете обект, съберете услугите, нагласете размерите – веднага виждате реален ценови диапазон. Обвързващата оферта идва след безплатния оглед.',
  'Welches Objekt?': 'Какъв е обектът?', 'Einfamilienhaus': 'Еднофамилна къща', 'Mehrfamilienhaus': 'Жилищна сграда', 'Wohnanlage / WEG': 'Жилищен комплекс / ЕС', 'Gewerbe & Büro': 'Търговски обект и офис',
  'Wohneinheiten': 'Апартаменти', 'Etagen': 'Етажи', 'Treppenhäuser': 'Входове', 'Welche Leistungen?': 'Кои услуги?',
  'Antippen zum Hinzufügen – danach Größe und Rhythmus anpassen.': 'Докоснете, за да добавите – после нагласете размера и честотата.', 'Details anpassen': 'Нагласете детайлите',
  '/Monat': '/месец', 'Aus Schritt 1': 'От стъпка 1', 'Rhythmus': 'Честота', 'wöchentlich': 'седмично', '14-tägig': 'на 14 дни', 'monatlich': 'месечно',
  'Gehweg & Zufahrt': 'Тротоар и алея', 'Grünfläche': 'Зелена площ', 'wöchentlich (Saison)': 'седмично (сезон)', '14-tägig (Saison)': 'на 14 дни (сезон)', 'monatlich (Saison)': 'месечно (сезон)',
  'einmalig': 'еднократно', 'Anzahl Tonnen': 'Брой кофи', 'alle 2 Monate': 'на 2 месеца', 'quartalsweise': 'на тримесечие', 'Glasfläche': 'Стъклена площ',
  '2× jährlich': '2× годишно', '4× jährlich': '4× годишно', '1× jährlich': '1× годишно', 'Fassadenfläche': 'Площ на фасадата', 'Fläche': 'Площ', 'Stellplätze': 'Паркоместа',
  'Arbeitszeit': 'Работно време', 'monatliches Kontingent': 'месечен пакет часове', 'Wohnfläche': 'Жилищна площ', 'Modulfläche': 'Площ на панелите', 'je Einsatz': 'на излизане',
  'pro Einsatz': 'на излизане', 'Bürofläche': 'Офис площ', '1× pro Woche': '1× седмично', '2× pro Woche': '2× седмично', '3× pro Woche': '3× седмично', '5× pro Woche': '5× седмично',
  'Volumen': 'Обем', 'Saison Nov–März': 'сезон ноем.–март', 'Ihre Schätzung': 'Вашата оценка', 'netto': 'без ДДС', 'brutto': 'с ДДС', 'monatlich ca.': 'месечно около',
  'pro Jahr': 'на година', 'einmalige Leistungen': 'еднократни услуги', 'Noch keine Leistung gewählt.': 'Още няма избрана услуга.',
  'Unverbindliches Angebot anfordern →': 'Поискайте оферта без ангажимент →',
  'Unverbindliche Richtwerte auf Basis üblicher Marktpreise 2026 in Deutschland. Der genaue Preis hängt von Zugänglichkeit, Verschmutzung und Aufwand vor Ort ab. Besichtigung und Angebot sind kostenlos.':
    'Ориентировъчни стойности без ангажимент, на база обичайни пазарни цени за 2026 г. в Германия. Точната цена зависи от достъпа, замърсяването и работата на място. Огледът и офертата са безплатни.',
  'Letzter Schritt': 'Последна стъпка', 'Angebot anfordern': 'Поискайте оферта', 'Ihre Auswahl wird mitgeschickt. Fotos vom Objekt helfen uns, schneller und genauer anzubieten.': 'Изборът Ви се изпраща заедно със запитването. Снимките на обекта ни помагат да дадем по-бърза и точна оферта.',
  'Firma / Hausverwaltung': 'Фирма / управител на сградата', 'Objektadresse': 'Адрес на обекта', 'Wunschtermin Besichtigung': 'Желана дата за оглед', 'Rückruf am besten': 'Обаждане най-добре',
  'Vormittags': 'Сутрин', 'Nachmittags': 'Следобед', 'Abends': 'Вечер', 'Egal': 'Без значение', 'Fotos vom Objekt': 'Снимки на обекта', 'Fotos vom Objekt hochladen': 'Качете снимки на обекта',
  'Angebot anfordern →': 'Поискайте оферта →', 'Besonderheiten, Zugang, Schlüssel, Fragen …': 'Особености, достъп, ключове, въпроси …',

  // Titel & Meta
  'Hausmeisterservice Siedler GmbH · Grenzach-Wyhlen & Umgebung': 'Hausmeisterservice Siedler GmbH · Гренцах-Вилен и региона',
  'Hausmeisterservice, Gebäudereinigung, Grünanlagenpflege und Winterdienst in Grenzach-Wyhlen, Lörrach und Umgebung. Kostenlose Besichtigung, fester Ansprechpartner, 24h Notdienst.':
    'Домоуправителски услуги, почистване на сгради, зелени площи и зимно почистване в Гренцах-Вилен, Льорах и региона. Безплатен оглед, постоянно лице за контакт, аварийна служба 24/7.',
  'Kostenrechner · Hausmeisterservice Siedler GmbH': 'Калкулатор · Hausmeisterservice Siedler GmbH',
  'Berechnen Sie in einer Minute die ungefähren Kosten für Hausmeisterservice, Treppenhausreinigung, Winterdienst, Grünpflege und mehr – unverbindlich.': 'Изчислете за минута приблизителната цена за домоуправител, почистване на стълбища, зимно почистване, зелени площи и още – без ангажимент.',
  'Impressum · Hausmeisterservice Siedler GmbH': 'Импресум · Hausmeisterservice Siedler GmbH', 'Datenschutzerklärung · Hausmeisterservice Siedler GmbH': 'Политика за поверителност · Hausmeisterservice Siedler GmbH',

  // Impressum
  'Angaben gemäß § 5 DDG': 'Данни съгласно § 5 DDG', 'Sitz der Gesellschaft: 79639 Grenzach-Wyhlen': 'Седалище на дружеството: 79639 Grenzach-Wyhlen',
  'Registergericht: Amtsgericht Freiburg i. Br.': 'Регистров съд: Amtsgericht Freiburg i. Br.', 'Handelsregisternummer: HRB 727437': 'Номер в търговския регистър: HRB 727437',
  'Vertreten durch': 'Представлявано от', 'Katya Siedler (Geschäftsführerin)': 'Катя Зидлер (управител)', 'Mobil: +49 152 317 67 316': 'Мобилен: +49 152 317 67 316',
  'E-Mail: info@hausmeisterservice-siedler.de': 'Имейл: info@hausmeisterservice-siedler.de', 'Umsatzsteuer-ID': 'ДДС номер',
  'Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: DE 357275445': 'ДДС идентификационен номер съгласно § 27a UStG: DE 357275445',
  'Verbraucherstreitbeilegung': 'Решаване на потребителски спорове', 'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.': 'Не сме готови и не сме задължени да участваме в процедури пред орган за решаване на потребителски спорове.',
  'Haftung für Inhalte und Links': 'Отговорност за съдържание и връзки',
  'Die Inhalte dieser Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Für Inhalte externer Links sind ausschließlich deren Betreiber verantwortlich.':
    'Съдържанието на тези страници е изготвено с най-голямо внимание. Не можем обаче да гарантираме неговата точност, пълнота и актуалност. За съдържанието на външни връзки отговарят единствено техните оператори.',
  'Hinweis für die Freigabe: E-Mail-Adresse und Angaben bitte vom Kunden bestätigen lassen.': 'Бележка за одобрение: имейлът и данните трябва да се потвърдят от клиента.',

  // Datenschutz
  'Entwurf – vor dem Livegang von einer fachkundigen Person prüfen lassen.': 'Чернова – преди пускане трябва да се провери от специалист.',
  '1. Verantwortliche Stelle': '1. Администратор на данни',
  'Hausmeisterservice – Siedler GmbH, Seidenweg 1, 79639 Grenzach-Wyhlen, vertreten durch die Geschäftsführerin Katya Siedler. E-Mail: info@hausmeisterservice-siedler.de, Telefon: +49 152 317 67 316.':
    'Hausmeisterservice – Siedler GmbH, Seidenweg 1, 79639 Grenzach-Wyhlen, представлявано от управителя Катя Зидлер. Имейл: info@hausmeisterservice-siedler.de, телефон: +49 152 317 67 316.',
  '2. Hosting': '2. Хостинг',
  'Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet. Beim Aufruf werden technisch notwendige Daten (IP-Adresse, Datum, Uhrzeit, aufgerufene Seite, Browser) in Server-Logfiles verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (sicherer und stabiler Betrieb). Vercel ist unter dem EU-US Data Privacy Framework zertifiziert.':
    'Сайтът се хоства от Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, САЩ. При посещение технически необходими данни (IP адрес, дата, час, отворена страница, браузър) се обработват в сървърни логове. Правно основание е чл. 6, ал. 1, буква е) от ОРЗД (сигурна и стабилна работа). Vercel е сертифициран по EU-US Data Privacy Framework.',
  '3. Kontakt- und Anfrageformulare': '3. Форми за контакт и запитвания',
  'Wenn Sie uns über ein Formular (allgemeine Anfrage, Zählerablesung, Gravur, Kostenrechner, Bewerbung) kontaktieren, verarbeiten wir die von Ihnen angegebenen Daten einschließlich hochgeladener Fotos oder Dokumente zur Bearbeitung Ihrer Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Die Übermittlung erfolgt per E-Mail über den Dienstleister Resend (Resend Inc., USA). Wir löschen die Daten, sobald sie für die Bearbeitung nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungsfristen entgegenstehen.':
    'Когато се свържете с нас чрез форма (общо запитване, отчитане на уреди, гравиране, калкулатор, кандидатура), обработваме посочените от Вас данни, включително качени снимки или документи, за да обработим запитването. Правно основание е чл. 6, ал. 1, буква б) от ОРЗД (преддоговорни мерки), съответно чл. 6, ал. 1, буква а) от ОРЗД (съгласие). Предаването става по имейл чрез доставчика Resend (Resend Inc., САЩ). Изтриваме данните, щом вече не са нужни и няма законови срокове за съхранение.',
  'Auf Wunsch senden wir eine Kopie Ihrer Anfrage unverschlüsselt an Ihre E-Mail-Adresse. Unverschlüsselte E-Mails können auf dem Übertragungsweg von Dritten eingesehen werden.': 'При желание изпращаме копие от запитването некриптирано на Вашия имейл. Некриптираните имейли могат да бъдат прочетени от трети лица по време на пренос.',
  '4. Bewerbungen': '4. Кандидатури',
  'Bewerbungsunterlagen verarbeiten wir ausschließlich zur Durchführung des Bewerbungsverfahrens (§ 26 BDSG, Art. 88 DSGVO). Bei einer Absage löschen wir die Unterlagen spätestens sechs Monate nach Abschluss des Verfahrens.': 'Документите от кандидатури обработваме единствено за процедурата по подбор (§ 26 BDSG, чл. 88 ОРЗД). При отказ ги изтриваме най-късно шест месеца след края на процедурата.',
  '5. Lokale Speicherung im Browser': '5. Локално съхранение в браузъра',
  'Nur wenn Sie im Formular „Zählerablesung“ bei „Adressdaten speichern“ „Ja“ wählen, speichern wir Name und Adresse im lokalen Speicher Ihres Browsers (localStorage), damit Sie diese beim nächsten Mal nicht erneut eingeben müssen. Die Daten verlassen dabei Ihr Gerät nicht und können jederzeit über die Browsereinstellungen gelöscht werden.':
    'Само ако във формата „Отчитане на уреди“ изберете „Да“ при „Запазване на адреса“, запазваме име и адрес в локалната памет на браузъра (localStorage), за да не ги въвеждате отново. Данните не напускат устройството Ви и могат да се изтрият по всяко време от настройките на браузъра. Изборът на език също се пази само на Вашето устройство.',
  '6. Externe Inhalte': '6. Външно съдържание', 'Für Schriftarten nutzen wir Google Fonts (Google Ireland Ltd.). Dabei wird Ihre IP-Adresse an Google übermittelt.': 'За шрифтовете използваме Google Fonts (Google Ireland Ltd.). При това IP адресът Ви се предава на Google.',
  'Empfehlung vor Livegang: Schriften lokal einbinden.': 'Препоръка преди пускане: шрифтовете да се заредят локално.', 'Die 3D-Bibliothek three.js wird von unserem eigenen Server geladen.': '3D библиотеката three.js се зарежда от нашия собствен сървър.',
  '7. WhatsApp, Telefon, Social Media': '7. WhatsApp, телефон, социални мрежи', 'Die Kontakt-Buttons sind einfache Links. Erst beim Anklicken werden Sie zum jeweiligen Anbieter (z. B. WhatsApp/Meta) weitergeleitet, dessen Datenschutzbestimmungen dann gelten.': 'Бутоните за контакт са обикновени връзки. Едва при клик се пренасочвате към съответния доставчик (напр. WhatsApp/Meta), чиито правила за поверителност важат тогава.',
  '8. Ihre Rechte': '8. Вашите права',
  'Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch sowie das Recht, eine erteilte Einwilligung jederzeit zu widerrufen. Zudem können Sie sich beim Landesbeauftragten für den Datenschutz und die Informationsfreiheit Baden-Württemberg beschweren.':
    'Имате право на достъп, коригиране, изтриване, ограничаване на обработването, преносимост на данните и възражение, както и да оттеглите дадено съгласие по всяко време. Можете да подадете жалба и до Комисаря по защита на данните и свободата на информацията на Баден-Вюртемберг.',
};

// Muster für Texte mit Zahlen
const RULES = [
  [/^(\d+) Wohneinheiten$/, '$1 апартамента'], [/^(\d+) Etagen × (\d+) TH$/, '$1 етажа × $2 вх.'], [/^(\d+) Etagen$/, '$1 етажа'],
  [/^(\d+) Stk\.$/, '$1 бр.'], [/^(\d+) Std\.$/, '$1 ч.'], [/^(\d+) m² Gehweg$/, '$1 m² тротоар'],
  [/^Hierher ziehen oder klicken · max\. (\d+) Dateien$/, 'Пуснете тук или кликнете · макс. $1 файла'],
  [/^© (\d{4}) (.+) · Alle Rechte vorbehalten$/, '© $1 $2 · Всички права запазени'],
];

export function t(s) {
  if (lang !== 'bg' || !s) return s;
  const k = s.trim();
  if (k in BG) return s.replace(k, BG[k]);
  for (const [re, rep] of RULES) if (re.test(k)) return s.replace(k, k.replace(re, rep));
  if (k.includes(' · ')) { const parts = k.split(' · '); const tr = parts.map((p) => t(p)); if (tr.some((x, i) => x !== parts[i])) return s.replace(k, tr.join(' · ')); }
  return s;
}

function translateNode(root) {
  if (root.nodeType === 3) { const p = root.parentElement; if (p && !['SCRIPT', 'STYLE'].includes(p.tagName)) {
    if (p.tagName === 'OPTION' && !p.hasAttribute('value')) p.setAttribute('value', root.nodeValue);
    const n = t(root.nodeValue); if (n !== root.nodeValue) root.nodeValue = n; } return; }
  if (root.nodeType !== 1) return;
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const list = []; let n; while ((n = w.nextNode())) list.push(n);
  list.forEach(translateNode);
  [root, ...root.querySelectorAll('[placeholder],[aria-label],img[alt]')].forEach((e) => ['placeholder', 'aria-label', 'alt'].forEach((a) => {
    const v = e.getAttribute?.(a); if (v) { const x = t(v); if (x !== v) e.setAttribute(a, x); } }));
}

export function initI18n() {
  // Umschalter in den Header
  const head = document.querySelector('.site-header');
  if (head && !head.querySelector('.lang')) {
    const sw = document.createElement('div'); sw.className = 'lang';
    sw.innerHTML = LANGS.map((l) => `<button data-l="${l}" class="${l === lang ? 'on' : ''}">${l.toUpperCase()}</button>`).join('');
    head.querySelector('.burger').before(sw);
    sw.querySelectorAll('button').forEach((b) => (b.onclick = () => b.dataset.l !== lang && setLang(b.dataset.l)));
  }
  if (lang !== 'bg') return;
  document.documentElement.lang = 'bg';
  document.title = t(document.title);
  const md = document.querySelector('meta[name=description]'); if (md) md.content = t(md.content);
  translateNode(document.body);
  if (document.querySelector('.legal')) {
    document.querySelector('.legal h1')?.insertAdjacentHTML('afterend', '<p class="todo">Преводът е за информация. Правно валидна е немската версия.</p>');
  }
  new MutationObserver((ms) => ms.forEach((m) => {
    if (m.type === 'characterData') translateNode(m.target);
    m.addedNodes.forEach(translateNode);
  })).observe(document.body, { childList: true, subtree: true, characterData: true });
}
