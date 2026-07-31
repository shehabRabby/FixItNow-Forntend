import Image from "next/image";
import { MapPin, Clock, Navigation } from "lucide-react";

export function Headquarters() {
  return (
    <div className="lg:col-span-5 bg-blue-50/70 dark:bg-slate-950/60 p-8 sm:p-10 flex flex-col justify-between space-y-6 border-t lg:border-t-0 lg:border-l border-slate-200/80 dark:border-slate-800">
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Our Headquarters
        </h3>

        <div className="space-y-4 text-xs">
          <div className="flex gap-3 items-start">
            <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">New York City</h4>
              <p className="text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                123 Mastercraft Way, Suite 400<br />
                New York, NY 10012
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">Office Hours</h4>
              <p className="text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                Mon – Fri: 9am – 6pm EST<br />
                Sat – Sun: Support Chat Only
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-48 rounded-2xl overflow-hidden shadow-inner border border-slate-200/80 dark:border-slate-800">
        <Image
          src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=800&auto=format&fit=crop"
          alt="Map location"
          fill
          className="object-cover opacity-90 hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-slate-900/10" />
        <div className="absolute bottom-3 left-3">
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-white/90 dark:bg-slate-900/90 hover:bg-white text-slate-900 dark:text-white font-medium text-[11px] rounded-lg shadow flex items-center gap-1.5 backdrop-blur-sm transition-all"
          >
            <Navigation className="w-3 h-3 text-blue-600" />
            Get Directions
          </a>
        </div>
      </div>
    </div>
  );
}