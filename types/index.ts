export type UserRole = "CUSTOMER" | "TECHNICIAN" | "ADMIN";
export type UserStatus = "ACTIVE" | "BANNED";

export type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";
export type PaymentProvider = "STRIPE" | "SSLCOMMERZ";

export interface IUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  phoneNumber?: string | null;
  address?: string | null;
  createdAt: string;
  updatedAt: string;
  technicianProfile?: ITechnicianProfile | null;
}

export interface ITechnicianProfile {
  id: string;
  userId: string;
  user?: IUser;
  skills: string;
  experienceYears: number;
  bio: string;
  availabilitySlots: string;
  ratingAverage: number;
  services?: IService[];
  reviews?: IReview[];
}

export interface ICategory {
  id: string;
  name: string;
  description?: string;
  slug: string;
}

export interface IService {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  categoryId: string;
  category?: ICategory;
  technicianProfile?: {
    id: string;
    user?: {
      name: string;
      email: string;
    };
  };
}

export interface IPayment {
  id: string;
  bookingId: string;
  booking?: IBooking;
  amount: number;
  method: string;
  provider: PaymentProvider;
  status: PaymentStatus;
  transactionId: string;
  paidAt?: string | null;
}

export interface IBooking {
  id: string;
  customerId: string;
  customer?: IUser;
  serviceId: string;
  service?: IService;
  timeSlot: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
  payment?: IPayment | null;
  review?: IReview | null;
}

export interface IReview {
  id: string;
  bookingId: string;
  booking?: IBooking;
  customerId: string;
  customer?: IUser;
  technicianProfileId: string;
  technicianProfile?: ITechnicianProfile;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}
