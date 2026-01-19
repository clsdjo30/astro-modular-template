# Epic 1: Foundation & Tooling Baseline
Establish the repository structure, base Astro template, CLI skeleton, and CI quality baseline so generated projects are consistent, minimal, and build cleanly from day one. This epic delivers a usable canary project and baseline checks.
Dependencies: None (foundational).

## Story 1.1: Repository Structure & Base Template
As a solo freelancer,
I want a base Astro + TypeScript template with a minimal, clean structure,
so that every generated project starts from a predictable foundation.

Acceptance Criteria
1. Base Astro template builds successfully with astro build and astro check.
2. Template includes minimal pages (home + 404) and a neutral layout.
3. No JS framework is required by default.
4. Project structure aligns with chosen repo layout conventions.

## Story 1.2: CLI Skeleton (create + presets)
As a solo freelancer,
I want a CLI that can create a new project from presets,
so that I can bootstrap a project in minutes.

Acceptance Criteria
1. CLI supports create with preset flags (vitrine, blog, restaurant).
2. CLI uses plain prompt-based input when flags are not provided.
3. Generated project includes only baseline files for the selected preset.
4. CLI outputs a clear summary of generated modules and next steps.

## Story 1.3: CI Quality Baseline
As a solo freelancer,
I want baseline quality checks wired into the template,
so that new projects fail fast when misconfigured.

Acceptance Criteria
1. CI scripts include lint, typecheck, astro check, and build.
2. CI passes on a freshly generated project without manual edits.
3. Lint and formatting config are present and runnable locally.

## Story 1.4: Minimal Config & Env Wrapper
As a solo freelancer,
I want a typed config and env wrapper in the base template,
so that configuration is centralized and safe.

Acceptance Criteria
1. Base template includes app.config with typed structure.
2. Environment access is routed through a single wrapper module.
3. No direct process.env/import.meta.env usage outside the wrapper.
