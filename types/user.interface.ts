export interface ITechnicianProfile {
  id: string;
  userId: string;
  skills?: string;
  experienceYears?: number;
  bio?: string;
  availabilitySlots?: string;
  ratingAverage?: number;
}

export interface IUserProfile {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "TECHNICIAN" | "CUSTOMER";
  phoneNumber?: string;
  address?: string;
  profileImg?: string;
  technicianProfile?: ITechnicianProfile | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAdminOverview {
  totalUsers: number;
  totalBookings: number;
  totalServices: number;
  totalRevenue: number;
  bookingStatusOverview: {
    [key: string]: number;
  };
}

export interface ITechnicianOverview {
  role: string;
  ratingAverage?: number;
  totalJobsAssigned: number;
  completedJobs: number;
  totalEarning: number;
}

export interface ICustomerOverview {
  role: string;
  totalBookings: number;
  pendingPayments: number;
  completedJobs: number;
}
