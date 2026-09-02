"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Sparkles, Truck } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EmptyState from "@/components/ui/EmptyState";
import { formatPrice } from "@/lib/utils/format";
import { useCart } from "@/hooks/useCart";

export default function CartPage() {
  const { items, subtotal, loading, fetchCart, updateQuantity, removeItem } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchCart();
  }, [fetchCart]);

  if (!mounted || loading) {
    return (
      <PublicLayout>
        <LoadingSpinner size="lg" className="py-32" />
      </PublicLayout>
    );
  }

  if (items.length === 0) {
    return (
      <PublicLayout>
        <div className="py-16 bg-cream-50">
          <EmptyState
            icon={<ShoppingBag className="w-8 h-8" />}
            title="Your Cart is Empty"
            description="Explore our authentic spiritual products — Rudraksha, Crystals, Yantra and more."
            action={
              <Link
                href="/shop"
                className="bg-primary-700 hover:bg-primary-800 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
              >
                Browse Shop
              </Link>
            }
          />
        </div>
      </PublicLayout>
    );
  }

  const sub = parseFloat(subtotal) || 0;
  const shipping = sub >= 999 ? 0 : 99;
  const total = sub + shipping;

  return (
    <PublicLayout>
      <section className="py-10 bg-cream-50 min-h-[70vh]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item: any) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-purple-100 p-4 flex gap-4"
                >
                  {/* Image */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-purple-50 relative overflow-hidden shrink-0">
                    {item.product?.image ? (
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-primary-300" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <Link
                        href={`/shop/${item.product?.slug}`}
                        className="font-serif font-semibold text-gray-900 hover:text-primary-700 text-sm line-clamp-2"
                      >
                        {item.product?.name}
                      </Link>
                      <p className="text-sm font-semibold text-primary-800 mt-1">
                        {formatPrice(item.product?.salePrice || item.product?.price || item.price)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center text-xs font-semibold border-x border-gray-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-1.5"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div>
              <div className="bg-white rounded-2xl border border-purple-100 p-6 sticky top-24 shadow-sm">
                <h2 className="font-serif text-xl font-bold text-gray-900 mb-5">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({items.length} items)</span>
                    <span>{formatPrice(String(sub))}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" /> Shipping
                    </span>
                    <span>{shipping === 0 ? <span className="text-green-600 font-medium">FREE</span> : formatPrice(String(shipping))}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-gold-700 bg-gold-50 border border-gold-200 rounded-lg px-3 py-1.5">
                      Add ₹{(999 - sub).toFixed(0)} more for free shipping!
                    </p>
                  )}
                  <div className="flex justify-between font-bold text-gray-900 text-base pt-3 border-t border-purple-100">
                    <span>Total</span>
                    <span>{formatPrice(String(total))}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full mt-6 inline-flex items-center justify-center gap-2 bg-primary-700 hover:bg-primary-800 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-sm text-sm"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/shop"
                  className="w-full mt-3 inline-flex items-center justify-center text-xs text-primary-700 hover:text-primary-800 font-medium py-2"
                >
                  ← Continue Shopping
                </Link>

                <p className="text-[10px] text-gray-400 text-center mt-4">
                  Payment: Cash on Delivery (COD)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
