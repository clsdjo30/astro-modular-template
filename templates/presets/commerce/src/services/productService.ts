import { apiRequest } from "./apiClient";

export interface Product {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  imageUrl?: string | null;
  isActive: boolean;
}

interface ProductResponse {
  data: Product;
}

interface ProductListResponse {
  data: Product[];
}

export async function listProducts(): Promise<Product[]> {
  const response = await apiRequest<ProductListResponse>("/api/v1/products");
  return response.data;
}

export async function getProduct(id: string): Promise<Product> {
  const response = await apiRequest<ProductResponse>(`/api/v1/products/${id}`);
  return response.data;
}
