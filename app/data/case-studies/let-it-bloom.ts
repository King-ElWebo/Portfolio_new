import type { CaseStudyData } from "~/types/case-study";

export const letItBloomCaseStudy: CaseStudyData = {
  slug: "let-it-bloom",
  projectId: "project-let-it-bloom",
  indexKicker: {
    de: "01 / CLIENT WORK · ATELIER ONE-PAGER",
    en: "01 / CLIENT WORK · ATELIER ONE-PAGER",
  },
  title: "Let It Bloom",
  headline: {
    de: "Florale Eleganz und saisonale Kuration in digitaler Leichtigkeit.",
    en: "Floral elegance and seasonal curation in digital lightness.",
  },
  subheadline: {
    de: "Ein maßgeschneiderter One-Pager für das Floristik-Atelier von Wolfgang Gruber — kombiniert mit einem schlanken Mini-CMS für wechselnde Kollektionen.",
    en: "A bespoke one-pager for Wolfgang Gruber's floral atelier — paired with a lean mini-CMS for seasonal showcases.",
  },
  year: "2026",
  client: {
    de: "Wolfgang Gruber · Let It Bloom",
    en: "Wolfgang Gruber · Let It Bloom",
  },
  role: {
    de: "UI/UX Design & Fullstack-Entwicklung",
    en: "UI/UX Design & Full-Stack Development",
  },
  scope: {
    de: "Editorial One-Pager · Mini-CMS · Vercel KV/Blob",
    en: "Editorial One-Pager · Mini-CMS · Vercel KV/Blob",
  },
  statusBadge: {
    de: "Live im Kundeneinsatz",
    en: "Live Client Production",
  },
  statusUpcoming: false,
  liveUrl: "https://www.letitbloom.at/",

  // Chapter 01 — Hero
  heroImage: {
    src: "/assets/projects/let-it-bloom/let-it-bloom-hero-desktop-polish-v2.png",
    alt: {
      de: "Let It Bloom Webauftritt — Hero-Ansicht mit floralem Emblem",
      en: "Let It Bloom website — Hero section with floral emblem",
    },
    caption: {
      de: "Feinfühlige Typografie, warme Naturtöne und ein responsives Editorial-Layout, das handwerkliche Floristik digital erlebbar macht.",
      en: "Delicate typography, warm organic palette, and a responsive editorial layout celebrating handcrafted floristry.",
    },
  },

  // Chapter 02 — The Digital Experience (Main Visual Section)
  visualExperience: {
    kicker: {
      de: "02 / THE DIGITAL EXPERIENCE",
      en: "02 / THE DIGITAL EXPERIENCE",
    },
    heading: {
      de: "Gestaltung für das Auge. Ergonomie für den mobilen Besuch.",
      en: "Visual clarity for the eye. Responsive ease for mobile visits.",
    },
    subheadline: {
      de: "Statt eines überladenen Blumenversand-Shops setzt der Webauftritt auf die visuelle Wertigkeit eines Ateliers — mit direktem Anruf- und WhatsApp-Kanal für Kunden im Weinviertel.",
      en: "Rather than an overcrowded e-commerce catalogue, the site conveys the calm craftsmanship of an artisan atelier — with direct one-tap phone and WhatsApp consultation.",
    },
    desktopShowcase: {
      src: "/assets/projects/let-it-bloom/let-it-bloom-experience-desktop-polish-v2.png",
      alt: {
        de: "Let It Bloom Desktop-Präsenz — Leistungsübersicht und Schnittblumen",
        en: "Let It Bloom Desktop Experience — Services overview and seasonal cuts",
      },
      caption: {
        de: "Das Leistungsraster auf Desktop (1440px): Klare Gliederung der handwerklichen Schwerpunkte von Schnittblumen bis zur individuellen Vorbestellung.",
        en: "Desktop service structure at 1440px: Clear presentation of artisan specialties from seasonal cuts to bespoke consultation.",
      },
    },
    mobileShowcase: {
      src: "/assets/projects/let-it-bloom/let-it-bloom-experience-mobile-polish-v2.png",
      alt: {
        de: "Let It Bloom Mobile Navigation und Schnellzugriff",
        en: "Let It Bloom Mobile navigation and quick access",
      },
      caption: {
        de: "Fokussierte mobile Navigation (390px): Schneller Zugriff auf Leistungen, Galerie und direkte Kontaktkanäle per Fingertipp.",
        en: "Focused mobile navigation (390px): Instant access to services, gallery, and direct consultation channels.",
      },
    },
    lookbookKicker: {
      de: "ATELIER & WERKSTÜCKE",
      en: "ATELIER & ARRANGEMENTS",
    },
    lookbookDescription: {
      de: "Kuratierte Auszüge aus der Website-Galerie und dem regionalen Handwerk in Langenzersdorf.",
      en: "Curated excerpts from the website gallery and regional craftsmanship in Langenzersdorf.",
    },
    lookbook: [
      {
        image: "/assets/projects/let-it-bloom/let-it-bloom-ui-philosophy-polish-v2.png",
        title: { de: "Regionale Philosophie & Handwerk", en: "Regional Philosophy & Craft" },
        category: { de: "Authentische UI-Sektion", en: "Authentic UI Section" },
      },
      {
        image: "/assets/projects/let-it-bloom/letitbloom-bouquet.jpg",
        title: { de: "Blühende Topfpflanze", en: "Flowering Potted Plant" },
        category: { de: "Topfpflanzen & Gefäße", en: "Potted Plants & Planters" },
      },
      {
        image: "/assets/projects/let-it-bloom/bloom-store-farmgate.jpg",
        title: { de: "Ab-Hof & Werkstatt", en: "Farmgate & Atelier" },
        category: { de: "Atelier Langenzersdorf", en: "Langenzersdorf Atelier" },
      },
    ],
    storeAtmosphere: [],
  },

  // Chapter 03 — Content Management
  adminCms: {
    kicker: {
      de: "03 / CONTENT MANAGEMENT",
      en: "03 / CONTENT MANAGEMENT",
    },
    heading: {
      de: "Saisonale Kollektionen eigenständig pflegen.",
      en: "Autonomous seasonal updates for the owner.",
    },
    subheadline: {
      de: "Ein maßgeschneidertes Mini-Dashboard, mit dem Wolfgang Gruber saisonale Werkstücke, Fotos und Texte eigenständig aktualisiert.",
      en: "A tailored mini-dashboard allowing Wolfgang Gruber to update seasonal arrangements, imagery, and copy independently.",
    },
    narrative: {
      de: "Floristischer Bedarf wandelt sich mit den Jahreszeiten — von Frühlingsblüten bis zu Allerheiligenkränzen. Das eigens entwickelte Mini-Dashboard ermöglicht es Wolfgang Gruber, Bildmaterial direkt im Browser hochzuladen, Texte anzupassen und saisonale Angebote mit einem Klick zu schalten — ganz ohne Entwicklerhilfe.",
      en: "Floristry evolves with the seasons — from spring blossoms to autumn tributes. The custom mini-dashboard allows Wolfgang Gruber to upload imagery directly in the browser, update descriptions, and activate seasonal showcases with a single toggle — completely free from ongoing developer assistance.",
    },
    systemLabel: {
      de: "Mini-CMS · Vercel KV & Blob",
      en: "Mini-CMS · Vercel KV & Blob",
    },
    screenshot: {
      src: "/assets/projects/let-it-bloom/let-it-bloom-cms-polish-v2.png",
      alt: {
        de: "Let It Bloom Admin-Dashboard — Saisonale Kollektionspflege",
        en: "Let It Bloom Admin Dashboard — Seasonal collection curation",
      },
      caption: {
        de: "Authentische Ansicht des Administrationsbereichs: Wolfgang Gruber steuert saisonale Kacheln, Bild-Uploads und Freigaben über eine aufgeräumte Maske.",
        en: "Authentic administration screen: Wolfgang Gruber manages seasonal cards, image uploads, and visibility toggles through a clean interface.",
      },
    },
    pillars: [
      {
        number: "01",
        title: { de: "Saison-Kacheln schalten", en: "Seasonal Showcase Toggle" },
        description: {
          de: "Sichtbarkeit einzelner Werkstücke oder der gesamten Sektion direkt steuern.",
          en: "Control visibility of individual arrangements or the entire seasonal section.",
        },
      },
      {
        number: "02",
        title: { de: "Direkte Bild- & Textpflege", en: "Direct Imagery & Copy" },
        description: {
          de: "Neue Fotos und Beschreibungen ohne CMS-Ballast direkt im Browser aktualisieren.",
          en: "Update photos and descriptions directly in the browser without CMS complexity.",
        },
      },
    ],
  },

  // Chapter 04 — Outcome & Technology
  closing: {
    kicker: {
      de: "04 / ERGEBNIS & PRAXIS",
      en: "04 / OUTCOME & PRODUCTION",
    },
    heading: {
      de: "Klarheit im Design, Freiheit im Alltag.",
      en: "Clarity in design, autonomy in everyday work.",
    },
    narrative: {
      de: "Let It Bloom verbindet eine ruhige, atelierbezogene Gestaltung mit der praktischen Freiheit, saisonale Angebote eigenständig zu pflegen — ergänzt durch direkte Kontaktkanäle für Kunden in der Region.",
      en: "Let It Bloom pairs a calm, artisan identity with the practical autonomy of self-managed seasonal showcases — complemented by direct consultation channels for regional clients.",
    },
    achievements: [
      {
        de: "Eigenständige Pflege saisonaler Werkstücke durch den Inhaber ohne laufenden Entwickleraufwand",
        en: "Autonomous management of seasonal arrangements by the owner without ongoing developer intervention",
      },
      {
        de: "Direkter WhatsApp- und Anruf-Kanal für unkomplizierte Werkstückanfragen im Weinviertel",
        en: "Direct WhatsApp and phone channels for uncomplicated regional floral consultations",
      },
      {
        de: "Individuell implementierte Cookie-Präferenzeinstellungen ohne externe Werbe-Tracker",
        en: "Custom-built cookie preference controls without third-party advertising trackers",
      },
    ],
    techStack: ["Next.js 15", "React 19", "Tailwind CSS v4", "Vercel KV", "Vercel Blob", "Web3Forms"],
    techRationale: {
      de: "Schlanker Next.js 15 Stack mit Vercel KV und Blob für maximale redaktionelle Freiheit.",
      en: "Lean Next.js 15 stack with Vercel KV and Blob providing full editorial autonomy.",
    },
    statusNote: {
      de: "Erfolgreich im aktiven Kundeneinsatz unter der offiziellen Domain www.letitbloom.at.",
      en: "Successfully in active commercial use under the official domain www.letitbloom.at.",
    },
    externalButtonLabel: {
      de: "Live-Website besuchen",
      en: "Visit Live Website",
    },
  },

  nextProject: {
    title: "FKW-G",
    slug: "fkw-g",
    descriptor: {
      de: "Barrierearmes Vereinsportal & WordPress-Theme",
      en: "Accessible NGO Portal & Custom WordPress Theme",
    },
    kicker: {
      de: "NÄCHSTES PROJEKT",
      en: "NEXT PROJECT",
    },
  },
};
