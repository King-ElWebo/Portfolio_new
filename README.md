# Portfolio — Digital Designer & Software Developer

> **Status**: Implementation Phase (Homepage D3.1 Baseline aktiv, Multi-Page-Architektur & Content-System in Arbeit)  
> **Positionierung**: Digital Designer & Software Developer *(Design + Development in einer Person)*  
> **Creative Direction**: *Cinematic Dark × Warm Editorial* (Design-Baseline: D3.1 — Visual Polish)  
> **Technologie-Stack**: React Router v8 + Vite + Cloudflare Workers (`@cloudflare/vite-plugin`)  
> **Datenbank-Ziel**: Neon PostgreSQL (Serverless, server-side access only; aktuell noch unprovisioniert)  
> **Backlog & Roadmap**: [`docs/14-implementation-backlog.md`](docs/14-implementation-backlog.md)

---

## 📌 Über dieses Projekt

Dieses Repository bildet das Fundament für das persönliche Portfolio eines **Digital Designers & Software Developers**.  
Das Projekt dient primär als **Vertrauens- und Proof-of-Work-Plattform**, um nach Erstgesprächen, Empfehlungen oder Bewerbungen die Fähigkeit zur ganzheitlichen Konzeption, Gestaltung und technischen Realisierung digitaler Produkte unter Beweis zu stellen.

Das Endprodukt ist ein **vollwertiges mehrsprachiges Multi-Page-Portfolio (DE / EN)**, bestehend aus:
- **Homepage** (`/de`, `/en`): 3-Akt-Dramaturgie (Cinematic Dark → Warm Editorial → Cinematic Dark), Hero, Ausgewählte Arbeiten, Bridge, Kompetenzen, Profil, Zusammenarbeit, The Lab, Kontakt, Footer.
- **Work-Archiv** (`/de/work`, `/en/work`): Eigenständige Projektübersicht mit Filterung und ehrlicher Trennung von Kundenprojekten und Independent Concepts.
- **Case Studies** (`/de/work/:slug`, `/en/work/:slug`): Tiefe Projektanalysen nach dem Schema in `docs/07-project-template.md`.
- **Dedizierte Kontaktseite** (`/de/contact`, `/en/contact`): Barrierefreier, fokussierter Erstkontakt ohne Marketing-Hürden.
- **Rechtliches** (`/de/impressum` / `/en/imprint`, `/de/datenschutz` / `/en/privacy`): Gesetzeskonforme Legal-Pages.

---

## 🏛 Source of Truth (`/docs` & `AGENTS.md`)

Alle strategischen, gestalterischen und architektonischen Vorgaben werden verbindlich in der Dokumentation gepflegt.  
**Für alle Entwickler und KI-Agenten gilt vor Beginn substanzieller Arbeiten:** Erst [`AGENTS.md`](AGENTS.md) und die relevanten Dokumente in `docs/` lesen.

### Dokumentationsübersicht:
- [`docs/00-creative-brief.md`](docs/00-creative-brief.md) — Strategie, Positionierung, Zielgruppenansatz, Tonalität & Working Copy
- [`docs/01-content-inventory.md`](docs/01-content-inventory.md) — Bestandsaufnahme aller Inhalte, Projekt-Kandidatenpool & Asset-Tracking
- [`docs/02-site-architecture.md`](docs/02-site-architecture.md) — Multi-Page-Informationsarchitektur, Routing (`/de`, `/en`) & Homepage-Dramaturgie
- [`docs/03-inspiration.md`](docs/03-inspiration.md) — Benchmark-Recherche, Bewertungskriterien & 30-Sekunden-Feedback-Test
- [`docs/04-art-direction.md`](docs/04-art-direction.md) — Visuelle Identität, D3.1-Baseline & Design-Prinzipien
- [`docs/05-design-system.md`](docs/05-design-system.md) — Token-Architektur (Primitive → Semantic → Component) & D3.1 CSS-Tokens
- [`docs/06-motion-language.md`](docs/06-motion-language.md) — Motion-Grundsätze, Hero Particle Canvas, Dark-Cream-Transition & Status
- [`docs/07-project-template.md`](docs/07-project-template.md) — Case-Study-Schema & strenge Inhaltsintegrität für Konzepte
- [`docs/08-build-plan.md`](docs/08-build-plan.md) — Phasenbasierter Entwicklungsfahrplan & Fortschritt
- [`docs/09-technical-architecture.md`](docs/09-technical-architecture.md) — 15 Architektur-Prinzipien, Cloudflare & Neon Richtlinien
- [`docs/10-engineering-standards.md`](docs/10-engineering-standards.md) — TypeScript, SSR-Komponentenregeln, Sicherheit & Quality Gate
- [`docs/11-agent-workflow.md`](docs/11-agent-workflow.md) — Rollen für Antigravity & Codex, Skill-Orchestrierung
- [`docs/12-deployment-data.md`](docs/12-deployment-data.md) — Cloudflare Workers & Neon Integrationsstrategie
- [`docs/13-decision-log.md`](docs/13-decision-log.md) — Entscheidungslogbuch (`CONFIRMED`, `WORKING DIRECTION`, `OPEN`, `REJECTED`)
- [`docs/14-implementation-backlog.md`](docs/14-implementation-backlog.md) — Zentrales, aufgabenbezogenes Implementierungs-Backlog (Epics A–G)

---

## 📁 Verzeichnisstruktur

```text
portfolio-root/
│
├── app/                        # React Router v8 Anwendungsquellcode
│   ├── components/             # UI-Komponenten (Layout, Sektionen, Portrait)
│   │   ├── layout/             # SiteHeader, SiteFooter
│   │   ├── portrait/           # Three.js / WebGL Particle Portrait (PAUSED)
│   │   └── sections/           # Hero, SelectedWork, TransitionBridge, Capabilities, etc.
│   ├── i18n/                   # Lokalisierung & Übersetzungswörterbücher (DE / EN)
│   ├── routes/                 # Routen-Module (_index, home, work, contact)
│   ├── app.css                 # Kanonisches D3.1 Design System (Tokens & Layout)
│   ├── root.tsx                # HTML-Schale, globale Fonts, ErrorBoundary
│   └── routes.ts               # Zentrale Routendefinition (@react-router/dev)
│
├── workers/                    # Cloudflare Workers Server Entry
│   └── app.ts                  # Cloudflare Worker Fetch-Handler & Router Context
│
├── public/                     # Statische Public Assets
│   └── assets/                 # Vorberechnete Binärdaten (portrait-particles.bin)
│
├── content/                    # Strukturierte Inhaltsdaten (Projects, Vita, etc.)
│   ├── credentials/
│   ├── experience/
│   ├── projects/
│   └── testimonials/
│
├── assets/                     # Lokale Arbeitsmedien
│   ├── certificates/
│   ├── client-logos/
│   ├── inspiration/
│   ├── portraits/              # Private Porträts in /private (git-ignored)
│   └── project-images/
│
├── docs/                       # Zentrale Source of Truth (00-14)
├── .agents/                    # KI-Agent-Regeln & Customizations
├── AGENTS.md                   # Verbindliche Arbeitsanweisung für alle KI-Agenten
├── PRODUCT.md                  # Impeccable Produkt-Kontextadapter
├── vite.config.ts              # Vite-Konfiguration mit Cloudflare Plugin
├── wrangler.jsonc              # Cloudflare Workers Konfiguration
├── tsconfig.json               # TypeScript Strict Konfiguration
├── package.json                # Scripts & Dependencies
└── README.md
```

---

## ⚡ Verfügbare Befehle

```bash
# Entwicklungsserver starten (Vite + Cloudflare SSR Simulation)
npm run dev

# TypeScript & React Router Typen prüfen
npm run typecheck

# Produktions-Build erstellen
npm run build

# Lokale Build-Vorschau starten
npm run preview
```

> [!NOTE]
> Ein Linter (`eslint` oder `biome`) sowie ein Test-Framework (`vitest` / `playwright`) sind im aktuellen `package.json` noch nicht konfiguriert und als Backlog-Aufgaben in Epic G hinterlegt.

---

## 🛑 Wichtige Projektzustände auf einen Blick

- **Hero Particle Portrait**: Technisch lauffähig (Three.js, GLSL Shader, Variante A), aber aktuell **PAUSIERT** (`PAUSED — awaiting decision on personalized facial geometry`). Keine weiteren Arbeiten am Portrait ohne explizite Freigabe.
- **Inhalte**: Aktuelle Projekte in `translations.ts` sind temporäre Stitch-Platzhalter. Reale Projektdaten werden im Rahmen des Content-Workflows (Epic C) eingepflegt.
- **Datenbank & Hosting**: Neon PostgreSQL und Cloudflare Workers sind die bestätigten Architekturziele; Remote-Ressourcen sind noch unprovisioniert.
