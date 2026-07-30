import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-14 text-center text-white space-y-6 shadow-xl shadow-blue-600/20 relative overflow-hidden">
        
        {/* Background Decorative Blur */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Need Expert Help at Your Home Today?
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-lg mx-auto leading-relaxed">
            Book trusted plumbing, electrical, and cleaning professionals in under 2 minutes. Transparent pricing with 100% satisfaction guarantee.
          </p>
        </div>

        {/* Meaningful Action Buttons */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-blue-600 hover:bg-blue-50 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-black/10"
          >
            Book a Service Now
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-800/60 hover:bg-blue-800/80 text-white font-semibold text-xs sm:text-sm rounded-xl border border-blue-400/30 transition-all backdrop-blur-sm"
          >
            <PhoneCall className="w-4 h-4 text-blue-200" />
            Contact Support
          </Link>
        </div>

      </div>
    </section>
  );
}