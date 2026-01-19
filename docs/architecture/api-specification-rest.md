# API Specification (REST)

```yaml
openapi: 3.0.0
info:
  title: Astro Commerce API
  version: v1
  description: Self-hosted JSON API for restaurant commerce preset.
servers:
  - url: https://api.example.com
    description: Production API
paths:
  /api/v1/auth/register:
    post:
      summary: Register a new user (disabled by default in v1)
  /api/v1/auth/login:
    post:
      summary: Login with email/password
  /api/v1/auth/logout:
    post:
      summary: Logout current session
  /api/v1/auth/me:
    get:
      summary: Get current user session
  /api/v1/products:
    get:
      summary: List products
    post:
      summary: Create product (admin only)
  /api/v1/products/{id}:
    get:
      summary: Get product by id
    patch:
      summary: Update product (admin only)
    delete:
      summary: Delete product (admin only)
  /api/v1/cart:
    get:
      summary: Get current cart (session-based)
  /api/v1/cart/items:
    post:
      summary: Add item to cart
  /api/v1/cart/items/{productId}:
    patch:
      summary: Update cart item quantity
    delete:
      summary: Remove cart item
  /api/v1/orders:
    post:
      summary: Create order from cart (public, guest allowed)
    get:
      summary: List orders (admin only)
  /api/v1/orders/{id}:
    get:
      summary: Get order details (admin only)
```

Notes:
- Register is disabled by default in v1; admin user created via seed/CLI.
- Guest checkout allowed for POST /api/v1/orders with strict validation + rate limiting.
- Cart item identifiers use productId in the path (session-based).
- Admin product CRUD included even without a full admin UI.
