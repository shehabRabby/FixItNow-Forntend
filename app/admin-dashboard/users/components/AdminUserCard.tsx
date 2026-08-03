"use client";

import {
  Loader2,
  Shield,
  User,
  Mail,
  Calendar,
  Ban,
  CheckCircle,
} from "lucide-react";
import { IUser } from "@/types";

interface AdminUserCardProps {
  user: IUser;
  currentAdminId?: string; 
  onUpdateStatus: (id: string, status: "ACTIVE" | "BANNED") => void;
  onUpdateRole: (id: string, role: "CUSTOMER" | "TECHNICIAN" | "ADMIN") => void;
  isUpdating: boolean;
}

export function AdminUserCard({
  user,
  currentAdminId,
  onUpdateStatus,
  onUpdateRole,
  isUpdating,
}: AdminUserCardProps) {

  const isSelf = currentAdminId === user.id;

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "ADMIN":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-600 flex items-center gap-1">
            <Shield className="w-3 h-3" /> Admin
          </span>
        );
      case "TECHNICIAN":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 flex items-center gap-1">
            <User className="w-3 h-3" /> Technician
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 flex items-center gap-1">
            <User className="w-3 h-3" /> Customer
          </span>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === "ACTIVE") {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600">
          Active
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-600">
        Banned
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm hover:shadow-md transition-all">
      <div className="space-y-2">
        <div className="flex items-center gap-3 flex-wrap">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {user.name}{" "}
            {isSelf && (
              <span className="text-xs text-blue-600 font-normal">(You)</span>
            )}
          </h3>
          {getRoleBadge(user.role)}
          {getStatusBadge(user.status)}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-blue-500" /> {user.email}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            Joined: {new Date(user.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Action Controls - নিজের আইডি হলে কন্ট্রোলগুলো দেখাবে না */}
      {!isSelf && (
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap">
          {/* Role Change Dropdown */}
          <select
            value={user.role}
            disabled={isUpdating}
            onChange={(e) =>
              onUpdateRole(
                user.id,
                e.target.value as "CUSTOMER" | "TECHNICIAN" | "ADMIN",
              )
            }
            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl border-none outline-none cursor-pointer disabled:opacity-50"
          >
            <option value="CUSTOMER">Customer</option>
            <option value="TECHNICIAN">Technician</option>
            <option value="ADMIN">Admin</option>
          </select>

          {/* Status Toggle Buttons (Active & Banned Both Options) */}
          {user.status === "ACTIVE" ? (
            <button
              type="button"
              onClick={() => onUpdateStatus(user.id, "BANNED")}
              disabled={isUpdating}
              className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1 disabled:opacity-50"
            >
              {isUpdating ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Ban className="w-3.5 h-3.5" />
              )}
              Ban
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onUpdateStatus(user.id, "ACTIVE")}
              disabled={isUpdating}
              className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1 disabled:opacity-50"
            >
              {isUpdating ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <CheckCircle className="w-3.5 h-3.5" />
              )}
              Active
            </button>
          )}
        </div>
      )}
    </div>
  );
}
