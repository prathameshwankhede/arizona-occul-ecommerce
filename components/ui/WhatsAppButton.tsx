"use client";

import { Phone } from "lucide-react";
import { getWhatsAppLink } from "@/lib/utils/format";

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  label?: string;
  variant?: "floating" | "inline";
}

export default function WhatsAppButton({
  message = "Hello Dr. Preity, I would like to book a consultation with Arizona Occul.",
  className = "",
  size = "md",
  label = "Chat on WhatsApp",
  variant = "inline",
}: WhatsAppButtonProps) {
  const link = getWhatsAppLink("8390125338", message);

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  if (variant === "floating") {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Dr. Preity"
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-full p-3.5 sm:px-5 sm:py-3 shadow-xl transition-all duration-300 hover:scale-105 ${className}`}
      >
        <Phone className="w-6 h-6 shrink-0 fill-current" />
        <span className="hidden sm:inline font-medium text-sm">Chat with Dr. Preity</span>
      </a>
    );
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors ${sizeClasses[size]} ${className}`}
    >
      <Phone className="w-4 h-4 shrink-0" />
      <span>{label}</span>
    </a>
  );
}
