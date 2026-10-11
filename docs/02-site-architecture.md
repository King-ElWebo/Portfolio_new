# Site Architecture & Routing Model

> **Zweck**: Strukturelle Dokumentation der Seitenhierarchie, Routen, Navigation und Abschnittsdramaturgie des Multi-Page-Portfolios.  
> **Source of Truth**: Informationsarchitektur, Routing & Navigationsmodell  
> **Status**: IN PROGRESS (Homepage D3.1 Baseline aktiv, Multi-Page-Routen und Templates in Entwicklung)

---

## 1. Produkt-Umfang: Echtes Multi-Page-Portfolio `[CONFIRMED]`

Das Portfolio ist **keine reine Single-Page-Website**.  
Die visuell ausgearbeitete Homepage bildet das ästhetische Fundament, nicht das fertige Gesamtprodukt. Das Produkt besteht aus folgenden eigenständigen Seiten und Bereichen:

```text
/ (Locale Root Handler: Browser Header Detection -> Redirect /de oder /en)
│
├── /de  &  /en                           [HOMEPAGE — 3-Akt-Dramaturgie]
│
├── /de/work  &  /en/work                 [WORK ARCHIVE — Eigenständige Projektübersicht]
│   └── /de/work/:slug  &  /en/work/:slug [CASE STUDY — Detaillierte Projektstudien]
│
├── /de/contact  &  /en/contact           [CONTACT — Fokussierte Kontaktseite]
│
└── /de/impressum  &  /en/imprint         [LEGAL — Gesetzlich vorgeschriebene Pflichtangaben]
    /de/datenschutz  &  /en/privacy       [LEGAL — DSGVO-konforme Datenschutzerklärung]
```

> **Einordnung von About & The Lab `[CONFIRMED]`**:  
> - **About (Practitioner)** ist als zentraler Act II (Warm Editorial) auf der Homepage verankert. Es wird keine separate About-Seite erzwungen.  
> - **The Lab (Independent Concepts)** ist als interaktive Sektion in Act III der Homepage integriert sowie als Filterkategorie im Work-Archiv auffindbar. Eigenständige Lab-Seiten bleiben eine spätere Option.

---

## 2. Routen-Inventar & Aktueller Implementierungs-Status

| Route | Lokalisierter Pfad | Status | Aktuelle Implementierung | Geplantes Ziel |
| :--- | :--- | :--- | :--- | :--- |
| **Root Index** | `/` | `IMPLEMENTED` | `app/routes/_index.tsx`: Prüft `Accept-Language`, leitet auf `/de` oder `/en` weiter. | Um Cookie-/LocalStorage-Prüfung für persistierte Sprachwahl erweitern. |
| **Homepage** | `/:locale` | `PARTIALLY IMPLEMENTED` | `app/routes/home.tsx`: Vollständige D3.1-Sektionsfolge gerendert. | Inhalte noch temporäre Stitch-Demos; finale Copy & reale Projekte einbinden. |
| **Work Übersicht** | `/:locale/work` | `PARTIALLY IMPLEMENTED / PLACEHOLDER` | `app/routes/work.tsx`: Rendert aktuell lediglich die Homepage-Sektion `SelectedWork`. | **Muss eigenständige Work-Page werden**: Intro, alle Projekte, Filter, Case-Study-Links. |
| **Case Studies** | `/:locale/work/:slug` | `PLANNED` | Route existiert in `routes.ts` **noch nicht**. | Dynamische Detailroute & Template gemäß `docs/07-project-template.md`. |
| **Kontaktseite** | `/:locale/contact` | `PARTIALLY IMPLEMENTED / PLACEHOLDER` | `app/routes/contact.tsx`: Rendert aktuell Homepage-Sektion `Contact` (500ms Demo-Submit). | **Muss eigenständige Seite werden**: Server-Action, echte E-Mail-Übertragung, A11y. |
| **Impressum** | `/:locale/impressum` *(oder `/imprint`)* | `PLANNED` | Route existiert **noch nicht**. | Gesetzlich erforderliche Angaben (ohne erfundene Daten). |
| **Datenschutz** | `/:locale/datenschutz` *(oder `/privacy`)* | `PLANNED` | Route existiert **noch nicht**. | DSGVO-Angaben zu Hosting, Logs, Kontaktformular. |

---

## 3. Spezifikation der Einzelseiten

### 3.1 Homepage (`/:locale`) `[BASELINE IMPLEMENTIERT]`
Folgt der bestätigten 3-Akt-Dramaturgie (*Cinematic Obsidian → Warm Paper → Cinematic Obsidian*):
- **Act I (Cinematic Dark)**:
  - `Hero`: Kicker, Headline (*FROM IDEA TO DIGITAL EXPERIENCE*), 3D Particle Portrait Canvas (Three.js/GLSL, aktuell pausiert), Scroll-Impuls.
  - `SelectedWork`: 2 kuratierte Leuchtturm-Projekte mit 16:9 bzw. 4:8 Media-Frames.
  - `TransitionBridge`: Projekt 03 / Spekulative System-Studie und Einleitung zum Farbwechsel.
- **Act II (Warm Editorial Cream)**:
  - `Capabilities`: Drei Kernbereiche (Websites & Commerce, Apps & Systems, AI & Automation).
  - `Practitioner`: Persönliches Statement, Philosophie (*Craft & Code in einer Person*), Studio-Porträt.
  - `Collaboration`: Kollaborationsmodelle (Direct, Studio, Embedded).
- **Act III (Return to Cinematic Dark)**:
  - `Lab`: 3 experimentelle interaktive Karten / Skizzen.
  - `Contact`: Schneller Kontaktbereich mit Vorab-Formular.
  - `SiteFooter`: Brand-Tagline, Direktkontakt, Social Links, Sprachwechsler.

### 3.2 Standalone Work Page (`/:locale/work`) `[IN ENTWICKLUNG]`
Die Work-Seite darf **nicht** bloß die 2 Homepage-Projekte wiederholen.
- **Header**: Editorial Intro zur Arbeitsphilosophie, Methodik und Bandbreite.
- **Filterleiste**:
  - `Alle Arbeiten` (All)
  - `Kundenprojekte` (Client Work)
  - `Independent Concepts` (The Lab / Studien)
- **Projekt-Raster / Liste**:
  - Alle relevanten Projekte mit Metadaten (Kategorie, Jahr, Rolle, Tags).
  - Responsive Kacheln mit klarem Visual und Hover-Feedback.
  - Jeder Eintrag verlinkt direkt auf die zugehörige Case Study `/:locale/work/:slug`.
- **Ehrlichkeit**: Strikte visuelle Kennzeichnung von Kundenaufträgen vs. eigeninitiierten Konzepten.

### 3.3 Individual Case Study Pages (`/:locale/work/:slug`) `[PLANNED]`
Detaillierte Einzelfallstudien nach [`docs/07-project-template.md`](07-project-template.md).
- **Hero**: Titel, Kicker, Rollen-Metadaten, Cover-Visual.
- **Kontext & Herausforderung**: Warum existiert das Projekt? Welche Problemstellung lag vor?
- **Konzept & Strategie**: Wie wurde das Problem gelöst?
- **UX & Struktur**: Informationsarchitektur, Workflows.
- **Visual Design**: Typografie, Interface-Tokens, Komponenten.
- **Interactive Experience & Motion**: Haptik, Interaktionslogik.
- **Technische Umsetzung**: Architektur, Framework-Details, Performance-Highlights.
- **Ergebnisse / Learnings**: Reale Metriken bei Kundenprojekten; konzeptionelle Erkenntnisse bei Konzepten.
- **Next Project**: Nahtlose Navigation zur nächsten Fallstudie.
- **Wichtig**: Jede Case Study behält eine projektspezifische visuelle Identität bei und wird nicht in ein starres Einheitslayout gepresst.

### 3.4 Dedicated Contact Page (`/:locale/contact`) `[IN ENTWICKLUNG]`
- **Fokus**: Ruhige, barrierefreie Atmosphäre für ernsthafte Projektanfragen.
- **Bestätigte Felder**: Name, E-Mail, Nachricht.
- **Keine Funnel-Hürden**: Kein Budget-Prequalifying, keine Auswahllisten für Projektvolumen, kein Buchungs-Widget-Zwang.
- **Direktkontakte**: Klickbare E-Mail-Adresse und bestätigte LinkedIn-Verbindung.
- **Technische Anforderung**: Echte Server-Action (Cloudflare Worker Request-Handling) mit serverseitiger Validierung und echtem E-Mail-Versand (z. B. via Resend / SMTP).

### 3.5 Legal Pages (`/:locale/impressum`, `/:locale/datenschutz`) `[PLANNED]`
- Vollständig lokalisierte statische Seiten.
- **Keine erfundenen juristischen Angaben**: Textstellen für persönliche Adressdaten, Unternehmensdaten oder Steuernummern werden als Platzhalter markiert und bedürfen expliziter Nutzerfreigabe.

---

## 4. Globale Navigation & Header-Verhalten `[FUNKTIONALE ANFORDERUNGEN]`

### 4.1 Differenzierung: Seiten-Links vs. Section-Anchors
Aktuell verlinkt `SiteHeader.tsx` ausschließlich über relative Hash-Anker (`#work`, `#capabilities`, `#practitioner`, `#lab`, `#contact`).
- **Problem**: Befindet sich der Nutzer auf `/de/work` oder `/de/contact`, führen diese Klicks zu toten Ankern auf derselben Unterseite (`/de/work#work`).
- **Lösung / Anforderung**:
  - `Work` muss zur Hauptseite `/de/work` navigieren.
  - `Contact` muss zur Hauptseite `/de/contact` navigieren.
  - Reine Homepage-Sektionssprünge (`#capabilities`, `#practitioner`, `#lab`) müssen auf Unterseiten absolut auf die Homepage verweisen (z. B. `/${locale}#capabilities`).

### 4.2 Sprachwechsel-Logik (i18n Shell)
1. **Erster Besuch**: Erkennung via HTTP-Header `Accept-Language` (bereits in `_index.tsx`).
2. **Manuelle Auswahl**: Klick auf den Header-/Footer-Language-Switcher tauscht den Locale-Präfix im aktuellen Pfad (`/de/work` <-> `/en/work`).
3. **Persistierung**: Speicherung der manuellen Präferenz in einem Cookie (`portfolio_locale`), damit zukünftige Besuche auf `/` automatisch die bevorzugte Sprache wählen.
4. **HTML `lang`-Attribut**: Muss dynamisch dem aktiven Sprachcode (`de` oder `en`) entsprechen (aktuell in `root.tsx` fälschlicherweise statisch auf `"en"` fixiert).
