import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore Arizona Occul's comprehensive spiritual consultation services including Astrology, Numerology, Vastu, Crystal Consultation, and more by Dr. Preity.",
};

const SERVICES = [
  {
    id: 1,
    slug: "astrology",
    name: "Astrology Services",
    description:
      "Discover insights about your life path, relationships, career, and destiny through the ancient wisdom of Vedic astrology. Get personalized birth chart analysis.",
    icon: "⭐",
    sortOrder: 1,
  },
  {
    id: 2,
    slug: "numerology",
    name: "Numerology Services",
    description:
      "Unlock the power of numbers in your life. Understand your life path number, destiny number, and how numbers influence your personal and professional life.",
    icon: "🔢",
    sortOrder: 2,
  },
  {
    id: 3,
    slug: "mobile-number-consultation",
    name: "Mobile Number Consultation",
    description:
      "Your mobile number carries vibrations that affect your daily life. Get your mobile number analyzed and choose a numerologically favorable number.",
    icon: "📱",
    sortOrder: 3,
  },
  {
    id: 4,
    slug: "business-astronumero-consultation",
    name: "Business Astronumero Consultation",
    description:
      "Align your business with cosmic energies. Get astrological and numerological guidance for your business name, launch dates, and strategic decisions.",
    icon: "🏢",
    sortOrder: 4,
  },
  {
    id: 5,
    slug: "logo-designing",
    name: "Logo Designing",
    description:
      "Create a powerful brand identity with a logo designed using numerological principles and sacred geometry to attract success and positive energy.",
    icon: "🎨",
    sortOrder: 5,
  },
  {
    id: 6,
    slug: "vastu-consultation",
    name: "Vastu Consultation",
    description:
      "Harmonize your home or office with Vastu Shastra principles. Correct imbalances to invite prosperity, health, and positive energy into your spaces.",
    icon: "🏠",
    sortOrder: 6,
  },
  {
    id: 7,
    slug: "name-designing-correction",
    name: "Name Designing & Name Correction",
    description:
      "Your name holds vibrational energy. Get your name analyzed and corrected for better alignment with your birth chart and numerological profile.",
    icon: "✍️",
    sortOrder: 7,
  },
  {
    id: 8,
    slug: "rudraksh-guidance",
    name: "Rudraksh Guidance",
    description:
      "Discover the right Rudraksha bead for your spiritual and physical well-being. Personalized guidance based on your horoscope and life goals.",
    icon: "📿",
    sortOrder: 8,
  },
  {
    id: 9,
    slug: "crystal-consultation",
    name: "Crystal Consultation",
    description:
      "Harness the healing power of crystals. Get expert guidance on choosing the right crystals for love, prosperity, health, and spiritual growth.",
    icon: "💎",
    sortOrder: 9,
  },
  {
    id: 10,
    slug: "yantra-mantra-consultation",
    name: "Yantra & Mantra Consultation",
    description:
      "Energize your life with sacred Yantras and Mantras. Personalized recommendations for Yantras to attract specific blessings and protect from negativity.",
    icon: "🕉️",
    sortOrder: 10,
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-gold-400 text-sm font-medium tracking-widest uppercase mb-4">
            ✦ Expert Spiritual Guidance ✦
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Our Services
          </h1>
          <p className="text-purple-200 text-lg max-w-2xl mx-auto">
            Comprehensive spiritual consultation services by Dr. Preity to guide you
            on your path to positive transformation and inner harmony.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100 hover:shadow-md hover:border-purple-200 transition-all group"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>

                {/* Name */}
                <h2 className="font-serif text-xl font-bold text-primary-800 mb-2">
                  {service.name}
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-5">
                  {service.description}
                </p>

                {/* Actions */}
                <div className="flex gap-3">
                  <Link
                    href={`/services/${service.slug}`}
                    className="flex-1 text-center text-sm font-medium text-primary-700 border border-primary-300 rounded-lg py-2 hover:bg-primary-50 transition-colors"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/consultation?service=${service.id}`}
                    className="flex-1 text-center text-sm font-medium text-white bg-primary-700 rounded-lg py-2 hover:bg-primary-600 transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 bg-gradient-to-r from-primary-800 to-primary-700">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-white mb-3">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-purple-200 mb-6">
            Book a free introductory consultation and Dr. Preity will guide you to the right path.
          </p>
          <Link
            href="/consultation"
            className="inline-block bg-gold-500 hover:bg-gold-400 text-primary-950 font-semibold px-8 py-3 rounded-full transition-colors"
          >
            Book Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
