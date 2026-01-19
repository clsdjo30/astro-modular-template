# Epic 5: Hosting & Deployment Presets
Provide static deployment guidance and a first-class o2switch deployment preset (static UI + separate JSON API, with optional SSR), aligned with CI scripts, so generated projects can be deployed reliably without expanding to a broad platform matrix.
Dependencies: Epic 1 complete; Epic 4 required for API deployment guidance.

## Story 5.1: Static Hosting Preset
As a solo freelancer,
I want a static hosting preset,
so that vitrine/blog sites deploy quickly with minimal configuration.

Acceptance Criteria
1. Static preset documents build output and deployment steps.
2. Static projects have no backend/runtime dependencies.
3. CI pipeline validates static build and asset output.

## Story 5.2: o2switch Deployment Preset (Static UI + API, Optional SSR)
As a solo freelancer,
I want an o2switch deployment preset that defaults to a static Astro UI plus a separate Node.js JSON API,
so that backend-enabled projects deploy cleanly without requiring SSR unless explicitly needed.

Acceptance Criteria
1. Preset documents deployment for static Astro UI and separate Node.js JSON API on o2switch.
2. SSR/hybrid mode is optional and documented only when explicitly enabled.
3. Env handling is documented for server/runtime variables for the API (and SSR only if enabled).
4. CI pipeline validates static build and API service independently.

## Story 5.3: Deployment Docs & Handoff
As a solo freelancer,
I want clear deployment documentation,
so that project delivery is repeatable.

Acceptance Criteria
1. Generated README includes a deployment section matching the selected preset.
2. Docs avoid platform sprawl and focus on static + o2switch paths in v1.
