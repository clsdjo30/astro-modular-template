# CLI (Base Create)

Minimal CLI to generate a project from `templates/base/`.

## Usage
```bash
node dist/index.js create <path>
```

If `<path>` is omitted, the CLI will prompt for it.

## Next Steps (after create)
```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```
