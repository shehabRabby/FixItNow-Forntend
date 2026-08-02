"use client";
import { ProfileUpdateForm } from "../components/ProfileEditForm";



export default function TechnicianProfilePage() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto pb-10">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Profile Management</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Update your professional profile details and available working slots.
        </p>
      </div>

      <ProfileUpdateForm />
    </div>
  );
}