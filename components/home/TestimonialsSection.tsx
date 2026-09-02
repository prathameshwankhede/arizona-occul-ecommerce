import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Rajesh S.",
    location: "Mumbai",
    service: "Business Astronumero & Vastu",
    quote:
      "Dr. Preity's insights for our office realignment and business entity naming made an immediate difference in our team morale and project inflows.",
  },
  {
    name: "Ananya M.",
    location: "Pune",
    service: "Astrology & Crystal Guidance",
    quote:
      "Her gentle yet profound astrological reading brought me immense peace during a very uncertain career crossroad. The recommended crystal bracelet is authentic and powerful.",
  },
  {
    name: "Vikram K.",
    location: "Nagpur",
    service: "Name Correction & Mobile Consultation",
    quote:
      "The precision in numerology is remarkable. Dr. Preity explained every nuance without any superstition. Highly recommended for genuine consultation.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-purple-900 to-primary-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold-400 font-semibold text-xs sm:text-sm tracking-widest uppercase block mb-2">
            ✦ Client Experiences ✦
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            Words of Gratitude & Transformation
          </h2>
          <p className="text-purple-200 text-sm sm:text-base">
            Honest reflections from seekers who found clarity and alignment with Arizona Occul.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-purple-400/20 backdrop-blur-md rounded-2xl p-7 flex flex-col justify-between hover:border-gold-400/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-gold-400/40" />
                </div>
                <p className="text-purple-100 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-purple-800/80">
                <h4 className="font-serif text-base font-bold text-white">
                  {t.name}
                </h4>
                <p className="text-gold-300 text-xs mt-0.5">
                  {t.service} • {t.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
