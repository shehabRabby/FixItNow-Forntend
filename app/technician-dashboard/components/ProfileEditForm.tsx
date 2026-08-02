"use client";

import { useState, useEffect, FormEvent } from "react";
import {
  getTechnicianProfile,
  updateTechnicianProfile,
} from "@/services/technician.service";
import { ITechnicianProfile } from "@/types";

export function ProfileUpdateForm() {
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [bio, setBio] = useState("");
  const [experienceYears, setExperienceYears] = useState<number>(0);
  const [skills, setSkills] = useState("");

  useEffect(() => {
    getTechnicianProfile().then((data: ITechnicianProfile | null) => {
      if (data) {
        setBio(data.bio || "");
        setExperienceYears(data.experienceYears || 0);
        setSkills(data.skills || "");
      }
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateTechnicianProfile({
        bio,
        experienceYears: Number(experienceYears),
        skills: skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      });
      alert("Profile updated successfully!");
    } catch {
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-sm text-slate-500">Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-lg bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800"
    >
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
        Update Profile
      </h3>

      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
          Experience Years
        </label>
        <input
          type="number"
          min="0"
          value={experienceYears}
          onChange={(e) => setExperienceYears(Number(e.target.value))}
          className="w-full px-3 py-2 rounded-lg border text-sm bg-slate-50 dark:bg-slate-800"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
          Skills (Comma separated)
        </label>
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border text-sm bg-slate-50 dark:bg-slate-800"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
          Bio
        </label>
        <textarea
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border text-sm bg-slate-50 dark:bg-slate-800"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
