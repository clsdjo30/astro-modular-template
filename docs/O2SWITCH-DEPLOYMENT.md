# o2switch Deployment Preset

## Default Model (Static UI + JSON API)
- UI runs as static Astro output (`dist/`) on any static host.
- API runs as a separate Node.js service on o2switch.
- SSR/hybrid is optional and only applies when explicitly enabled.

## UI Deployment (Static)
1. Install dependencies: `pnpm install`
2. Run checks: `pnpm lint`, `pnpm typecheck`, `pnpm astro:check`
3. Build: `pnpm build`
4. Upload `dist/` to your static host and set the site root to `dist/`.

## API Deployment (o2switch)
- Node.js version: 22.19.0 LTS
- Build command: `pnpm build`
- Start command: `pnpm start`
- Build output: `dist/` (or `build/` if the API preset compiles there)
- Deployment: Git deploy or upload build output, then restart the Node.js app

## Environment Variables
Frontend (static UI):
- `PUBLIC_API_BASE_URL` (points to the API origin)

Backend (API service):
- `DB_*` (database connection settings)
- `SESSION_SECRET`
- `API_ALLOWED_ORIGIN`
- `NODE_ENV`

## Optional SSR/Hybrid (Only If Enabled)
- Enable SSR/hybrid explicitly in the preset.
- Ensure the UI runs on a Node.js host and deploy the Astro server output.
