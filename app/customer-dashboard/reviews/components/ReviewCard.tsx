import { Star, MessageSquare, Wrench, Briefcase } from "lucide-react";

interface IReview {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  booking?: {
    service?: {
      title?: string;
      name?: string;
    };
  };
  technicianProfile?: {
    user?: {
      name?: string;
    };
  };
  customer?: {
    name: string;
    email: string;
  };
}

interface ReviewCardProps {
  review: IReview;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const serviceName =
    review.booking?.service?.title ||
    review.booking?.service?.name ||
    "Service Name Not Available";

  const technicianName =
    review.technicianProfile?.user?.name || "Technician";

  return (
    <div className="group bg-white dark:bg-slate-900/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all duration-500 flex flex-col justify-between transform hover:-translate-y-1">
      <div className="space-y-4">
        {/* Service & Technician Details Box */}
        <div className="bg-slate-50/80 dark:bg-slate-800/50 p-4 rounded-2xl space-y-2 border border-slate-100 dark:border-slate-800 group-hover:bg-blue-50/30 dark:group-hover:bg-blue-950/20 transition-colors duration-300">
          <div className="flex items-center gap-2.5 text-xs font-bold text-slate-900 dark:text-white">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400">
              <Briefcase className="w-4 h-4 shrink-0" />
            </div>
            <span className="line-clamp-1">{serviceName}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pl-1">
            <Wrench className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>
              Technician:{" "}
              <strong className="text-slate-700 dark:text-slate-200">
                {technicianName}
              </strong>
            </span>
          </div>
        </div>

        {/* Rating & Date */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center space-x-1 text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-500 animate-pulse" />
            ))}
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 ml-1.5">
              {review.rating}.0
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            {new Date(review.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Comment */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic bg-slate-50/50 dark:bg-slate-800/30 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/60 leading-relaxed">
          &quot;{review.comment}&quot;
        </p>
      </div>

      <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
        <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
          {(review.customer?.name || "Y").charAt(0)}
        </div>
        <span>Reviewed by <strong className="text-slate-700 dark:text-slate-300">{review.customer?.name || "You"}</strong></span>
      </div>
    </div>
  );
}