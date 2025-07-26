"use client";

import React, { useState, useEffect } from "react";

export default function Page() {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    timeSlot: '',
    task: '',
  });

  const inputChange = (name, value) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const FormSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-cache",
      };

      const response = await fetch("/api/user/routine", config);
      if (!response.ok) {
        alert("Try again later");
        return;
      }

      const json = await response.json();
      if (json.status === "success") {
        alert("Success");
        setData({ timeSlot: "", task: "" });
      }
    } catch (e) {
      alert("Something went wrong");
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/user/routine", { cache: "no-cache" });
        if (!response.ok) {
          throw new Error("Something went wrong while fetching routines.");
        }
        const data = await response.json(); 
        console.log(data.data)
        setRoutines(data.data);
      } catch (err) {
        setError(err.message || "Unknown error occurred.");
        setRoutines([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="mt-20 min-h-screen">
            <div className='flex justify-center item-center'>
                <div><h1>Loading</h1> </div>
            </div>
         </div>;
  }
  
   


  return (
    <div className="min-h-screen bg-gray-900">

        <div className="text-center  py-8">
            <div className="shadow-2xl">
                     <div>
                         <h1 className="underline text-2xl text-slate-500">Add Your Daily Routine</h1>
                    </div>
                    <div>
      <form onSubmit={FormSubmit}>
        <div className="mt-5 px-5 w-4/5 m-auto">
          <div className="grid md:grid-cols-2 gap-3 md:gap-5">
            <div>
              <label htmlFor="timeSlot" className="mb-2 text-2xl font-medium text-gray-300">Time Slot</label><br />
              <input
                type="text"
                value={data.timeSlot}
                onChange={(e) => inputChange("timeSlot", e.target.value)}
                className="input input-bordered w-full mb-4"
                placeholder="e.g., 8:00 AM - 9:00 AM"
                id="timeSlot"
              />
            </div>

            <div>
              <label htmlFor="task" className="mb-2 text-2xl font-medium text-gray-300">Task</label><br />
              <input
                type="text"
                value={data.task}
                onChange={(e) => inputChange("task", e.target.value)}
                className="input input-bordered w-full mb-4"
                placeholder="It's time to study properly"
                id="task"
              />
            </div>
          </div>
        </div>

        <input type="submit" value="Submit" className="btn btn-primary px-4 py-2 mt-4" />
      </form>
    </div>

            </div>
        </div>
 
                <div className="container mx-auto px-4 py-2">
                <h1 className="text-3xl font-bold mb-3 underline">Your Daily Routines</h1>

                {error ? (
                    <div className="alert alert-error shadow-lg mb-4">
                    <div className="flex items-center gap-2">
                        <svg className="h-6 w-6 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{error}</span>
                    </div>
                    </div>
                ) : routines.length === 0 ? (
                    <div className="alert alert-info shadow-lg mb-4">
                    <div className="flex items-center gap-2">
                        <svg className="h-6 w-6 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span>No routines found. Create your first routine!</span>
                    </div>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {routines.map((routine) => (
                        <div key={routine._id} className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">
                            {routine.timeSlot}
                            <div className="badge badge-secondary">NEW</div>
                            </h2>
                            <p>{routine.task}</p>
                            <div className="card-actions justify-between items-center mt-4">
                            <span className="text-sm text-gray-500">
                                Created: {new Date(routine.createdAt).toLocaleDateString()}
                            </span>
                            <button className="btn btn-sm btn-primary">Edit</button>
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
