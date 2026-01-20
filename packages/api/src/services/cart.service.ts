import { z } from "zod";
import type { Request } from "express";
import { getProductById } from "./products.service.js";

export const cartAddSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().positive()
});

export const cartUpdateSchema = z.object({
  quantity: z.number().int().positive()
});

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

export interface CartSummary {
  cart: Cart;
  totalCents: number;
}

function nowIso(): string {
  return new Date().toISOString();
}

function ensureCart(req: Request): Cart {
  if (!req.session.cart) {
    req.session.cart = { items: [], currency: "EUR", updatedAt: nowIso() };
  }
  return req.session.cart;
}

function summarize(cart: Cart): CartSummary {
  const totalCents = cart.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPriceCents,
    0
  );
  return { cart, totalCents };
}

export function getCart(req: Request): CartSummary {
  const cart = ensureCart(req);
  return summarize(cart);
}

export async function addCartItem(req: Request, productId: string, quantity: number): Promise<CartSummary> {
  const cart = ensureCart(req);
  const product = await getProductById(productId);
  if (!product || !product.isActive) {
    throw Object.assign(new Error("Product not available"), {
      status: 404,
      code: "NOT_FOUND"
    });
  }

  const existing = cart.items.find((item) => item.productId === productId);
  if (existing) {
    existing.quantity += quantity;
    existing.unitPriceCents = product.priceCents;
  } else {
    cart.items.push({
      productId,
      quantity,
      unitPriceCents: product.priceCents
    });
  }
  cart.updatedAt = nowIso();
  return summarize(cart);
}

export function updateCartItem(
  req: Request,
  productId: string,
  quantity: number
): CartSummary {
  const cart = ensureCart(req);
  const item = cart.items.find((entry) => entry.productId === productId);
  if (!item) {
    throw Object.assign(new Error("Cart item not found"), {
      status: 404,
      code: "NOT_FOUND"
    });
  }

  item.quantity = quantity;
  cart.updatedAt = nowIso();
  return summarize(cart);
}

export function removeCartItem(req: Request, productId: string): CartSummary {
  const cart = ensureCart(req);
  const nextItems = cart.items.filter((entry) => entry.productId !== productId);
  cart.items = nextItems;
  cart.updatedAt = nowIso();
  return summarize(cart);
}
