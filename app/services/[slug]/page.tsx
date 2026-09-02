import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Phone } from "lucide-react";
import { getWhatsAppLink } from "@/lib/utils/format";

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate SEO metadata from slug
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${name} | Services`,
    description: `Professional ${name} consultation by Dr. Preity at Arizona Occul. Get expert spiritual guidance tailored to your needs.`,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const waLink = getWhatsAppLink(
    "8390125338",
    `Hello Dr. Preity, I would like to book a ${slug.replace(/-/g, " ")} consultation.`
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-gold-400 text-xs font-medium tracking-widest uppercase mb-3">
            ✦ Spiritual Consultation ✦
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 capitalize">
            {slug.replace(/-/g, " ")}
          </h1>
          <p className="text-purple-200">
            Expert guidance by Dr. Preity — tailored to your unique needs
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-cream-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
                <h2 className="font-serif text-2xl font-bold text-primary-800 mb-4">
                  About This Service
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  This service is provided by Dr. Preity at Arizona Occul. Dr. Preity brings
                  years of expertise in spiritual sciences to provide you with personalized
                  guidance that can transform your life positively.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Each consultation is tailored to your specific needs, birth chart, and life
                  circumstances to ensure you receive the most accurate and beneficial guidance.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
                <h2 className="font-serif text-2xl font-bold text-primary-800 mb-4">
                  What You Will Get
                </h2>
                <ul className="space-y-3">
                  {[
                    "Personalized consultation session with Dr. Preity",
                    "Detailed analysis based on your specific situation",
                    "Actionable guidance and recommendations",
                    "Follow-up support via WhatsApp",
                    "Written summary of key insights",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-gold-500 font-bold">✦</span>
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="bg-primary-800 rounded-2xl p-6 text-white">
                <h3 className="font-serif text-xl font-bold mb-3">
                  Book Your Session
                </h3>
                <p className="text-purple-200 text-sm mb-5">
                  Schedule a personal consultation with Dr. Preity
                </p>
                <div className="space-y-3">
                  <Link
                    href={`/consultation?service=${slug}`}
                    className="flex items-center justify-center gap-2 w-full bg-gold-500 hover:bg-gold-400 text-primary-950 font-semibold py-2.5 rounded-xl transition-colors text-sm"
                  >
                    <Calendar className="w-4 h-4" />
                    Book Consultation
                  </Link>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-xl transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    WhatsApp Dr. Preity
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-purple-100">
                <h4 className="font-semibold text-primary-800 mb-2 text-sm">
                  Other Services
                </h4>
                <div className="space-y-2">
                  {["Astrology", "Numerology", "Vastu", "Crystal Consultation"].map((s) => (
                    <Link
                      key={s}
                      href={`/services/${s.toLowerCase().replace(/ /g, "-")}`}
                      className="block text-sm text-gray-600 hover:text-primary-700 transition-colors py-1 border-b border-gray-100 last:border-0"
                    >
                      {s} →
                    </Link>
                  ))}
                  <Link href="/services" className="block text-gold-600 text-sm font-medium mt-2 hover:text-gold-700 transition-colors">
                    View All Services →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
