import type { RequestHandler } from "express";
import { z } from "zod";
import { env } from "../config/env.js";
import { authenticateUser } from "../services/auth.service.js";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

function createAuthError(status: number, code: string, message: string): Error {
  const error = new Error(message) as Error & { status?: number; code?: string };
  error.status = status;
  error.code = code;
  return error;
}

function regenerateSession(req: Parameters<RequestHandler>[0]): Promise<void> {
  return new Promise((resolve, reject) => {
    req.session.regenerate((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

export const login: RequestHandler = async (req, res, next) => {
  try {
    const payload = loginSchema.parse(req.body);
    const user = await authenticateUser(payload.email, payload.password);
    if (!user) {
      throw createAuthError(401, "INVALID_CREDENTIALS", "Invalid email or password");
    }

    await regenerateSession(req);
    req.session.user = { id: user.id, email: user.email, role: user.role };

    res.json({ user: req.session.user });
  } catch (err) {
    next(err);
  }
};

export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);
      return;
    }
    res.clearCookie(env.sessionName);
    res.json({ status: "ok" });
  });
};

export const me: RequestHandler = (req, res) => {
  res.json({ user: req.session.user });
};

export const registerDisabled: RequestHandler = (_req, _res, next) => {
  next(createAuthError(403, "REGISTER_DISABLED", "Registration is disabled"));
};
