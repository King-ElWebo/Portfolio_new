# Engineering Standards & Code Conventions

> **Status**: CONFIRMED VORGABE  
> **Source of Truth**: Entwicklungsrichtlinien, Code-Qualität & Sicherheitsstandards

---

## 1. Allgemeine Grundsätze (General Principles) `[CONFIRMED]`

- **Lesbarkeit vor Cleverness**: Code wird viel häufiger gelesen als geschrieben. Schreibe klaren, selbsterklärenden Code statt undurchsichtiger Tricks.
- **Wartbarkeit vor unnötiger Abstraktion**: Bevorzuge verständliche, bewährte Lösungen („Boring Architecture“) gegenüber spekulativer Komplexität.
- **Löse die aktuelle Anforderung**: Keine Lösungen für hypothetische Probleme der Zukunft bauen.
- **Keine verfrühte Abstraktion (No premature abstraction)**: DRY nicht dogmatisch übertreiben. Zwei ähnliche Codezeilen sind besser als eine fehlerhafte, starre Abstraktion.
- **Kein Overengineering**: Keine unnötigen Entwurfsmuster, Schichten oder Wrapper ohne konkreten Mehrwert.
- **Keine toten Codes & kein auskommentierter Code**: Nicht verwendeter Code wird gelöscht, nicht auskommentiert (dafür gibt es Git).
- **Keine unechten Daten als Fakt darstellen**: Keine erfundenen Kunden, Zitate oder Metriken in den Code oder in Mock-Daten einschleusen.

---

## 2. TypeScript-Standards `[CONFIRMED]`

- **Strict Mode**: `strict: true` ist projektweiter Standard in der `tsconfig.json`.
- **`any` strikt vermeiden**: Der Typ `any` ist grundsätzlich untersagt. Falls in seltenen Grenzfällen unumgänglich, muss er explizit mit einem Kommentar begründet werden.
- **Typ-Inferenz vs. explizite Typen**:
  - Typen intern dort inferieren lassen, wo sie offensichtlich sind (z. B. `const active = false`).
  - Explizite Typ-Annotationen an wichtigen Schnittstellen (Funktions-Parameter, Return-Types von APIs/Server-Funktionen, Komponenten-Props).
- **Keine übertriebene Typ-Akrobatik**: Typen sollen unterstützen, nicht den Code unlesbar machen.
- **Enge Typen bevorzugen (Narrow Types)**: String-Literale und Unions statt beliebigem `string` (z. B. `'de' | 'en'` statt `string`).
- **Externe Daten validieren**: Alle Daten von außen (Formulare, APIs) mit Schemas (z. B. Zod) serverseitig parsen und absichern.

---

## 3. Komponenten-Architektur (React / Framework) `[CONFIRMED]`

- **Fokussierte, kleine Komponenten**: Jede Komponente hat eine klare Verantwortung (Single Responsibility).
- **Komposition statt Monster-Komponenten**: Große Konfigurationsmonster mit Dutzenden bedingten Props durch flexible Komposition (`children`, Slots) ersetzen.
- **Keine „God Components“**: Komponenten mit Hunderten Zeilen Logik in übersichtliche Einheiten zerlegen.
- **Trennung von Primitives und Domain-Code**:
  - Wiederverwendbare UI-Primitives (z. B. Buttons, Badges, Modals) gehören in eine neutrale UI-Ebene.
  - Projekt- und Inhaltskomponenten (z. B. `ProjectHero`, `TestimonialSection`) verbleiben in der Domain-Ebene.
- **Zusammengehörige Logik co-lokieren**: State, Hooks und Hilfsfunktionen dort ablegen, wo sie primär verwendet werden.

---

## 4. Server-Side Rendering (SSR) & Hydration `[CONFIRMED]`

- **Server-First als Leitlinie**: Seiten und Routen werden standardmäßig auf dem Server gerendert (Cloudflare Workers SSR).
- **React Router v8 Daten-Architektur**: Datenabruf erfolgt über serverseitige `loader`-Funktionen; Mutationen (wie Formular-Submits) erfolgen über `action`-Funktionen.
- **Client JavaScript minimieren**: Client-Hydration und Event-Listener werden ausschließlich dort aktiviert, wo interaktive Browser-APIs, Canvas/WebGL (Hero Portrait) oder lokaler Komponenten-State (z. B. mobiles Navigationsmenü) zwingend erforderlich sind.
- Reine Präsentations- und Layout-Komponenten verbleiben schlank und hydration-arm.

---

## 5. Dependency-Management `[CONFIRMED]`

Vor dem Hinzufügen einer neuen npm-Dependency muss folgende Checkliste durchlaufen werden:
1. Kann die Anforderung mit dem bestehenden Stack oder nativen Plattform-/Framework-Mitteln sauber gelöst werden?
2. Verbessert die Abhängigkeit die Wartbarkeit oder Stabilität messbar?
3. Werden keine redundanten oder überlappenden Bibliotheken installiert (z. B. nicht zwei verschiedene Animations- oder Datums-Bibliotheken)?
4. **Größere architektonische Abhängigkeiten erfordern die explizite Freigabe des Nutzers.**

---

## 6. Motion & Animation `[CONFIRMED]`

- **Static Design First**: Jedes Interface muss ohne Animation und vor dem Laden von JavaScript perfekt aussehen und funktionieren.
- **Einfache Interaktionen über CSS**: Hover-States, Button-Clicks und Farbwechsel rein über modernes CSS steuern.
- **Libraries nur mit Begründung**: Höherwertige Animations-Toolings (z. B. GSAP) nur einsetzen, wenn komplexe Scroll-Verknüpfungen dies erfordern.
- **Reduced Motion**: `@media (prefers-reduced-motion: reduce)` muss verbindlich und vollständig unterstützt werden.
- Keine konkurrierenden Bibliotheken für denselben Zweck parallel betreiben.

---

## 7. Styling & Design-Tokens `[CONFIRMED]`

- **Design-Tokens vor Magic Values**: Keine willkürlichen Hex-Farben, Paddings oder Schriftgrößen im Markup streuen; stattdessen Token-Klassen / CSS-Variablen nutzen.
- **Semantische Variablen**: Farbklassen nach Bedeutung wählen (`bg-surface-primary`), nicht nach starrer Farbe.
- **Lesbares Markup**: Extrem lange, unleserliche Utility-Ketten vermeiden; bei Bedarf Komponenten modularisieren.
- **Kein Inline-Styling (`style={{...}}`)**, außer für echte dynamische Werte (z. B. mausverfolgende Koordinaten).

---

## 8. Naming Conventions `[CONFIRMED]`

- Namen müssen Absicht und Zweck klar widerspiegeln.
- ❌ **Untersagt**: `data2`, `temp`, `thing`, `stuff`, `handler2`, `obj`.
- ✅ **Erwünscht**: `isMenuOpen`, `projectList`, `handleContactSubmit`, `formattedDate`.

---

## 9. Error Handling & Logging `[CONFIRMED]`

- Fehler dürfen **niemals stillschweigend geschluckt werden** (`catch (e) {}` ohne Aktion ist verboten).
- Aussagekräftige Server-Logs bereitstellen, jedoch **ohne sensible Daten oder Secrets preiszugeben**.
- Fehlermeldungen für den Nutzer müssen verständlich, hilfreich und sicher sein (keine rohen Stack-Traces im UI).

---

## 10. Sicherheit & Secrets `[CONFIRMED]`

- **Secrets niemals im Client**: API-Keys, Datenbank-Verbindungsdaten und Service-Secrets dürfen niemals im Client-Code oder im Browser-Bundle auftauchen.
- **Eingaben serverseitig validieren**: Alle Nutzereingaben (z. B. Kontaktformular) serverseitig strikt validieren und bereinigen.
- **Niemals Zugangsdaten ins Git-Repository committen**: Alle Secrets gehören in lokale `.env`-Dateien (die in `.gitignore` stehen) bzw. in die Cloudflare-Environment-Settings.
- **Least-Privilege-Prinzip**: Datenbank-Nutzer und Tokens erhalten nur die minimal notwendigen Rechte.

---

## 11. Datenbank-Standards (Neon PostgreSQL) `[CONFIRMED]`

- Zugriff ausschließlich über serverseitige Module.
- Reproduzierbare, versionierte Migrationen.
- Schema-Änderungen müssen vorab geprüft werden.
- Keine verstreuten Raw-Queries in UI-Komponenten; Zugriff an zentraler Stelle kapseln.

---

## 12. Accessibility (Barrierefreiheit) `[CONFIRMED]`

- Korrektes semantisches HTML (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`).
- Volle Tastaturnavigation (Tab-Reihenfolge logisch, Schließen per `Escape`).
- Deutliche optische Hervorhebung von Fokuszuständen (`focus-visible`).
- Zugängliche Formulare mit verbundenen `<label>`-Elementen und `aria-describedby` für Fehler.
- Ausreichende Farbkontraste gemäß WCAG 2.2 AA.
- Sinnvolle Bildbeschreibungen (`alt`-Attribute); rein dekorative Bilder mit `alt=""` versehen.
- Keine Interaktionen, die ausschließlich per Mouse-Hover ausgelöst werden können.

---

## 13. Testing-Strategie `[CONFIRMED]`

- **Testen proportional zum Risiko**:
  - Unit-Tests für geschäfts- oder formlogische Algorithmen (z. B. Validierungslogik, Sprachumschaltung).
  - End-to-End-Tests (z. B. Playwright) für die kritischen User Journeys.
- **Spätere E2E-Kernkandidaten**:
  - Sprachumschaltung DE ↔ EN
  - Hauptnavigation und Routing
  - Case-Study-Detailseitenaufruf
  - Kontaktformular-Übermittlung
  - Mobiles Navigationsmenü

---

## 14. Quality Gate (Definition of Done) `[CONFIRMED]`

Bevor eine Implementierungsaufgabe als **DONE** bezeichnet werden darf, müssen folgende Kriterien erfüllt sein:
1. `typecheck` (`react-router typegen && tsc`) läuft ohne Fehler durch.
2. `linter` läuft ohne Warnungen/Fehler durch *(Hinweis: Linter ist noch nicht in `package.json` konfiguriert; Task in Epic G)*.
3. Relevante Tests laufen erfolgreich durch *(Hinweis: Test-Framework noch nicht konfiguriert; Task in Epic G)*.
4. Der Produktions-Build (`npm run build`) kompiliert fehlerfrei.
5. Keine JavaScript-Fehler oder Warnungen in der Browser-Konsole.
6. Responsive Ansichten auf Mobile und Desktop geprüft.
7. Tastaturbedienbarkeit und `@media (prefers-reduced-motion)` verifiziert.
8. Keine versehentlichen oder ungenehmigten Dependencies installiert.
9. Keine Secrets im Code oder Git-Diff.
10. Dokumentation in `/docs` aktualisiert, sofern sich architektonische Details geändert haben.

> [!NOTE]
> **Aktuelle Tooling-Lücke**: In `package.json` existieren derzeit nur die Skripte `dev`, `build`, `preview` und `typecheck`. Weder ein Linter (ESLint/Biome) noch ein Test-Runner (Vitest/Playwright) sind aktuell installiert. Bis zur Umsetzung von Task `QA-001` im Backlog erfolgt das Quality Gate über `typecheck`, `build` und manuelle visuelle/konsolenbasierte Prüfung.
