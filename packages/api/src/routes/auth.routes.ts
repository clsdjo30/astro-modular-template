import { Router } from "express";
import { login, logout, me, registerDisabled } from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

export const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/logout", requireAuth, logout);
authRouter.get("/me", requireAuth, me);
authRouter.post("/register", registerDisabled);
