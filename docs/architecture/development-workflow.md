# Development Workflow

## Local Development Setup

Prerequisites
```bash
node -v    # 22.19.0
pnpm -v    # 10.0.0
```

Initial Setup
```bash
pnpm install
```

Development Commands
```bash
# Start CLI dev (watch)
pnpm dev:cli

# Run tests
pnpm test
```

## Environment Configuration

Required Environment Variables
```bash
# Frontend (.env.local)
PUBLIC_API_BASE_URL=https://api.example.com

# Backend (.env)
API_ALLOWED_ORIGIN=https://client.example.com
DB_HOST=localhost
DB_USER=app
DB_PASSWORD=secret
DB_NAME=app
SESSION_SECRET=change-me

# Shared
NODE_ENV=development
```

Notes:
- pnpm is the default for the generator/tooling repo.
- Generated projects remain package-manager agnostic (npm/pnpm supported).
- bun is intentionally excluded in v1.
