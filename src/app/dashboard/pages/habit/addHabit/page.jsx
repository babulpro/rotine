"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function HabitTracker() {
  const router = useRouter();   
  const [formData, setFormData] = useState({
    title: '',
    frequency: '',
  });
  const [habits,setHabits]=useState([])

   

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!formData.title.trim() || !formData.frequency.trim()) {
    alert("Please fill in all fields");
    return;
  }

  try {
    const response = await fetch("/api/user/habit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error("Failed to add habit");

    const { data, status } = await response.json();
    
    if (status === "success") {
      setHabits(prev => [data, ...prev]);
      setFormData({ title: "", frequency: "" });
      router.push("/dashboard/pages/habit/myHabit"); // ✅ Redirect here
    }
  } catch (error) {
    alert(error.message || "Something went wrong");
  }
};

 
 

  return (
    <div className="py-10 bg-gray-900 text-gray-100">
      {/* Add Habit Form */}
      <section className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-center mb-6 text-blue-400">
            Add New Habit
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className="block mb-2 font-medium">
                  Your Place
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="input input-bordered w-full bg-gray-700"
                  placeholder="Home"
                  required
                />
              </div>

              <div>
                <label htmlFor="frequency" className="block mb-2 font-medium">
                  Your Habit
                </label>
                <input
                  type="text"
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleInputChange}
                  className="input input-bordered w-full bg-gray-700"
                  placeholder="Keep Your Mobile Away"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Add Habit
            </button>
          </form>
        </div>
      </section>

      {/* Habits List */}
      
    </div>
  );
}