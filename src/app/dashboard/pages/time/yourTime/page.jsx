"use client";

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Link from "next/link"

export default function TimeTrackerPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTimeEntries();
  }, []);

  const fetchTimeEntries = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/user/timeEntry');
      const data = await response.json();
      if (data.status === 'success') {
        setEntries(data.data || []);
      }
    } catch (error) {
      toast.error('Failed to fetch entries');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalTime = (entry) => {
    const totalMinutes = Object.values(entry).reduce((sum, category) => {
      const hours = category?.hours || 0;
      const minutes = category?.minutes || 0;
      return sum + (hours * 60) + minutes;
    }, 0);
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="md:w-4/5  m-auto bg-gray-700 shadow-2xl rounded-lg p-6">
        <div className="flex justify-between">        
        <div><h1 className="text-3xl font-bold text-center mb-8">Your Time Tracking</h1></div>
        <div><Link href={"/dashboard/pages/time/addDailyTime"}>Add Day Performance</Link></div>
        </div>

        <div className="bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Time Entries</h2>
          {entries.length === 0 ? (
            <p className="text-gray-400 text-center py-4">No time entries found</p>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <div key={entry._id} className="border-b border-gray-700 pb-4 last:border-0">
                  <div className="flex justify-between items-start">
                    <span className="font-medium">
                      {new Date(entry.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="text-sm bg-blue-900/30 text-blue-400 px-2 py-1 rounded">
                      Total: {calculateTotalTime(entry)}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {['mobileUse', 'productivity', 'others'].map((category) => (
                      <div key={category} className="text-sm">
                        <span className="capitalize font-medium">
                          {category.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="ml-1 text-gray-300">
                          {(entry[category]?.hours || 0)}h {(entry[category]?.minutes || 0)}m
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}