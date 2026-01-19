# Core Workflows

```mermaid
sequenceDiagram
  autonumber
  %% Workflow A: CLI create -> add -> remove
  rect rgba(200,200,200,0.15)
    participant User
    participant CLI
    participant Manifests
    participant Templates
    participant FS as FileSystem
    User->>CLI: create --preset vitrine
    CLI->>Manifests: load preset + module manifests
    CLI->>Templates: apply base + preset templates
    CLI->>FS: write generated project files
    User->>CLI: add module (e.g., blog)
    CLI->>Manifests: load module manifest
    CLI->>Templates: apply patch points + files
    CLI->>FS: update project files
    User->>CLI: remove module (limited)
    CLI->>Manifests: read ownership list
    CLI->>FS: delete owned files + remove patch insertions
  end

  %% Workflow B: Catalog -> Cart -> Checkout
  rect rgba(200,200,200,0.15)
    participant Customer
    participant UI as Astro UI
    participant API as JSON API
    participant Sess as Session Store (DB)
    participant DB
    Customer->>UI: Browse catalog
    UI->>API: GET /api/v1/products
    API->>DB: query products
    DB-->>API: products
    API-->>UI: products
    Customer->>UI: Add item to cart
    UI->>API: POST /api/v1/cart/items
    API->>Sess: persist cart (session)
    API-->>UI: cart summary
    Customer->>UI: Checkout
    UI->>API: POST /api/v1/orders
    API->>DB: create order + items
    DB-->>API: order id
    API-->>UI: order confirmation
  end

  %% Workflow C: Admin Auth + Management
  rect rgba(200,200,200,0.15)
    participant Admin
    Admin->>API: POST /api/v1/auth/login
    API-->>Admin: Session cookie set
    Admin->>API: POST /api/v1/products (admin)
    API-->>Admin: product created
    Admin->>API: PATCH /api/v1/products/{id} (admin)
    API-->>Admin: product updated
    Admin->>API: GET /api/v1/orders (admin)
    API-->>Admin: order list
    Admin->>API: GET /api/v1/orders/{id} (admin)
    API-->>Admin: order detail
  end

  %% Workflow D: Session + Security Lifecycle
  rect rgba(200,200,200,0.15)
    participant Guest
    Guest->>API: POST /api/v1/cart/items
    API-->>Guest: Session cookie (HttpOnly, Secure, SameSite)
    Guest->>API: POST /api/v1/orders
    API-->>Guest: Rate limited (if exceeded)
    Note over API: Session rotates on login; expires per config; cart persists in session
  end
```
