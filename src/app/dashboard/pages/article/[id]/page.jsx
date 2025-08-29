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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
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

  // split article body into paragraphs
  const paragraphs = data.article
    ? data.article.split(/\n\s*\n/) // split by double line breaks
    : [];

  return (
    <main className="bg-slate-500 py-10 px-1 flex justify-center">
      <article className="bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-3xl">
        {/* Cover image */}
        {data.image && (
          <div className="w-full">
            <img
              src={data.image}
              alt={data.heading || "Article image"}
              className="w-full h-80 object-cover"
            />
          </div>
        )}

        <div className="p-8">
          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-800 mb-6 leading-snug">
            {data.heading || "Untitled"}
          </h1>

          {/* Author + Date */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-slate-500 rounded-full flex items-center justify-center text-white font-bold">
              {data.userId?.name?.[0]?.toUpperCase() || "?"}
            </div>
            <div>
              <p className="font-medium text-slate-900">
                {data.userId?.name || "Unknown Author"}
              </p>
              <p className="text-sm text-slate-500">
                Published: {new Date(data.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Article Body */}
          <div className="space-y-6 text-slate-800 text-lg leading-relaxed">
            {paragraphs.length > 0
              ? paragraphs.map((para, index) => (
                  <p key={index} className="whitespace-pre-line">
                    {para.trim()}
                  </p>
                ))
              : data.article}
          </div>
        </div>
      </article>
    </main>
  );
}
