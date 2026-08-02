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
    <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-all">
      <div className="space-y-3">
        {/* Service & Technician Details Box */}
        <div className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
            <Briefcase className="w-4 h-4 text-blue-500 shrink-0" />
            <span className="line-clamp-1">{serviceName}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
            <Wrench className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>
              Technician:{" "}
              <strong className="text-slate-700 dark:text-slate-300">
                {technicianName}
              </strong>
            </span>
          </div>
        </div>

        {/* Rating & Date */}
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center space-x-1 text-amber-500">
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-500" />
            ))}
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1.5">
              {review.rating}/5
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            {new Date(review.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Comment */}
        <p className="text-xs text-slate-600 dark:text-slate-300 italic bg-slate-50/50 dark:bg-slate-900/30 p-3 rounded-xl border border-slate-100 dark:border-slate-800/50">
          &quot;{review.comment}&quot;
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
        <MessageSquare className="w-3.5 h-3.5" />
        <span>Reviewed by {review.customer?.name || "You"}</span>
      </div>
    </div>
  );
}