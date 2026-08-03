export interface Category {
  id: string;
  name: string;
  description?: string;
  slug: string;
}

export interface TechnicianUser {
  id?: string;
  name: string;
  email: string;
  image?: string;
}

export interface TechnicianProfile {
  id: string;
  bio?: string;
  experience?: number;
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