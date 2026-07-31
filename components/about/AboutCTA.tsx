import Link from "next/link";
import { Home, Wrench } from "lucide-react";

export function AboutCTA() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Homeowner CTA */}
        <div className="bg-blue-600 text-white p-8 rounded-2xl relative overflow-hidden flex flex-col justify-between space-y-6">
          <div className="space-y-3 relative z-10">
            <h3 className="text-2xl font-extrabold">
              Ready to elevate your home?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed max-w-md">
              Experience the peace of mind that comes with professional mastery.
              Book your first service today.
            </p>
          </div>
          <div className="relative z-10 pt-4">
            <Link
              href="/services"
              className="inline-block px-6 py-3 bg-white text-blue-600 font-bold text-xs rounded-lg hover:bg-blue-50 transition-all shadow"
            >
              Book a Service
            </Link>
          </div>
          <Home className="absolute -bottom-6 -right-6 w-40 h-40 text-blue-500/30" />
        </div>

        {/* Professional CTA */}
        <div className="bg-slate-200/80 dark:bg-slate-900 text-slate-900 dark:text-white p-8 rounded-2xl relative overflow-hidden flex flex-col justify-between space-y-6 border border-slate-300 dark:border-slate-800">
          <div className="space-y-3 relative z-10">
            <h3 className="text-2xl font-extrabold">Are you an elite professional?</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
              Join the most prestigious network of home service providers in the
              country. Apply now to get started.
            </p>
          </div>
          <div className="relative z-10 pt-4">
            <Link
              href="/join"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-bold text-xs rounded-lg hover:bg-blue-700 transition-all shadow"
            >
              Join the Network
            </Link>
          </div>
          <Wrench className="absolute -bottom-6 -right-6 w-40 h-40 text-slate-400/20 dark:text-slate-700/20" />
        </div>
      </div>
    </section>
  );
}