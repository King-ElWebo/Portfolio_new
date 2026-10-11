# Design System & Token Architecture

> **Zweck**: Systematische Dokumentation der Token-Architektur, UI-Komponenten und Gestaltungsregeln.  
> **Source of Truth**: Design Tokens & Komponenten-Spezifikation  
> **Status**: CONFIRMED BASELINE (D3.1 CSS-Tokens in `app/app.css` implementiert; als Arbeitsbasis verifiziert)

---

## 🏛 Token-Architekturprinzip `[CONFIRMED]`

Das Design System folgt einer dreistufigen Token-Architektur:
1. **Primitive Tokens**: Absolute Farb- und Maßwerte (Hex, Rem, px).
2. **Semantic Tokens**: Rollenbasierte Bezeichner (z. B. `--bg-dark-base`, `--text-cream-primary`), die themenbezogen (Obsidian Dark vs. Warm Paper) eingesetzt werden.
3. **Component Tokens**: Klassenspezifische Zuweisungen für Karten, Inputs, Buttons und Typo-Elemente.

---

## 1. Farb-Tokens (Aktuelle D3.1-Baseline aus `app.css`)

### 1.1 Obsidian Dark Palette (Act I & III)
| Token | Wert | Semantische Rolle | Status |
| :--- | :--- | :--- | :--- |
| `--bg-dark-base` | `#0d0e11` | Haupt-Hintergrund für dunkle Sektionen (Hero, Work, Lab) | `BASELINE` |
| `--bg-dark-lowest` | `#0d0e12` | Tiefster Hintergrund (Mobile Drawer, Dropdowns) | `BASELINE` |
| `--bg-dark-surface` | `#121317` | Erhöhte Flächen und Container | `BASELINE` |
| `--bg-dark-container` | `#1e1f24` | Input-Felder, Kartenrahmen | `BASELINE` |
| `--border-dark-subtle` | `rgba(70, 70, 75, 0.2)` | Haarlinien und Trennlinien im Dark Theme | `BASELINE` |
| `--border-dark-medium` | `rgba(70, 70, 75, 0.4)` | Sichtbare Umrandungen | `BASELINE` |
| `--border-dark-strong` | `rgba(70, 70, 75, 0.7)` | Aktive Ränder | `BASELINE` |
| `--text-dark-primary` | `#e3e2e7` | Primäre Überschriften & starker Kontrast | `BASELINE` |
| `--text-dark-secondary` | `#c7c6cb` | Fließtext und Beschreibungen | `BASELINE` |
| `--text-dark-muted` | `#909095` | Metadaten, Labels, Kicker | `BASELINE` |
| `--text-dark-dim` | `#7b7b7f` | Sehr dezente Zusätze | `BASELINE` |

### 1.2 Warm Cream / Paper Palette (Act II)
| Token | Wert | Semantische Rolle | Status |
| :--- | :--- | :--- | :--- |
| `--bg-cream-base` | `#f6f3ec` | Papier-Hintergrund für Capabilities, About, Collab | `BASELINE` |
| `--bg-cream-surface` | `#ede9e0` | Leicht abgesetzte Flächen im Cream Theme | `BASELINE` |
| `--bg-cream-hover` | `#efece4` | Interaktive Hover-Zustände auf Papier | `BASELINE` |
| `--border-cream` | `#ddd7cb` | Feine Trennlinien im Cream Theme | `BASELINE` |
| `--text-cream-primary` | `#2a2723` | Dunkler Haupttext auf Cream (hohe Lesbarkeit) | `BASELINE` |
| `--text-cream-secondary` | `#45423c` | Fließtext in Act II | `BASELINE` |
| `--text-cream-muted` | `#7c7b76` | Kicker und Metadaten auf Cream | `BASELINE` |
| `--accent-cream-brown` | `#5f4114` | Tiefer warmer Akzent für feine Akzentuierungen | `BASELINE` |

### 1.3 Akzentfarben (Gold / Bronze)
| Token | Wert | Semantische Rolle | Status |
| :--- | :--- | :--- | :--- |
| `--color-secondary` | `#ebbf87` | Warmer Gold-/Bronze-Akzent (Kicker, Focus, Buttons) | `BASELINE` |
| `--color-secondary-hover` | `#ffddb5` | Aufhellung bei Hover | `BASELINE` |
| `--color-on-secondary` | `#2a1800` | Kontrastfarbe für Text auf Gold-Badges | `BASELINE` |

---

## 2. Typografie-Tokens (Aktuelle D3.1-Baseline)

| Token | Wert / Fallback | Einsatzbereich | Status |
| :--- | :--- | :--- | :--- |
| `--font-serif` | `"Playfair Display", Georgia, serif` | Große redaktionelle Headlines & Projekt-Titel | `BASELINE` |
| `--font-sans` | `"Inter", -apple-system, sans-serif` | Primärer Fließtext, UI-Navigation, Lesbarkeit | `BASELINE` |
| `--font-mono` | `"JetBrains Mono", Menlo, monospace` | Technische Kicker, Code-Tags, Metadaten | `BASELINE` |

> [!NOTE]
> Die aktuellen Schriften werden via Google Fonts in `app/root.tsx` geladen. Eine spätere Ablösung durch selbst gehostete Webfonts (Datenschutz / DSGVO) oder finale Typografie-Lizenzen bleibt als Backlog-Task offen.

---

## 3. Spacing & Layout Tokens

| Token | Wert | Semantische Rolle | Status |
| :--- | :--- | :--- | :--- |
| `--container-max` | `1280px` | Maximale Inhaltsbreite (`max-w-7xl`) | `BASELINE` |
| `--gutter-x` | `clamp(1.5rem, 3.5vw, 3rem)` | Dynamisches horizontales Seiten-Padding | `BASELINE` |

---

## 4. UI-Komponenten & Barrierefreiheit `[CONFIRMED]`

- **Fokus-Zustände (`:focus-visible`)**: Verbindlich auf `2px solid var(--color-secondary)` mit `2px outline-offset` gesetzt.
- **Text-Selection**: `::selection` nutzt `background: var(--color-secondary)` mit dunklem Kontrast.
- **Touch-Targets**: Mindestgröße von 44×44px für Buttons und mobile Menü-Trigger.
- **Semantische HTML-Struktur**: Verbindliche Nutzung von `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`.
