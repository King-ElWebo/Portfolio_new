# Technical Architecture

> **Status**: IN PROGRESS  
> **Source of Truth**: System-Architektur, Infrastruktur-Vorgaben & Technologie-Prinzipien

---

## 🏛 Bestätigte Infrastrukturziele `[CONFIRMED]`

- **Deployment Platform**: **Cloudflare**  
  *(Skalierbarkeit, globale Edge-Performance, moderne Worker/Pages-Infrastruktur).*
- **Database**: **Neon PostgreSQL**  
  *(Serverless Postgres, Branching, schlanke Skalierung bei Bedarf).*

> [!IMPORTANT]
> **Wichtiger Hinweis**: Die Festlegung von Cloudflare und Neon bedeutet **nicht**, dass diese Dienste jetzt bereits provisioniert, eingerichtet oder im Code verbunden werden. Sie dienen als verbindliche Zielinfrastruktur für spätere architektonische Entscheidungen.

---

## 📐 Die 15 Architektur-Prinzipien

### 1. Single Application First `[CONFIRMED]`
- Der Ausgangspunkt ist immer eine **einzelne, monolithische Webanwendung** (Single Application).
- Es wird nicht von vornherein künstlich zwischen einem separaten Frontend und einem isolierten Backend-Server getrennt.
- Ein eigenständiger Microservice oder getrennter Backend-Dienst entsteht nur dann, wenn eine zwingende technische Anforderung dies erfordert.

### 2. Simplest Architecture That Satisfies the Requirement `[CONFIRMED]`
- Keine spekulativen Architektur-Muster:
  - ❌ Keine Microservices
  - ❌ Keine Event-Bus- oder Message-Queue-Architekturen
  - ❌ Keine generische separate API-Schicht
  - ❌ Keine zusätzlichen Caching-Datenbanken (z. B. Redis)
  - ❌ Keine Authentication-Lösung
  ...solange keine konkrete Produktanforderung danach verlangt.

### 3. Framework & Runtime-Architektur `[CONFIRMED]`
- **React Router v8 (8.4.0) + Vite (8.0.3) + Cloudflare Workers** ist das verbindlich ausgewählte Framework (`DEC-014`).
- **Runtime-Setup**:
  1. **Nativer Cloudflare Workers Support**: Vollständige Unterstützung über `@cloudflare/vite-plugin` (1.60.2) und `@react-router/dev/vite` mit direkter Ausführung im `workerd`-Runtime.
  2. **Worker Entry Point**: `workers/app.ts` definiert den Worker-Export (`fetch`), der den Router-Kontext (`createRequestHandler`) bereitstellt.
  3. **Build-Artefakte**: Client-Assets werden in `./build/client` erzeugt (konfiguriert in `wrangler.jsonc`).
  4. **Keine Shim-Komplexität**: Im Gegensatz zu Next.js (das auf Cloudflare `@opennextjs/cloudflare` zur Emulation von Node.js/Vercel-APIs benötigt) läuft React Router v8 nativ und schlank.
  5. **Server-Side-Rendering & Daten-Layer**: Erstklassige Server-Loaders, Actions und Form-Handling direkt im Worker.
  6. **Sauberes Locale-Routing**: Native Unterstützung von parametrisierten Routen (`/de/...`, `/en/...`) via `@react-router/dev/routes`.
- **Next.js (App Router)** wurde als Kandidat evaluiert und zugunsten dieser nativen Edge-Architektur als `REJECTED / SUPERSEDED` eingestuft (`DEC-R08`).

### 4. Rendering & Hydration `[CONFIRMED]`
- **Server-First denken**: HTML wird standardmäßig auf dem Server gerendert (SSR via Cloudflare Workers).
- **Client JavaScript minimieren**: Client-Code wird ausschließlich dort hydriert, wo echte Interaktivität erforderlich ist.
- **Client-Interaktivität**:
  - Direkte Browser-APIs (z. B. Locale-Erkennung, Media-Queries)
  - Interaktive Event-Handler (Buttons, Formular-Inputs)
  - Lokale UI-Zustände (z. B. Menü-Toggle)
  - Motion & Animations-Trigger (Canvas / WebGL)
  - Interaktive Hero- und Lab-Elemente (Three.js / WebGL)

### 5. Datenbank-Prinzipien (Neon PostgreSQL) `[CONFIRMED ZIEL / AKTUELL UNPROVISIONIERT]`
- **Aktueller Status**: **Nicht provisioniert und nicht verbunden**. Es existiert kein Datenbankschema, keine Tabellen, kein ORM und keine aktive Verbindung. Die `.env.example` enthält lediglich den Standard-Verbindungsparameter als Referenz.
- **Strategie**: Für das Portfolio sind zunächst rein dateibasierte, typisierte lokale Inhalte (`content/projects/`) vollständig ausreichend. Eine Datenbank wird erst angebunden, falls konkrete dynamische Features (z. B. persistente Anfragen, dynamische Telemetrie) dies rechtfertigen.
- **Sicherheits-Grundregel**:
  - **Ausschließlich serverseitiger Datenbankzugriff**.
  - Niemals direkte Client-to-Database-Verbindungen.
  - Niemals Datenbank-Credentials oder Connection Strings im Client bündeln oder exponieren.
- **ORM / Query Builder**: Auswahl (z. B. Drizzle oder Kysely) erfolgt erst, wenn ein tatsächliches Schema benötigt wird.

### 6. Backend-Funktionalität `[CONFIRMED]`
- Kein separater Backend-Dienst aus reiner Architektur-Ästhetik.
- Für notwendige serverseitige Logik (z. B. Verarbeiten von Kontaktanfragen) genügen die serverseitigen Funktionen des gewählten Frameworks (z. B. Server Actions oder Route Handlers).

### 7. API-Design `[CONFIRMED]`
- Keine generischen API-Abstraktionen vorab bauen.
- Interne Endpunkte oder Schnittstellen werden nur exakt für die Features implementiert, die sie aktiv benötigen.

### 8. Authentication `[CONFIRMED]`
- **Status: NOT REQUIRED**.
- Das Portfolio ist ein öffentlich zugänglicher Webauftritt. Es wird keine Authentifizierungs- oder Auth-Bibliothek installiert.

### 9. State Management `[CONFIRMED]`
- Keine globalen State-Management-Bibliotheken (kein Redux, Zustand o. Ä.) vorab.
- Nutzung nativer Framework-Mechanismen (Server State, URL-State, lokaler React State).
- Externe State-Libraries werden nur bei nachgewiesenem, komplexem Bedarf eingeführt.

### 10. Content-Management (CMS) `[OPEN / WORKING DIRECTION]`
- **Status: NOT REQUIRED zum Start**.
- Inhalte (Case Studies, Vita, Texte) können zunächst hervorragend über lokale strukturierte Dateien (z. B. Markdown / MDX / lokale JSON-Dateien mit Typisierung) verwaltet werden.
- Ein Headless CMS wird erst dann evaluiert, wenn ein echter Redaktions-Workflow dies erforderlich macht.

### 11. Kontakt-Architektur `[WORKING DIRECTION]`
- Einfacher, robuster Kontakt-Flow.
- Kein Marketing-Funnel, keine Qualifizierungs-Hürden.
- Provider für E-Mail-Zustellung (z. B. Resend, Cloudflare Workers Mail oder direktes SMTP) wird zum Implementierungszeitpunkt ausgewählt `[OPEN]`.

### 12. Internationalization (i18n) `[CONFIRMED STRATEGIE]`
- Vollständige Zweisprachigkeit: **DE / EN**.
- Automatisierte Erkennung beim Erstbesuch über Browser-Header / Locales (`de-*` → DE, Fallback → EN).
- Dauerhafter, sichtbarer DE/EN Language Switcher.
- Manuelle Auswahl überschreibt die Erkennung und wird persistent gespeichert.
- Locale-spezifische URLs (`/de/...`, `/en/...`) sind die `WORKING DIRECTION`.

### 13. SEO & Metadaten `[CONFIRMED]`
- Mehrsprachige Metadaten je Sprache (Title, Description).
- Korrekte `canonical`- und `hreflang`-Tags für DE und EN.
- Automatisierte Generierung von `sitemap.xml` und `robots.txt`.
- Open Graph & Twitter Cards für optimale Vorschau beim Teilen von Projekten.
- Strukturierte Daten (JSON-LD) für Person & CreativeWork.

### 14. Performance & Core Web Vitals `[CONFIRMED]`
- **Performance First**: Ladezeiten und Reaktionsfreude sind Qualitätskriterien.
- Keine unnötige Hydration statischer Inhaltsblöcke.
- Bild- und Medienoptimierung (moderne Formate wie WebP/AVIF, responsive Breiten).
- Videos nur bewusst, komprimiert und stummgeschaltet einsetzen.
- Motion und Animationen dürfen unter keinen Umständen die Core Web Vitals (LCP, CLS, INP) verschlechtern.

### 15. Accessibility (A11y) als technische Qualitätsanforderung `[CONFIRMED]`
- Semantisches HTML (`main`, `nav`, `article`, `header`, `footer`).
- Vollständige Tastaturbedienbarkeit aller interaktiven Elemente.
- Deutlich sichtbare Focus-Ringe (`focus-visible`).
- Barrierefreie Formulare mit eindeutigen Labels und Fehlerzuständen.
- Ausreichende Kontraste gemäß WCAG 2.2 AA.
- Verbindliche Unterstützung für `@media (prefers-reduced-motion: reduce)`.
