"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { categoryService } from "@/services/category.service";
import { ArrowLeft, Loader2, Wrench } from "lucide-react";
import { toast } from "sonner";

interface IService {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface ICategory {
  id: string;
  name: string;
  slug: string;
}

export default function TechnicianCategoryDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [services, setServices] = useState<IService[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categoryName, setCategoryName] = useState<string>("");

  useEffect(() => {
    const fetchCategoryAndJobs = async () => {
      try {
        const res = await categoryService.getAllCategories();
        if (res?.success) {
          const currentCat = res.data?.find(
            (cat: ICategory) => cat.slug === slug
          );
          if (currentCat) {
            setCategoryName(currentCat.name);
          }
        }
        setServices([]);
      } catch {
        toast.error("Failed to load category details!");
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchCategoryAndJobs();
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto min-h-screen">
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Categories</span>
        </button>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white capitalize">
            {categoryName ? `${categoryName} - Jobs & Services` : "Category Details"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Viewing tasks and services under category <span className="font-semibold text-blue-600">/{slug}</span>
          </p>
        </div>
      </div>

      {services.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <Wrench className="w-6 h-6" />
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            No active jobs or services found in this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {service.name}
              </h3>
              <p className="text-xs text-slate-500 mt-2">{service.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}