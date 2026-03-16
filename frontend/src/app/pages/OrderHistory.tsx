import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../store/AuthContext";
import { apiFetch } from "../api/client";
import { Package, ChevronRight, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";

interface OrderItem {
  product_id: string;
  quantity: number;
  unit_price: number;
}

interface Order {
  id: string;
  status: string;
  total_price: number;
  items: OrderItem[];
}

export const OrderHistory: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) return;
    apiFetch<Order[]>("/api/orders/mine")
      .then(setOrders)
      .catch(() => setError("Could not load orders."))
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);

  const statusColour = (s: string) => {
    if (s === "delivered") return "bg-emerald-100 text-emerald-700";
    if (s === "pending")   return "bg-amber-100 text-amber-700";
    return "bg-gray-100 text-gray-700";
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h2 className="text-3xl mb-4">Sign in to view your orders</h2>
        <Link to="/login" className="text-emerald-700 hover:underline">Sign in →</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl text-gray-900 mb-10">My Orders</h1>

      {loading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border-2 border-emerald-100 h-24 animate-pulse" />
          ))}
        </div>
      )}

      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-emerald-100">
          <div className="bg-emerald-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-emerald-300" />
          </div>
          <h3 className="text-2xl text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-600 mb-6">Your completed orders will appear here.</p>
          <Link
            to="/products"
            className="bg-emerald-700 text-white px-8 py-3 rounded-full hover:bg-emerald-800 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      )}

      <div className="space-y-4">
        {orders.map((order) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border-2 border-emerald-100 shadow-sm p-6 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-emerald-50 p-3 rounded-xl">
                <Package className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-mono mb-1">{order.id.slice(0, 8)}…</p>
                <p className="text-gray-900">{order.items.length} item{order.items.length !== 1 ? "s" : ""}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${statusColour(order.status)}`}>
                  {order.status}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg text-emerald-700">{formatPrice(order.total_price)}</p>
              <ChevronRight className="w-4 h-4 text-gray-400 mt-1 ml-auto" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};