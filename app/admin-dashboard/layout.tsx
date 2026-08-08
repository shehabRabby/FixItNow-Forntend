"use client";

import { useEffect, useState } from "react";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import { getMyProfile } from "@/services/profile.service";
import { IUserProfile } from "@/types/user.interface";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] = useState<IUserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch admin profile", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50/70 dark:bg-slate-950 font-sans selection:bg-blue-500 selection:text-white relative">
      {/* Sidebar Component: এটি ডেস্কটপে ফিক্সড সাইডবার হিসেবে থাকবে */}
      <DashboardSidebar role="ADMIN" userProfile={profile} />

      {/* Main Content Area: ছোট স্ক্রিন থেকে শুরু করে সব ডিভাইসে ফুল উইডথ ও সুন্দরভাবে দেখাবে */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden w-full">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}