import type { Metadata } from "next";
import {
  Users,
  Package,
  ShoppingBag,
  Clock,
  MessageSquare,
  IndianRupee,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard | Arizona Occul Admin",
};

interface DashboardStats {
  totalCustomers: number;
  totalProducts: number;
  totalOrders: number;
  pendingOrders: number;
  totalConsultations: number;
  totalRevenue: number;
}

interface RecentOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  total: number;
  status: string;
  createdAt: string;
}

async function getDashboardData(): Promise<{
  stats: DashboardStats;
  recentOrders: RecentOrder[];
}> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/admin/dashboard`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  } catch {
    return {
      stats: {
        totalCustomers: 0,
        totalProducts: 0,
        totalOrders: 0,
        pendingOrders: 0,
        totalConsultations: 0,
        totalRevenue: 0,
      },
      recentOrders: [],
    };
  }
}

const statCards = [
  {
    key: "totalCustomers",
    label: "Total Customers",
    icon: Users,
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
    text: "text-blue-700",
  },
  {
    key: "totalProducts",
    label: "Total Products",
    icon: Package,
    color: "from-purple-500 to-purple-700",
    bg: "bg-purple-50",
    text: "text-purple-700",
  },
  {
    key: "totalOrders",
    label: "Total Orders",
    icon: ShoppingBag,
    color: "from-emerald-500 to-emerald-600",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
  },
  {
    key: "pendingOrders",
    label: "Pending Orders",
    icon: Clock,
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
    text: "text-amber-700",
  },
  {
    key: "totalConsultations",
    label: "Consultations",
    icon: MessageSquare,
    color: "from-pink-500 to-rose-500",
    bg: "bg-pink-50",
    text: "text-pink-700",
  },
  {
    key: "totalRevenue",
    label: "Total Revenue",
    icon: IndianRupee,
    color: "from-gold-400 to-yellow-600",
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    isRevenue: true,
  },
];

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  PROCESSING: "bg-purple-100 text-purple-800",
  SHIPPED: "bg-indigo-100 text-indigo-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export default async function AdminDashboard() {
  const { stats, recentOrders } = await getDashboardData();

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 font-serif">
          Dashboard
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Welcome back! Here's what's happening with Arizona Occul.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {statCards.map(({ key, label, icon: Icon, color, bg, text, isRevenue }) => {
          const value = stats[key as keyof DashboardStats];
          return (
            <div
              key={key}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-md`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {isRevenue ? `₹${Number(value).toLocaleString("en-IN")}` : value}
                </p>
                <p className="text-sm text-gray-500 mt-0.5">{label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary-700" />
            <h2 className="font-semibold text-gray-800">Recent Orders</h2>
          </div>
          <a
            href="/admin/orders"
            className="text-sm text-primary-700 hover:text-primary-800 font-medium"
          >
            View all →
          </a>
        </div>

        {recentOrders.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <ShoppingBag className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No orders yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                    Order #
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                    Customer
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                    Date
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                    Total
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono font-medium text-primary-700">
                      #{order.orderNumber}
                    </td>
                    <td className="px-6 py-4 text-gray-800">{order.customerName}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      ₹{Number(order.total).toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          statusColors[order.status] ?? "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
