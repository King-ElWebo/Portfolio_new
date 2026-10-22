export type Locale = "de" | "en";

export interface SelectedWorkProjectCopy {
  title: string;
  kind: string;
  description: string;
  imageAlt: string;
}

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
  id: "web" | "systems" | "automation";
  title: { lead: string; rest: string };
  description: string;
}

export interface CollaborationPerspective {
  headline: { lead: string; rest: string };
  description: string;
}

export interface LabConceptCopy {
  description: string;
  imageAlt: string;
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
    navAbout: string;
    navCapabilities: string;
    navPractitioner: string;
    navLab: string;
    navContact: string;
    switchLang: string;
  };
  hero: {
    kicker: string;
    statusBadge: string;
    headlinePart1: string;
    headlineItalic: string;
    headlinePart2: string;
    subheadline: string;
    cta: string;
    secondaryCta: string;
    bottomTag: string;
    bottomScroll: string;
    discipline1: string;
    discipline2: string;
    discipline3: string;
  };
  work: {
    heading: string;
    caseStudyLink: string;
    featured: Record<"checkpot" | "bloom" | "speiche", SelectedWorkProjectCopy>;
    kicker: string;
    subtitle: string;
    project01: Project01;
    project02: Project02;
    project03?: Project03;
    archiveBarTitle?: string;
    archiveBarSub?: string;
    archiveBarCta?: string;
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
    headline: { lead: string; accent: string };
    rows: CapabilityRow[];
    visual: {
      description: string;
      interface: string;
      logic: string;
      data: string;
    };
  };
  practitioner: {
    heading: string;
    portraitAlt: string;
    quote: { before: string; emphasis: string; after: string };
    p1: string;
    p2: string;
  };
  collaboration: {
    label: string;
    project: CollaborationPerspective & { disciplines: string[] };
    team: CollaborationPerspective & { signatureLead: string };
  };
  lab: {
    kicker: string;
    headline: { lead: string; accent: string };
    intro: string;
    conceptLabel: string;
    selectionLabel: string;
    caseStudyLink: string;
    surfaceDescription: string;
    surfaceCaption: string;
    concepts: { lumen: LabConceptCopy; roest: LabConceptCopy; kern: LabConceptCopy };
  };
  homeContact: {
    regionLabel: string;
    email: string;
    headline: { lead: string; accent: string };
    intro: string;
    openForm: string;
    helper: string;
    form: {
      headline: { lead: string; accent: string };
      intro: string;
      back: string;
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submitLabel: string;
      mailHint: string;
      directLabel: string;
      subjectPrefix: string;
    };
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
  homeFooter: {
    navigationLabel: string;
    backToTop: string;
    imprint: string;
    privacy: string;
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
      title: "WILK — Digital Designer & Software Developer",
      description: "Designing thoughtful digital interfaces and engineering robust software systems from concept to production.",
    },
    header: {
      brand: "WILK",
      role: "— Digital Designer & Software Developer",
      navWork: "Work",
      navAbout: "About",
      navCapabilities: "Capabilities",
      navPractitioner: "Practitioner",
      navLab: "The Lab",
      navContact: "Contact",
      switchLang: "DE / EN",
    },
    hero: {
      kicker: "[ DIGITAL DESIGNER & SOFTWARE DEVELOPER ]",
      statusBadge: "● AVAILABLE FOR SELECTED COMMISSIONS",
      headlinePart1: "FROM IDEA TO",
      headlineItalic: "DIGITAL",
      headlinePart2: "EXPERIENCE.",
      subheadline: "Designing thoughtful digital interfaces and engineering robust software systems from concept to production.",
      cta: "Explore Selected Work",
      secondaryCta: "Project Archive",
      bottomTag: "WILK // CRAFT & SYSTEMS ARCHITECTURE",
      bottomScroll: "SCROLL TO EXPLORE WORK",
      discipline1: "UI/UX & Design Systems",
      discipline2: "Full-Stack Web & Edge",
      discipline3: "Custom CMS & Systems",
    },
    work: {
      heading: "Selected work",
      caseStudyLink: "View case study",
      featured: {
        "checkpot": {
          "title": "Checkpot Hietzing",
          "kind": "Client project",
          "description": "A fashion boutique’s website with a custom content management system.",
          "imageAlt": "The Checkpot Hietzing fashion boutique homepage."
        },
        "bloom": {
          "title": "Let It Bloom",
          "kind": "Client project",
          "description": "A floral web presence with a tailored mini-CMS.",
          "imageAlt": "The Let It Bloom website with floral imagery and a warm, natural palette."
        },
        "speiche": {
          "title": "SPEICHE",
          "kind": "Independent concept",
          "description": "A bicycle workshop management app, from repair orders to parts inventory.",
          "imageAlt": "SPEICHE workshop management interface with repair jobs and workshop planning."
        }
      },
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
      archiveBarTitle: "Explore all 7 client commissions and computational studies in the archive",
      archiveBarSub: "LUMENWERK · RÖSTWERK 1070 · KERN / FIELD · FKW-G",
      archiveBarCta: "View Full Archive",
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
      "headline": { "lead": "Design & Code.", "accent": "From one source." },
      "rows": [
        {
          "id": "web",
          "title": { "lead": "Websites", "rest": "& Shops" },
          "description": "Your digital presence."
        },
        {
          "id": "systems",
          "title": { "lead": "Apps", "rest": "& Systems" },
          "description": "For your everyday work."
        },
        {
          "id": "automation",
          "title": { "lead": "AI &", "rest": "Automation" },
          "description": "For repetitive tasks."
        }
      ],
      "visual": {
        "description": "Interface, logic, and data as connected layers of a digital product.",
        "interface": "Interface",
        "logic": "Logic",
        "data": "Data"
      }
    },
    practitioner: {
      "heading": "About me",
      "portraitAlt": "Portrait of the designer behind WILK",
      "quote": {
        "before": "“I care about ",
        "emphasis": "how things work",
        "after": " just as much as how they look.”"
      },
      "p1": "I design and build digital products. I care about the details in the interface just as much as the structure behind it.",
      "p2": "For me, concept, design, and development belong together – from the first idea to a working product."
    },
    collaboration: {
      "label": "Collaboration",
      "project": {
        "headline": { "lead": "I take", "rest": "the lead." },
        "disciplines": ["Concept.", "Design.", "Code."],
        "description": "From the first idea to a finished product."
      },
      "team": {
        "headline": { "lead": "I", "rest": "contribute." },
        "signatureLead": "Your team &",
        "description": "Focused support for agencies and product teams."
      }
    },
    lab: {
      "kicker": "05 / THE LAB",
      "headline": {
        "lead": "Ideas in progress.",
        "accent": "Curiosity in motion."
      },
      "intro": "Independent concepts and digital experiments. A space to explore design and code further.",
      "conceptLabel": "Independent concept",
      "selectionLabel": "Choose a concept for the large preview",
      "caseStudyLink": "View case study",
      "surfaceDescription": "Golden lines form a folded surface in space. Its shape changes with the selected project.",
      "surfaceCaption": "Motion as a material.",
      "concepts": {
        "lumen": {
          "description": "Light as an architectural material.",
          "imageAlt": "LUMENWERK: a dark website with a golden spherical pendant light"
        },
        "roest": {
          "description": "A distinctive presence for good coffee.",
          "imageAlt": "RÖSTWERK 1070: a cream-colored website for a coffee roastery"
        },
        "kern": {
          "description": "Architecture, with room for typography.",
          "imageAlt": "KERN / FIELD: a typography-led website for an architecture studio"
        }
      }
    },
    homeContact: {
      "regionLabel": "Contact",
      "email": "bywilk@office.at",
      "headline": {
        "lead": "Got an idea?",
        "accent": "Let’s talk."
      },
      "intro": "For a new project or to rethink something that already exists.",
      "openForm": "Write a message",
      "helper": "A few lines are enough to get started.",
      "form": {
        "headline": {
          "lead": "Tell me",
          "accent": "about it."
        },
        "intro": "What would you like to create or develop further?",
        "back": "Back",
        "nameLabel": "Your name",
        "namePlaceholder": "What’s your name?",
        "emailLabel": "Your email",
        "emailPlaceholder": "Where can I reach you?",
        "messageLabel": "Your idea",
        "messagePlaceholder": "What do you have in mind?",
        "submitLabel": "Prepare email",
        "mailHint": "Opens a draft in your email app. You send it from there.",
        "directLabel": "Or email me directly:",
        "subjectPrefix": "Project enquiry"
      }
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
    homeFooter: {
      navigationLabel: "Footer navigation",
      backToTop: "Back to top",
      imprint: "Legal notice",
      privacy: "Privacy",
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
      title: "WILK — Digital Designer & Software Developer",
      description: "Gestaltung durchdachter digitaler Interfaces und Entwicklung robuster Softwaresysteme vom Konzept bis zur Produktion.",
    },
    header: {
      brand: "WILK",
      role: "— Digital Designer & Software Developer",
      navWork: "Arbeiten",
      navAbout: "Über mich",
      navCapabilities: "Kompetenzen",
      navPractitioner: "Profil",
      navLab: "Labor",
      navContact: "Kontakt",
      switchLang: "DE / EN",
    },
    hero: {
      kicker: "[ DIGITAL DESIGNER & SOFTWARE DEVELOPER ]",
      statusBadge: "● VERFÜGBAR FÜR PROJEKTE 2026",
      headlinePart1: "VON DER IDEE ZUR",
      headlineItalic: "DIGITALEN",
      headlinePart2: "ERFAHRUNG.",
      subheadline: "Gestaltung durchdachter digitaler Interfaces und Entwicklung robuster Softwaresysteme vom Konzept bis zur Produktion.",
      cta: "Ausgewählte Arbeiten ansehen",
      secondaryCta: "Projektarchiv",
      bottomTag: "WILK // HANDWERK & SYSTEMARCHITEKTUR",
      bottomScroll: "SCROLLEN ZU DEN ARBEITEN",
      discipline1: "UI/UX & Design-Systeme",
      discipline2: "Fullstack-Web & Edge",
      discipline3: "Custom CMS & Fachsoftware",
    },
    work: {
      heading: "Ausgewählte Arbeiten",
      caseStudyLink: "Case Study ansehen",
      featured: {
        "checkpot": {
          "title": "Checkpot Hietzing",
          "kind": "Kundenprojekt",
          "description": "Die Website einer Modeboutique mit maßgeschneidertem Content-Management-System.",
          "imageAlt": "Die Startseite der Modeboutique Checkpot Hietzing."
        },
        "bloom": {
          "title": "Let It Bloom",
          "kind": "Kundenprojekt",
          "description": "Eine florale Webpräsenz mit einem maßgeschneiderten Mini-CMS.",
          "imageAlt": "Die Website von Let It Bloom mit Blumenmotiven und warmer, natürlicher Farbgebung."
        },
        "speiche": {
          "title": "SPEICHE",
          "kind": "Eigenständiges Konzept",
          "description": "Eine Fachanwendung für Fahrradwerkstätten – von Aufträgen bis zur Teileverwaltung.",
          "imageAlt": "Die Auftragsübersicht und Werkstattplanung des Werkstattmanagers SPEICHE."
        }
      },
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
      archiveBarTitle: "Alle 7 Kundenprojekte & Forschungsarbeiten im Archiv entdecken",
      archiveBarSub: "LUMENWERK · RÖSTWERK 1070 · KERN / FIELD · FKW-G",
      archiveBarCta: "Zum Archiv",
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
      "headline": { "lead": "Design & Code.", "accent": "Aus einer Hand." },
      "rows": [
        {
          "id": "web",
          "title": { "lead": "Websites", "rest": "& Shops" },
          "description": "Dein digitaler Auftritt."
        },
        {
          "id": "systems",
          "title": { "lead": "Apps", "rest": "& Systeme" },
          "description": "Für deinen Arbeitsalltag."
        },
        {
          "id": "automation",
          "title": { "lead": "KI &", "rest": "Automatisierung" },
          "description": "Für wiederkehrende Aufgaben."
        }
      ],
      "visual": {
        "description": "Oberfläche, Logik und Daten als zusammenhängende Ebenen eines digitalen Produkts.",
        "interface": "Oberfläche",
        "logic": "Logik",
        "data": "Daten"
      }
    },
    practitioner: {
      "heading": "Über mich",
      "portraitAlt": "Porträt des Gestalters hinter WILK",
      "quote": {
        "before": "„Mich interessiert die ",
        "emphasis": "Funktionsweise",
        "after": " genauso sehr wie das Aussehen.“"
      },
      "p1": "Ich gestalte und entwickle digitale Produkte. Dabei interessieren mich die Details im Interface genauso wie die Struktur dahinter.",
      "p2": "Konzept, Design und Entwicklung gehören für mich zusammen – vom ersten Gedanken bis zum funktionierenden Produkt."
    },
    collaboration: {
      "label": "Zusammenarbeit",
      "project": {
        "headline": { "lead": "Ich", "rest": "übernehme." },
        "disciplines": ["Konzept.", "Design.", "Code."],
        "description": "Von der Idee bis zum fertigen Produkt."
      },
      "team": {
        "headline": { "lead": "Ich", "rest": "ergänze." },
        "signatureLead": "Dein Team &",
        "description": "Gezielte Unterstützung für Agenturen und Produktteams."
      }
    },
    lab: {
      "kicker": "05 / DAS LABOR",
      "headline": {
        "lead": "Ideen im Aufbau.",
        "accent": "Neugier in Bewegung."
      },
      "intro": "Freie Konzepte und digitale Versuche. Ein Raum, um Gestaltung und Code weiterzudenken.",
      "conceptLabel": "Eigenständiges Konzept",
      "selectionLabel": "Konzept für die große Vorschau wählen",
      "caseStudyLink": "Case Study ansehen",
      "surfaceDescription": "Goldene Linien bilden eine räumlich gefaltete Fläche. Ihre Form verändert sich beim Projektwechsel.",
      "surfaceCaption": "Bewegung als Material.",
      "concepts": {
        "lumen": {
          "description": "Licht als architektonischer Baustoff.",
          "imageAlt": "LUMENWERK: dunkles Webdesign mit goldener Kugelleuchte"
        },
        "roest": {
          "description": "Ein eigener Auftritt für guten Kaffee.",
          "imageAlt": "RÖSTWERK 1070: cremefarbene Website einer Kaffeerösterei"
        },
        "kern": {
          "description": "Architektur, mit Raum für Typografie.",
          "imageAlt": "KERN / FIELD: typografische Website für ein Architekturstudio"
        }
      }
    },
    homeContact: {
      "regionLabel": "Kontakt",
      "email": "bywilk@office.at",
      "headline": {
        "lead": "Eine Idee im Kopf?",
        "accent": "Lass uns reden."
      },
      "intro": "Für ein neues Projekt oder um etwas Bestehendes weiterzudenken.",
      "openForm": "Nachricht schreiben",
      "helper": "Ein paar Sätze reichen für den Anfang.",
      "form": {
        "headline": {
          "lead": "Erzähl mir",
          "accent": "davon."
        },
        "intro": "Was möchtest du gestalten oder weiterentwickeln?",
        "back": "Zurück",
        "nameLabel": "Dein Name",
        "namePlaceholder": "Wie heißt du?",
        "emailLabel": "Deine E-Mail",
        "emailPlaceholder": "Wo kann ich dich erreichen?",
        "messageLabel": "Deine Idee",
        "messagePlaceholder": "Worum geht’s?",
        "submitLabel": "E-Mail vorbereiten",
        "mailHint": "Öffnet einen Entwurf in deinem E-Mail-Programm. Du versendest ihn dort.",
        "directLabel": "Oder direkt per E-Mail:",
        "subjectPrefix": "Projektanfrage"
      }
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
    homeFooter: {
      navigationLabel: "Footer-Navigation",
      backToTop: "Nach oben",
      imprint: "Impressum",
      privacy: "Datenschutz",
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
