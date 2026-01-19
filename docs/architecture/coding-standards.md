# Coding Standards

## Critical Fullstack Rules
- **Type Sharing:** Define shared domain types in `packages/shared` and import from there only.
- **API Calls:** Frontend must call API only through `apiClient` + service layer (no direct fetch in pages/components).
- **Config Access:** Environment variables are accessed only via config/env wrappers.
- **Validation:** All API request bodies must be validated with Zod schemas before service logic.
- **Error Shape:** All API errors must use `{ error: { code, message, details? } }`.
- **Session Safety:** Session data is stored in DB for production; in-memory only for local dev.
- **Prices:** Use integer minor units (`*_cents`) everywhere; no floats/decimals.
- **Generator Idempotence:** Patch-point insertions must use marker-based begin/end blocks and be idempotent; remove deletes only owned files + marked insertions.
- **Module Boundaries:** No direct cross-module imports in generated apps; shared/domain types only via `packages/shared` (or core).
- **API Versioning:** Prefix API with `/api/v1/*` to allow future evolution.

## Naming Conventions
| Element | Frontend | Backend | Example |
| --- | --- | --- | --- |
| Components | PascalCase | - | `ProductCard.astro` |
| Hooks | camelCase with `use` | - | `useCart.ts` |
| API Routes | - | kebab-case | `/api/v1/order-items` |
| Database Tables | - | snake_case | `order_items` |
