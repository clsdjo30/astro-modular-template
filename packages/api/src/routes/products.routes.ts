import { Router } from "express";
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  listProductsHandler,
  updateProductHandler
} from "../controllers/products.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

export const productsRouter = Router();

productsRouter.get("/", listProductsHandler);
productsRouter.get("/:id", getProductHandler);
productsRouter.post("/", requireAuth, requireRole("admin"), createProductHandler);
productsRouter.patch("/:id", requireAuth, requireRole("admin"), updateProductHandler);
productsRouter.delete("/:id", requireAuth, requireRole("admin"), deleteProductHandler);
