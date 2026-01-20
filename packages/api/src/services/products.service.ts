import { randomUUID } from "node:crypto";
import { z } from "zod";
import { db } from "../db/index.js";

export const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceCents: z.number().int().nonnegative(),
  imageUrl: z.string().url().nullable().optional(),
  isActive: z.boolean().optional().default(true)
});

export const productPatchSchema = productSchema.partial();

export interface ProductRecord {
  id: string;
  name: string;
  description: string;
  price_cents: number;
  image_url: string | null;
  is_active: number | boolean;
}

export interface ProductDto {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  imageUrl: string | null;
  isActive: boolean;
}

function toProductDto(record: ProductRecord): ProductDto {
  return {
    id: record.id,
    name: record.name,
    description: record.description,
    priceCents: record.price_cents,
    imageUrl: record.image_url,
    isActive: Boolean(record.is_active)
  };
}

export async function listProducts(): Promise<ProductDto[]> {
  const rows = await db<ProductRecord>("products").select(
    "id",
    "name",
    "description",
    "price_cents",
    "image_url",
    "is_active"
  );
  return rows.map(toProductDto);
}

export async function getProductById(id: string): Promise<ProductDto | null> {
  const row = await db<ProductRecord>("products")
    .select("id", "name", "description", "price_cents", "image_url", "is_active")
    .where({ id })
    .first();
  return row ? toProductDto(row) : null;
}

export async function createProduct(input: z.infer<typeof productSchema>): Promise<ProductDto> {
  const id = randomUUID();
  await db<ProductRecord>("products").insert({
    id,
    name: input.name,
    description: input.description,
    price_cents: input.priceCents,
    image_url: input.imageUrl ?? null,
    is_active: input.isActive ?? true
  });

  const row = await db<ProductRecord>("products")
    .select("id", "name", "description", "price_cents", "image_url", "is_active")
    .where({ id })
    .first();

  if (!row) {
    throw new Error("Product creation failed");
  }

  return toProductDto(row);
}

export async function updateProduct(
  id: string,
  input: z.infer<typeof productPatchSchema>
): Promise<ProductDto | null> {
  const update: Partial<ProductRecord> = {};
  if (input.name !== undefined) update.name = input.name;
  if (input.description !== undefined) update.description = input.description;
  if (input.priceCents !== undefined) update.price_cents = input.priceCents;
  if (input.imageUrl !== undefined) update.image_url = input.imageUrl ?? null;
  if (input.isActive !== undefined) update.is_active = input.isActive;

  await db<ProductRecord>("products").where({ id }).update(update);

  const row = await db<ProductRecord>("products")
    .select("id", "name", "description", "price_cents", "image_url", "is_active")
    .where({ id })
    .first();

  return row ? toProductDto(row) : null;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const deleted = await db<ProductRecord>("products").where({ id }).del();
  return deleted > 0;
}
