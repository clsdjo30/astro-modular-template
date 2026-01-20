import type { RequestHandler } from "express";

interface RateLimitOptions {
  windowMs: number;
  max: number;
}

interface RateEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateEntry>();

export function rateLimit(options: RateLimitOptions): RequestHandler {
  return (req, res, next) => {
    const key = req.ip ?? "unknown";
    const now = Date.now();
    const entry = store.get(key);

    if (!entry || entry.resetAt <= now) {
      store.set(key, { count: 1, resetAt: now + options.windowMs });
      next();
      return;
    }

    entry.count += 1;
    if (entry.count > options.max) {
      res.status(429).json({
        error: {
          code: "RATE_LIMIT",
          message: "Too many requests"
        }
      });
      return;
    }

    next();
  };
}
