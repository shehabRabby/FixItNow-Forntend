"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Mail, Phone, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { authService } from "@/services/auth.service";
import RoleSelector from "./RoleSelector";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(11, "Phone number must be at least 11 digits"),
    role: z.enum(["CUSTOMER", "TECHNICIAN"]),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control, 
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "CUSTOMER" },
  });

 
  const selectedRole = useWatch({
    control,
    name: "role",
    defaultValue: "CUSTOMER",
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const payload = { ...data };
      delete (payload as { confirmPassword?: string }).confirmPassword;

      const res = await authService.register(payload);

      if (res.success) {
        toast.success(res.message || "Registration successful! Please login.");
        router.push("/login");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      {/* Role Selection Component */}
      <RoleSelector
        selectedRole={selectedRole}
        onSelect={(role) => setValue("role", role)}
      />

      {/* Full Name */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          Full Name
        </label>
        <div className="relative">
          <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            {...register("name")}
            type="text"
            placeholder="Enter name"
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all placeholder:text-slate-400"
          />
        </div>
        {errors.name && (
          <p className="text-xs text-rose-500 font-medium">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email Address */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          Email Address
        </label>
        <div className="relative">
          <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            {...register("email")}
            type="email"
            placeholder="name@gmail.com"
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all placeholder:text-slate-400"
          />
        </div>
        {errors.email && (
          <p className="text-xs text-rose-500 font-medium">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone Number */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          Phone Number
        </label>
        <div className="relative">
          <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            {...register("phone")}
            type="tel"
            placeholder="01XXXXXXXXX"
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all placeholder:text-slate-400"
          />
        </div>
        {errors.phone && (
          <p className="text-xs text-rose-500 font-medium">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          Password
        </label>
        <div className="relative">
          <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full pl-10 pr-10 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all placeholder:text-slate-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-rose-500 font-medium">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            {...register("confirmPassword")}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full pl-10 pr-10 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all placeholder:text-slate-400"
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-rose-500 font-medium">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-3"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Creating Account...</span>
          </>
        ) : (
          <span>Create Account</span>
        )}
      </button>
    </form>
  );
}
