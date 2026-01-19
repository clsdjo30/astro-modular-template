# Astro Modular Template (Internal) Product Requirements Document (PRD)

## Goals and Background Context

### Goals
- Produce a preset-first Astro template + CLI that generates clean, minimal projects in minutes.
- Maintain strict module boundaries so selected features add no dead code or unused deps.
- Support static-first outputs with an explicit hybrid/SSR path for backend-enabled presets.
- Provide a complete internal baseline for freelancer reuse, including restaurant commerce flows.
- Keep the template framework-agnostic and production-ready by default (lint/typecheck/build).

### Background Context
This is an internal productivity foundation for a solo freelancer repeatedly building similar Astro sites. Current workflows involve re-wiring SEO, content, forms, and deployment for each client, causing time loss and inconsistency. Existing starters are either too generic or too opinionated, so the solution must generate minimal outputs while still supporting more complex, backend-enabled features when explicitly selected.

### Change Log
| Date | Version | Description | Author |
| --- | --- | --- | --- |
| 2026-01-16 | v0.1 | Initial PRD draft from project brief | John (PM) |

## Requirements

### Functional Requirements
- FR1: The CLI must generate a new Astro + TypeScript project from explicit presets/flags (e.g., vitrine, blog, restaurant/commerce).
- FR2: The CLI must support adding modules after creation via a safe, idempotent add command.
- FR3: The CLI must support a limited remove/update path for module-owned files and explicit patch-point insertions only; full rollback/graph resolution is out of scope for v1.
- FR4: Generated projects must include only the selected modules with no unused code or dependencies.
- FR5: The template must support two modes: static SSG default and hybrid/SSR for backend-enabled presets.
- FR6: The system must enforce strict module boundaries (no direct module-to-module imports except through shared/core).
- FR7: The base template must include a typed, centralized config with modules.<name> namespaces.
- FR8: Environment variables must be accessed only via a typed wrapper; secrets never exposed to client.
- FR9: Presets must include vitrine, blog, and restaurant/commerce in v1.
- FR10: The restaurant/commerce preset must include product catalog, product pages, cart, and checkout flow.
- FR11: The backend for commerce/reservations must be self-hosted Node.js with MariaDB as default and PostgreSQL supported.
- FR12: The internal auth module must be minimal in v1 (email/password + sessions/JWT) and designed to allow optional OAuth providers later without refactoring core flows.
- FR13: Static presets must never include backend/runtime dependencies.
- FR14: Documentation must be generated from module manifests (module catalog + enable/disable guide).
- FR15: The template must include CI scripts for lint, typecheck, build, and astro check.
- FR16: The module system must allow configuration overrides per module without editing core files.
- FR17: The template must remain framework-agnostic by default (no JS framework required).

### Non-Functional Requirements
- NFR1: New project bootstrap time should be under 10 minutes for vitrine/blog presets.
- NFR2: Minimal JS by default; static pages optimized for LCP/CLS and image handling.
- NFR3: Generated projects should pass lint/typecheck/build on first run in CI.
- NFR4: The CLI behavior must be explicit and predictable; no "magic" side effects.
- NFR5: Module boundaries must be maintainable and testable with lightweight CI checks.
- NFR6: The system must avoid paid SaaS dependencies for CMS/auth/database.
- NFR7: Compatibility with o2switch hosting for Node.js SSR/hybrid must be supported long-term.
- NFR8: Documentation must stay in sync with manifests to avoid drift.
- NFR9: Auth must use secure password hashing, protected session/JWT handling, and role-based access controls.
- NFR10: The API must include basic rate limiting and input validation for auth and checkout endpoints.
- NFR11: Orders and user data must be stored securely with regular backups documented for self-hosted DBs.
- NFR12: Backend errors must be logged with actionable context; user-facing errors must be safe and minimal.

## Data Model & API Contract (v1)

### Core Entities (Minimum)
- User: id, email, password_hash, role_id, created_at
- Role: id, name (admin, customer)
- Session (if session-based): id, user_id, expires_at, data (for cart)
- Product: id, name, description, price, image_url, is_active
- Order: id, user_id (nullable for guest), total, status, created_at
- OrderItem: id, order_id, product_id, quantity, unit_price

### Notes
- Cart is stored server-side in session (not persisted as a DB entity in v1).
- Product categories/tags are optional v1 extensions.
- Default DB in v1 is MariaDB; PostgreSQL remains supported.

### API Endpoints (Minimum)

Auth
- POST /api/auth/register (optional if admin-only creation)
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me

Catalog
- GET /api/products
- GET /api/products/:id

Cart (session-based)
- GET /api/cart
- POST /api/cart/items (add)
- PATCH /api/cart/items/:id (update quantity)
- DELETE /api/cart/items/:id (remove)

Checkout / Orders
- POST /api/orders (create from session cart)
- GET /api/orders (admin only, optional minimal view)
- GET /api/orders/:id (admin only or owner)

Rules
- Auth required for admin endpoints.
- Guest checkout is allowed in v1; admin access requires auth.
- All endpoints return JSON with consistent error shapes.

## MVP Validation Plan
- Success is achieved when vitrine/blog/restaurant presets can be generated in under 10 minutes, pass CI on first run, and the commerce flow completes end-to-end using the API + session cart.
- Collect internal feedback after first two client projects: setup time, manual edits count, and friction points.
- Exit v1 when: bootstrap time target is met, CLI add/remove works for owned files, and the product -> cart -> checkout flow is stable for at least one real client use case.

## User Flows (Minimal)

### CLI Flow: create -> add -> remove
- Run create with a preset to generate a baseline project.
- Add a module to introduce a new capability.
- Remove a module to delete owned files and patch insertions only.

### Frontend Flow: product catalog -> cart -> checkout
- Browse the product catalog and view product details.
- Add items to cart, review totals, and adjust quantities.
- Submit checkout to create an order.

## User Interface Design Goals

### Overall UX Vision
- CLI-first, preset-driven flow with minimal prompts and explicit, predictable outputs.
- Generated code is easy to read and modify manually; no hidden magic.

### Key Interaction Paradigms
- Plain prompt-based CLI wizard for create with flags.
- add and remove with clear ownership warnings; no TUI.

### Core Screens and Views
- CLI onboarding/selection flow
- Preset/module list and help output
- Generated project README (quickstart + module list)
- Vitrine and blog pages (frontend output)
- Restaurant catalog, cart, and checkout pages (frontend output)

### Accessibility
- WCAG AA

### Branding
- Neutral/minimal defaults; no branded theme.

### Target Device and Platforms
- Web Responsive

## Technical Assumptions

### Repository Structure: Monorepo
A single repo containing CLI, module manifests, and base templates keeps the internal tool cohesive and easier to evolve; avoids multi-repo overhead.

### Service Architecture
Monolith with an optional self-hosted JSON API service for backend-enabled presets; static presets are frontend-only.

### Testing Requirements
- Unit + Integration

### Additional Technical Assumptions and Requests
- Astro + TypeScript only; framework-agnostic by default.
- Self-hosted Node.js JSON API backend on o2switch for backend-enabled presets.
- Database: MariaDB (default), PostgreSQL supported.
- Auth: internal email/password + sessions/JWT; OAuth hooks optional later.
- No paid SaaS dependencies for CMS/auth/database.
- CLI is plain prompt-based; no TUI.

## Operational Requirements
- Logging: API logs for auth, checkout, and order creation with request IDs.
- Monitoring: basic health checks and error log review workflow documented.
- Deployment: static UI and API deployed independently; rollback via previous build artifacts.
- Backups: database backup procedure documented (daily recommended).
- Capacity/Availability: Self-hosted target assumes low-to-moderate traffic; API should handle small-business peak loads with graceful degradation rather than strict SLA guarantees.

## Epic List
- Epic 1: Foundation & Tooling Baseline - Establish repo structure, CLI skeleton, base template, and CI quality baseline.
- Epic 2: Module System & Documentation Pipeline - Define manifests, patch points, ownership rules, and auto-generate docs.
- Epic 3: Static Presets (Vitrine + Blog) - Deliver static presets with core pages, content collections, SEO, and forms.
- Epic 4: Restaurant Commerce Preset (Backend-Enabled) - Deliver self-hosted JSON API, auth, and product -> cart -> checkout flow.
- Epic 5: Hosting & Deployment Presets - Provide static deployment guidance and o2switch API/optional SSR preset.

## Epic 1: Foundation & Tooling Baseline
Establish the repository structure, base Astro template, CLI skeleton, and CI quality baseline so generated projects are consistent, minimal, and build cleanly from day one. This epic delivers a usable canary project and baseline checks.
Dependencies: None (foundational).

### Story 1.1: Repository Structure & Base Template
As a solo freelancer,
I want a base Astro + TypeScript template with a minimal, clean structure,
so that every generated project starts from a predictable foundation.

Acceptance Criteria
1. Base Astro template builds successfully with astro build and astro check.
2. Template includes minimal pages (home + 404) and a neutral layout.
3. No JS framework is required by default.
4. Project structure aligns with chosen repo layout conventions.

### Story 1.2: CLI Skeleton (create + presets)
As a solo freelancer,
I want a CLI that can create a new project from presets,
so that I can bootstrap a project in minutes.

Acceptance Criteria
1. CLI supports create with preset flags (vitrine, blog, restaurant).
2. CLI uses plain prompt-based input when flags are not provided.
3. Generated project includes only baseline files for the selected preset.
4. CLI outputs a clear summary of generated modules and next steps.

### Story 1.3: CI Quality Baseline
As a solo freelancer,
I want baseline quality checks wired into the template,
so that new projects fail fast when misconfigured.

Acceptance Criteria
1. CI scripts include lint, typecheck, astro check, and build.
2. CI passes on a freshly generated project without manual edits.
3. Lint and formatting config are present and runnable locally.

### Story 1.4: Minimal Config & Env Wrapper
As a solo freelancer,
I want a typed config and env wrapper in the base template,
so that configuration is centralized and safe.

Acceptance Criteria
1. Base template includes app.config with typed structure.
2. Environment access is routed through a single wrapper module.
3. No direct process.env/import.meta.env usage outside the wrapper.

## Epic 2: Module System & Documentation Pipeline
Define the module system (manifests, patch points, ownership rules) and generate documentation from manifests to keep modules discoverable and synchronized. This epic delivers the internal scaffolding needed for reliable add/remove and consistent docs.
Dependencies: Epic 1 complete (base template + CLI skeleton).

### Story 2.1: Module Manifest Schema
As a solo freelancer,
I want a module manifest schema,
so that each module declares its files, dependencies, config keys, and patch points.

Acceptance Criteria
1. Manifest includes module id, description, dependencies, conflicts, and ownership.
2. Manifest lists added files and patch points with insertion rules.
3. Manifest specifies config keys under modules.<name>.

### Story 2.2: Patch-Point Conventions
As a solo freelancer,
I want explicit patch points in base templates,
so that module additions are safe and predictable.

Acceptance Criteria
1. Patch points are clearly marked and documented in core templates.
2. CLI can insert module snippets at patch points deterministically.
3. CLI fails safely if a patch point is missing or modified.

### Story 2.3: Limited Remove (Owned Files Only)
As a solo freelancer,
I want a limited remove capability,
so that I can undo a module by removing only owned files and patch insertions.

Acceptance Criteria
1. CLI remove only deletes files owned by the module manifest.
2. CLI removes only marked patch insertions without affecting manual edits.
3. CLI warns when manual edits are detected in owned files.

### Story 2.4: Docs Generation
As a solo freelancer,
I want module documentation generated from manifests,
so that docs stay in sync with the system.

Acceptance Criteria
1. CLI generates a module catalog (MODULES.md) from manifests.
2. CLI generates an enable/disable guide (CONFIG.md or similar).
3. Generated docs include module dependencies and conflicts.

## Epic 3: Static Presets (Vitrine + Blog)
Deliver the static presets with core pages, content collections, SEO, forms, and minimal neutral UI output so that typical client sites can be generated and shipped quickly without backend dependencies.
Dependencies: Epic 1 and Epic 2 complete (template + module system).

### Story 3.1: Vitrine Preset (Core Pages + Layout)
As a solo freelancer,
I want a vitrine preset with core marketing pages and a neutral layout,
so that I can ship static marketing sites quickly.

Acceptance Criteria
1. Vitrine preset includes Home, About, Services, and Contact pages.
2. Pages use a minimal neutral layout with accessible structure and no branded theme.
3. No JS framework is required by default.
4. Static build succeeds with no backend dependencies.

### Story 3.2: Blog Preset (Content Collections)
As a solo freelancer,
I want a blog preset with content collections,
so that I can publish posts quickly.

Acceptance Criteria
1. Blog preset includes content collections schema for posts.
2. Blog includes list, detail, tag/category, and RSS outputs.
3. Static build succeeds with no backend dependencies.

### Story 3.3: SEO Baseline
As a solo freelancer,
I want SEO utilities and metadata defaults,
so that generated sites are SEO-ready.

Acceptance Criteria
1. Base SEO metadata includes title, description, canonical, OpenGraph, and Twitter cards.
2. Sitemap and robots.txt are generated for static presets.
3. Structured data templates are available for core page types.

### Story 3.4: Forms Module (Static-Friendly)
As a solo freelancer,
I want a contact form module compatible with static hosting,
so that client sites can capture leads without custom backend.

Acceptance Criteria
1. Forms module provides a contact form page and component.
2. Form integration supports at least one provider (configurable).
3. Form submission does not require backend dependencies in static preset.

## Epic 4: Restaurant Commerce Preset (Backend-Enabled)
Deliver a backend-enabled restaurant/commerce preset with a separate self-hosted JSON API (o2switch), internal auth, and the full product -> cart -> checkout flow, while keeping static presets free of backend dependencies and maintaining a clean UI <-> API boundary.
Dependencies: Epic 1 and Epic 2 complete; Epic 3 optional for shared UI patterns.

### Story 4.1: Backend API Service Skeleton (Self-Hosted)
As a solo freelancer,
I want a self-hosted JSON API service wired to the commerce preset,
so that dynamic workflows run separately from the Astro UI.

Acceptance Criteria
1. Commerce preset includes a backend JSON API scaffold compatible with o2switch Node.js hosting.
2. API connects to MariaDB by default, with PostgreSQL supported, via a single data layer.
3. API is included only for backend-enabled presets; Astro remains frontend-only.

### Story 4.2: Internal Auth Module (Minimal, Extensible)
As a solo freelancer,
I want internal auth with email/password and sessions/JWT,
so that access is self-hosted and controllable.

Acceptance Criteria
1. Auth supports email/password login and session or JWT handling.
2. Roles are supported (admin/customer) with endpoint protection.
3. Auth design allows optional OAuth providers later without refactoring core flows.
4. No full back-office admin UI is required in v1 (optional minimal view orders page only).

### Story 4.3: Product Catalog & Product Pages
As a solo freelancer,
I want product catalog data and product pages,
so that restaurants can display offerings consistently.

Acceptance Criteria
1. Catalog supports products with name, price, description, and image.
2. Product list and detail pages render from API data.
3. Data access is encapsulated in a service layer on the frontend.

### Story 4.4: Cart & Checkout Flow
As a solo freelancer,
I want a cart and checkout flow,
so that users can place orders end-to-end.

Acceptance Criteria
1. Cart supports add/remove/update quantity and shows totals.
2. Cart state is stored server-side in session (no DB-persistent cart in v1).
3. Checkout collects customer details and confirms order submission.
4. Flow works without external payment providers in v1 unless explicitly enabled.

### Story 4.5: Order Persistence
As a solo freelancer,
I want orders saved in the database,
so that submissions are reliable and reviewable.

Acceptance Criteria
1. Orders are stored in the database with line items.
2. API provides a simple order creation endpoint.
3. Basic validation prevents empty or invalid orders.

## Epic 5: Hosting & Deployment Presets
Provide static deployment guidance and a first-class o2switch deployment preset (static UI + separate JSON API, with optional SSR), aligned with CI scripts, so generated projects can be deployed reliably without expanding to a broad platform matrix.
Dependencies: Epic 1 complete; Epic 4 required for API deployment guidance.

### Story 5.1: Static Hosting Preset
As a solo freelancer,
I want a static hosting preset,
so that vitrine/blog sites deploy quickly with minimal configuration.

Acceptance Criteria
1. Static preset documents build output and deployment steps.
2. Static projects have no backend/runtime dependencies.
3. CI pipeline validates static build and asset output.

### Story 5.2: o2switch Deployment Preset (Static UI + API, Optional SSR)
As a solo freelancer,
I want an o2switch deployment preset that defaults to a static Astro UI plus a separate Node.js JSON API,
so that backend-enabled projects deploy cleanly without requiring SSR unless explicitly needed.

Acceptance Criteria
1. Preset documents deployment for static Astro UI and separate Node.js JSON API on o2switch.
2. SSR/hybrid mode is optional and documented only when explicitly enabled.
3. Env handling is documented for server/runtime variables for the API (and SSR only if enabled).
4. CI pipeline validates static build and API service independently.

### Story 5.3: Deployment Docs & Handoff
As a solo freelancer,
I want clear deployment documentation,
so that project delivery is repeatable.

Acceptance Criteria
1. Generated README includes a deployment section matching the selected preset.
2. Docs avoid platform sprawl and focus on static + o2switch paths in v1.

## Checklist Results Report

Executive Summary
- Overall PRD completeness: ~86%
- MVP scope appropriateness: Just Right (commerce scope bounded; CLI lifecycle limited)
- Readiness for architecture phase: Ready
- Most critical gaps: user flows/error states and explicit feature dependencies

Category Statuses
| Category | Status | Critical Issues |
| --- | --- | --- |
| 1. Problem Definition & Context | PARTIAL | No quantified impact; no timeframe for goals |
| 2. MVP Scope Definition | PARTIAL | MVP validation approach now defined; learning loop still light |
| 3. User Experience Requirements | PARTIAL | No explicit user flows or error handling expectations |
| 4. Functional Requirements | PARTIAL | Dependencies and priorities not explicit |
| 5. Non-Functional Requirements | PARTIAL | Capacity/availability targets not specified |
| 6. Epic & Story Structure | PARTIAL | Story dependencies not explicitly stated |
| 7. Technical Guidance | PARTIAL | Monitoring/ops now covered; trade-offs not documented |
| 8. Cross-Functional Requirements | PARTIAL | Data model + API defined; integration testing still absent |
| 9. Clarity & Communication | PARTIAL | Stakeholder alignment/approval process not specified |

Top Issues by Priority

BLOCKERS
- None (sufficient to proceed to architecture).

HIGH
- Add minimal user flows and error states (CLI create/add/remove; catalog -> cart -> checkout).
- Note key dependencies between epics/stories (e.g., manifest schema before docs generation).

MEDIUM
- Add capacity/availability targets for the API (basic concurrency/throughput expectations).
- Document integration testing expectations for API + UI.

LOW
- Add goal timeframe and baseline impact if desired.
- Add lightweight trade-off notes (e.g., session cart vs DB cart).

MVP Scope Assessment
- Scope is acceptable for an internal baseline; commerce features are bounded.
- Key complexity risks: auth/session design and CLI patching.
- Timeline is feasible if implementation stays close to defined defaults.

Technical Readiness
- Constraints are clear (Astro+TS, self-hosted API, no SaaS).
- Data model and API contract now sufficiently defined for architecture.
- Remaining architectural decisions: error handling patterns, session storage, and API auth strategy.

Recommendations
1. Add a small User Flows section with the two critical flows (CLI create/add/remove; checkout).
2. Add a short Dependencies note in the epic list or per epic.
3. Add a single paragraph on capacity/availability expectations.

Final Decision
READY FOR ARCHITECT

## Next Steps

### UX Expert Prompt
Create front-end specs for the CLI and generated template UX with emphasis on minimal, neutral UI and accessibility-first defaults.

### Architect Prompt
Create architecture for the modular template system, including CLI workflow, manifest schema, patch-point strategy, and the separate JSON API for commerce.
