# Site Architecture

> **Zweck**: Strukturelle Dokumentation der Seitenhierarchie, Routen, Navigation und Abschnittsdramaturgie der Homepage.  
> **Hinweis**: Noch keine finalen Layoutentscheidungen oder Wireframes vorwegnehmen.  
> **Source of Truth**: Informationsarchitektur & Routing

---

## 1. Global Navigation & Layout Shell

### Header / Hauptnavigation `[CONFIRMED]`
Die primäre Navigation bleibt bewusst schlank und fokussiert:
- **Name / Wordmark / Logo** → führt zur Startseite
- **Work** → führt zur Projektübersicht
- **Contact** → führt zum Kontaktbereich
- **Optionaler CTA**: hervorgehobener *"Let's talk ↗"*-Button
- **Language Switcher `[CONFIRMED]`**: Dauerhaft sichtbarer **DE / EN Switcher** (mit automatischer Erst-Erkennung und persistierter manueller Auswahl).

> **Navigationseinordnung von About & Lab `[CONFIRMED]`**:  
> - **About** bleibt vorläufig als feste Section auf der Homepage integriert (kein separater Menüpunkt notwendig).  
> - **The Lab / Concepts** bleibt Bestandteil der Homepage bzw. der Filterstruktur unter `/work`. Es wird keine eigenständige Lab-Route erzwungen.  
> - Eine Auslagerung in eigene Hauptnavigationspunkte bleibt eine optionale spätere Erweiterung `[TODO]`.

### Footer `[CONFIRMED]`
- **Großer Call-to-Action**: Einladender Abschluss ("Let's build something together").
- **Kontaktwege**: Direkte E-Mail, LinkedIn, ggf. weitere Profile.
- **Rechtliches / Meta**: Impressum, Datenschutz (technisch erforderlich, aber keine kreative Hauptnavigation).
- **Visuelle Klammer**: Rückkehr zur dunklen, immersiven Tonalität (Cinematic Dark).

---

## 2. Seitenübersicht & Routing-Modell

### Hauptseiten `[CONFIRMED]`
- `/` — Homepage (Dramaturgische Reise)
- `/work` — Übersicht aller Arbeiten (Client Work & Concepts)
- `/work/[slug]` — Case Study Detailansicht
- `/contact` — Barrierefreier Kontaktbereich

### Mehrsprachiges Routing `[WORKING DIRECTION]`
Für die zweisprachige Umsetzung (DE/EN) wird folgende strukturierte Locale-Architektur als bevorzugte Richtung festgehalten:

```text
/de
├── /de/work
│   └── /de/work/[slug]
└── /de/contact

/en
├── /en/work
│   └── /en/work/[slug]
└── /en/contact
```

*Technische Hilfsseiten (nachgelagert):*
```text
├── /de/impressum  &  /en/imprint
└── /de/datenschutz  &  /en/privacy
```

---

## 3. Homepage-Struktur & Abschnittsfolge `[WORKING DIRECTION]`

Die genaue Homepage-Komposition ist **noch nicht final** und wird in der Design-Exploration getestet. Aktuell bevorzugte Abfolge:

```text
┌────────────────────────────────────────────────────────┐
│  01 Hero Section (Cinematic Dark)                      │
│     • Statement: "FROM IDEA TO DIGITAL EXPERIENCE."    │
│     • Subline, Atmosphäre, subtiler Scroll-Impuls      │
├────────────────────────────────────────────────────────┤
│  02 Selected Work (Cinematic Dark)                     │
│     • 2–3 handverlesene Spitzenprojekte                │
│     • Großformatige Medien, Fokus auf Exzellenz        │
├────────────────────────────────────────────────────────┤
│  03 Signature Dark → Cream Transition                  │
│     • Dramaturgischer Farbumschwung zu Warm Editorial  │
├────────────────────────────────────────────────────────┤
│  04 About / Personal Statement (Warm Editorial)        │
│     • Nahbare Vorstellung, Philosophie, Porträt        │
├────────────────────────────────────────────────────────┤
│  05 What I Do / Capabilities (Warm Editorial)          │
│     • 3 Bereiche: Websites, Apps, AI & Automation      │
│     • Ergänzend integriert: Think / Design / Build     │
├────────────────────────────────────────────────────────┤
│  06 Selected Experience / Collaborations               │
│     • Meilensteine, Zusammenarbeit, Agenturbezug       │
├────────────────────────────────────────────────────────┤
│  07 The Lab / Independent Concepts (Hybrid / Dark)     │
│     • Eigeninitiierte Studien & Prototypen             │
├────────────────────────────────────────────────────────┤
│  08 Optionale Trust Elements                           │
│     • Testimonials oder relevante Referenz-Logos       │
├────────────────────────────────────────────────────────┤
│  09 Final CTA (Cinematic Dark)                         │
│     • Rückkehr zur immersiven Welt                     │
│     • Starker Kontakt-Abschluss                        │
└────────────────────────────────────────────────────────┘
```

---

## 4. Work Page (`/work`) `[WORKING DIRECTION]`

- **Kopfbereich**: Übersichtliche Einführung und Haltung zur Arbeit.
- **Filter- / Gruppierungsoptionen**:
  - Alle Arbeiten
  - Client Projects (Reale Auftragsarbeiten)
  - Independent Concepts (The Lab)
- **Projektübersicht**: Großzügige Kacheln/Zeilen mit Metadaten (Kategorie, Jahr, Rolle).

---

## 5. Project Detail Template (`/work/[slug]`) `[CONFIRMED]`

- Detailliertes Case Study Template (Spezifikation siehe [`docs/07-project-template.md`](07-project-template.md)).
- Einheitlicher gestalterischer Aufbau für Client Projects und Independent Concepts.

---

## 6. Contact Page (`/contact`) `[CONFIRMED]`

- Unkomplizierter, schneller Erstkontakt (Formular: Name, E-Mail, Nachricht).
- Direkte E-Mail-Adresse mit Click-to-Copy.
- LinkedIn-Profil.
- Keine Hürden, kein Budget-Prequalifying.

---

## 7. Offene Punkte `[TODO]`

- [ ] Finale Festlegung des Routing-Mechanismus (Sub-Path `/de`/`/en` vs. Cookie-basiertes Rendering) nach Framework-Entscheidung.
- [ ] Responsive Verhalten der Navigation auf Mobilgeräten (Minimalistisches Menü-Overlay vs. Sticky Bar).
- [ ] Testen der 3 Design-Explorationen für die Homepage-Dramaturgie.
