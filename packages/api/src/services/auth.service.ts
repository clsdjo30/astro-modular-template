import argon2 from "argon2";
import { findUserByEmail, type UserRecord } from "../repositories/user.repo.js";

export async function authenticateUser(
  email: string,
  password: string
): Promise<UserRecord | null> {
  const user = await findUserByEmail(email);
  if (!user) return null;
  if (!user.passwordHash) return null;

  let valid = false;
  try {
    valid = await argon2.verify(user.passwordHash, password, {
      type: argon2.argon2id
    });
  } catch {
    return null;
  }
  if (!valid) return null;

  return user;
}

// OAuth providers can be added here later without changing core login flow.
