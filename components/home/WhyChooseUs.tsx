import { Shield, Sparkles, HeartHandshake, Award, Clock, Users } from "lucide-react";

const REASONS = [
  {
    icon: <Award className="w-6 h-6 text-gold-600" />,
    title: "Vedic Expertise & Ethics",
    desc: "Guided by certified practitioner Dr. Preity with years of rigorous study in genuine astrology and Vastu sciences.",
  },
  {
    icon: <Shield className="w-6 h-6 text-gold-600" />,
    title: "100% Authentic Consecrated Items",
    desc: "Every bead, crystal, and yantra is certified natural and properly energized before reaching your hands.",
  },
  {
    icon: <Sparkles className="w-6 h-6 text-gold-600" />,
    title: "Customized & Holistic Solutions",
    desc: "No cookie-cutter horoscopes. Practical remedies designed specifically for your unique birth energy and life context.",
  },
  {
    icon: <HeartHandshake className="w-6 h-6 text-gold-600" />,
    title: "Strict Confidentiality",
    desc: "All personal information, charts, and consultation discussions are treated with absolute discretion and privacy.",
  },
  {
    icon: <Clock className="w-6 h-6 text-gold-600" />,
    title: "Timely & Supportive Consultations",
    desc: "Prompt schedules, seamless WhatsApp communication, and dedicated follow-up assistance.",
  },
  {
    icon: <Users className="w-6 h-6 text-gold-600" />,
    title: "Trusted by 1000+ Seekers",
    desc: "A growing community of individuals and entrepreneurs experiencing tangible balance, focus, and harmony.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold-600 font-semibold text-xs sm:text-sm tracking-widest uppercase block mb-2">
            ✦ Integrity & Transparency ✦
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Seekers Trust Arizona Occul
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            We hold spiritual consultation to the highest standard of authenticity, eliminating dogma and focusing on uplifting clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REASONS.map((r, i) => (
            <div
              key={i}
              className="p-7 rounded-2xl bg-cream-50/80 border border-purple-100 hover:border-gold-300 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-gold-200 flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform">
                {r.icon}
              </div>
              <h3 className="font-serif text-lg font-bold text-gray-900 mb-2">
                {r.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
