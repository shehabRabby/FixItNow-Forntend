"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMyProfile, updateMyProfile } from "@/services/profile.service";
import { IUserProfile } from "@/types/user.interface";
import { User, Mail, Phone, MapPin, Loader2, CheckCircle, Image as ImageIcon } from "lucide-react";

export default function ProfileSettings() {
  const router = useRouter();
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    address: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      const data = await getMyProfile();
      if (data) {
        setProfile(data);
        setFormData({
          name: data.name || "",
          phoneNumber: data.phoneNumber || "",
          address: data.address || "",
        });
      }
      setLoading(false);
    };
    fetchProfileData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setMessage(null);

    // ব্যাকএন্ডে ইমেজ ছাড়া শুধু প্রয়োজনীয় ডাটা পাঠানো হচ্ছে
    const payload = {
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
    };

    try {
      await updateMyProfile(payload);
      setMessage({ type: "success", text: "Profile updated successfully!" });

      // সাইডবার আপডেট করার জন্য ইভেন্ট ট্রিগার
      window.dispatchEvent(new Event("profileUpdated"));
      router.refresh();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Account Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Update your personal details and public profile.
        </p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-sm font-medium flex items-center gap-2 ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
              : "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400"
          }`}
        >
          {message.type === "success" && <CheckCircle className="w-4 h-4" />}
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                suppressHydrationWarning
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Email (Read Only) */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Email Address (Cannot be changed)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="email"
                value={profile?.email || ""}
                disabled
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-800 text-slate-500 rounded-xl cursor-not-allowed"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                suppressHydrationWarning
                placeholder="+880 1700..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Profile Image (Disabled) */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Profile Image URL (Disabled)
            </label>
            <div className="relative">
              <ImageIcon className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                disabled
                value={profile?.profileImg || ""}
                placeholder="Image update disabled"
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-800 text-slate-400 rounded-xl cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Address
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              suppressHydrationWarning
              placeholder="House, Road, City..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={updating}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-sm transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {updating && <Loader2 className="w-4 h-4 animate-spin" />}
          Save Changes
        </button>
      </form>
    </div>
  );
}