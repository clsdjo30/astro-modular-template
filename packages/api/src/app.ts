import express from "express";
import cors from "cors";
import { pinoHttp } from "pino-http";
import { env } from "./config/env.js";
import type { IncomingMessage } from "node:http";
import { db } from "./db/index.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { requestIdMiddleware } from "./middleware/request-id.middleware.js";
import { buildSessionMiddleware } from "./middleware/session.middleware.js";
import { authRouter } from "./routes/auth.routes.js";
import { cartRouter } from "./routes/cart.routes.js";
import { productsRouter } from "./routes/products.routes.js";
import { logger } from "./utils/logger.js";

const allowedOrigins = env.apiAllowedOrigin
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

export const app = express();

app.use(requestIdMiddleware);
app.use(
  pinoHttp({
    logger,
    customProps: (req: IncomingMessage) => ({ requestId: (req as { id?: string }).id })
  })
);
app.use(express.json());
app.use(buildSessionMiddleware());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS origin not allowed"));
    },
    credentials: true
  })
);

app.get("/healthz", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/readyz", async (_req, res, next) => {
  try {
    await db.raw("select 1");
    res.json({ status: "ready" });
  } catch (err) {
    next(err);
  }
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/products", productsRouter);

app.use(errorMiddleware);
