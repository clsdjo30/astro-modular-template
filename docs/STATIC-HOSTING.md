# Static Hosting Preset

## Build Output
- Run `pnpm build`.
- Deploy the `dist/` folder to any static host.
- No Node.js runtime is required for the UI in production.

## Environment Variables
- Only `PUBLIC_*` variables are exposed to the client.
- Keep secrets and backend settings out of frontend environments.

## Generic Deployment Steps
1. Install dependencies: `pnpm install`
2. Run checks: `pnpm lint`, `pnpm typecheck`, `pnpm astro:check`
3. Build: `pnpm build`
4. Upload `dist/` to your static host and set the site root to `dist/`.
