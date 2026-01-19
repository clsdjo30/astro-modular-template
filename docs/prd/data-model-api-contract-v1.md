# Data Model & API Contract (v1)

## Core Entities (Minimum)
- User: id, email, password_hash, role_id, created_at
- Role: id, name (admin, customer)
- Session (if session-based): id, user_id, expires_at, data (for cart)
- Product: id, name, description, price, image_url, is_active
- Order: id, user_id (nullable for guest), total, status, created_at
- OrderItem: id, order_id, product_id, quantity, unit_price

## Notes
- Cart is stored server-side in session (not persisted as a DB entity in v1).
- Product categories/tags are optional v1 extensions.
- Default DB in v1 is MariaDB; PostgreSQL remains supported.

## API Endpoints (Minimum)

Auth
- POST /api/auth/register (optional if admin-only creation)
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me

Catalog
- GET /api/products
- GET /api/products/:id

Cart (session-based)
- GET /api/cart
- POST /api/cart/items (add)
- PATCH /api/cart/items/:id (update quantity)
- DELETE /api/cart/items/:id (remove)

Checkout / Orders
- POST /api/orders (create from session cart)
- GET /api/orders (admin only, optional minimal view)
- GET /api/orders/:id (admin only or owner)

Rules
- Auth required for admin endpoints.
- Guest checkout is allowed in v1; admin access requires auth.
- All endpoints return JSON with consistent error shapes.
