import { Service } from "@/types/service";
import { ShieldCheck, Calendar } from "lucide-react";

interface ServiceBookingCardProps {
  service: Service;
  onBook: () => void;
}

export default function ServiceBookingCard({ service, onBook }: ServiceBookingCardProps) {
  return (
    <div className="space-y-4 sticky top-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        {/* Total Price Header */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
            Total Price
          </span>
          <div className="text-right">
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              ৳{service.price}
            </div>
            <span className="text-[11px] text-slate-400">All inclusive</span>
          </div>
        </div>

        <hr className="border-slate-100 dark:border-slate-800" />

        {/* Date Selector mock */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-blue-600" /> Select Appointment Date
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 text-slate-700 dark:text-slate-200"
          />
        </div>

        <div className="space-y-2 text-xs text-slate-500 pt-2">
          <div className="flex justify-between">
            <span>Standard Service</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">৳{service.price}</span>
          </div>
          <div className="flex justify-between">
            <span>Service Fee</span>
            <span className="font-semibold text-emerald-600">FREE</span>
          </div>
        </div>

        <hr className="border-slate-100 dark:border-slate-800" />

        <div className="flex justify-between items-center text-sm font-bold text-slate-900 dark:text-white">
          <span>Total</span>
          <span className="text-xl text-blue-600">৳{service.price}</span>
        </div>

        {/* Confirm Booking / Book Button */}
        <button
          onClick={onBook}
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-center text-sm transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] cursor-pointer"
        >
          Confirm Booking
        </button>

        <p className="text-[11px] text-center text-slate-400">
          You won&apos;t be charged until the service is completed.
        </p>
      </div>

      {/* Guarantee Footer Box */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3 shadow-sm">
        <div className="text-emerald-500 mt-0.5">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h5 className="text-xs font-bold text-slate-900 dark:text-white">FixItNow Guarantee</h5>
          <p className="text-[11px] text-slate-500">If you&apos;re not happy, we&apos;ll make it right at no extra cost.</p>
        </div>
      </div>
    </div>
  );
}