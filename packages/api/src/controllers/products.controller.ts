import type { RequestHandler } from "express";
import { productPatchSchema, productSchema } from "../services/products.service.js";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct
} from "../services/products.service.js";

function createApiError(status: number, code: string, message: string): Error {
  const error = new Error(message) as Error & { status?: number; code?: string };
  error.status = status;
  error.code = code;
  return error;
}

export const listProductsHandler: RequestHandler = async (_req, res, next) => {
  try {
    const products = await listProducts();
    res.json({ data: products });
  } catch (err) {
    next(err);
  }
};

export const getProductHandler: RequestHandler = async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      throw createApiError(404, "NOT_FOUND", "Product not found");
    }
    res.json({ data: product });
  } catch (err) {
    next(err);
  }
};

export const createProductHandler: RequestHandler = async (req, res, next) => {
  try {
    const payload = productSchema.parse(req.body);
    const product = await createProduct(payload);
    res.status(201).json({ data: product });
  } catch (err) {
    next(err);
  }
};

export const updateProductHandler: RequestHandler = async (req, res, next) => {
  try {
    const payload = productPatchSchema.parse(req.body);
    const product = await updateProduct(req.params.id, payload);
    if (!product) {
      throw createApiError(404, "NOT_FOUND", "Product not found");
    }
    res.json({ data: product });
  } catch (err) {
    next(err);
  }
};

export const deleteProductHandler: RequestHandler = async (req, res, next) => {
  try {
    const deleted = await deleteProduct(req.params.id);
    if (!deleted) {
      throw createApiError(404, "NOT_FOUND", "Product not found");
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
