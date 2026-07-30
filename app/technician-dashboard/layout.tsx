import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";

export default function TechnicianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <DashboardSidebar
        role="TECHNICIAN"
        userProfile={{ name: "Master Pro", roleTitle: "Verified Technician" }}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader actionButtonText="Add New Pro" />
        <main className="p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
