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

---

## 🔍 Noch offene Entscheidungen `[OPEN / TODO]`

- **DEC-O1**: Finales Frontend-Framework `[RESOLVED -> DEC-014]`.
- **DEC-O2**: Cloudflare Adapter & Build-Pipeline `[RESOLVED -> @cloudflare/vite-plugin + React Router]`.
- **DEC-O3**: ORM / Query Builder (Drizzle ORM vs. Kysely).
- **DEC-O4**: Konkrete Schriftarten (Headline-Serif/-Grotesk & Body-Font).
- **DEC-O5**: Exakte Hex-/OKLCH-Farbwerte für Dark- und Cream-Bereiche.
- **DEC-O6**: Art des Hero-Visuals (Typografisch vs. 3D-Asset vs. Bild).
- **DEC-O7**: Gewinner der 3 Design-Explorationen (A: Cinematic, B: Editorial, C: Hybrid).
- **DEC-O8**: Motion-Stack (GSAP + Lenis vs. nativer CSS-Fokus).
- **DEC-O9**: Transaktions-E-Mail-Provider für Kontaktanfragen (Resend vs. Cloudflare Workers Mail).
- **DEC-O10**: Datenschutzkonforme Analytics (Cloudflare Web Analytics vs. Plausible/Umami).
- **DEC-O11**: CMS-Bedarf (Start mit lokalen typisierten Markdown/MDX-Dateien).

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
