"use client";

import { recentTransactions } from "../reports.data";

export function ReportTransactionTable() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Recent Transactions
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Overview of recent financial transactions on the platform
          </p>
        </div>
        <button
          onClick={() => alert("Report exported successfully!")}
          className="w-full sm:w-auto px-4 py-2 text-xs font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl hover:opacity-90 transition text-center"
        >
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-xs font-semibold text-slate-500">
              <th className="p-3 sm:p-4">Transaction ID</th>
              <th className="p-3 sm:p-4">Service Name</th>
              <th className="p-3 sm:p-4">Customer</th>
              <th className="p-3 sm:p-4">Amount</th>
              <th className="p-3 sm:p-4">Status</th>
              <th className="p-3 sm:p-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
            {recentTransactions.map((trx) => (
              <tr key={trx.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition">
                <td className="p-3 sm:p-4 font-medium text-slate-900 dark:text-white whitespace-nowrap">{trx.id}</td>
                <td className="p-3 sm:p-4 text-slate-600 dark:text-slate-300">{trx.serviceName}</td>
                <td className="p-3 sm:p-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">{trx.customerName}</td>
                <td className="p-3 sm:p-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap">{trx.amount}</td>
                <td className="p-3 sm:p-4 whitespace-nowrap">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                      trx.status === "Completed"
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50"
                        : trx.status === "Pending"
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50"
                        : "bg-rose-50 text-rose-600 dark:bg-rose-950/50"
                    }`}
                  >
                    {trx.status}
                  </span>
                </td>
                <td className="p-3 sm:p-4 text-slate-500 text-xs whitespace-nowrap">{trx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}