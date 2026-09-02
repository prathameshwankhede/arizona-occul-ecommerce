import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-purple-950 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      {/* Subtle star pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="w-full max-w-md relative z-10">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block group">
            <div className="inline-flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-gold-400" />
              <span className="font-serif text-3xl font-bold text-white tracking-wider">
                ARIZONA OCCUL
              </span>
            </div>
            <p className="text-gold-300 text-xs tracking-widest uppercase font-medium">
              Better Energy • Better Life • Better You
            </p>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-200/50">
          {children}
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-purple-200 hover:text-white transition-colors">
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
