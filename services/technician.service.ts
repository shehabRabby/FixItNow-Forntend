import { axiosInstance } from "@/lib/axiosInstance";

export const getTechnicianProfile = async () => {
  try {
    const res = await axiosInstance.get("/technicians/profile");
    return res.data?.data;
  } catch (error: unknown) {
    console.error("Failed to fetch technician profile:", error);
    return null;
  }
};

export const updateTechnicianProfile = async (payload: Record<string, unknown>) => {
  try {
    const res = await axiosInstance.patch("/technicians/profile-update", payload);
    return res.data;
  } catch (error: unknown) {
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      throw new Error(axiosError.response?.data?.message || "Failed to update profile");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const updateAvailabilitySlots = async (slotsArray: string[]) => {
  try {
    const res = await axiosInstance.patch("/technicians/availability-slots", {
      availabilitySlots: slotsArray,
    });
    return res.data;
  } catch (error: unknown) {
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      throw new Error(axiosError.response?.data?.message || "Failed to update slots");
    }
    throw new Error("An unexpected error occurred");
  }
};