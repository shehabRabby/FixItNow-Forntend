import { axiosInstance } from "@/lib/axiosInstance";

export const paymentService = {
  createPaymentIntent: async (bookingId: string) => {
    const response = await axiosInstance.post(
      "/payments/create-payment-intent",
      {
        bookingId,
      },
    );
    return response.data;
  },

  confirmPayment: async (bookingId: string, transactionId: string) => {
    const response = await axiosInstance.post("/payments/confirm-payment", {
      bookingId,
      transactionId,
    });
    return response.data;
  },

  getPaymentHistory: async () => {
    const response = await axiosInstance.get("/payments/payment-history");
    return response.data;
  },
};
