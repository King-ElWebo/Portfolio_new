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
    image: "/assets/projects/checkpot-hero.png",
    imageAlt: {
      de: "Checkpot Hietzing Modeboutique Webpräsenz mit editorialem Lookbook",
      en: "Checkpot Hietzing fashion boutique digital showcase featuring minimal editorial lookbook",
    },
    hasCaseStudy: false,
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
    image: "/assets/projects/letitbloom-hero.png",
    imageAlt: {
      de: "Let It Bloom Floristik Webauftritt mit floraler Ästhetik und saisonalen Angeboten",
      en: "Let It Bloom floral atelier website with seasonal arrangements and curated imagery",
    },
    hasCaseStudy: false,
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
    image: "/assets/projects/fkw-preview.png",
    imageAlt: {
      de: "Barrierearme Portalseite der Friedrich-Karl-Weniger-Gesellschaft mit klaren Kontrasten und Spendenbereich",
      en: "Accessible portal of the Friedrich-Karl-Weniger-Gesellschaft with clear contrasts and donation flow",
    },
    hasCaseStudy: false,
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
    image: "/assets/projects/lumenwerk-hero.jpg",
    imageAlt: {
      de: "Atmosphärisches Atelier für skulpturale Leuchten mit warmem architektonischem Licht",
      en: "Atmospheric studio for architectural sculptural lighting with warm illumination",
    },
    hasCaseStudy: false,
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
    image: "/assets/projects/speiche-preview.png",
    imageAlt: {
      de: "Übersichtliche Benutzeroberfläche des Werkstattmanagers SPEICHE mit Auftragsstatus und Werkstattplanung",
      en: "Operational interface of the SPEICHE workshop management app showing repair jobs and scheduling",
    },
    hasCaseStudy: false,
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
    image: "/assets/projects/roestwerk-hero.jpg",
    imageAlt: {
      de: "Kaffeebohnen und Rösthandwerk im RÖSTWERK 1070 in Wien Neubau",
      en: "Specialty coffee roasting craft and beans at RÖSTWERK 1070 in Vienna",
    },
    hasCaseStudy: false,
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
    image: "/assets/projects/kern-field-hero.webp",
    imageAlt: {
      de: "Zeitgenössische Architektur in stiller Natur mit Kiefern und Naturstein",
      en: "Contemporary residential architecture set among pines and natural stone",
    },
    hasCaseStudy: false,
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
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBujPG_ARb2VFYUxkskniXRbz5cAUW9i6h__6p4cR1MT6f5bXhG-tM9J3k4TCq1EgSCPgvMS8fx4djfTYEkZaEvGe2aq-fDQh-jqBnoHOY-4oeiPc5LYM8JJtsIKP_TM2m-uWNzhdSnRB7_sftKS7czYhBUhkwSf-xYyrCowQ6foSFMGeYqpAYxWJUwEfaD39B-QbP4wI3HdzrZml4jSZTsvGTFio7YYD0_n9oA-Th8gsXei4bDqyidGXaXMrk0kKyE4PYptVvB0vA",
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
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCOyvpqNcYj-TJlablzaOzOcgy3MQwWOTBZE4q0zTs5FAUbfDQm-DK_UBH8_tjlioFQ8cwveTqliEFgeAWVIaZbbFRlde34B5VBCS0-RUNIQPUGT2hq6TeJ8S3LsTCHAf7a3lgkNwzKA75wRa2Ls-ofpBc_YoUDawDnnqnW5xM5yn5h5DL5l1y28_E5WaDhvBArFRkVVvxNxZl-aICrOlkN4WWGPp-ThBXwLtKwmmW_RobcxY0CbbK7f-7w5c-dFw7PavTRD-qQJLU",
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
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAmO9cobZWGGsc1idk6CMS7VPSs4tK5fUKfacd3ojmZq123ZD45S0lUzjNw1OtObb7jiDlNNc-6XLpsWUNY3aZEGwpxxHm607i94qkMDf_1egbdYrqbocnfJf9tVNvPoF3GRjClN3Ymp7HLd13ZY1w81G5v8W7eivnNzDI322OfX6MWqb3F2c6fSDL7QgiryK8c_B8YZtp6l2U8Z5seJAea9-dzfSb288ZxeqTNX9K3LL92izBnAhdkO6JBEQwwyE8mymlnRIo3ZRY",
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
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuARXjTAOIFOHDHUlvU9Sy001R3NJtNUpsyYQzSjL-HTsN2IKKhGe5X9k81QZ-fkPG-ZA2NNgM67NpMyi5xCBM81u1W1vwTegbJkkHiXlCux2I5KZxuiqX5sOfsOuk6DRQa5cKLMrWn_51lH1QFzOADPTO8nkCtm7p5u-iRhnmi1bWtK0GD5Zb-SvuHaiNrqBSOK7gcoksVqZP8cFTLaEUcocMSfSRV4ZiAYYUpZ8TmRucthp3-6jySAbSUhOz4ENM4VEEB9kkQ9Un4",
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
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBwKYNu1c8VYtJqlayIwAQ9bakEVqrMMUrS8qHd9CKM0IFAEWuXNZPIewhI3sX5ISyzYvBl46qbh8i64eoPXaI54gsuZJ9nJYdfx9sEc3RvzaefTXZv5H10WIQbcsbqV0TCVcTTMsLTemVjGIC85GPDgxZuqtUvdNpFcMx8u3yMhs_ucxQtsVbjcnj3NFGs2XXjEq6jcO0syp665fZeXpyylH8t8QMJXJR8Vpvfa2OwaM3eIiNmixyXVhg-jGUyKxVj5HEIUbPuJ9Q",
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
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAfUBGUrfVkkGs1ZeI4ViuEAy5DIwr_J3wgWf-ue1B3PrHYS-vH52ToKbhbYL7zT8BU3oAYH7x7Qz1mQcmGcpKBUrQqIeF7xLUtGiCCR7xSoDTmxWM8-OKLZZM4MVLwcn4lcBBlqOO7U_7VWcwCn7tXRyqgxGjzX2Nqs8nNDc0hM-WH4KX9ezVmJKo1Rq25cOqefg78gugVrybepwIiEXqkIl_TTYBff-vBGHAaayv7O4c84DuLhhU4qn4Ok6243t6b3eu29-zg-6s",
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
