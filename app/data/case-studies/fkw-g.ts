import type { CaseStudyData } from "~/types/case-study";

export const fkwGCaseStudy: CaseStudyData = {
  slug: "fkw-g",
  projectId: "project-fkw-g",
  indexKicker: {
    de: "03 / CLIENT WORK",
    en: "03 / CLIENT WORK",
  },
  title: "FKW-G",
  headline: {
    de: "Würdevolle Fürsorge und barrierefreie Information für Menschen mit Behinderung.",
    en: "Dignified care and accessible guidance for individuals with disabilities.",
  },
  subheadline: {
    de: "Ein maßgeschneidertes WordPress-Theme für einen österreichischen Förderverein: Konzipiert nach WCAG 2.1 mit hohem Kontrast, klarer Orientierung und integrierter Spendenanbindung.",
    en: "A custom WordPress theme engineered for an Austrian NGO: Designed around WCAG 2.1 with high contrast, intuitive structure, and transparent donation flows.",
  },
  year: "2025",
  client: {
    de: "Friedrich-Karl-Weniger-Gesellschaft",
    en: "Friedrich-Karl-Weniger-Gesellschaft",
  },
  role: {
    de: "UI-Design, barrierearme Typografie & Theme-Entwicklung",
    en: "UI Design, Accessible Typography & Theme Engineering",
  },
  scope: {
    de: "WordPress Theme · PHP · Barrierefreiheit (WCAG AA) · PayPal Flow",
    en: "WordPress Theme · PHP · Accessibility (WCAG AA) · PayPal Flow",
  },
  statusBadge: {
    de: "Theme fertiggestellt · Open Source",
    en: "Theme Completed · Open Source",
  },
  statusUpcoming: false,
  liveUrl: "https://github.com/King-ElWebo/fkw-g",
  displayDomain: "fkw-gesellschaft.at",

  // Chapter 01 — Hero
  heroImage: {
    src: "/assets/projects/fkw-g/fkw-desktop-authentic.png",
    alt: {
      de: "FKW-G Vereinsportal — Barrierefreie Desktop-Präsenz mit klarem Kontrast",
      en: "FKW-G NGO Portal — Accessible Desktop experience with high contrast",
    },
    caption: {
      de: "Große Schriftgrade, warme Crimson-Akzente und klare Orientierung für Hilfesuchende.",
      en: "Generous font sizes, warm crimson accents, and clear navigation for individuals seeking guidance.",
    },
  },

  // Chapter 02 — The Challenge & Transformation
  transformation: {
    kicker: {
      de: "02 / TRANSFORMATION",
      en: "02 / TRANSFORMATION",
    },
    heading: {
      de: "Barrierefreiheit als ethischer Standard statt Pflichtübung.",
      en: "Accessibility as an ethical standard rather than an afterthought.",
    },
    narrative: {
      de: "Gemeinnützige Organisationen im Pflege- und Behindertenbereich scheitern im Web oft an generischen Standard-Themes: winzige Schriften, schwache Farbkontraste, unstrukturierte PDF-Friedhöfe und überladene Menüs schaffen Barrieren für genau jene Menschen, die Hilfe suchen. Für die Friedrich-Karl-Weniger-Gesellschaft entstand ein von Grund auf eigenes WordPress-Theme, das WCAG 2.1 AA-Richtlinien kompromisslos erfüllt: tastaturbedienbare Navigation, screenreader-optimierte Landmarken und verlässliche Spendenwege.",
      en: "Social support and healthcare NGOs frequently struggle with off-the-shelf templates: tiny fonts, poor color contrast, labyrinthine menus, and unstructured PDF graveyards erect barriers for the very people seeking aid. For the Friedrich-Karl-Weniger-Gesellschaft, a custom WordPress theme was developed from scratch to meet WCAG 2.1 AA requirements uncompromisingly: fully keyboard-operable navigation, semantic screenreader landmarks, and clear donation channels.",
    },
    historicalImage: {
      src: "/assets/projects/fkw-g/fkw-preview.png",
      year: "2025",
      label: {
        de: "Entwurfskonzept",
        en: "Initial Wireframe Concept",
      },
      caption: {
        de: "Frühe strukturelle Konzeptionierung der Inhaltsbereiche und Spendenbausteine.",
        en: "Early structural layout of essential content modules and donation blocks.",
      },
    },
    redesignImage: {
      src: "/assets/projects/fkw-g/fkw-desktop-authentic.png",
      year: "2025",
      label: {
        de: "Befreites WordPress-Theme",
        en: "Custom WordPress Theme",
      },
      caption: {
        de: "Hoher Kontrast, großzügige Klickflächen und direkte Anbindung an Satzungsdokumente.",
        en: "Strong contrast ratios, generous touch targets, and instant access to legal bylaws.",
      },
    },
  },

  // Chapter 03 — The Digital Experience
  visualExperience: {
    kicker: {
      de: "03 / THE DIGITAL EXPERIENCE",
      en: "03 / THE DIGITAL EXPERIENCE",
    },
    heading: {
      de: "Klarheit und Fürsorge in jedem Blickwinkel.",
      en: "Clarity and care across every viewport.",
    },
    subheadline: {
      de: "Kein überflüssiges Dekor: Ein ruhiges Leseerlebnis, das Betroffenen und Angehörigen sofortige Orientierung gibt.",
      en: "No unnecessary decorative noise: A calm reading rhythm providing instant guidance to families.",
    },
    desktopShowcase: {
      src: "/assets/projects/fkw-g/fkw-desktop-authentic.png",
      alt: {
        de: "FKW-G Desktop-Portal mit klaren Inhaltskarten",
        en: "FKW-G Desktop portal with clear modular information cards",
      },
      caption: {
        de: "Semantische Gliederung mit Merriweather-Serifen für Vertrauen und Lesefreundlichkeit.",
        en: "Semantic content hierarchy utilizing Merriweather serifs for trustworthiness and readability.",
      },
    },
    mobileShowcase: {
      src: "/assets/projects/fkw-g/fkw-mobile-authentic.png",
      alt: {
        de: "FKW-G Mobile Barrierefreiheit",
        en: "FKW-G Mobile Accessibility",
      },
      caption: {
        de: "Große Touch-Targets und kontrastreiche Buttons für barrierefreie mobile Nutzung.",
        en: "Generous touch targets and high-contrast buttons for accessible mobile navigation.",
      },
    },
    lookbookKicker: {
      de: "SCHLÜSSELTHEMEN DES VEREINS",
      en: "CORE MISSION PILLARS",
    },
    lookbookDescription: {
      de: "Konkrete Unterstützung im Pflegealltag, menschliche Solidarität und transparente Dokumentation.",
      en: "Practical everyday home-care guidance, human solidarity, and transparent documentation.",
    },
    lookbook: [
      {
        image: "/assets/projects/fkw-g/AdobeStock_374846559.jpg",
        title: { de: "Pflege daheim", en: "Home Care Support" },
        category: { de: "Alltagsbegleitung", en: "Everyday Guidance" },
      },
      {
        image: "/assets/projects/fkw-g/holding-hands-8288239_1920.jpg",
        title: { de: "Gemeinschaft & Solidarität", en: "Community Solidarity" },
        category: { de: "Hilfe zur Selbsthilfe", en: "Direct Assistance" },
      },
      {
        image: "/assets/projects/fkw-g/Foto Friedrich Karl Weniger.jpg",
        title: { de: "Geschichte & Werte", en: "Heritage & Values" },
        category: { de: "Gedenken an den Gründer", en: "Founder Memorial" },
      },
      {
        image: "/assets/projects/fkw-g/fkw-logo.png",
        title: { de: "Visuelle Identität", en: "Visual Identity" },
        category: { de: "Barrierearme Wortmarke", en: "High-Contrast Mark" },
      },
    ],
    atmosphereKicker: {
      de: "ORGANISATION & TRANSPARENZ",
      en: "ORGANIZATION & TRANSPARENCY",
    },
    atmosphereDescription: {
      de: "Einblick in die ehrenamtliche Arbeit und die rechtliche Transparenz der Organisation.",
      en: "Insight into voluntary support initiatives and verified governance transparency.",
    },
    storeAtmosphere: [
      {
        image: "/assets/projects/fkw-g/books-5615562_1920.jpg",
        caption: {
          de: "Rechtliche Transparenz: Barrierefreie Satzungs-Downloads und Antragsformulare.",
          en: "Governance transparency: Accessible PDF downloads of official bylaws and application forms.",
        },
      },
      {
        image: "/assets/projects/fkw-g/team-4529717_1920.jpg",
        caption: {
          de: "Ehrenamtliche Hilfe: Schnelle Vermittlung von Einzelfallunterstützung.",
          en: "Voluntary assistance: Direct facilitation of individual humanitarian support.",
        },
      },
      {
        image: "/assets/projects/fkw-g/rocks-1757593_1920.jpg",
        caption: {
          de: "Verlässliche Vereinsstrukturen mit lückenloser Rechenschaftslegung.",
          en: "Dependable organizational governance with transparent financial auditing.",
        },
      },
    ],
  },

  // Chapter 04 — The Engine / CMS / Specialist Architecture
  adminCms: {
    kicker: {
      de: "04 / ARCHITEKTUR & THEME",
      en: "04 / THEME ARCHITECTURE",
    },
    heading: {
      de: "Sauberer PHP-Code ohne Page-Builder-Ballast.",
      en: "Clean native PHP without page-builder bloat.",
    },
    subheadline: {
      de: "Ein modulares WordPress-Theme mit getrennten Template-Dateien für Spenden, Downloads und Historie.",
      en: "A modular WordPress theme engineered with purpose-built templates for donations, downloads, and history.",
    },
    narrative: {
      de: "Kommerzielle WordPress-Themes schleppen oft dutzende Plugins, komplexe Slider und langsame CSS-Frameworks mit sich herum. Für FKW-G wurde das Theme von Grund auf in semantischem PHP geschrieben: Dedizierte Vorlagen wie page-spenden.php, page-download.php und page-statuten.php sorgen dafür, dass Redakteurinnen im WordPress-Backend standardisierte Eingabemasken vorfinden, während der generierte Quellcode minimal und für Screenreader optimal gegliedert bleibt.",
      en: "Commercial WordPress themes often carry massive plugin overhead, sluggish sliders, and bloated CSS frameworks. For FKW-G, the theme was built from first principles in semantic PHP: Dedicated templates like page-spenden.php, page-download.php, and page-statuten.php ensure association staff enjoy standardized input fields in WordPress while the generated HTML stays minimal and perfectly structured for assistive technologies.",
    },
    systemLabel: {
      de: "Custom Theme · PHP & ACF",
      en: "Custom Theme · PHP & ACF",
    },
    screenshot: {
      src: "/assets/projects/fkw-g/fkw-desktop-authentic.png",
      alt: {
        de: "FKW-G Theme-Architektur und Spendenanbindung",
        en: "FKW-G Theme architecture and donation flow",
      },
      caption: {
        de: "Modulare Template-Struktur mit klaren Aktionsfeldern für Spenden und Mitgliedsanträge.",
        en: "Modular template architecture featuring distinct call-to-action blocks for donations and memberships.",
      },
    },
    pillars: [
      {
        number: "01",
        title: { de: "WCAG 2.1 AA Konformität", en: "WCAG 2.1 AA Compliance" },
        description: {
          de: "Strikte Kontrastverhältnisse von mindestens 4.5:1 und sichtbare Tastatur-Fokuszustände.",
          en: "Rigorous contrast ratios exceeding 4.5:1 with prominent keyboard focus rings.",
        },
      },
      {
        number: "02",
        title: { de: "Native PHP-Templates", en: "Native PHP Templates" },
        description: {
          de: "Kein visueller Page Builder — saubere Trennung von PHP-Rendering und CSS-Design.",
          en: "Zero visual page-builder overhead — pure separation of semantic PHP templates and styles.",
        },
      },
      {
        number: "03",
        title: { de: "Integrierter Spenden-Flow", en: "Streamlined Donations" },
        description: {
          de: "Reibungslose Unterstützung via PayPal und Banküberweisung ohne Kaufabwicklungs-Zwang.",
          en: "Frictionless giving via PayPal and bank transfer without convoluted e-commerce checkouts.",
        },
      },
    ],
  },

  // Chapter 05 — Outcome & Technology
  closing: {
    kicker: {
      de: "05 / ERGEBNIS & QUELLCODE",
      en: "05 / OUTCOME & CODE",
    },
    heading: {
      de: "Nachhaltiges Webdesign im Dienst der Gesellschaft.",
      en: "Sustainable digital design serving the community.",
    },
    narrative: {
      de: "Das FKW-G Theme beweist, dass soziales Engagement und technisches Handwerk Hand in Hand gehen: Ein benutzerfreundliches Portal, das Menschen mit Behinderung echten Mehrwert bietet und dem Verein als verlässliches Fundament dient.",
      en: "The FKW-G theme proves that social commitment and rigorous engineering belong together: An accessible portal delivering genuine utility to individuals with disabilities and a dependable digital foundation for the NGO.",
    },
    achievements: [
      {
        de: "Vollständige Einhaltung von WCAG 2.1 AA-Kriterien im visuellen und semantischen Aufbau",
        en: "Full compliance with WCAG 2.1 AA standards across visual styling and DOM hierarchy",
      },
      {
        de: "Reine PHP/WordPress-Architektur ohne Abhängigkeit von fehleranfälligen Drittanbieter-Buildern",
        en: "Pure PHP/WordPress theme architecture free from third-party builder lock-in",
      },
      {
        de: "Einfache Bereitstellung barrierefreier Dokumente und Satzungen für Hilfesuchende",
        en: "Straightforward publishing of accessible PDF documentation and legal bylaws",
      },
      {
        de: "Öffentlich zugänglicher Theme-Quellcode auf GitHub für maximale Transparenz",
        en: "Publicly available open-source theme repository on GitHub for community transparency",
      },
    ],
    techStack: ["WordPress", "PHP", "Tailwind CSS", "WCAG 2.1 AA", "PayPal", "Semantisches HTML5"],
    techRationale: {
      de: "Ein natives WordPress-Theme ermöglicht dem Verein die eigenständige Pflege ohne laufende SaaS-Gebühren, während semantisches HTML maximale Zugänglichkeit für alle Hilfesuchenden gewährleistet.",
      en: "A native WordPress theme enables autonomous client maintenance without recurring SaaS expenses, while semantic HTML guarantees uncompromised accessibility.",
    },
    statusNote: {
      de: "Theme-Entwicklung abgeschlossen. Der vollständige Quellcode ist im öffentlichen GitHub-Repository dokumentiert.",
      en: "Theme development complete. Full source code is documented in the public GitHub repository.",
    },
    externalButtonLabel: {
      de: "GitHub-Repository einsehen",
      en: "View GitHub Repository",
    },
  },

  nextProject: {
    title: "LUMENWERK Studio",
    slug: "lumenwerk-studio",
    descriptor: {
      de: "Skulpturales Licht & Interaktiver Konfigurator",
      en: "Architectural Lighting & Studio Showcase",
    },
    kicker: {
      de: "NÄCHSTES PROJEKT",
      en: "NEXT PROJECT",
    },
  },
};
