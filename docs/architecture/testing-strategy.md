# Testing Strategy

Testing Pyramid
```
E2E Tests
/        \
Integration Tests
/            \
Frontend Unit  Backend Unit
```

## Test Organization
- `packages/cli`: unit + integration tests
- `packages/shared`: unit tests
- `packages/api` (or `packages/backend`): integration tests
- `templates/`: optional unit tests for apiClient/service helpers

## Must-Have CLI Integration Tests
- `create --preset vitrine` -> assert generated file tree + deps
- `add blog` -> patch points inserted once
- `add blog` again -> idempotent (no diff / no duplicates)
- `remove blog` -> removes owned files + patch insertions only
- `remove <non-installed>` -> safe no-op with warning

## Frontend Service Tests
- Mock fetch (or MSW) for apiClient/product/cart/order services
- No real network calls in tests

## Backend Tests
- Integration tests for auth/cart/orders against a test DB
- Use docker-compose for MariaDB in dev/test environments

## E2E Tests (Optional)
- One Playwright smoke test: guest checkout flow
