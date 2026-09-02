import Link from "next/link";
import { Phone, Mail, MapPin, Star } from "lucide-react";
import { getWhatsAppLink } from "@/lib/utils/format";

const SERVICES_LINKS = [
  { label: "Astrology", href: "/services/astrology" },
  { label: "Numerology", href: "/services/numerology" },
  { label: "Vastu Consultation", href: "/services/vastu-consultation" },
  { label: "Crystal Consultation", href: "/services/crystal-consultation" },
  { label: "Yantra & Mantra", href: "/services/yantra-mantra-consultation" },
];

const SHOP_LINKS = [
  { label: "Rudraksha", href: "/shop?category=rudraksha" },
  { label: "Crystals", href: "/shop?category=crystals" },
  { label: "Bracelets", href: "/shop?category=bracelets" },
  { label: "Yantra", href: "/shop?category=yantra" },
  { label: "Vastu Products", href: "/shop?category=vastu-products" },
];

export default function Footer() {
  const whatsAppLink = getWhatsAppLink(
    "8390125338",
    "Hello Dr. Preity, I would like to know more about Arizona Occul."
  );

  return (
    <footer className="bg-gradient-to-b from-primary-900 to-primary-950 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <h3 className="font-serif text-2xl font-bold text-white leading-tight">
                ARIZONA OCCUL
              </h3>
              <p className="text-gold-400 text-xs tracking-widest uppercase mt-1">
                Better Energy • Better Life • Better You
              </p>
            </div>
            <p className="text-purple-200 text-sm leading-relaxed mb-5">
              Guided by Dr. Preity, Arizona Occul offers authentic spiritual consultation and
              premium spiritual products for your holistic transformation.
            </p>
            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-gold-400 text-gold-400" />
              ))}
              <span className="text-purple-300 text-xs ml-2">Trusted by 1000+ clients</span>
            </div>
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              <Phone className="w-4 h-4" />
              WhatsApp Dr. Preity
            </a>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-base font-semibold text-gold-300 mb-4">
              Our Services
            </h4>
            <ul className="space-y-2">
              {SERVICES_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-purple-200 text-sm hover:text-gold-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-gold-400 text-sm hover:text-gold-300 font-medium transition-colors"
                >
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-serif text-base font-semibold text-gold-300 mb-4">
              Shop
            </h4>
            <ul className="space-y-2">
              {SHOP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-purple-200 text-sm hover:text-gold-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/shop"
                  className="text-gold-400 text-sm hover:text-gold-300 font-medium transition-colors"
                >
                  Browse All Products →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-base font-semibold text-gold-300 mb-4">
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-purple-200 text-sm">Dr. Preity</p>
                  <a
                    href="tel:+918390125338"
                    className="text-white text-sm font-medium hover:text-gold-300 transition-colors"
                  >
                    +91 8390125338
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                <a
                  href="mailto:info@arizonaoccul.com"
                  className="text-purple-200 text-sm hover:text-gold-300 transition-colors"
                >
                  info@arizonaoccul.com
                </a>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="text-purple-300 text-xs uppercase tracking-widest mb-2">
                Quick Links
              </h5>
              <div className="flex flex-col gap-1">
                <Link href="/consultation" className="text-purple-200 text-sm hover:text-gold-300 transition-colors">Book Consultation</Link>
                <Link href="/about" className="text-purple-200 text-sm hover:text-gold-300 transition-colors">About Dr. Preity</Link>
                <Link href="/account" className="text-purple-200 text-sm hover:text-gold-300 transition-colors">My Account</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-purple-400 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Arizona Occul. All rights reserved.
          </p>
          <p className="text-purple-500 text-xs">
            Spiritual wellness for a better you ✦
          </p>
        </div>
      </div>
    </footer>
  );
}
