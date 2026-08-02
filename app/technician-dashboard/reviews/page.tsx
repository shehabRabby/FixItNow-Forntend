"use client";

import { useState, useEffect } from "react";
import { reviewService } from "@/services/review.service";
import { Star, User, Loader2 } from "lucide-react";

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
  customer?: {
    name: string;
    email: string;
  };
}

export default function TechnicianReviewsPage() {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // টেকনিশিয়ান ড্যাশবোর্ডের জন্য রিভিউ ফেচ করা
        const res = await reviewService.getAllReviews();
        setReviews(res?.data || []);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          My Received Reviews
        </h1>
        <p className="text-sm text-slate-500">
          All feedback given by customers for your services.
        </p>
      </div>

      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-xs">
                    {review.customer?.name?.charAt(0) || <User className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {review.customer?.name || "Customer"}
                    </h4>
                    {review.booking?.service?.title && (
                      <p className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                        Service: {review.booking.service.title}
                      </p>
                    )}
                    <span className="text-[10px] text-slate-400">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2.5 py-1 rounded-full">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-bold text-amber-600">
                    {review.rating}.0
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl">
                &ldquo;{review.comment}&rdquo;
              </p>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-xs text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            No reviews found.
          </div>
        )}
      </div>
    </div>
  );
}