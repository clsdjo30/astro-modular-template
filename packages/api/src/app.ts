import express from "express";
import cors from "cors";
import { pinoHttp } from "pino-http";
import { env } from "./config/env.js";
import { db } from "./db/index.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { requestIdMiddleware } from "./middleware/request-id.middleware.js";
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
    customProps: (req) => ({ requestId: (req as { id?: string }).id })
  })
);
app.use(express.json());
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

app.use(errorMiddleware);
