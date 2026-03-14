import { apiFetch } from "./client";
import { CartItem } from "../types";

interface OrderPayload {
  customer_name: string;
  phone:         string;
  address:       string;
  city:          string;
  items: {
    product_id: string;
    quantity:   number;
  }[];
}

export interface OrderResponse {
  id:          string;
  status:      string;
  total_price: number;
  items: {
    product_id: string;
    quantity:   number;
    unit_price: number;
  }[];
}

export function buildOrderPayload(
  formData: { customer_name: string; phone: string; address: string; city: string },
  cart: CartItem[]
): OrderPayload {
  return {
    ...formData,
    items: cart.map((item) => ({
      product_id: item.id,
      quantity:   item.quantity,
    })),
  };
}

export function createOrder(payload: OrderPayload): Promise<OrderResponse> {
  return apiFetch<OrderResponse>("/api/orders", {
    method: "POST",
    body:   JSON.stringify(payload),
  });
}