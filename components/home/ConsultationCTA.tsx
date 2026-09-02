import Link from "next/link";
import { Sparkles, Calendar, Phone } from "lucide-react";
import { getWhatsAppLink } from "@/lib/utils/format";

export default function ConsultationCTA() {
  const waLink = getWhatsAppLink(
    "8390125338",
    "Hello Dr. Preity, I would like to schedule a spiritual consultation."
  );

  return (
    <section className="py-20 bg-gradient-to-r from-primary-900 via-primary-800 to-primary-950 text-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 text-xs font-semibold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Begin Your Transformation Today</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight">
          Ready for Better Energy, a Better Life, and a Better You?
        </h2>

        <p className="text-purple-200 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Step into a space of sacred clarity. Schedule your one-on-one session with{" "}
          <strong className="text-white font-medium">Dr. Preity</strong> or connect directly via WhatsApp.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/consultation"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-amber-400 hover:from-gold-400 hover:to-amber-300 text-primary-950 font-bold px-8 py-4 rounded-xl shadow-lg transition-all"
          >
            <Calendar className="w-5 h-5" />
            <span>Book Consultation Now</span>
          </Link>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-4 rounded-xl transition-all shadow-md"
          >
            <Phone className="w-5 h-5" />
            <span>Direct WhatsApp (8390125338)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
