# Epic 4: Restaurant Commerce Preset (Backend-Enabled)
Deliver a backend-enabled restaurant/commerce preset with a separate self-hosted JSON API (o2switch), internal auth, and the full product -> cart -> checkout flow, while keeping static presets free of backend dependencies and maintaining a clean UI <-> API boundary.
Dependencies: Epic 1 and Epic 2 complete; Epic 3 optional for shared UI patterns.

## Story 4.1: Backend API Service Skeleton (Self-Hosted)
As a solo freelancer,
I want a self-hosted JSON API service wired to the commerce preset,
so that dynamic workflows run separately from the Astro UI.

Acceptance Criteria
1. Commerce preset includes a backend JSON API scaffold compatible with o2switch Node.js hosting.
2. API connects to MariaDB by default, with PostgreSQL supported, via a single data layer.
3. API is included only for backend-enabled presets; Astro remains frontend-only.

## Story 4.2: Internal Auth Module (Minimal, Extensible)
As a solo freelancer,
I want internal auth with email/password and sessions/JWT,
so that access is self-hosted and controllable.

Acceptance Criteria
1. Auth supports email/password login and session or JWT handling.
2. Roles are supported (admin/customer) with endpoint protection.
3. Auth design allows optional OAuth providers later without refactoring core flows.
4. No full back-office admin UI is required in v1 (optional minimal view orders page only).

## Story 4.3: Product Catalog & Product Pages
As a solo freelancer,
I want product catalog data and product pages,
so that restaurants can display offerings consistently.

Acceptance Criteria
1. Catalog supports products with name, price, description, and image.
2. Product list and detail pages render from API data.
3. Data access is encapsulated in a service layer on the frontend.

## Story 4.4: Cart & Checkout Flow
As a solo freelancer,
I want a cart and checkout flow,
so that users can place orders end-to-end.

Acceptance Criteria
1. Cart supports add/remove/update quantity and shows totals.
2. Cart state is stored server-side in session (no DB-persistent cart in v1).
3. Checkout collects customer details and confirms order submission.
4. Flow works without external payment providers in v1 unless explicitly enabled.

## Story 4.5: Order Persistence
As a solo freelancer,
I want orders saved in the database,
so that submissions are reliable and reviewable.

Acceptance Criteria
1. Orders are stored in the database with line items.
2. API provides a simple order creation endpoint.
3. Basic validation prevents empty or invalid orders.
