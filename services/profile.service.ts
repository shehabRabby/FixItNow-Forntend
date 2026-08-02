import { IAdminOverview } from "@/types/user.interface";
import axios from "axios";
import Cookies from "js-cookie";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const getMyProfile = async () => {
  const token = Cookies.get("token");
  if (!token) {
    console.warn("No token found in cookies!");
    return null;
  }

  try {
    const res = await axios.get(`${API_URL}/profile/my-profile`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return res.data?.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Backend Error on /my-profile:",
        error.response?.data || error.message,
      );
    } else {
      console.error("Unexpected Error on /my-profile:", error);
    }
    return null;
  }
};

// শুধু অ্যাডমিনের জন্য
export const getAdminDashboardOverview =
  async (): Promise<IAdminOverview | null> => {
    const token = Cookies.get("token");
    if (!token) return null;

    try {
      const res = await axios.get(`${API_URL}/admin/overview`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      return res.data?.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Backend Error on /admin/overview:",
          error.response?.data || error.message,
        );
      } else {
        console.error("Unexpected Error on /admin/overview:", error);
      }
      return null;
    }
  };

// কাস্টমারের জন্য নতুন ওভারভিউ ফাংশন
export const getCustomerDashboardOverview = async () => {
  const token = Cookies.get("token");
  if (!token) return null;

  try {
    // তোমার ব্যাকএন্ড রাউট রাউটার ফাইলের সঙ্গে মিলিয়ে এখানে '/bookings' দিতে হবে
    const res = await axios.get(`${API_URL}/bookings`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    const bookings = res.data?.data || [];

    // ফ্রন্টএন্ডে স্ট্যাটাসগুলো হিসাব করে ওভারভিউ অবজেক্ট তৈরি করা
    const totalBookings = bookings.length;
    const completedJobs = bookings.filter(
      (b: { status: string }) =>
        b.status === "COMPLETED" || b.status === "Completed",
    ).length;
    const pendingPayments = bookings.filter(
      (b: { paymentStatus: string }) =>
        b.paymentStatus === "PENDING" || b.paymentStatus === "Pending",
    ).length;

    return {
      totalBookings,
      pendingPayments,
      completedJobs,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Backend Error on fetching customer bookings:",
        error.response?.data || error.message,
      );
    } else {
      console.error("Unexpected Error:", error);
    }
    return {
      totalBookings: 0,
      pendingPayments: 0,
      completedJobs: 0,
    };
  }
};

export const updateMyProfile = async (payload: Record<string, unknown>) => {
  const token = Cookies.get("token");
  if (!token) return null;

  try {
    const res = await axios.patch(
      `${API_URL}/profile/update-profile`,
      payload,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Backend Error on /update-profile:",
        error.response?.data || error.message,
      );
      throw new Error(
        error.response?.data?.message || "Failed to update profile",
      );
    } else {
      console.error("Unexpected Error on /update-profile:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};
