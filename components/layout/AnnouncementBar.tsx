import Link from "next/link";
import { getWhatsAppLink } from "@/lib/utils/format";
import { Phone } from "lucide-react";

export default function AnnouncementBar() {
  const waLink = getWhatsAppLink(
    "8390125338",
    "Hello Dr. Preity, I would like to book a consultation."
  );

  return (
    <div className="bg-gradient-to-r from-primary-800 via-primary-700 to-primary-800 text-white py-2 px-4 text-center">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
        <span className="text-gold-300 text-xs">✦</span>
        <p className="text-xs sm:text-sm font-medium">
          Book Your Spiritual Consultation with{" "}
          <span className="text-gold-300 font-semibold">Dr. Preity</span>
        </p>
        <span className="hidden sm:inline text-purple-300">|</span>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-green-300 hover:text-green-200 font-semibold text-xs sm:text-sm transition-colors"
        >
          <Phone className="w-3 h-3" />
          WhatsApp: 8390125338
        </a>
        <span className="text-gold-300 text-xs">✦</span>
      </div>
    </div>
  );
}
