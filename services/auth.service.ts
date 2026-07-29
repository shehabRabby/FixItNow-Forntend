export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  role: "CUSTOMER" | "TECHNICIAN";
  password: string;
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
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "CUSTOMER" | "TECHNICIAN";
  };
}

export const authService = {
  async register(payload: RegisterPayload): Promise<ApiResponse> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
  },

  //login method
  async login(payload: LoginPayload): Promise<ApiResponse<LoginResponseData>> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  },

  //logout
  logout() {
    //token clear
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  },
};
