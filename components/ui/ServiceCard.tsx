import Link from "next/link";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import { formatPrice } from "@/lib/utils/format";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
  icon?: React.ReactNode;
}

export default function ServiceCard({ service, icon }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100 hover:shadow-md hover:border-purple-200 transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Icon & Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-purple-50 flex items-center justify-center text-primary-700 group-hover:scale-105 transition-transform duration-300">
            {icon || <Sparkles className="w-6 h-6 text-primary-600" />}
          </div>
          {service.price && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gold-50 text-gold-700 border border-gold-200">
              From {formatPrice(service.price)}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors mb-2">
          {service.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6">
          {service.description}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3 pt-4 border-t border-purple-50">
        <Link
          href={`/services/${service.slug}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-primary-700 bg-purple-50 hover:bg-purple-100 py-2.5 rounded-xl transition-colors"
        >
          <span>Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href={`/consultation?service=${service.id}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-primary-700 hover:bg-primary-800 py-2.5 rounded-xl transition-colors shadow-sm shadow-purple-200"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Now</span>
        </Link>
      </div>
    </div>
  );
}
