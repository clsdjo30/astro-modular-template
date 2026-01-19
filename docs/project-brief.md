# Project Brief: Astro Modular Template (Internal)

## Executive Summary
A reusable Astro + TypeScript GitHub template that lets me (a solo freelancer) spin up production-ready client sites in minutes using preset-first CLI flags and modular, isolated features. It removes repetitive setup, enforces a consistent quality baseline, and keeps outputs minimal and framework-agnostic, with an explicit separation between static sites and backend-enabled presets for dynamic use cases.

Internal value / productivity gains:
- Faster project bootstrapping (minutes, not hours)
- Consistent structure and quality across client work
- Lower cognitive load via preset-first, opinionated defaults
- Easy scaling from minimal sites to backend-enabled builds without overengineering

## Problem Statement
As a solo freelancer, I repeatedly rebuild the same Astro project foundations for client sites—vitrine pages, blog setups, SEO wiring, forms, and deployment presets. This causes wasted time, inconsistent quality baselines, and cognitive overhead each time a new project starts. Existing Astro starters are either too generic (requiring manual wiring) or too opinionated (dragging in unnecessary dependencies and frameworks). There’s no internal, repeatable way to compose only the needed capabilities while keeping outputs clean, minimal, and ready for production.

The problem is urgent now because I want a reliable, fast path to ship client projects in minutes, while Astro evolves and client needs vary between static marketing sites and backend-enabled features.

## Proposed Solution
Create an internal, reusable GitHub template for Astro + TypeScript that is preset-first and module-based. A lightweight CLI composes a new project from explicit presets and optional modules, generating only the selected features so the output stays minimal and framework-agnostic. The system defines clear module boundaries, typed centralized configuration, and a strict static vs backend-enabled split, enabling fast creation of static marketing sites while supporting an explicit hybrid path for dynamic features (e.g., reservations) without dragging backend complexity into static projects.

Key differentiators for the internal workflow:
- Preset-first UX that maps to common client types (vitrine, blog, reservation/commerce).
- Clean outputs with no unused code or dependencies.
- Opinionated, production-ready baseline (lint/typecheck/build/astro check).
- Clear conventions and documentation generated from module manifests to prevent drift.

## Target Users
### Primary User Segment: Solo Freelancer (you)
Solo web freelancer who builds small-to-medium client sites, prefers Astro + TypeScript, and values speed, simplicity, and performance. Workflow is project-based with frequent repetition of similar site types (vitrine, blog, restaurant/commerce). Pain points include repetitive setup, inconsistent quality baselines across projects, and cognitive load when reassembling SEO, forms, and deployment wiring. Goals are to launch client sites quickly, maintain a consistent architecture, and keep outputs minimal and framework-agnostic.

## Goals & Success Metrics
### Business Objectives (internal)
- Reduce new client project bootstrap time to under 10 minutes for vitrine/blog presets.
- Achieve a consistent quality baseline across projects (lint/typecheck/build pass on first run).
- Minimize manual wiring by capturing 80% of recurring setup tasks in presets/modules.

### User Success Metrics
- Time-to-first-local-build from template creation (target: <10 minutes).
- Number of manual edits required before first deploy (target: <5 core edits).
- Reduction in setup checklist items compared to current workflow (target: 50% fewer).

### Key Performance Indicators (KPIs)
- Bootstrap time: median <10 minutes from `create` to running dev server.
- First-pass CI success rate: 90%+ for generated projects without manual fixes.
- Preset coverage: 3 presets (vitrine/blog/restaurant-commerce) available with documented module lists.

## MVP Scope
### Core Features (Must Have)
- **Preset-first CLI (create + add + limited remove):** Generate projects from explicit presets/flags; include a controlled remove/update path for owned files and patch points.
- **Static + Hybrid delivery modes:** Static SSG default; hybrid/SSR for backend-enabled presets/modules.
- **Module boundaries & clean outputs:** Selected modules only; no unused code/deps.
- **Core presets:** `vitrine` and `blog` (static) plus restaurant/commerce preset(s).
- **Typed centralized config:** Single config with `modules.<name>` namespaces and strict env wrapper.
- **Quality baseline:** Lint + typecheck + build + `astro check` runnable in CI from day one.
- **Docs synced to manifests:** Module catalog and enable/disable guide generated from module metadata.
- **Restaurant business modules (v1):** Products/catalog, cart, and checkout flow (opinionated, minimal, backend-enabled if required).

### Out of Scope for MVP
- Arbitrary module combinations beyond defined presets.
- Multi-host deployment matrix (support one SSR target + static).
- Advanced lifecycle (full upgrade/rollback/doctor).
- Complex commerce (multi-currency, advanced inventory, subscriptions, tax automation).
- Deep CMS-admin workflows beyond content/media.

### MVP Success Criteria
MVP is successful when I can generate vitrine/blog/restaurant projects in under 10 minutes, run a clean build, and deliver a full product → cart → checkout flow with minimal configuration and no manual wiring beyond content/config edits; docs remain in sync with CLI/module manifests.

## Post-MVP Vision
### Phase 2 Features
- Full lifecycle CLI (upgrade, rollback, doctor) with safe ownership tracking.
- Expanded hosting presets including o2switch for static + Node.js SSR/hybrid, plus Cloudflare/Netlify.
- CMS connectors for content and media management (content-only).
- Advanced commerce features (payments integration, inventory, tax, webhooks).

### Long-term Vision (12-24 months)
A stable internal template ecosystem where modules evolve independently but remain compatible, the CLI safely manages updates, and presets cover the majority of client use cases with minimal manual wiring—across both cloud-native and shared/semi-managed hosting environments.

### Expansion Opportunities
- First-class self-hosted deployment path (o2switch Node.js SSR + static), reducing platform dependency.
- Automated documentation and changelog generation from module manifests.
- Optional performance and accessibility budgets in CI.

## Technical Considerations
### Platform Requirements
- **Target Platforms:** Static hosting for SSG outputs; Node.js SSR/hybrid hosting for backend-enabled presets.
- **Browser/OS Support:** Modern evergreen browsers; no legacy IE support.
- **Performance Requirements:** Minimal JS by default; fast LCP/CLS for marketing pages; image optimization and sensible preload strategy.

### Technology Preferences
- **Frontend:** Astro + TypeScript; framework-agnostic by default (no React/Vue/etc. unless explicitly enabled).
- **Backend:** Optional and explicit; backend-enabled presets use a chosen provider (self-hosted Node) with Astro SSR.
- **Database:** Only when backend-enabled; abstracted behind service layer; no DB drivers in static presets.
- **Hosting/Infrastructure:** Static default; Node.js SSR target for dynamic presets; long-term compatibility with self-hosted/shared hosting (o2switch) plus one cloud SSR target.

### Architecture Considerations
- **Repository Structure:** Prefer `core/` + `extensions/` or `modules/` + manifest layout for clean boundaries and generator-friendly patching.
- **Service Architecture:** Clear split between static frontend and backend-enabled modules; no mixed concerns.
- **Integration Requirements:** CLI-driven module composition; strict env wrapper; module manifests as source of truth for docs.
- **Security/Compliance:** Security headers preset for static; secrets never exposed to client; backend-enabled flows must separate public vs server config.

## Constraints & Assumptions
### Constraints
- **Budget:** Internal time investment only; no paid licensing or external vendor lock-in required.
- **Timeline:** v1 should be shippable quickly; defer heavy automation (full lifecycle CLI) to v2 where possible.
- **Resources:** Single developer; maintenance should be low-friction.
- **Technical:** Astro + TypeScript only; framework-agnostic by default; static-first; backend-enabled modules must never leak into static presets; CLI must stay predictable and explicit.

### Key Assumptions
- You will reuse this template across multiple client projects and evolve it over time.
- Preset-first UX will cover most use cases; arbitrary combinations are less important in v1.
- A limited remove/update path is sufficient for v1 as long as it’s safe and bounded.
- Restaurant commerce workflows are stable enough to standardize in v1 (product → cart → checkout).
- Documentation can be generated from manifests to avoid drift.

## Risks & Open Questions
### Key Risks
- **CLI complexity creep:** Building robust remove/update too early could slow v1 delivery.
- **Module boundary drift:** Poorly enforced boundaries could cause coupling and dead code.
- **Commerce scope creep:** Restaurant workflows may expand into payments, inventory, tax, and webhooks beyond v1.
- **Patching fragility:** File-based edits may break if generated code is heavily modified.
- **Hosting fragmentation:** Supporting too many deployment targets can increase maintenance burden.

### Decisions (Closed)
- **Backend default:** Self-hosted Node.js backend with MariaDB or PostgreSQL on o2switch.
- **Authentication:** Internal auth module (email/password + sessions/JWT); no external auth providers in v1.
- **CMS approach:** No paid SaaS CMS; content via filesystem-based collections or optional self-hosted admin layer.

### Open Questions (Remaining)
- Which database should be the recommended default in v1: MariaDB or PostgreSQL?
- What level of abstraction should the internal auth module provide (minimal vs extensible)?
- Minimal commerce scope in v1: catalog + cart + checkout without payments, or minimal Stripe-only checkout?

### Areas Needing Further Research
- Patch-point design that stays robust under manual edits.
- Module manifest schema and validation rules.
- Self-hosted admin layer feasibility (if any) and maintenance footprint.

## Appendices
### A. Research Summary
Not applicable (no external research beyond brainstorming session).

### B. Stakeholder Input
Not applicable (internal project).

### C. References
- `docs/brainstorming-session-results.md`

## Next Steps
### Immediate Actions
1. Confirm the project name for documentation and CLI branding.
2. Decide the repository layout (`core/` + `extensions/` vs `modules/` + manifest) and patch-point conventions.
3. Define the module manifest schema (deps, config keys, patch points, ownership) and generate docs from it.
4. Finalize v1 preset matrix and module list (vitrine, blog, restaurant/commerce).
5. Decide the database default (MariaDB vs PostgreSQL) and auth abstraction level (minimal vs extensible).
6. Define minimal commerce scope (catalog + cart + checkout, payments optional vs Stripe-only).

### PM Handoff
This Project Brief provides the full context for Astro Modular Template (Internal). Please start in 'PRD Generation Mode', review the brief thoroughly to work with the user to create the PRD section by section as the template indicates, asking for any necessary clarification or suggesting improvements.
