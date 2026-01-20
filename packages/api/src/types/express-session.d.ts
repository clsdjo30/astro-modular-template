import "express-session";

declare module "express-session" {
  interface SessionData {
    user?: {
      id: string;
      email: string;
      role: "admin" | "customer";
    };
    cart?: {
      items: Array<{
        productId: string;
        quantity: number;
        unitPriceCents: number;
      }>;
      currency: "EUR";
      updatedAt: string;
    };
  }
}
