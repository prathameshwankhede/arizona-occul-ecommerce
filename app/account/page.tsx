"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { ShoppingBag, Calendar, User, ArrowRight, Sparkles } from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function AccountDashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner size="lg" className="py-24" />;
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs text-gold-600 font-semibold tracking-wider uppercase mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sacred Portal</span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-gray-900">
          Namaste, {user?.name || "Seeker"}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Welcome to your Arizona Occul customer dashboard. Manage your orders, consultation sessions, and personal details.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-purple-50/70 border border-purple-100 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-primary-700 text-white flex items-center justify-center mb-4">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-gray-900 text-lg mb-1">My Orders</h3>
            <p className="text-xs text-gray-600 mb-4">
              Track delivery of your energized Rudraksha, crystals, and sacred items.
            </p>
          </div>
          <Link
            href="/account/orders"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-700 hover:text-primary-800"
          >
            <span>View Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-purple-50/70 border border-purple-100 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-gold-600 text-white flex items-center justify-center mb-4">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-gray-900 text-lg mb-1">Consultations</h3>
            <p className="text-xs text-gray-600 mb-4">
              Check status of your appointment requests with Dr. Preity.
            </p>
          </div>
          <Link
            href="/account/consultations"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-700 hover:text-primary-800"
          >
            <span>View Consultations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-purple-50/70 border border-purple-100 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-gray-800 text-white flex items-center justify-center mb-4">
              <User className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-gray-900 text-lg mb-1">Profile & Address</h3>
            <p className="text-xs text-gray-600 mb-4">
              Keep your contact details and default shipping address up to date.
            </p>
          </div>
          <Link
            href="/account/profile"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-700 hover:text-primary-800"
          >
            <span>Update Profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-primary-900 to-purple-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-serif font-bold text-lg text-gold-300">
            Need Direct Guidance with Dr. Preity?
          </h4>
          <p className="text-xs text-purple-200 mt-1 max-w-lg">
            Schedule a personalized session for Astrology, Numerology, or Vastu alignment.
          </p>
        </div>
        <Link
          href="/consultation"
          className="shrink-0 bg-gold-500 hover:bg-gold-400 text-primary-950 text-xs font-bold px-6 py-3 rounded-xl transition-colors"
        >
          Book Consultation
        </Link>
      </div>
    </div>
  );
}
