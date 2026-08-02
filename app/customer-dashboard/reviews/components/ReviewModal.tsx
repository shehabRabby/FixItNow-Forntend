"use client";

import { useState } from "react";
import { reviewService } from "@/services/review.service";
import { Loader2, Star, X } from "lucide-react";
import { toast } from "sonner";

interface ReviewModalProps {
  isOpen: boolean;
  bookingId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ReviewModal({
  isOpen,
  bookingId,
  onClose,
  onSuccess,
}: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      await reviewService.createReview({
        bookingId,
        rating,
        comment,
      });
      toast.success("Review submitted successfully!");
      onSuccess();
      onClose();
    } catch (error: unknown) {
      console.error("Failed to submit review", error);
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to submit review";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-xl relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
          Rate Your Experience
        </h3>
        <p className="text-xs text-slate-500 mb-5">
          Share your feedback regarding this completed service.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Star Rating */}
          <div className="flex flex-col items-center justify-center space-y-2 py-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 focus:outline-none cursor-pointer"
                >
                  <Star
                    className={`w-7 h-7 transition-colors ${
                      (hoverRating || rating) >= star
                        ? "text-amber-400 fill-amber-400"
                        : "text-slate-300 dark:text-slate-700"
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              {rating === 5
                ? "Excellent!"
                : rating === 4
                ? "Good"
                : rating === 3
                ? "Average"
                : rating === 2
                ? "Poor"
                : "Terrible"}
            </span>
          </div>

          {/* Comment box */}
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Your Comment
            </label>
            <textarea
              required
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write how the service was..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}