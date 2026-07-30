import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <DashboardSidebar
        role="CUSTOMER"
        userProfile={{ name: "Customer User", roleTitle: "Verified Client" }}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader actionButtonText="Book Now" />
        <main className="p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
