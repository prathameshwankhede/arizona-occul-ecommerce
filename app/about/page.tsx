import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, Award, ShieldCheck, HeartHandshake, Phone, ArrowRight, CheckCircle2 } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";
import { getWhatsAppLink } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "About Dr. Preity & Arizona Occul",
  description:
    "Learn about Dr. Preity, founder of Arizona Occul, and her journey bringing Vedic astrology, numerology, vastu, and spiritual wellness to seekers worldwide.",
};

export default function AboutPage() {
  const waLink = getWhatsAppLink(
    "8390125338",
    "Hello Dr. Preity, I would like to know more about Arizona Occul."
  );

  return (
    <PublicLayout>
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-primary-950 via-primary-900 to-primary-950 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-gold-400 text-xs sm:text-sm font-semibold tracking-widest uppercase block mb-3">
            ✦ Sacred Lineage & Modern Guidance ✦
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-6">
            About Arizona Occul & Dr. Preity
          </h1>
          <p className="text-purple-200 text-lg leading-relaxed font-light">
            Guiding seekers across the globe towards personal alignment, holistic balance, and cosmic abundance.
          </p>
        </div>
      </section>

      {/* Philosophy & Story */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 flex justify-center">
              <div className="w-64 h-80 rounded-3xl bg-gradient-to-br from-primary-800 to-purple-950 border-4 border-gold-400/30 shadow-xl flex flex-col items-center justify-center text-center p-6 text-white">
                <div className="w-24 h-24 rounded-full bg-gold-500/20 border-2 border-gold-400 flex items-center justify-center font-serif text-3xl font-bold text-gold-300 mb-4">
                  Dr. P
                </div>
                <h3 className="font-serif text-2xl font-bold">Dr. Preity</h3>
                <p className="text-gold-300 text-xs mt-1 uppercase tracking-wider">
                  Lead Spiritual Mentor
                </p>
                <div className="mt-4 pt-4 border-t border-purple-700/50 text-xs text-purple-200">
                  Astrology • Numerology • Vastu
                </div>
              </div>
            </div>

            <div className="md:col-span-7 space-y-4">
              <h2 className="font-serif text-3xl font-bold text-gray-900">
                Better Energy • Better Life • Better You
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                At <strong>Arizona Occul</strong>, we perceive the universe as an intricately synchronized web of frequencies and vibrations. Every birth moment encodes a blueprint, every space resonates with architectural currents, and every number we interact with casts an energetic imprint.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Founded by <strong>Dr. Preity</strong>, Arizona Occul was conceived to distill these timeless spiritual sciences into accessible, pragmatic, and life-affirming guidance. We steer away from fatalism or dogmatic superstitions—empowering you with scientific Vedic wisdom and conscious action.
              </p>
            </div>
          </div>

          {/* Pillars */}
          <div className="grid md:grid-cols-3 gap-6 pt-4">
            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm">
              <Award className="w-10 h-10 text-gold-600 mb-4" />
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                To illuminate your path using authentic cosmic tools, helping you overcome obstacles in health, relationships, finances, and destiny.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm">
              <ShieldCheck className="w-10 h-10 text-gold-600 mb-4" />
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">Authenticity First</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We strictly offer natural, genuine gemstones, consecrated Rudraksha beads, and sacred Yantras energized with Vedic rites.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm">
              <HeartHandshake className="w-10 h-10 text-gold-600 mb-4" />
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">Empathy & Respect</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Every consultation is conducted in a compassionate, non-judgmental atmosphere with absolute personal privacy.
              </p>
            </div>
          </div>

          {/* Core Areas */}
          <div className="bg-primary-900 text-white rounded-3xl p-8 sm:p-12">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-6 text-center text-gold-300">
              Areas of Specialization
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-purple-100 text-sm">
              {[
                "Vedic Horoscope & Kundli Reading",
                "Name Spelling Balancing & Correction",
                "Mobile Number & Lucky Digit Synchronization",
                "Corporate Astronumerology & Brand Identity",
                "Commercial & Domestic Vastu Rectification",
                "Rudraksha Therapy & Mukhi Selection",
                "Crystal Healing & Gemstone Prescription",
                "Consecrated Yantra Installation Guidance",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-primary-800 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/consultation"
                className="bg-gold-500 hover:bg-gold-400 text-primary-950 font-bold px-7 py-3 rounded-xl transition-colors"
              >
                Book a Session
              </Link>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-xl transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp: 8390125338</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
