# Operating Rules for AI Agents (AGENTS.md)

## Project
Personal portfolio of a **Digital Designer & Software Developer**.  
Primary function: Proof-of-work and trust platform demonstrating end-to-end design and engineering excellence without aggressive sales mechanisms.

---

## Source of Truth Hierarchy
Before starting substantial work, read the relevant documentation in `/docs`. Resolve priorities strictly in this order:

1. **Explicit current user request**
2. **`docs/13-decision-log.md`** (Recorded decisions, working directions, and rejections)
3. **`docs/09-technical-architecture.md`** (System architecture and platform principles)
4. **`docs/10-engineering-standards.md`** (Code conventions, quality gates, security)
5. **`docs/11-agent-workflow.md`** (Agent roles, skill orchestration, tooling rules)
6. **Remaining relevant `/docs`** (`00-creative-brief`, `02-site-architecture`, `05-design-system`, etc.)
7. **Agent judgement** ONLY for small, reversible, low-impact implementation details.

---

## Decision Policy
- **Never invent** architectural, product, content, or design decisions when the repository does not define them.
- If a decision materially affects:
  - Architecture or Framework
  - Dependencies or Package additions
  - Routing or Internationalization
  - UX or Information architecture
  - Data model or Schema
  - Database access or Infrastructure
  - Security or Secrets
  - Project directory structure
  - Design system tokens or Typography
- **Then you must**:
  1. Inspect the relevant files in `/docs`.
  2. Use an appropriate installed skill if helpful.
  3. Present clear options and trade-offs to the user if unresolved.
  4. **Never silently convert assumptions, working directions, or placeholders into confirmed standards.**

---

## Implementation Policy
- **Do not implement code** unless the user task explicitly requests implementation.
- **Planning task != coding task.**
- **Design exploration != production implementation.**
- Do not create premature application folders (`app/`, `src/`, `components/`) before the framework is chosen and initialized.

---

## Dependency Policy
- **No unnecessary dependencies.**
- Check native framework/platform capabilities first.
- **No overlapping libraries** (e.g. do not install two animation, state, or styling libraries for the same job).
- Any architectural dependency requires explicit user approval.

---

## Architecture Principles
- **Single application first.** Do not split into separate frontend and backend services without concrete necessity.
- **Deployment target: Cloudflare** (Workers / Pages / OpenNext).
- **Database target: Neon PostgreSQL** (Serverless, server-side access only).
- **Framework: Currently NOT finalized** (Next.js is a strong candidate, but subject to verification).
- **No Vercel assumptions**: Do not introduce Vercel-specific runtime dependencies or configuration.

---

## Code Quality
- Follow all conventions in **`docs/10-engineering-standards.md`**.
- TypeScript strict mode, server-first rendering, no `any`, semantic HTML, accessible focus states.
- Clean code over clever code.

---

## Design & Aesthetics
- Follow the confirmed creative direction: **Cinematic Dark × Warm Editorial**.
- Static design must look complete without animations.
- **Strictly rejected**: Generic AI/SaaS aesthetics (purple gradients, generic templates), pointless Bento grids, skill percentage bars, decorative gradient orbs.

---

## Content Honesty & Integrity
**Never invent**:
- Customers or company names
- Testimonials or quotes
- Metrics, KPIs, or conversion rates
- Awards, credentials, or certifications
- Work experience roles or dates

Independent concepts must be labeled transparently as concepts. Client work must contain only verifiable facts.

---

## Internationalization (i18n)
- **DE + EN** is a confirmed hard requirement.
- Browser locale detection on first visit, persistent manual language switcher.

---

## Completion & Verification
- **Do not claim done until verification is complete.**
- Verify against file existence, links, conventions, and git status before finishing any turn.
