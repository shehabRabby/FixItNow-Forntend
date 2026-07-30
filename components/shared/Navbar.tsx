"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { LogOut, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [auth, setAuth] = useState<{
    token: string | null;
    role: string | null;
  }>({
    token: null,
    role: null,
  });

  // কুকি থেকে স্টেট আপডেট করার নিরাপদ ফাংশন
  const updateAuthState = useCallback(() => {
    const token = Cookies.get("token") || null;
    const role = Cookies.get("role") || null;

    // React Safe Approach: microtask ব্যবহার করা যেন cascading renders না ঘটে
    queueMicrotask(() => {
      setAuth({ token, role });
    });
  }, []);

  useEffect(() => {
    // ১. প্রথমবার লোডের সময় সেফ উপায়ে চেক করবে
    updateAuthState();

    // ২. Login বা Logout হলে ইভেন্ট শুনে সাথে সাথে স্টেট আপডেট করবে
    window.addEventListener("auth-change", updateAuthState);

    return () => {
      window.removeEventListener("auth-change", updateAuthState);
    };
  }, [updateAuthState]);

  // Logout Function
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");

    // ইভেন্ট ডিসপ্যাচ করা যেন Navbar সাথে সাথে আপডেট হয়
    window.dispatchEvent(new Event("auth-change"));

    toast.success("Logged out successfully!");
    router.push("/login");
  };

  // Role অনুযায়ী সঠিক ড্যাশবোর্ড ইউআরএল নির্ধারণ
  const getDashboardLink = () => {
    if (auth.role === "ADMIN") return "/admin-dashboard";
    if (auth.role === "TECHNICIAN") return "/technician-dashboard";
    return "/customer-dashboard";
  };

  return (
    <header className="w-full bg-white dark:bg-[#0f172a] border-b border-slate-200 dark:border-slate-800 px-6 py-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo / Name */}
        <Link
          href="/"
          className="text-xl font-bold text-blue-600 dark:text-blue-500"
        >
          FixItNow
        </Link>

        {/* Dynamic Auth Section */}
        <nav className="flex items-center gap-4 text-sm font-medium">
          {auth.token ? (
            /* 🟢 Logged In State */
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
            /* 🔴 Logged Out State */
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
