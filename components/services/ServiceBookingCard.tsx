import Link from "next/link";
import { Service } from "@/types/service";
import { User, ShieldCheck } from "lucide-react";

export default function ServiceBookingCard({ service }: { service: Service }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 sticky top-6">
      {/* Price */}
      <div className="space-y-1">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Service Fee
        </span>
        <div className="text-3xl font-black text-slate-900 dark:text-white">
          ৳{service.price}
        </div>
      </div>

      <hr className="border-slate-100 dark:border-slate-800" />

      {/* Provider Info */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Service Provider
        </span>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1">
              {service.technicianProfile?.user?.name ||
                service.providerName ||
                "Verified Technician"}
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            </h4>
            <p className="text-xs text-slate-500">Expert Professional</p>
          </div>
        </div>
      </div>

      {/* Book Button */}
      <Link
        href={`/booking/${service.id}`}
        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-center text-sm transition-all block shadow-lg shadow-blue-500/20 active:scale-[0.98]"
      >
        Book This Service
      </Link>
    </div>
  );
}
