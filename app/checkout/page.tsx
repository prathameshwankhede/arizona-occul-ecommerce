"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Truck, CreditCard, AlertCircle, Sparkles } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { formatPrice } from "@/lib/utils/format";
import { useCart } from "@/hooks/useCart";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, fetchCart, loading: cartLoading } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    shippingName: "",
    shippingPhone: "",
    shippingAddress: "",
    shippingCity: "",
    shippingState: "",
    shippingPincode: "",
    notes: "",
  });

  useEffect(() => {
    fetchCart();
    // Pre-fill from profile
    fetch("/api/users/profile")
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.data) {
          setForm((f) => ({
            ...f,
            shippingName: d.data.name || "",
            shippingPhone: d.data.phone || "",
            shippingAddress: d.data.address || "",
            shippingCity: d.data.city || "",
            shippingState: d.data.state || "",
            shippingPincode: d.data.pincode || "",
          }));
        }
      });
  }, [fetchCart]);

  const sub = parseFloat(subtotal) || 0;
  const shipping = sub >= 999 ? 0 : 99;
  const total = sub + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          paymentMethod: "COD",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to place order");
      }

      router.push(`/checkout/success?order=${data.data.orderNumber}`);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (cartLoading) {
    return (
      <PublicLayout>
        <LoadingSpinner size="lg" className="py-32" />
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <section className="py-10 bg-cream-50 min-h-[70vh]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Shipping Form */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl border border-purple-100 p-6">
                  <h2 className="font-serif text-xl font-bold text-gray-900 mb-5">
                    Shipping Details
                  </h2>
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.shippingName}
                          onChange={(e) => setForm({ ...form, shippingName: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-600 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                          Phone (WhatsApp) *
                        </label>
                        <input
                          type="tel"
                          required
                          value={form.shippingPhone}
                          onChange={(e) => setForm({ ...form, shippingPhone: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-600 text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                        Address *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={form.shippingAddress}
                        onChange={(e) => setForm({ ...form, shippingAddress: e.target.value })}
                        placeholder="Flat / House, Building, Street, Landmark"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-600 text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">City *</label>
                        <input
                          type="text"
                          required
                          value={form.shippingCity}
                          onChange={(e) => setForm({ ...form, shippingCity: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-600 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">State *</label>
                        <input
                          type="text"
                          required
                          value={form.shippingState}
                          onChange={(e) => setForm({ ...form, shippingState: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-600 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Pincode *</label>
                        <input
                          type="text"
                          required
                          value={form.shippingPincode}
                          onChange={(e) => setForm({ ...form, shippingPincode: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-600 text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                        Order Notes (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        placeholder="Any special instructions..."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-600 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-purple-100 p-6">
                  <h2 className="font-serif text-xl font-bold text-gray-900 mb-3">
                    Payment Method
                  </h2>
                  <div className="flex items-center gap-3 bg-purple-50 p-4 rounded-xl border border-purple-200">
                    <CreditCard className="w-5 h-5 text-primary-700" />
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">Cash on Delivery (COD)</h3>
                      <p className="text-xs text-gray-500">Pay when you receive your order</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <div className="bg-white rounded-2xl border border-purple-100 p-6 sticky top-24 shadow-sm">
                  <h2 className="font-serif text-xl font-bold text-gray-900 mb-5">
                    Order Summary
                  </h2>

                  <div className="space-y-3 mb-4">
                    {items.map((item: any) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600 truncate max-w-[180px]">
                          {item.product?.name} × {item.quantity}
                        </span>
                        <span className="text-gray-900 font-medium">
                          {formatPrice(String(parseFloat(item.product?.salePrice || item.product?.price || item.price) * item.quantity))}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 text-sm pt-4 border-t border-purple-100">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>{formatPrice(String(sub))}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? <span className="text-green-600">FREE</span> : formatPrice(String(shipping))}</span>
                    </div>
                    <div className="flex justify-between font-bold text-gray-900 text-base pt-3 border-t border-purple-100">
                      <span>Total</span>
                      <span>{formatPrice(String(total))}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || items.length === 0}
                    className="w-full mt-6 inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 disabled:opacity-60 text-primary-950 font-bold py-3.5 rounded-xl transition-colors shadow-sm text-sm"
                  >
                    {loading ? "Processing Order..." : "Place Order (COD)"}
                  </button>

                  <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Secure checkout by Arizona Occul</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </PublicLayout>
  );
}
