import { env } from "../config/env";

const API_BASE = env.publicApiBaseUrl;

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: { message: "Request failed" } }));
    const message = error?.error?.message || "Request failed";
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}
