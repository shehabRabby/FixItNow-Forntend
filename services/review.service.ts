import { axiosInstance } from "@/lib/axiosInstance";

export interface ICreateReviewPayload {
  bookingId: string;
  rating: number;
  comment: string;
}

export const reviewService = {
  getAllReviews: async (params?: Record<string, string | number>) => {
    const res = await axiosInstance.get("/reviews", { params });
    return res.data;
  },

  // Create a new review
  createReview: async (payload: ICreateReviewPayload) => {
    const res = await axiosInstance.post("/reviews/create-review", payload);
    return res.data;
  },
};