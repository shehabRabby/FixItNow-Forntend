export interface Category {
  id: string;
  name: string;
  description?: string;
  slug: string;
}

export interface TechnicianUser {
  name: string;
  email: string;
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
  category: Category;
  technicianProfileId: string;
  technicianProfile?: TechnicianProfile;
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