# Module Manifest Schema (v1)

This document defines the minimal YAML schema used by modules and presets.
It is intentionally small and will evolve as the system grows.

## Fields

- `id` (string, required): Unique module id.
- `description` (string, required): Human-readable summary.
- `dependencies` (string[], required): Module ids required before installation.
- `conflicts` (string[], required): Module ids that cannot be installed together.
- `ownership` (object, required):
  - `files` (string[]): Files owned by the module (for safe removal).
  - `patches` (object[]): Patch insertions owned by the module:
    - `target` (string): File path of the patch point.
    - `insert` ("append" | "prepend" | "replace"): Insertion rule.
    - `marker` (string): Marker name for idempotence.
- `config` (object, required):
  - `keys` (string[]): Config keys under `modules.<name>` namespace.

## Notes
- Manifests are YAML in `packages/modules/<module>/manifest.yaml`.
- Patch insertions use marker-based blocks to allow idempotent add/remove.
