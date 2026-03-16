import React, { useEffect, useState } from "react";
import { useAuth } from "../store/AuthContext";
import { apiFetch } from "../api/client";
import { Link } from "react-router";
import { TrendingUp, ShoppingBag, DollarSign, Package } from "lucide-react";
import { motion } from "motion/react";

interface Summary {
  total_orders: number;
  total_revenue: number;
  orders_by_status: Record<string, number>;
  top_products: { name: string; total_ordered: number }[];
}

export const AdminSummary: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) return;
    apiFetch<Summary>("/api/admin/summary")
      .then(setSummary)
      .catch(() => setError("Could not load analytics."))
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(n);

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h2 className="text-3xl mb-4">Sign in to view analytics</h2>
        <Link to="/login" className="text-emerald-700 hover:underline">Sign in →</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl text-gray-900 mb-2">Store Analytics</h1>
      <p className="text-gray-600 mb-10">Live summary from the Ọjà Fresh database</p>

      {loading && (
        <div className="grid grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border-2 border-emerald-100 h-32 animate-pulse" />
          ))}
        </div>
      )}

      {error && <p className="text-red-600">{error}</p>}

      {summary && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              {
                label: "Total Orders",
                value: summary.total_orders,
                icon: ShoppingBag,
                colour: "bg-amber-50 text-amber-700",
              },
              {
                label: "Total Revenue",
                value: formatPrice(summary.total_revenue),
                icon: DollarSign,
                colour: "bg-emerald-50 text-emerald-700",
              },
              {
                label: "Pending Orders",
                value: summary.orders_by_status["pending"] ?? 0,
                icon: Package,
                colour: "bg-blue-50 text-blue-700",
              },
              {
                label: "Delivered",
                value: summary.orders_by_status["delivered"] ?? 0,
                icon: TrendingUp,
                colour: "bg-teal-50 text-teal-700",
              },
            ].map((kpi, i) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl border-2 border-emerald-100 shadow-sm p-6"
              >
                <div className={`inline-flex p-2.5 rounded-xl mb-4 ${kpi.colour}`}>
                  <kpi.icon className="w-5 h-5" />
                </div>
                <p className="text-2xl text-gray-900 mb-1">{kpi.value}</p>
                <p className="text-sm text-gray-500">{kpi.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-2xl border-2 border-emerald-100 shadow-sm p-8">
            <h2 className="text-xl text-gray-900 mb-6">Top Products by Orders</h2>
            {summary.top_products.length === 0 ? (
              <p className="text-gray-500">No order data yet.</p>
            ) : (
              <div className="space-y-4">
                {summary.top_products.map((p, i) => {
                  const max = summary.top_products[0]?.total_ordered || 1;
                  const pct = Math.round((p.total_ordered / max) * 100);
                  return (
                    <div key={p.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-900">
                          <span className="text-gray-400 mr-2">#{i + 1}</span>
                          {p.name}
                        </span>
                        <span className="text-sm text-emerald-700">{p.total_ordered} ordered</span>
                      </div>
                      <div className="bg-emerald-50 rounded-full h-2">
                        <div
                          className="bg-emerald-600 h-2 rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Orders by Status */}
          {Object.keys(summary.orders_by_status).length > 0 && (
            <div className="bg-white rounded-2xl border-2 border-emerald-100 shadow-sm p-8 mt-6">
              <h2 className="text-xl text-gray-900 mb-6">Orders by Status</h2>
              <div className="flex flex-wrap gap-3">
                {Object.entries(summary.orders_by_status).map(([status, count]) => (
                  <div
                    key={status}
                    className="bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-3 text-sm"
                  >
                    <span className="text-gray-900 capitalize">{status}</span>
                    <span className="ml-2 text-emerald-700 font-mono">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};