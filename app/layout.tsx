import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "Arizona Occul — Better Energy • Better Life • Better You",
    template: "%s | Arizona Occul",
  },
  description:
    "Arizona Occul offers professional Astrology, Numerology, Vastu, and Spiritual Consultation services by Dr. Preity. Explore our spiritual products including Rudraksha, Crystals, Bracelets, and Yantra.",
  keywords: [
    "astrology",
    "numerology",
    "vastu",
    "spiritual consultation",
    "rudraksha",
    "crystals",
    "Dr. Preity",
    "Arizona Occul",
    "spiritual products",
    "yantra",
    "mantra",
  ],
  authors: [{ name: "Arizona Occul" }],
  creator: "Arizona Occul",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    siteName: "Arizona Occul",
    title: "Arizona Occul — Better Energy • Better Life • Better You",
    description:
      "Professional Astrology, Numerology, Vastu & Spiritual Consultation by Dr. Preity. Shop authentic Rudraksha, Crystals & Spiritual Products.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arizona Occul",
    description: "Better Energy • Better Life • Better You",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
