const NEXT_PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const getAllCategories = async () => {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/categories`, {
      next: { revalidate: 60 }, // Cache refresh every 60 seconds
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { success: false, data: [] };
  }
};