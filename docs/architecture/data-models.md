# Data Models

## User
**Purpose:** Represents authenticated users (admin or customer) for self-hosted auth and order ownership.

**Key Attributes:**
- id: string (uuid)
- email: string
- passwordHash: string
- role: "admin" | "customer"
- createdAt: string (ISO)

```typescript
export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: "admin" | "customer";
  createdAt: string;
}
```

**Relationships:**
- User may have many Orders (optional for guest checkout)

## Session
**Purpose:** Stores server-side session data (including cart state).

**Key Attributes:**
- id: string
- userId: string | null
- expiresAt: string (ISO)
- cart: Cart

```typescript
export interface CartItem {
  productId: string;
  quantity: number;
  unitPriceCents: number;
}

export interface Cart {
  items: CartItem[];
  currency: "EUR";
  updatedAt: string;
}

export interface Session {
  id: string;
  userId: string | null;
  expiresAt: string;
  cart: Cart;
}
```

**Relationships:**
- Session optionally links to User
- Session contains Cart data (no separate cart table in v1)

## Product
**Purpose:** Catalog item for restaurant/commerce.

**Key Attributes:**
- id: string (uuid)
- name: string
- description: string
- priceCents: number
- imageUrl: string | null
- isActive: boolean

```typescript
export interface Product {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  imageUrl?: string | null;
  isActive: boolean;
}
```

**Relationships:**
- Product referenced by OrderItem

## Order
**Purpose:** Represents a submitted order (guest checkout supported).

**Key Attributes:**
- id: string (uuid)
- userId: string | null
- customerName: string
- customerEmail: string
- customerPhone: string
- fulfillmentType?: "pickup" | "delivery"
- notes?: string
- totalCents: number
- status: "pending" | "confirmed" | "cancelled"
- createdAt: string (ISO)

```typescript
export interface Order {
  id: string;
  userId?: string | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  fulfillmentType?: "pickup" | "delivery";
  notes?: string;
  totalCents: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}
```

**Relationships:**
- Order has many OrderItems
- Order optionally links to User

## OrderItem
**Purpose:** Line items within an order.

**Key Attributes:**
- id: string (uuid)
- orderId: string
- productId: string
- quantity: number
- unitPriceCents: number

```typescript
export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPriceCents: number;
}
```

**Relationships:**
- OrderItem belongs to Order
- OrderItem references Product

## Notes
- Prices stored as integer minor units (cents).
- Order status values remain pending/confirmed/cancelled in v1.
