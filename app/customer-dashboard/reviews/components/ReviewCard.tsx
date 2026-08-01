import { Star, MessageSquare } from "lucide-react";

interface IReview {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  customer?: {
    name: string;
    email: string;
  };
}

interface ReviewCardProps {
  review: IReview;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-all">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-amber-500">
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-500" />
            ))}
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1.5">
              {review.rating}/5
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            {new Date(review.createdAt).toLocaleDateString()}
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 italic">
          &quot;{review.comment}&quot;
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs text-slate-400">
        <MessageSquare className="w-3.5 h-3.5" />
        <span>Reviewed by {review.customer?.name || "You"}</span>
      </div>
    </div>
  );
}