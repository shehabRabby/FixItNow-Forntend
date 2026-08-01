import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://fix-it-now-mocha.vercel.app/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // ১. প্রথমে কুকি থেকে অথবা লোকালস্টোরেজ থেকে টোকেন নেওয়ার চেষ্টা করবে
    let token = Cookies.get("token");
    if (!token && typeof window !== "undefined") {
      token = localStorage.getItem("token") || undefined;
    }

    // কনসোলে চেক করার জন্য প্রিন্ট করে দেখাবে টোকেন পাওয়া যাচ্ছে কি না
    console.log("Axios Interceptor Token:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage =
      error.response?.data?.message ||
      "Something went wrong! Please try again.";
    return Promise.reject(new Error(errorMessage));
  },
);