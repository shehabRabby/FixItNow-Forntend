"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMyProfile, updateMyProfile } from "@/services/profile.service";
import { IUserProfile } from "@/types/user.interface";
import { User, Mail, Phone, MapPin, Loader2, CheckCircle, Image as ImageIcon, Shield, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

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

    const payload = {
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
    };

    try {
      await updateMyProfile(payload);
      setMessage({ type: "success", text: "Profile updated successfully!" });

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
      <div className="flex items-center justify-center min-h-[70vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-4xl space-y-8 mx-auto"
    >
      {/* Top Header Card */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="space-y-1.5 relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-extrabold uppercase tracking-wider border border-blue-500/20">
              Account Control
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Account Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Update your personal details and manage your public profile information.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-md">
            {formData.name ? formData.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{formData.name || "User"}</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Client Profile</p>
          </div>
        </div>
      </div>

      {message && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 border shadow-sm ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/60"
              : "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border-rose-200/60 dark:border-rose-800/60"
          }`}
        >
          {message.type === "success" && <CheckCircle className="w-4 h-4 shrink-0" />}
          <span>{message.text}</span>
        </motion.div>
      )}

      {/* Main Settings Form Card */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                suppressHydrationWarning
                className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-medium transition-all"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center justify-between">
              <span>Email Address</span>
              <span className="text-[10px] text-amber-600 dark:text-amber-400 normal-case font-semibold">Locked</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="email"
                value={profile?.email || ""}
                disabled
                className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-slate-100 dark:bg-slate-800/20 border border-slate-200/80 dark:border-slate-800 text-slate-500 rounded-2xl cursor-not-allowed font-medium"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                suppressHydrationWarning
                placeholder="+880 1700..."
                className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-medium transition-all"
              />
            </div>
          </div>

          {/* Profile Image-Disabled */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center justify-between">
              <span>Profile Image URL</span>
              <span className="text-[10px] text-slate-400 normal-case font-semibold">Disabled</span>
            </label>
            <div className="relative">
              <ImageIcon className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                disabled
                value={profile?.profileImg || ""}
                placeholder="Image update disabled"
                className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-slate-100 dark:bg-slate-800/20 border border-slate-200/80 dark:border-slate-800 text-slate-400 rounded-2xl cursor-not-allowed font-medium truncate"
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Address
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              suppressHydrationWarning
              placeholder="House, Road, City..."
              className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-medium transition-all"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>Encrypted & secure profile settings</span>
          </div>

          <button
            type="submit"
            disabled={updating}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-2xl shadow-lg shadow-blue-500/25 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 cursor-pointer active:scale-95"
          >
            {updating && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </motion.div>
  );
}