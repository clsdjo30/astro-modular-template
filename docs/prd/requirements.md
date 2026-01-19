# Requirements

## Functional Requirements
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

## Non-Functional Requirements
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
