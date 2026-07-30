
import Cookies from "js-cookie";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "TECHNICIAN";
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

export interface LoginResponseData {
  accessToken?: string;
  token?: string;
  refreshToken?: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "CUSTOMER" | "TECHNICIAN";
  };
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const authService = {
  // 🟢 Updated URL: Points to /users/register
  async register(payload: RegisterPayload): Promise<ApiResponse> {
    const res = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
  },

  // 🟢 Login Endpoint
  async login(payload: LoginPayload): Promise<ApiResponse<LoginResponseData>> {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    // Save tokens in cookies
    if (data.data?.accessToken) {
      Cookies.set("token", data.data.accessToken, { expires: 7 });
      Cookies.set("role", data.data.user.role, { expires: 7 });
    }

    return data;
  },

  logout() {
    Cookies.remove("token");
    Cookies.remove("role");
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  },
};

