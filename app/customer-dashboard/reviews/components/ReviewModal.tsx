"use client";

import { useState } from "react";
import { reviewService } from "@/services/review.service";
import { Loader2, Star, X, Sparkles } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-8 border border-slate-200 dark:border-slate-800 shadow-2xl relative animate-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center justify-center transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Feedback</span>
        </div>

        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">
          Rate Your Experience
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Share your feedback regarding this completed service.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Star Rating */}
          <div className="flex flex-col items-center justify-center space-y-3 py-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1.5 focus:outline-none cursor-pointer transform hover:scale-125 transition-transform"
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      (hoverRating || rating) >= star
                        ? "text-amber-400 fill-amber-400 drop-shadow-sm"
                        : "text-slate-300 dark:text-slate-700"
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-amber-400/10 text-amber-600 dark:text-amber-400 rounded-full">
              {rating === 5
                ? "⭐ Excellent!"
                : rating === 4
                ? "😊 Good"
                : rating === 3
                ? "😐 Average"
                : rating === 2
                ? " Poor"
                : "😞 Terrible"}
            </span>
          </div>

          {/* Comment box */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Your Comment
            </label>
            <textarea
              required
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write how the service was..."
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-4 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all shadow-inner"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-2xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-2xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer transform active:scale-95"
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