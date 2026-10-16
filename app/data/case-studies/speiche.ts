import type { CaseStudyData } from "~/types/case-study";

export const speicheCaseStudy: CaseStudyData = {
  slug: "speiche-werkstattmanager",
  projectId: "concept-speiche",
  indexKicker: {
    de: "05 / THE LAB — INDEPENDENT CONCEPT",
    en: "05 / THE LAB — INDEPENDENT CONCEPT",
  },
  title: "SPEICHE",
  headline: {
    de: "Robuste Auftragsdisposition und operative Klarheit für Fahrradwerkstätten.",
    en: "Resilient job scheduling and operational clarity for bicycle workshops.",
  },
  subheadline: {
    de: "Ein eigenständiges Konzept einer datendichten Fachanwendung mit Client-Side-Zustandsführung: Auftragsannahme, Ersatzteillager, Mechaniker-Zeiterfassung und Werkstattplanung mit flüssiger lokaler Datenverarbeitung.",
    en: "An independent high-density specialist ERP application featuring client-side state: Order intake, parts inventory, mechanic time tracking, and workshop scheduling with responsive local state management.",
  },
  year: "2026",
  client: {
    de: "SPEICHE (Eigenständiges Konzept)",
    en: "SPEICHE (Independent Concept)",
  },
  role: {
    de: "Informationsarchitektur, UI-Design & Anwendungsentwicklung",
    en: "Information Architecture, UI Design & Application Engineering",
  },
  scope: {
    de: "Specialist Web App · Client-Side State · Repair Board · Inventory Management",
    en: "Specialist Web App · Client-Side State · Repair Board · Inventory Management",
  },
  statusBadge: {
    de: "The Lab · Eigenständiges Konzept",
    en: "The Lab · Independent Concept",
  },
  statusUpcoming: false,
  liveUrl: "https://github.com/King-ElWebo/Werkstattmanager-Demo",

  // Chapter 01 — Hero
  heroImage: {
    src: "/assets/projects/speiche/speiche-desktop-authentic.png",
    alt: {
      de: "SPEICHE Werkstattmanager — Operatives Dashboard für Fahrradwerkstätten",
      en: "SPEICHE Workshop Manager — Operational dashboard for bicycle repair shops",
    },
    caption: {
      de: "Datendichte Benutzeroberfläche mit Status-Pipeline, Terminplanung und Lagerübersicht.",
      en: "High-density operational dashboard featuring job status pipeline, scheduling, and live inventory.",
    },
  },

  // Chapter 02 — Signature Repair Board & Order Pipeline
  adminCms: {
    kicker: {
      de: "02 / OPERATIVER LEITSTAND: AUFTRAGS-PIPELINE",
      en: "02 / OPERATIONAL CONTROL: WORK-ORDER PIPELINE",
    },
    heading: {
      de: "Zustandsgeführte Reparaturabläufe ohne Zettelchaos.",
      en: "State-machine driven repair workflows without paper chaos.",
    },
    subheadline: {
      de: "Vom verlorenen Notizzettel am Lenker zum verlässlichen digitalen Werkstatt-Board.",
      en: "Replacing lost paper handlebar tags with a resilient digital repair board.",
    },
    narrative: {
      de: "In urbanen Werkstätten herrscht in den Hauptmonaten Hochbetrieb. Statt überladener Formulare bietet SPEICHE einen klaren Prozessleitstand: Reparaturaufträge durchlaufen eine deterministische Pipeline (Eingegangen → In Diagnose → Teile bestellt → Montage → Fertig). Mechaniker sehen Arbeitswerte (AW), Ersatzteilbedarf und Notizen auf einen Blick.",
      en: "During peak cycling season, repair shops face high velocity. Instead of bloated form menus, SPEICHE delivers a disciplined pipeline: Work orders progress deterministically (Intake → Diagnosis → Parts Ordered → Assembly → Ready). Mechanics inspect labor units, parts bills, and customer notes in one glance.",
    },
    systemLabel: {
      de: "Auftrags-Pipeline & Mechaniker-Board",
      en: "Work-Order Pipeline & Mechanic Board",
    },
    screenshot: {
      src: "/assets/projects/speiche/speiche-orders-authentic.png",
      alt: {
        de: "SPEICHE Auftrags-Pipeline mit Statusfiltern und Bearbeitungsstatus",
        en: "SPEICHE Work-order board with status filtering and active mechanics",
      },
      caption: {
        de: "Lückenlose Zustandsverwaltung aller Reparaturposten mit Ampelindikatoren für Fälligkeit und Material.",
        en: "Deterministic state management across all active service tickets with priority and parts indicators.",
      },
    },
    pillars: [
      {
        number: "01",
        title: { de: "Deterministische State-Machine", en: "Deterministic State Machine" },
        description: {
          de: "Strikte Zustandsübergänge ohne Race Conditions: Jeder Statuswechsel validiert Material und Zeiteinträge.",
          en: "Strict deterministic status transitions ensuring parts and labor metrics are verified before handover.",
        },
      },
      {
        number: "02",
        title: { de: "Integrierter Arbeitszeittimer", en: "Integrated Labor Timer" },
        description: {
          de: "Stoppuhrfunktion pro Reparaturposten zur minutengenauen Erfassung von Mechanikerstunden und Richtzeiten.",
          en: "Active stopwatch tracking per ticket for accurate recording of billable hours against standard flat rates.",
        },
      },
      {
        number: "03",
        title: { de: "Lokale Offline-Resistenz", en: "Offline-Resilient State" },
        description: {
          de: "Unterbrechungsfreies Arbeiten in Kellerwerkstätten: Synchroner Context-State mit sofortiger Browser-Persistenz.",
          en: "Zero lag in concrete basements: Synchronous React state with immediate local storage persistence.",
        },
      },
    ],
  },

  // Chapter 03 & 04 — Parts Inventory & Mobile Stand
  visualExperience: {
    kicker: {
      de: "03 / ERSATZTEILLAGER & DISPOSITION",
      en: "03 / PARTS INVENTORY & DISPOSITION",
    },
    heading: {
      de: "Bestandsführung in Echtzeit und mobile Erfassung am Reparaturständer.",
      en: "Real-time stock management and mobile flow at the repair stand.",
    },
    subheadline: {
      de: "Lagerbestände und Werkstattaufträge greifen nahtlos ineinander: Kritische Teile werden automatisch reserviert.",
      en: "Parts inventory and active work tickets synchronize seamlessly: Critical spares are auto-allocated.",
    },
    desktopShowcase: {
      src: "/assets/projects/speiche/speiche-inventory-authentic.png",
      alt: {
        de: "SPEICHE Ersatzteillager mit Bestandsführung und Mindestmengenwarnung",
        en: "SPEICHE Parts inventory with live stock levels and threshold alerts",
      },
      caption: {
        de: "Ersatzteillager (/lager): Automatische Warnung bei Unterschreitung von Mindestmengen gängiger Verschleißteile.",
        en: "Parts inventory (/lager): Visual threshold alerts when essential cassettes, chains, or pads run low.",
      },
    },
    mobileShowcase: {
      src: "/assets/projects/speiche/speiche-mobile-authentic.png",
      alt: {
        de: "SPEICHE Mobile Ansicht für Mechaniker am Montageständer",
        en: "SPEICHE Mobile View for mechanics at the repair stand",
      },
      caption: {
        de: "Montageständer-UI: Große Touch-Flächen und Schnellerfassung für die praktische Arbeit mit Werkzeug.",
        en: "Repair-stand UI: Generous touch targets and fast task completion designed for greasy-hand shop ergonomics.",
      },
    },
    lookbookKicker: {
      de: "OPERATIVE MODULE",
      en: "OPERATIONAL MODULES",
    },
    lookbookDescription: {
      de: "Kompakte Übersicht der Systemmodule für den täglichen Werkstattbetrieb.",
      en: "Overview of system modules engineered for daily shop productivity.",
    },
    lookbook: [
      {
        image: "/assets/projects/speiche/speiche-orders-authentic.png",
        title: { de: "Auftrags-Pipeline", en: "Work-Order Pipeline" },
        category: { de: "Statusgeführt · Annahme bis Abholung", en: "Lifecycle · Intake to Handover" },
      },
      {
        image: "/assets/projects/speiche/speiche-inventory-authentic.png",
        title: { de: "Ersatzteillager", en: "Parts Inventory" },
        category: { de: "Bestände · Ketten, Bremsbeläge, Schläuche", en: "Stock · Chains, Brake Pads, Tubes" },
      },
    ],
    atmosphereKicker: {
      de: "ERGONOMIE & DATENDICHTE",
      en: "ERGONOMICS & DATA DENSITY",
    },
    atmosphereDescription: {
      de: "Monospace-Typografie, kontrastreiche Ampelindikatoren und kompromisslose Latenzfreiheit.",
      en: "Monospace data formatting, high-contrast indicators, and zero network latency.",
    },
    storeAtmosphere: [
      {
        image: "/assets/projects/speiche/speiche-desktop-authentic.png",
        caption: {
          de: "Operatives Dashboard: Tagesauslastung, fällige Abholungen und offene Teilebestellungen.",
          en: "Operational dashboard: Daily capacity, pending handovers, and open parts purchase orders.",
        },
      },
      {
        image: "/assets/projects/speiche/speiche-orders-authentic.png",
        caption: {
          de: "Express-Erfassung: Kundenkontakt, Fahrradmodell und Reparaturbedarf in unter einer Minute gebucht.",
          en: "Express intake: Customer details, bike model, and service tasks logged in under 60 seconds.",
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
      de: "Spezialisierte Fachsoftware als echtes Handwerkswerkzeug.",
      en: "Specialist software built as a genuine craftsman's tool.",
    },
    narrative: {
      de: "SPEICHE beweist, wie moderne Webstandards den harten Arbeitsalltag handwerklicher Betriebe entlasten können: Keine träge Standard-Cloud, sondern ein messerscharfes, robustes Werkzeug, das sofort reagiert und Mechanikern den Rücken für ihre Reparaturen freihält.",
      en: "SPEICHE demonstrates how modern web standards can alleviate operational strain in physical repair shops: Bypassing bloated SaaS to deliver an instant, resilient tool that lets mechanics focus on their craft.",
    },
    achievements: [
      {
        de: "Eigenständiges Fachsoftware-Konzept im Rahmen von 'The Lab' für datendichte Arbeitsplatz-UIs",
        en: "Independent specialist ERP concept within 'The Lab' exploring high-density professional UI",
      },
      {
        de: "Reaktive Client-Side-Zustandsmaschine mit deterministischer Domain-Logik und Zeitstempeln",
        en: "Reactive client-side state engine featuring deterministic domain logic and labor timers",
      },
      {
        de: "Vollständig offline-fähige Persistenz ohne Blockierung durch instabile Werkstattnetzwerke",
        en: "Fully offline-resilient local storage persistence immune to basement network drops",
      },
      {
        de: "Vollständiger Quellcode auf GitHub mit Playwright E2E- und Accessibility-Audits",
        en: "Complete source code on GitHub with Playwright E2E and accessibility audits",
      },
    ],
    techStack: ["React 19", "Next.js 16", "Tailwind CSS", "Client State Engine", "LocalStorage", "Monospace System"],
    techRationale: {
      de: "React 19 und ein synchroner Context-State eliminieren Klickverzögerungen, während Tailwind CSS eine augenschonende, hochdichte Monospace-Datenanzeige ermöglicht.",
      en: "React 19 and synchronous context state eliminate interaction lag, while Tailwind CSS enforces an ergonomic, eye-friendly monospace data presentation.",
    },
    statusNote: {
      de: "Eigenständiges Fachsoftware-Konzept (The Lab). Vollständiger Quellcode und Beispieldaten im GitHub-Repository einsehbar.",
      en: "Independent ERP application concept (The Lab). Complete source code and seed datasets available on GitHub.",
    },
    externalButtonLabel: {
      de: "GitHub-Repository aufrufen",
      en: "View GitHub Repository",
    },
  },

  nextProject: {
    title: "RÖSTWERK 1070",
    slug: "roestwerk-1070",
    descriptor: {
      de: "Mikrorösterei, Geschmacksfinder & Brührechner",
      en: "Specialty Coffee Showcase & Sensory Tools",
    },
    kicker: {
      de: "NÄCHSTES PROJEKT",
      en: "NEXT PROJECT",
    },
  },
};
