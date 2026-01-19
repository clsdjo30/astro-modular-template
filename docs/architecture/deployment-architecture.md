# Deployment Architecture

## Deployment Strategy

**Frontend Deployment:**
- Platform: Static hosting (same domain as client site)
- Runtime: Astro static output only; no Node runtime required for UI in production
- Build Command: `pnpm build` (from generated project)
- Output Directory: `dist/`
- CDN/Edge: Optional; not required for v1

**Backend Deployment:**
- Platform: o2switch Node.js hosting
- Node.js Version: 22.19.0 LTS
- Build Command: `pnpm build` (API service)
- Start Command: `pnpm start`
- Build Output: `dist/`
- Deployment Method: Git deploy or manual upload + restart
- Env Vars: Configure in o2switch panel (DB_*, SESSION_SECRET, API_ALLOWED_ORIGIN, NODE_ENV)

## CI/CD Pipeline (Generator Repo)
```yaml
name: ci
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 10.0.0
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm typecheck
      - run: pnpm test
      - run: pnpm astro check
      - run: pnpm build
```

Note: Generated projects should include lint/typecheck/build scripts and may include a minimal CI workflow; the above pipeline targets the generator/tooling repo.

## Environments
| Environment | Frontend URL | Backend URL | Purpose |
| --- | --- | --- | --- |
| Development | http://localhost:3000 | http://localhost:4000 | Local development |
| Staging | (optional) | (optional) | Pre-production testing |
| Production | https://client.tld | https://api.client.tld | Live environment |
