# Design System & Tokens

> **Zweck**: Systematische Vorbereitung der Design-Tokens, UI-Komponenten und Gestaltungsregeln.  
> **Wichtig**: Es werden noch **keine konkreten Token-Werte erfunden**. Das Design-System wird erst nach der Auswahl der Art Direction finalisiert.  
> **Source of Truth**: Token-Architektur & Komponenten-Spezifikation

---

## 🏛 Token-Architekturprinzip `[CONFIRMED]`

Das Design System folgt einer sauberen dreistufigen Token-Architektur:

1. **Primitive Tokens**: Rohwerte (z. B. Farbwerte auf einer neutralen Skala, absolute Pixel- oder Rem-Größen).
2. **Semantic Tokens**: Bedeutungsbezogene Rollen (z. B. `surface-primary`, `text-heading`, `border-subtle`), die sich je nach Theme (Dark vs. Cream) dynamisch anpassen.
3. **Component Tokens**: Spezifische Zuweisungen für einzelne Komponenten (z. B. `button-primary-bg`, `card-project-radius`).

---

## 1. Semantic Colors `[TODO]`

*Farbdefinitionen werden nach Entscheidung der Art-Direction-Exploration hinterlegt.*

- [ ] **Surface Tokens**:
  - `surface-canvas-dark` & `surface-canvas-cream`
  - `surface-elevated` (Karten, Dialoge)
  - `surface-inset` / `surface-subtle`
- [ ] **Text & Content Tokens**:
  - `text-primary` (stärkster Kontrast für Headlines)
  - `text-secondary` / `text-muted` (Fließtext und Metadaten)
  - `text-inverted`
- [ ] **Border & Divider Tokens**:
  - `border-subtle`, `border-strong`
- [ ] **Accent & Feedback Tokens**:
  - `accent-primary` (falls definiert)
  - `status-active` (z. B. subtiler Indikator für Projektverfügbarkeit)

---

## 2. Typography `[TODO]`

- [ ] **Font Families**:
  - `font-display` / `font-serif` (Headlines)
  - `font-body` (Fließtext, hohe Lesbarkeit)
  - `font-mono` (Metadaten, Jahreszahlen, technische Kennzeichnungen)
- [ ] **Type Scale (Fluid Typography mit clamp())**:
  - Display XXL, Display XL
  - H1, H2, H3, H4
  - Body Large, Body Default, Body Small
  - Caption / Label / Overline
- [ ] **Line Heights & Letter Spacing (Tracking)** für Versalien und Fließtext

---

## 3. Spacing & Section Spacing `[TODO]`

- [ ] **Base Spacing Scale**: Konsistente Schritte (z. B. 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px)
- [ ] **Section Spacing**: Großzügige vertikale Abstände zwischen den Hauptabschnitten zur Rhythmussteuerung

---

## 4. Grid, Content Width & Margins `[TODO]`

- [ ] **Max Content Width**: Begrenzung für Textlesbarkeit vs. Full-Bleed-Breiten für cineastische Medien
- [ ] **Grid-System**: 12-Spalten-Raster mit flexiblen Unterteilungen
- [ ] **Screen Margins & Gutters**: Fluid Padding an den Bildschirmrändern

---

## 5. Radius (Eckenabrundung) `[TODO]`

- [ ] Radien-Tokens (z. B. `radius-none`, `radius-sm`, `radius-md`)
- [ ] Differenzierung zwischen Karten, Buttons und interaktiven Badges

---

## 6. Z-Index Scale `[TODO]`

- [ ] Strukturierte Skala zur Vermeidung von Konflikten (z. B. `base`, `sticky-nav`, `overlay`, `modal`, `cursor`)

---

## 7. Motion Tokens `[TODO]`

- [ ] **Durations**: Quick (150–200ms), Standard (300–400ms), Narrative/Slow (600–1000ms)
- [ ] **Easings**: Natural Out, Smooth In-Out, Cinematic Ease

---

## 8. Breakpoints & Responsive Behaviour `[TODO]`

- [ ] Breakpoints (Mobile, Tablet, Desktop, Wide)
- [ ] Touch-Targets (mindestens 44×44px für alle interaktiven Elemente)

---

## 9. Buttons & Interactive Controls `[TODO]`

- [ ] Primary Button
- [ ] Secondary / Outline Button
- [ ] Text & Arrow Links
- [ ] Button-Zustände (Default, Hover, Active, Disabled)

---

## 10. Links & Navigation Items `[TODO]`

- [ ] Inline-Links (Unterstreichung, Hover-Transition)
- [ ] Navigationslinks & aktiver Indikator
- [ ] Language Switcher Komponente (DE / EN)

---

## 11. Focus & Accessibility States `[CONFIRMED VORGABE / TODO WERTE]`

- [ ] `focus-visible`: Jeder interaktive Zustand muss per Tastatur klar sichtbar fokussierbar sein.
- [ ] Kontrastverhältnisse gemäß WCAG AA (mindestens 4.5:1 für Fließtext, 3:1 für große Headlines).

---

## 12. Media & Image Treatment `[TODO]`

- [ ] Feste Seitenverhältnisse (16:9, 4:3, 1:1, Panorama)
- [ ] Bildkanten, Abrundungen oder feine Einfassungen
- [ ] Hover-Verhalten bei Projektkacheln
