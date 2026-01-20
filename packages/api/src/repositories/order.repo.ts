import { randomUUID } from "node:crypto";
import type { Knex } from "knex";
import { db } from "../db/index.js";

export interface OrderRecord {
  id: string;
  user_id: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  fulfillment_type: "pickup" | "delivery" | null;
  notes: string | null;
  total_cents: number;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
  updated_at: string;
}

export interface OrderItemRecord {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price_cents: number;
}

export async function createOrderWithItems(
  order: Omit<OrderRecord, "id" | "created_at" | "updated_at">,
  items: Array<Omit<OrderItemRecord, "id" | "order_id">>
): Promise<OrderRecord> {
  const id = randomUUID();
  const now = new Date().toISOString().slice(0, 19).replace("T", " ");

  await db.transaction(async (trx: Knex.Transaction) => {
    await trx<OrderRecord>("orders").insert({
      id,
      ...order,
      created_at: now,
      updated_at: now
    });

    const rows = items.map((item) => ({
      id: randomUUID(),
      order_id: id,
      ...item
    }));
    await trx<OrderItemRecord>("order_items").insert(rows);
  });

  const created = await db<OrderRecord>("orders").where({ id }).first();
  if (!created) {
    throw new Error("Order creation failed");
  }
  return created;
}

export async function listOrders(): Promise<OrderRecord[]> {
  return db<OrderRecord>("orders").orderBy("created_at", "desc");
}

export async function getOrderById(id: string): Promise<OrderRecord | null> {
  const order = await db<OrderRecord>("orders").where({ id }).first();
  return order ?? null;
}

export async function listOrderItems(orderId: string): Promise<OrderItemRecord[]> {
  return db<OrderItemRecord>("order_items").where({ order_id: orderId });
}
