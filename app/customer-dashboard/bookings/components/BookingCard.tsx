import { Loader2, Clock, CheckCircle2, XCircle, Ban } from "lucide-react";

interface BookingCardProps {
  booking: {
    id: string;
    status: string;
    timeSlot: string;
    createdAt: string;
    service: {
      name: string;
      price: number;
    };
  };
  onCancel: (id: string) => void;
  isCancelling: boolean;
}

export function BookingCard({ booking, onCancel, isCancelling }: BookingCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "REQUESTED":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-600 dark:bg-amber-900/30"><Clock className="w-3 h-3" /> Requested</span>;
      case "ACCEPTED":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 dark:bg-blue-900/30"><CheckCircle2 className="w-3 h-3" /> Accepted</span>;
      case "PAID":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30"><CheckCircle2 className="w-3 h-3" /> Paid</span>;
      case "IN_PROGRESS":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30"><Loader2 className="w-3 h-3 animate-spin" /> In Progress</span>;
      case "COMPLETED":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600 dark:bg-green-900/30"><CheckCircle2 className="w-3 h-3" /> Completed</span>;
      case "CANCELLED":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-600 dark:bg-rose-900/30"><Ban className="w-3 h-3" /> Cancelled</span>;
      case "DECLINED":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600 dark:bg-red-900/30"><XCircle className="w-3 h-3" /> Declined</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">{status}</span>;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {booking.service?.name || "Service Name"}
          </h3>
          {getStatusBadge(booking.status)}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Time Slot: <span className="font-semibold text-slate-700 dark:text-slate-300">{booking.timeSlot}</span>
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Price: <span className="font-semibold text-emerald-600">৳{booking.service?.price}</span>
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <span className="text-[11px] text-slate-400">
          Booked on: {new Date(booking.createdAt).toLocaleDateString()}
        </span>

        {booking.status === "REQUESTED" && (
          <button
            type="button"
            onClick={() => onCancel(booking.id)}
            disabled={isCancelling}
            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
          >
            {isCancelling && <Loader2 className="w-3 h-3 animate-spin" />}
            Cancel Booking
          </button>
        )}
      </div>
    </div>
  );
}