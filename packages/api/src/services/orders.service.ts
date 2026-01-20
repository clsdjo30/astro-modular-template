import { z } from "zod";
import type { Request } from "express";
import {
  createOrderWithItems,
  getOrderById as fetchOrderById,
  listOrderItems,
  listOrders as fetchOrders,
  type OrderRecord
} from "../repositories/order.repo.js";

export const orderCreateSchema = z.object({
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(6),
  fulfillmentType: z.enum(["pickup", "delivery"]).optional(),
  notes: z.string().optional()
});

export interface OrderDto {
  id: string;
  userId: string | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  fulfillmentType: "pickup" | "delivery" | null;
  notes: string | null;
  totalCents: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export interface OrderItemDto {
  id: string;
  productId: string;
  quantity: number;
  unitPriceCents: number;
}

export interface OrderDetailDto extends OrderDto {
  items: OrderItemDto[];
}

function ensureCart(req: Request) {
  return req.session.cart ?? { items: [], currency: "EUR", updatedAt: new Date().toISOString() };
}

function mapOrder(record: OrderRecord): OrderDto {
  return {
    id: record.id,
    userId: record.user_id,
    customerName: record.customer_name,
    customerEmail: record.customer_email,
    customerPhone: record.customer_phone,
    fulfillmentType: record.fulfillment_type,
    notes: record.notes,
    totalCents: record.total_cents,
    status: record.status,
    createdAt: record.created_at
  };
}

export async function createOrder(req: Request, payload: z.infer<typeof orderCreateSchema>): Promise<OrderDto> {
  const cart = ensureCart(req);
  if (cart.items.length === 0) {
    throw Object.assign(new Error("Cart is empty"), {
      status: 400,
      code: "EMPTY_CART"
    });
  }

  const totalCents = cart.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPriceCents,
    0
  );

  const record = await createOrderWithItems(
    {
      user_id: req.session.user?.id ?? null,
      customer_name: payload.customerName,
      customer_email: payload.customerEmail,
      customer_phone: payload.customerPhone,
      fulfillment_type: payload.fulfillmentType ?? null,
      notes: payload.notes ?? null,
      total_cents: totalCents,
      status: "pending"
    },
    cart.items.map((item) => ({
      product_id: item.productId,
      quantity: item.quantity,
      unit_price_cents: item.unitPriceCents
    }))
  );

  req.session.cart = { items: [], currency: "EUR", updatedAt: new Date().toISOString() };

  return mapOrder(record);
}

export async function listOrders(): Promise<OrderDto[]> {
  const orders = await fetchOrders();
  return orders.map(mapOrder);
}

export async function getOrderDetail(id: string): Promise<OrderDetailDto | null> {
  const order = await fetchOrderById(id);
  if (!order) return null;

  const items = await listOrderItems(id);
  return {
    ...mapOrder(order),
    items: items.map((item) => ({
      id: item.id,
      productId: item.product_id,
      quantity: item.quantity,
      unitPriceCents: item.unit_price_cents
    }))
  };
}
