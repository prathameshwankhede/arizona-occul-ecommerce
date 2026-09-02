"use client";

import { useState, useEffect, Suspense } from "react";
import { Phone, Calendar, Clock, Send, CheckCircle2, MessageSquare, Sparkles } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";
import { getWhatsAppLink } from "@/lib/utils/format";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface ServiceOption {
  id: number;
  name: string;
  slug: string;
}

export default function ConsultationPage() {
  return (
    <Suspense fallback={<PublicLayout><LoadingSpinner size="lg" className="py-32" /></PublicLayout>}>
      <ConsultationPageInner />
    </Suspense>
  );
}

function ConsultationPageInner() {
  const searchParams = useSearchParams();
  const preSelectedService = searchParams.get("service");

  const [services, setServices] = useState<ServiceOption[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    serviceId: preSelectedService || "",
    name: "",
    phone: "",
    email: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setServices(d.data);
      });
  }, []);

  const waLink = getWhatsAppLink(
    "8390125338",
    "Hello Dr. Preity, I would like to book a spiritual consultation."
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const body: any = {
        name: form.name,
        phone: form.phone,
      };
      if (form.serviceId) body.serviceId = parseInt(form.serviceId);
      if (form.email) body.email = form.email;
      if (form.preferredDate) body.preferredDate = form.preferredDate;
      if (form.preferredTime) body.preferredTime = form.preferredTime;
      if (form.message) body.message = form.message;

      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit consultation request.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-950 via-primary-900 to-primary-950 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-gold-400 text-xs sm:text-sm font-semibold tracking-widest uppercase block mb-3">
            ✦ Schedule Your Sacred Session ✦
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
            Book a Consultation
          </h1>
          <p className="text-purple-200 text-base sm:text-lg max-w-xl mx-auto font-light">
            Begin your journey towards balance and transformation with a private session guided by Dr. Preity.
          </p>
        </div>
      </section>

      {/* WhatsApp Quick CTA */}
      <section className="bg-green-50 border-y border-green-200 py-4">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
          <p className="text-sm text-green-800">
            <strong>Prefer WhatsApp?</strong> Connect directly with Dr. Preity for instant scheduling:
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-xl text-sm transition-colors"
          >
            <Phone className="w-4 h-4" />
            WhatsApp: 8390125338
          </a>
        </div>
      </section>

      {/* Form */}
      <section className="py-14 bg-cream-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-purple-100 p-6 sm:p-10 shadow-sm">
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto" />
                <h2 className="font-serif text-2xl font-bold text-gray-900">
                  Request Submitted Successfully!
                </h2>
                <p className="text-gray-600 text-sm max-w-md mx-auto">
                  Dr. Preity will contact you via WhatsApp within 24 hours to confirm your session. Thank you for choosing Arizona Occul.
                </p>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors mt-4"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp Dr. Preity Now
                </a>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="font-serif text-2xl font-bold text-gray-900">
                    Consultation Request Form
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Fill in your details and Dr. Preity will reach out to schedule your session.
                  </p>
                </div>

                {error && (
                  <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                      Service Interested In
                    </label>
                    <select
                      value={form.serviceId}
                      onChange={(e) => setForm({ ...form, serviceId: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-600 text-sm bg-white"
                    >
                      <option value="">Select a service (optional)</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-600 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-600 text-sm"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={form.preferredDate}
                        onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-600 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                        Preferred Time
                      </label>
                      <select
                        value={form.preferredTime}
                        onChange={(e) => setForm({ ...form, preferredTime: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-600 text-sm bg-white"
                      >
                        <option value="">Select a time slot</option>
                        <option value="10:00 AM - 11:00 AM">10:00 AM – 11:00 AM</option>
                        <option value="11:00 AM - 12:00 PM">11:00 AM – 12:00 PM</option>
                        <option value="12:00 PM - 01:00 PM">12:00 PM – 01:00 PM</option>
                        <option value="02:00 PM - 03:00 PM">02:00 PM – 03:00 PM</option>
                        <option value="03:00 PM - 04:00 PM">03:00 PM – 04:00 PM</option>
                        <option value="04:00 PM - 05:00 PM">04:00 PM – 05:00 PM</option>
                        <option value="05:00 PM - 06:00 PM">05:00 PM – 06:00 PM</option>
                        <option value="06:00 PM - 07:00 PM">06:00 PM – 07:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                      Your Message / Concern
                    </label>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Briefly describe what guidance you're seeking..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-600 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary-700 hover:bg-primary-800 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-sm text-sm"
                  >
                    <Send className="w-4 h-4" />
                    {loading ? "Submitting..." : "Submit Consultation Request"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
