import { apiFetch } from "./client";
import { Product } from "../types";

interface ProductListParams {
  category?: string;
  search?:   string;
  sort?:     string;
}

export function fetchProducts(params: ProductListParams = {}): Promise<Product[]> {
  const query = new URLSearchParams();
  if (params.category) query.set("category", params.category);
  if (params.search)   query.set("search",   params.search);
  if (params.sort)     query.set("sort",      params.sort);

  const qs = query.toString();
  return apiFetch<Product[]>(`/api/products${qs ? `?${qs}` : ""}`);
}

export function fetchProductById(id: string): Promise<Product> {
  return apiFetch<Product>(`/api/products/${id}`);
}