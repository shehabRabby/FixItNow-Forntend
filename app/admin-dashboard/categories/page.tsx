"use client";

import { useState, useEffect, useMemo, useCallback, useSyncExternalStore } from "react";
import { Plus, Search, Layers } from "lucide-react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { categoryService, ICategoryPayload } from "@/services/category.service";
import { CategoryCard, ICategory } from "@/components/category/CategoryCard";
import { CategoryModal } from "@/components/category/CategoryModal";
import { DeleteConfirmationModal } from "@/components/category/DeleteConfirmationModal";
import { CategorySkeleton } from "@/components/category/CategorySkeleton";

// Hydration Safe Custom Hook 
const emptySubscribe = () => () => {};
function useHasMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,  // Client side 
    () => false  // Server side
  );
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(
    null
  );

  // States for Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deletingCategory, setDeletingCategory] = useState<ICategory | null>(
    null
  );

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Safe Hydration Check Hook
  const hasMounted = useHasMounted();

  // Categories Re-fetch function
  const refetchCategories = useCallback(async () => {
    try {
      const res = await categoryService.getAllCategories();
      if (res?.success) {
        setCategories(res.data || []);
      }
    } catch {
      toast.error("Failed to refresh categories!");
    }
  }, []);

  // Initial Data & Auth Check
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        // Check Admin Status from Cookies/LocalStorage safely
        const role =
          Cookies.get("role") ||
          Cookies.get("userRole") ||
          (typeof window !== "undefined"
            ? localStorage.getItem("role") || localStorage.getItem("userRole")
            : null);

        if (role && role.toUpperCase() === "ADMIN") {
          setIsAdmin(true);
        }

        const res = await categoryService.getAllCategories();
        if (isMounted && res?.success) {
          setCategories(res.data || []);
        }
      } catch {
        if (isMounted) toast.error("Failed to load categories!");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Handlers
  const handleOpenCreateModal = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (category: ICategory) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (id: string) => {
    const targetCategory = categories.find((cat) => cat.id === id);
    if (targetCategory) {
      setDeletingCategory(targetCategory);
      setIsDeleteModalOpen(true);
    }
  };

  const handleSubmit = async (formData: ICategoryPayload) => {
    setIsSubmitting(true);
    try {
      if (editingCategory) {
        await categoryService.updateCategory(editingCategory.id, formData);
        toast.success("Category updated successfully!");
      } else {
        await categoryService.createCategory(formData);
        toast.success("Category created successfully!");
      }
      
      setIsModalOpen(false);
      setEditingCategory(null);

      await refetchCategories();
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err?.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Instant UI Update with Server Sync
  const handleConfirmDelete = async () => {
    if (!deletingCategory) return;

    const targetId = deletingCategory.id;
    setIsDeleting(true);

    try {
      await categoryService.deleteCategory(targetId);
      toast.success("Category deleted successfully!");

      // Optimistic UI update
      setCategories((prev) => prev.filter((cat) => cat.id !== targetId));

      setIsDeleteModalOpen(false);
      setDeletingCategory(null);

      // Background Sync
      refetchCategories();
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err?.message || "Failed to delete category!");
    } finally {
      setIsDeleting(false);
    }
  };

  // Optimized Search Filter with useMemo
  const filteredCategories = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return categories;
    return categories.filter((cat) => cat.name.toLowerCase().includes(query));
  }, [categories, searchTerm]);

  if (!hasMounted) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto min-h-screen">
        <CategorySkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto min-h-screen">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 sm:p-6 lg:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="space-y-1.5 w-full sm:w-auto">
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 bg-blue-50 dark:bg-blue-950/60 text-blue-600 rounded-2xl border border-blue-100 dark:border-blue-900/50 shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight break-words">
              Categories Management
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal">
            Explore and manage service categories seamlessly.
          </p>
        </div>

        {isAdmin && (
          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold px-5 py-3 rounded-2xl transition-all shadow-xs text-xs sm:text-sm cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Category</span>
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search category by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400 shadow-xs"
          />
        </div>
        <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium self-end sm:self-center px-1">
          Total Categories:{" "}
          <span className="font-bold text-slate-800 dark:text-slate-200">
            {filteredCategories.length}
          </span>
        </div>
      </div>

      {/* Grid Content */}
      {isLoading ? (
        <CategorySkeleton />
      ) : filteredCategories.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm px-4">
          <p className="text-xs sm:text-sm font-semibold text-slate-500">
            No categories found for this search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredCategories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              isAdmin={isAdmin}
              onEdit={handleOpenEditModal}
              onDelete={handleOpenDeleteModal}
            />
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {isAdmin && (
        <CategoryModal
          key={editingCategory ? editingCategory.id : "create-modal"}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          editingCategory={editingCategory}
          isLoading={isSubmitting}
        />
      )}

      {/* Production Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        categoryName={deletingCategory?.name}
        isLoading={isDeleting}
      />
    </div>
  );
}