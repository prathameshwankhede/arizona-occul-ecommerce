"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Tag,
  Star,
  ShoppingBag,
  Users,
  MessageSquare,
  LogOut,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const navLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Tag },
  { href: "/admin/services", label: "Services", icon: Star },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/consultations", label: "Consultations", icon: MessageSquare },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/admin/login";
    } catch {
      window.location.href = "/admin/login";
    }
  };

  return (
    <aside className="w-64 min-h-screen bg-[#1a0a2e] flex flex-col shadow-2xl">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-purple-900/50">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400 to-yellow-600 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-purple-900" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none tracking-wider font-serif">
              ARIZONA OCCUL
            </p>
            <p className="text-purple-400 text-xs mt-0.5 tracking-widest uppercase">
              Admin Panel
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {navLinks.map(({ href, label, icon: Icon, exact }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
              isActive(href, exact)
                ? "bg-primary-700 text-white shadow-lg shadow-purple-900/50"
                : "text-purple-300 hover:bg-purple-900/40 hover:text-white"
            )}
          >
            <Icon
              className={cn(
                "w-4 h-4 flex-shrink-0 transition-colors",
                isActive(href, exact)
                  ? "text-gold-400"
                  : "text-purple-400 group-hover:text-purple-200"
              )}
            />
            {label}
          </Link>
        ))}
      </nav>

      {/* Bottom: View Site + Logout */}
      <div className="px-3 py-4 border-t border-purple-900/50 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-purple-400 hover:bg-purple-900/40 hover:text-white transition-all"
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          View Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
