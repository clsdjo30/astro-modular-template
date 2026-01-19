# Tech Stack

## Technology Stack Table
| Category | Technology | Version | Purpose | Rationale |
| --- | --- | --- | --- | --- |
| Frontend Language | TypeScript | 5.5.4 | Type-safe UI and tooling | Matches Astro + strong typing preference |
| Frontend Framework | Astro | 5.0.0 | Static-first UI generation | Static by default, framework-agnostic |
| UI Component Library | None (custom minimal) | N/A | Neutral, minimal UI | Avoids default branding |
| State Management | Minimal (local state + URL) | N/A | Simple UI flows | Avoids unnecessary complexity |
| Backend Language | TypeScript | 5.5.4 | API service | Consistency across stack |
| Runtime (Node.js) | Node.js | 22.19.0 | CLI/API runtime | Pinned LTS |
| Backend Framework | Express | Latest stable | JSON API service | Simple, self-hosted, widely supported |
| API Style | REST | N/A | JSON API endpoints | Matches PRD API contract |
| Database | MariaDB (default), PostgreSQL supported | Latest stable | Orders + users | Self-hosted constraint |
| Cache | In-memory (server session) | N/A | Cart storage | Session-based cart in v1 |
| File Storage | Local filesystem (with abstraction) | N/A | Product images | Self-hosted v1; extensible to S3 later |
| Authentication | Custom email/password + sessions/JWT | N/A | Self-hosted auth | No SaaS, extensible later |
| Frontend Testing | Vitest | 2.0.0 | Unit tests | Fast TS testing |
| Backend Testing | Vitest | 2.0.0 | API/service tests | Shared tooling |
| E2E Testing | Optional (Playwright) | Latest stable | Critical flow smoke tests | Optional in v1 |
| Build Tool | Vite (via Astro) | Bundled | Frontend build | Astro default |
| Bundler | Vite | Bundled | Frontend bundling | Astro default |
| IaC Tool | None (v1) | N/A | Infra management | Keep ops minimal |
| Package Manager | pnpm | 10.0.0 | Monorepo tooling | Deterministic workspace installs |
| Linting | ESLint | 9.0.0 | Code linting | Pinned for consistency |
| Formatting | Prettier | 3.3.0 | Code formatting | Pinned for consistency |
| CI/CD | GitHub Actions | Latest | Lint/typecheck/build | Matches PRD |
| Monitoring | Minimal (logs + health checks) | N/A | Self-hosted ops | Aligns with ops constraints |
| Logging | Pino | Latest stable | API logging | Structured JSON logs, low overhead |
| CSS Framework | None by default (TailwindCSS optional) | 4.0.0 (if enabled) | Neutral UI | Avoid default theme |
