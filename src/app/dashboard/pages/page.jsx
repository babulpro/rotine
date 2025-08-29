"use client";
import Hero from "@/app/lib/utilityCom/Hero";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/user/article", { cache: "no-store" });
        if (!response.ok) throw new Error("Failed to fetch article");

        const { data } = await response.json();
        setData(data);
      } catch (e) {
        setError(e.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCopyLink = async (id) => {
    const url = `${window.location.origin}/dashboard/pages/article/${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-lg font-semibold">❌ {error}</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Hero />
      </div>

      {/* data showing */}
      <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.heading || "Article image"}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <Link href={`/dashboard/pages/article/${item._id}`}>
                <h2 className="text-xl font-semibold text-indigo-700 mb-2 cursor-pointer hover:underline">
                  {item.heading || "Untitled"}
                </h2>
              </Link>
              <p className="text-gray-700">
                {item.article?.split(" ").slice(0, 20).join(" ")}...
              </p>
              <p className="text-xs text-gray-400 mt-3">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>

              {/* Copy Link button */}
              <button
                onClick={() => handleCopyLink(item._id)}
                className="mt-3 px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
              >
                {copiedId === item._id ? "✅ Link Copied!" : "Copy Link to Share"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
