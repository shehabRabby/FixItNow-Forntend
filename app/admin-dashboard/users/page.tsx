"use client";

import { useState, useEffect } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axiosInstance";
import { IUser } from "@/types";
import { UserFilter } from "./components/UserFilter";
import { AdminUserCard } from "./components/AdminUserCard";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [currentAdminId, setCurrentAdminId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedRole, setSelectedRole] = useState<string>("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        // এক সাথে ইউজার লিস্ট এবং কারেন্ট লগইন করা অ্যাডমিনের প্রোফাইল আনতে পারেন
        const [usersRes, profileRes] = await Promise.all([
          axiosInstance.get("/admin/users"),
          axiosInstance.get("/auth/me").catch(() => null), // অথবা আপনার প্রোফাইল এন্ডপয়েন্ট
        ]);

        if (isMounted) {
          if (usersRes.data?.success) {
            setUsers(usersRes.data.data || []);
          }
          if (profileRes?.data?.success || profileRes?.data?.data) {
            setCurrentAdminId(profileRes.data.data?.id);
          }
        }
      } catch {
        if (isMounted) {
          toast.error("Failed to load data!");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Update User Status (ACTIVE / BANNED)
  const handleUpdateStatus = async (
    id: string,
    status: "ACTIVE" | "BANNED",
  ) => {
    try {
      setUpdatingId(id);
      const res = await axiosInstance.patch(`/admin/users/${id}/status`, {
        status,
      });
      if (res.data?.success) {
        toast.success(`User status updated to ${status} successfully!`);
        setUsers((prev) =>
          prev.map((u) => (u.id === id ? { ...u, status } : u)),
        );
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(
        err?.response?.data?.message || "Failed to update user status!",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // Update User Role (CUSTOMER / TECHNICIAN / ADMIN)
  const handleUpdateRole = async (
    id: string,
    role: "CUSTOMER" | "TECHNICIAN" | "ADMIN",
  ) => {
    try {
      setUpdatingId(id);
      const res = await axiosInstance.patch(`/admin/users/${id}/role`, {
        role,
      });
      if (res.data?.success) {
        toast.success(`User role updated to ${role} successfully!`);
        setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(
        err?.response?.data?.message || "Failed to update user role!",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // Filter users based on selected role
  const filteredUsers =
    selectedRole === "ALL"
      ? users
      : users.filter((u) => u.role === selectedRole);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Manage All Users
        </h1>
        <p className="text-sm text-slate-500">
          View registered customers, technicians, and admins, and manage their
          permissions.
        </p>
      </div>

      {/* Filter Tabs */}
      <UserFilter selectedRole={selectedRole} onSelectRole={setSelectedRole} />

      {/* Users List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-sm text-slate-500">
              No users found for this filter.
            </p>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <AdminUserCard
              key={user.id}
              user={user}
              currentAdminId={currentAdminId} // কারেন্ট অ্যাডমিনের আইডি পাস করা হলো
              onUpdateStatus={handleUpdateStatus}
              onUpdateRole={handleUpdateRole}
              isUpdating={updatingId === user.id}
            />
          ))
        )}
      </div>
    </div>
  );
}