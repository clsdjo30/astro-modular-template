import type { RequestHandler } from "express";
import {
  addCartItem,
  cartAddSchema,
  cartUpdateSchema,
  getCart,
  removeCartItem,
  updateCartItem
} from "../services/cart.service.js";

export const getCartHandler: RequestHandler = (req, res, next) => {
  try {
    res.json({ data: getCart(req) });
  } catch (err) {
    next(err);
  }
};

export const addCartItemHandler: RequestHandler = async (req, res, next) => {
  try {
    const payload = cartAddSchema.parse(req.body);
    const summary = await addCartItem(req, payload.productId, payload.quantity);
    res.status(201).json({ data: summary });
  } catch (err) {
    next(err);
  }
};

export const updateCartItemHandler: RequestHandler = (req, res, next) => {
  try {
    const payload = cartUpdateSchema.parse(req.body);
    const summary = updateCartItem(req, req.params.productId, payload.quantity);
    res.json({ data: summary });
  } catch (err) {
    next(err);
  }
};

export const removeCartItemHandler: RequestHandler = (req, res, next) => {
  try {
    const summary = removeCartItem(req, req.params.productId);
    res.json({ data: summary });
  } catch (err) {
    next(err);
  }
};
