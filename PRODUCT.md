# Product

<!-- impeccable:product-schema 1 -->

> **Note for Impeccable**: This document is a product-context adapter for Impeccable. The canonical Source of Truth for all requirements and decisions remains in [`/docs`](docs/) and [`/AGENTS.md`](AGENTS.md).

## Platform

web

## Stack `[WORKING DIRECTION / NOT FINALIZED]`

- **Framework**: Candidate under evaluation is Next.js (App Router). Alternative candidates: Astro, Remix. Final selection deferred until after design exploration and Cloudflare runtime verification.
- **Hosting / Deployment Target `[CONFIRMED]`**: Cloudflare (Pages / Workers / OpenNext). No Vercel-specific dependencies.
- **Database Target `[CONFIRMED]`**: Neon PostgreSQL (serverless, server-side access only).
- **Status**: Greenfield planning phase. No packages installed, no app scaffold initialized yet.

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
  *(Note: Detailed homepage dramaturgy and section progression remain a `[WORKING DIRECTION]` in `docs/02-site-architecture.md` and will be tested during design exploration).*
- **Contact Flow `[CONFIRMED]`**: Straightforward and respectful (Name, Email, Message, Submit inquiry, direct email, LinkedIn). No discovery-call booking funnels, no budget prequalifying.

## Capabilities and Constraints `[CONFIRMED]`

- **Internationalization (i18n)**: Fully bilingual (DE + EN) with browser locale detection on first visit and persistent manual switcher. Locale-aware URLs (`/de`, `/en`) are `[WORKING DIRECTION]`.
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
  - Subline: *"I design and build digital products — from websites and shops to custom software, business systems and AI integrations."*
  - Statement: *"I'm [Name], a digital designer and software developer based in Austria. I like turning complex ideas into digital products that feel simple, useful and considered."*

## Evidence on Hand `[DEFERRED]`

Real client work and substantial project experience already exist, but detailed project selection, case-study content, and evidence population are intentionally deferred until after design exploration. No names, metrics, results, or project details are fabricated or assumed prior to explicit user input.

## Product Principles `[CONFIRMED]`

1. **Craft Over Noise**: Quiet authority, meticulous layout, and precision beat aggressive conversion tactics.
2. **End-to-End Integrity**: Visual elegance and engineering discipline are treated with equal rigor.
3. **Static Distinction**: The design must look complete, balanced, and compelling before any animation or script runs.
4. **Radical Honesty**: Transparency regarding role, results, and concept works builds long-term trust.

## Accessibility & Inclusion `[CONFIRMED]`

- Target standard: WCAG 2.2 AA.
- Full keyboard operability, visible focus indicators (`focus-visible`), semantic HTML, high text contrast, accessible form labels, and graceful motion fallbacks.
