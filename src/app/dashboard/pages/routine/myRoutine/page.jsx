"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
   

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/user/routine", { cache: "no-cache" });
        if (!response.ok) throw new Error("Failed to fetch routines");
        const { data } = await response.json();
        setRoutines(data);
      } catch (err) {
        setError(err.message || "Failed to load routines");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

    

  const handleDelete = async (id) => {
    // Confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete this routine?");
    if (!isConfirmed) return;

    try {
      const res = await fetch(`/api/user/routine/ById?id=${id}`, {
        method: 'DELETE',
      });
      const { status } = await res.json();
      
      if (status === 'success') {
        setRoutines(prev => prev.filter(routine => routine._id !== id));
        alert("Routine deleted successfully");
      } else {
        throw new Error('Delete failed');
      }
    } catch (error) {
      alert(error.message || "Error deleting routine");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      

      {/* Routines List Section */}
      <div className="max-w-6xl mx-auto p-6">
        <div className =" flex justify-between px-5 py-2 ">
          <div>
            <h1 className="text-2xl font-bold mb-6 text-blue-400 underline">
              Your Daily Routines
            </h1>
          </div>
          
          <div className="underline text-slate-300 font-bold hover:text-slate-500">
              <Link href={"/dashboard/pages/routine/addRoutine"}>Add Routine</Link>
          </div>


        </div>

        {error && (
          <div className="alert alert-error mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {routines.length === 0 ? (
          <div className="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>No routines found. Create your first routine!</span>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-1">
            {routines.map((routine) => (
              <div key={routine._id} className="card bg-gray-800 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="card-body p-4">
                  <div className="flex justify-between items-start gap-2">
                    <h2 className="text-lg font-semibold break-words flex-1 underline">
                      {routine.timeSlot}
                    </h2>
                    <Link 
                      href={`/dashboard/pages/routine/mypage/${routine._id}`}
                      className="btn btn-xs btn-outline btn-secondary"
                    >
                      Edit
                    </Link>
                  </div>

                  <p className="text-gray-200 text-2xl mt-2 break-words ">
                    {routine.task}
                  </p>

                  <div className="card-actions justify-between items-center mt-4">
                    <span className="text-xs text-gray-600">
                      {new Date(routine.createdAt).toLocaleDateString()}
                    </span>
                    <button 
                      onClick={() => handleDelete(routine._id)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}