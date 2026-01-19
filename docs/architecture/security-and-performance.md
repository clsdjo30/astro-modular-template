# Security and Performance

## Security Requirements
**Frontend Security**
- CSP Headers: Basic CSP for static UI (script-src/self), with `frame-ancestors` set via CSP.
- XSS Prevention: Escape dynamic content; no inline scripts except where needed for cart.
- Secure Storage: Avoid localStorage for auth; rely on HttpOnly cookies.
- Security Headers Baseline (prod): `X-Content-Type-Options: nosniff`, `Referrer-Policy`, CSP with `frame-ancestors`, and HSTS.

**Backend Security**
- Input Validation: Zod schemas on all request bodies.
- CSRF Protection: Double-submit cookie or header token required for all state-changing endpoints (cart mutations, orders, admin CRUD).
- Rate Limiting: Apply to POST /api/v1/auth/login and POST /api/v1/orders.
- CORS Policy: Allowlist from `API_ALLOWED_ORIGIN` with credentials.
- File Upload Hardening: Allow only jpeg/png/webp, enforce size limits, safe file naming, and path traversal protection.

**Authentication Security**
- Token Storage: Session cookies (HttpOnly, Secure, SameSite=Lax by default).
- Session Management: DB-backed store in production; rotate on login.
- Password Hashing: Argon2id (v1 default).

**Logging Hygiene**
- No passwords/tokens/PII in logs; normalize errors and strip sensitive payloads.

## Performance Optimization
**Frontend Performance**
- Bundle Size Target: Minimal JS (no framework).
- Loading Strategy: Static HTML with progressive enhancement for cart.
- Image Optimization: Use Astro image pipeline where possible; long-lived caching headers for static assets.

**Backend Performance**
- Response Time Target: <300ms for product list and order creation under normal load.
- Database Optimization: Indexes on products, orders, sessions.
- Caching Strategy: Session-based cart; no additional cache in v1.
