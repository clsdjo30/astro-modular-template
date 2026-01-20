import { db } from "../db/index.js";

export type UserRole = "admin" | "customer";

export interface UserRecord {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  const user = await db<UserRecord>("users").where({ email }).first();
  return user ?? null;
}
