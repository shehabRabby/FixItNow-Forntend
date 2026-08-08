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
      const data = await getMyProfile();
      setProfile(data);
    };
    fetchProfile();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <DashboardSidebar role="ADMIN" userProfile={profile} />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
