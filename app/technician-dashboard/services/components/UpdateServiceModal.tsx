"use client";

import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";
import { envConfig } from "@/config/env";

const API_URL = envConfig.baseUrl;
  // process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

interface IService {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  categoryId: string;
}

interface ICategory {
  id: string;
  name: string;
}

interface UpdateServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  service: IService | null;
  categories: ICategory[];
}

export function UpdateServiceModal({
  isOpen,
  onClose,
  onSuccess,
  service,
  categories,
}: UpdateServiceModalProps) {
  const [title, setTitle] = useState(service?.title || "");
  const [description, setDescription] = useState(service?.description || "");
  const [price, setPrice] = useState(
    service?.price ? service.price.toString() : "",
  );
  const [location, setLocation] = useState(service?.location || "");
  const [categoryId, setCategoryId] = useState(service?.categoryId || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !service) return null;

  const handleUpdateService = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = Cookies.get("token");
    if (!token) return;

    setIsSubmitting(true);
    try {
      await axios.patch(
        `${API_URL}/services/${service.id}`,
        {
          title,
          description,
          price: Number(price),
          location,
          categoryId,
        },
        { headers: { Authorization: token } },
      );

      await onSuccess();
      onClose();
    } catch (error: unknown) {
      let errorMessage = "Failed to update service";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl w-full max-w-lg border border-slate-200 dark:border-slate-800 space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Update Service
        </h2>

        <form onSubmit={handleUpdateService} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Title
            </label>
            <input
              type="text"
              required
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Description
            </label>
            <textarea
              required
              rows={3}
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Price (BDT)
              </label>
              <input
                type="number"
                required
                defaultValue={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Location
              </label>
              <input
                type="text"
                required
                defaultValue={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Category
            </label>
            <select
              required
              defaultValue={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
