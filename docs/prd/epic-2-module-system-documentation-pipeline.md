# Epic 2: Module System & Documentation Pipeline
Define the module system (manifests, patch points, ownership rules) and generate documentation from manifests to keep modules discoverable and synchronized. This epic delivers the internal scaffolding needed for reliable add/remove and consistent docs.
Dependencies: Epic 1 complete (base template + CLI skeleton).

## Story 2.1: Module Manifest Schema
As a solo freelancer,
I want a module manifest schema,
so that each module declares its files, dependencies, config keys, and patch points.

Acceptance Criteria
1. Manifest includes module id, description, dependencies, conflicts, and ownership.
2. Manifest lists added files and patch points with insertion rules.
3. Manifest specifies config keys under modules.<name>.

## Story 2.2: Patch-Point Conventions
As a solo freelancer,
I want explicit patch points in base templates,
so that module additions are safe and predictable.

Acceptance Criteria
1. Patch points are clearly marked and documented in core templates.
2. CLI can insert module snippets at patch points deterministically.
3. CLI fails safely if a patch point is missing or modified.

## Story 2.3: Limited Remove (Owned Files Only)
As a solo freelancer,
I want a limited remove capability,
so that I can undo a module by removing only owned files and patch insertions.

Acceptance Criteria
1. CLI remove only deletes files owned by the module manifest.
2. CLI removes only marked patch insertions without affecting manual edits.
3. CLI warns when manual edits are detected in owned files.

## Story 2.4: Docs Generation
As a solo freelancer,
I want module documentation generated from manifests,
so that docs stay in sync with the system.

Acceptance Criteria
1. CLI generates a module catalog (MODULES.md) from manifests.
2. CLI generates an enable/disable guide (CONFIG.md or similar).
3. Generated docs include module dependencies and conflicts.
