import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50/50 dark:bg-slate-950">
      {/* Dynamic Sidebar for Admin */}
      <DashboardSidebar
        role="ADMIN"
        userProfile={{ name: "Master Pro", roleTitle: "SYSTEM ADMIN" }}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Admin Header */}
        <DashboardHeader actionButtonText="Add New User" />

        {/* Main Content Area */}
        <main className="p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
