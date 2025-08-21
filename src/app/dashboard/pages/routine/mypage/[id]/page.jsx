"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function EditRoutinePage() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRoutine = async () => {
      try {
        const response = await fetch(`/api/user/routine/ById?id=${id}`);
        if (!response.ok) throw new Error("Failed to fetch routine");
        const { data } = await response.json();
        setFormData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRoutine();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/user/routine/ById?id=${id}`, {
        method: "PUT", // Changed to PUT for semantic correctness
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) throw new Error("Update failed");
      
      const { status } = await response.json();
      if (status === "success") {
        router.push("/dashboard/pages/routine/myRoutine");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-error max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-xl p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">Edit Routine</h1>
        
        {formData && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="timeSlot" className="block mb-2 font-medium text-gray-300">
                  Time Slot
                </label>
                <input
                  type="text"
                  name="timeSlot"
                  value={formData.timeSlot || ""}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-700 text-white"
                  placeholder="e.g., 8:00 AM - 9:00 AM"
                  required
                />
              </div>

              <div>
                <label htmlFor="task" className="block mb-2 font-medium text-gray-300">
                  Task
                </label>
                <input
                  type="text"
                  name="task"
                  value={formData.task || ""}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-700 text-white"
                  placeholder="It's time to study properly"
                  required
                />
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.push("/dashboard/pages/routine")}
                className="btn btn-outline btn-error"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                Update Routine
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}