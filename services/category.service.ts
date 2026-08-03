import Cookies from "js-cookie";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export interface ICategoryPayload {
  name: string;
  slug?: string;
  description?: string;
}

const getAuthHeaders = (): Record<string, string> => {
  let rawToken: string | undefined = undefined;

  if (typeof window !== "undefined") {
    rawToken =
      Cookies.get("token") ||
      Cookies.get("accessToken") ||
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken") ||
      undefined;
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (rawToken) {
    let cleanedToken = rawToken.trim().replace(/^"+|"+$/g, "");

    if (cleanedToken.startsWith("Bearer ")) {
      cleanedToken = cleanedToken.replace("Bearer ", "").trim();
    }
    headers["Authorization"] = cleanedToken;
    headers["token"] = cleanedToken;
  }

  return headers;
};

export const categoryService = {

  async getAllCategories() {
    try {
      const res = await fetch(`${API_URL}/categories`, {
        method: "GET",
        cache: "no-store",
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || "Failed to fetch categories");
      }

      return data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  async createCategory(payload: ICategoryPayload) {
    const res = await fetch(`${API_URL}/categories/create-category`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(
        data?.message || `Failed to create category (${res.status})`
      );
    }

    return data;
  },

  async updateCategory(id: string, payload: Partial<ICategoryPayload>) {
    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(
        data?.message || `Failed to update category (${res.status})`
      );
    }

    return data;
  },

  async deleteCategory(id: string) {
    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(
        data?.message || `Failed to delete category (${res.status})`
      );
    }

    return data;
  },
};