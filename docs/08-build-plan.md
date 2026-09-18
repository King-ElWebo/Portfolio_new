# Technical Build Plan

> **Status**: PAUSED / GEPLANT  
> **Zweck**: Konkrete Schritt-für-Schritt-Anleitung zur technischen Implementierung des Portfolios.  
> **Source of Truth**: Technische Umsetzung

---

## 🛑 Wichtiger Hinweis zum aktuellen Planungsstand

Ein konkreter technischer Build-Plan wird **noch nicht** formuliert.

Gemäß unserer Projektstrategie wird der Implementierungsplan erst dann aufgesetzt, wenn folgende Fundamente finalisiert oder ausreichend präzisiert wurden:

1. [ ] **Content Inventory** ([`docs/01-content-inventory.md`](01-content-inventory.md)): Reale Projekttexte, Metadaten und Assets sind erfasst.
2. [ ] **Inspiration & Benchmarks** ([`docs/03-inspiration.md`](03-inspiration.md)): Wichtige Interaktions- und Designmuster sind analysiert.
3. [ ] **Art Direction** ([`docs/04-art-direction.md`](04-art-direction.md)): Schriftarten, Farbharmonien und Texturen sind entschieden.
4. [ ] **Design System** ([`docs/05-design-system.md`](05-design-system.md)): Tokens (Colors, Typography, Spacing) sind verbindlich festgelegt.
5. [ ] **Motion Language** ([`docs/06-motion-language.md`](06-motion-language.md)): Scroll-, Transition- und Performance-Strategien sind geklärt.

---

## 📋 Vorgesehene spätere Phasen (Vorschau)

Sobald die Konzeption freigegeben ist, gliedert sich die technische Umsetzung in:

- **Phase 1: Initialisierung & Tooling**
  - Next.js Projekt direkt im Root initialisieren
  - TypeScript, Tailwind CSS, Linting & Formatting aufsetzen
  - Fonts & Asset-Pipeline einbinden
- **Phase 2: Core Architecture & Layout Shell**
  - App Router Setup (`/`, `/work`, `/work/[slug]`, `/contact`)
  - Navigation, Footer, Farbsystem (Cinematic Dark ↔ Warm Editorial)
- **Phase 3: Content Layer**
  - Typisierte Projekt- und Inhaltsmodelle (Markdown / MDX oder lokale JSON/TS-Files)
  - Asset-Optimierung (Next.js Image / Video)
- **Phase 4: Motion & Interaction Layer**
  - Smooth Scrolling (Lenis) & Scroll-Triggering (GSAP)
  - Section Transitions (Dark ↔ Cream)
  - Accessible Reduced-Motion Fallbacks
- **Phase 5: Quality Assurance & Launch Preparation**
  - Performance-Audit (Lighthouse 95+), SEO, Open Graph Tags
  - Responsive Feinschliff auf realen Mobilgeräten
  - Deployment auf Vercel
