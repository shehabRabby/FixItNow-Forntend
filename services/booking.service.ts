import { axiosInstance } from "@/lib/axiosInstance";


export const bookingService = {
  // কাস্টমার বা ইউজারের বুকিং ফেচ করা
  getAllBookings: async () => {
    const res = await axiosInstance.get("/bookings");
    return res.data;
  },

  // কাস্টমার কর্তৃক বুকিং ক্যানসেল করা
  cancelBooking: async (id: string) => {
    const res = await axiosInstance.patch(`/bookings/${id}/cancel`);
    return res.data;
  },
};