import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-950 via-primary-900 to-primary-950 text-white py-20 lg:py-32">
      {/* Decorative celestial background elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-600/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gold-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Subtle pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-800/80 border border-gold-500/30 text-gold-300 text-xs sm:text-sm font-medium tracking-wide mb-8 shadow-inner">
          <Sparkles className="w-4 h-4 text-gold-400" />
          <span>Divine Guidance & Authentic Energy Transformation</span>
        </div>

        {/* Hero Heading */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none mb-6">
          Awaken Your True Potential with{" "}
          <span className="text-gold-shimmer">Divine Wisdom</span>
        </h1>

        {/* Subtitle */}
        <p className="text-purple-200 text-base sm:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-10">
          Personalized Astrology, Numerology, Vastu consultation & authentic spiritual products by{" "}
          <strong className="font-semibold text-white">Dr. Preity</strong> to restore balance, prosperity, and peace in your life.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 max-w-md mx-auto mb-14">
          <Link
            href="/consultation"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-amber-400 hover:from-gold-400 hover:to-amber-300 text-primary-950 font-semibold px-8 py-4 rounded-xl shadow-lg shadow-gold-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-purple-300/30 text-white font-medium px-8 py-4 rounded-xl backdrop-blur-sm transition-all duration-300"
          >
            <span>Explore Products</span>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="pt-8 border-t border-purple-800/60 max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-purple-200 text-xs sm:text-sm">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
            <span>100% Authentic Products</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-gold-400 shrink-0" />
            <span>Vedic Astrological Science</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
            <span>Confidential Sessions</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-gold-400 shrink-0" />
            <span>Positive Transformation</span>
          </div>
        </div>
      </div>
    </section>
  );
}
