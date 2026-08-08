"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Banknote,
  Star,
  Settings,
  LogOut,
  Search,
  Bell,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";

const navItems = [
  { label: "Dashboard", href: "/admin-dashboard", icon: LayoutDashboard },
  { label: "Users", href: "/admin-dashboard/users", icon: Users },
  { label: "Bookings", href: "/admin-dashboard/bookings", icon: Calendar },
  { label: "Earnings", href: "/admin-dashboard/earnings", icon: Banknote },
  { label: "Reviews", href: "/admin-dashboard/reviews", icon: Star },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-800 font-sans relative">
      
      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Sliding Sidebar (Drawer) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#EEF2FF] border-r border-indigo-100 flex flex-col justify-between p-4 transition-transform duration-300 md:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Brand Logo & Close Button */}
          <div className="px-4 py-3 mb-6 flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-black text-[#1D4ED8] tracking-tight"
            >
              FixItNow
            </Link>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href === "/admin-dashboard/users" &&
                  pathname.includes("users"));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/20"
                      : "text-slate-600 hover:bg-indigo-100/60 hover:text-slate-900"
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom Part */}
        <div className="space-y-4 pt-6 border-t border-indigo-100/80">
          <div className="flex items-center gap-3 px-2">
            <div className="relative w-10 h-10 shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Master Pro"
                fill
                sizes="40px"
                className="rounded-full object-cover border-2 border-white shadow-sm"
              />
            </div>
            <div className="overflow-hidden">
              <h4 className="text-sm font-bold text-slate-900 truncate">
                Master Pro
              </h4>
              <p className="text-xs text-slate-500 truncate">
                Verified Technician
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <Link
              href="/admin-dashboard/settings"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-indigo-100/60 hover:text-slate-900 transition-all"
            >
              <Settings className="w-5 h-5 shrink-0" />
              <span>Settings</span>
            </Link>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-all cursor-pointer">
              <LogOut className="w-5 h-5 shrink-0" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Desktop Sticky Sidebar */}
      <aside className="hidden md:flex w-64 bg-[#EEF2FF] border-r border-indigo-100 flex-col justify-between p-4 shrink-0 h-screen sticky top-0">
        <div>
          {/* Brand Logo */}
          <div className="px-4 py-3 mb-6">
            <Link
              href="/"
              className="text-2xl font-black text-[#1D4ED8] tracking-tight"
            >
              FixItNow
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href === "/admin-dashboard/users" &&
                  pathname.includes("users"));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/20"
                      : "text-slate-600 hover:bg-indigo-100/60 hover:text-slate-900"
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom Part */}
        <div className="space-y-4 pt-6 border-t border-indigo-100/80">
          <div className="flex items-center gap-3 px-2">
            <div className="relative w-10 h-10 shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Master Pro"
                fill
                sizes="40px"
                className="rounded-full object-cover border-2 border-white shadow-sm"
              />
            </div>
            <div className="overflow-hidden">
              <h4 className="text-sm font-bold text-slate-900 truncate">
                Master Pro
              </h4>
              <p className="text-xs text-slate-500 truncate">
                Verified Technician
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <Link
              href="/admin-dashboard/settings"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-indigo-100/60 hover:text-slate-900 transition-all"
            >
              <Settings className="w-5 h-5 shrink-0" />
              <span>Settings</span>
            </Link>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-all cursor-pointer">
              <LogOut className="w-5 h-5 shrink-0" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-slate-100 px-4 sm:px-8 flex items-center justify-between gap-2 sm:gap-4 sticky top-0 z-30">
          
          {/* Hamburger Menu Button for Small/Medium Devices */}
          <button
            onClick={() => setIsMobileOpen(true)}
            className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition cursor-pointer shrink-0"
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Search Input */}
          <div className="relative flex-1 max-w-xl">
            <Search className="w-4 h-4 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Global search for users, pros, or bookings..."
              className="w-full pl-9 sm:pl-11 pr-4 py-2 sm:py-2.5 bg-slate-100/70 border border-transparent rounded-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 transition-all"
            />
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-5 shrink-0">
            <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
            </button>
            <button className="hidden sm:block p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer">
              <HelpCircle className="w-5 h-5" />
            </button>
            <button className="hidden sm:flex items-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-full shadow-sm shadow-blue-500/20 transition-all cursor-pointer">
              <span>Book Now</span>
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto w-full">{children}</main>
      </div>
    </div>
  );
}