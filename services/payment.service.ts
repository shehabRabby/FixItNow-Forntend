import { axiosInstance } from "@/lib/axiosInstance";

export const paymentService = {
  // ১. পেমেন্ট ইনটেন্ট তৈরি করা (Stripe clientSecret পাওয়ার জন্য)
  createPaymentIntent: async (bookingId: string) => {
    const response = await axiosInstance.post(
      "/payments/create-payment-intent",
      {
        bookingId,
      },
    );
    return response.data;
  },

  // ২. পেমেন্ট কনফার্ম করা (সফল পেমেন্টের পর transactionId পাঠানোর জন্য)
  confirmPayment: async (bookingId: string, transactionId: string) => {
    const response = await axiosInstance.post("/payments/confirm-payment", {
      bookingId,
      transactionId,
    });
    return response.data;
  },

  // ৩. পেমেন্ট হিস্ট্রি ফেচ করা
  getPaymentHistory: async () => {
    const response = await axiosInstance.get("/payments/payment-history");
    return response.data;
  },
};
