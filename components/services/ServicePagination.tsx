"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Meta } from "@/types/service";

interface ServicePaginationProps {
  meta: Meta;
  page: number;
  setPage: (page: number | ((prev: number) => number)) => void;
}

export default function ServicePagination({ meta, page, setPage }: ServicePaginationProps) {
  if (meta.totalPage <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800 pt-6">
      <span className="text-xs text-slate-500 dark:text-slate-400">
        Showing page <strong>{meta.page}</strong> of <strong>{meta.totalPage}</strong> ({meta.total} total)
      </span>

      <div className="flex items-center gap-1.5">
        <button
          disabled={page <= 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {Array.from({ length: meta.totalPage }, (_, i) => i + 1)
          .filter((p) => p === 1 || p === meta.totalPage || Math.abs(p - page) <= 1)
          .map((p, index, array) => {
            const showEllipsis = index > 0 && p - array[index - 1] > 1;
            return (
              <div key={p} className="flex items-center gap-1">
                {showEllipsis && <span className="text-xs text-slate-400 px-1">...</span>}
                <button
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-xl text-xs font-semibold transition-colors ${
                    page === p
                      ? "bg-blue-600 text-white"
                      : "border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {p}
                </button>
              </div>
            );
          })}

        <button
          disabled={page >= meta.totalPage}
          onClick={() => setPage((prev) => prev + 1)}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
          aria-label="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}