# Site Architecture

> **Zweck**: Strukturelle Dokumentation der Seitenhierarchie, Routen und Abschnittsdramaturgie der Homepage.  
> **Hinweis**: Hier werden noch keine finalen Layoutentscheidungen oder Wireframes vorweggenommen.  
> **Source of Truth**: Informationsarchitektur

---

## 1. Global Navigation & Layout Shell

### Header / Navigation
- **Logo / Wordmark**: Typografisch prägnant, linksbündig oder zentriert.
- **Navigationslinks**:
  - `Work`
  - `About` (Sprungmarke auf Homepage oder Unterseite)
  - `Lab` (Independent Concepts)
  - `Contact` (CTA)
- **Status-Indikator**: Optional dezente Anzeige der aktuellen Projektverfügbarkeit (z. B. *"Available for Q4"*).

### Footer
- **Grosser Call-to-Action**: Aufforderung zur Kontaktaufnahme ("Let's build something together").
- **Kontaktwege**: Direkte E-Mail, evtl. Buchungslink, Social Links.
- **Rechtliches**: Impressum, Datenschutz, Copyright.
- **Visuelle Welt**: Rückkehr zu Cinematic Dark.

---

## 2. Seitenübersicht (Routen)

```text
/ (Home)
├── /work
│   ├── /work/[slug]          (Case Study — Client Project oder Concept)
│   └── (Optionaler Filter nach Client Work vs. Concepts)
├── /contact
└── /legal
    ├── /impressum
    └── /datenschutz
```

---

## 3. Homepage-Struktur & Abschnittsfolge

Die Homepage bildet den dramaturgischen Leitfaden der gesamten Nutzererfahrung.

### ACT I — IMPRESS *(Cinematic Dark)*
*Fokus: Maximale visuelle Wirkung, Neugier wecken, gestalterisches Können beweisen.*
1. **Hero Section**
   - Markante Headline / Mission Statement
   - Feine, cineastische Typografie und Atmosphäre
   - Subtiler Scroll-Indikator
2. **Selected Work**
   - 2 bis 3 handverlesene Spitzenprojekte
   - Großformatige Medien (Video/Stills), flüssige Scroll-Interaktion
   - Nahtloser Übergang zur nächsten Phase

### ACT II — TRUST *(Warm Editorial / Cream)*
*Fokus: Substanzieller Beweis von Professionalität, Zuverlässigkeit und Tiefe.*
1. **Clients / Collaborations**
   - Ruhige, edle Logoleiste oder typografische Nennung
2. **About / Philosophy**
   - Wer steht dahinter? Haltung, Design- & Engineering-Philosophie
   - Authentisches Porträt / Editorial-Layout
3. **Capabilities / Services**
   - Was konkret angeboten wird (Art Direction, Creative Tech, Design Systems)
4. **Experience & Stationen**
   - Relevante Meilensteine, Agentur-/Studio-Erfahrung
5. **Credentials & Recognition**
   - Zertifikate, Auszeichnungen oder relevante Veröffentlichungen
6. **Testimonials (Optional)**
   - Ausgewählte Stimmen von Auftraggebern oder Partnern

### ACT III — EXPLORE *(The Lab / Independent Concepts)*
*Fokus: Innovationskraft, Leidenschaft und unkonventionelle Ideen.*
1. **The Lab Intro**
   - Erklärung: Eigeninitiierte Studien, Zukunftskonzepte, experimentelle Interaktionen
2. **Concept Grid / Cards**
   - Visuell gleichwertig zu Client-Projekten inszeniert
   - Transparente Kennzeichnung als *"Independent Concept"*

### FINAL — ACT *(Cinematic Dark)*
*Fokus: Konversion und Abschluss der visuellen Klammer.*
1. **Contact CTA**
   - Direkte Einladung zum Austausch
   - Niederschwellige Kontaktmöglichkeit

---

## 4. Work Page (`/work`)
- **Header**: Einführung & Überblick über das Gesamtwerk.
- **Filter / Toggle**:
  - All Projects
  - Client Work
  - Independent Concepts (The Lab)
- **Projektliste / Grid**: Großzügige, visuell ansprechende Kacheln/Zeilen mit Metadaten (Kategorie, Jahr, Rolle).

---

## 5. Project Detail Template (`/work/[slug]`)
- Detailliertes Case Study Template (siehe Spezifikation in [`docs/07-project-template.md`](07-project-template.md)).
- Einheitlicher Aufbau für Client Projects und Independent Concepts.

---

## 6. Contact Page (`/contact`)
- Direkte Kontaktoptionen (E-Mail mit Click-to-Copy).
- Angaben zur aktuellen Projektverfügbarkeit und Vorlaufzeit.
- Zeitzone & bevorzugte Kommunikationswege.

---

## 7. Offene Punkte & TODOs
- [ ] Festlegung, ob "About" eine separate Unterseite erhält oder auf der Homepage verbleibt.
- [ ] Definition der genauen URL-Slugs für Case Studies.
- [ ] Wireframing der responsiven Breakpoint-Anpassungen (Mobile vs. Desktop Navigation).
