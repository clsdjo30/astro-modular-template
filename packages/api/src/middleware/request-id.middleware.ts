import { randomUUID } from "node:crypto";
import type { RequestHandler } from "express";

export const requestIdMiddleware: RequestHandler = (req, res, next) => {
  const headerId = req.header("x-request-id");
  const requestId = headerId ?? randomUUID();
  (req as { id?: string }).id = requestId;
  res.setHeader("x-request-id", requestId);
  next();
};
