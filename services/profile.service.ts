import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

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
      console.error("Backend Error on /my-profile:", error.response?.data || error.message);
    } else {
      console.error("Unexpected Error on /my-profile:", error);
    }
    return null;
  }
};

export const getDashboardOverview = async () => {
  const token = Cookies.get("token");
  if (!token) return null;

  try {
    const res = await axios.get(`${API_URL}/profile/dashboard-overview`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return res.data?.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Backend Error on /dashboard-overview:", error.response?.data || error.message);
    } else {
      console.error("Unexpected Error on /dashboard-overview:", error);
    }
    return null;
  }
};

export const updateMyProfile = async (payload: Record<string, unknown>) => {
  const token = Cookies.get("token");
  if (!token) return null;

  try {
    // URL-এ /update-my-profile বদলে ব্যাকএন্ডের সাথে মিলিয়ে /update-profile করা হয়েছে
    const res = await axios.patch(`${API_URL}/profile/update-profile`, payload, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Backend Error on /update-profile:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Failed to update profile");
    } else {
      console.error("Unexpected Error on /update-profile:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};