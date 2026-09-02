"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, MessageSquare } from "lucide-react";
import { formatDate, getConsultationStatusColor } from "@/lib/utils/format";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EmptyState from "@/components/ui/EmptyState";

interface Consultation {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  preferredDate: string | null;
  preferredTime: string | null;
  message: string | null;
  status: string;
  createdAt: string;
  service: { id: number; name: string; slug: string } | null;
}

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/consultations/my");
        const data = await res.json();
        if (data.success) setConsultations(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <LoadingSpinner size="lg" className="py-24" />;

  if (consultations.length === 0) {
    return (
      <EmptyState
        icon={<Calendar className="w-8 h-8" />}
        title="No Consultation Requests"
        description="You haven't booked any consultations yet. Schedule a session with Dr. Preity today."
        action={
          <Link
            href="/consultation"
            className="bg-primary-700 hover:bg-primary-800 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
          >
            Book Consultation
          </Link>
        }
      />
    );
  }

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-gray-900 mb-6">My Consultations</h1>

      <div className="space-y-4">
        {consultations.map((c) => (
          <div key={c.id} className="border border-purple-100 rounded-2xl p-5">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="font-serif font-bold text-gray-900">
                  {c.service?.name || "General Consultation"}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Submitted on {formatDate(c.createdAt)}
                </p>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getConsultationStatusColor(c.status)}`}>
                {c.status}
              </span>
            </div>

            {c.preferredDate && (
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Preferred Date:</span>{" "}
                {formatDate(c.preferredDate)}
                {c.preferredTime && ` at ${c.preferredTime}`}
              </p>
            )}

            {c.message && (
              <div className="mt-3 pt-3 border-t border-purple-50 flex items-start gap-2">
                <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                <p className="text-sm text-gray-600 line-clamp-2">{c.message}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
