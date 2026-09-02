"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Package, Eye, XCircle } from "lucide-react";
import { formatPrice, formatDate, getOrderStatusColor } from "@/lib/utils/format";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EmptyState from "@/components/ui/EmptyState";

interface Order {
  id: number;
  orderNumber: string;
  total: string;
  orderStatus: string;
  paymentStatus: string;
  createdAt: string;
  orderItems: { id: number; productName: string; quantity: number; price: string }[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/orders/my-orders");
        const data = await res.json();
        if (data.success) setOrders(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleCancel = async (id: number) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;
    const res = await fetch(`/api/orders/${id}/cancel`, { method: "PATCH" });
    const data = await res.json();
    if (data.success) {
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, orderStatus: "CANCELLED" } : o))
      );
    }
  };

  if (loading) return <LoadingSpinner size="lg" className="py-24" />;

  if (orders.length === 0) {
    return (
      <EmptyState
        icon={<Package className="w-8 h-8" />}
        title="No Orders Yet"
        description="Your order history is empty. Browse our shop to find authentic spiritual products."
        action={
          <Link
            href="/shop"
            className="bg-primary-700 hover:bg-primary-800 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
          >
            Browse Shop
          </Link>
        }
      />
    );
  }

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-gray-900 mb-6">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-purple-100 rounded-2xl p-5 hover:shadow-sm transition-shadow"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div>
                <span className="text-xs text-gray-500">Order</span>
                <h3 className="font-mono text-sm font-bold text-gray-900">
                  #{order.orderNumber}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getOrderStatusColor(order.orderStatus)}`}
                >
                  {order.orderStatus}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <div className="flex gap-6 text-gray-600">
                <span>{formatDate(order.createdAt)}</span>
                <span className="font-semibold text-gray-900">
                  {formatPrice(order.total)}
                </span>
                <span>{order.orderItems.length} item(s)</span>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/account/orders/${order.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-700 hover:text-primary-800 border border-primary-200 px-3 py-1.5 rounded-lg"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View
                </Link>
                {["PENDING", "CONFIRMED"].includes(order.orderStatus) && (
                  <button
                    onClick={() => handleCancel(order.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 border border-red-200 px-3 py-1.5 rounded-lg"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
