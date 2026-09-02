"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, MessageCircle, ShoppingBag, ArrowRight } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>}>
      <OrderSuccessInner />
    </Suspense>
  );
}

function OrderSuccessInner() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") ?? "N/A";
  const whatsappMessage = encodeURIComponent(
    `Hello Dr. Preity! I just placed order #${orderNumber} on Arizona Occul. Looking forward to connecting with you!`
  );

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-11 h-11 text-green-500" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-primary-800 font-serif mb-3">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mb-2">
          Thank you for your order. We have received your request and will process it shortly.
        </p>

        <div className="inline-flex items-center gap-2 bg-primary-700/10 border border-primary-700/20 rounded-full px-5 py-2 mt-2 mb-8">
          <span className="text-sm text-gray-600">Order Number:</span>
          <span className="font-bold text-primary-800 font-mono tracking-wider">
            #{orderNumber}
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 text-left space-y-3">
          <h2 className="font-semibold text-gray-800 mb-4">What happens next?</h2>
          {[
            "Our team will review your order and confirm it shortly.",
            "You will receive updates via WhatsApp from Dr. Preity.",
            "Your items will be carefully packaged and dispatched.",
            "Cash on Delivery — pay when you receive your order.",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary-700 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </div>
              <p className="text-gray-600 text-sm">{step}</p>
            </div>
          ))}
        </div>

        <a
          href={`https://wa.me/918390125338?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors shadow-md shadow-green-500/30 mb-4"
        >
          <MessageCircle className="w-5 h-5" />
          Contact Dr. Preity on WhatsApp
        </a>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/account/orders"
            className="flex-1 flex items-center justify-center gap-2 bg-primary-800 hover:bg-primary-700 text-white font-semibold px-5 py-3 rounded-xl transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            View My Orders
          </Link>
          <Link
            href="/shop"
            className="flex-1 flex items-center justify-center gap-2 border border-primary-700 text-primary-800 hover:bg-primary-700/5 font-semibold px-5 py-3 rounded-xl transition-colors"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
