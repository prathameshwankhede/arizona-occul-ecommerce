import Link from "next/link";
import { Sparkles, CheckCircle2, Phone, Calendar } from "lucide-react";
import { getWhatsAppLink } from "@/lib/utils/format";

export default function ConsultantSection() {
  const waLink = getWhatsAppLink(
    "8390125338",
    "Hello Dr. Preity, I would like to know more about booking a personal consultation."
  );

  return (
    <section className="py-20 bg-cream-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Avatar / Profile Placeholder */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-tr from-primary-900 via-primary-800 to-purple-700 shadow-2xl p-8 flex flex-col justify-between border-4 border-gold-400/30">
              <div className="flex justify-between items-start">
                <span className="text-gold-300 text-xs font-semibold tracking-widest uppercase bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-gold-400/30">
                  Lead Consultant
                </span>
                <Sparkles className="w-8 h-8 text-gold-400 animate-pulse" />
              </div>

              {/* Monogram emblem */}
              <div className="my-auto text-center">
                <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center text-primary-950 font-serif text-3xl font-bold shadow-xl border-4 border-white/20 mb-4">
                  Dr. P
                </div>
                <h3 className="font-serif text-3xl font-bold text-white mb-1">
                  Dr. Preity
                </h3>
                <p className="text-gold-300 text-sm font-medium">
                  Spiritual Mentor • Astrologer • Vastu Specialist
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                <p className="text-purple-100 text-xs italic">
                  &ldquo;Empowering individuals with clarity, divine cosmic harmony, and pragmatic remedial guidance.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Bio & Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-primary-700 font-semibold text-xs sm:text-sm tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-gold-500" />
              <span>Meet Your Spiritual Guide</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Transforming Lives Through Timeless Spiritual Sciences
            </h2>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Welcome to <strong>Arizona Occul</strong>. Under the direct guidance of <strong>Dr. Preity</strong>, 
              we bridge ancient Vedic astrology, cosmic numerology, sacred Vastu alignment, and spiritual remedies to 
              bring harmony and clarity into your life, relationships, and business pursuits.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                "Personalized Natal Chart Insights",
                "Advanced Numerology & Name Balancing",
                "Residential & Commercial Vastu Audits",
                "Authentic Energized Rudraksha & Crystals",
                "Cosmic Vibrations for Business Logos",
                "Compassionate & Confidential Consultations",
              ].map((point, index) => (
                <div key={index} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-gray-800">{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 flex flex-wrap gap-4 items-center">
              <Link
                href="/consultation"
                className="inline-flex items-center gap-2 bg-primary-700 hover:bg-primary-800 text-white font-semibold px-7 py-3.5 rounded-xl shadow-md transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule With Dr. Preity</span>
              </Link>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3.5 rounded-xl shadow-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp (8390125338)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
