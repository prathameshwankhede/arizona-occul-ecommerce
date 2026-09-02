import type { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import HeroSection from "@/components/home/HeroSection";
import ConsultantSection from "@/components/home/ConsultantSection";
import ServicesPreview from "@/components/home/ServicesPreview";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ConsultationCTA from "@/components/home/ConsultationCTA";

export const metadata: Metadata = {
  title: "Arizona Occul — Better Energy • Better Life • Better You",
  description:
    "Divine Guidance & Positive Transformation with Dr. Preity. Consultations in Astrology, Numerology, Vastu, and authentic spiritual products.",
};

export default function HomePage() {
  return (
    <PublicLayout>
      <HeroSection />
      <ConsultantSection />
      <ServicesPreview />
      <FeaturedProducts />
      <WhyChooseUs />
      <TestimonialsSection />
      <ConsultationCTA />
    </PublicLayout>
  );
}
