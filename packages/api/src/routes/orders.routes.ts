import { Router } from "express";
import { createOrderHandler, getOrderHandler, listOrdersHandler } from "../controllers/orders.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { rateLimit } from "../middleware/rate-limit.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

export const ordersRouter = Router();

ordersRouter.post("/", rateLimit({ windowMs: 60_000, max: 10 }), createOrderHandler);
ordersRouter.get("/", requireAuth, requireRole("admin"), listOrdersHandler);
ordersRouter.get("/:id", requireAuth, requireRole("admin"), getOrderHandler);
