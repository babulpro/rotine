"use client";

import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function EditRoutinePage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRoutine = async () => {
      try {
        const response = await fetch(`/api/user/article/byId?id=${id}`, {
          cache: "no-store",
        });
        if (!response.ok) throw new Error("Failed to fetch article");
        const { data } = await response.json();
        setData(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRoutine();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-semibold">❌ {error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-800">No article found</p>
      </div>
    );
  }

  return (
    <div className="md:w-3/4  m-auto p-6 bg-slate-300">
      <div className="bg-slate-400 shadow-xl rounded-2xl overflow-hidden">
        {/* Cover image */}
        {data.image && (
          <img
            src={data.image}
            alt={data.heading || "Article image"}
            className="w-full h-80 "
          />
        )}

        <div className="p-8">
          {/* Heading */}
          <h1 className="text-3xl font-extrabold text-indigo-800 mb-4 leading-snug underline">
            {data.heading || "Untitled"}
          </h1>

          {/* Author + Date */}
          <div className="flex items-center gap-4 mb-6">
            {/* Avatar (fallback if no profilePic) */}
            <div className="w-10 h-10 bg-slate-500 rounded-full border">
            </div>
            <div>
              <p className="  font-medium">
                {data.userId?.name || "Unknown Author"}
              </p>
              <p className="  text-sm">
                Published: {new Date(data.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Article Body */}
          <p className="text-slate-800 text-lg leading-relaxed whitespace-pre-line">
            {data.article}
          </p>
        </div>
      </div>
    </div>
  );
}
