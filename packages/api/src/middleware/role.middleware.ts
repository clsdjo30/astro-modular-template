import type { RequestHandler } from "express";
import type { UserRole } from "../repositories/user.repo.js";

export const requireRole = (role: UserRole): RequestHandler => {
  return (req, res, next) => {
    const user = req.session.user;
    if (!user) {
      res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Unauthorized" } });
      return;
    }
    if (user.role !== role) {
      res.status(403).json({ error: { code: "FORBIDDEN", message: "Forbidden" } });
      return;
    }
    next();
  };
};
