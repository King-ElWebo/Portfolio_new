# Design System & Tokens

> **Zweck**: Systematische Dokumentation aller visuellen Tokens, typografischen Skalen und UI-Komponenten.  
> **Hinweis**: Noch keine konkreten Werte festlegen; Abschnitte vorbereiten und als TODO kennzeichnen.  
> **Source of Truth**: Design Tokens & Komponenten

---

## 1. Colors (Farbpalette)

*Konkrete Hex-/OKLCH-Werte werden nach Freigabe der Art Direction definiert.*

### Cinematic Dark Palette
- [ ] **TODO**: Primary Dark Background (z. B. Deep Warm Charcoal)
- [ ] **TODO**: Secondary Dark Surface (Karten, Modals, Layering)
- [ ] **TODO**: Dark Border / Divider
- [ ] **TODO**: Dark Mode Text Primary (z. B. Off-White)
- [ ] **TODO**: Dark Mode Text Muted / Secondary

### Warm Editorial Palette
- [ ] **TODO**: Primary Cream Background (z. B. Warm Linen / Bone)
- [ ] **TODO**: Secondary Light Surface (Karten, hervorgehobene Bereiche)
- [ ] **TODO**: Light Border / Divider
- [ ] **TODO**: Light Mode Text Primary (z. B. Deep Ink / Soft Black)
- [ ] **TODO**: Light Mode Text Muted / Secondary

### Accent & Feedback
- [ ] **TODO**: Accent Color (falls erforderlich, z. B. Warm Amber, Terracotta oder zurückhaltendes Monochrom)
- [ ] **TODO**: Status Indicators (Verfügbarkeit / Live-Projekt: Grüner / neutraler Pulse-Indikator)

---

## 2. Typography

*Schriftfamilien, Skalen und Rhythmus werden nach Tests in Figma und im Browser festgelegt.*

- [ ] **TODO**: Font Families
  - Display / Headline: *TBD*
  - Body / Editorial: *TBD*
  - Monospace / Meta: *TBD*
- [ ] **TODO**: Type Scale (Fluid Typography mit clamp())
  - Display XXL (Hero-Headlines)
  - H1, H2, H3, H4
  - Body Large, Body Default, Body Small
  - Caption / Label / Overline
- [ ] **TODO**: Font Weights & Line Heights
- [ ] **TODO**: Letter Spacing (Tracking) für Großbuchstaben und Headlines

---

## 3. Grid & Layout

- [ ] **TODO**: Max-Container Width (z. B. 1280px, 1440px oder 1600px für cineastische Medien)
- [ ] **TODO**: Spalten-Raster (z. B. 12-Column Grid mit flexiblen Sub-Grids)
- [ ] **TODO**: Gutters & Screen Margins (Responsive Padding)

---

## 4. Spacing Scale

*Hierarchisches Abstandsmodell für Rhythmus und Weißraum.*

- [ ] **TODO**: Spacing Scale definieren (z. B. 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px, 192px)
- [ ] **TODO**: Section Spacing (Großzügige vertikale Abstände zwischen den Haupt-Acts)

---

## 5. Radius (Eckenabrundung)

- [ ] **TODO**: Eckenradien definieren (z. B. subtil abgerundet 2px/4px oder markant eckig 0px passend zum Editorial-Stil)
- [ ] **TODO**: Button Radius vs. Card Radius

---

## 6. Buttons

- [ ] **TODO**: Primary Button (Dunkel / Hell abgestimmt auf den jeweiligen Act)
- [ ] **TODO**: Secondary / Outline Button
- [ ] **TODO**: Text / Arrow Link Button
- [ ] **TODO**: Button States (Default, Hover, Focus-Visible, Active, Disabled)

---

## 7. Links & Navigation

- [ ] **TODO**: Inline Text Links (Unterstreichung, Hover-Effekt, Übergang)
- [ ] **TODO**: Navigation Links (Aktiver Zustand, Hover-Indikator)
- [ ] **TODO**: External Links (Icon-Indikator, Barrierefreiheit)

---

## 8. Image Treatment

- [ ] **TODO**: Seitenverhältnisse (Aspect Ratios: 16:9, 4:3, 1:1, Cinema 21:9)
- [ ] **TODO**: Bildränder & Maskierungen
- [ ] **TODO**: Hover-Interaktionen auf Projektbildern (z. B. sanfter Zoom, Shifting, Helligkeitsänderung)
- [ ] **TODO**: Lade- und Blur-Up-Strategien für Next.js Image

---

## 9. Responsive Principles

- [ ] **TODO**: Breakpoints definieren (z. B. Mobile: < 640px, Tablet: 640–1024px, Desktop: > 1024px, Ultrawide: > 1600px)
- [ ] **TODO**: Touch-Targets (Mindestgröße 44×44px für mobile Bedienbarkeit)
- [ ] **TODO**: Umgang mit komplexen Scroll-Animationen auf Touchscreens (Fallback-Strategie)
