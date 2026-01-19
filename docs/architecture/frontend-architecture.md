# Frontend Architecture

## Component Architecture

Component Organization
```text
src/
  components/
    layout/
      BaseLayout.astro
      Header.astro
      Footer.astro
    ui/
      Button.astro
      Input.astro
      Card.astro
    commerce/
      ProductCard.astro
      CartSummary.astro
      CheckoutForm.astro
  pages/
    index.astro
    products/index.astro
    products/[id].astro
    cart.astro
    checkout.astro
    admin/orders.astro
  services/
    apiClient.ts
    productService.ts
    cartService.ts
    orderService.ts
  scripts/
    cart.ts
  config/
    app.config.ts
    env.ts
```

Component Template (Astro)
```typescript
---
// ProductCard.astro
const { product } = Astro.props;
---
<article class="product-card">
  <h2>{product.name}</h2>
  <p>{product.description}</p>
  <p>{(product.priceCents / 100).toFixed(2)} EUR</p>
  <button data-product-id={product.id} class="add-to-cart">
    Add to cart
  </button>
</article>
```

## State Management Architecture

State Structure
```typescript
export interface CartState {
  items: Array<{ productId: string; quantity: number; unitPriceCents: number }>;
  currency: "EUR";
  updatedAt: string;
}
```

State Management Patterns
- Server-source-of-truth: cart is stored in session; UI fetches after mutations.
- Minimal client cache: store cart state in memory for current page render only.

## Routing Architecture

Route Organization
```text
/                -> Home
/products        -> Product list
/products/[id]   -> Product detail
/cart            -> Cart
/checkout        -> Checkout
/admin/orders    -> Optional minimal admin order list
```

Protected Route Pattern (Admin)
```typescript
// admin/orders.astro (pseudo)
import { apiGet } from "../services/apiClient";
const user = await apiGet("/api/v1/auth/me");
if (!user || user.role !== "admin") {
  // render login link or minimal auth notice
}
```

Admin Orders Page (static UI)
- Static shell page with client-side script:
  - Calls `/api/v1/auth/me`
  - If admin, fetches `/api/v1/orders`
  - If not admin, shows minimal login link or access notice

## Frontend Services Layer

API Client Setup
```typescript
const API_BASE = import.meta.env.PUBLIC_API_BASE_URL;

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: { message: "Unknown error" } }));
    throw new Error(error?.error?.message || "Request failed");
  }
  return res.json() as Promise<T>;
}
```

Service Example
```typescript
export function listProducts() {
  return apiRequest<Product[]>("/api/v1/products");
}
```

CORS + Session Cookies (o2switch)
- API CORS allowlist (no `*`) with credentials enabled.
- Session cookie settings:
  - `HttpOnly` and `Secure`
  - `SameSite=Lax` when UI and API share the same registrable domain
  - Use `SameSite=None` only if cross-site is required later
- Required env vars:
  - `PUBLIC_API_BASE_URL` (frontend)
  - `API_ALLOWED_ORIGIN` (backend)
