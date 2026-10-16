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

### DEC-021: Case-Study-Architektur & Checkpot Hietzing Implementierung
- **DATE**: 2026-10-11
- **STATUS**: `CONFIRMED`
- **RATIONALE**:
  - Implementierung der ersten vollwertigen, individuellen Case Study für *Checkpot Hietzing* unter der dynamischen Route `/:locale/work/:slug` (`app/routes/case-study.tsx`).
  - Google Stitch MCP Exploration Screen `projects/9864955914556862585/screens/1acb89b830dc4c8fae1b3de0be1a28ed` (Cinematic Dark Hero, Warm Cream Editorial `#f6f3ec`, dezente Champagner-/Boutique-Akzente `#c2a284`).
  - 8 modulare, wiederverwendbare Sektionskomponenten in `app/components/case-study/` (`Hero`, `Overview`, `Challenge`, `Redesign`, `CustomCms`, `Engineering`, `Outcome`, `Navigation`).
  - Einbindung von 12 authentischen Projekt-Assets (Wayback-Machine-Archiv 2019, hochauflösende Desktop- und Mobile-Screenshots, reale Boutique- und Lookbook-Fotografien) unter `public/assets/projects/checkpot/`.
  - Interaktive CMS-Showcase-Komponente demonstriert den proprietären Admin-Bereich (Outfits, Brands, Store, Media) ohne Backend-Abhängigkeit.
  - Strenge Einhaltung der Content-Integrität: keine erfundenen Metriken, keine Fake-Testimonials, transparente Darstellung der realen Leistungen (End-to-End-Neukonzeption, Custom CMS, Next.js / Neon / Cloudflare Stack).
- **NOTES**: Dient als Referenzarchitektur für alle künftigen Case Studies des Portfolios.

---

### DEC-022: Hero-Partikel-Porträt — Wiederaufnahme und Verfeinerung von Variante A
- **DATE**: 2026-10-11
- **STATUS**: `CONFIRMED — rendering refinement; personal geometry remains OPEN`
- **RATIONALE**: Explizite Nutzeranweisung zur Wiederaufnahme des bestehenden Three.js-Porträts. Die Pause aus DEC-015 ist für diese Aufgabe aufgehoben. Variante A, Homepage-Komposition, Branding und bestehender Stack bleiben erhalten.
- **NOTES**:
  - Bestehende generische Punktkoordinaten werden erhalten und deterministisch ausgedünnt; lokale Oberflächennormalen dienen der Lichtzeichnung. Keine neue persönliche Gesichtsrekonstruktion und keine Behauptung verbesserter persönlicher Ähnlichkeit.
  - Private Fotos bleiben lokal und ignoriert. Keine externen Uploads, kein Deployment, Commit oder Push.
  - Assembly, Idle, Pointer und Scroll-Dissolve werden im bestehenden Renderer verfeinert; WebGL-Lifecycle, Reduced Motion, Touch-Scrolling und Fallback werden geprüft.
  - Technischer Bericht, Grenzen und lokale Vergleichsaufnahmen: [Portrait-Verfeinerung](15-particle-portrait-refinement.md). Mesh-Herkunft und Lizenzpflichten aus DEC-015 bleiben vor einem Public-Release zu klären.

---

### DEC-023: Homepage Selected Work als redaktionelle Projektzeilen
- **DATE**: 2026-10-13
- **STATUS**: `CONFIRMED`
- **RATIONALE**: Der Nutzer hat die Chat-Skizze „Projektzeilen“ ausdrücklich gewählt und die Implementierung freigegeben: drei ruhige Zeilen mit abwechselnder Bild-/Text-Anordnung, aktuellen Projektvorschaubildern, kurzen Titeln, einer Beschreibung und direktem Case-Study-Link.
- **NOTES**:
  - Reihenfolge: Checkpot Hietzing, Let It Bloom, SPEICHE. Kundenprojekte und eigenständiges Konzept bleiben transparent gekennzeichnet.
  - SPEICHE ist die dritte Projektzeile; die zusätzliche alte SPEICHE-Platzhalterkarte am Übergang entfällt. Die vorhandene dunkle/cremefarbene Dramaturgie und große „CRAFT & METHODOLOGY“-Typografie bleiben erhalten.
  - Aktuelle Case-Study-Bilder erhalten eigene responsive WebP-Vorschaudateien. Bestehende Case-Study-Inhalte, Assets und Routen bleiben unverändert.
  - Änderung ist auf diesen Homepage-Bereich begrenzt; vereinfachte Navbar, reduzierter Hero, Porträtlogik und übrige Homepage-Sektionen bleiben erhalten. Kein Commit, Push oder Deployment.

---
### DEC-024: Typografische Tiefe für die Homepage-Projektzeilen
- **DATE**: 2026-10-16
- **STATUS**: CONFIRMED
- **RATIONALE**: Der Nutzer hat die gezeigte Richtung „Typografische Tiefe“ ausdrücklich gewählt. Große, sehr dezente Projektnamen greifen die bestehende Hintergrundtypografie auf.
- **NOTES**:
  - CHECKPOT, BLOOM und SPEICHE liegen als dekorative, nicht interaktive Ebene hinter den abwechselnden Projektzeilen; auf Mobile stehen sie über der jeweiligen Vorschau.
  - Vorhandene Bilder, Texte, DE-/EN-Links und Fokuszustände bleiben erhalten. Die zusätzliche Schrift ist für assistive Technologien ausgeblendet.
  - Keine Änderungen an Navbar, Hero, Porträt, Case Studies, übrigen Sektionen oder CRAFT & METHODOLOGY am Schwarz-Creme-Übergang.

---
### DEC-025: Offene Kompetenzspalten mit „Produkt in Schichten“
- **DATE**: 2026-10-16
- **STATUS**: CONFIRMED
- **RATIONALE**: Der Nutzer hat offene Spalten als Richtung gewählt und anschließend „Produkt in Schichten“ als ergänzendes Gestaltungselement bestätigt.
- **NOTES**:
  - Drei offene Spalten ersetzen die technische Tabelle. Kürzel, nummerierte Kicker, Hover-Fläche und Tech-Tags entfallen; konkrete Beschreibungen und Beispiele werden in DE und EN verwendet.
  - Eine kleine CSS-3D-Grafik verbindet Oberfläche, Logik und Daten. Beim ersten Sichtbarwerden spielt eine begrenzte Sequenz einmal ab; danach bleibt die Grafik ruhig.
  - Statische Darstellung ohne JavaScript und bei reduzierter Bewegung; keine zusätzliche Bibliothek und keine Änderung der Porträtlogik.
  - Selected Work samt typografischer Tiefe, Schwarz-Creme-Übergang, Navbar, Hero, übrige Sektionen und Case Studies bleiben erhalten.

---
### DEC-026: Persönliche Profilsektion als „Editoriales Porträt“
- **DATE**: 2026-10-16
- **STATUS**: CONFIRMED
- **RATIONALE**: Der Nutzer ist mit einem eigenen Porträt einverstanden und hat den gezeigten Entwurf „Editoriales Porträt“ als Favoriten bestätigt.
- **NOTES**:
  - Das im gewählten Entwurf verwendete Foto aus `assets/portraits/private/front.jpg` wird als optimierte WebP-Kopie in der Profilsektion eingebunden. Die private Originaldatei bleibt unverändert; die endgültige Bildauswahl kann später ersetzt werden.
  - Foto links, bestehendes Zitat mit kursiver Betonung rechts, zwei kurze Ich-Absätze und WILK als Abschluss; auf Mobile untereinander.
  - Platzhalterrahmen, technische Bildunterschrift, nummerierter Kicker und Kernpraxis-/Fokus-Metadaten entfallen. Die Texte aus dem Entwurf werden in DE und EN verwendet; keine biografischen Angaben ergänzt.
  - Beide Anker `#about` und `#practitioner` bleiben erhalten. Keine neue Animation, Bibliothek oder Änderung des Three.js-Porträts, der Navbar, anderer Homepage-Sektionen oder Case Studies.

---
### DEC-027: Zusammenarbeit als „Räumliches Gefüge“
- **DATE**: 2026-10-16
- **STATUS**: WORKING DIRECTION / IMPLEMENTATION APPROVED
- **RATIONALE**: Der Nutzer hat das Verbindungskonzept und die gezeigte Variante „Räumliches Gefüge“ zur lokalen Implementierung freigegeben. Die Gestaltung ist eine aktuelle Arbeitsfassung und darf später weiterentwickelt werden; sie ist nicht als endgültige visuelle Lösung bestätigt.
- **NOTES**:
  - Drei verschränkte Bänder in Creme, Dunkel und Bronze ergänzen die drei Formen: eigenes Projekt, Agentur und Produktteam. Verwendet wird die im Chat erzeugte Illustration, als transparente WebP-Dateien in 480 und 960 px unter `public/assets/collaboration/`.
  - Die ausgewählten Texte und „Dein Projekt. Drei Wege.“ ersetzen in DE und EN die technische Tabelle samt Codes, Kicker und Engagement-Badge.
  - Desktop: Grafik links und drei verbundene Textbereiche rechts. Mobile: Grafik über den Texten. Statische CSS-Verbindungen funktionieren ohne JavaScript; keine Animation und keine neue Bibliothek.
  - Nur diese Homepage-Sektion wird geändert. Navbar, Profilfoto, Three.js-Porträt, übrige Sektionen und Case Studies bleiben unverändert. Kein Commit, Push oder Deployment.

---
### DEC-028: Labor als gemeinsame Bühne mit integrierter Linienfläche
- **DATE**: 2026-10-16
- **STATUS**: CONFIRMED
- **RATIONALE**: Der Nutzer hat die gemeinsame Projektbühne gewählt, das separate Interaktionsmenü verworfen und den gezeigten Entwurf mit integrierter Bewegung ausdrücklich zur Implementierung freigegeben.
- **NOTES**:
  - LUMENWERK Studio, RÖSTWERK 1070 und KERN / FIELD werden mit realen Vorschaubildern und lokalen DE-/EN-Case-Study-Links gezeigt; jedes Projekt bleibt als eigenständiges Konzept gekennzeichnet. SPEICHE bleibt in Selected Work.
  - Native Radio-Auswahl wechselt die große Vorschau auch ohne JavaScript. Die drei technischen Platzhalterkarten und ihre unbelegten Technologieversprechen entfallen.
  - Eine goldene gefaltete Linienfläche ist Teil der Komposition. Sie entfaltet sich einmal beim Sichtbarwerden und reagiert begrenzt auf Projektwechsel und feine Zeigerbewegungen; keine Regler, Modi oder Endlosschleifen. Statische SVG-Ausgabe ohne JavaScript und bei reduzierter Bewegung, vollständiges Aufräumen von Beobachtern, Listenern und Animationen.
  - Native Browser-Animationen und SVG ohne neue Abhängigkeit. Bestehende Bildquellen bleiben unverändert; eigene responsive WebP-Vorschauen werden hinzugefügt.
  - Umfang: ausschließlich Labor auf der Homepage und notwendige Locale-Weitergabe. Andere Sektionen, Navbar, Three.js-Porträt, Case-Study-Dateien und deren Inhalte bleiben unverändert. Kein Commit, Push oder Deployment. Weitere seitenweite Animationen sind nicht Teil dieser Freigabe.

---
### DEC-029: Homepage-Kontakt als „Offene Einladung“
- **DATE**: 2026-10-16
- **STATUS**: CONFIRMED DESIGN / LOCAL IMPLEMENTATION
- **RATIONALE**: Der Nutzer hat „Offene Einladung“ als Favoriten bestätigt und `bywilk@office.at` als echte Kontaktadresse genannt.
- **NOTES**:
  - Große persönliche Einladung und dezentes WILK als Abschluss ersetzen technische Kicker, Formularrahmen und Colophon. Ein natives Disclosure öffnet das reduzierte Formular; DE und EN, Tastaturfokus, Zurück/Escape und Nutzung ohne JavaScript bleiben verfügbar.
  - Der native Kontaktweg bereitet eine E-Mail an `bywilk@office.at` im Mailprogramm vor. Button und Hinweis benennen diesen Ablauf ausdrücklich; keine simulierte Versandbestätigung. Direktmail-Link als Alternative. Ein serverseitiger Maildienst bleibt offen und wird nicht eingerichtet.
  - Eigene Homepage-Texte statt Änderungen an der separaten Kontaktseite. Der Footer erhält nur auf der Homepage die bestätigte E-Mail über einen optionalen Prop; andere Seiten behalten die bisherige Ausgabe.
  - Keine neue Animation oder Abhängigkeit. Alle übrigen Homepage-Sektionen, Navbar, Porträtlogik, Case Studies und die separate Kontaktseite bleiben unverändert. Kein Commit, Push oder Deployment.

---
### DEC-030: Dezenter Sprachlink ohne Scrollsprung
- **DATE**: 2026-10-16
- **STATUS**: CONFIRMED / USER-REQUESTED REFINEMENT
- **RATIONALE**: Der Nutzer meldet einen Sprung zum Seitenende beim Sprachwechsel nach manuellem Hochscrollen und bittet um eine passendere, reduzierte Gestaltung.
- **NOTES**:
  - Ein einzelner Textlink „English“ beziehungsweise „Deutsch“ ersetzt den eingerahmten DE-/EN-Schalter mit Klammern. Gemeinsame Komponente für Header und Footer, sichtbarer Fokus und ausreichend großes Touch-Ziel.
  - Sprachlinks erhalten Pfad und Query, übernehmen jedoch keine möglicherweise veraltete Abschnittsmarke. `preventScrollReset` erhält beim clientseitigen Wechsel die aktuelle Scrollposition; der Router wird nicht global verändert.
  - Manuelle Sprachwahl bleibt über Cookie und Local Storage gespeichert. Direkte Abschnittslinks, normale Navigation und Case-Study-Pfade bleiben erhalten. Ohne JavaScript bleibt der Sprachlink eine normale Navigation.
  - Kein Umbau der übrigen Navbar, keine Änderung von Homepage-Sektionen, Case-Study-Inhalten oder Porträtlogik. Keine neue Abhängigkeit; kein Commit, Push oder Deployment.

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
- **DEC-O12**: Homepage-Auswahl der drei "Selected Work" Projekte `[RESOLVED -> DEC-023]`.
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
