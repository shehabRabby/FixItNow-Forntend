export interface Category {
  id: string;
  name: string;
  description?: string;
  slug: string;
}

export interface TechnicianUser {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
}

export interface TechnicianProfile {
  id: string;
  userId?: string;
  bio?: string;
  experience?: number;
  experienceYears?: number; // ব্যাকএন্ড থেকে আসার জন্য
  skills?: string;          // ব্যাকএন্ড থেকে আসার জন্য
  availabilitySlots?: string; // ব্যাকএন্ড থেকে আসার জন্য
  ratingAverage?: number;   // ব্যাকএন্ড থেকে আসার জন্য
  user?: TechnicianUser;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  categoryId: string;
  category?: Category;
  technicianProfileId: string;
  technicianProfile?: TechnicianProfile;
  image?: string;
  rating?: number;
  reviewsCount?: number;
  providerName?: string; 
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface ServicesResponse {
  success: boolean;
  message: string;
  meta: Meta;
  data: Service[];
}