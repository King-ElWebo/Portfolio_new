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

### 3. Framework-Auswahl `[WORKING DIRECTION / CANDIDATE]`
- **Next.js (App Router)** ist aktuell ein **starker Kandidat**, jedoch **noch nicht final CONFIRMED**.
- **Vor der Framework-Initialisierung müssen zwingend folgende Faktoren geprüft werden**:
  1. Aktuelle, offizielle Cloudflare-Unterstützung (z. B. `@opennextjs/cloudflare` vs. Cloudflare Pages / Workers).
  2. Empfohlene Deployment-Strategie auf Cloudflare.
  3. Reibungslose Kompatibilität mit Neon PostgreSQL (Serverless Driver / WebSocket / HTTP).
  4. Native oder saubere Unterstützung unserer Internationalisierungs-Anforderung (DE/EN mit Locale-Routing).
  5. Harmonische Integration geplanter Motion-Libraries.
- **Alternative Kandidaten (maximal 2–3)**: z. B. Astro (exzellenter Server-First-Ansatz für Content) oder Remix / React Router v7. Es wird keine theoretische Debatte mit Dutzenden Frameworks geführt.

### 4. Rendering & Hydration `[CONFIRMED]`
- **Server-First denken**: HTML wird standardmäßig auf dem Server gerendert.
- **Client JavaScript minimieren**: Client-Code wird ausschließlich dort ausgeliefert, wo echte Interaktivität erforderlich ist.
- *Bei Einsatz von Next.js*:
  - **Server Components by default** für Layout, Seitenstruktur und Datenabruf.
  - **Client Components (`'use client'`) nur für**:
    - Direkte Browser-APIs (z. B. Locale-Erkennung, Media-Queries)
    - Interaktive Event-Handler (Buttons, Formular-Inputs)
    - Lokale UI-Zustände (z. B. Menü-Toggle)
    - Motion & Animations-Trigger
    - Interaktive Canvas- / WebGL-Elemente

### 5. Datenbank-Prinzipien (Neon PostgreSQL) `[CONFIRMED]`
- **Aktueller Status**: Noch kein Schema, keine Tabellen, kein ORM und keine Migrationen.
- **Sicherheits-Grundregel**:
  - **Ausschließlich serverseitiger Datenbankzugriff**.
  - Niemals direkte Client-to-Database-Verbindungen.
  - Niemals Datenbank-Credentials oder Connection Strings im Client bündeln oder exponieren.
- **ORM / Query Builder**: Auswahl (z. B. Drizzle oder Kysely) erfolgt erst, wenn ein tatsächliches Schema für dynamische Features benötigt wird.

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
