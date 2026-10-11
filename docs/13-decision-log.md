# Architecture & Strategy Decision Log

> **Zweck**: Zentrale, unveränderliche Dokumentation aller getroffenen, verworfenen und offenen Entscheidungen.  
> **Wichtig für Agents**: Dieses Logbuch verhindert, dass bereits diskutierte oder verworfene Entscheidungen neu aufgerollt oder stillschweigend verändert werden.  
> **Source of Truth**: Entscheidungsverlauf & Richtlinien

---

## 📋 Standardisiertes Eintrags-Schema

```text
DATE: YYYY-MM-DD
DECISION: [Titel der Entscheidung]
STATUS: [CONFIRMED | WORKING DIRECTION | OPEN | REJECTED]
RATIONALE: [Warum wurde diese Entscheidung so getroffen?]
NOTES: [Relevante Einschränkungen oder nachgelagerte Aufgaben]
```

---

## 🏛️ Bestätigte Entscheidungen `[CONFIRMED]`

### DEC-001: Kernfunktion als Proof-of-Work- & Vertrauens-Plattform
- **DATE**: 2026-09-18
- **STATUS**: `CONFIRMED`
- **RATIONALE**: Das Portfolio soll nicht aggressiv verkaufen, sondern potenziellen Kunden, Agenturen und Partnern nach Erstgesprächen oder Empfehlungen beweisen, dass hier jemand komplette digitale Produkte von Idee bis Code gestalten und entwickeln kann.
- **NOTES**: Kein aggressiver Sales-Funnel, keine Hürden.

### DEC-002: Positionierung als "Digital Designer & Software Developer"
- **DATE**: 2026-09-18
- **STATUS**: `CONFIRMED`
- **RATIONALE**: Die Kombination aus Design und Engineering in einer Person ist das Alleinstellungsmerkmal. Es ermöglicht sowohl ganzheitliche End-to-End-Projektübernahmen als auch gezielte Teilunterstützung in bestehenden Teams.
- **NOTES**: Working Title: *Digital Designer & Software Developer* (Alternative: *Digital Designer & Developer*).

### DEC-003: Zweisprachigkeit (DE & EN) mit dauerhaftem Switcher
- **DATE**: 2026-09-18
- **STATUS**: `CONFIRMED`
- **RATIONALE**: Das Portfolio bedient lokale/regionale Kunden im DACH-Raum ebenso wie internationale Agenturen und Teams.
- **NOTES**: Automatische Erkennung der Browser-Locale beim Erstbesuch; persistierte manuelle Umschaltung überschreibt die Erkennung.

### DEC-004: Creative Direction "Cinematic Dark × Warm Editorial"
- **DATE**: 2026-09-18
- **STATUS**: `CONFIRMED`
- **RATIONALE**: Dunkle, filmische Bereiche sorgen für Fokus und Projektbühne; helle Cream-/Off-White-Bereiche bringen Ruhe, menschliche Wärme und exzellente redaktionelle Lesbarkeit.
- **NOTES**: Statisches Design muss bereits ohne Animationen perfekt funktionieren.

### DEC-005: Cloudflare als verbindliches Deployment-Ziel
- **DATE**: 2026-09-18
- **STATUS**: `CONFIRMED`
- **RATIONALE**: Überragende weltweite Edge-Performance, moderne Worker/Pages-Infrastruktur, keine Abhängigkeit von Vercel.
- **NOTES**: Noch keine Adapter-Dateien vor der Framework-Entscheidung anlegen.

### DEC-006: Neon PostgreSQL als verbindliche Datenbank
- **DATE**: 2026-09-18
- **STATUS**: `CONFIRMED`
- **RATIONALE**: Moderne Serverless PostgreSQL mit Branching und optimaler Eignung für Edge-/Serverless-Runtimes.
- **NOTES**: Zugriff ausschließlich serverseitig. Noch keine DB provisionieren.

### DEC-007: Keine aggressive Sales-Journey & kein Budget-Prequalifying
- **DATE**: 2026-09-18
- **STATUS**: `CONFIRMED`
- **RATIONALE**: Schafft eine barrierefreie, sympathische und professionelle Kontaktaufnahme auf Augenhöhe.
- **NOTES**: Formular mit Name, E-Mail, Nachricht sowie direkter E-Mail-Adresse und LinkedIn.

### DEC-008: Design-Tooling: Impeccable & Google Stitch MCP
- **DATE**: 2026-09-18
- **STATUS**: `CONFIRMED`
- **RATIONALE**:
  - **Impeccable** dient als projektbezogenes Tool für Design Critique, Refinement, Entrümpelung und abschließende visuelle Qualitätsprüfung, sobald konkrete Entwürfe vorliegen.
  - **Google Stitch MCP** dient als Tooling für visuelle Design-Exploration, Variantenbildung und Prototyping.
- **NOTES**: Beide Werkzeuge sind reines Development- und Design-Tooling, stellen **keine Runtime-Dependencies** dar und dürfen niemals Source-of-Truth-Entscheidungen oder Briefing-Vorgaben aus `/docs` überschreiben.

---

## 🧭 Aktuelle Arbeitsrichtungen `[WORKING DIRECTION]`

### DEC-009: Working Copy & Hero Headline
- **DATE**: 2026-09-18
- **STATUS**: `WORKING DIRECTION`
- **RATIONALE**: Hero Headline: *"FROM IDEA TO DIGITAL EXPERIENCE."* spiegelt den End-to-End-Gedanken wider.
- **NOTES**: Dient aktuell als Demo-Copy für Rhythmus und Typografie, noch nicht als finale Marketing-Copy.

### DEC-010: Strukturierung in 3 Haupt-Leistungsbereiche
- **DATE**: 2026-09-18
- **STATUS**: `WORKING DIRECTION`
- **RATIONALE**: Vermeidung einer unübersichtlichen Einzelleistungs-Liste durch Fokussierung auf: 1. Websites & Commerce, 2. Apps & Business Systems, 3. AI & Automation.
- **NOTES**: UI/UX, Motion und Code durchdringen alle drei Bereiche.

### DEC-011: Locale-basiertes Routing (`/de`, `/en`)
- **DATE**: 2026-09-18
- **STATUS**: `WORKING DIRECTION`
- **RATIONALE**: Saubere Trennung für SEO (`hreflang`), Caching und Teilen von URLs.
- **NOTES**: Noch nicht technisch implementieren.

### DEC-012: Next.js App Router (ursprünglicher Kandidat)
- **DATE**: 2026-09-18
- **STATUS**: `SUPERSEDED` (durch DEC-014 & DEC-R08)
- **RATIONALE**: War der initiale Evaluierungskandidat. Wurde nach Verifikation der Cloudflare- und Vite-Architektur zugunsten von React Router v8 verworfen.

### DEC-013: 9-teilige Homepage-Sektionsfolge
- **DATE**: 2026-09-18
- **STATUS**: `WORKING DIRECTION`
- **RATIONALE**: 01 Hero → 02 Selected Work → 03 Dark-Cream-Transition → 04 About → 05 What I Do → 06 Experience → 07 The Lab → 08 Trust Elements → 09 Final CTA.
- **NOTES**: Wird in drei Design-Explorationen (Cinematic, Editorial, Hybrid) getestet.

### DEC-014: React Router v8 + Vite + Cloudflare Workers als verbindliches Framework
- **DATE**: 2026-09-25
- **STATUS**: `CONFIRMED`
- **RATIONALE**: React Router v8 bietet native TypeScript/TSX-Workflows, erstklassige Vite-Integration via `@cloudflare/vite-plugin`, Server-Side-Rendering auf Cloudflare Workers (`workerd`), sauberes Locale-Routing und schlanke Server-Funktionen (Loaders/Actions) ohne die künstliche Komplexität oder Shim-Schichten von Next.js auf Cloudflare (`@opennextjs/cloudflare`).
- **NOTES**: Initialisierung erfolgt direkt im Root des Repositories.

### DEC-015: 3D Computational Point-Cloud Sculpture im Hero
- **DATE**: 2026-10-10
- **STATUS**: `PAUSED — awaiting decision on personalized facial geometry`
- **RATIONALE**: 
  - Genuiner, GPU-gerenderter 3D Point-Cloud-Bust mittels Three.js BufferGeometry + Custom GLSL Vertex- und Fragment-Shadern (Variante A: feine Partikelgröße, Chiaroscuro-Licht, Obsidian-Negativraum, PointerMove-Interaktion, Scroll-Dissolve).
  - Derzeitiges generisches Basismesh ähnelt dem echten Practitioner noch nicht hinreichend.
  - Die Weiterentwicklung des Porträts ist auf Nutzeranweisung **ausdrücklich pausiert**.
  - Es wird vorerst kein bestimmter Scan-Workflow (Smartphone FaceID vs. Photogrammetrie) verbindlich vorgeschrieben.
  - Der bestehende Rendering- und Shader-Code in `app/components/portrait/` bleibt unberührt erhalten.
- **NOTES**: Vor einem späteren Public-Release muss die Herkunft des aktuellen Basismeshs (Lee Perry Smith Dataset / Infinite-Realities CC-BY) auf Lizenz- und Namensnennungspflichten verifiziert werden. Private Porträtfotos in `assets/portraits/private/` bleiben strikt privat.

### DEC-016: D3.1 — Visual Polish als freigegebene visuelle Implementierungs-Baseline
- **DATE**: 2026-10-10
- **STATUS**: `CONFIRMED BASELINE`
- **RATIONALE**: Nach systematischer Exploration über Stitch MCP (A, B, C, D, D2, D3) wurde Variante D3.1 (Stitch Project `9864955914556862585`, Screen `projects/9864955914556862585/screens/6ee11b79164049f5885ec647cf18a32a`) als visuelle Baseline freigegeben. Der bestehende React-Code in `app/components/` und `app/app.css` wurde an dieses Layout angeglichen.
- **NOTES**: D3.1 definiert die freigegebene visuelle Makro-Struktur (3-Akt-Dramaturgie, Layout-Hierarchie), nicht die finale Festschreibung jedes Dummy-Textes oder Webfonts.

### DEC-017: Priorisierung der vollständigen Multi-Page-Portfolio-Fertigstellung
- **DATE**: 2026-10-10
- **STATUS**: `CONFIRMED`
- **RATIONALE**: Die Homepage ist das visuelle Fundament, nicht das gesamte Produkt. Um die Proof-of-Work- und Vertrauensfunktion glaubwürdig zu erfüllen, hat die Fertigstellung der eigenständigen Work-Übersicht (`/de/work`), der Case-Study-Routen (`/de/work/:slug`), der funktionalen Kontaktseite (`/de/contact`) und der rechtlichen Seiten (`/de/impressum`, `/de/datenschutz`) Vorrang vor weiteren isolierten Homepage-Animationen.
- **NOTES**: Alle anstehenden Aufgaben werden im operativen Backlog [`docs/14-implementation-backlog.md`](14-implementation-backlog.md) geführt.

### DEC-018: Domain-Präferenz 'bywilk' als vorläufige Arbeitsrichtung
- **DATE**: 2026-10-10
- **STATUS**: `WORKING DIRECTION`
- **RATIONALE**: Die Domain-Idee `bywilk` (bzw. `bywilk.com` / `bywilk.dev` / `wilk.studio`) ist eine vielversprechende Arbeitspräferenz für das spätere Branding.
- **NOTES**: Die Domain ist **weder gekauft noch final bestätigt**. Bis zur tatsächlichen DNS-Einrichtung bleibt dieser Status eine reine `WORKING DIRECTION`.

### DEC-019: Lokales, dateibasiertes Content-System für Portfolio-Projekte
- **DATE**: 2026-10-10
- **STATUS**: `WORKING DIRECTION`
- **RATIONALE**: Reale Arbeitserfahrung existiert (Pool aus 10 Kandidatenprojekten in `docs/01-content-inventory.md`). Für die initiale Bereitstellung des Portfolios ist ein lokales, typisiertes Datenmodell in `content/projects/` vollständig ausreichend und latenzfrei.
- **NOTES**: Weder Headless CMS noch relationale Datenbanken sind für den initialen Content-Launch erforderlich. Die Auswahl der finalen Leitprojekte für "Selected Work" bedarf noch der Bestätigung (`NEEDS CONFIRMATION`).

### DEC-020: Work-Archiv-Design: Variant C (Minimalist Editorial Index) bestätigt
- **DATE**: 2026-10-10
- **STATUS**: `CONFIRMED`
- **RATIONALE**: Nach Analyse von Variant A (Cinematic Gallery) und Variant B (Refined Archive) sowie Einbindung des Referenz-Screenshots (Michael Ocean Inspiration) wurde Variant C (`projects/9864955914556862585/screens/1a80a64291984da0bde44794b4c368c5`) als visuelles Fundament für die eigenständige Work-Archiv-Seite (`/work`) freigegeben.
- **MERKMALE**: Großzügiger Weißraum, Haarlinien-Teiler, monumentale Titelzeile mit horizontal gekoppeltem dynamischem Projektzähler, diszipliniertes 3-Spalten-Raster, dezente Bild-Hover-Effekte, keine Pseudo-Telemetrie oder Fake-Dashboards.
- **NOTES**: Visuell in React und CSS vollständig implementiert; läuft aktuell mit 6 klar deklarierten lokalen Vorschau-Kandidaten (`PREVIEW_FIXTURES`), bis reale Kundenprojekte und Bildmaterial freigegeben sind.

---

## 🔍 Noch offene Entscheidungen `[OPEN / TODO]`

- **DEC-O1**: Finales Frontend-Framework `[RESOLVED -> DEC-014 (React Router v8)]`.
- **DEC-O2**: Cloudflare Adapter & Build-Pipeline `[RESOLVED -> DEC-014 (@cloudflare/vite-plugin)]`.
- **DEC-O3**: ORM / Query Builder (Drizzle ORM vs. Kysely) `[DEFERRED -> DB aktuell unprovisioniert]`.
- **DEC-O4**: Konkrete Schriftarten (Finaler Webfont-Stack vs. kommerzieller Editorial-Schnitt).
- **DEC-O5**: Exakte Hex-/OKLCH-Farbwerte `[RESOLVED -> D3.1 Baseline in app.css verifiziert]`.
- **DEC-O6**: Art des Hero-Visuals `[RESOLVED -> DEC-015 (3D Canvas implementiert, pausiert)]`.
- **DEC-O7**: Gewinner der Design-Explorationen `[RESOLVED -> DEC-016 (D3.1 Visual Polish)]`.
- **DEC-O8**: Motion-Stack für seitenweites Scrollen (GSAP + Lenis vs. CSS-Fokus) `[OPEN]`.
- **DEC-O9**: Transaktions-E-Mail-Provider für Kontaktanfragen (Resend vs. Cloudflare Workers Mail) `[OPEN]`.
- **DEC-O10**: Datenschutzkonforme Analytics (Cloudflare Web Analytics vs. Plausible/Umami) `[OPEN]`.
- **DEC-O11**: CMS-Bedarf `[RESOLVED -> DEC-019 (Lokale strukturierte Dateien in content/projects/)]`.
- **DEC-O12**: Auswahl der 2–3 "Selected Work" Leitprojekte aus dem Kandidatenpool `[OPEN / NEEDS CONFIRMATION]`.
- **DEC-O13**: Finale Domain-Registrierung `[OPEN / NEEDS CONFIRMATION]`.

---

## 🚫 Bewusst verworfene Richtungen `[REJECTED]`

### DEC-R01: Reine "Webdesigner"-Positionierung
- **DATE**: 2026-09-18 | **STATUS**: `REJECTED`
- **RATIONALE**: Schränkt die Wahrnehmung auf Template-Anpassungen ein und unterschlägt tiefgreifende Software- und Produktentwicklungskompetenzen.

### DEC-R02: "Freelancer" als dominantes Haupt-Label
- **DATE**: 2026-09-18 | **STATUS**: `REJECTED`
- **RATIONALE**: Das Portfolio soll primär professionelle Qualität und handwerkliche Exzellenz ausstrahlen, nicht primär eine Abrechnungsform.

### DEC-R03: WordPress als aktiver Schwerpunkt
- **DATE**: 2026-09-18 | **STATUS**: `REJECTED`
- **RATIONALE**: Das Portfolio fokussiert moderne, individuelle Software- und Webtechnologien.

### DEC-R04: Reine Logo-/Branding-Services als Hauptangebot
- **DATE**: 2026-09-18 | **STATUS**: `REJECTED`
- **RATIONALE**: Visuelle Identität wird ausschließlich als ergänzender Baustein digitaler Produkte angeboten.

### DEC-R05: Skill-Prozentbalken ("CSS 90%")
- **DATE**: 2026-09-18 | **STATUS**: `REJECTED`
- **RATIONALE**: Prozentbalken sind unprofessionell, subjektiv und besitzen keinerlei qualitative Aussagekraft.

### DEC-R06: Generische AI- / SaaS-Ästhetik
- **DATE**: 2026-09-18 | **STATUS**: `REJECTED`
- **RATIONALE**: Lila-blaue Gradienten, austauschbare Illustrationen und modische Schablonen zerstören die angestrebte zeitlose Editorial-Wirkung.

### DEC-R07: Sinnlose Bento-Grid-Layouts
- **DATE**: 2026-09-18 | **STATUS**: `REJECTED`
- **RATIONALE**: Bento-Grids werden oft als reiner Trend ohne Rücksicht auf inhaltliche Hierarchie eingesetzt.

### DEC-R08: Next.js (App Router) für dieses Projekt
- **DATE**: 2026-09-25 | **STATUS**: `REJECTED / SUPERSEDED`
- **RATIONALE**: Next.js erfordert auf dem bestätigten Deployment-Ziel Cloudflare zusätzliche Transpilations- und Shim-Schichten (`@opennextjs/cloudflare`) zur Emulation von Node.js-/Vercel-Runtimes. React Router v8 mit Vite und `@cloudflare/vite-plugin` läuft nativ auf Cloudflare Workers (`workerd`) und bietet eine deutlich wartungsärmere, schlankere Architektur ohne Vercel-Vendor-Lock-in.
