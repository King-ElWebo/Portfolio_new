# Product

<!-- impeccable:product-schema 1 -->

> **Note for Impeccable**: This document is a product-context adapter for Impeccable. The canonical Source of Truth for all requirements and decisions remains in [`/docs`](docs/) and [`/AGENTS.md`](AGENTS.md).

## Platform & Product Scope `[CONFIRMED]`

- **Platform**: Web (Multi-Page Portfolio Application)
- **Scope**: The product is a **multi-page portfolio**, not a single-page site. The current homepage design provides the visual baseline, not the completed application.
- **Core Route Architecture**:
  - **Homepage**: `/de`, `/en` (Cinematic Dark × Warm Editorial, 3-Act narrative, signature bridge, selected work, capabilities, practitioner, collaboration, lab, contact, footer)
  - **Work Archive**: `/de/work`, `/en/work` (Dedicated standalone work overview, client work & independent concepts, category filtering, case-study links)
  - **Case Studies**: `/de/work/:slug`, `/en/work/:slug` (Deep-dive project presentations following `docs/07-project-template.md`)
  - **Dedicated Contact**: `/de/contact`, `/en/contact` (Focused inquiry page, direct email, network links, accessible form)
  - **Legal Routes**: `/de/impressum` / `/en/imprint`, `/de/datenschutz` / `/en/privacy` (Statutory legal pages, no invented claims)
  - **About & Lab**: Homepage sections and integrated project filters; no forced standalone pages unless decided later.

## Stack `[CONFIRMED]`

- **Framework `[CONFIRMED]`**: React Router v8 + Vite + Cloudflare Workers (`DEC-014`). Superseded Next.js candidate (`DEC-R08`).
- **Hosting / Deployment Target `[CONFIRMED]`**: Cloudflare Workers via `@cloudflare/vite-plugin`. SSR in `workers/app.ts`. No Vercel-specific dependencies.
- **Database Target `[CONFIRMED]`**: Neon PostgreSQL (serverless, server-side access only; currently unprovisioned/unconnected, static/local content first).
- **Status**: Framework initialized; Homepage D3.1 visual baseline implemented; Multi-page architecture and content system in progress.

## Visual Design Baseline & Signature Elements `[CONFIRMED]`

- **Approved Visual Baseline**: **D3.1 — Visual Polish** (Stitch Project `9864955914556862585`, Screen `projects/9864955914556862585/screens/6ee11b79164049f5885ec647cf18a32a`).
- **Hero Particle Portrait**: Interactive 3D Point-Cloud Bust (Three.js + custom GLSL shaders). Status: **PAUSED — awaiting decision on personalized facial geometry**. Foundation preserved; development frozen until authentic geometry is decided.

## Users `[CONFIRMED]`

Primary audience:
- potential clients
- companies
- agencies
- teams that may need external design/development support

The portfolio is intentionally not positioned around one fixed industry or a narrowly defined persona. Product positioning is driven by capability, quality, and end-to-end execution rather than industry specialization. Potential project contexts (e.g. local businesses, practices, e-commerce, or editorial brands) serve purely as illustrative project examples, not as strategic positioning boundaries.

## Product Purpose `[CONFIRMED]`

- High-end personal proof-of-work and trust platform for a **Digital Designer & Software Developer**.
- Core takeaway: *"Der kann komplette digitale Produkte gestalten und entwickeln."* (Can conceptualize, design, and engineer complete digital products).
- Calm, self-confident, and credible; deliberately **not** an aggressive sales-funnel site.
- Must support: small local clients, mid-to-large bespoke projects, agency partnerships, external team augmentation, and technical/creative role applications.

## Positioning `[CONFIRMED]`

- **Design + Development in One Person**: Seamless bridge from idea, UX, and visual craft to clean, performant engineering.
- **Flexibility**: Can deliver complete projects end-to-end or join existing teams for targeted specialized areas.
- **Primary Service Pillars `[WORKING DIRECTION]`**:
  1. Websites & Commerce
  2. Apps & Business Systems
  3. AI & Automation
- **Excluded / Rejected `[REJECTED]`**: Not a "Webdesigner", not primarily a "Freelancer", not a pure "Webagentur", not a pure "Frontend Developer". No active advertising of pure WordPress setups or logo-only gigs.

## Operating Context `[CONFIRMED]`

- Visited in desktop and mobile web browsers, primarily after an introduction, recommendation, or direct link.
- **Visitor Objectives**:
  - create a strong first impression
  - provide credible proof through work
  - communicate the person and capabilities behind the work
  - build enough trust for a potential client, company, or collaborator to make contact  
- **Contact Flow `[CONFIRMED]`**: Straightforward and respectful (Name, Email, Message, Submit inquiry, direct email, LinkedIn). No discovery-call booking funnels, no budget prequalifying.

## Capabilities and Constraints `[CONFIRMED]`

- **Internationalization (i18n)**: Fully bilingual (DE + EN) with browser locale detection on first visit and persistent manual switcher. Locale routes (`/de`, `/en`).
- **Architecture**: Single application first; no premature backend split.
- **Security**: Database access strictly server-side; no credentials exposed client-side.
- **Performance**: Performance is a technical quality requirement. Motion must never compromise usability or Core Web Vitals.
- **Accessibility**: Static-first design. Full reduced motion support (`@media (prefers-reduced-motion: reduce)`) is mandatory.
- **Content Honesty**: Strict ban on invented metrics, fake client logos, fabricated KPIs, or synthetic testimonials. Independent concepts must be explicitly labeled as concepts.

## Brand Commitments `[CONFIRMED]`

- **Creative Direction**: *Cinematic Dark × Warm Editorial*.
  - *Cinematic Dark*: Focus, drama, depth, project showcase.
  - *Warm Editorial*: Human warmth, typography, quiet reading rhythm, trust.
- **Aesthetic Anti-Patterns `[REJECTED]`**: No generic AI/SaaS aesthetics (purple gradients, generic templates), no pointless Bento grids, no skill percentage bars, no decorative gradient orbs, no glassmorphism for its own sake.
- **Demo / Working Copy `[WORKING DIRECTION]`**:
  - Hero: *"FROM IDEA TO DIGITAL EXPERIENCE."*
  - Subline: *"Designing thoughtful digital interfaces and engineering robust software systems from concept to production."*
  - Statement: *"I care about how things work just as much as how they look."*

## Evidence on Hand & Content Strategy `[IN PROGRESS]`

Transitioning from visual demo placeholders toward verified, truthful portfolio content. Real project experience and client work exist (candidate pool established in `docs/01-content-inventory.md`), but case-study texts and evidence population require explicit confirmation before final publication. Independent concepts must be transparently labeled. No metrics or client facts may be invented.

## Product Principles `[CONFIRMED]`

1. **Craft Over Noise**: Quiet authority, meticulous layout, and precision beat aggressive conversion tactics.
2. **End-to-End Integrity**: Visual elegance and engineering discipline are treated with equal rigor.
3. **Static Distinction**: The design must look complete, balanced, and compelling before any animation or script runs.
4. **Radical Honesty**: Transparency regarding role, results, and concept works builds long-term trust.

## Accessibility & Inclusion `[CONFIRMED]`

- Target standard: WCAG 2.2 AA.
- Full keyboard operability, visible focus indicators (`focus-visible`), semantic HTML, high text contrast, accessible form labels, and graceful motion fallbacks.
