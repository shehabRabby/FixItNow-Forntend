"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { LogOut, LayoutDashboard, Wrench } from "lucide-react";
import NavLinks from "./NavLinks"; 

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [auth, setAuth] = useState<{
    token: string | null;
    role: string | null;
  }>({
    token: null,
    role: null,
  });

  const updateAuthState = useCallback(() => {
    const token = Cookies.get("token") || null;
    const role = Cookies.get("role") || null;

    queueMicrotask(() => {
      setAuth({ token, role });
    });
  }, []);

  useEffect(() => {
    updateAuthState();
    window.addEventListener("auth-change", updateAuthState);

    return () => {
      window.removeEventListener("auth-change", updateAuthState);
    };
  }, [updateAuthState]);

  if (
    pathname.includes("dashboard") ||
    pathname.startsWith("/admin-dashboard") ||
    pathname.startsWith("/technician-dashboard") ||
    pathname.startsWith("/customer-dashboard") ||
    pathname === "/login" ||
    pathname === "/register"
  ) {
    return null;
  }

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");

    window.dispatchEvent(new Event("auth-change"));

    toast.success("Logged out successfully!");
    router.push("/login");
  };

  const getDashboardLink = () => {
    if (auth.role === "ADMIN") return "/admin-dashboard";
    if (auth.role === "TECHNICIAN") return "/technician-dashboard";
    return "/customer-dashboard";
  };

  return (
    <header className="w-full bg-white dark:bg-[#0f172a] border-b border-slate-200 dark:border-slate-800 px-6 py-4 transition-colors sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-blue-600 dark:text-blue-500"
        >
          <div className="p-1.5 bg-blue-600 text-white rounded-lg">
            <Wrench className="w-5 h-5" />
          </div>
          <span>FixItNow</span>
        </Link>

        {/* navigation links */}
        <NavLinks />

        {/* Dynamic Auth Section */}
        <nav className="flex items-center gap-4 text-sm font-medium">
          {auth.token ? (
            <>
              <Link
                href={getDashboardLink()}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              >
                <LayoutDashboard className="w-4 h-4 text-blue-600" />
                <span>Dashboard</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-all"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-sm"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}