export type Locale = "de" | "en";

export interface Project01 {
  badge: string;
  title: string;
  tags: string[];
  meta: string;
}

export interface Project02 {
  badge: string;
  title: string;
  description: string;
  tags: string[];
}

export interface Project03 {
  badge: string;
  title: string;
  tags: string[];
  visualBadge: string;
  kicker: string;
  calloutTitle: string;
  description: string;
  statusLeft: string;
  statusRight: string;
}

export interface CapabilityRow {
  code: string;
  title: string;
  description: string;
  tags: string[];
}

export interface CollaborationRow {
  code: string;
  title: string;
  description: string;
}

export interface LabCard {
  badge: string;
  title: string;
  description: string;
  tech: string;
  action: string;
}

export interface Translations {
  meta: {
    title: string;
    description: string;
  };
  header: {
    brand: string;
    role: string;
    navWork: string;
    navCapabilities: string;
    navPractitioner: string;
    navLab: string;
    navContact: string;
    switchLang: string;
  };
  hero: {
    kicker: string;
    headlinePart1: string;
    headlineItalic: string;
    headlinePart2: string;
    subheadline: string;
    cta: string;
    bottomTag: string;
    bottomScroll: string;
  };
  work: {
    kicker: string;
    subtitle: string;
    project01: Project01;
    project02: Project02;
  };
  workArchive: {
    metaTitle: string;
    metaDescription: string;
    pageTitle: string;
    filterAll: string;
    filterClient: string;
    filterLab: string;
    viewCaseStudy: string;
    viewExperiment: string;
    caseStudyPlanned: string;
    curatorialStatement: string;
    previewNotice: string;
    emptyStateTitle: string;
    emptyStateDescription: string;
    previewBadge: string;
  };
  bridge: {
    project03: Project03;
    heading: string;
  };
  capabilities: {
    kicker: string;
    badge: string;
    headline: string;
    subline: string;
    rows: CapabilityRow[];
  };
  practitioner: {
    kicker: string;
    portraitLabel: string;
    portraitSubtext: string;
    figureCaption: string;
    quote: string;
    p1: string;
    p2: string;
    corePracticeLabel: string;
    corePracticeValue: string;
    focusLabel: string;
    focusValue: string;
  };
  collaboration: {
    kicker: string;
    badge: string;
    headline: string;
    rows: CollaborationRow[];
  };
  lab: {
    kicker: string;
    badge: string;
    headline: string;
    cards: LabCard[];
  };
  contact: {
    kicker: string;
    headline: string;
    subline: string;
    directLabel: string;
    directEmail: string;
    networkLabel: string;
    networkUrl: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submitBtn: string;
      submittingBtn: string;
      successMsg: string;
    };
    colophon: string;
  };
  footer: {
    brand: string;
    tagline: string;
    rights: string;
    email: string;
    linkedin: string;
    legal: string;
  };
}

export const translations: Record<Locale, Translations> = {
  en: {
    meta: {
      title: "D3 — Refined Cinematic Editorial Portfolio | Wilk Studio & Lab",
      description: "Designing thoughtful digital interfaces and engineering robust software systems from concept to production.",
    },
    header: {
      brand: "WILK",
      role: "— Digital Designer & Software Developer",
      navWork: "Work",
      navCapabilities: "Capabilities",
      navPractitioner: "Practitioner",
      navLab: "The Lab",
      navContact: "Contact",
      switchLang: "DE / EN",
    },
    hero: {
      kicker: "[ DIGITAL DESIGNER & SOFTWARE DEVELOPER ]",
      headlinePart1: "FROM IDEA TO",
      headlineItalic: "DIGITAL",
      headlinePart2: "EXPERIENCE.",
      subheadline: "Designing thoughtful digital interfaces and engineering robust software systems from concept to production.",
      cta: "Explore Selected Work",
      bottomTag: "WILK // CRAFT & SYSTEMS ARCHITECTURE",
      bottomScroll: "SCROLL TO EXPLORE WORK",
    },
    work: {
      kicker: "01 / SELECTED WORK",
      subtitle: "— CURATED ARCHIVE",
      project01: {
        badge: "[Client Project — Boutique Showcase]",
        title: "Checkpot Hietzing — Fashion Boutique & Custom CMS",
        tags: ["Next.js", "Tailwind CSS", "Neon PostgreSQL", "Cloudflare Workers"],
        meta: "PROD DEPLOYMENT // NEXT.JS · TAILWIND · CLOUDFLARE WORKERS",
      },
      project02: {
        badge: "[Client Project — Floral Atelier]",
        title: "Let It Bloom — Vienna Floral Atelier & Mini-CMS",
        description: "Bespoke digital presence for a Vienna floral atelier featuring a password-protected mini-CMS for seasonal selections and curated photography.",
        tags: ["Next.js 15", "React 19", "Tailwind CSS v4", "Vercel KV / Blob"],
      },
    },
    workArchive: {
      metaTitle: "Projects — WILK // Digital Designer & Software Developer",
      metaDescription: "Curated portfolio index of commissioned digital products, brand flagships, and computational experiments.",
      pageTitle: "Projects",
      filterAll: "All",
      filterClient: "Client Projects",
      filterLab: "The Lab",
      viewCaseStudy: "View Case Study",
      viewExperiment: "View Experiment",
      caseStudyPlanned: "Case Study in Preparation",
      curatorialStatement: "Selected client commissions and independent computational research. Crafted with architectural discipline, accessible ergonomics, and rigorous engineering.",
      previewNotice: "Preview Mode — Illustrative Project Candidates (Real content in verification)",
      emptyStateTitle: "No Published Projects in this Category",
      emptyStateDescription: "Client work and lab studies are currently undergoing verification before publication.",
      previewBadge: "Illustrative Preview Fixture",
    },
    bridge: {
      project03: {
        badge: "[Independent Concept / Specialist ERP]",
        title: "SPEICHE — Bicycle Workshop Management System",
        tags: ["Information Architecture", "State Systems", "Specialist ERP"],
        visualBadge: "REACT 19 // OFFLINE-FIRST CLIENT STATE",
        kicker: "INDEPENDENT CONCEPT & ARCHITECTURE",
        calloutTitle: "Focused software craftsmanship without SaaS bloat",
        description: "An independent specialist application concept examining dense bicycle repair workflows: robust client-side state, repair tracking, parts inventory, and work-time logging.",
        statusLeft: "STATUS: INDEPENDENT CONCEPT / DEMO",
        statusRight: "SPEC_READY",
      },
      heading: "CRAFT & METHODOLOGY",
    },
    capabilities: {
      kicker: "02 / CAPABILITIES",
      badge: "CORE PRACTICE",
      headline: "How ideas become working software.",
      subline: "A unified practice eliminating the gap between design vision and software execution.",
      rows: [
        {
          code: "01 // WEB",
          title: "Websites & Commerce",
          description: "Thoughtful websites, commerce platforms, and digital experiences combining strong visual direction with reliable implementation.",
          tags: ["[UX]", "[UI]", "[Motion]", "[Frontend]"],
        },
        {
          code: "02 // SYS",
          title: "Apps & Business Systems",
          description: "Custom applications, internal tools, and systems designed around clear workflows and real operational needs.",
          tags: ["[UI]", "[Frontend]", "[Backend]", "[Data]"],
        },
        {
          code: "03 // INT",
          title: "AI & Automation",
          description: "Useful AI integrations, intelligent interfaces, and automated workflows where they genuinely improve the product.",
          tags: ["[UX]", "[AI]", "[Frontend]"],
        },
      ],
    },
    practitioner: {
      kicker: "03 / PRACTITIONER",
      portraitLabel: "[AUTHENTIC STUDIO PORTRAIT]",
      portraitSubtext: "Workspace & practitioner portrait",
      figureCaption: "FIGURE 01 — PRACTITIONER // WILK",
      quote: "“I care about how things work just as much as how they look.”",
      p1: "Bridging visual art direction and modern software engineering as a single craftsperson. Eliminating the friction between concept and execution.",
      p2: "Working across the full lifecycle from interface typography and interaction dynamics to production software architecture. Code is treated not as a secondary implementation phase, but as the raw material for design validation.",
      corePracticeLabel: "CORE PRACTICE",
      corePracticeValue: "Design & Software Engineering",
      focusLabel: "FOCUS",
      focusValue: "Web Platforms / Interactive Systems",
    },
    collaboration: {
      kicker: "04 / COLLABORATION",
      badge: "ENGAGEMENT",
      headline: "Flexible collaboration across the project lifecycle.",
      rows: [
        {
          code: "01 // DIRECT",
          title: "Independent Projects",
          description: "Leading end-to-end design and software development from brief to deployment. Ideal for flagships, founder platforms, and bespoke digital ventures.",
        },
        {
          code: "02 // STUDIO",
          title: "Agency Collaboration",
          description: "Partnering with creative studios and agencies on senior design engineering and interactive builds where visual fidelity cannot be compromised.",
        },
        {
          code: "03 // EMBEDDED",
          title: "Existing Product Teams",
          description: "Embedding into product and engineering teams for complex UI systems or core feature initiatives requiring refined craft and performance precision.",
        },
      ],
    },
    lab: {
      kicker: "05 / THE LAB",
      badge: "EXPERIMENTS & SKETCHES",
      headline: "Creative computation, shader experiments, and interaction prototypes.",
      cards: [
        {
          badge: "[INTERACTIVE EXPERIMENT]",
          title: "Halftone Shaders & WebGPU Trail",
          description: "Procedural dot grids driven by cursor turbulence and inertial dampening shaders for fluid dynamic typography.",
          tech: "GLSL / WGSL",
          action: "DEMO",
        },
        {
          badge: "[WEBGL STUDY]",
          title: "Dynamic Surface & Material Physics",
          description: "Real-time material reflection models, anisotropic microfacet simulations, and inertial spring interaction kinetics.",
          tech: "THREE.JS / PBR",
          action: "RUN",
        },
        {
          badge: "[MOTION PROTOTYPE]",
          title: "Kinetic Variable Typography",
          description: "Variable font axis deformation tethered to viewport scroll velocity and directional inertia curves.",
          tech: "OPEN-TYPE / WASM",
          action: "INSPECT",
        },
      ],
    },
    contact: {
      kicker: "06 / CONTACT",
      headline: "Let’s build something considered.",
      subline: "Open to select projects and engineering engagements.",
      directLabel: "DIRECT INQUIRIES:",
      directEmail: "wilk@studio.lab",
      networkLabel: "NETWORK:",
      networkUrl: "linkedin.com/in/wilk-studio",
      form: {
        nameLabel: "01 // NAME OR ORGANIZATION",
        namePlaceholder: "e.g. Katherine Vance",
        emailLabel: "02 // ELECTRONIC MAIL",
        emailPlaceholder: "katherine@vance.com",
        messageLabel: "03 // INQUIRY SUMMARY & SCOPE",
        messagePlaceholder: "Brief overview of project objectives, timeline, or technical challenges...",
        submitBtn: "SEND INQUIRY",
        submittingBtn: "SENDING...",
        successMsg: "Thank you for your message. I will respond promptly.",
      },
      colophon: "Designed & Developed by Wilk. Running on Edge Infrastructure. Built with semantic web standards.",
    },
    footer: {
      brand: "WILK",
      tagline: "— DESIGN & CODE",
      rights: "© 2025 Wilk. All rights reserved.",
      email: "Email",
      linkedin: "LinkedIn",
      legal: "Legal Notes",
    },
  },
  de: {
    meta: {
      title: "D3 — Verfeinertes Cinematic Editorial Portfolio | Wilk Studio & Lab",
      description: "Gestaltung durchdachter digitaler Interfaces und Entwicklung robuster Softwaresysteme vom Konzept bis zur Produktion.",
    },
    header: {
      brand: "WILK",
      role: "— Digital Designer & Software Developer",
      navWork: "Arbeiten",
      navCapabilities: "Kompetenzen",
      navPractitioner: "Profil",
      navLab: "Labor",
      navContact: "Kontakt",
      switchLang: "DE / EN",
    },
    hero: {
      kicker: "[ DIGITAL DESIGNER & SOFTWARE DEVELOPER ]",
      headlinePart1: "VON DER IDEE ZUR",
      headlineItalic: "DIGITALEN",
      headlinePart2: "ERFAHRUNG.",
      subheadline: "Gestaltung durchdachter digitaler Interfaces und Entwicklung robuster Softwaresysteme vom Konzept bis zur Produktion.",
      cta: "Ausgewählte Arbeiten ansehen",
      bottomTag: "WILK // HANDWERK & SYSTEMARCHITEKTUR",
      bottomScroll: "SCROLLEN ZU DEN ARBEITEN",
    },
    work: {
      kicker: "01 / AUSGEWÄHLTE ARBEITEN",
      subtitle: "— KURATIERTES ARCHIV",
      project01: {
        badge: "[Kundenprojekt — Boutique Webpräsenz]",
        title: "Checkpot Hietzing — Modeboutique & Custom CMS",
        tags: ["Next.js", "Tailwind CSS", "Neon PostgreSQL", "Cloudflare Workers"],
        meta: "PRODUKTIONS-DEPLOYMENT // NEXT.JS · TAILWIND · CLOUDFLARE WORKERS",
      },
      project02: {
        badge: "[Kundenprojekt — Florales Atelier]",
        title: "Let It Bloom — Floristik & Mini-CMS",
        description: "Bespoke digitale Präsenz für ein Wiener Floristik-Atelier mit passwortgeschütztem Mini-CMS für saisonale Werkstücke und Bildergalerie.",
        tags: ["Next.js 15", "React 19", "Tailwind CSS v4", "Vercel KV / Blob"],
      },
    },
    workArchive: {
      metaTitle: "Projekte — WILK // Digital Designer & Software Developer",
      metaDescription: "Kuratiertes Portfolio-Archiv aus realisierten Kundenprojekten, Flagship-Plattformen und interaktiven Konzepten.",
      pageTitle: "Projekte",
      filterAll: "Alle",
      filterClient: "Kundenprojekte",
      filterLab: "The Lab",
      viewCaseStudy: "Case Study ansehen",
      viewExperiment: "Experiment ansehen",
      caseStudyPlanned: "Case Study in Vorbereitung",
      curatorialStatement: "Ausgewählte Kundenaufträge und freie computergestützte Forschung. Entwickelt mit gestalterischer Disziplin, barrierefreier Ergonomie und verlässlicher Ingenieurskunst.",
      previewNotice: "Vorschau-Modus — Illustrative Projekt-Kandidaten (Reale Inhalte in Verifikation)",
      emptyStateTitle: "Keine veröffentlichten Projekte in dieser Kategorie",
      emptyStateDescription: "Kundenarbeiten und Labor-Studien durchlaufen derzeit die inhaltliche Freigabe vor der Veröffentlichung.",
      previewBadge: "Illustrativer Vorschau-Kandidat",
    },
    bridge: {
      project03: {
        badge: "[Unabhängiges Konzept / Fachsoftware]",
        title: "SPEICHE — Werkstattmanager & Betriebs-Applikation",
        tags: ["Informationsarchitektur", "Zustandsmanagement", "Fachanwendung"],
        visualBadge: "REACT 19 // OFFLINE-FIRST CLIENT STATE",
        kicker: "UNABHÄNGIGES KONZEPT & ARCHITEKTUR",
        calloutTitle: "Fokussierte Fachsoftware ohne SaaS-Banalität",
        description: "Ein eigenständiges Fachanwendungs-Konzept für Fahrradwerkstätten: Untersuchung dichter Arbeitsabläufe mit robuster lokaler Zustandsführung, Auftragsabwicklung, Teileverzeichnis und Zeiterfassung.",
        statusLeft: "STATUS: EIGENSTÄNDIGES KONZEPT / DEMO",
        statusRight: "SPEZ_READY",
      },
      heading: "CRAFT & METHODOLOGY",
    },
    capabilities: {
      kicker: "02 / KOMPETENZEN",
      badge: "KERNPRAXIS",
      headline: "Wie Ideen zu funktionierender Software werden.",
      subline: "Eine ganzheitliche Praxis, die den Spalt zwischen gestalterischer Vision und technischer Umsetzung schließt.",
      rows: [
        {
          code: "01 // WEB",
          title: "Websites & Commerce",
          description: "Durchdachte Websites, Commerce-Plattformen und digitale Erlebnisse, die klare gestalterische Führung mit zuverlässiger Umsetzung vereinen.",
          tags: ["[UX]", "[UI]", "[Motion]", "[Frontend]"],
        },
        {
          code: "02 // SYS",
          title: "Apps & Business-Systeme",
          description: "Individuelle Webanwendungen, interne Tools und Systeme, entwickelt entlang klarer Workflows und konkreter betrieblicher Anforderungen.",
          tags: ["[UI]", "[Frontend]", "[Backend]", "[Daten]"],
        },
        {
          code: "03 // INT",
          title: "KI & Automatisierung",
          description: "Sinnvolle KI-Integrationen, intelligente Interfaces und automatisierte Abläufe dort, wo sie das Produkt nachweislich verbessern.",
          tags: ["[UX]", "[KI]", "[Frontend]"],
        },
      ],
    },
    practitioner: {
      kicker: "03 / DAS PROFIL",
      portraitLabel: "[AUTHENTISCHES STUDIO-PORTRÄT]",
      portraitSubtext: "Arbeitsumgebung & Porträt",
      figureCaption: "ABBILDUNG 01 — PRAKTIKER // WILK",
      quote: "„Mich interessiert die Funktionsweise genauso sehr wie das Aussehen.“",
      p1: "Die Verbindung von visueller Art Direction und modernem Software-Engineering aus einer Hand. Beseitigung von Reibungsverlusten zwischen Konzept und Umsetzung.",
      p2: "Begleitung des gesamten Lebenszyklus von Interface-Typografie und Interaktionsdynamik bis hin zur Software-Architektur. Code ist kein nachgelagerter Schritt, sondern das Fundament gestalterischer Validierung.",
      corePracticeLabel: "KERNPRAXIS",
      corePracticeValue: "Design & Software-Engineering",
      focusLabel: "FOKUS",
      focusValue: "Web-Plattformen / Interaktive Systeme",
    },
    collaboration: {
      kicker: "04 / ZUSAMMENARBEIT",
      badge: "ENGAGEMENT",
      headline: "Flexible Zusammenarbeit über den gesamten Projektzyklus.",
      rows: [
        {
          code: "01 // DIREKT",
          title: "Eigenständige Projekte",
          description: "Ganzheitliche Begleitung von Design und Softwareentwicklung vom Briefing bis zum Deployment. Ideal für Flagships, Gründerplattformen und maßgeschneiderte Vorhaben.",
        },
        {
          code: "02 // STUDIO",
          title: "Agentur-Partnerschaften",
          description: "Zusammenarbeit mit Designstudios und Agenturen für anspruchsvolles Design Engineering und interaktive Umsetzungen mit höchster Detailtreue.",
        },
        {
          code: "03 // EINGEBETTET",
          title: "Bestehende Produktteams",
          description: "Verstärkung von Produkt- und Entwicklungsteams für komplexe UI-Systeme oder Kernfeatures mit hohem Anspruch an Handwerk und Performance.",
        },
      ],
    },
    lab: {
      kicker: "05 / DAS LABOR",
      badge: "EXPERIMENTE & SKIZZEN",
      headline: "Creative Coding, Shader-Experimente und Interaktions-Prototypen.",
      cards: [
        {
          badge: "[INTERAKTIVES EXPERIMENT]",
          title: "Halftone-Shader & WebGPU-Trail",
          description: "Prozedurale Punktraster, gesteuert durch Cursorturbulenz und Trägheitsdämpfungs-Shader für flüssige dynamische Typografie.",
          tech: "GLSL / WGSL",
          action: "DEMO",
        },
        {
          badge: "[WEBGL-STUDIE]",
          title: "Dynamische Oberflächen & Materialphysik",
          description: "Echtzeit-Materialreflexionsmodelle, anisotrope Simulationen und physikalische Federinteraktions-Kinetik.",
          tech: "THREE.JS / PBR",
          action: "START",
        },
        {
          badge: "[MOTION-PROTOTYP]",
          title: "Kinetische Variable Typografie",
          description: "Schriftachsen-Deformation gekoppelt an Scroll-Geschwindigkeit und Trägheitskurven des Viewports.",
          tech: "OPEN-TYPE / WASM",
          action: "INSPEKTION",
        },
      ],
    },
    contact: {
      kicker: "06 / KONTAKT",
      headline: "Lassen Sie uns etwas Durchdachtes schaffen.",
      subline: "Offen für ausgewählte Projekte und technische Zusammenarbeiten.",
      directLabel: "DIREKTER KONTAKT:",
      directEmail: "wilk@studio.lab",
      networkLabel: "NETZWERK:",
      networkUrl: "linkedin.com/in/wilk-studio",
      form: {
        nameLabel: "01 // NAME ODER ORGANISATION",
        namePlaceholder: "z.B. Katherine Vance",
        emailLabel: "02 // E-MAIL-ADRESSE",
        emailPlaceholder: "katherine@vance.com",
        messageLabel: "03 // PROJEKTÜBERSICHT & RAHMEN",
        messagePlaceholder: "Kurze Beschreibung der Projektziele, des Zeitplans oder der Herausforderungen...",
        submitBtn: "ANFRAGE SENDEN",
        submittingBtn: "WIRD GESENDET...",
        successMsg: "Vielen Dank für Ihre Nachricht. Ich antworte Ihnen in Kürze.",
      },
      colophon: "Gestaltet & entwickelt von Wilk. Bereitgestellt auf Edge-Infrastruktur. Entwickelt nach semantischen Webstandards.",
    },
    footer: {
      brand: "WILK",
      tagline: "— DESIGN & CODE",
      rights: "© 2025 Wilk. Alle Rechte vorbehalten.",
      email: "E-Mail",
      linkedin: "LinkedIn",
      legal: "Impressum",
    },
  },
};

export function getTranslations(locale?: string): { locale: Locale; t: Translations } {
  const resolvedLocale: Locale = locale === "de" ? "de" : "en";
  return {
    locale: resolvedLocale,
    t: translations[resolvedLocale],
  };
}
