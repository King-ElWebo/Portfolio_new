# Implementation Backlog & Action Roadmap

> **Status**: ACTIVE SOURCE OF TRUTH FOR DEVELOPMENT  
> **Referenz**: Abgeleitet aus den Architekturentscheidungen in [`docs/13-decision-log.md`](13-decision-log.md), dem Master Build Plan in [`docs/08-build-plan.md`](08-build-plan.md) und den Engineering Standards in [`docs/10-engineering-standards.md`](10-engineering-standards.md).  
> **Prioritätsstufen**:  
> - `P0` — Blocker / Fundamentale Kernanforderung (muss vor weiteren Schritten gelöst werden)  
> - `P1` — Wichtige Produktfunktion / Qualitäts- & Barrierefreiheitsanforderung  
> - `P2` — Veredelung, Micro-Interaktionen, optionale Erweiterung  
> - `PAUSED` — Bewusst pausierte Aufgabe (Reaktivierung nur nach Nutzerentscheidung)

---

## 🧭 Übersicht der Epics

| Epic | Bezeichnung | Fokus & Kernziel | Status |
| :--- | :--- | :--- | :--- |
| **EPIC A** | **Foundation & Documentation Synchronization** | Bereinigung aller Widersprüche und Etablierung des realen Ist-Zustands | `COMPLETED` |
| **EPIC B** | **Multi-Page Routing & Navigation Architecture** | Fehlerfreie Navigation über alle Unterseiten, Locale-Persistierung & HTML-Shell | `IN PROGRESS` (NAV-001 & NAV-002 abgeschlossen) |
| **EPIC C** | **Content System & Truthful Project Modeling** | Typisiertes lokales Datenmodell & Erfassung realer Projektfakten (Weg von D3.1-Demos) | `COMPLETED` |
| **EPIC D** | **Work Archive & Individual Case Study Pages** | Eigenständige Work-Page (`/work`) & alle 7 Case-Study-Routen (`/work/:slug`) | `COMPLETED` (WORK-001, CASE-001 & CASE-002 vollständig umgesetzt & verifiziert) |
| **EPIC E** | **Production Contact & Statutory Legal Pages** | Echtes Server-Handling für Formulare, E-Mail-Provider & gesetzeskonforme Legal-Pages | `COMPLETED` (CONT-004, CONT-005 & LEGAL-001 implementiert & verifiziert) |
| **EPIC F** | **Design Refinement, Motion & Paused Portrait** | Scroll-Scrubbing der Dark-Cream-Bridge, Lab-Interaktionen & Porträt-Wiederaufnahme | `PLANNED / PAUSED` |
| **EPIC G** | **Quality Gates, Tooling, SEO & Cloudflare Launch** | Linter/Test-Setup, SEO (Hreflang, Sitemap), WCAG 2.2 AA Audit & Cloudflare Go-Live | `PLANNED` |

---

## EPIC A — Foundation & Documentation Synchronization

### `SYNC-001`: Vollständiger Dokumentations- & Architektur-Audit
- **Zweck**: Synchronisation aller 14 Markdown-Dateien in `/docs`, `README.md`, `AGENTS.md` und `PRODUCT.md` mit dem realen React Router v8 + Cloudflare Workers Stack.
- **Aktueller Status**: `COMPLETED` (in diesem Durchlauf abgeschlossen).
- **Priorität**: `P0`
- **Abhängigkeiten**: Keine.
- **Akzeptanzkriterien**:
  1. Keine veralteten Aussagen über "ungeklärte Frameworks" oder "Next.js" in aktiven Richtlinien.
  2. D3.1 als visuelle Implementierungs-Baseline dokumentiert.
  3. Partikel-Porträt als `PAUSED` dokumentiert.
  4. Kandidatenpool für Inhalte in `docs/01-content-inventory.md` erfasst.
- **Betroffene Dateien**: Alle Dateien in `docs/`, `AGENTS.md`, `PRODUCT.md`, `README.md`.
- **Nutzer-Input erforderlich**: Nein.

---

## EPIC B — Multi-Page Routing & Navigation Architecture

### `NAV-001`: Header-Navigation für Unterseiten entkoppeln (Seitenlinks vs. Anchors)
- **Zweck**: Klicks auf Navigationselemente wie `Work`, `Contact` oder Homepage-Sektionen dürfen auf Unterseiten (`/de/work`, `/de/contact`) nicht zu toten relativen Hash-Links (`/de/work#work`) führen.
- **Aktueller Status**: `COMPLETED` (in Milestone 1 umgesetzt & verifiziert)
- **Priorität**: `P0`
- **Abhängigkeiten**: Keine.
- **Akzeptanzkriterien**:
  1. `Work` verlinkt seitenweit auf `/${locale}/work`.
  2. `Contact` verlinkt seitenweit auf `/${locale}/contact`.
  3. Homepage-Sektionslinks (`Capabilities`, `Practitioner`, `The Lab`) springen auf der Homepage direkt via Hash, auf Unterseiten absolut via `/${locale}#section`.
  4. Aktiver Link wird visuell hervorgehoben (Active State).
  5. Mobiles Schubladenmenü schließt sich zuverlässig bei jedem Navigationsschritt.
- **Betroffene Dateien**: `app/components/layout/SiteHeader.tsx`, `app/routes.ts`, `app/routes/home.tsx`, `app/app.css`.
- **Empfohlene Skills**: `web-accessibility`
- **Nutzer-Input erforderlich**: Nein.

### `NAV-002`: Persistente Sprachwahl & dynamisches HTML `lang`-Attribut
- **Zweck**: Behebung des statischen `<html lang="en">` in `root.tsx` und Sicherstellung, dass manuelle Sprachwechsel über Sessions hinweg gespeichert bleiben.
- **Aktueller Status**: `COMPLETED` (in Milestone 1 umgesetzt & verifiziert)
- **Priorität**: `P0`
- **Abhängigkeiten**: Keine.
- **Akzeptanzkriterien**:
  1. `app/root.tsx` rendert dynamisch `<html lang={locale}>` basierend auf dem aktiven Routen-Parameter.
  2. Klick auf den Sprachwechsler speichert die Präferenz in einem Cookie (`portfolio_locale`).
  3. `app/routes/_index.tsx` prüft zuerst das Cookie, bevor auf den `Accept-Language`-Header zurückgegriffen wird.
  4. Fehlerfreier Fallback: Unbekannte Locales leiten auf `/en` oder `/de` um (404-Vermeidung).
- **Betroffene Dateien**: `app/root.tsx`, `app/routes/_index.tsx`, `app/components/layout/SiteHeader.tsx`, `app/components/layout/SiteFooter.tsx`, `app/i18n/locale.ts`.
- **Nutzer-Input erforderlich**: Nein.

### `NAV-003`: Footer-Navigation & Metadaten-Normalisierung
- **Zweck**: Beseitigung von Dummy-Links und Platzhaltern im globalen Footer.
- **Aktueller Status**: `READY FOR IMPLEMENTATION`
- **Priorität**: `P1`
- **Abhängigkeiten**: `NAV-001`
- **Akzeptanzkriterien**:
  1. Der Link `Legal` verweist nicht mehr auf `#hero`, sondern auf die geplante Impressum-Route (`/${locale}/impressum`).
  2. E-Mail-Link nutzt die bestätigte Arbeits-E-Mail statt `wilk@studio.lab`.
  3. LinkedIn-Link führt zu einem konfigurierbaren Profil oder öffnet sich barrierefrei mit `rel="noopener noreferrer"`.
  4. Sprachumschalter im Footer verhält sich identisch zum Header-Switcher.
- **Betroffene Dateien**: `app/components/layout/SiteFooter.tsx`.
- **Nutzer-Input erforderlich**: Bestätigung der finalen Footer-Links/E-Mail-Adresse.

---

## EPIC C — Content System & Truthful Project Modeling

### `CONT-001`: Typisiertes lokales Projekt-Datenmodell (`app/types/project.ts`, `app/data/projects.ts`)
- **Zweck**: Schaffung eines autarken, latenzfreien Datenmodells für alle Portfolio-Projekte basierend auf dem 17-Punkte-Schema aus `docs/01-content-inventory.md`.
- **Aktueller Status**: `COMPLETED`
- **Priorität**: `P0`
- **Abhängigkeiten**: Keine.
- **Akzeptanzkriterien**:
  1. `ProjectEntry` als TypeScript-Interface definiert (Slug, Titel, Descriptor, Kategorie, Rolle, Jahr, Summary, Tags, Image, LiveUrl, Kind, Status).
  2. Modul zum Laden von Projekten nach Filter und Status (`getProjects()`, `getProjectCounts()`).
  3. Vollständige Typprüfung via `npm run typecheck`.
  4. Klare Trennung zwischen `client_project` und `independent_concept`.
- **Betroffene Dateien**: `app/types/project.ts`, `app/data/projects.ts`.
- **Nutzer-Input erforderlich**: Nein.

### `CONT-002`: Erfassung realer Projektfakten für Selected Work & Work Archiv
- **Zweck**: Ersetzen der fiktiven Stitch-D3.1-Projekte durch reale Kundenprojekte und geprüfte unabhängige Demos aus den GitHub-Repositories des Entwicklers.
- **Aktueller Status**: `COMPLETED`
- **Priorität**: `P0`
- **Abhängigkeiten**: `CONT-001`
- **Akzeptanzkriterien**:
  1. 3 echte Kundenprojekte (Checkpot Hietzing, Let It Bloom, FKW-G) mit geprüfter Architektur erfasst.
  2. 4 unabhängige Demos (LUMENWERK Studio, SPEICHE, RÖSTWERK 1070, KERN / FIELD) als "The Lab" / Independent Concepts erfasst.
  3. Keine erfundenen Metriken, Kunden oder Testimonials gemäß `AGENTS.md`.
  4. Deutsche und englische Texte für alle Arbeiten formuliert und Homepage ("Selected Work") angebunden.
- **Betroffene Dateien**: `app/data/projects.ts`, `app/i18n/translations.ts`, `app/components/sections/SelectedWork.tsx`.
- **Nutzer-Input erforderlich**: Bestätigt.

### `CONT-003`: Bereinigung von Demo-Strings in `translations.ts`
- **Zweck**: Entflechtung von UI-Texten und Projektinhalten; Entfernung von Stitch-spezifischen Platzhalter-Strings (wie "D3 — " im Meta-Title).
- **Aktueller Status**: `READY FOR IMPLEMENTATION`
- **Priorität**: `P1`
- **Abhängigkeiten**: `CONT-001`
- **Akzeptanzkriterien**:
  1. `meta.title` in `translations.ts` enthält saubere, produktionsreife Titel ohne interne Versionskürzel.
  2. UI-Strings (Navigation, Labels, Sektions-Überschriften) bleiben in `translations.ts`; projektspezifische Daten wandern ins strukturierte Projektmodell (`CONT-001`).
- **Betroffene Dateien**: `app/i18n/translations.ts`.
- **Nutzer-Input erforderlich**: Nein.

---

## EPIC D — Work Archive & Individual Case Study Pages

### `WORK-001`: Eigenständige Work-Archiv-Seite (`/:locale/work`)
- **Zweck**: Die Work-Seite darf nicht bloß die Homepage-Sektion wiederholen, sondern muss als kuratiertes Gesamtarchiv aller Arbeiten fungieren.
- **Aktueller Status**: `COMPLETED` (Variant C visuell und datenseitig mit 7 verifizierten Projekten, Filterung und Responsive Grid implementiert)
- **Priorität**: `P0`
- **Abhängigkeiten**: `NAV-001`, `CONT-001`, `CONT-002`
- **Akzeptanzkriterien**:
  1. Eigener redaktioneller Kopfbereich nach Variant C (Minimalist Editorial Index) mit Haarlinien-Teiler und dynamischem Zähler.
  2. Filterleiste: *Alle Arbeiten*, *Kundenprojekte*, *The Lab*, basierend auf aktivem Datensatz dynamisch gezählt.
  3. Diszipliniertes 3-Spalten-Raster mit einheitlicher Anatomie (Index, Titel/Descriptor, Kategorie, Bild-Viewport, Hover-Reveal).
  4. Responsive Umsetzung: 3 Spalten Desktop (1440px/1920px), 2 Spalten Tablet (768px), 1 Spalte Mobile (390px).
  5. Typisiertes Datenmodell in `app/types/project.ts` & `app/data/projects.ts` mit strikter Trennung zwischen Produktion (`APPROVED_PROJECTS`) und Entwicklungs-Vorschau (`PREVIEW_FIXTURES`).
  6. Keine toten 404-Links auf noch ungebaute Case-Study-Routen.
  7. Saubere SSR-Ausführung im React Router Loader.
- **Betroffene Dateien**: `app/routes/work.tsx`, `app/components/work/`, `app/types/project.ts`, `app/data/projects.ts`, `app/app.css`.
- **Empfohlene Skills**: `frontend-design`, `ui-styling`
- **Nutzer-Input erforderlich**: Auswahl und Bereitstellung realer Kundenfakten & Bildmaterial (`CONT-002`).

### `CASE-001`: Dynamische Case Study Route (`/:locale/work/:slug`) & Basis-Template
- **Zweck**: Detaillierte Einzelfallstudien nach [`docs/07-project-template.md`](07-project-template.md).
- **Aktueller Status**: `COMPLETED` (Alle 7 Case Studies vollständig über die dynamische Route `work/:slug` mit Typisierung, bilingualem SSR Loader und responsivem Layout implementiert und visuell verifiziert)
- **Priorität**: `P0`
- **Abhängigkeiten**: `routes.ts`, `CONT-001`
- **Akzeptanzkriterien**:
  1. Route `route("work/:slug", "routes/case-study.tsx")` in `app/routes.ts` registriert.
  2. Loader lädt Projektdaten anhand von `:locale` und `:slug`; wirft 404 bei unbekanntem Slug.
  3. Vollständige Umsetzung des redaktionellen Schemas: Hero, Overview, Challenge/Friction, Dual-Device-Redesign, Custom CMS/Fachsoftware Deep-Dive, Engineering Architecture, Resultat & Learnings, zyklische Next-Project-Navigation.
  4. "Next Project"-Sektion am Seitenende für nahtlosen Lesefluss (vollständiger Zyklus über alle 7 Projekte).
  5. Dynamische SEO-Metadaten (Title, Description, OG-Image) im `meta`-Export.
- **Betroffene Dateien**: `app/routes.ts`, `app/routes/case-study.tsx`, `app/components/case-study/`, `app/types/case-study.ts`, `app/data/case-studies/`.
- **Empfohlene Skills**: `frontend-design`, `emil-design-eng`
- **Nutzer-Input erforderlich**: Nein.

### `CASE-002`: Projektspezifische Art Direction & Medien-Layouts
- **Zweck**: Vermeidung eines monotonen Einheitslayouts; jede Case Study transportiert den individuellen visuellen Charakter des Projekts.
- **Aktueller Status**: `COMPLETED` (Für alle 7 Projekte mit individueller Palette, warmem Editorial-Rhythmus, authentischen Desktop- (1440px) & Mobile-Screenshots (390px), Fachsoftware-Cockpits und echten Medien fertiggestellt)
- **Priorität**: `P1`
- **Abhängigkeiten**: `CASE-001`
- **Akzeptanzkriterien**:
  1. Template unterstützt projektspezifische Farb-Akzente (`#c2a284`, `#8a9a86`, `#c25d48`, `#d4a373`, `#4a7c59`, `#b87333`, `#a3907c` etc.).
  2. Unterstützung unterschiedlicher Medienformate: Fullscreen-Hero, Dual-Device-Mockups (Desktop 1440px + Mobile 390px), authentische Vorher-Gegenüberstellung, Lookbook-Streifen, interaktive Admin-Shells, sensorische Radare, Licht-Konfiguratoren und Werkstatt-Auftragsansichten.
- **Betroffene Dateien**: `app/components/case-study/`, `app/app.css`, `app/data/case-studies/`.
- **Nutzer-Input erforderlich**: Nein (Authentische Screenshots aus lokalen Live-Demos extrahiert).

---

## EPIC E — Production Contact & Statutory Legal Pages

### `CONT-004`: Server-Side Contact Form Submission & Email Delivery
- **Zweck**: Echtes serverseitiges Handling für Formulareinsendungen via Resend REST API mit Cloudflare Email Routing und robustem Spam-Schutz.
- **Aktueller Status**: `COMPLETED`
- **Priorität**: `P0`
- **Abhängigkeiten**: Keine.
- **Akzeptanzkriterien**:
  1. Universeller Endpoint `app/routes/api.contact.ts` verarbeitet `POST`-Anfragen von Homepage und Kontaktseite serverseitig in Cloudflare Workers.
  2. Strikte Server-Validierung (Name, E-Mail mit RFC-5322-Regex, Nachricht 10–5000 Zeichen).
  3. Robuster Spam-Schutz: Unsichtbares Honeypot-Feld (`_gotcha`), CRLF-Injektionsfilter, HTML-Escaping, optionales Turnstile-Gate bei konfiguriertem Secret.
  4. Integration der Resend REST API mit Region Dublin (`https://api.resend.com/emails`), Absender `WILK Portfolio <contact@bywilk.at>`, Empfänger `office@bywilk.at`, `Reply-To` auf Besucher-Adresse.
  5. Saubere Fehler- und Erfolgsrückmeldungen mit ARIA Live Regions (`role="status"`); Client meldet nur dann Erfolg, wenn Resend HTTP 200/201 bestätigt.
  6. Keine Ausflockung von PII oder API-Keys in Server-Logs; `RESEND_API_KEY` verbleibt als Cloudflare Secret.
- **Betroffene Dateien**: `app/routes/api.contact.ts`, `app/components/sections/HomeContact.tsx`, `app/components/sections/Contact.tsx`, `wrangler.jsonc`, `workers/app.ts`.
- **Empfohlene Skills**: `web-accessibility`
- **Nutzer-Input erforderlich**: `RESEND_API_KEY` als Cloudflare Secret im Dashboard hinterlegen.

### `CONT-005`: Dedizierte Kontaktseite (`/:locale/contact`) als eigene Experience
- **Zweck**: Eigenständige Kontaktseite mit ruhigem, fokussiertem Layout, konsistenter Backend-Anbindung und nativer Ausweichoption.
- **Aktueller Status**: `COMPLETED`
- **Priorität**: `P1`
- **Abhängigkeiten**: `CONT-004`
- **Akzeptanzkriterien**:
  1. Spezifisches redaktionelles Layout für Kontaktanfragen mit Verfügbarkeitshinweis und direkter E-Mail-Adresse (`office@bywilk.at`).
  2. Saubere mobile und Desktop-Spaltenaufteilung.
  3. Vollständige Anbindung an `/api/contact` mit Client-Validierung, dynamischem Versandstatus und zugänglichem Mailto-Fallback.
- **Betroffene Dateien**: `app/routes/contact.tsx`, `app/components/sections/Contact.tsx`.
- **Nutzer-Input erforderlich**: Nein.

### `LEGAL-001`: Gesetzliche Legal-Pages (Impressum & Datenschutz)
- **Zweck**: Bereitstellung der rechtlich erforderlichen Impressums- und Datenschutz-Routen im authentischen WILK-Dark-Editorial-Design für den österreichischen Rechtsrahmen.
- **Aktueller Status**: `COMPLETED`
- **Priorität**: `P0`
- **Abhängigkeiten**: `routes.ts`
- **Akzeptanzkriterien**:
  1. Routen `/de/impressum`, `/en/legal-notice`, `/de/datenschutz`, `/en/privacy` mit sauberem bidirektionalem Sprachwechsel in `routes.ts` registriert.
  2. Authentisches Dark-Editorial-Layout (`app/styles/legal.css`) passend zur Design-DNA von WILK.
  3. Vollständige, verifizierte Pflichtangaben für den österreichischen Einzelunternehmer Benjamin Wilk (Wien, GISA 39386267, MBA 13/14, keine UID, keine Firmenbuchnummer).
  4. Datenschutz-Text deckt Cloudflare Workers Edge, Cloudflare Web Analytics (cookie-frei), funktionale Sprachspeicherung (`portfolio_locale`), lokale Webfonts, Resend-Infrastruktur (Region Dublin, EU-US DPF) und 7-jährige Aufbewahrungsdifferenzierung (§ 132 BAO / § 212 UGB) transparent ab.
  5. Vollständige Ersetzung externer Google Fonts durch 21 lokale WOFF2-Dateien in `public/assets/fonts/` und Bereinigung externer Bild-Fixtures.
  6. Seitenweite barrierefreie Verlinkung in `HomeFooter` und `SiteFooter`.
- **Betroffene Dateien**: `app/routes.ts`, `app/routes/impressum.tsx`, `app/routes/legal-notice.tsx`, `app/routes/datenschutz.tsx`, `app/routes/privacy.tsx`, `app/styles/legal.css`, `app/components/layout/HomeFooter.tsx`, `app/components/layout/SiteFooter.tsx`, `app/root.tsx`, `app/styles/fonts.css`.
- **Nutzer-Input erforderlich**: Nein.

---

## EPIC F — Design Refinement, Motion & Paused Portrait

### `MOT-001`: Scroll-Scrubbed Dark → Cream Transition Bridge
- **Zweck**: Flüssiger, kontinuierlicher Farbumschwung zwischen Act I (Obsidian) und Act II (Cream) beim Scrollen.
- **Aktueller Status**: `PLANNED`
- **Priorität**: `P1`
- **Abhängigkeiten**: Keine.
- **Akzeptanzkriterien**:
  1. Visueller Farbübergang erfolgt harmonisch ohne hartes "Aufblitzen".
  2. Vollständige Unterstützung von `@media (prefers-reduced-motion: reduce)` (sofortiger harter Umschlag ohne Animation).
  3. Keine Performance-Einbußen (60 FPS beim Scrollen).
- **Betroffene Dateien**: `app/components/sections/TransitionBridge.tsx`, `app/app.css`.
- **Empfohlene Skills**: `cinematic-gsap-lenis-motion-system`, `gsap-scrolltrigger`
- **Nutzer-Input erforderlich**: Nein.

### `MOT-002`: Interaktive Lab-Karten Polish
- **Zweck**: Die Kacheln in `Lab.tsx` verfügen aktuell nur über statische `<span>`-Tags (`DEMO ↗`, `RUN ↗`). Verleihung echter Interaktivität.
- **Aktueller Status**: `PLANNED`
- **Priorität**: `P2`
- **Abhängigkeiten**: Keine.
- **Akzeptanzkriterien**:
  1. Klicks auf Aktionen öffnen entweder eine Live-Interaktion, ein interaktives Modal oder verlinken auf das zugehörige Lab-Experiment.
  2. Tastaturfokussierbar mit sauberem `:focus-visible`.
- **Betroffene Dateien**: `app/components/sections/Lab.tsx`.
- **Empfohlene Skills**: `emil-design-eng`
- **Nutzer-Input erforderlich**: Nein.

### `PORT-001`: Wiederaufnahme des 3D Partikel-Porträts (Aktuell PAUSIERT)
- **Zweck**: Ersetzen des generischen Basismeshs durch authentische Gesichtsgeometrie des Practitioners.
- **Aktueller Status**: `PAUSED — AWAITING USER DECISION`
- **Priorität**: `P2`
- **Abhängigkeiten**: Nutzerentscheidung über 3D-Scan-Workflow.
- **Akzeptanzkriterien**:
  1. Nutzer stellt ein bereinigtes 3D-Mesh / Point-Cloud-Dataset bereit.
  2. Dataset wird in `public/assets/portrait-particles.bin` kompiliert.
  3. Shader-Skalierung und Assembly-Kurve werden auf das neue Mesh kalibriert.
  4. Lizenzprüfung des bisherigen Lee Perry Smith Meshs abgeschlossen.
- **Betroffene Dateien**: `app/components/portrait/`, `public/assets/`.
- **Nutzer-Input erforderlich**: **JA** (Persönliche 3D-Scan-Daten).

---

## EPIC G — Quality Gates, Tooling, SEO & Cloudflare Launch

### `QA-001`: Tooling-Fundament: Linting & Unit Testing einrichten
- **Zweck**: Schließen der aktuellen Lücke in `package.json` (bisher nur `typecheck` und `build`).
- **Aktueller Status**: `READY FOR IMPLEMENTATION`
- **Priorität**: `P0`
- **Abhängigkeiten**: Keine.
- **Akzeptanzkriterien**:
  1. Linter (`eslint` oder `biome`) installiert und konfiguriert (`npm run lint`).
  2. Unit-Test-Runner (`vitest`) installiert für Algorithmen und i18n-Helper (`npm run test`).
  3. Alle Skripte laufen im Quality Gate sauber durch.
- **Betroffene Dateien**: `package.json`, Konfigurationsdateien im Root.
- **Nutzer-Input erforderlich**: Nein (standardkonforme, schlanke Konfiguration).

### `QA-002`: SEO-Fundament: Canonical, Hreflang, Sitemap & Robots.txt
- **Zweck**: Vollständige Suchmaschinen- und Sharing-Optimierung für zweisprachige Multi-Page-Struktur.
- **Aktueller Status**: `READY FOR IMPLEMENTATION`
- **Priorität**: `P1`
- **Abhängigkeiten**: `NAV-001`, `WORK-001`, `CASE-001`
- **Akzeptanzkriterien**:
  1. Jede Route exportiert saubere `canonical`- und `hreflang`-Links (für DE und EN Gegenstücke).
  2. Automatisierte `sitemap.xml` und `robots.txt` Routen oder Generierung.
  3. Open Graph Metadaten und Fallback-Bilder für Social Media Sharing.
  4. Strukturierte Daten (JSON-LD: `Person` und `CreativeWork`).
- **Betroffene Dateien**: `app/root.tsx`, Routen-Dateien, ggf. `app/routes/sitemap[.]xml.ts`.
- **Nutzer-Input erforderlich**: Nein.

### `QA-003`: WCAG 2.2 AA Barrierefreiheits- & Performance-Audit
- **Zweck**: Verifikation der erklärten Qualitätsstandards vor dem Release.
- **Aktueller Status**: `PLANNED`
- **Priorität**: `P1`
- **Abhängigkeiten**: Epics B, C, D, E
- **Akzeptanzkriterien**:
  1. Volle Tastatur-Navigation (Tab-Ordnung, Escape-Handler) auf allen Seiten.
  2. Kontrastverhältnisse gemäß WCAG AA verifiziert.
  3. Lighthouse Performance Score > 90 auf Mobile und Desktop.
  4. Zero Console Errors / Warnings.
- **Empfohlene Skills**: `web-accessibility`, `ui-ux-audit`, `typography-audit`
- **Nutzer-Input erforderlich**: Nein.

### `OPS-001`: Cloudflare Production Deployment & Domain-Aufschaltung
- **Zweck**: Veröffentlichung des Portfolios auf Cloudflare Workers unter der finalen Domain.
- **Aktueller Status**: `PLANNED`
- **Priorität**: `P1`
- **Abhängigkeiten**: Alle Epics B–G
- **Akzeptanzkriterien**:
  1. Worker via Wrangler auf Cloudflare deployt (`wrangler deploy`).
  2. Custom Domain (Präferenz `bywilk`) mit SSL/TLS konfiguriert.
  3. Production Secrets (E-Mail API Key) hinterlegt.
  4. DSGVO-konforme Cloudflare Web Analytics aktiviert.
- **Betroffene Dateien**: `wrangler.jsonc`.
- **Nutzer-Input erforderlich**: **JA** (Cloudflare Account Zugriff & Domain-DNS).
