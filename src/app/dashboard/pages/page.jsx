"use client"
import Hero from "@/app/lib/utilityCom/Hero";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
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
          <Link key={item._id} href={`/dashboard/pages/article/${item._id}`}>
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition cursor-pointer">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.heading || "Article image"}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-indigo-700 mb-2">
                  {item.heading || "Untitled"}
                </h2>
                <p className="text-gray-700">
                  {item.article?.split(" ").slice(0, 20).join(" ")}...
                </p>
                <p className="text-xs text-gray-400 mt-3">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
