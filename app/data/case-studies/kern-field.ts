import type { CaseStudyData } from "~/types/case-study";

export const kernFieldCaseStudy: CaseStudyData = {
  slug: "kern-field",
  projectId: "concept-kern-field",
  indexKicker: {
    de: "07 / THE LAB — INDEPENDENT CONCEPT",
    en: "07 / THE LAB — INDEPENDENT CONCEPT",
  },
  title: "KERN / FIELD",
  headline: {
    de: "Architektonische Stille, räumliche Monografie und disziplinierte Proportionen.",
    en: "Architectural silence, spatial monograph, and disciplined proportions.",
  },
  subheadline: {
    de: "Ein eigenständiges Werkverzeichnis für ein zeitgenössisches Architekturbüro: Großzügige Bildachsen, typografische Zurückhaltung und ein interaktiver Living Project Index.",
    en: "An independent portfolio and spatial monograph for a contemporary architecture studio: Expansive photographic axes, typographic restraint, and an interactive Living Project Index.",
  },
  year: "2026",
  client: {
    de: "KERN / FIELD (Eigenständiges Konzept)",
    en: "KERN / FIELD (Independent Concept)",
  },
  role: {
    de: "Editorial Design, Layout-Konzept & Frontend-Entwicklung",
    en: "Editorial Design, Layout Concept & Frontend Engineering",
  },
  scope: {
    de: "Spatial Monograph · Living Project Index · Architectural Typography · Responsive Art Direction",
    en: "Spatial Monograph · Living Project Index · Architectural Typography · Responsive Art Direction",
  },
  statusBadge: {
    de: "The Lab · Eigenständiges Konzept",
    en: "The Lab · Independent Concept",
  },
  statusUpcoming: false,
  liveUrl: "https://github.com/King-ElWebo/Architecture-Demo",

  // Chapter 01 — Hero
  heroImage: {
    src: "/assets/projects/kern-field/kern-field-desktop-authentic.png",
    alt: {
      de: "KERN / FIELD Architektur — Monografisches Desktop-Showcase",
      en: "KERN / FIELD Architecture — Monographic Desktop Showcase",
    },
    caption: {
      de: "Monumentale Bildachsen, strenge Rastersymmetrie und stille typografische Kuration.",
      en: "Monumental photographic axes, strict grid discipline, and silent typographic curation.",
    },
  },

  // Chapter 02 — Signature Living Project Index (AdminCms slot used for core engine)
  adminCms: {
    kicker: {
      de: "02 / WERKVERZEICHNIS: LIVING PROJECT INDEX",
      en: "02 / LIVING PROJECT INDEX & MONOGRAPH",
    },
    heading: {
      de: "Raum, Rhythmus und materielle Schwere: Das digitale Werkverzeichnis.",
      en: "Space, rhythm, and tectonic weight: The digital project index.",
    },
    subheadline: {
      de: "Vom lauten Web-Portfolio zum stillen Architekturband: Das Interface verhält sich wie eine gebundene Schweizer Monografie.",
      en: "Replacing noisy web trends with the quietude of a Swiss architectural monograph.",
    },
    narrative: {
      de: "Zeitgenössische Architektur entsteht aus Proportion, Licht und Materialehrlichkeit. KERN / FIELD verzichtet bewusst auf aufdringliche Parallax-Effekte und laute Farbflächen. Großzügige Raumachsen lassen Sichtbeton und alpine Lärche atmen, während Bauwerke über geographische Koordinaten, Baujahr und Typologie präzise erschlossen werden.",
      en: "Contemporary architecture is defined by proportion, natural illumination, and tectonic honesty. KERN / FIELD deliberately rejects frantic parallax effects and loud badges. Expansive spatial axes allow fair-faced concrete and alpine larch to breathe, while buildings are methodically navigated via geographic coordinates, year, and typology.",
    },
    systemLabel: {
      de: "Living Project Index · Werkverzeichnis",
      en: "Living Project Index · Architectural Catalog",
    },
    screenshot: {
      src: "/assets/projects/kern-field/kern-field-work-authentic.png",
      alt: {
        de: "KERN / FIELD Living Project Index Werkverzeichnis",
        en: "KERN / FIELD Living Project Index Architectural Archive",
      },
      caption: {
        de: "Werkverzeichnis (/bauten): Koordinatenbasierte Projektübersicht mit asymmetrischen Bildpaaren.",
        en: "Project archive (/bauten): Coordinate-indexed architecture catalog featuring asymmetric editorial layouts.",
      },
    },
    pillars: [
      {
        number: "01",
        title: { de: "Koordinaten-Taxonomie", en: "Coordinate Taxonomy" },
        description: {
          de: "Erschließung aller Bauten über topografische Koordinaten, Höhenmeter und Baujahr.",
          en: "Precise building taxonomy anchored in topographic coordinates, elevation, and completion year.",
        },
      },
      {
        number: "02",
        title: { de: "Asymmetrischer Rhythmus", en: "Asymmetrical Spatial Rhythm" },
        description: {
          de: "Großformatige Bildkompositionen mit disziplinierten Proportionen für maximale architektonische Ruhe.",
          en: "Generous photographic compositions and disciplined spatial proportions allowing structural weight to resonate.",
        },
      },
      {
        number: "03",
        title: { de: "Monografische Typografie", en: "Monographic Typography" },
        description: {
          de: "Zurückhaltende Schweizer Typografie: Präzise Beschriftungen wie in klassischen Buchpublikationen.",
          en: "Restrained Swiss typography: Subtle captioning evoking linen-bound architectural monographs.",
        },
      },
    ],
  },

  // Chapter 03 & 04 — Studio Manifest & Material Tectonics
  visualExperience: {
    kicker: {
      de: "03 / ATELIER & MANIFEST",
      en: "03 / ATELIER & MANIFESTO",
    },
    heading: {
      de: "Die Haltung des Büros: Materialehrlichkeit und räumliche Kontemplation.",
      en: "Studio philosophy: Material honesty and spatial contemplation.",
    },
    subheadline: {
      de: "Das Atelier-Profil verbindet Werkmonografien mit tektonischen Detailstudien.",
      en: "The studio profile balances architectural monographs with tactile material studies.",
    },
    desktopShowcase: {
      src: "/assets/projects/kern-field/kern-field-studio-authentic.png",
      alt: {
        de: "KERN / FIELD Atelier-Profil und Manifest",
        en: "KERN / FIELD Studio profile and manifesto",
      },
      caption: {
        de: "Atelier-Profil (/atelier): Manifest zur Materialehrlichkeit, Werkstatt-Einblicke und Bürostruktur.",
        en: "Studio profile (/atelier): Manifesto on material honesty, workshop insights, and collaborative culture.",
      },
    },
    mobileShowcase: {
      src: "/assets/projects/kern-field/kern-field-mobile-authentic.png",
      alt: {
        de: "KERN / FIELD Mobile Leseführung auf Smartphones",
        en: "KERN / FIELD Mobile Reading Rhythm on smartphones",
      },
      caption: {
        de: "Ruhiger Lesefluss: Asymmetrische Bildpaare skalieren harmonisch auf schmale Bildschirme.",
        en: "Calm mobile rhythm: Asymmetric editorial pairs scale gracefully into a disciplined single-column flow.",
      },
    },
    lookbookKicker: {
      de: "TEKTONISCHE DETAILS",
      en: "TECTONIC DETAILS",
    },
    lookbookDescription: {
      de: "Ausgewählte Materialverbindungen: Lärche, Sichtbeton und Naturstein.",
      en: "Selected material joinery: Alpine larch, fair-faced concrete, and quarry stone.",
    },
    lookbook: [
      {
        image: "/assets/projects/kern-field/detail-tidal-concrete.webp",
        title: { de: "Gezeiten-Sichtbeton", en: "Tidal Concrete" },
        category: { de: "Monolithischer Guss · Schalungstextur", en: "Monolithic Cast · Board Formwork" },
      },
      {
        image: "/assets/projects/kern-field/detail-larch-joinery.webp",
        title: { de: "Lärchenholz-Fügung", en: "Larch Timber Joinery" },
        category: { de: "Handwerkliche Verbindung · Unbehandelt", en: "Artisan Joinery · Untreated" },
      },
    ],
    atmosphereKicker: {
      de: "RAUMWIRKUNG & TOPOGRAFIE",
      en: "SPATIAL IMPACT & TOPOGRAPHY",
    },
    atmosphereDescription: {
      de: "Bauwerke eingebettet in alpine Topografien und urbane Kontexte.",
      en: "Buildings embedded into alpine landscapes and quiet urban enclaves.",
    },
    storeAtmosphere: [
      {
        image: "/assets/projects/kern-field/hero-house-between-pines.jpg",
        caption: {
          de: "Haus zwischen Kiefern: Wohnbaukörper harmonisch im Fels- und Baumbestand verankert.",
          en: "House Between Pines: Monolithic dwelling integrated into rocky pine terrain.",
        },
      },
      {
        image: "/assets/projects/kern-field/detail-tidal-concrete.webp",
        caption: {
          de: "Materielle Ehrlichkeit: Schalungsrauher Beton reflektiert das wandernde Tageslicht.",
          en: "Material honesty: Textured concrete reveals shifting daylight gradients.",
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
      de: "Typografische Disziplin trifft digitale Buchgestaltung.",
      en: "Typographic discipline meets digital book craftsmanship.",
    },
    narrative: {
      de: "KERN / FIELD zeigt, wie Architekturportfolios jenseits lauter Showeffekte gestaltet werden können: Durch die formale Strenge eines gedruckten Architekturbands wird der digitale Raum zur stillen Bühne für Raum, Licht und Struktur.",
      en: "KERN / FIELD demonstrates how architectural portfolios can transcend fleeting digital effects: Through the editorial rigor of a printed book, the digital medium becomes a quiet stage for space, light, and structure.",
    },
    achievements: [
      {
        de: "Eigenständiges Monografie-Konzept im Rahmen von 'The Lab' für Architektur- und Raumkuration",
        en: "Independent monograph concept within 'The Lab' exploring architectural and spatial curation",
      },
      {
        de: "Koordinaten- und typologiebasierter Living Project Index mit asymmetrischem Rastersystem",
        en: "Coordinate- and typology-driven Living Project Index featuring an asymmetrical editorial grid",
      },
      {
        de: "Ruhige, barrierefreie Leseführung mit strenger typografischer Hierarchie nach Schweizer Vorbild",
        en: "Calm, accessible reading rhythm with rigorous Swiss typographic hierarchy",
      },
      {
        de: "Vollständiger Quellcode auf GitHub mit Playwright E2E- und Accessibility-Audits",
        en: "Complete source code on GitHub with Playwright E2E and automated accessibility audits",
      },
    ],
    techStack: ["Next.js 16", "React 19", "Tailwind CSS", "Monographic Grid", "Semantic HTML", "Static Export"],
    techRationale: {
      de: "Next.js 16 und semantisches HTML garantieren exzellente Ladezeiten und Bildrendering-Qualität, während Tailwind CSS eine absolut präzise, proportionale Abstands- und Rastersystem-Steuerung ermöglicht.",
      en: "Next.js 16 and semantic HTML ensure optimal asset delivery and image rendering, while Tailwind CSS enables proportional spatial and grid precision.",
    },
    statusNote: {
      de: "Eigenständiges Konzept (The Lab). Vollständiger Quellcode und Layout-Module im GitHub-Repository einsehbar.",
      en: "Independent concept (The Lab). Complete source code and layout modules available on GitHub.",
    },
    externalButtonLabel: {
      de: "GitHub-Repository aufrufen",
      en: "View GitHub Repository",
    },
  },

  nextProject: {
    title: "Checkpot Hietzing",
    slug: "checkpot-hietzing",
    descriptor: {
      de: "Gastronomie-Website & Markenerlebnis",
      en: "Hospitality Website & Brand Experience",
    },
    kicker: {
      de: "NÄCHSTES PROJEKT",
      en: "NEXT PROJECT",
    },
  },
};
