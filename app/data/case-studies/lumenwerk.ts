import type { CaseStudyData } from "~/types/case-study";

export const lumenwerkCaseStudy: CaseStudyData = {
  slug: "lumenwerk-studio",
  projectId: "concept-lumenwerk",
  indexKicker: {
    de: "04 / THE LAB — INDEPENDENT CONCEPT",
    en: "04 / THE LAB — INDEPENDENT CONCEPT",
  },
  title: "LUMENWERK Studio",
  headline: {
    de: "Skulpturales architektonisches Licht und taktile Materialkonfiguration.",
    en: "Sculptural architectural lighting and tactile material configuration.",
  },
  subheadline: {
    de: "Ein eigenständiges Atelier-Showcase für hochwertige Lichtobjekte: Interaktive Farbtemperatur-Regelung (2200K–4000K), taktile Oberflächen und eine dedizierte B2B-Architektenansicht.",
    en: "An independent studio showcase for sculptural illumination: Interactive color temperature tuning (2200K–4000K), tactile finishes, and a dedicated B2B specifier portal.",
  },
  year: "2026",
  client: {
    de: "LUMENWERK Studio (Eigenständiges Konzept)",
    en: "LUMENWERK Studio (Independent Concept)",
  },
  role: {
    de: "Art Direction, Interaktionsdesign & Frontend-Architektur",
    en: "Art Direction, Interaction Design & Frontend Architecture",
  },
  scope: {
    de: "Studio Showcase · Luminaire Configurator · B2B Specifier Portal · Static Export",
    en: "Studio Showcase · Luminaire Configurator · B2B Specifier Portal · Static Export",
  },
  statusBadge: {
    de: "The Lab · Eigenständiges Konzept",
    en: "The Lab · Independent Concept",
  },
  statusUpcoming: false,
  liveUrl: "https://github.com/King-ElWebo/Demo-leuchten-online-shop",

  // Chapter 01 — Hero
  heroImage: {
    src: "/assets/projects/lumenwerk/lumenwerk-desktop-authentic.png",
    alt: {
      de: "LUMENWERK Studio — Atelier-Showcase für architektonisches Licht",
      en: "LUMENWERK Studio — Atelier showcase for architectural lighting",
    },
    caption: {
      de: "Tiefes Obsidian-Design mit warmen Lichtkegeln und skulpturaler Produktinszenierung.",
      en: "Deep obsidian canvas with warm architectural illumination cones and sculptural products.",
    },
  },

  // Chapter 02 — Signature Interactive Configurator (AdminCms slot used for core engine)
  adminCms: {
    kicker: {
      de: "02 / SIGNATURE-TOOL: DER KONFIGURATOR",
      en: "02 / SIGNATURE TOOL: THE CONFIGURATOR",
    },
    heading: {
      de: "Farbtemperatur, Materialien & Lichtkegel in Echtzeit.",
      en: "Color temperature, finishes & beam distribution in real time.",
    },
    subheadline: {
      de: "Vom nüchternen Datenblatt zum sinnlichen Lichterlebnis: Lichtplanung wird visuell greifbar.",
      en: "Replacing static datasheets with tangible lighting simulation: specification made intuitive.",
    },
    narrative: {
      de: "Lichtplanung verlangt sowohl emotionale Raumwirkung als auch exakte Zahlenwerte. Im interaktiven Konfigurator von LUMENWERK steuern Nutzer Lichtfarben stufenlos von 2200K warmem Kerzenlicht bis zu 4000K sachlichem Arbeitslicht. Reflektoren, Wandaufhellung und taktile Materialoberflächen — wie brünierter Messing und Travertin — reagieren synchron ohne Verzögerung.",
      en: "Lighting specification demands emotional resonance alongside numerical accuracy. In LUMENWERK's interactive configurator, specifiers smoothly modulate color temperatures from 2200K candlelight to 4000K neutral daylight. Beam spill, ambient bounce, and tactile material textures — such as patinated brass and travertine — react in real time.",
    },
    systemLabel: {
      de: "Interaktiver Konfigurator · CCT & Material Engine",
      en: "Interactive Configurator · CCT & Material Engine",
    },
    screenshot: {
      src: "/assets/projects/lumenwerk/lumenwerk-konfigurator-authentic.png",
      alt: {
        de: "LUMENWERK Interaktiver Leuchten-Konfigurator mit Kelvin-Regelung",
        en: "LUMENWERK Interactive luminaire configurator with Kelvin tuning",
      },
      caption: {
        de: "Reaktive Kelvin-Regelung (2200K–4000K), Materialselektion und fotometrische Kennzahlen.",
        en: "Reactive Kelvin modulation (2200K–4000K), material selection, and live photometric metrics.",
      },
    },
    pillars: [
      {
        number: "01",
        title: { de: "Dynamische CCT-Simulation", en: "Dynamic CCT Simulation" },
        description: {
          de: "Reaktive Farbtemperaturregelung von warmen 2200K bis neutralen 4000K mit realistischer Lichtkegel-Vorschau.",
          en: "Reactive color temperature tuning from 2200K warmth to 4000K daylight with simulated ambient spill.",
        },
      },
      {
        number: "02",
        title: { de: "Taktile Materialwelten", en: "Tactile Finish Selection" },
        description: {
          de: "Echtzeit-Wechsel zwischen brüniertem Messing, patiniertem Bronze-Finish und massivem Travertin.",
          en: "Instant switching between patinated brass, blackened alloy, and solid mineral stone plinths.",
        },
      },
      {
        number: "03",
        title: { de: "Integrierte Spezifikation", en: "Integrated Specification" },
        description: {
          de: "Automatisierte Generierung von Artikelnummern, Lumen-Werten und Anschlussdaten für die Projektmappe.",
          en: "Automated generation of product codes, lumen ratings, and electrical metrics ready for export.",
        },
      },
    ],
  },

  // Chapter 03 & 04 — B2B Portal, Mobile & Sculptural Precision
  visualExperience: {
    kicker: {
      de: "03 / B2B-ARCHITEKTUR & MOBILE ERLEBNISWELT",
      en: "03 / B2B ARCHITECTURE & MOBILE EXPERIENCE",
    },
    heading: {
      de: "Geschützte Planer-Suite und kompromisslose mobile Haptik.",
      en: "Dedicated specifier portal and uncompromising mobile polish.",
    },
    subheadline: {
      de: "Ein dualer Ansatz: Edler digitaler Showroom für Endkunden, präzises Fachportal für Lichtplaner und Architekten.",
      en: "A dual strategy: Refined digital gallery for discerning clients, rigorous technical portal for architects.",
    },
    desktopShowcase: {
      src: "/assets/projects/lumenwerk/lumenwerk-haendler-authentic.png",
      alt: {
        de: "LUMENWERK B2B-Händlerportal für Architekten und Lichtplaner",
        en: "LUMENWERK B2B dealer portal for architects and lighting designers",
      },
      caption: {
        de: "B2B-Fachportal (/haendler): Direkter Download von IES-Photometriedaten, CAD-Modellen und Ausschreibungstexten.",
        en: "B2B portal (/haendler): Instant access to photometric IES files, CAD assets, and specification tender texts.",
      },
    },
    mobileShowcase: {
      src: "/assets/projects/lumenwerk/lumenwerk-mobile-authentic.png",
      alt: {
        de: "LUMENWERK Mobile Ansicht auf Touchscreens",
        en: "LUMENWERK Mobile View on touchscreens",
      },
      caption: {
        de: "Taktile Touchbedienung: Flüssige Gesten, reduzierter Dunkelraum und optimierte Produktkataloge.",
        en: "Tactile touch interaction: Fluid scrolling, deep obsidian palette, and touch-calibrated navigation.",
      },
    },
    lookbookKicker: {
      de: "SKULPTURALE LICHTOBJEKTE",
      en: "SCULPTURAL LIGHT OBJECTS",
    },
    lookbookDescription: {
      de: "Kuratierte Lichtskulpturen der Serie im physischen Raum.",
      en: "Curated architectural lighting sculptures in physical space.",
    },
    lookbook: [
      {
        image: "/assets/projects/lumenwerk/korona-i.jpg",
        title: { de: "Korona I", en: "Korona I" },
        category: { de: "Wandfluter · Rohmessing & Washi", en: "Wall Grazer · Raw Brass & Washi" },
      },
      {
        image: "/assets/projects/lumenwerk/lumen-globe.jpg",
        title: { de: "Lumen Globe", en: "Lumen Globe" },
        category: { de: "Sphärisches Ambientlicht · Travertin", en: "Spherical Ambient Light · Travertine" },
      },
    ],
    atmosphereKicker: {
      de: "MATERIALITÄT & RAUM",
      en: "MATERIALITY & SPACE",
    },
    atmosphereDescription: {
      de: "Das Zusammenspiel von Licht, Schatten und architektonischen Oberflächen.",
      en: "The interplay of illumination, shadow, and architectural surfaces.",
    },
    storeAtmosphere: [
      {
        image: "/assets/projects/lumenwerk/atelier-craft.jpg",
        caption: {
          de: "Handwerkliche Fertigung: Gedrehte Messingkomponenten und handgebürstete Reflektoren.",
          en: "Artisan precision: Turned brass hardware and hand-brushed light reflectors.",
        },
      },
      {
        image: "/assets/projects/lumenwerk/atelier-space.jpg",
        caption: {
          de: "Licht im Raum: Minimalistischer Sichtbeton mit gezielter Deckenreflexion.",
          en: "Spatial impact: Fair-faced concrete enhanced by disciplined indirect wash.",
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
      de: "Digitale Sinnlichkeit trifft technische Fachplanung.",
      en: "Digital atmosphere meets rigorous architectural specification.",
    },
    narrative: {
      de: "LUMENWERK veranschaulicht, wie modernes Produktdesign im Premiumbereich jenseits generischer E-Commerce-Templates funktionieren kann: Ein immersiver digitaler Dunkelraum, der haptische Lichtstimmungen erlebbar macht und Fachplanern gleichzeitig verlässliche technische Werkzeuge an die Hand gibt.",
      en: "LUMENWERK demonstrates how high-end lighting experiences can surpass standard commerce templates: An atmospheric digital darkroom that renders tactile lighting moods tangible while equipping architects with exact specifier tools.",
    },
    achievements: [
      {
        de: "Eigenständiges Konzept im Rahmen von 'The Lab' zur Erkundung von Luxus- und Konfigurator-Interfaces",
        en: "Independent concept within 'The Lab' exploring high-end lighting commerce and configurator UX",
      },
      {
        de: "Interaktiver Kelvin- und Materialkonfigurator mit reaktiver Echtzeit-Vorschau in React 19",
        en: "Interactive Kelvin and material configurator with reactive real-time feedback in React 19",
      },
      {
        de: "Strukturierte B2B-Architektur mit IES-Photometriedownloads und Ausschreibungstexten",
        en: "Structured B2B specifier portal with photometric IES downloads and tender specifications",
      },
      {
        de: "Vollständiger Quellcode auf GitHub mit Playwright E2E- und Accessibility-Audits",
        en: "Complete source code on GitHub with Playwright E2E and automated accessibility audits",
      },
    ],
    techStack: ["Next.js 16", "React 19", "Tailwind CSS", "Motion", "CCT Simulation", "Static Export"],
    techRationale: {
      de: "Next.js 16 und Motion ermöglichen feinfühlige Farbübergänge und Mikrointeraktionen ohne Ladezeit-Overhead, während Tailwind CSS ein durchgängiges Dunkelraum-Designsystem gewährleistet.",
      en: "Next.js 16 and Motion enable subtle color gradations and fluid micro-interactions with zero latency, while Tailwind CSS enforces a coherent darkroom design system.",
    },
    statusNote: {
      de: "Eigenständiges Konzept (The Lab). Vollständiger Quellcode und Komponenten im GitHub-Repository einsehbar.",
      en: "Independent concept (The Lab). Complete source code and interactive modules available on GitHub.",
    },
    externalButtonLabel: {
      de: "GitHub-Repository aufrufen",
      en: "View GitHub Repository",
    },
  },

  nextProject: {
    title: "SPEICHE",
    slug: "speiche-werkstattmanager",
    descriptor: {
      de: "Fahrrad-Werkstattmanager & Fachsoftware",
      en: "Bicycle Workshop Management System",
    },
    kicker: {
      de: "NÄCHSTES PROJEKT",
      en: "NEXT PROJECT",
    },
  },
};
