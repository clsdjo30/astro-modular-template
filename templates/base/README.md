# Astro Base Template

Minimal Astro + TypeScript starter for client projects.

## Requirements
- Node.js 22.19.0
- pnpm 10.0.0

## Setup
```bash
pnpm install
```

## Scripts
```bash
pnpm dev
pnpm build
pnpm preview
pnpm lint
pnpm typecheck
pnpm test
pnpm astro:check
```

## Static Hosting
- Build output is in `dist/`.
- Deploy `dist/` to any static host.
- Only `PUBLIC_*` env vars are exposed to the client.

## Pinned Versions
- Astro 5.0.0
- TypeScript 5.6.0
- ESLint 9.0.0
- Prettier 3.3.0
- Vitest 2.0.0
