import {
  LayoutDashboard,
  Users,
  Wrench,
  CalendarDays,
  FolderTree,
  BarChart3,
  DollarSign,
  Star,
  HelpCircle,
  Layers,
} from "lucide-react";

export const roleBaseNavItems = {
  ADMIN: [
    { label: "Dashboard", href: "/admin-dashboard", icon: LayoutDashboard },
    { label: "Users", href: "/admin-dashboard/users", icon: Users },
    {
      label: "Technicians",
      href: "/admin-dashboard/technicians",
      icon: Wrench,
    },
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
      label: "Categories",
      href: "/technician-dashboard/categories",
      icon: Layers,
    },
    {
      label: "Bookings",
      href: "/technician-dashboard/bookings",
      icon: CalendarDays,
    },
    {
      label: "Earnings",
      href: "/technician-dashboard/earnings",
      icon: DollarSign,
    },
    { label: "Reviews", href: "/technician-dashboard/reviews", icon: Star },
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
    {
      label: "Bookings",
      href: "/customer-dashboard/bookings",
      icon: CalendarDays,
    },
    { label: "Services", href: "/customer-dashboard/services", icon: Wrench },
    { label: "Reviews", href: "/customer-dashboard/reviews", icon: Star },
    { label: "Support", href: "/customer-dashboard/support", icon: HelpCircle },
  ],
};
