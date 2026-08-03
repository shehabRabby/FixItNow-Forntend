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

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-800 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#EEF2FF] border-r border-indigo-100 flex flex-col justify-between p-4 shrink-0">
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
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom Part */}
        <div className="space-y-4 pt-6 border-t border-indigo-100/80">
          {/* User Profile Info */}
          <div className="flex items-center gap-3 px-2">
            <div className="relative w-10 h-10">
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

          {/* Settings & Logout */}
          <div className="space-y-1">
            <Link
              href="/admin-dashboard/settings"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-indigo-100/60 hover:text-slate-900 transition-all"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-all">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-xl">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Global search for users, pros, or bookings..."
              className="w-full pl-11 pr-4 py-2.5 bg-slate-100/70 border border-transparent rounded-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 transition-all"
            />
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-5">
            <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
            </button>
            <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
              <HelpCircle className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-full shadow-sm shadow-blue-500/20 transition-all">
              <span>Book Now</span>
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
