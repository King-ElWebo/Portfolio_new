# Content Inventory & Status

> **Zweck**: Zentrale Bestandsaufnahme und Fortschrittskontrolle aller textlichen, visuellen und biografischen Inhalte.  
> **Source of Truth**: Inhalte & Assets  
> **Status**: IN PROGRESS (Übergang von D3.1-Demo-Platzhaltern zu wahrheitsgetreuem, verifiziertem Portfolio-Content)

---

## 🚦 Projektweites Statussystem für Inhalte

| Status | Definition im Content-Kontext |
| :--- | :--- |
| `VERIFIED / CONFIRMED` | Vom Nutzer explizit bestätigt, Fakten verifiziert, Freigabe zur Veröffentlichung erteilt. |
| `NEEDS CONFIRMATION` | Bekannter Projekt-Kandidat oder Vorschlag; Fakten, Rolle, Rechte und Daten müssen bestätigt werden. |
| `PLACEHOLDER` | Temporärer Blindtext oder Demo-Inhalt (z. B. aus Stitch D3.1); darf nicht als echter Inhalt online gehen. |
| `MISSING` | Benötigtes Asset, Medium oder Text existiert noch nicht; muss noch erstellt oder beigebracht werden. |
| `PAUSED` | Aktuell eingefrorene Entwicklung (z. B. personalisiertes Porträt-Mesh). |
| `REJECTED` | Erfundene Kunden, gefälschte KPIs, falsche Metriken (strikt untersagt gemäß `AGENTS.md`). |

---

## 1. Status der aktuellen Implementierungs-Inhalte (Baseline-Audit)

In der aktuellen Codebasis (`app/i18n/translations.ts`) befinden sich noch überwiegend **temporäre Stitch-D3.1-Platzhalter**:

| Identifikator in Code | Aktueller Text / Titel | Klassifikation | Handlungsbedarf |
| :--- | :--- | :--- | :--- |
| `work.project01` | *Digital Flagship Platform & Design System* | `FICTIONAL PLACEHOLDER` | Ersetzen durch echtes Referenzprojekt nach Nutzerbestätigung. |
| `work.project02` | *Interactive Spatial Experience & Web Application* | `FICTIONAL PLACEHOLDER` | Ersetzen durch echtes Referenzprojekt nach Nutzerbestätigung. |
| `bridge.project03` | *Adaptive Data Surface & System Shell* | `FICTIONAL PLACEHOLDER` | Ersetzen durch echtes Independent Concept oder reales Projekt. |
| `lab.cards[0..2]` | *Halftone Shaders, Dynamic Surface, Variable Typo* | `PARTIALLY DEMO` | Lab-Prototypen schärfen oder durch reale interaktive Studien belegen. |
| `contact.directEmail` | `wilk@studio.lab` | `PLACEHOLDER` | Ersetzen durch reale, bestätigte Kontaktadresse. |
| `contact.networkUrl` | `linkedin.com/in/wilk-studio` | `PLACEHOLDER` | Ersetzen durch reale LinkedIn-URL des Practitioners. |
| `meta.title` | *D3 — Refined Cinematic Editorial Portfolio...* | `PLACEHOLDER` | Bereinigen um interne Stitch-Versionskürzel. |

---

## 2. Strukturierte Projekt-Erfassungsmatrix (17-Punkte-Schema)

Um Projekte aus dem Kandidatenpool systematisch zu vollständigen Case Studies aufzubereiten, dient folgendes Erfassungsschema (abgeleitet aus `docs/07-project-template.md`):

1. **Projektname**: Eindeutiger Titel oder Arbeitsname
2. **Projekttyp**: Web, App, E-Commerce, System, AI-Tool
3. **Klassifikation**: *Client Project* oder *Independent Concept*
4. **Veröffentlichungsfreigabe**: Liegt Erlaubnis des Auftraggebers vor? (Ja / Anonymisiert / Nein)
5. **Tatsächliche Rolle**: Konkreter Aufgabenbereich (z. B. End-to-End, UI/UX, Fullstack, Frontend)
6. **Problem / Ausgangslage**: Welcher Bedarf bestand beim Kunden / Nutzer?
7. **Lösungsansatz**: Konzeptionelle Idee und Vorgehen
8. **UX-Beitrag**: Nutzerführung, Wireframing, Informationsarchitektur
9. **Design-Beitrag**: Art Direction, Typografie, UI-Design, Tokens
10. **Development-Beitrag**: Architektur, Frontend, Backend, API, DB
11. **Technische Highlights**: Besondere technische Aspekte (Frameworks, Performance, Workflows)
12. **Reale Ergebnisse**: Verifizierbare Metriken, Kundenfeedback oder qualitative Learnings (KEINE Erfindungen!)
13. **Vorhandene Assets**: Screenshots, Screen-Recordings, Brand-Assets
14. **Fehlende Medien**: Noch anzufertigende Mockups, Details, Videos
15. **Case-Study-Reife**: Status der Aufbereitung (Konzept / Rohdaten / Ausformuliert)
16. **Textstatus DE**: Deutsche Beschreibung (Entwurf / Review / Freigegeben)
17. **Textstatus EN**: Englische Beschreibung (Entwurf / Review / Freigegeben)

---

## 3. Verifizierter Projektbestand im Portfolio (`app/data/projects.ts`) `[VERIFIED / PUBLISHED]`

Folgende 7 Projekte sind nun direkt in `app/data/projects.ts` und dem Work-Archiv integriert. Alle Daten basieren auf verifizierten Codebasen, Live-Deployments und GitHub-Repositories:

| # | Projekt | Typ / Ausrichtung | Client vs. Concept | Freigabe- & Verifikationsstatus | Technische Basis & Quelle |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **01** | **Checkpot Hietzing** | Modeboutique & Lookbook mit Custom CMS | Client Project | `VERIFIED / PUBLISHED` | Next.js, Tailwind, Neon PostgreSQL, Cloudflare Workers, R2, Resend. Live: `checkpot-hietzing.at` |
| **02** | **Let It Bloom** | Florales Atelier mit Mini-CMS | Client Project | `VERIFIED / PUBLISHED` | Next.js 15, React 19, Tailwind v4, Vercel KV/Blob, Web3Forms. Live: `letitbloom.at` |
| **03** | **FKW-G** | Barrierearmes Vereinsportal | Client Project | `VERIFIED / PUBLISHED` | Custom WordPress Theme, PHP, Tailwind CSS, barrierearmes Design, PayPal. GitHub: `fkw-g` |
| **04** | **LUMENWERK Studio** | Architektonisches Licht & Konfigurator | Independent Concept / Lab | `VERIFIED / PUBLISHED` | Next.js 16, Tailwind, Konfigurator, B2B-Händleransicht, Static Export. GitHub: `Demo-leuchten-online-shop` |
| **05** | **SPEICHE** | Fahrrad-Werkstattmanager | Independent Concept / Lab | `VERIFIED / PUBLISHED` | React 19, Next.js, Tailwind, Client-Side State, Fachanwendung. GitHub: `Werkstattmanager-Demo` |
| **06** | **RÖSTWERK 1070** | Mikrorösterei, Sensorik-Radar & Rechner | Independent Concept / Lab | `VERIFIED / PUBLISHED` | Next.js, React 19, Tailwind, Sensorik-Finder, Brührechner. GitHub: `Kaffeer-sterei-Demo` |
| **07** | **KERN / FIELD** | Architekturstudio & räumliche Monografie | Independent Concept / Lab | `VERIFIED / PUBLISHED` | Next.js, Tailwind, Editorial Grid, Responsive Art Direction. GitHub: `Architecture-Demo` |

### Weitere Kandidaten & interne Werkzeuge `[NEEDS CONFIRMATION / IN PROGRESS]`

| # | Projekt-Kandidat | Typ / Ausrichtung | Status | Anmerkung |
| :-: | :--- | :--- | :--- | :--- |
| **08** | **KONTUR** | Finanzleitstand für Kreativagenturen | In Progress / Lab | 13-Wochen-Liquiditätscockpit; GitHub: `-KONTUR-...` |
| **09** | **Persönliches Dashboard** | Cloudflare & Drizzle Dashboard-App | In Progress | Lokale Codebasis auf Desktop (`Dashbaord`) |
| **10** | **Hüpfburg-Verleihplattform** | Buchung & Produktmanagement | Unbestätigt | Weitere Rohdaten ausstehend |

---

## 4. Content-Architektur-Empfehlung: Lokale strukturierte Daten

**Empfehlung**: Für die initiale Version des Multi-Page-Portfolios ist eine **lokale, dateibasierte Inhaltsstruktur** (z. B. typisierte TypeScript-Dateien oder lokales JSON/Markdown im Ordner `content/projects/`) vollständig ausreichend.

### Gründe:
1. **Kein administrativer Overhead**: Kein externes Headless CMS, keine zusätzlichen Authentifizierungs- oder Cloud-Kosten.
2. **Volle TypeScript-Typsicherheit**: Einheitliche Schema-Prüfung gegen `ProjectSchema` zur Build-Zeit (`npm run typecheck`).
3. **Zero-Latency SSR**: Direkter Import auf Cloudflare Workers ohne externe REST/GraphQL-Netzwerk-Roundtrips.
4. **Git-Historie & Review**: Textänderungen und Übersetzungen (DE/EN) durchlaufen dasselbe Review wie Code.
5. **Zukunftssicher**: Kann später jederzeit bei echtem redaktionellem Bedarf an Neon PostgreSQL oder ein Headless CMS angebunden werden, ohne das UI-Template umzubauen.

---

## 5. Biografische & Persönliche Inhalte `[NEEDS CONFIRMATION]`

| Bereich | Inhalt / Status | Quelle | Handlungsbedarf |
| :--- | :--- | :--- | :--- |
| **Name des Practitioners** | *WILK* (Arbeitsbezeichnung) | `WORKING DIRECTION` | Offizielle Namensnennung bestätigen. |
| **Standort** | Österreich | `CONFIRMED` | Genaue Formulierung prüfen. |
| **Vita / Werdegang** | `content/experience/` (aktuell `.gitkeep`) | `MISSING` | Relevante Stationen erfassen. |
| **Authentisches Foto** | `assets/portraits/private/` (vorhanden, privat) | `PRIVATE / UNVERIFIED` | Auswahl für Practitioner-Sektion treffen. |
| **3D Partikel-Porträt** | Variante A vorbereitet, Geometrie pausiert | `PAUSED` | Entscheidung über Gesichtsgeometrie ausstehend. |
| **Testimonials** | `content/testimonials/` (aktuell `.gitkeep`) | `MISSING / OPTIONAL` | Reale Kundenfreigaben einholen oder Sektion überspringen. |
