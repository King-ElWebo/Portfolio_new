import type { CaseStudyData } from "~/types/case-study";

export const checkpotCaseStudy: CaseStudyData = {
  slug: "checkpot-hietzing",
  projectId: "checkpot-hietzing",
  indexKicker: {
    de: "01 / CLIENT WORK",
    en: "01 / CLIENT WORK",
  },
  title: "Checkpot Hietzing",
  headline: {
    de: "Ein neuer digitaler Auftritt für eine Wiener Modeboutique.",
    en: "A refined digital presence for an established Viennese fashion boutique.",
  },
  subheadline: {
    de: "Vom visuellen Redesign bis zum maßgeschneiderten Redaktionssystem: Vollständige Neukonzeption eines inhabergeführten Modehauses in Wien-Hietzing.",
    en: "From visual redesign to a custom content management system: Complete end-to-end transformation for an independent fashion boutique in Vienna.",
  },
  year: "2026",
  client: {
    de: "Checkpot Damenmoden",
    en: "Checkpot Damenmoden",
  },
  role: {
    de: "Design & Fullstack-Entwicklung",
    en: "Design & Fullstack Engineering",
  },
  scope: {
    de: "Website Redesign · Custom CMS · Cloud-Architektur",
    en: "Website Redesign · Custom CMS · Cloud Architecture",
  },
  statusBadge: {
    de: "Entwicklung abgeschlossen · Launch in Kürze",
    en: "Development completed · Launch upcoming",
  },
  statusUpcoming: true,
  liveUrl: "https://checkpot-hietzing.at/",

  // Chapter 01 — Hero
  heroImage: {
    src: "/assets/projects/checkpot/checkpot-redesign-desktop-authentic.png",
    alt: {
      de: "Checkpot Hietzing Neugestaltung — Desktop-Ansicht",
      en: "Checkpot Hietzing Redesign — Desktop Viewport",
    },
    caption: {
      de: "Fertiggestelltes Webdesign mit kuratiertem Lookbook und editorialer Typografie.",
      en: "Completed web design featuring curated lookbooks and editorial typography.",
    },
  },

  // Chapter 02 — The Challenge & Transformation
  transformation: {
    kicker: {
      de: "02 / TRANSFORMATION",
      en: "02 / TRANSFORMATION",
    },
    heading: {
      de: "Von einer statischen Altseite zur lebendigen Kuration.",
      en: "From a static legacy website to curated independence.",
    },
    narrative: {
      de: "Die bisherige Website stammte aus vergangenen Jahren und war technisch wie visuell in die Jahre gekommen. Für jede Text- oder Bildanpassung war die Boutique auf externe Dienstleister angewiesen — neue Kollektionen konnten nicht zeitnah präsentiert werden. Die Neukonzeption löst diese Reibung: ein zeitloses, reduziertes Design für Kundinnen und ein simples System, mit dem die Inhaberin ihr Sortiment eigenständig aktuell hält.",
      en: "The previous website had grown outdated both visually and structurally. The boutique depended entirely on external providers for routine changes, making it impossible to keep seasonal collections up to date. The redesign resolves this friction: a timeless, minimalist digital storefront for visitors paired with a straightforward system that allows the owner to maintain her collection independently.",
    },
    historicalImage: {
      src: "/assets/projects/checkpot/checkpot-historical-2019.png",
      year: "2019",
      label: {
        de: "Ausgangszustand (Wayback-Archiv)",
        en: "Legacy Website (Archive Capture)",
      },
      caption: {
        de: "Starres Tabellen-Layout, veraltete Bildformate und externe Pflegeabhängigkeit.",
        en: "Rigid table layouts, outdated imagery, and complete dependence on external updates.",
      },
    },
    redesignImage: {
      src: "/assets/projects/checkpot/checkpot-redesign-desktop-authentic.png",
      label: {
        de: "Neukonzeption 2026",
        en: "Redesign 2026",
      },
      caption: {
        de: "Großzügiger Weißraum, modische Typografie und dynamische Kollektionspflege.",
        en: "Generous whitespace, refined typography, and dynamic collection management.",
      },
    },
  },

  // Chapter 03 — The Digital Experience (Main Visual Section)
  visualExperience: {
    kicker: {
      de: "03 / THE DIGITAL EXPERIENCE",
      en: "03 / THE DIGITAL EXPERIENCE",
    },
    heading: {
      de: "Mode im Fokus. Ästhetik ohne Ablenkung.",
      en: "Fashion in focus. Aesthetics without distraction.",
    },
    subheadline: {
      de: "Ein digitaler Schaufensterbummel: Ausgewählte Stoffe, saisonale Kombinationen und ein klares Interface auf allen Geräten.",
      en: "A digital storefront experience: Tactile fabrics, seasonal outfits, and a clean interface across every viewport.",
    },
    desktopShowcase: {
      src: "/assets/projects/checkpot/checkpot-redesign-desktop-authentic.png",
      alt: {
        de: "Checkpot Hietzing — Desktop Storefront",
        en: "Checkpot Hietzing — Desktop Storefront",
      },
      caption: {
        de: "Editorial-Header mit dezentem Markenlogo, klarer Navigation und kuratiertem Einstieg.",
        en: "Editorial header with restrained branding, intuitive navigation, and curated entry points.",
      },
    },
    mobileShowcase: {
      src: "/assets/projects/checkpot/checkpot-redesign-mobile-authentic.png",
      alt: {
        de: "Checkpot Hietzing — Mobile Ansicht",
        en: "Checkpot Hietzing — Mobile Experience",
      },
      caption: {
        de: "Mobile-First optimiert: Schnelle Ladezeiten und taktiles Stöbern direkt am Smartphone.",
        en: "Mobile-first experience: Rapid loading and fluid browsing directly on smartphones.",
      },
    },
    lookbook: [
      {
        image: "/assets/projects/checkpot/outfit-autumn-layer.jpg",
        title: { de: "Herbst-Layering", en: "Autumn Layering" },
        category: { de: "Wolle & Cashmere", en: "Wool & Cashmere" },
      },
      {
        image: "/assets/projects/checkpot/outfit-blue-summer.jpg",
        title: { de: "Sommerliches Leinen", en: "Summer Linen" },
        category: { de: "Naturfasern", en: "Natural Fibers" },
      },
      {
        image: "/assets/projects/checkpot/outfit-summer-pattern.jpg",
        title: { de: "Florale Zweiteiler", en: "Floral Ensembles" },
        category: { de: "Seide & Viskose", en: "Silk & Viscose" },
      },
      {
        image: "/assets/projects/checkpot/outfit-blue-winter.jpg",
        title: { de: "Winterliche Eleganz", en: "Winter Tailoring" },
        category: { de: "Strick & Mäntel", en: "Knitwear & Coats" },
      },
    ],
    storeAtmosphere: [
      {
        image: "/assets/projects/checkpot/christa-boutique-portrait.jpg",
        caption: {
          de: "Inhaberin Christa Hausmair führt die Boutique mit persönlicher Stilberatung in Wien-Hietzing.",
          en: "Founder Christa Hausmair leads the boutique with personalized styling in Vienna-Hietzing.",
        },
      },
      {
        image: "/assets/projects/checkpot/store-christa-counter.jpg",
        caption: {
          de: "Persönlicher Raum: Das Geschäftslokal verbindet entspannte Atmosphäre mit kuratierter Mode.",
          en: "A personal space: The physical store pairs relaxed atmosphere with curated fashion.",
        },
      },
      {
        image: "/assets/projects/checkpot/store-detail-scarves.jpg",
        caption: {
          de: "Fokus auf Details: Hochwertige Schals und Accessoires ergänzen die Kollektionen.",
          en: "Focus on details: High-grade scarves and accessories complement the seasonal collections.",
        },
      },
      {
        image: "/assets/projects/checkpot/textile-sorgenfri-detail.jpg",
        caption: {
          de: "Qualität spürbar machen: Ausgewählte europäische Modemarken mit bewussten Materialien.",
          en: "Sensory quality: Handpicked European labels crafted from sustainable natural textiles.",
        },
      },
    ],
  },

  // Chapter 04 — A CMS Built for the Owner
  adminCms: {
    kicker: {
      de: "04 / CUSTOM CMS",
      en: "04 / CUSTOM CMS",
    },
    heading: {
      de: "Außen ein elegantes Schaufenster. Innen die volle Kontrolle.",
      en: "A refined storefront outside. Complete editorial control inside.",
    },
    subheadline: {
      de: "Kein überladenes Standard-Dashboard, sondern ein auf die Boutique zugeschnittenes Werkzeug.",
      en: "Not a bloated off-the-shelf dashboard, but an interface tailored to the boutique’s real routine.",
    },
    narrative: {
      de: "Das Herzstück des Projekts ist das individuell entwickelte Redaktionssystem. Die Inhaberin kann neue Outfits fotografieren, beschreiben und sofort veröffentlichen — ohne technische Vorkenntnisse und ohne externe Agenturkosten.",
      en: "The centerpiece of the build is the bespoke administration dashboard. The boutique owner can photograph new outfits, tag fabrics, and publish looks immediately — with zero technical friction and no external maintenance overhead.",
    },
    screenshot: {
      src: "/assets/projects/checkpot/checkpot-admin-outfits-authentic.png",
      alt: {
        de: "Authentisches Checkpot CMS — Outfit-Verwaltung",
        en: "Authentic Checkpot CMS — Outfits Management Interface",
      },
      caption: {
        de: "Tatsächliche Benutzeroberfläche des Redaktionssystems: Intuitive Outfit- und Bildpflege.",
        en: "Actual interface of the bespoke administration dashboard: Intuitive outfit and image management.",
      },
    },
    pillars: [
      {
        number: "01",
        title: {
          de: "Outfits & Kollektionen",
          en: "Outfits & Collections",
        },
        description: {
          de: "Saisonale Looks mit wenigen Klicks anlegen, Farbfilter vergeben und gezielt auf der Startseite hervorheben.",
          en: "Create seasonal looks in seconds, assign color tags, and feature key outfits on the digital storefront.",
        },
      },
      {
        number: "02",
        title: {
          de: "Kuratierte Modemarken",
          en: "Partner Brands",
        },
        description: {
          de: "Partner-Labels selbstständig pflegen, Beschreibungen ergänzen und Markenseiten aktuell halten.",
          en: "Independently maintain brand portfolios, update descriptions, and curate label highlights.",
        },
      },
      {
        number: "03",
        title: {
          de: "Boutique & Öffnungszeiten",
          en: "Store Details & Hours",
        },
        description: {
          de: "Saisonale Öffnungszeiten, Urlaubsnotizen und Kontaktdaten flexibel und ohne Wartezeiten anpassen.",
          en: "Update holiday hours, boutique announcements, and contact information without waiting on a developer.",
        },
      },
    ],
  },

  // Chapter 05 — Outcome & Technology
  closing: {
    kicker: {
      de: "05 / SUMMARY & STACK",
      en: "05 / SUMMARY & STACK",
    },
    heading: {
      de: "Für den Alltag gebaut. Auf Langlebigkeit ausgelegt.",
      en: "Crafted for daily use. Engineered for longevity.",
    },
    narrative: {
      de: "Checkpot Hietzing beweist, dass ein lokales Fachgeschäft nicht zwischen generischen Baukästen und unbezahlbaren Agenturverträgen wählen muss. Das Ergebnis ist eine hochwertige Präsenz, die dem Charakter der Boutique gerecht wird, gepaart mit langlebiger Softwarequalität.",
      en: "Checkpot Hietzing proves that an independent local boutique doesn't have to choose between generic site builders and costly agency retainers. The outcome is a distinguished digital presence true to the boutique's character, powered by lasting software craft.",
    },
    achievements: [
      {
        de: "Vollständige redaktionelle Unabhängigkeit für die Inhaberin",
        en: "Complete editorial independence for the boutique owner",
      },
      {
        de: "Zeitlose visuelle Ästhetik passend zur Wiener Boutique-Tradition",
        en: "Timeless visual aesthetic reflecting Viennese boutique heritage",
      },
      {
        de: "Wartungsarmer Serverless-Betrieb mit minimalen Betriebskosten",
        en: "Low-maintenance serverless architecture with negligible operating costs",
      },
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Neon PostgreSQL",
      "Cloudflare Workers",
      "Cloudflare R2",
    ],
    techRationale: {
      de: "Moderne Edge-Infrastruktur kombiniert mit relationaler Serverless-Datenbank sorgt für minimale Ladezeiten bei Bildern und zuverlässigen, wartungsfreien Betrieb.",
      en: "Modern edge delivery paired with a serverless relational database delivers instantaneous image loads and robust, low-maintenance operations.",
    },
    statusNote: {
      de: "Entwicklung abgeschlossen. Die Inhaberin pflegt derzeit die initialen Inhalte für den bevorstehenden öffentlichen Launch ein.",
      en: "Development complete. The owner is currently preparing initial collection content ahead of the upcoming public launch.",
    },
  },

  nextProject: {
    title: "Let It Bloom",
    slug: "let-it-bloom",
    descriptor: {
      de: "Feminine Brand & Floral Web Experience",
      en: "Feminine Brand & Floral Web Experience",
    },
    kicker: {
      de: "NÄCHSTES PROJEKT",
      en: "NEXT PROJECT",
    },
  },
};
