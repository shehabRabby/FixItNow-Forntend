"use client";

import Image from "next/image";
import { Edit3, Trash2, Tag } from "lucide-react";

export interface ICategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  _id?: string; 
}

interface CategoryCardProps {
  category: ICategory;
  isAdmin?: boolean;
  onEdit: (category: ICategory) => void;
  onDelete: (id: string) => void;
}


const getCategoryImageUrl = (name: string = "") => {
  const imagePool = [
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505798577917-a65157d3320a?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=600&auto=format&fit=crop",
  ];

  if (!name) return imagePool[0];

  let charCodeSum = 0;
  for (let i = 0; i < name.length; i++) {
    charCodeSum += name.charCodeAt(i);
  }
  return imagePool[charCodeSum % imagePool.length];
};

export function CategoryCard({
  category,
  isAdmin = false,
  onEdit,
  onDelete,
}: CategoryCardProps) {
  const imageUrl = getCategoryImageUrl(category?.name);
  const categoryId = category?.id || category?._id || "";

  return (
    <div className="group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-blue-500/30 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Banner / Image */}
        <div className="relative h-36 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <Image
            src={imageUrl}
            alt={category?.name || "Category image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-blue-600/90 backdrop-blur-md text-white text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg shadow-sm">
            <Tag className="w-3 h-3" />
            <span>/{category?.slug || "no-slug"}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white capitalize group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {category?.name || "Untitled Category"}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {category?.description || "No description provided for this category."}
          </p>
        </div>
      </div>

      {/* Action Footer - Rendered conditionally for Admin only */}
      {isAdmin && (
        <div className="p-3.5 bg-slate-50/80 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800/80 flex justify-end items-center gap-1.5">
          <button
            type="button"
            onClick={() => onEdit(category)}
            className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all duration-200 text-xs font-medium flex items-center gap-1 cursor-pointer"
            title="Edit Category"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
          <button
            type="button"
            onClick={() => onDelete(categoryId)}
            className="p-2 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all duration-200 text-xs font-medium flex items-center gap-1 cursor-pointer"
            title="Delete Category"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
}