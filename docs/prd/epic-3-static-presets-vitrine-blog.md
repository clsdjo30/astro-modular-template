# Epic 3: Static Presets (Vitrine + Blog)
Deliver the static presets with core pages, content collections, SEO, forms, and minimal neutral UI output so that typical client sites can be generated and shipped quickly without backend dependencies.
Dependencies: Epic 1 and Epic 2 complete (template + module system).

## Story 3.1: Vitrine Preset (Core Pages + Layout)
As a solo freelancer,
I want a vitrine preset with core marketing pages and a neutral layout,
so that I can ship static marketing sites quickly.

Acceptance Criteria
1. Vitrine preset includes Home, About, Services, and Contact pages.
2. Pages use a minimal neutral layout with accessible structure and no branded theme.
3. No JS framework is required by default.
4. Static build succeeds with no backend dependencies.

## Story 3.2: Blog Preset (Content Collections)
As a solo freelancer,
I want a blog preset with content collections,
so that I can publish posts quickly.

Acceptance Criteria
1. Blog preset includes content collections schema for posts.
2. Blog includes list, detail, tag/category, and RSS outputs.
3. Static build succeeds with no backend dependencies.

## Story 3.3: SEO Baseline
As a solo freelancer,
I want SEO utilities and metadata defaults,
so that generated sites are SEO-ready.

Acceptance Criteria
1. Base SEO metadata includes title, description, canonical, OpenGraph, and Twitter cards.
2. Sitemap and robots.txt are generated for static presets.
3. Structured data templates are available for core page types.

## Story 3.4: Forms Module (Static-Friendly)
As a solo freelancer,
I want a contact form module compatible with static hosting,
so that client sites can capture leads without custom backend.

Acceptance Criteria
1. Forms module provides a contact form page and component.
2. Form integration supports at least one provider (configurable).
3. Form submission does not require backend dependencies in static preset.
