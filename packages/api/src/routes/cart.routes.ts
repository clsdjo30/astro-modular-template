import { Router } from "express";
import {
  addCartItemHandler,
  getCartHandler,
  removeCartItemHandler,
  updateCartItemHandler
} from "../controllers/cart.controller.js";

export const cartRouter = Router();

cartRouter.get("/", getCartHandler);
cartRouter.post("/items", addCartItemHandler);
cartRouter.patch("/items/:productId", updateCartItemHandler);
cartRouter.delete("/items/:productId", removeCartItemHandler);
