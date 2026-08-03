import {
  LayoutDashboard,
  Users,
  Wrench,
  CalendarDays,
  FolderTree,
  BarChart3,
  Star,
  HelpCircle,
  Layers,
  User,
  Clock,
  CalendarCheck,
  Briefcase,
  CreditCard,
} from "lucide-react";

export const roleBaseNavItems = {
  ADMIN: [
    { label: "Dashboard", href: "/admin-dashboard", icon: LayoutDashboard },
    { label: "Users", href: "/admin-dashboard/users", icon: Users },
    {
      label: "Bookings",
      href: "/admin-dashboard/bookings",
      icon: CalendarDays,
    },
    {
      label: "Categories",
      href: "/admin-dashboard/categories",
      icon: FolderTree,
    },
    { label: "Reports", href: "/admin-dashboard/reports", icon: BarChart3 },
  ],
  TECHNICIAN: [
    {
      label: "Dashboard",
      href: "/technician-dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Manage Services",
      href: "/technician-dashboard/services",
      icon: Briefcase,
    },
    {
      label: "Bookings",
      href: "/technician-dashboard/bookings",
      icon: CalendarCheck,
    },
    {
      label: "My Profile",
      href: "/technician-dashboard/profile",
      icon: User,
    },
    {
      label: "Availability Slots",
      href: "/technician-dashboard/availability",
      icon: Clock,
    },
    {
      label: "Reviews",
      href: "/technician-dashboard/reviews", 
      icon: Star, 
    },
    {
      label: "Support",
      href: "/technician-dashboard/support",
      icon: HelpCircle,
    },
  ],
  CUSTOMER: [
    { label: "Dashboard", href: "/customer-dashboard", icon: LayoutDashboard },
    {
      label: "Categories",
      href: "/customer-dashboard/categories",
      icon: Layers,
    },
    { label: "Services", href: "/customer-dashboard/services", icon: Wrench },
    {
      label: "Bookings",
      href: "/customer-dashboard/bookings",
      icon: CalendarDays,
    },
    {
      label: "Payment History",
      href: "/customer-dashboard/payment-history", 
      icon: CreditCard,
    },
    { label: "Reviews", href: "/customer-dashboard/reviews", icon: Star },
    { label: "Support", href: "/customer-dashboard/support", icon: HelpCircle },
  ],
};
