import { Loader2, Clock, CheckCircle2, XCircle, Ban, Calendar, MapPin, User, Mail } from "lucide-react";

interface BookingCardProps {
  booking: {
    id: string;
    status: string;
    bookingDate?: string;
    date?: string;
    timeSlot?: string;
    address?: string;
    createdAt: string;
    service?: {
      id: string;
      title?: string;
      name?: string;
      description?: string;
      price?: number;
      location?: string; // এটি হলো সার্ভিসের ডিফল্ট লোকেশন
    };
    price?: number;
  };
  onCancel?: (id: string) => void;
  isCancelling?: boolean;
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

  // 🔥 ব্যাকএন্ড রেসপন্স স্ট্রাকচার অনুযায়ী ডেটা ম্যাপিং
  const serviceName = booking.service?.title || booking.service?.name || "Service Name Not Available";
  
  // ব্যাকএন্ডে ডেট না থাকায় createdAt কে ডেট হিসেবে ফলব্যাক দেওয়া হলো (অথবা আপনার ব্যাকএন্ডে ডেট ফিল্ড যুক্ত করতে হবে)
  const rawDate = booking.bookingDate || booking.date || booking.createdAt;
  
  const timeSlot = booking.timeSlot || "N/A";
  
  // ব্যাকএন্ডে অ্যাড্রেস না থাকায় সার্ভিসের লোকেশনটি এখানে দেখানো হচ্ছে
  const address = booking.address || booking.service?.location || "Location not provided";
  
  const price = booking.service?.price || booking.price || 0;

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5">
      <div className="space-y-3">
        <div className="flex justify-between items-start gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-blue-600 dark:text-blue-400">Service</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {serviceName}
            </h3>
            {booking.service?.description && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {booking.service.description}
              </p>
            )}
          </div>
          {getStatusBadge(booking.status)}
        </div>

        {/* Date & Time Slot Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 bg-slate-50/60 dark:bg-slate-800/30 p-2.5 rounded-xl">
            <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400">Booking Date</p>
              <p className="font-semibold text-slate-700 dark:text-slate-200">
                {rawDate ? new Date(rawDate).toLocaleDateString() : "N/A"}
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 bg-slate-50/60 dark:bg-slate-800/30 p-2.5 rounded-xl">
            <Clock className="w-4 h-4 text-amber-500 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400">Time Slot</p>
              <p className="font-semibold text-slate-700 dark:text-slate-200">{timeSlot}</p>
            </div>
          </div>
        </div>

        {/* Address / Location */}
        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2 bg-slate-50/60 dark:bg-slate-800/30 p-2.5 rounded-xl">
          <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
          <div className="w-full">
            <p className="text-[10px] text-slate-400">Service Location / Address</p>
            <p className="font-semibold text-slate-700 dark:text-slate-200 break-words">{address}</p>
          </div>
        </div>

        {/* Price */}
        <div className="flex justify-between items-center pt-2 px-1">
          <span className="text-xs text-slate-500">Total Price:</span>
          <span className="font-bold text-emerald-600 text-base">৳{price}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <span className="text-[11px] text-slate-400">
          Request on: {new Date(booking.createdAt).toLocaleDateString()}
        </span>

        {onCancel && booking.status === "REQUESTED" && (
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