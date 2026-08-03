import { axiosInstance } from "@/lib/axiosInstance";


export const bookingService = {
  getAllBookings: async () => {
    const res = await axiosInstance.get("/bookings");
    return res.data;
  },

  cancelBooking: async (id: string) => {
    const res = await axiosInstance.patch(`/bookings/${id}/cancel`);
    return res.data;
  },
};