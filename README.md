# Portfolio — Digital Designer & Software Developer

> **Status**: Planning & Repository Foundation Pass  
> **Positionierung**: Digital Designer & Software Developer *(Design + Development in einer Person)*  
> **Creative Direction**: *Cinematic Dark × Warm Editorial*  
> **Infrastruktur-Ziele**: Cloudflare (Hosting/Deployment) & Neon PostgreSQL (Database)

---

## 📌 Über dieses Projekt

Dieses Repository bildet das Fundament für das persönliche Portfolio eines **Digital Designers & Software Developers**.  
Das Projekt dient primär als **Vertrauens- und Proof-of-Work-Plattform**, um nach Erstgesprächen, Empfehlungen oder Bewerbungen die Fähigkeit zur ganzheitlichen Konzeption, Gestaltung und technischen Realisierung digitaler Produkte unter Beweis zu stellen.

---

## 🏛 Source of Truth (`/docs` & `AGENTS.md`)

Alle strategischen, gestalterischen und architektonischen Vorgaben werden verbindlich in der Dokumentation gepflegt.  
**Für alle Entwickler und KI-Agenten gilt vor Beginn substanzieller Arbeiten:** Erst [`AGENTS.md`](AGENTS.md) und die relevanten Dokumente in `docs/` lesen.

### Dokumentationsübersicht:
- [`docs/00-creative-brief.md`](docs/00-creative-brief.md) — Strategie, Positionierung, Zielgruppenansatz, Tonalität & Working Copy
- [`docs/01-content-inventory.md`](docs/01-content-inventory.md) — Bestandsaufnahme aller Inhalte & Assets *(Befüllung pausiert bis Design-Stabilität)*
- [`docs/02-site-architecture.md`](docs/02-site-architecture.md) — Informationsarchitektur, Routing (`/de`, `/en`) & Homepage-Dramaturgie
- [`docs/03-inspiration.md`](docs/03-inspiration.md) — Benchmark-Recherche, Bewertungskriterien & 30-Sekunden-Feedback-Test
- [`docs/04-art-direction.md`](docs/04-art-direction.md) — Visuelle Identität & geplante 3 Design-Explorationen (Cinematic, Editorial, Hybrid)
- [`docs/05-design-system.md`](docs/05-design-system.md) — Token-Architektur (Primitive → Semantic → Component)
- [`docs/06-motion-language.md`](docs/06-motion-language.md) — Motion-Grundsätze, Static First, Reduced Motion & Performance
- [`docs/07-project-template.md`](docs/07-project-template.md) — Case-Study-Schema & strenge Inhaltsintegrität für Konzepte
- [`docs/08-build-plan.md`](docs/08-build-plan.md) — 15-Stufen-Entwicklungsfahrplan *(aktuell pausiert)*
- [`docs/09-technical-architecture.md`](docs/09-technical-architecture.md) — 15 Architektur-Prinzipien, Cloudflare & Neon Richtlinien
- [`docs/10-engineering-standards.md`](docs/10-engineering-standards.md) — TypeScript, Komponentenregeln, Sicherheit & Quality Gate
- [`docs/11-agent-workflow.md`](docs/11-agent-workflow.md) — Rollen für Antigravity & Codex, Skill-Orchestrierung
- [`docs/12-deployment-data.md`](docs/12-deployment-data.md) — Cloudflare- & Neon-Integrationsstrategie
- [`docs/13-decision-log.md`](docs/13-decision-log.md) — Entscheidungslogbuch (`CONFIRMED`, `WORKING DIRECTION`, `OPEN`, `REJECTED`)

---

## 📁 Verzeichnisstruktur

```text
portfolio-root/
│
├── docs/                   # Zentrale Source of Truth (Strategie, Design, Architektur, Regeln)
│   ├── 00-creative-brief.md
│   ├── 01-content-inventory.md
│   ├── 02-site-architecture.md
│   ├── 03-inspiration.md
│   ├── 04-art-direction.md
│   ├── 05-design-system.md
│   ├── 06-motion-language.md
│   ├── 07-project-template.md
│   ├── 08-build-plan.md
│   ├── 09-technical-architecture.md
│   ├── 10-engineering-standards.md
│   ├── 11-agent-workflow.md
│   ├── 12-deployment-data.md
│   └── 13-decision-log.md
│
├── content/                # Inhaltsdaten (Projects, Testimonials, Experience, Credentials)
├── assets/                 # Lokale Medien (Porträts, Projektbilder, Logos, Inspiration)
├── references/             # Externe Referenzen & Research
├── .agents/                # KI-Agent-Konfiguration & Workspace-Regeln
│   ├── rules/
│   │   └── portfolio.md
│   └── skills/
│
├── AGENTS.md               # Verbindliche Arbeitsanweisung für alle KI-Agenten
├── .editorconfig           # Neutrale Editor-Standards
├── .gitignore              # Framework-neutrale Git-Ignore-Regeln
├── .env.example            # Environment-Baseline ohne Secrets
└── README.md
```

---

## ⚡ Aktueller Entwicklungs- & Tooling-Status

- **Keine Frameworks vorab initialisiert**: Das Frontend-Framework (Next.js App Router ist ein starker Kandidat) wird erst nach Abschluss der Design-Exploration ausgewählt und direkt in diesem Root initialisiert.
- **Keine npm-Packages erforderlich**: In der aktuellen Planungs- und Konzeptionsphase werden noch keine externen Dependencies installiert.
- **Keine Cloudflare- oder Neon-Ressourcen provisioniert**: Die Cloudflare- und Datenbank-Anbindung erfolgt erst mit dem Start der Entwicklungsphase.
