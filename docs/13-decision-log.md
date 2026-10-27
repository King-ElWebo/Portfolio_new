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
- **STATUS**: SUPERSEDED BY DEC-034 (Text und Komposition); Ebenengrafik und begrenzte Animation bleiben erhalten
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
  - **Bildauswahl aktualisiert am 2026-10-21**: Auf ausdrücklichen Nutzerwunsch ersetzt das neu bereitgestellte Foto am Telefon die bisherige öffentliche WebP-Kopie. Die Einbindung bleibt lokal; keine externe Bildverarbeitung. Bestehende Bildrahmen bleiben erhalten, intrinsische Bildmaße und zentrierter Ausschnitt werden dem neuen Foto angepasst. Private Referenzfotos bleiben unverändert.
  - Foto links, bestehendes Zitat mit kursiver Betonung rechts, zwei kurze Ich-Absätze und WILK als Abschluss; auf Mobile untereinander.
  - Platzhalterrahmen, technische Bildunterschrift, nummerierter Kicker und Kernpraxis-/Fokus-Metadaten entfallen. Die Texte aus dem Entwurf werden in DE und EN verwendet; keine biografischen Angaben ergänzt.
  - Beide Anker `#about` und `#practitioner` bleiben erhalten. Keine neue Animation, Bibliothek oder Änderung des Three.js-Porträts, der Navbar, anderer Homepage-Sektionen oder Case Studies.

---
### DEC-027: Zusammenarbeit als „Räumliches Gefüge“
- **DATE**: 2026-10-16
- **STATUS**: SUPERSEDED BY DEC-035
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
### DEC-031: Homepage-Abschluss „Editoriale Signatur“
- **DATE**: 2026-10-21
- **STATUS**: CONFIRMED / LOCAL IMPLEMENTATION
- **RATIONALE**: Der Nutzer hat nach zwei vergleichbaren Entwürfen „Editoriale Signatur“ gewählt und ausdrücklich zur Umsetzung freigegeben.
- **NOTES**:
  - Kontakt und Footer bilden einen zusammenhängenden Abschluss auf Obsidian. Die große WILK-Signatur zieht aus dem Kontaktbereich in einen eigenen Homepage-Footer; Rolle, Navigation und Copyright sind klar zugeordnet.
  - Trennlinie über dem Labor-Index, aktive lange Unterstreichung, Kontakt-Trennlinie und abgesetzte Footer-Leiste entfallen. Aktive Labor-Auswahl bleibt durch Bildhelligkeit, goldenen Titel, native Radio-Semantik und Tastaturfokus erkennbar. Die Linie von „Nachricht schreiben“ wird dezent in Champagner betont.
  - Native Kontakt-Disclosure, Fokusführung, Escape, E-Mail-Entwurf und DE/EN bleiben erhalten. Footer-Links führen zum Work-Archiv, zum About-Abschnitt und zum Hero. Das Copyright-Jahr kommt aus dem serverseitigen Loader.
  - Impressum und Datenschutz stehen wie im ausgewählten Entwurf vorerst als Text: Es bestehen noch keine entsprechenden Routen oder freigegebenen Inhalte. Keine erfundenen Rechtstexte, Platzhalterziele oder Links auf nicht existierende Seiten.
  - Die neue `HomeFooter`-Komponente wird ausschließlich auf der Homepage verwendet. Bestehender `SiteFooter`, andere Homepage-Bereiche, Work-/Case-Study-Inhalte, Navigation und Porträtlogik bleiben erhalten. Keine neue Abhängigkeit; kein Commit, Push oder Deployment.

---
### DEC-032: Ruhiges Aufklappen des Homepage-Kontakts
- **DATE**: 2026-10-21
- **STATUS**: USER-REQUESTED REFINEMENT / LOCAL IMPLEMENTATION
- **RATIONALE**: Der Nutzer empfindet den bisherigen Klick auf „Nachricht schreiben“ als abrupt und visuell unruhig. Ursache waren das Ausblenden der Einladung, ein Größenwechsel des Auslösers sowie sofortiges Scrollen und Fokussieren.
- **NOTES**:
  - Einladung und großer Auslöser bleiben an ihrer Position. Das kompakter gesetzte Formular öffnet sich darunter in 280 ms und schließt in 200 ms; ein kurzer Fade mit minimaler Verschiebung begleitet den Übergang. Wiederholtes Klicken setzt am aktuellen Animationsstand an.
  - Pointer-Klicks erzwingen weder Scrollen noch Eingabefokus. Tastaturbedienung öffnet unmittelbar und führt zum Namensfeld; Escape schließt und bringt den Fokus zum Auslöser zurück. Eingaben bleiben beim Schließen erhalten.
  - Native `details`-Semantik und Nutzbarkeit ohne JavaScript bleiben erhalten. Reduced Motion überspringt die Animation. Größenänderungen, geänderte Motion-Präferenz und unsichtbarer Tab beenden laufende Übergänge sauber; Animationen und Listener werden beim Unmount aufgeräumt.
  - Keine neue Abhängigkeit, kein Versanddienst und keine Änderung am Footer, Porträt oder an anderen Seiten. Der vorhandene E-Mail-Entwurf bleibt der Versandweg.

---
### DEC-033: Persönliches, foto-basiertes 2D-Partikelporträt
- **DATE**: 2026-10-21
- **STATUS**: CONFIRMED / LOCAL IMPLEMENTATION
- **RATIONALE**: Nach der erneuten Analyse von aimane.dev akzeptiert der Nutzer ausdrücklich eine 2D-Fassung und beauftragt deren Umsetzung. Keine kostenpflichtige Scan-App. Die tatsächliche Referenz verwendet Fotopixel mit 2D-Partikelbewegung, kein gescanntes Kopfmodell.
- **NOTES**:
  - Das vorhandene private `front.jpg` liefert die persönliche Form und Tonwerte. Lokale, auf die Bildfarben abgestimmte Freistellung; keine Veränderung der Gesichtsproportionen, erfundene Anatomie oder geschätzte Gesichtstiefe. Alle ruhenden Z-Koordinaten sind exakt null. Die Fotoqualität und der bestehende Ausschnitt begrenzen die Detailtreue.
  - Bestehender Three.js-Renderer und Lifecycle bleiben erhalten; orthografische Kamera, GPU-Punkte und angepasste Shader bilden das Foto in einer Ebene ab. Aufbau, sehr ruhiges Idle, örtlich begrenzte Mausverdrängung und reversible Scroll-Auflösung bleiben Teil des Effekts. Keine Kopfrotation oder Tiefenrekonstruktion wird behauptet.
  - Der Nutzerauftrag erlaubt die lokale Einbindung des abgeleiteten persönlichen Punktassets und dessen statischer Punktvorschau. Rohfotos bleiben privat und Git-ignoriert, werden weder in `public/` kopiert noch an externe Dienste übertragen. Kein Commit, Push oder Deployment.
  - Neue aktive Assets: `portrait-photo.bin`, `portrait-photo-meta.json`, `portrait-photo-static.png`. Historische generische Assets und Generatoren bleiben unverändert erhalten und werden vom aktiven Renderer nicht geladen.
  - Keine neue Abhängigkeit. Ausschließlich Porträtcode, lokaler Generator, vorhandene Porträtprüfung und relevante Dokumentation ändern sich; vorherige Navbar-, Kontakt-, Footer- und Profilfoto-Änderungen bleiben erhalten. Einzelheiten und Prüfbelege: [Foto-Partikelporträt](16-photo-particle-portrait.md).

---
### DEC-034: Kompakte Kompetenzsektion „Design & Code“
- **DATE**: 2026-10-21
- **STATUS**: CONFIRMED / LOCAL IMPLEMENTATION
- **RATIONALE**: Der Nutzer empfindet die bisherige Sektion als zu textlastig und gleichförmig. Nach zwei vergleichbaren Entwürfen wählt er ausdrücklich „Design & Code“ zur Umsetzung.
- **NOTES**:
  - Große zweizeilige Aussage „Design & Code. Aus einer Hand.“ mit kursiver brauner Betonung, daneben eine größere Fassung der vorhandenen Ebenengrafik. Englische Fassung: „Design & Code. From one source.“
  - Drei kurze Bereiche ersetzen Absätze und Beispiel-Listen: Websites & Shops / Dein digitaler Auftritt; Apps & Systeme / Für deinen Arbeitsalltag; KI & Automatisierung / Für wiederkehrende Aufgaben. Gleichwertige kurze englische Texte, keine neuen Leistungsversprechen.
  - Desktop: drei offene Spalten mit bewusst gesetzten Titelumbrüchen. Mobile: Aussage, Grafik und kompakte Leistungsbereiche untereinander. Vorhandene Farb- und Schrifttokens bleiben erhalten; keine Karten, neuen Trennlinien oder zusätzlichen CTAs.
  - Bestehende einmalige 3-Sekunden-Sequenz der Ebenengrafik, statische Darstellung ohne JavaScript und Reduced Motion bleiben erhalten. Keine neue Animationslogik oder Abhängigkeit.
  - Umfang: ausschließlich Kompetenzkomponente, zugehöriges Stylesheet, typisierte DE-/EN-Texte und diese Dokumentation. Hero, Porträt, Navigation, übrige Sektionen und Case Studies bleiben erhalten. Kein Commit, Push oder Deployment.

---
### DEC-035: Zusammenarbeit als „Zwei Perspektiven“
- **DATE**: 2026-10-21
- **STATUS**: CONFIRMED / LOCAL IMPLEMENTATION
- **RATIONALE**: Der Nutzer lehnt die große Ringgrafik ab und empfindet den ersten typografischen Entwurf als leer und monoton. Nach einer weiteren Auswahl bestätigt er ausdrücklich „Zwei Perspektiven“ zur Umsetzung.
- **NOTES**:
  - Zwei gleichzeitig sichtbare Flächen ersetzen Ringgrafik, Verbindungslinien, Einleitung und drei gleichgewichtete Textblöcke. Links auf Creme: „Ich übernehme.“ mit „Konzept. Design. Code.“ und einem kurzen Satz zum gesamten Projekt. Rechts auf Obsidian: „Ich ergänze.“ mit „Dein Team & WILK“ und gezielter Unterstützung für Agenturen und Produktteams.
  - Die drei bisherigen Zielgruppen bleiben inhaltlich enthalten: eigenes Projekt sowie Agenturen und Produktteams. Keine neuen Leistungs- oder Erfahrungsbehauptungen. Englische Entsprechungen werden in der vorhandenen typisierten Übersetzungsdatei gepflegt.
  - Desktop und Tablet: zwei aneinander anschließende Flächen. Mobile: Projekt und Team untereinander. Vorhandene Schrift- und Farbvariablen, keine neuen globalen Tokens oder Abhängigkeiten.
  - **Randlose Verfeinerung auf Nutzerwunsch:** Die Flächen nutzen die gesamte Fensterbreite; die bisherige maximale Containerbreite und seitlichen Außenabstände entfallen für diese Sektion. Beide Flächen erhalten gemäß DEC-036 identische Textabstände. Auf Mobile reichen beide Flächen bis zum Rand. Der cremefarbene Abstand unter der Sektion entfällt, sodass sie direkt an den dunklen dritten Akt anschließt.
  - Rein servergerendertes Markup und CSS, vollständig lesbar ohne JavaScript. Keine Schalter, Animationen oder neue Interaktion; der alternative Entwurf „Rollenwechsel“ ist nicht freigegeben. Die bisherigen Bilddateien bleiben als historische Assets erhalten, werden aber in dieser Sektion nicht mehr geladen.
  - Umfang: ausschließlich Collaboration-Komponente, zugehöriger Abschnitt in `app.css`, DE-/EN-Texte und relevante Dokumentation. Andere Homepage-Sektionen und Unterseiten bleiben erhalten. Kein Commit, Push oder Deployment.

---
### DEC-036: Einheitlicher Rhythmus im hellen Seitenabschnitt
- **DATE**: 2026-10-21
- **STATUS**: USER-REQUESTED REFINEMENT / LOCAL IMPLEMENTATION
- **RATIONALE**: Der Nutzer bemängelt den kleinen isolierten „Über mich“-Kicker, den Übergang zwischen Porträt und Zusammenarbeit sowie den größeren linken Texteinzug im randlosen Zweiteiler. Die asymmetrischen Padding-Regeln stammten aus der vorherigen Randlos-Anpassung.
- **NOTES**:
  - Ein gemeinsamer, nur im hellen Homepage-Abschnitt geltender Abstand steuert den Übergang von Kompetenzen zum Porträt und vom Porträt zum Zweiteiler. Doppelt verteilte Außenabstände entfallen; der Abstand wächst von 5 bis 12 rem mit der Fensterbreite.
  - Der sichtbare Mini-Kicker entfällt. Die semantische Überschrift „Über mich“ / „About me“, die Benennung des Abschnitts und beide bisherigen Anker bleiben erhalten.
  - Zwei gleich breite Flächen erhalten dieselben Innenabstände an allen seitlichen Kanten. Die separate Berechnung des äußeren linken Einzugs entfällt. Auf Mobile bleiben beide Flächen randlos untereinander.
  - Bestehende Grafik und „Design & Code“-Komposition, Profilbild, Zitat und weitere Texte bleiben erhalten. Ausschließlich lokale Layoutregeln und diese Dokumentation ändern sich; keine neue Animation, Abhängigkeit oder globale Typografieänderung.
  - Eine gespeicherte Browserberechtigung blockiert die erneute visuelle Prüfung trotz ausdrücklicher Freigabe im Chat. Die aktuelle Fassung wird daher durch Quellprüfung, Typprüfung und Build geprüft; keine neue Live-Sichtprüfung behaupten.

---
### DEC-037: Bestehendes Cloudflare-Produktionsziel angleichen
- **DATE**: 2026-10-27
- **STATUS**: USER-REQUESTED REPAIR / LIVE UPDATE PENDING VERIFICATION
- **RATIONALE**: Der Nutzer verlangt die saubere Reparatur der veralteten Domain-Fassung. Screenshots zeigen den bestehenden Worker `portfolio-bywilk` und das Produktionskonto; das Repository verwendete bisher den abweichenden Namen `portfolio`. Die lokale Wrangler-Anmeldung gehört zu einem anderen Konto. Eine zuvor getrennte Git-Verbindung wurde vom Nutzer durch erneuerte GitHub-App-Berechtigungen bearbeitet.
- **NOTES**:
  - `wrangler.jsonc` benennt den bestehenden Worker und sein Produktionskonto explizit. Keine neuen Worker, Domains, Bindings, Secrets, Abhängigkeiten oder Frameworkänderungen.
  - Die Account-ID ist ein Ziel-Identifier, kein Zugangsschlüssel. Die lokale Authentifizierung wird nicht automatisch ersetzt; eine Anmeldung im richtigen Konto muss der Nutzer selbst durchführen, falls lokale Remote-Aktionen erforderlich werden.
  - `King-ElWebo/Portfolio_new`, Produktionsbranch `main`, Build `npm run build` und Veröffentlichung `npx wrangler deploy` bilden den vorgesehenen vorhandenen Git-basierten Weg. Die aktuelle Dashboard-Konfiguration und ein erfolgreicher neuer Build sind getrennt zu verifizieren.
  - Die angezeigte aktive Cloudflare-Version `8b267ba9` ist kein Git-Commit. Für den letzten Portfolio-Commit `9120f02` waren zum Prüfzeitpunkt keine Statusprüfungen oder Check-Runs auf GitHub vorhanden. Das belegt keine konkrete Build-Fehlermeldung.
  - Details und Prüfschritte in `docs/12-deployment-data.md`. Eine lokale Typ-, Build- oder Dry-Run-Prüfung darf nicht als erfolgreiches Live-Update ausgegeben werden.
  - Lokale Verifikation: `npm run typecheck`, `npm run build`, `wrangler deploy --dry-run` und Diff-Prüfung erfolgreich. Die erzeugte Worker-Konfiguration übernimmt Name und Konto korrekt; die bestehende Größenwarnung des Three.js-Chunks bleibt unverändert.

---
## 🔍 Noch offene Entscheidungen `[OPEN / TODO]`

- **DEC-O1**: Finales Frontend-Framework `[RESOLVED -> DEC-014 (React Router v8)]`.
- **DEC-O2**: Cloudflare Adapter & Build-Pipeline `[RESOLVED -> DEC-014 (@cloudflare/vite-plugin)]`.
- **DEC-O3**: ORM / Query Builder (Drizzle ORM vs. Kysely) `[DEFERRED -> DB aktuell unprovisioniert]`.
- **DEC-O4**: Konkrete Schriftarten (Finaler Webfont-Stack vs. kommerzieller Editorial-Schnitt).
- **DEC-O5**: Exakte Hex-/OKLCH-Farbwerte `[RESOLVED -> D3.1 Baseline in app.css verifiziert]`.
- **DEC-O6**: Art des Hero-Visuals `[RESOLVED -> DEC-033 (persönliches foto-basiertes 2D-Partikelporträt)]`.
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
