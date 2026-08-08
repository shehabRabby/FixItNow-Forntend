"use client";

import { useEffect, useState, useMemo } from "react";
import { paymentService } from "@/services/payment.service";
import {
  Search,
  Wrench,
  Smartphone,
  CreditCard,
  ArrowUpRight,
} from "lucide-react";
import { PaymentStats } from "@/components/payments/PaymentStats";
import { SpendingAnalytics } from "@/components/payments/SpendingAnalytics";
import { SavedMethods } from "@/components/payments/SavedMethods";
import { HelpAndSupport } from "@/components/payments/HelpAndSupport";
import { BillingInfo } from "@/components/payments/BillingInfo";
import { FinancialSecurity } from "@/components/payments/FinancialSecurity";

interface PaymentItem {
  id: string;
  amount: number;
  method: string;
  status: string;
  transactionId: string;
  createdAt: string;
  booking?: {
    service?: {
      name?: string;
    };
  };
}

export default function PaymentHistoryPage() {
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"All" | "COMPLETED" | "PENDING">(
    "All",
  );

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await paymentService.getPaymentHistory();
        if (res?.success) {
          setPayments(res.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch payment history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const totalSpent = useMemo(() => {
    return payments
      .filter((p) => p.status === "COMPLETED")
      .reduce((sum, item) => sum + (item.amount || 0), 0);
  }, [payments]);

  const completedJobsCount = useMemo(() => {
    return payments.filter((p) => p.status === "COMPLETED").length;
  }, [payments]);

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const serviceName = payment.booking?.service?.name || "Service Payment";
      const matchesSearch =
        serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (payment.transactionId &&
          payment.transactionId
            .toLowerCase()
            .includes(searchQuery.toLowerCase()));

      if (activeTab === "All") return matchesSearch;
      if (activeTab === "COMPLETED")
        return matchesSearch && payment.status === "COMPLETED";
      if (activeTab === "PENDING")
        return matchesSearch && payment.status !== "COMPLETED";

      return matchesSearch;
    });
  }, [payments, searchQuery, activeTab]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto min-h-screen animate-in fade-in duration-500">
      {/* Top Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Payment History
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            View all your previous payments and transaction details
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
          />
        </div>
      </div>

      {/* 1. Statistics Cards Component */}
      <PaymentStats
        totalSpent={totalSpent}
        completedJobsCount={completedJobsCount}
      />

      {/* 2. Spending Analytics & Category Split Component */}
      <SpendingAnalytics />

      {/* 3. Recent Transactions Table Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Recent Transactions
          </h3>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
            <button
              onClick={() => setActiveTab("All")}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "All"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("COMPLETED")}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "COMPLETED"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setActiveTab("PENDING")}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "PENDING"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Pending
            </button>
          </div>
        </div>

        {filteredPayments.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              No payment records found.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6">Service Details</th>
                  <th className="py-4 px-6">Transaction ID</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6">Payment Method</th>
                  <th className="py-4 px-6">Amount</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                {filteredPayments.map((payment) => {
                  const serviceName =
                    payment.booking?.service?.name || "Service Payment";
                  const isBkash = payment.method?.toUpperCase() === "BKASH";

                  return (
                    <tr
                      key={payment.id}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors group"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-inner">
                            <Wrench className="w-4 h-4" />
                          </div>
                          <span className="font-bold text-slate-900 dark:text-white line-clamp-1">
                            {serviceName}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-6 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                        {payment.transactionId || "N/A"}
                      </td>

                      <td className="py-4 px-6 text-slate-500 dark:text-slate-400 font-medium">
                        {payment.createdAt
                          ? new Date(payment.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )
                          : "N/A"}
                      </td>

                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-bold ${
                            isBkash
                              ? "bg-pink-50 text-pink-600 border border-pink-100 dark:bg-pink-950/30"
                              : "bg-blue-50 text-blue-600 border border-blue-100 dark:bg-blue-950/30"
                          }`}
                        >
                          {isBkash ? (
                            <Smartphone className="w-3 h-3" />
                          ) : (
                            <CreditCard className="w-3 h-3" />
                          )}
                          {payment.method || "CARD"}
                        </span>
                      </td>

                      <td className="py-4 px-6 font-black text-slate-900 dark:text-white text-sm">
                        ৳{payment.amount?.toLocaleString()}
                      </td>

                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${
                            payment.status === "COMPLETED"
                              ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${payment.status === "COMPLETED" ? "bg-emerald-500" : "bg-amber-500"}`}
                          ></span>
                          {payment.status}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <button className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-blue-600 dark:hover:text-white transition-all cursor-pointer inline-flex items-center justify-center">
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 4. Bottom Grid: Saved Methods, Help & Support, Billing Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SavedMethods />
        <HelpAndSupport />
        <BillingInfo />
      </div>

      {/* 5. Financial Security Banner Component */}
      <FinancialSecurity />
    </div>
  );
}
