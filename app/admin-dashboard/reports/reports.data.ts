export interface IReportMetric {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface ITransactionReport {
  id: string;
  serviceName: string;
  customerName: string;
  amount: string;
  status: "Completed" | "Pending" | "Failed";
  date: string;
}

export const reportMetrics: IReportMetric[] = [
  { title: "Total Platform Revenue", value: "$12,450", change: "+12.5%", isPositive: true },
  { title: "Completed Services", value: "328", change: "+8.2%", isPositive: true },
  { title: "Active Customers", value: "1,240", change: "+15.4%", isPositive: true },
  { title: "Pending Payouts", value: "$1,420", change: "-2.1%", isPositive: false },
];

export const recentTransactions: ITransactionReport[] = [
  { id: "TRX-101", serviceName: "AC Repair & Maintenance", customerName: "John Doe", amount: "$120", status: "Completed", date: "2026-06-01" },
  { id: "TRX-102", serviceName: "Deep Home Cleaning", customerName: "Sarah Smith", amount: "$85", status: "Completed", date: "2026-06-02" },
  { id: "TRX-103", serviceName: "Plumbing Leak Fix", customerName: "Michael Johnson", amount: "$50", status: "Pending", date: "2026-06-03" },
  { id: "TRX-104", serviceName: "Electrical Wiring Check", customerName: "Emma Watson", amount: "$200", status: "Completed", date: "2026-06-04" },
  { id: "TRX-105", serviceName: "Refrigerator Servicing", customerName: "David Miller", amount: "$90", status: "Failed", date: "2026-06-05" },
];