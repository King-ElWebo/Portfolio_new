# Portfolio — Designer & Developer

> **Creative Direction**: *Cinematic Dark × Warm Editorial*  
> **Primäres Ziel**: Vertrauen aufbauen und neue, hochwertige Kundenprojekte gewinnen.

---

## 📌 Über dieses Projekt

Dieses Repository bildet das Fundament für das persönliche Portfolio eines Designers & Developers.  
Bevor Code geschrieben oder Frameworks initialisiert werden, dient dieses Repository als strukturierte **Source of Truth** für Konzeption, Inhalte, Art Direction, Design System und Motion-Design.

---

## 🏛 Source of Truth (`docs/`)

Alle inhaltlichen und gestalterischen Entscheidungen werden zuerst in der Dokumentation getroffen und gepflegt:

- [`docs/00-creative-brief.md`](docs/00-creative-brief.md) — Leitidee, Ziele, Zielgruppe, Visitor Journey & Prinzipien
- [`docs/01-content-inventory.md`](docs/01-content-inventory.md) — Bestandsaufnahme aller Texte, Projekte, Referenzen & Daten
- [`docs/02-site-architecture.md`](docs/02-site-architecture.md) — Seitenstruktur, Routing & Dramaturgie der Homepage
- [`docs/03-inspiration.md`](docs/03-inspiration.md) — Visuelle Referenzen, Benchmarks & Analyse
- [`docs/04-art-direction.md`](docs/04-art-direction.md) — Visuelle Tonalität (Cinematic Dark × Warm Editorial)
- [`docs/05-design-system.md`](docs/05-design-system.md) — Design-Tokens (Farben, Typo, Spacing, Komponenten)
- [`docs/06-motion-language.md`](docs/06-motion-language.md) — Motion-Prinzipien, Scroll-Verhalten & Übergänge
- [`docs/07-project-template.md`](docs/07-project-template.md) — Einheitliches Schema für Case Studies & Concepts
- [`docs/08-build-plan.md`](docs/08-build-plan.md) — Technischer Implementierungsplan (nach Abschluss der Konzeption)

---

## 📁 Verzeichnisstruktur

```text
portfolio-root/
│
├── docs/                   # Zentrale Source of Truth (Briefing, Content, Design, Motion)
│   ├── 00-creative-brief.md
│   ├── 01-content-inventory.md
│   ├── 02-site-architecture.md
│   ├── 03-inspiration.md
│   ├── 04-art-direction.md
│   ├── 05-design-system.md
│   ├── 06-motion-language.md
│   ├── 07-project-template.md
│   └── 08-build-plan.md
│
├── content/                # Rohe Inhaltsdaten & Markdown/JSON-Dateien
│   ├── projects/           # Case Studies (Client Projects & Independent Concepts)
│   ├── testimonials/       # Kundenstimmen & Empfehlungen
│   ├── experience/         # Werdegang & Meilensteine
│   └── credentials/        # Auszeichnungen, Zertifikate, Publikationen
│
├── assets/                 # Lokale Medien & Ressourcen
│   ├── portraits/          # Porträts & Personenaufnahmen
│   ├── project-images/     # Bildmaterial zu Projekten
│   ├── client-logos/       # Logos von Kunden & Partnern
│   ├── certificates/       # Dokumente & Zertifikate
│   └── inspiration/        # Screenshots & Design-Assets
│
├── references/             # Externe Referenzen & Research
│   └── websites/           # Notizen & Screenshots zu Benchmark-Seiten
│
├── .agents/                # KI- / Agenten-Konfigurationen
│   └── skills/             # Spätere projektspezifische Agent Skills
│
└── README.md
```

---

## ⚡ Wichtiger Hinweis für die spätere Entwicklung

Das eigentliche **Next.js-Projekt** wird zu gegebener Zeit **direkt in diesem Root-Verzeichnis** initialisiert (kein Unterordner wie `/web` oder `/app`).  
Die zukünftigen Next.js-Ordner (`app/`, `components/`, `lib/`, etc.) werden auf oberster Ebene parallel zu `docs/`, `content/` und `assets/` platziert.
