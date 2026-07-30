"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image"; // <--- ১. Next.js Image Component ইমপোর্ট করো
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { LogOut, Settings } from "lucide-react";
import { roleBaseNavItems } from "@/config/sidebar.config";
import { IUserProfile } from "@/types/user.interface";
import { getMyProfile } from "@/services/profile.service";

interface SidebarProps {
  role: "ADMIN" | "TECHNICIAN" | "CUSTOMER";
  userProfile?: IUserProfile | null;
}

export default function DashboardSidebar({ role, userProfile }: SidebarProps) {
  const pathname = usePathname();
  const navItems = roleBaseNavItems[role] || [];

  // Local state
  const [currentUser, setCurrentUser] = useState<IUserProfile | null>(
    userProfile || null
  );

  // Track key prop to derive state during render cycle
  const [prevUserProfile, setPrevUserProfile] = useState<IUserProfile | null | undefined>(userProfile);

  if (userProfile !== prevUserProfile) {
    setPrevUserProfile(userProfile);
    setCurrentUser(userProfile || null);
  }

  // Event Listener & Re-fetch Logic
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getMyProfile();
        if (data) {
          setCurrentUser(data);
        }
      } catch (error) {
        console.error("Failed to refresh sidebar profile:", error);
      }
    };

    if (!userProfile) {
      fetchUserData();
    }

    const handleProfileUpdate = () => {
      fetchUserData();
    };

    window.addEventListener("profileUpdated", handleProfileUpdate);
    return () => window.removeEventListener("profileUpdated", handleProfileUpdate);
  }, [userProfile]);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    window.dispatchEvent(new Event("auth-change"));
    window.location.href = "/login";
  };

  return (
    <aside className="w-64 bg-[#f8fafc] dark:bg-[#0f172a] border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between h-screen sticky top-0 px-4 py-6">
      <div>
        {/* Brand Logo */}
        <div className="px-3 mb-8">
          <Link
            href="/"
            className="text-2xl font-black text-blue-600 dark:text-blue-500 tracking-tight"
          >
            FixItNow
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Section */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        {/* User Card Widget */}
        <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-100/80 dark:bg-slate-800/50">
          {currentUser?.profileImg ? (
            /* ২. next/image ব্যবহার করা হয়েছে */
            <Image
              src={currentUser.profileImg}
              alt={currentUser?.name || "User Profile"}
              width={36}
              height={36}
              unoptimized // external/arbitrary URL থাকলে Next.js optimization-এর domain error এড়াতে
              className="w-9 h-9 rounded-full object-cover border border-slate-300 dark:border-slate-700"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
            </div>
          )}
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
              {currentUser?.name || "User Profile"}
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate capitalize">
              {currentUser?.role?.toLowerCase() || role.toLowerCase()}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-1">
          <Link
            href={`/${role.toLowerCase()}-dashboard/settings`}
            className="flex items-center gap-3 px-3.5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}