// ─── Price Formatter ────────────────────

export function formatPrice(value: string | number | null | undefined): string {
  if (value == null || value === "") return "₹0.00";
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "₹0.00";
  return `₹${num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

// ─── Date Formatter ─────────────────────

export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(date: string | Date | null | undefined): string {
  if (!date) return "—";
  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─── Status Badge Colors ────────────────

export function getOrderStatusColor(status: string): string {
  const map: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    PROCESSING: "bg-indigo-100 text-indigo-800",
    SHIPPED: "bg-cyan-100 text-cyan-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };
  return map[status] ?? "bg-gray-100 text-gray-800";
}

export function getConsultationStatusColor(status: string): string {
  const map: Record<string, string> = {
    NEW: "bg-purple-100 text-purple-800",
    CONTACTED: "bg-blue-100 text-blue-800",
    CONFIRMED: "bg-indigo-100 text-indigo-800",
    COMPLETED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };
  return map[status] ?? "bg-gray-100 text-gray-800";
}

// ─── WhatsApp Link ──────────────────────

export function getWhatsAppLink(
  phone: string = "8390125338",
  message?: string
): string {
  const encoded = message ? encodeURIComponent(message) : "";
  return `https://wa.me/${phone}${encoded ? `?text=${encoded}` : ""}`;
}

// ─── Truncate ────────────────────────────

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}
