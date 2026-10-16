import type { CaseStudyData } from "~/types/case-study";

export const roestwerkCaseStudy: CaseStudyData = {
  slug: "roestwerk-1070",
  projectId: "concept-roestwerk",
  indexKicker: {
    de: "06 / THE LAB — INDEPENDENT CONCEPT",
    en: "06 / THE LAB — INDEPENDENT CONCEPT",
  },
  title: "RÖSTWERK 1070",
  headline: {
    de: "Wiener Rösthandwerk, taktile Sensorik und interaktive Extraktion.",
    en: "Viennese specialty roasting, sensory flavor radars, and interactive extraction.",
  },
  subheadline: {
    de: "Ein eigenständiges Marken- und Produkt-Showcase für eine Wiener Mikrorösterei: Interaktiver Sensorik-Finder mit Aromen-Radar und dynamischer Brührechner für V60, Aeropress und Siebträger.",
    en: "An independent brand and digital product showcase for a Vienna specialty micro-roastery: Interactive flavor radar and dynamic brew calculator for V60, Aeropress, and espresso.",
  },
  year: "2026",
  client: {
    de: "RÖSTWERK 1070 (Eigenständiges Konzept)",
    en: "RÖSTWERK 1070 (Independent Concept)",
  },
  role: {
    de: "Brand Identity, UX-Konzept & Frontend-Engineering",
    en: "Brand Identity, UX Concept & Frontend Engineering",
  },
  scope: {
    de: "Brand Showcase · Flavor Radar · Interactive Brew Calculator · Responsive Commerce",
    en: "Brand Showcase · Flavor Radar · Interactive Brew Calculator · Responsive Commerce",
  },
  statusBadge: {
    de: "The Lab · Eigenständiges Konzept",
    en: "The Lab · Independent Concept",
  },
  statusUpcoming: false,
  liveUrl: "https://github.com/King-ElWebo/Kaffeer-sterei-Demo",

  // Chapter 01 — Hero
  heroImage: {
    src: "/assets/projects/roestwerk/roestwerk-desktop-authentic.png",
    alt: {
      de: "RÖSTWERK 1070 — Marken-Showcase einer Wiener Mikrorösterei",
      en: "RÖSTWERK 1070 — Brand showcase of a Viennese specialty micro-roastery",
    },
    caption: {
      de: "Warme Rösttöne, haptische Typografie und kuratierte Bohnenprofile aus Wien Neubau.",
      en: "Warm roastery tones, tactile typography, and curated bean profiles from Vienna Neubau.",
    },
  },

  // Chapter 02 — Signature Flavor Radar & Sensory Finder (AdminCms slot used for core engine)
  adminCms: {
    kicker: {
      de: "02 / SENSORIK-FINDER: DAS GESCHMACKS-RADAR",
      en: "02 / SENSORY FINDER: THE FLAVOR RADAR",
    },
    heading: {
      de: "Geschmack wird sichtbar: Sensorik jenseits von elitärem Fachjargon.",
      en: "Flavor made visible: Sensory discovery beyond gatekept jargon.",
    },
    subheadline: {
      de: "Vom unverständlichen Cupping-Kauderwelsch zur intuitiven Entdeckung des perfekten Kaffees.",
      en: "Translating complex cupping metrics into an intuitive visual taste-matching experience.",
    },
    narrative: {
      de: "Specialty Coffee schreckt Einsteiger oft ab: Überkomplexe Fachbegriffe verdecken den eigentlichen Genuss. RÖSTWERK 1070 übersetzt sensorische Parameter in ein interaktives 5-Achsen-Radar (Süße, Säure, Körper, Fruchtigkeit, Rösttiefe). Kaffeeliebhaber stellen ihre Präferenzen spielerisch ein und finden sofort die passende Röstung aus Wien Neubau.",
      en: "Specialty coffee often alienates newcomers with inaccessible jargon. RÖSTWERK 1070 translates sensory characteristics into an interactive 5-axis radar graph (Sweetness, Acidity, Body, Fruitiness, Roast Level). Coffee lovers adjust their taste preferences dynamically to discover the ideal roast crafted in Vienna's 7th district.",
    },
    systemLabel: {
      de: "Interaktives Sensorik-Radar · SVG Engine",
      en: "Interactive Flavor Radar · SVG Engine",
    },
    screenshot: {
      src: "/assets/projects/roestwerk/roestwerk-flavor-authentic.png",
      alt: {
        de: "RÖSTWERK 1070 Sensorik-Finder mit interaktivem Aromen-Radar",
        en: "RÖSTWERK 1070 Sensory finder with interactive flavor radar graph",
      },
      caption: {
        de: "Sensorik-Finder (/sensorik): Visuelle 5-Achsen-Profilierung für Säure, Süße, Floralität und Rösttiefe.",
        en: "Sensory finder (/sensorik): Multi-axis visual profiling balancing sweetness, clarity, acidity, and roast depth.",
      },
    },
    pillars: [
      {
        number: "01",
        title: { de: "Visuelles 5-Achsen-Radar", en: "5-Axis Visual Radar" },
        description: {
          de: "Reaktive SVG-Darstellung von Geschmacksprofilen: Säure, Süße, Körper und Nachklang auf einen Blick.",
          en: "Reactive SVG visualization of cupping profiles: Acidity, sweetness, mouthfeel, and finish in one glance.",
        },
      },
      {
        number: "02",
        title: { de: "Herkunfts- & Rösttransparenz", en: "Origin & Craft Transparency" },
        description: {
          de: "Transparente Angaben zu Anbauhöhe, Aufbereitungsart (gewaschen vs. natural) und Röstprofil.",
          en: "Uncompromising clarity regarding farm elevation, processing method (washed vs natural), and batch roast profile.",
        },
      },
      {
        number: "03",
        title: { de: "Geschmacksgeführtes Matching", en: "Taste-Driven Matching" },
        description: {
          de: "Echtzeit-Filterung der Bohnenauswahl basierend auf den vom Nutzer justierten Sensorik-Reglern.",
          en: "Real-time bean selection filtering driven by the specifier's adjusted sensory sliders.",
        },
      },
    ],
  },

  // Chapter 03 & 04 — Dynamic Brew Calculator & Roastery Craft
  visualExperience: {
    kicker: {
      de: "03 / INTERAKTIVE EXTRAKTION: DER BRÜHRECHNER",
      en: "03 / INTERACTIVE EXTRACTION: BREW CALCULATOR",
    },
    heading: {
      de: "Präzision in der Tasse: Grammatur, Mahlgrad & Brühverhältnis.",
      en: "Precision in the cup: Coffee dosage, grind size & brew ratio.",
    },
    subheadline: {
      de: "Ein interaktives Zubereitungswerkzeug für V60, Aeropress, French Press und Siebträger.",
      en: "An interactive extraction tool calibrated for V60, Aeropress, French Press, and espresso.",
    },
    desktopShowcase: {
      src: "/assets/projects/roestwerk/roestwerk-brew-authentic.png",
      alt: {
        de: "RÖSTWERK 1070 Interaktiver Brührechner für Kaffeemenge und Wasser",
        en: "RÖSTWERK 1070 Interactive brew calculator for coffee ratio and water",
      },
      caption: {
        de: "Brührechner (/bruehen): Dynamische Berechnung von Kaffeemehl zu Wasser (z. B. 1:16) und Stoppuhr-Richtzeiten.",
        en: "Brew calculator (/bruehen): Dynamic coffee-to-water ratio adjustments (e.g. 1:16) with timed pouring phases.",
      },
    },
    mobileShowcase: {
      src: "/assets/projects/roestwerk/roestwerk-mobile-authentic.png",
      alt: {
        de: "RÖSTWERK 1070 Mobile Ansicht und Checkout",
        en: "RÖSTWERK 1070 Mobile View and checkout",
      },
      caption: {
        de: "Mobile Kaffeebestellung: Flüssige Navigation und intuitive Bohnenselektion für unterwegs.",
        en: "Mobile coffee curation: Fluid browsing, bean bag size selector, and frictionless checkout flow.",
      },
    },
    lookbookKicker: {
      de: "RÖSTKULTUR IM 7. BEZIRK",
      en: "ROASTING CULTURE IN DISTRICT 7",
    },
    lookbookDescription: {
      de: "Handwerkliche Trommelröstung und traditionelle Kaffeekultur in Wien Neubau.",
      en: "Artisan drum roasting and specialty coffee culture in Vienna Neubau.",
    },
    lookbook: [
      {
        image: "/assets/projects/roestwerk/roesterei-hero.jpg",
        title: { de: "Trommelröstung Neubau", en: "Neubau Drum Roaster" },
        category: { de: "Small-Batch Röstung · 1070 Wien", en: "Small-Batch Roasting · 1070 Vienna" },
      },
      {
        image: "/assets/projects/roestwerk/bruehen-guide.jpg",
        title: { de: "Handfilter-Ritual", en: "Pour-Over Ritual" },
        category: { de: "Extraktion · V60 & Flat Bottom", en: "Extraction · V60 & Flat Bottom" },
      },
    ],
    atmosphereKicker: {
      de: "WIENER KAFFEEHAUSKULTUR NEU INTERPRETIERT",
      en: "VIENNESE COFFEEHOUSE HERITAGE REIMAGINED",
    },
    atmosphereDescription: {
      de: "Warme Erdtöne, editoriale Typografie und Respekt vor dem Rohstoff.",
      en: "Warm umber tones, editorial typography, and reverence for origin cherries.",
    },
    storeAtmosphere: [
      {
        image: "/assets/projects/roestwerk/roesterei-hero.jpg",
        caption: {
          de: "Traditionelle Gusseisenröster kombiniert mit moderner Temperatur- und Zeitkurvenmessung.",
          en: "Traditional cast-iron drum roasters paired with digital roast profile logging.",
        },
      },
      {
        image: "/assets/projects/roestwerk/roestwerk-desktop-authentic.png",
        caption: {
          de: "Digitaler Auftritt mit Fokus auf Lesefluss, Herkunftsbeschreibungen und Röstprofile.",
          en: "Digital storefront prioritizing reading rhythm, farm provenance, and tasting notes.",
        },
      },
    ],
  },

  // Chapter 05 — Outcome & Technology
  closing: {
    kicker: {
      de: "05 / ERGEBNIS & THE LAB",
      en: "05 / OUTCOME & THE LAB",
    },
    heading: {
      de: "Sinnliche Kaffeekultur trifft interaktive Frontend-Mathematik.",
      en: "Sensory coffee culture meets interactive frontend precision.",
    },
    narrative: {
      de: "RÖSTWERK 1070 zeigt, wie E-Commerce für Spezialitätenprodukte echten Mehrwert stiften kann: Durch interaktive Visualisierungen und praxisnahe Rechentools wird die Hürde zu Third-Wave-Kaffee abgebaut, ohne den Zauber des Handwerks zu verlieren.",
      en: "RÖSTWERK 1070 shows how specialty commerce can deliver genuine consumer value: Through interactive visualizations and practical brewing calculations, the barrier to third-wave coffee is lowered without diminishing the craft.",
    },
    achievements: [
      {
        de: "Eigenständiges Marken-Showcase im Rahmen von 'The Lab' für Sensorik- und Rechner-Tools",
        en: "Independent brand showcase within 'The Lab' exploring sensory tools and interactive calculators",
      },
      {
        de: "Interaktives 5-Achsen-Aromenradar mit dynamischer SVG-Berechnung und Geschmacks-Matching",
        en: "Interactive 5-axis flavor radar featuring dynamic SVG calculation and taste-profile matching",
      },
      {
        de: "Reaktiver Brührechner für stufenlose Dosierungs- und Brühverhältnis-Kalkulationen",
        en: "Reactive extraction calculator with instant coffee-to-water ratio adjustments",
      },
      {
        de: "Vollständiger Quellcode auf GitHub mit Playwright E2E- und Accessibility-Audits",
        en: "Complete source code on GitHub with Playwright E2E and automated accessibility audits",
      },
    ],
    techStack: ["Next.js 16", "React 19", "Tailwind CSS", "SVG Radar Visuals", "Extraction Engine", "Static Export"],
    techRationale: {
      de: "Next.js 16 liefert sofort einsatzbereite statische Seiten, während Tailwind CSS und native SVG-Geometrien flüssige Radar-Visualisierungen ohne schwere Chart-Bibliotheken ermöglichen.",
      en: "Next.js 16 pre-renders ultra-fast static pages, while Tailwind CSS and native SVG math power smooth radar visualizations without heavy charting libraries.",
    },
    statusNote: {
      de: "Eigenständiges Konzept (The Lab). Vollständiger Quellcode und interaktive Rechner im GitHub-Repository einsehbar.",
      en: "Independent concept (The Lab). Complete source code and interactive calculators available on GitHub.",
    },
    externalButtonLabel: {
      de: "GitHub-Repository aufrufen",
      en: "View GitHub Repository",
    },
  },

  nextProject: {
    title: "KERN / FIELD",
    slug: "kern-field",
    descriptor: {
      de: "Architektur-Monografie & Werkverzeichnis",
      en: "Architectural Monograph & Living Index",
    },
    kicker: {
      de: "NÄCHSTES PROJEKT",
      en: "NEXT PROJECT",
    },
  },
};
