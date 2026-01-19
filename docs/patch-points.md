# Patch Points (v1)

Patch points are marker blocks in base templates that allow deterministic,
idempotent insertion of module snippets.

## Marker format
- Begin: `<!-- @mod:begin <name> -->`
- End: `<!-- @mod:end <name> -->`
- Marker lines are not indented.

## Current patch points

- `head-meta` in `templates/base/src/layouts/BaseLayout.astro`
- `body-end` in `templates/base/src/layouts/BaseLayout.astro`
