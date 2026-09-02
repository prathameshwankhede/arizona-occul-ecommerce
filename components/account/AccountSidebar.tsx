"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Calendar, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const LINKS = [
  { href: "/account", label: "Dashboard", icon: LayoutDashboard },
  { href: "/account/orders", label: "My Orders", icon: ShoppingBag },
  { href: "/account/consultations", label: "Consultations", icon: Calendar },
  { href: "/account/profile", label: "Profile & Address", icon: User },
];

export default function AccountSidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  return (
    <aside className="w-full md:w-64 bg-white rounded-3xl p-6 border border-purple-100 shadow-sm h-fit">
      <div className="pb-6 mb-6 border-b border-purple-50">
        <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-800 font-serif font-bold text-xl flex items-center justify-center mb-3">
          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>
        <h3 className="font-serif font-bold text-gray-900 truncate">
          {user?.name || "Customer"}
        </h3>
        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
      </div>

      <nav className="space-y-1.5">
        {LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary-700 text-white shadow-sm"
                  : "text-gray-600 hover:text-primary-700 hover:bg-purple-50"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{link.label}</span>
            </Link>
          );
        })}

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors mt-4 pt-4 border-t border-purple-50"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </nav>
    </aside>
  );
}
