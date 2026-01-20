import type { RequestHandler } from "express";
import { orderCreateSchema, createOrder, getOrderDetail, listOrders } from "../services/orders.service.js";

function createApiError(status: number, code: string, message: string): Error {
  const error = new Error(message) as Error & { status?: number; code?: string };
  error.status = status;
  error.code = code;
  return error;
}

export const createOrderHandler: RequestHandler = async (req, res, next) => {
  try {
    const payload = orderCreateSchema.parse(req.body);
    const order = await createOrder(req, payload);
    res.status(201).json({ data: order });
  } catch (err) {
    next(err);
  }
};

export const listOrdersHandler: RequestHandler = async (_req, res, next) => {
  try {
    const orders = await listOrders();
    res.json({ data: orders });
  } catch (err) {
    next(err);
  }
};

export const getOrderHandler: RequestHandler = async (req, res, next) => {
  try {
    const order = await getOrderDetail(req.params.id);
    if (!order) {
      throw createApiError(404, "NOT_FOUND", "Order not found");
    }
    res.json({ data: order });
  } catch (err) {
    next(err);
  }
};
