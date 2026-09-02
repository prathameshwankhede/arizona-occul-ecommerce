"use client";

import { useState } from "react";
import { Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";
import { getWhatsAppLink } from "@/lib/utils/format";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const waLink = getWhatsAppLink(
    "8390125338",
    "Hello Dr. Preity, I would like to get in touch regarding Arizona Occul services."
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-950 via-primary-900 to-primary-950 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-gold-400 text-xs sm:text-sm font-semibold tracking-widest uppercase block mb-3">
            ✦ We are Here to Assist You ✦
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
            Contact Arizona Occul
          </h1>
          <p className="text-purple-200 text-base sm:text-lg max-w-xl mx-auto font-light">
            Connect directly with Dr. Preity and our support team for consultations, queries, and sacred product assistance.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-8">
            {/* Contact Details Card */}
            <div className="md:col-span-5 space-y-6">
              <div className="bg-white p-7 rounded-3xl border border-purple-100 shadow-sm space-y-6">
                <h2 className="font-serif text-2xl font-bold text-gray-900">
                  Direct Contact Information
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-primary-700 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs text-gray-500 uppercase font-semibold">Consultation Helpline</h4>
                      <a href="tel:+918390125338" className="text-gray-900 font-semibold text-base hover:text-primary-700">
                        +91 8390125338
                      </a>
                      <p className="text-xs text-gray-500 mt-0.5">Call & WhatsApp supported</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-primary-700 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs text-gray-500 uppercase font-semibold">Email Enquiries</h4>
                      <a href="mailto:info@arizonaoccul.com" className="text-gray-900 font-semibold text-base hover:text-primary-700">
                        info@arizonaoccul.com
                      </a>
                      <p className="text-xs text-gray-500 mt-0.5">Response within 24 business hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-primary-700 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs text-gray-500 uppercase font-semibold">Operating Hours</h4>
                      <p className="text-gray-900 font-medium text-sm">
                        Monday – Saturday: 10:00 AM – 7:00 PM IST
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">Prior appointment required for consultations</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-purple-50">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-sm"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>Instant WhatsApp Message</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Enquiry Form */}
            <div className="md:col-span-7">
              <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm">
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">
                  Send an Enquiry
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Fill out your details below and our team will get back to you promptly.
                </p>

                {submitted ? (
                  <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-2xl text-center space-y-2">
                    <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
                    <h3 className="font-bold text-lg">Thank You for Reaching Out</h3>
                    <p className="text-sm">
                      We have received your message and will contact you via WhatsApp or phone shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Meera Sharma"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-600 text-sm"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                          Phone Number (WhatsApp) *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. 9876543210"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-600 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. meera@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-600 text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                        Your Query or Message *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please describe your consultation interest or product question..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-600 text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 bg-primary-700 hover:bg-primary-800 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-sm w-full"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
