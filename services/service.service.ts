const NEXT_PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export interface IServiceFilterParams {
  searchTerm?: string;
  categoryId?: string;
  minPrice?: string;
  maxPrice?: string;
  location?: string;
  page?: number;
  limit?: number;
}

export const getAllServices = async (params?: IServiceFilterParams) => {
  try {
    const query = new URLSearchParams();

    if (params?.searchTerm) query.append("searchTerm", params.searchTerm);
    if (params?.categoryId) query.append("categoryId", params.categoryId);
    if (params?.minPrice) query.append("minPrice", params.minPrice);
    if (params?.maxPrice) query.append("maxPrice", params.maxPrice);
    if (params?.location) query.append("location", params.location);
    if (params?.page) query.append("page", params.page.toString());
    if (params?.limit) query.append("limit", params.limit.toString());

    const queryString = query.toString();
    const url = `${NEXT_PUBLIC_API_URL}/services${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(url, {
      cache: "no-store", 
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching services:", error);
    return { success: false, data: [], meta: null };
  }
};

export const getServiceById = async (id: string) => {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/services/${id}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching single service:", error);
    return { success: false, data: null };
  }
};
