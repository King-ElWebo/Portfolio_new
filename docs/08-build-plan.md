# Master Build Plan & Roadmap

> **Status**: IN PROGRESS (Fundament & Homepage D3.1 Baseline abgeschlossen; Multi-Page-Erweiterung & Content-System in Arbeit)  
> **Source of Truth**: Entwicklungsfahrplan, Meilensteine & Phasenüberblick  
> **Operatives Backlog**: Detaillierte Arbeitspakete sind im operativen Backlog [`docs/14-implementation-backlog.md`](14-implementation-backlog.md) definiert.

---

## 🧭 Strategische Neuausrichtung des Build-Plans

Der ursprüngliche 15-Stufen-Plan aus der initialen Planungsphase spiegelte den Entwicklungsfortschritt vor der Framework-Entscheidung und vor den Stitch-Explorationen wider.  
Nach der erfolgreichen Initialisierung von **React Router v8**, der Freigabe der **D3.1-Design-Baseline** und der Implementierung des **Hero Particle Portrait Canvas** verschiebt sich die Priorität verbindlich:

> **Von:** *„Eine isolierte, visuell beeindruckende, aber unvollständige Homepage mit Dummy-Content weiter feinschleifen“*  
> **Zu:** *„Ein kohärentes, voll funktionsfähiges Multi-Page-Portfolio mit echten Inhalten und professioneller technischer Basis fertigstellen.“*

---

## 🗺️ Phasenübersicht des Portfolios

```text
┌────────────────────────────────────────────────────────────────────────┐
│ PHASE 1: Fundament & Architektur                    [ABGESCHLOSSEN]    │
│ • Positionierung & Creative Brief bestätigt                            │
│ • Stack bestätigt: React Router v8 + Vite + Cloudflare Workers         │
│ • Cloudflare Workers SSR Entry & Config eingerichtet                   │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 2: Visuelle Homepage-Baseline                 [BASELINE STEHT]   │
│ • D3.1 Visual Polish Baseline freigegeben & umgesetzt                  │
│ • 3-Akt-Dramaturgie (Obsidian -> Cream -> Obsidian) implementiert      │
│ • Hero 3D Particle Canvas implementiert (Variante A)                   │
│ • PARTIKEL-PORTRÄT AKTUELL PAUSIERT (Gesichtsgeometrie ausstehend)     │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 3: Multi-Page Routing & Navigation            [IN ARBEIT]        │
│ • Routen-Entkopplung (/work, /contact, Legal)                          │
│ • Header-Navigation reparieren (Unterseiten-fähige Links)              │
│ • i18n-Shell: HTML lang="de/en" & manuelle Persistierung               │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 4: Content-System & Projekt-Kandidaten        [IN ARBEIT]        │
│ • 17-Punkte-Schema für Case Studies implementiert                      │
│ • Lokales, typisiertes Datenmodell in content/projects/                │
│ • Überführung von Stitch-Demos zu verifizierten Projektdaten           │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 5: Standalone Work & Case Study Detailseiten  [GEPLANT]          │
│ • Echte Work-Übersichtsseite mit Kategoriefilter                       │
│ • Detailroute /:locale/work/:slug mit flexiblem Case-Study-Template    │
│ • Individuelle projektspezifische Art Direction                        │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 6: Kontakt-Backend & Rechtliches              [GEPLANT]          │
│ • Echte Server-Action auf Cloudflare Workers mit E-Mail-Provider       │
│ • Barrierefreie Formular-Validierung & Spam-Schutz                     │
│ • Statische Impressum- & Datenschutz-Routen                            │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 7: Motion-Veredelung & Signatur-Momente       [GEPLANT]          │
│ • Scroll-Scrubbing für Dark -> Cream Transition                        │
│ • Wiederaufnahme Porträt (sobald Geometrie entschieden)                │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 8: Quality Assurance, Tooling & Launch        [GEPLANT]          │
│ • Linter & Test-Tooling in package.json konfigurieren                  │
│ • SEO (Canonical, Hreflang, Sitemap, Robots, OG-Tags)                  │
│ • WCAG 2.2 AA Audit & Performance-Gate (Lighthouse)                    │
│ • Domain-Aufschaltung & Cloudflare Production Deployment               │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Detaillierte Phasen- & Meilenstein-Tabelle

| Meilenstein | Beschreibung & Umfang | Status | Primäre Dokumentation |
| :--- | :--- | :--- | :--- |
| **M1: Foundation** | Creative Brief, Regeln, Tech-Architektur, Cloudflare/Neon-Ziele. | `CONFIRMED / DONE` | [`docs/00-creative-brief.md`](00-creative-brief.md), [`docs/09-technical-architecture.md`](09-technical-architecture.md) |
| **M2: Framework** | React Router v8 + Vite direkt im Root, SSR via `workers/app.ts`. | `CONFIRMED / DONE` | `package.json`, `vite.config.ts`, `wrangler.jsonc` |
| **M3: Design Baseline** | Stitch D3.1 Exploration, D3.1-Tokens in `app.css`, React-Sektionen. | `CONFIRMED / DONE` | [`docs/04-art-direction.md`](04-art-direction.md), [`docs/05-design-system.md`](05-design-system.md) |
| **M4: Hero Portrait** | 3D BufferGeometry, GLSL Shaders, Assembly, Dissolve. | `PAUSED` | [`docs/06-motion-language.md`](06-motion-language.md) *(Pausiert für Geometrie-Wahl)* |
| **M5: Multi-Page Shell** | Header-Links reparieren, Standalone-Routen, Locale-Persistierung. | `IN PROGRESS` | [`docs/02-site-architecture.md`](02-site-architecture.md), Epic B |
| **M6: Content Model** | Typisierte Projektmodelle, Bereinigung von Demo-Strings in `translations.ts`. | `IN PROGRESS` | [`docs/01-content-inventory.md`](01-content-inventory.md), Epic C |
| **M7: Work & Case Studies** | Standalone `/work`, Template `/:locale/work/:slug`, Next-Project-Links. | `PLANNED` | [`docs/07-project-template.md`](07-project-template.md), Epic D |
| **M8: Contact & Legal** | Echte Server-Action (E-Mail), A11y Formular, Impressum, Datenschutz. | `PLANNED` | Epic E |
| **M9: Motion Polish** | Dark-Cream Bridge Scrubbing, Stagger-Reveals. | `PLANNED` | [`docs/06-motion-language.md`](06-motion-language.md), Epic F |
| **M10: QA & Launch** | Lint/Test Tooling, SEO-Metadaten, Cloudflare Deployment, Domain. | `PLANNED` | [`docs/10-engineering-standards.md`](10-engineering-standards.md), Epic G |

---

## 📋 Operatives Aufgaben-Backlog

Alle konkreten Entwicklungsaufgaben mit Prioritäten (`P0`, `P1`, `P2`), Akzeptanzkriterien, Abhängigkeiten und betroffenen Quellcodedateien werden zentral gepflegt in:

👉 **[`docs/14-implementation-backlog.md`](14-implementation-backlog.md)**
