"use client";

import { useState, useEffect } from "react";
import { reviewService } from "@/services/review.service";
import { Star, User, Loader2, MessageSquare, TrendingUp, Award } from "lucide-react";
import { motion } from "framer-motion";

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

  // Calculate average rating and total count safely
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((acc, curr) => acc + (curr.rating || 0), 0) / totalReviews).toFixed(1) 
    : "0.0";

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 max-w-4xl mx-auto pb-12 px-4 sm:px-6"
    >
      {/* Header & Overview Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Received Reviews
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal">
            Real feedback and ratings given by your customers.
          </p>
        </div>

        {/* Mini Stats Badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Total</p>
              <p className="text-xs font-bold text-slate-900 dark:text-white">{totalReviews} Reviews</p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-100/50 dark:border-amber-900/40">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <div>
              <p className="text-[10px] text-amber-600/70 dark:text-amber-400/70 font-medium uppercase tracking-wider">Average</p>
              <p className="text-xs font-bold text-amber-700 dark:text-amber-300">{averageRating} / 5.0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List Grid/Stack */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 transition-all hover:border-slate-300 dark:hover:border-slate-700"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/60 dark:to-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-sm border border-blue-200/50 dark:border-blue-800/50 shadow-inner">
                    {review.customer?.name?.charAt(0) || <User className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {review.customer?.name || "Customer"}
                    </h4>
                    {review.booking?.service?.title && (
                      <span className="inline-block mt-0.5 px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-[11px] font-semibold">
                        {review.booking.service.title}
                      </span>
                    )}
                    <p className="text-[10px] text-slate-400 font-normal mt-0.5">
                      {new Date(review.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                {/* Rating Badge with full stars visual */}
                <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 px-3 py-1.5 rounded-full border border-amber-200/50 self-start sm:self-auto">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < review.rating ? "text-amber-500 fill-amber-500" : "text-slate-300 dark:text-slate-700"}`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 ml-1">
                    {review.rating}.0
                  </span>
                </div>
              </div>

              {/* Comment Box */}
              <div className="flex items-start gap-3 bg-slate-50/60 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                <MessageSquare className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed italic">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2"
          >
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">No reviews found</p>
            <p className="text-xs text-slate-400">You have not received any customer reviews yet.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}