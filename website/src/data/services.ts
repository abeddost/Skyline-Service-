import { flags } from '../config';

export interface Service {
  key: string;
  slug: string;
  name: string;
  tagline: string;
  icon: string;
  title: string;
  h1: string;
  description: string;
  intro: string[];
  scope: { title: string; text: string }[];
  sections: { h2: string; paragraphs: string[] }[];
  forWhom: { privat: string; gewerbe: string; verwaltung: string };
  faqs: { q: string; a: string }[];
  image: string;
  imageAlt: string;
  image2: string;
  image2Alt: string;
  slider: string;
  sliderAlt: string;
  related: string[];
  serviceType: string;
  enabled: boolean;
  /** Key of the hero frame set in public/assets/hero (<key>-desktop/, <key>-mobile/). */
  video?: string;
  videoAlt?: string;
  /** Optional comparison table. The first column holds the row labels. */
  compare?: { title: string; intro?: string; head: string[]; rows: string[][] };
}

const all: Service[] = [
  {
    key: 'gebaeude',
    slug: 'gebaeudereinigung-frankfurt',
    name: 'Gebäudereinigung',
    tagline: 'Zuverlässig, gründlich, professionell',
    icon: 'building',
    title: 'Gebäudereinigung Frankfurt – Unterhalts- & Grundreinigung',
    h1: 'Gebäudereinigung in Frankfurt am Main',
    description:
      'Gebäudereinigung in Frankfurt: Unterhaltsreinigung und Grundreinigung für Wohn- und Geschäftshäuser. Zuverlässig und pünktlich. Jetzt Angebot anfragen.',
    intro: [
      'Ein gepflegtes Gebäude behält seinen Wert und macht jeden Tag einen guten Eindruck – auf Bewohner, Mitarbeiter und Besucher.',
      'Als Reinigungsfirma aus Frankfurt übernehmen wir die regelmäßige Unterhaltsreinigung ebenso wie die gründliche Grundreinigung, abgestimmt auf Ihr Objekt.',
    ],
    scope: [
      {
        title: 'Unterhaltsreinigung',
        text: 'Die laufende Pflege Ihres Gebäudes in einem festen Rhythmus: Böden, Eingangsbereiche, Flure, Sanitärräume, Türen, Griffe und Oberflächen.',
      },
      {
        title: 'Grundreinigung',
        text: 'Die intensive Reinigung, wenn die normale Pflege nicht mehr ausreicht – zum Beispiel vor einem Einzug, nach einem Mieterwechsel oder als Start in eine regelmäßige Betreuung.',
      },
      {
        title: 'Eingänge und Gemeinschaftsflächen',
        text: 'Foyers, Flure, Aufzüge, Briefkastenanlagen und Glastüren, also alle Bereiche, die jeder zuerst sieht.',
      },
      {
        title: 'Sanitär- und Nebenräume',
        text: 'Hygienische Reinigung von WCs, Waschräumen, Teeküchen, Kellergängen und Müllräumen.',
      },
      {
        title: 'Glas- und Rahmenflächen',
        text: 'Glastüren, Eingangsverglasungen und gut erreichbare Fensterflächen werden streifenfrei gereinigt.',
      },
    ],
    sections: [
      {
        h2: 'Unterhaltsreinigung in Frankfurt: Sauberkeit mit System',
        paragraphs: [
          'Die Unterhaltsreinigung ist das Fundament jeder Gebäudepflege. Wir legen gemeinsam mit Ihnen fest, welche Flächen wie oft gereinigt werden, und halten diesen Plan zuverlässig ein. So sieht Ihr Objekt nicht nur am Tag nach der Reinigung gut aus, sondern dauerhaft.',
          'Ob Mehrfamilienhaus im Nordend, Geschäftshaus in der Innenstadt oder Gewerbeobjekt im Osten der Stadt: Jedes Gebäude wird anders genutzt. Deshalb gibt es bei uns keinen Standardplan von der Stange. Sie sagen uns, worauf es Ihnen ankommt, und wir richten den Leistungsumfang danach aus.',
        ],
      },
      {
        h2: 'Grundreinigung: der gründliche Neustart',
        paragraphs: [
          'Mit der Zeit setzen sich Schmutz, Kalk und Ablagerungen an Stellen fest, die bei der laufenden Pflege nicht jedes Mal erreicht werden. Bei einer Grundreinigung nehmen wir uns genau diese Bereiche vor: Bodenbeläge, Fugen, Sockelleisten, Heizkörper, Türrahmen und schwer zugängliche Ecken.',
          'Eine Grundreinigung lohnt sich vor der Übergabe einer Immobilie, nach längeren Leerständen oder wenn Sie ein Objekt neu in die regelmäßige Reinigung geben. Danach ist die Unterhaltsreinigung deutlich einfacher und das Ergebnis hält länger.',
        ],
      },
      {
        h2: 'Reinigungsfirma in Frankfurt mit umweltfreundlichen Mitteln',
        paragraphs: [
          'Wir arbeiten mit umweltfreundlichen Reinigungsmitteln. Das schont die Oberflächen Ihres Gebäudes und ist angenehm für alle, die sich täglich darin aufhalten.',
          'Dazu kommt, was eine gute Putzfirma ausmacht: Wir kommen zur vereinbarten Zeit, arbeiten gründlich und Sie haben einen festen Ansprechpartner, den Sie direkt per Telefon oder WhatsApp erreichen.',
        ],
      },
    ],
    forWhom: {
      privat:
        'Eigentümer und Vermieter, die ihr Haus in gutem Zustand halten möchten, ohne sich selbst um die Reinigung zu kümmern.',
      gewerbe:
        'Unternehmen, Praxen und Ladengeschäfte, die ihren Kunden und Mitarbeitern täglich saubere Räume bieten wollen.',
      verwaltung:
        'Hausverwaltungen und Eigentümergemeinschaften, die für ihre Objekte in Frankfurt einen verlässlichen Reinigungspartner suchen.',
    },
    faqs: [
      {
        q: 'Was kostet eine Gebäudereinigung in Frankfurt?',
        a: 'Der Preis hängt von Fläche, Zustand und Häufigkeit ab. Sie erhalten von uns ein Festpreisangebot, nachdem wir das Objekt besichtigt oder Fotos von Ihnen gesehen haben. Die Anfrage ist unverbindlich.',
      },
      {
        q: 'Was ist der Unterschied zwischen Unterhaltsreinigung und Grundreinigung?',
        a: 'Die Unterhaltsreinigung ist die regelmäßige Pflege in einem festen Rhythmus. Die Grundreinigung ist eine einmalige, besonders intensive Reinigung, bei der auch hartnäckige Verschmutzungen und schwer erreichbare Stellen bearbeitet werden.',
      },
      {
        q: 'Wie oft sollte ein Gebäude gereinigt werden?',
        a: 'Das richtet sich nach der Nutzung. Ein stark frequentierter Eingangsbereich braucht mehr Pflege als ein ruhiges Wohnhaus. Wir schlagen Ihnen einen passenden Rhythmus vor, den Sie jederzeit anpassen können.',
      },
      {
        q: 'Bringen Sie Reinigungsmittel und Geräte mit?',
        a: 'Ja. Wir bringen alles mit, was für die Reinigung nötig ist, und verwenden umweltfreundliche Reinigungsmittel.',
      },
      {
        q: 'Reinigen Sie auch einzelne Objekte einmalig?',
        a: 'Ja. Neben der regelmäßigen Unterhaltsreinigung übernehmen wir auch einmalige Einsätze, zum Beispiel eine Grundreinigung vor einer Übergabe.',
      },
    ],
    image: 'facade-glass',
    imageAlt: 'Reinigungskraft reinigt die Eingangsverglasung eines Bürogebäudes in Frankfurt',
    image2: 'cleaning-trolley',
    image2Alt: 'Reinigungswagen mit Mopp und Tüchern in einem modernen Flur',
    slider: 'entrance',
    sliderAlt: 'Eingangsbereich eines Gebäudes vor und nach der Reinigung',
    related: ['bueroreinigung-frankfurt', 'treppenhausreinigung-frankfurt', 'sonderreinigung-frankfurt'],
    serviceType: 'Gebäudereinigung',
    enabled: true,
    compare: {
      title: 'Unterhaltsreinigung oder Grundreinigung: der Unterschied',
      intro: 'Beide Leistungen ergänzen sich. Die Tabelle zeigt, wann welche Reinigung sinnvoll ist.',
      head: ['', 'Unterhaltsreinigung', 'Grundreinigung'],
      rows: [
        ['Wann', 'Regelmäßig in einem festen Rhythmus', 'Einmalig, wenn die normale Pflege nicht mehr ausreicht'],
        [
          'Typischer Anlass',
          'Laufende Pflege von Wohn- und Geschäftshäusern',
          'Vor einem Einzug, nach einem Mieterwechsel, nach längerem Leerstand oder als Start in die regelmäßige Betreuung',
        ],
        [
          'Was gereinigt wird',
          'Böden, Eingangsbereiche, Flure, Sanitärräume, Türen, Griffe und Oberflächen',
          'Zusätzlich Bodenbeläge, Fugen, Sockelleisten, Heizkörper, Türrahmen und schwer zugängliche Ecken',
        ],
        ['Ergebnis', 'Das Gebäude sieht dauerhaft gepflegt aus', 'Ein gründlicher Neustart, nach dem die laufende Pflege einfacher ist'],
      ],
    },
  },
  {
    key: 'buero',
    slug: 'bueroreinigung-frankfurt',
    name: 'Büroreinigung',
    tagline: 'Saubere Arbeitsplätze für mehr Erfolg',
    icon: 'chair',
    title: 'Büroreinigung Frankfurt – saubere Arbeitsplätze | Mainblick',
    h1: 'Büroreinigung in Frankfurt am Main',
    description:
      'Büroreinigung in Frankfurt: saubere Arbeitsplätze, Küchen und Sanitärräume im festen Rhythmus. Zuverlässig, pünktlich, umweltfreundlich. Jetzt anfragen.',
    intro: [
      'In einem sauberen Büro arbeitet es sich konzentrierter, und Kunden merken beim ersten Schritt durch die Tür, wie ein Unternehmen mit Details umgeht.',
      'Wir reinigen Büros in Frankfurt regelmäßig und gründlich, zu Zeiten, die Ihren Betrieb nicht stören.',
    ],
    scope: [
      {
        title: 'Arbeitsplätze',
        text: 'Schreibtische, Ablagen, Telefone und Bildschirmumgebungen werden staubfrei gehalten, ohne dass Unterlagen verrutschen.',
      },
      {
        title: 'Böden',
        text: 'Saugen und Wischen aller Bodenbeläge, von Teppich über Linoleum bis zu Stein und Parkett.',
      },
      {
        title: 'Teeküchen und Pausenräume',
        text: 'Arbeitsflächen, Spülen, Griffe und Geräteoberflächen werden hygienisch gereinigt.',
      },
      {
        title: 'Sanitärräume',
        text: 'Gründliche Reinigung von WCs und Waschbecken sowie das Auffüllen von Verbrauchsmaterial nach Absprache.',
      },
      {
        title: 'Besprechungsräume und Empfang',
        text: 'Glastische, Türen, Empfangstheken und alle Flächen, die Ihre Besucher sehen und anfassen.',
      },
      {
        title: 'Abfall',
        text: 'Leeren der Papierkörbe und Abfallbehälter mit der bei Ihnen üblichen Trennung.',
      },
    ],
    sections: [
      {
        h2: 'Unterhaltsreinigung für Büros: ein Plan, der zu Ihrem Alltag passt',
        paragraphs: [
          'Manche Büros brauchen eine tägliche Reinigung, anderen reicht ein Termin pro Woche. Wir besprechen mit Ihnen, wie Ihre Räume genutzt werden, und erstellen daraus einen Reinigungsplan mit klaren Aufgaben für jeden Termin.',
          'Die Reinigungszeiten legen wir gemeinsam fest. Viele Unternehmen bevorzugen die frühen Morgenstunden oder den Abend, damit tagsüber niemand beim Arbeiten gestört wird.',
        ],
      },
      {
        h2: 'Mehr als nur wischen: worauf wir im Büro achten',
        paragraphs: [
          'Im Büro sind es oft die Kleinigkeiten, die auffallen: Fingerabdrücke auf der Glastür, Ränder auf dem Besprechungstisch, Krümel in der Teeküche. Genau diese Stellen prüfen wir bei jedem Termin.',
          'Besonders wichtig sind die Flächen, die viele Hände berühren. Türgriffe, Lichtschalter, Armaturen und Küchengeräte reinigen wir deshalb bei jedem Einsatz mit.',
        ],
      },
      {
        h2: 'Grundreinigung im Büro',
        paragraphs: [
          'Zusätzlich zur laufenden Pflege bieten wir die Grundreinigung an. Sie ist sinnvoll beim Einzug in neue Büroräume, nach einem Umbau oder einmal im Jahr als gründliche Auffrischung.',
          'Dabei werden auch Bereiche gereinigt, für die im normalen Rhythmus keine Zeit ist: Heizkörper, Sockelleisten, Fensterbänke, Schrankoberseiten und stark beanspruchte Böden.',
        ],
      },
    ],
    forWhom: {
      privat:
        'Selbstständige und Freiberufler mit Arbeitszimmer oder kleinem Büro, die ihre Zeit lieber für Kunden nutzen als für den Wischmopp.',
      gewerbe:
        'Kanzleien, Agenturen, Praxen und Unternehmen jeder Größe, die einen festen Rhythmus und gleichbleibende Qualität erwarten.',
      verwaltung:
        'Verwalter von Bürogebäuden, die Gemeinschaftsflächen und einzelne Mieteinheiten aus einer Hand reinigen lassen möchten.',
    },
    faqs: [
      {
        q: 'Was kostet eine Büroreinigung in Frankfurt?',
        a: 'Das hängt von der Fläche, der Zahl der Arbeitsplätze und der Häufigkeit ab. Nach einer kurzen Besichtigung oder anhand Ihrer Fotos erhalten Sie ein Festpreisangebot.',
      },
      {
        q: 'Zu welchen Zeiten reinigen Sie?',
        a: 'Die Zeiten stimmen wir mit Ihnen ab. Ziel ist, dass Ihr Arbeitsalltag durch die Reinigung nicht unterbrochen wird.',
      },
      {
        q: 'Wie oft sollte ein Büro gereinigt werden?',
        a: 'Kleine Büros kommen oft mit einem Termin pro Woche aus. Bei viel Publikumsverkehr oder vielen Arbeitsplätzen empfehlen sich mehrere Termine pro Woche oder eine tägliche Reinigung.',
      },
      {
        q: 'Verwenden Sie umweltfreundliche Reinigungsmittel?',
        a: 'Ja. Wir arbeiten mit umweltfreundlichen Reinigungsmitteln und bringen alle Mittel und Geräte selbst mit.',
      },
      {
        q: 'Können wir den Umfang später ändern?',
        a: 'Ja. Wenn Ihr Team wächst oder sich die Nutzung der Räume ändert, passen wir Rhythmus und Aufgaben an.',
      },
    ],
    image: 'office-hero',
    imageAlt: 'Reinigungskraft wischt einen Glastisch in einem Frankfurter Büro mit Blick auf die Skyline',
    image2: 'handshake-office',
    image2Alt: 'Handschlag zwischen Auftraggeber und Reinigungskraft im Empfangsbereich',
    slider: 'office-kitchen',
    sliderAlt: 'Büroküche vor und nach der Reinigung',
    related: ['gebaeudereinigung-frankfurt', 'treppenhausreinigung-frankfurt', 'sonderreinigung-frankfurt'],
    serviceType: 'Büroreinigung',
    enabled: true,
    video: 'buero',
    videoAlt: 'Büro mit Blick auf die Frankfurter Skyline vor und nach der Reinigung',
    compare: {
      title: 'Unterhaltsreinigung oder Grundreinigung im Büro',
      intro: 'Die meisten Büros brauchen beides: die laufende Pflege und ab und zu eine gründliche Auffrischung.',
      head: ['', 'Unterhaltsreinigung', 'Grundreinigung'],
      rows: [
        ['Wann', 'Täglich, mehrmals pro Woche oder einmal pro Woche', 'Einmalig, zum Beispiel einmal im Jahr'],
        [
          'Typischer Anlass',
          'Der laufende Bürobetrieb',
          'Einzug in neue Büroräume, nach einem Umbau oder als jährliche Auffrischung',
        ],
        [
          'Was gereinigt wird',
          'Arbeitsplätze, Böden, Teeküche, Sanitärräume, Besprechungsräume, Empfang und Abfall',
          'Zusätzlich Heizkörper, Sockelleisten, Fensterbänke, Schrankoberseiten und stark beanspruchte Böden',
        ],
        ['Reinigungszeiten', 'Nach Absprache, oft früh morgens oder abends', 'Nach Absprache'],
      ],
    },
  },
  {
    key: 'treppenhaus',
    slug: 'treppenhausreinigung-frankfurt',
    name: 'Treppenhausreinigung',
    tagline: 'Ein gepflegter erster Eindruck',
    icon: 'stairs',
    title: 'Treppenhausreinigung Frankfurt – fester Rhythmus | Mainblick',
    h1: 'Treppenhausreinigung in Frankfurt am Main',
    description:
      'Treppenhausreinigung in Frankfurt für Hausverwaltungen, WEGs und Vermieter. Fester Rhythmus, gründliche Arbeit. Jetzt unverbindlich anfragen.',
    intro: [
      'Das Treppenhaus ist die Visitenkarte eines Hauses: Jeder Bewohner und jeder Gast geht täglich hindurch.',
      'Wir übernehmen die Treppenhausreinigung in Frankfurt im festen Rhythmus, damit es in Ihrem Haus keine Diskussionen mehr über den Putzplan gibt.',
    ],
    scope: [
      {
        title: 'Treppen und Podeste',
        text: 'Kehren und feuchtes Wischen aller Stufen und Absätze, vom Dachgeschoss bis zum Keller.',
      },
      {
        title: 'Geländer und Handläufe',
        text: 'Handläufe werden bei jedem Termin abgewischt, Geländerstäbe regelmäßig entstaubt.',
      },
      {
        title: 'Eingangsbereich',
        text: 'Haustür, Glasflächen, Briefkastenanlage, Klingeltableau und Fußmatte.',
      },
      {
        title: 'Fenster und Fensterbänke',
        text: 'Fensterbänke im Treppenhaus bei jedem Termin, Treppenhausfenster nach vereinbartem Turnus.',
      },
      {
        title: 'Aufzug und Kellerabgang',
        text: 'Aufzugskabine, Spiegel und Bedientafeln sowie der Zugang zu Keller und Waschküche.',
      },
    ],
    sections: [
      {
        h2: 'Treppenhausreinigung in Frankfurt: vom Altbau bis zum Neubau',
        paragraphs: [
          'Frankfurt hat viele Gesichter. Ein Gründerzeithaus mit Terrazzostufen und Holzhandlauf braucht eine andere Pflege als ein Neubau mit Feinsteinzeug und Edelstahlgeländer. Wir wählen Mittel und Methode passend zum Material, damit empfindliche Beläge lange schön bleiben.',
          'Vor dem ersten Termin sehen wir uns das Haus an oder Sie schicken uns Fotos. So wissen wir, wie viele Etagen und Parteien es gibt, ob ein Aufzug vorhanden ist und wo der Wasseranschluss liegt.',
        ],
      },
      {
        h2: 'Ein fester Rhythmus statt Kehrwoche',
        paragraphs: [
          'Die Kehrwoche sorgt in vielen Häusern für Ärger: Der eine putzt gründlich, der andere gar nicht. Mit einer festen Treppenhausreinigung ist das Thema erledigt. Wir kommen im vereinbarten Rhythmus, zum Beispiel wöchentlich oder alle zwei Wochen, und alle Flächen werden gleich behandelt.',
          'Für Hausverwaltungen und Eigentümergemeinschaften bedeutet das weniger Beschwerden und ein Haus, das bei Besichtigungen überzeugt.',
        ],
      },
      {
        h2: 'Gründlich auch dort, wo man nicht sofort hinsieht',
        paragraphs: [
          'Ein Treppenhaus wirkt erst dann wirklich sauber, wenn auch die Ecken stimmen: die Kante unter dem Geländer, die Sockelleiste, der Bereich hinter der Haustür. Auf diese Stellen achten wir bei jedem Durchgang.',
          'Nach Herbstlaub, Streusalz im Winter oder einer Renovierung im Haus reicht die normale Runde manchmal nicht aus. Dann bieten wir zusätzlich eine Grundreinigung des Treppenhauses an.',
        ],
      },
    ],
    forWhom: {
      privat:
        'Vermieter und Eigentümer von Mehrfamilienhäusern, die ihren Mietern ein gepflegtes Haus bieten und die Kehrwoche abschaffen möchten.',
      gewerbe:
        'Betreiber von Geschäfts- und Praxishäusern, in denen täglich Kunden und Patienten durch das Treppenhaus gehen.',
      verwaltung:
        'Hausverwaltungen und WEGs, die für mehrere Objekte in Frankfurt einen zuverlässigen Partner mit festem Rhythmus brauchen.',
    },
    faqs: [
      {
        q: 'Was kostet eine Treppenhausreinigung in Frankfurt?',
        a: 'Der Preis richtet sich nach der Zahl der Etagen und Parteien, dem Bodenbelag und dem Rhythmus. Sie erhalten ein Festpreisangebot nach Besichtigung oder anhand von Fotos.',
      },
      {
        q: 'Wie oft wird das Treppenhaus gereinigt?',
        a: 'Üblich ist ein Termin pro Woche oder alle zwei Wochen. Den Rhythmus legen Sie fest, wir beraten Sie dabei.',
      },
      {
        q: 'Brauchen Sie einen Wasseranschluss im Haus?',
        a: 'Ein Wasseranschluss im Haus ist hilfreich, zum Beispiel im Keller oder in der Waschküche. Wo das Wasser herkommt, klären wir vor dem ersten Termin.',
      },
      {
        q: 'Reinigen Sie auch die Treppenhausfenster?',
        a: 'Ja. Fensterbänke gehören zu jedem Termin, die Fenster selbst reinigen wir nach einem vereinbarten Turnus.',
      },
      {
        q: 'Können Hausverwaltungen mehrere Objekte beauftragen?',
        a: 'Ja. Wir betreuen gern mehrere Häuser und stimmen Termine und Umfang für jedes Objekt einzeln mit Ihnen ab.',
      },
    ],
    image: 'stairwell',
    imageAlt: 'Frisch gereinigtes Treppenhaus eines Frankfurter Altbaus mit Terrazzostufen',
    image2: 'stairwell-portrait',
    image2Alt: 'Reinigungskraft wischt den Flur eines Altbau-Treppenhauses',
    slider: 'stairwell',
    sliderAlt: 'Treppenhaus vor und nach der Reinigung',
    related: ['gebaeudereinigung-frankfurt', 'bueroreinigung-frankfurt', 'entruempelung-frankfurt'],
    serviceType: 'Treppenhausreinigung',
    enabled: true,
    video: 'treppenhaus',
    videoAlt: 'Treppenhaus eines Frankfurter Altbaus vor und nach der Reinigung',
    compare: {
      title: 'Was wird wie oft gereinigt?',
      intro: 'Den Rhythmus legen Sie fest, üblich ist ein Termin pro Woche oder alle zwei Wochen.',
      head: ['Bereich', 'Bei jedem Termin', 'Nach vereinbartem Turnus'],
      rows: [
        ['Treppen und Podeste', 'Kehren und feucht wischen, vom Dachgeschoss bis zum Keller', '–'],
        ['Geländer', 'Handläufe abwischen', 'Geländerstäbe entstauben'],
        ['Fenster', 'Fensterbänke reinigen', 'Treppenhausfenster reinigen'],
        ['Ganzes Treppenhaus', '–', 'Grundreinigung, zum Beispiel nach Herbstlaub, Streusalz oder einer Renovierung'],
      ],
    },
  },
  {
    key: 'umzug',
    slug: 'umzug-frankfurt',
    name: 'Umzugsservice',
    tagline: 'Sicher, schnell und stressfrei',
    icon: 'truck',
    title: 'Umzug Frankfurt – Umzugsunternehmen für Privat & Firmen',
    h1: 'Umzug in Frankfurt: Privat- und Firmenumzüge',
    description:
      'Umzug in Frankfurt: Privatumzüge, Firmenumzüge, Transport und Möbelmontage aus einer Hand. Sicher, schnell und stressfrei. Jetzt unverbindlich anfragen.',
    intro: [
      'Ein Umzug bedeutet viel Organisation, schweres Tragen und meistens zu wenig Zeit.',
      'Wir nehmen Ihnen diese Arbeit ab: vom Transport über das Tragen bis zum Aufbau Ihrer Möbel in der neuen Wohnung oder im neuen Büro.',
    ],
    scope: [
      {
        title: 'Privatumzüge',
        text: 'Vom Einzimmerapartment bis zum Familienhaus: Wir tragen, verladen und transportieren Ihren Hausrat sicher an die neue Adresse.',
      },
      {
        title: 'Firmenumzüge',
        text: 'Büros, Praxen und Ladengeschäfte ziehen mit uns so um, dass der Betrieb schnell wieder läuft.',
      },
      {
        title: 'Transportservice',
        text: 'Einzelne Möbelstücke, sperrige Geräte oder eine Lieferung vom Möbelhaus: Wir bringen es von A nach B.',
      },
      {
        title: 'Möbelmontage',
        text: 'Abbau in der alten Wohnung und Aufbau in der neuen. Schränke, Betten, Regale und Küchenmöbel stehen am Ende dort, wo Sie sie haben möchten.',
      },
    ],
    sections: [
      {
        h2: 'Umzugsunternehmen in Frankfurt: gut geplant ist halb umgezogen',
        paragraphs: [
          'Jeder Umzug beginnt mit ein paar einfachen Fragen: Wie viele Zimmer? Welche Etage, gibt es einen Aufzug? Wie weit ist der Weg von der Haustür zum Fahrzeug? Je genauer wir das vorher wissen, desto reibungsloser läuft der Umzugstag.',
          'In Frankfurt spielt auch das Parken eine Rolle. In engen Straßen in Bornheim, Sachsenhausen oder im Nordend kann eine Halteverbotszone vor dem Haus viel Zeit sparen. Sprechen Sie uns bei der Anfrage darauf an, dann planen wir das gemeinsam ein.',
        ],
      },
      {
        h2: 'Sorgfältig tragen, sicher transportieren',
        paragraphs: [
          'Ihre Möbel sollen so ankommen, wie sie losgefahren sind. Deshalb werden empfindliche Stücke geschützt, schwere Teile zu zweit getragen und alles im Fahrzeug so verladen, dass unterwegs nichts verrutscht.',
          'Am Zielort stellen wir Kartons und Möbel direkt in die richtigen Räume. Wenn Sie Ihre Kartons vorher nach Zimmern beschriften, geht das besonders schnell.',
        ],
      },
      {
        h2: 'Möbelmontage: abbauen, transportieren, aufbauen',
        paragraphs: [
          'Der Kleiderschrank passt selten am Stück durchs Treppenhaus. Wir bauen Ihre Möbel fachgerecht ab, transportieren die Teile und bauen sie in der neuen Wohnung wieder auf.',
          'Die Möbelmontage können Sie auch ohne Umzug buchen, etwa wenn neue Möbel geliefert wurden und der Aufbau noch aussteht.',
        ],
      },
      {
        h2: 'Umzug und Reinigung aus einer Hand',
        paragraphs: [
          'Nach dem Auszug steht oft noch die Übergabe der alten Wohnung an. Weil wir auch Reinigung und Entrümpelung anbieten, können Sie alles zusammen beauftragen: Wir räumen aus, was nicht mit umzieht, und reinigen die Räume für die Übergabe.',
        ],
      },
    ],
    forWhom: {
      privat:
        'Singles, Paare und Familien, die innerhalb Frankfurts oder in die Umgebung umziehen und sich einen entspannten Umzugstag wünschen.',
      gewerbe:
        'Unternehmen, Praxen und Läden, bei denen der Umzug schnell gehen muss, damit der Betrieb weiterläuft.',
      verwaltung:
        'Verwaltungen und Vermieter, die Möbeltransporte, Räumungen von Mieteinheiten oder den Aufbau von Mobiliar organisieren müssen.',
    },
    faqs: [
      {
        q: 'Was kostet ein Umzug in Frankfurt?',
        a: 'Das hängt vom Umfang, den Etagen, der Entfernung und den gewünschten Zusatzleistungen ab. Sie erhalten ein Festpreisangebot, nachdem wir uns den Umfang angesehen oder Fotos von Ihnen bekommen haben.',
      },
      {
        q: 'Übernehmen Sie auch die Möbelmontage?',
        a: 'Ja. Wir bauen Ihre Möbel ab und in der neuen Wohnung wieder auf. Die Montage ist auch einzeln buchbar.',
      },
      {
        q: 'Brauche ich eine Halteverbotszone?',
        a: 'In vielen Frankfurter Straßen ist sie sinnvoll, weil das Fahrzeug dann direkt vor der Tür stehen kann. Geben Sie bei der Anfrage an, wie die Parksituation ist, dann besprechen wir das.',
      },
      {
        q: 'Machen Sie auch Firmenumzüge?',
        a: 'Ja. Wir übernehmen Büro- und Firmenumzüge einschließlich Abbau und Aufbau der Möbel.',
      },
      {
        q: 'Transportieren Sie auch einzelne Möbelstücke?',
        a: 'Ja. Unser Transportservice eignet sich für einzelne Möbel, sperrige Geräte oder kleinere Lieferungen.',
      },
    ],
    image: 'movers-van',
    imageAlt: 'Zwei Umzugshelfer tragen ein verpacktes Sofa zu einem Transporter in einer Frankfurter Wohnstraße',
    image2: 'furniture-assembly',
    image2Alt: 'Monteur baut mit dem Akkuschrauber einen weißen Kleiderschrank auf',
    slider: 'moving',
    sliderAlt: 'Wohnzimmer am Umzugstag und fertig eingerichtet',
    related: ['entruempelung-frankfurt', 'sonderreinigung-frankfurt', 'gebaeudereinigung-frankfurt'],
    serviceType: 'Umzugsservice',
    enabled: true,
    video: 'umzug',
    videoAlt: 'Wohnzimmer mit Blick auf Frankfurt: erst mit Umzugskartons, dann fertig eingerichtet',
  },
  {
    key: 'entruempelung',
    slug: 'entruempelung-frankfurt',
    name: 'Entrümpelung',
    tagline: 'Platz für Neues',
    icon: 'box',
    title: 'Entrümpelung & Haushaltsauflösung Frankfurt | Mainblick',
    h1: 'Entrümpelung & Haushaltsauflösung in Frankfurt',
    description:
      'Entrümpelung in Frankfurt: Haushaltsauflösung, Keller, Dachboden und Sperrmüll mit fachgerechter Entsorgung. Schnell wieder Platz. Jetzt Angebot anfragen.',
    intro: [
      'Über die Jahre sammelt sich mehr an, als man denkt: im Keller, auf dem Dachboden, in der Garage oder in einer ganzen Wohnung.',
      'Wir räumen aus, tragen alles hinaus und kümmern uns um die fachgerechte Entsorgung, damit Sie wieder Platz für Neues haben.',
    ],
    scope: [
      {
        title: 'Haushaltsauflösung',
        text: 'Komplette Räumung von Wohnungen und Häusern, zum Beispiel nach einem Umzug ins Pflegeheim oder im Erbfall.',
      },
      {
        title: 'Keller und Dachboden',
        text: 'Kellerentrümpelung und Dachbodenräumung, auch wenn der Weg eng und die Treppe steil ist.',
      },
      {
        title: 'Sperrmüllentsorgung',
        text: 'Alte Möbel, Matratzen, Teppiche und sperrige Gegenstände holen wir direkt aus Ihren Räumen ab.',
      },
      {
        title: 'Fachgerechte Entsorgung',
        text: 'Was nicht mehr gebraucht wird, wird sortiert und ordnungsgemäß entsorgt.',
      },
    ],
    sections: [
      {
        h2: 'Haushaltsauflösung in Frankfurt: behutsam und zügig',
        paragraphs: [
          'Eine Haushaltsauflösung ist selten nur eine Frage der Logistik. Oft hängen Erinnerungen an den Dingen, und nicht immer ist Zeit, alles in Ruhe durchzusehen. Wir gehen mit den Räumen und dem, was darin steht, respektvoll um.',
          'Vor Beginn legen Sie fest, was bleiben soll und was weg kann. Danach räumen wir Zimmer für Zimmer und übergeben Ihnen die Räume leer.',
        ],
      },
      {
        h2: 'Kellerentrümpelung und Dachboden: endlich wieder Platz',
        paragraphs: [
          'Keller und Dachböden sind die klassischen Sammelstellen: alte Regale, Farbeimer, Kartons, das Fahrrad von vor zwanzig Jahren. Viele schieben die Räumung lange vor sich her, weil allein das Hinaustragen einen ganzen Samstag kostet.',
          'Wir kommen mit genügend Händen und dem passenden Fahrzeug. Auch in Altbauten mit schmalen Kellertreppen oder Dachböden mit Auszugsleiter finden wir einen Weg.',
        ],
      },
      {
        h2: 'Sperrmüll in Frankfurt entsorgen lassen',
        paragraphs: [
          'Wer Sperrmüll selbst an die Straße stellen muss, braucht Zeit, Kraft und oft eine zweite Person. Wir holen sperrige Gegenstände direkt aus der Wohnung, dem Keller oder vom Dachboden und nehmen sie mit.',
          'Bei der Anfrage genügen ein paar Fotos und eine kurze Beschreibung. So können wir einschätzen, wie viel anfällt und welche Etage es ist.',
        ],
      },
      {
        h2: 'Besenrein übergeben',
        paragraphs: [
          'Nach der Entrümpelung kehren wir die Räume durch. Wenn Sie zusätzlich eine gründliche Reinigung für die Wohnungsübergabe wünschen, übernehmen wir das ebenfalls.',
        ],
      },
    ],
    forWhom: {
      privat:
        'Familien und Angehörige, die eine Wohnung auflösen müssen, und alle, die Keller, Dachboden oder Garage wieder nutzen möchten.',
      gewerbe:
        'Unternehmen, die Lagerräume, Büros oder Ladenflächen räumen, etwa vor einem Umzug oder einer Übergabe.',
      verwaltung:
        'Hausverwaltungen und Vermieter, die zurückgelassene Gegenstände aus Wohnungen, Kellerabteilen oder Gemeinschaftsflächen entfernen lassen müssen.',
    },
    faqs: [
      {
        q: 'Was kostet eine Entrümpelung in Frankfurt?',
        a: 'Der Preis hängt von der Menge, der Etage, den Tragewegen und der Art der Gegenstände ab. Schicken Sie uns Fotos per WhatsApp oder vereinbaren Sie eine Besichtigung, dann erhalten Sie ein Festpreisangebot.',
      },
      {
        q: 'Entsorgen Sie Sperrmüll fachgerecht?',
        a: 'Ja. Wir sortieren, was anfällt, und sorgen für die fachgerechte Entsorgung.',
      },
      {
        q: 'Räumen Sie auch nur einen Keller oder einzelne Räume?',
        a: 'Ja. Wir übernehmen einzelne Kellerabteile, Dachböden oder Zimmer ebenso wie komplette Wohnungen und Häuser.',
      },
      {
        q: 'Muss ich bei der Entrümpelung dabei sein?',
        a: 'Das entscheiden Sie. Wichtig ist, dass vorher klar ist, was bleiben soll und was entsorgt wird, und dass wir Zugang zu den Räumen haben.',
      },
      {
        q: 'Wie werden die Räume übergeben?',
        a: 'Die Räume werden leer und durchgekehrt übergeben. Eine gründliche Reinigung können Sie zusätzlich bei uns beauftragen.',
      },
    ],
    image: 'junk-removal',
    imageAlt: 'Mitarbeiter trägt zwei gefüllte Säcke aus einem geräumten Dachboden',
    image2: 'movers-van',
    image2Alt: 'Zwei Mitarbeiter verladen ein Sofa in einen Transporter',
    slider: 'cellar',
    sliderAlt: 'Kellerraum vor und nach der Entrümpelung',
    related: ['umzug-frankfurt', 'sonderreinigung-frankfurt', 'treppenhausreinigung-frankfurt'],
    serviceType: 'Entrümpelung',
    enabled: true,
    video: 'entruempelung',
    videoAlt: 'Dachboden vor und nach der Entrümpelung',
  },
  {
    key: 'sonder',
    slug: 'sonderreinigung-frankfurt',
    name: 'Sonderreinigung',
    tagline: 'Individuelle Lösungen nach Bedarf',
    icon: 'broom',
    title: 'Sonderreinigung Frankfurt – nach Renovierung, Umzug & mehr',
    h1: 'Sonderreinigung in Frankfurt am Main',
    description:
      'Sonderreinigung in Frankfurt: Reinigung nach Renovierung, Umzug oder besonderen Anlässen. Individuell geplant, gründlich ausgeführt. Jetzt anfragen.',
    intro: [
      'Manche Reinigungsaufgaben passen in keinen festen Plan: der feine Baustaub nach der Renovierung, die Wohnung vor der Übergabe, die Räume nach einer Veranstaltung.',
      'Für solche Fälle gibt es unsere Sonderreinigung in Frankfurt, die wir genau auf Ihre Situation zuschneiden.',
    ],
    scope: [
      {
        title: 'Reinigung nach Renovierung',
        text: 'Baustaub, Farbspritzer und Kleberreste werden von Böden, Fenstern, Rahmen und Heizkörpern entfernt.',
      },
      {
        title: 'Reinigung bei Ein- und Auszug',
        text: 'Gründliche Reinigung leerer Räume vor der Wohnungsübergabe oder vor dem Einzug.',
      },
      {
        title: 'Reinigung nach Entrümpelung',
        text: 'Wenn die Räume leer sind, bringen wir Böden, Türen und Sanitärbereiche wieder in einen sauberen Zustand.',
      },
      {
        title: 'Einmalige Einsätze',
        text: 'Zusätzliche Reinigungen vor oder nach besonderen Anlässen, zum Beispiel Feiern, Besichtigungen oder Eröffnungen.',
      },
      {
        title: 'Ihr besonderer Fall',
        text: 'Sie haben eine Aufgabe, die hier nicht aufgeführt ist? Beschreiben Sie uns kurz, worum es geht, und wir sagen Ihnen, was möglich ist.',
      },
    ],
    sections: [
      {
        h2: 'Wenn die normale Reinigung nicht ausreicht',
        paragraphs: [
          'Eine Sonderreinigung beginnt immer mit einem genauen Blick auf die Aufgabe. Welche Flächen sind betroffen? Um welche Art von Verschmutzung geht es? Bis wann müssen die Räume fertig sein? Aus den Antworten entsteht ein Angebot, das genau diesen Einsatz abdeckt.',
          'So zahlen Sie nur für das, was wirklich nötig ist, und wissen vorher, welches Ergebnis Sie erwarten können.',
        ],
      },
      {
        h2: 'Reinigung nach der Renovierung',
        paragraphs: [
          'Nach Malerarbeiten, einem neuen Boden oder einer Badsanierung liegt feiner Staub in jeder Ritze. Er setzt sich auf Fensterbänken, in Heizkörpern und auf Steckdosen ab und verteilt sich beim ersten Lüften erneut.',
          'Wir entfernen den Staub in der richtigen Reihenfolge von oben nach unten, lösen Farbspritzer und Kleberreste und reinigen Fenster und Rahmen. Danach können Sie einziehen oder die Räume übergeben.',
        ],
      },
      {
        h2: 'Saubere Übergabe bei Ein- und Auszug',
        paragraphs: [
          'Bei der Wohnungsübergabe zählt der Zustand der Räume. Eine gründliche Reinigung von Küche, Bad, Böden, Türen und Fenstern erspart Diskussionen mit dem Vermieter oder dem Nachmieter.',
          'Weil wir auch Umzüge und Entrümpelungen übernehmen, können Sie alle Schritte in einem Auftrag bündeln: ausräumen, transportieren, reinigen.',
        ],
      },
      {
        h2: 'Schonend für Oberflächen und Umwelt',
        paragraphs: [
          'Auch bei hartnäckigen Verschmutzungen achten wir darauf, die Materialien nicht anzugreifen. Wir verwenden umweltfreundliche Reinigungsmittel und passen das Vorgehen an Parkett, Fliesen, Naturstein oder Glas an.',
        ],
      },
    ],
    forWhom: {
      privat:
        'Mieter und Eigentümer nach einer Renovierung, vor einer Wohnungsübergabe oder vor einem besonderen Anlass.',
      gewerbe:
        'Unternehmen, Läden und Praxen nach Umbauarbeiten, vor einer Eröffnung oder nach einer Veranstaltung.',
      verwaltung:
        'Hausverwaltungen und Vermieter, die Wohnungen zwischen zwei Mietverhältnissen wieder in einen vermietbaren Zustand bringen möchten.',
    },
    faqs: [
      {
        q: 'Was zählt zur Sonderreinigung?',
        a: 'Alle Reinigungen, die über die regelmäßige Pflege hinausgehen oder einen besonderen Anlass haben, zum Beispiel nach einer Renovierung, bei Ein- und Auszug oder nach einer Entrümpelung.',
      },
      {
        q: 'Was kostet eine Sonderreinigung in Frankfurt?',
        a: 'Das hängt von Fläche, Art der Verschmutzung und Aufwand ab. Sie erhalten ein Festpreisangebot nach Besichtigung oder anhand von Fotos.',
      },
      {
        q: 'Reinigen Sie nach Handwerkerarbeiten?',
        a: 'Ja. Wir entfernen Baustaub, Farbspritzer und Kleberreste und reinigen Böden, Fenster, Rahmen und Heizkörper.',
      },
      {
        q: 'Kann ich die Reinigung mit einem Umzug oder einer Entrümpelung verbinden?',
        a: 'Ja. Viele Kunden beauftragen Räumung, Transport und Reinigung zusammen. Das spart Abstimmung und Zeit.',
      },
      {
        q: 'Meine Aufgabe steht nicht auf der Liste. Kann ich trotzdem anfragen?',
        a: 'Ja, gern. Beschreiben Sie uns kurz per WhatsApp oder Telefon, worum es geht. Wir sagen Ihnen offen, ob und wie wir helfen können.',
      },
    ],
    image: 'glove-detail',
    imageAlt: 'Hand im schwarzen Handschuh wischt mit einem Mikrofasertuch über eine Granitfläche',
    image2: 'eco-products',
    image2Alt: 'Umweltfreundliche Reinigungsmittel, Mikrofasertücher und ein Eukalyptuszweig auf Schiefer',
    slider: 'special-cleaning',
    sliderAlt: 'Zimmer nach der Renovierung vor und nach der Reinigung',
    related: ['gebaeudereinigung-frankfurt', 'umzug-frankfurt', 'entruempelung-frankfurt'],
    serviceType: 'Sonderreinigung',
    enabled: true,
  },
];

export const services = all.filter((s) => s.enabled);

// Autoaufbereitung is registered as a trade but not confirmed for the website.
// Add its entry here and switch flags.autoaufbereitung on once the owner agrees.
export const autoaufbereitungEnabled = flags.autoaufbereitung;

export function serviceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
