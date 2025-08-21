"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'

export default function Page() {
    const router = useRouter() 
    const [routines, setRoutines] = useState([]);
    const [data, setData] = useState({
        timeSlot: '',
        task: '',
    });

 

  const inputChange = (name, value) => {
    setData(prev => ({ ...prev, [name]: value }));
  };

  const FormSubmit = async (e) => {
    e.preventDefault();
    
    if (!data.timeSlot.trim() || !data.task.trim()) {
      alert("Please fill in all fields");
      return;
    }

    // Confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to add this routine?");
    if (!isConfirmed) return;

    try {
      const response = await fetch("/api/user/routine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error("Failed to add routine");

      const { data: newRoutine, status } = await response.json();
      
      if (status === "success") {
        setRoutines(prev => [newRoutine, ...prev]);
        setData({ timeSlot: "", task: "" });
        alert("Routine added successfully!");
      }
    } catch (error) {
      alert(error.message || "Something went wrong");
    }
  };




  return (
    <div className="pb-10 shadow-xl bg-gray-900">
      {/* Form Section */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-center mb-6 text-blue-400">
            Add Your Daily Routine
          </h1>
          
          <form onSubmit={FormSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="timeSlot" className="block mb-2 font-medium text-gray-300">
                  Time Slot
                </label>
                <input
                  type="text"
                  name="timeSlot"
                  value={data.timeSlot}
                  onChange={(e) => inputChange("timeSlot", e.target.value)}
                  className="input input-bordered w-full bg-gray-700"
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
                  value={data.task}
                  onChange={(e) => inputChange("task", e.target.value)}
                  className="input input-bordered w-full bg-gray-700"
                  placeholder="It's time to study properly"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Add Routine
            </button>
          </form>
        </div>
      </div>
       
    </div>
  )
}