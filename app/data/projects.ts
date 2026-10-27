import type { ProjectEntry, ProjectFilterCategory, ProjectKind } from "~/types/project";

/**
 * Production-approved projects.
 * Verified real client commissions and genuine independent concept demos.
 * Strictly adheres to AGENTS.md content honesty standards.
 */
export const APPROVED_PROJECTS: ProjectEntry[] = [
  {
    id: "project-checkpot",
    slug: "checkpot-hietzing",
    kind: "client_project",
    status: "published",
    indexNumber: "01",
    title: "Checkpot Hietzing",
    descriptor: {
      de: "Boutique-Webpräsenz & Custom CMS",
      en: "Boutique Showcase & Custom CMS",
    },
    categoryLabel: {
      de: "Kundenprojekt · Fullstack, Cloudflare",
      en: "Client Project · Fullstack, Cloudflare",
    },
    summary: {
      de: "Vollständige Neukonzeption und Entwicklung einer performanten Webpräsenz für eine Wiener Modeboutique mit maßgeschneidertem Admin-Dashboard für Lookbook und Kollektionen.",
      en: "Ground-up redesign and full-stack development for a Vienna fashion boutique with a tailored admin dashboard for lookbook curation and seasonal collections.",
    },
    role: {
      de: "Konzeption, UI/UX Design & Fullstack-Entwicklung",
      en: "Concept, UI/UX Design & Full-Stack Engineering",
    },
    year: "2026",
    liveUrl: "https://checkpot-hietzing.at/",
    image: "/assets/projects/checkpot/checkpot-redesign-desktop-authentic.png",
    imageAlt: {
      de: "Checkpot Hietzing Modeboutique Webpräsenz mit editorialem Lookbook",
      en: "Checkpot Hietzing fashion boutique digital showcase featuring minimal editorial lookbook",
    },
    hasCaseStudy: true,
    tags: ["Next.js", "Tailwind CSS", "Neon PostgreSQL", "Cloudflare Workers", "Cloudflare R2", "Resend"],
    isPreviewFixture: false,
  },
  {
    id: "project-let-it-bloom",
    slug: "let-it-bloom",
    kind: "client_project",
    status: "published",
    indexNumber: "02",
    title: "Let It Bloom",
    descriptor: {
      de: "Florales Atelier & Mini-CMS",
      en: "Floral Atelier & Mini-CMS",
    },
    categoryLabel: {
      de: "Kundenprojekt · Webdesign, Next.js",
      en: "Client Project · Web Design, Next.js",
    },
    summary: {
      de: "Editorialer One-Pager für ein Wiener Floristik-Atelier mit passwortgeschütztem Mini-CMS für saisonale Werkstücke, optimierter Bildergalerie und Cookie-Präferenzverwaltung.",
      en: "Bespoke editorial one-pager for a Vienna floral atelier featuring a password-protected mini-CMS for seasonal arrangements, dynamic gallery, and cookie preferences management.",
    },
    role: {
      de: "Design, Bildkuration & Fullstack-Entwicklung",
      en: "Design, Image Curation & Full-Stack Engineering",
    },
    year: "2026",
    liveUrl: "https://www.letitbloom.at/",
    image: "/assets/projects/let-it-bloom/let-it-bloom-desktop-authentic.png",
    imageAlt: {
      de: "Let It Bloom Floristik Webauftritt mit floraler Ästhetik und saisonalen Angeboten",
      en: "Let It Bloom floral atelier website with seasonal arrangements and curated imagery",
    },
    hasCaseStudy: true,
    tags: ["Next.js 15", "React 19", "Tailwind CSS v4", "Vercel KV / Redis", "Vercel Blob", "Web3Forms"],
    isPreviewFixture: false,
  },
  {
    id: "project-fkw-g",
    slug: "fkw-g",
    kind: "client_project",
    status: "published",
    indexNumber: "03",
    title: "FKW-G",
    descriptor: {
      de: "Barrierearmes Vereinsportal & WordPress-Theme",
      en: "Accessible NGO Portal & Custom WordPress Theme",
    },
    categoryLabel: {
      de: "Kundenprojekt · NGO, Barrierearmes Design",
      en: "Client Project · NGO, Accessible Design",
    },
    summary: {
      de: "Maßgeschneidertes, barrierearmes WordPress-Theme für einen österreichischen Förderverein für Menschen mit Behinderung, gestaltet mit kontrastreicher Typografie, Spendenanbindung und Dokumenten-Downloads.",
      en: "Custom accessible WordPress theme engineered for an Austrian NGO supporting individuals with physical disabilities, designed with high-contrast typography, donation flows, and document downloads.",
    },
    role: {
      de: "UI-Design, zugängliche Typografie & Theme-Entwicklung",
      en: "UI Design, Accessible Typography & Theme Development",
    },
    year: "2025",
    liveUrl: "https://github.com/King-ElWebo/fkw-g",
    image: "/assets/projects/fkw-g/fkw-desktop-authentic.png",
    imageAlt: {
      de: "Barrierearme Portalseite der Friedrich-Karl-Weniger-Gesellschaft mit klaren Kontrasten und Spendenbereich",
      en: "Accessible portal of the Friedrich-Karl-Weniger-Gesellschaft with clear contrasts and donation flow",
    },
    hasCaseStudy: true,
    tags: ["WordPress", "PHP", "Tailwind CSS", "Barrierearmes Design", "PayPal"],
    isPreviewFixture: false,
  },
  {
    id: "concept-lumenwerk",
    slug: "lumenwerk-studio",
    kind: "independent_concept",
    status: "published",
    indexNumber: "04",
    title: "LUMENWERK Studio",
    descriptor: {
      de: "Skulpturales Licht & Interaktiver Konfigurator",
      en: "Architectural Lighting & Studio Showcase",
    },
    categoryLabel: {
      de: "The Lab · Commerce, Konfigurator",
      en: "The Lab · Commerce, Configurator",
    },
    summary: {
      de: "Eigenständiges Atelier-Showcase für architektonisches Licht mit interaktivem Leuchten-Konfigurator (Lichtfarben & Materialien), getrennter B2B-Händleransicht und statischem Export.",
      en: "Independent architectural lighting showcase with an interactive luminaire configurator (color temperatures & materials), separate B2B dealer portal, and static export.",
    },
    role: {
      de: "Art Direction, Interaktionsdesign & Frontend-Architektur",
      en: "Art Direction, Interaction Design & Frontend Architecture",
    },
    year: "2026",
    liveUrl: "https://github.com/King-ElWebo/Demo-leuchten-online-shop",
    image: "/assets/projects/lumenwerk/lumenwerk-desktop-authentic.png",
    imageAlt: {
      de: "Atmosphärisches Atelier für skulpturale Leuchten mit warmem architektonischem Licht",
      en: "Atmospheric studio for architectural sculptural lighting with warm illumination",
    },
    hasCaseStudy: true,
    tags: ["Next.js 16", "Tailwind CSS", "Konfigurator", "Barrierearmes UI", "Static Export"],
    isPreviewFixture: false,
  },
  {
    id: "concept-speiche",
    slug: "speiche-werkstattmanager",
    kind: "independent_concept",
    status: "published",
    indexNumber: "05",
    title: "SPEICHE",
    descriptor: {
      de: "Fahrrad-Werkstattmanager & Fachsoftware",
      en: "Bicycle Workshop Management System",
    },
    categoryLabel: {
      de: "The Lab · Web-App, Fachsoftware",
      en: "The Lab · Web App, Specialist ERP",
    },
    summary: {
      de: "Eigenständiges Konzept einer datendichten Fachanwendung für Fahrradwerkstätten mit robuster Client-Side-Zustandsführung, Auftragsabwicklung, Teileverwaltung und Zeiterfassung.",
      en: "Independent concept for a high-density bicycle repair management app featuring client-side state, order processing, parts inventory, and work-time logging.",
    },
    role: {
      de: "Informationsarchitektur, UI-Design & Anwendungsentwicklung",
      en: "Information Architecture, UI Design & Application Engineering",
    },
    year: "2026",
    liveUrl: "https://github.com/King-ElWebo/Werkstattmanager-Demo",
    image: "/assets/projects/speiche/speiche-desktop-authentic.png",
    imageAlt: {
      de: "Übersichtliche Benutzeroberfläche des Werkstattmanagers SPEICHE mit Auftragsstatus und Werkstattplanung",
      en: "Operational interface of the SPEICHE workshop management app showing repair jobs and scheduling",
    },
    hasCaseStudy: true,
    tags: ["React 19", "Next.js", "Tailwind CSS", "Lokaler Zustand", "Fachanwendung"],
    isPreviewFixture: false,
  },
  {
    id: "concept-roestwerk",
    slug: "roestwerk-1070",
    kind: "independent_concept",
    status: "published",
    indexNumber: "06",
    title: "RÖSTWERK 1070",
    descriptor: {
      de: "Mikrorösterei, Geschmacksfinder & Brührechner",
      en: "Specialty Coffee Showcase & Sensory Tools",
    },
    categoryLabel: {
      de: "The Lab · E-Commerce, Sensorik",
      en: "The Lab · E-Commerce, Sensory Tools",
    },
    summary: {
      de: "Eigenständiges Marken- und Produkt-Showcase für eine Wiener Mikrorösterei mit interaktivem Sensorik-Finder und dynamischem Brührechner für Filter und Siebträger.",
      en: "Independent brand and product showcase concept for a Vienna specialty micro-roastery featuring an interactive flavor radar and dynamic brewing ratio calculator.",
    },
    role: {
      de: "Brand Identity, UX-Konzept & Frontend-Engineering",
      en: "Brand Identity, UX Concept & Frontend Engineering",
    },
    year: "2026",
    liveUrl: "https://github.com/King-ElWebo/Kaffeer-sterei-Demo",
    image: "/assets/projects/roestwerk/roestwerk-desktop-authentic.png",
    imageAlt: {
      de: "Kaffeebohnen und Rösthandwerk im RÖSTWERK 1070 in Wien Neubau",
      en: "Specialty coffee roasting craft and beans at RÖSTWERK 1070 in Vienna",
    },
    hasCaseStudy: true,
    tags: ["Next.js", "React 19", "Tailwind CSS", "Sensorik-Finder", "Brührechner"],
    isPreviewFixture: false,
  },
  {
    id: "concept-kern-field",
    slug: "kern-field",
    kind: "independent_concept",
    status: "published",
    indexNumber: "07",
    title: "KERN / FIELD",
    descriptor: {
      de: "Architektur-Portfolio & Räumliche Monografie",
      en: "Architecture Studio & Spatial Monograph",
    },
    categoryLabel: {
      de: "The Lab · Editorial, Architektur",
      en: "The Lab · Editorial, Architecture",
    },
    summary: {
      de: "Eigenständiges, typografisch diszipliniertes Werkverzeichnis für ein zeitgenössisches Architekturbüro mit asymmetrischem Bildraster und responsiver Art Direction.",
      en: "Independent architectural portfolio concept emphasizing editorial typography, asymmetric imagery, and responsive spatial rhythm.",
    },
    role: {
      de: "Editorial Design, Layout-Konzept & Frontend-Entwicklung",
      en: "Editorial Design, Layout Concept & Frontend Engineering",
    },
    year: "2026",
    liveUrl: "https://github.com/King-ElWebo/Architecture-Demo",
    image: "/assets/projects/kern-field/kern-field-desktop-authentic.png",
    imageAlt: {
      de: "Zeitgenössische Architektur in stiller Natur mit Kiefern und Naturstein",
      en: "Contemporary residential architecture set among pines and natural stone",
    },
    hasCaseStudy: true,
    tags: ["Next.js", "Tailwind CSS", "Editorial Grid", "Architektur", "Responsive Art Direction"],
    isPreviewFixture: false,
  },
];

/**
 * Clearly identifiable local preview fixtures matching the approved Variant C design.
 * These exist solely to validate the visual layout, grid cadence, and responsiveness
 * in development until real project assets and copy are confirmed.
 *
 * Each fixture is strictly flagged with `isPreviewFixture: true` and `status: "preview_fixture"`.
 */
export const PREVIEW_FIXTURES: ProjectEntry[] = [
  {
    id: "fixture-01",
    slug: "aura-luxury-commerce",
    kind: "client_project",
    status: "preview_fixture",
    indexNumber: "01",
    title: "Aura",
    descriptor: {
      de: "Luxus-Commerce, Design System",
      en: "Luxury Commerce, Design System",
    },
    categoryLabel: {
      de: "Kundenprojekt · Brand, Plattform",
      en: "Client Project · Brand, Platform",
    },
    summary: {
      de: "Design System & globale Omnichannel-Flagship-Plattform.",
      en: "Design system & global omnichannel digital flagship.",
    },
    role: {
      de: "Art Direction & Fullstack Engineering",
      en: "Art Direction & Fullstack Engineering",
    },
    year: "2025",
    image: "/assets/projects/bloom/selected-work-1080.webp",
    imageAlt: {
      de: "Minimalistisches High-End Fashion E-Commerce Interface in architektonischer Galerie-Ästhetik",
      en: "Minimalist luxury fashion e-commerce interface mockup in an obsidian gallery setting",
    },
    hasCaseStudy: false,
    tags: ["E-Commerce", "Design System", "Next.js", "Tailwind"],
    isPreviewFixture: true,
  },
  {
    id: "fixture-02",
    slug: "civic-archival-publishing",
    kind: "client_project",
    status: "preview_fixture",
    indexNumber: "02",
    title: "Civic",
    descriptor: {
      de: "Archiv-Publikation, NGO Portal",
      en: "Archival Publishing, NGO Portal",
    },
    categoryLabel: {
      de: "Kundenprojekt · Architektur, React",
      en: "Client Project · Architecture, React",
    },
    summary: {
      de: "Kultur- & Menschenrechtsportal mit historischem Dokumenten-Viewer.",
      en: "NGO human rights portal with historical book and document viewer.",
    },
    role: {
      de: "Informationsarchitektur & Frontend-Systeme",
      en: "Information Architecture & Frontend Systems",
    },
    year: "2025",
    image: "/assets/projects/checkpot/selected-work-1080.webp",
    imageAlt: {
      de: "Digitales Archiv- und Lese-Interface mit historischen Manuskripten und editorialem Satzspiegel",
      en: "Digital archive reading platform with historical manuscripts and editorial grid typesetting",
    },
    hasCaseStudy: false,
    tags: ["Editorial", "Archival", "React", "Typography"],
    isPreviewFixture: true,
  },
  {
    id: "fixture-03",
    slug: "telematics-fleet-operations",
    kind: "client_project",
    status: "preview_fixture",
    indexNumber: "03",
    title: "Telematics",
    descriptor: {
      de: "Flottenbetrieb, Live Buchung",
      en: "Fleet Operations, Live Booking",
    },
    categoryLabel: {
      de: "Kundenprojekt · Produkt, Cloud UI",
      en: "Client Project · Product, Cloud UI",
    },
    summary: {
      de: "Echtzeit-Reservierungsplattform und Flottenmanagement mit Routen-Graph.",
      en: "Live automotive reservation platform & real-time telemetry route graph.",
    },
    role: {
      de: "Product Design & Cloud API Architecture",
      en: "Product Design & Cloud API Architecture",
    },
    year: "2024",
    image: "/assets/projects/speiche/selected-work-1080.webp",
    imageAlt: {
      de: "Dunkle Telematik-Benutzeroberfläche mit GPS-Vektoren und Fahrzeugstatus",
      en: "Dark automotive telematics interface screen showing GPS vectors and telemetry status",
    },
    hasCaseStudy: false,
    tags: ["Product Design", "Cloud Systems", "Mobility", "Dashboard"],
    isPreviewFixture: true,
  },
  {
    id: "fixture-04",
    slug: "waveform-spatial-audio",
    kind: "independent_concept",
    status: "preview_fixture",
    indexNumber: "04",
    title: "Waveform",
    descriptor: {
      de: "Spatial Audio, Partikel-Canvas",
      en: "Spatial Audio, Particle Canvas",
    },
    categoryLabel: {
      de: "The Lab · WebGL, GLSL Shader",
      en: "The Lab · WebGL, GLSL Shaders",
    },
    summary: {
      de: "Generatives 3D-Partikelfeld gesteuert durch akustische Frequenzen.",
      en: "Generative particle canvas driven by acoustic frequencies & GPU shaders.",
    },
    role: {
      de: "Creative Coding & Shader Entwicklung",
      en: "Creative Coding & Shader Development",
    },
    year: "2026",
    image: "/assets/projects/lumenwerk/selected-work-1080.webp",
    imageAlt: {
      de: "Interaktive generative Audiowellen-Simulation mit goldenen Partikelströmen im dunklen Raum",
      en: "Interactive generative audio waveform simulation with dense golden particle strands",
    },
    hasCaseStudy: false,
    tags: ["The Lab", "WebGL", "Three.js", "GLSL Shaders", "WebAudio"],
    isPreviewFixture: true,
  },
  {
    id: "fixture-05",
    slug: "enterprise-analytical-ui",
    kind: "client_project",
    status: "preview_fixture",
    indexNumber: "05",
    title: "Enterprise",
    descriptor: {
      de: "Analytische UI, Desktop Tool",
      en: "Analytical UI, Desktop Tool",
    },
    categoryLabel: {
      de: "Kundenprojekt · Software, Desktop",
      en: "Client Project · Software, Desktop",
    },
    summary: {
      de: "Multi-Pane-Workstation für quantitative Daten- und Geschäftsanalysen.",
      en: "Multi-pane quantitative financial database and reporting workstation.",
    },
    role: {
      de: "Datenbank-Architektur & Desktop UI",
      en: "Database Architecture & Desktop UI",
    },
    year: "2024",
    image: "/assets/projects/kern-field-hero.webp",
    imageAlt: {
      de: "Dichtes Interface für Finanz- und Unternehmensanalysen mit tabellarischen Rastern",
      en: "High-density analytical financial software interface with multi-pane data grids",
    },
    hasCaseStudy: false,
    tags: ["Desktop App", "Data Systems", "PostgreSQL", "Systems"],
    isPreviewFixture: true,
  },
  {
    id: "fixture-06",
    slug: "roastery-algorithmic-coffee",
    kind: "independent_concept",
    status: "preview_fixture",
    indexNumber: "06",
    title: "Roastery",
    descriptor: {
      de: "Algorithmischer Kaffee, Sensorik-Radar",
      en: "Algorithmic Coffee, Sensory Radar",
    },
    categoryLabel: {
      de: "The Lab · Interaktives Konzept",
      en: "The Lab · Interactive Concept",
    },
    summary: {
      de: "5-Achsen-Geschmacksradar und parametrisches Verpackungssystem für Spezialitätenkaffee.",
      en: "Sensory 5-axis flavor radar & generative packaging system for specialty coffee.",
    },
    role: {
      de: "Brand Strategy, Interface & Prototyping",
      en: "Brand Strategy, Interface & Prototyping",
    },
    year: "2025",
    image: "/assets/projects/roestwerk/selected-work-1080.webp",
    imageAlt: {
      de: "Kaffeeverpackungs-Mockup mit minimalistischem sensorischem Radar-Diagramm",
      en: "Artisanal specialty coffee packaging mockups alongside a minimal sensory radar chart",
    },
    hasCaseStudy: false,
    tags: ["The Lab", "Brand", "Radar UI", "Generative Design"],
    isPreviewFixture: true,
  },
];

export interface GetProjectsOptions {
  /** If true, explicitly selects preview fixtures instead of approved projects */
  includeFixtures?: boolean;
  /** Filter by category */
  filter?: ProjectFilterCategory;
}

/**
 * Returns projects according to active publication status and category filter.
 */
export function getProjects(options: GetProjectsOptions = {}): ProjectEntry[] {
  const { includeFixtures = false, filter = "all" } = options;

  const dataset = includeFixtures
    ? PREVIEW_FIXTURES
    : APPROVED_PROJECTS.length > 0
    ? APPROVED_PROJECTS
    : PREVIEW_FIXTURES;

  if (filter === "all") {
    return dataset;
  }

  return dataset.filter((project) => project.kind === filter);
}

/**
 * Calculates dynamic counts across categories for the active dataset.
 */
export function getProjectCounts(includeFixtures = false) {
  const dataset = includeFixtures
    ? PREVIEW_FIXTURES
    : APPROVED_PROJECTS.length > 0
    ? APPROVED_PROJECTS
    : PREVIEW_FIXTURES;

  const all = dataset.length;
  const client = dataset.filter((p) => p.kind === "client_project").length;
  const lab = dataset.filter((p) => p.kind === "independent_concept").length;

  return { all, client, lab };
}
