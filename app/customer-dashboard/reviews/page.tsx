"use client";

import { useState, useEffect } from "react";
import { reviewService } from "@/services/review.service";
import { Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { ReviewHeader } from "./components/ReviewHeader";
import { ReviewCard } from "./components/ReviewCard";

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

export default function CustomerReviewsPage() {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setIsLoading(true);
        const res = await reviewService.getAllReviews();
        if (isMounted && res?.success) {
          setReviews(res.data || []);
        }
      } catch (error: unknown) {
        if (isMounted) {
          const errMessage =
            (error as { response?: { data?: { message?: string } } })?.response
              ?.data?.message || "Failed to load reviews!";
          toast.error(errMessage);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto min-h-screen">
      <ReviewHeader />

      {reviews.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            No reviews found. Complete a booking to leave a review!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}