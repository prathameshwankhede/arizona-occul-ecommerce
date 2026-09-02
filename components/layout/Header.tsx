"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, User, Menu, X, Search, Phone } from "lucide-react";
import { getWhatsAppLink } from "@/lib/utils/format";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Shop", href: "/shop" },
  { label: "Consultation", href: "/consultation" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsAppLink = getWhatsAppLink(
    "8390125338",
    "Hello Dr. Preity, I would like to book a consultation with Arizona Occul."
  );

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md shadow-purple-100/50"
          : "bg-white"
      } border-b border-purple-100`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start group">
            <span className="font-serif text-xl md:text-2xl font-bold text-primary-700 leading-tight tracking-wide group-hover:text-primary-600 transition-colors">
              ARIZONA OCCUL
            </span>
            <span className="text-[10px] text-gold-600 font-medium tracking-widest uppercase leading-tight">
              Better Energy • Better Life • Better You
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-primary-700 transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <Link
              href="/shop"
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full text-gray-600 hover:text-primary-700 hover:bg-purple-50 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* WhatsApp */}
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full text-green-600 hover:text-green-700 hover:bg-green-50 transition-colors"
              aria-label="WhatsApp"
            >
              <Phone className="w-5 h-5" />
            </a>

            {/* Account */}
            <Link
              href="/account"
              className="flex items-center justify-center w-9 h-9 rounded-full text-gray-600 hover:text-primary-700 hover:bg-purple-50 transition-colors"
              aria-label="My Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="flex items-center justify-center w-9 h-9 rounded-full text-gray-600 hover:text-primary-700 hover:bg-purple-50 transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full text-gray-600 hover:text-primary-700 hover:bg-purple-50 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-purple-100 px-4 pb-4 pt-2 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-700 hover:bg-purple-50 rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-purple-100 mt-2">
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-50 rounded-lg transition-colors"
            >
              <Phone className="w-4 h-4" />
              WhatsApp: 8390125338
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
