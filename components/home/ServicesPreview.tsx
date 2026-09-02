import Link from "next/link";
import { ArrowRight, Star, Hash, Smartphone, Building2, Palette, Home, PenTool, Gem, ShieldCheck } from "lucide-react";
import ServiceCard from "@/components/ui/ServiceCard";
import type { Service } from "@/types";

const PREVIEW_SERVICES: (Service & { iconComponent: React.ReactNode })[] = [
  {
    id: 1,
    name: "Astrology Services",
    slug: "astrology",
    description: "Deep horoscope analysis to decode life transitions, career shifts, and relational harmony with Vedic precision.",
    price: "1500.00",
    image: null,
    status: "ACTIVE",
    sortOrder: 1,
    createdAt: new Date().toISOString(),
    iconComponent: <Star className="w-6 h-6 text-primary-600" />,
  },
  {
    id: 2,
    name: "Numerology Services",
    slug: "numerology",
    description: "Harness numerical resonance. Discover core numbers, life path trajectory, and master frequencies for personal growth.",
    price: "1200.00",
    image: null,
    status: "ACTIVE",
    sortOrder: 2,
    createdAt: new Date().toISOString(),
    iconComponent: <Hash className="w-6 h-6 text-primary-600" />,
  },
  {
    id: 3,
    name: "Mobile Number Consultation",
    slug: "mobile-number-consultation",
    description: "Audit and select auspicious mobile numbers aligned with your birth date to unlock favorable opportunities.",
    price: "999.00",
    image: null,
    status: "ACTIVE",
    sortOrder: 3,
    createdAt: new Date().toISOString(),
    iconComponent: <Smartphone className="w-6 h-6 text-primary-600" />,
  },
  {
    id: 4,
    name: "Business Astronumero Consultation",
    slug: "business-astronumero-consultation",
    description: "Empower corporate enterprise: auspicious entity launch dates, brand resonance, and leadership alignment.",
    price: "3500.00",
    image: null,
    status: "ACTIVE",
    sortOrder: 4,
    createdAt: new Date().toISOString(),
    iconComponent: <Building2 className="w-6 h-6 text-primary-600" />,
  },
  {
    id: 5,
    name: "Logo Designing",
    slug: "logo-designing",
    description: "Sacred geometric identity and cosmic color palettes that reflect your venture's destiny and customer attraction.",
    price: "2999.00",
    image: null,
    status: "ACTIVE",
    sortOrder: 5,
    createdAt: new Date().toISOString(),
    iconComponent: <Palette className="w-6 h-6 text-primary-600" />,
  },
  {
    id: 6,
    name: "Vastu Consultation",
    slug: "vastu-consultation",
    description: "Harmonize architectural energies in residences, workplaces, and factories to invite health, abundance, and tranquility.",
    price: "2500.00",
    image: null,
    status: "ACTIVE",
    sortOrder: 6,
    createdAt: new Date().toISOString(),
    iconComponent: <Home className="w-6 h-6 text-primary-600" />,
  },
];

export default function ServicesPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-gold-600 font-semibold text-xs sm:text-sm tracking-widest uppercase block mb-2">
              ✦ Tailored Spiritual Solutions ✦
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
              Our Core Consultation Offerings
            </h2>
          </div>
          <Link
            href="/services"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800 group"
          >
            <span>View All 10 Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PREVIEW_SERVICES.map((srv) => (
            <ServiceCard key={srv.id} service={srv} icon={srv.iconComponent} />
          ))}
        </div>
      </div>
    </section>
  );
}
