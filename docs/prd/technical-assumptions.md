# Technical Assumptions

## Repository Structure: Monorepo
A single repo containing CLI, module manifests, and base templates keeps the internal tool cohesive and easier to evolve; avoids multi-repo overhead.

## Service Architecture
Monolith with an optional self-hosted JSON API service for backend-enabled presets; static presets are frontend-only.

## Testing Requirements
- Unit + Integration

## Additional Technical Assumptions and Requests
- Astro + TypeScript only; framework-agnostic by default.
- Self-hosted Node.js JSON API backend on o2switch for backend-enabled presets.
- Database: MariaDB (default), PostgreSQL supported.
- Auth: internal email/password + sessions/JWT; OAuth hooks optional later.
- No paid SaaS dependencies for CMS/auth/database.
- CLI is plain prompt-based; no TUI.
