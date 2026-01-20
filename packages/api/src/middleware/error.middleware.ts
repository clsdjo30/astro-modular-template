import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { logger } from "../utils/logger.js";

interface ApiError extends Error {
  status?: number;
  code?: string;
  details?: Record<string, unknown>;
}

export const errorMiddleware: ErrorRequestHandler = (err: ApiError, _req, res, _next) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid request payload",
        details: err.flatten()
      }
    });
    return;
  }

  const status = err.status ?? 500;
  const code = err.code ?? "INTERNAL_ERROR";
  const message = err.message ?? "Unexpected error";

  logger.error({ err }, "request error");

  res.status(status).json({
    error: {
      code,
      message,
      details: err.details
    }
  });
};
