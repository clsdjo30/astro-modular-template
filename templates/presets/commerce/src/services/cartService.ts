import { apiRequest } from "./apiClient";

export interface CartItem {
  productId: string;
  quantity: number;
  unitPriceCents: number;
}

export interface CartSummary {
  cart: {
    items: CartItem[];
    currency: "EUR";
    updatedAt: string;
  };
  totalCents: number;
}

interface CartResponse {
  data: CartSummary;
}

export async function getCart(): Promise<CartSummary> {
  const response = await apiRequest<CartResponse>("/api/v1/cart");
  return response.data;
}

export async function addCartItem(productId: string, quantity: number): Promise<CartSummary> {
  const response = await apiRequest<CartResponse>("/api/v1/cart/items", {
    method: "POST",
    body: JSON.stringify({ productId, quantity })
  });
  return response.data;
}

export async function updateCartItem(productId: string, quantity: number): Promise<CartSummary> {
  const response = await apiRequest<CartResponse>(`/api/v1/cart/items/${productId}`, {
    method: "PATCH",
    body: JSON.stringify({ quantity })
  });
  return response.data;
}

export async function removeCartItem(productId: string): Promise<CartSummary> {
  const response = await apiRequest<CartResponse>(`/api/v1/cart/items/${productId}`, {
    method: "DELETE"
  });
  return response.data;
}
