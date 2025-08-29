"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "react-hot-toast";

export default function TimeTrackerPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeText, setActiveText] = useState("Analyzing...");
  const [weeklyData, setWeeklyData] = useState(null);

  // Calculate weekly totals from daily entries
  const calculateWeeklyTotals = useCallback((entries) => {
    if (!entries || entries.length === 0) return null;

    const sumCategory = (key) =>
      entries.reduce((acc, entry) => {
        const val = entry[key];
        return acc + (val?.hours || 0) + (val?.minutes || 0) / 60;
      }, 0);

    return {
      mobileUse: sumCategory("mobileUse"),
      productivity: sumCategory("productivity"),
      others: sumCategory("others"),
    };
  }, []);

  // Memoized percentages for chart
  const timeAverages = useMemo(() => {
    const totals = { mobileUse: 0, productivity: 0, others: 0 };

    entries.forEach((entry) => {
      ["mobileUse", "productivity", "others"].forEach((key) => {
        totals[key] += (entry[key]?.hours || 0) * 60 + (entry[key]?.minutes || 0);
      });
    });

    const total = totals.mobileUse + totals.productivity + totals.others;

    return {
      mobileUse: total ? (totals.mobileUse / total) * 100 : 0,
      productivity: total ? (totals.productivity / total) * 100 : 0,
      others: total ? (totals.others / total) * 100 : 0,
    };
  }, [entries]);

  // Warning message based on percentages
  const warningMessage = useMemo(() => {
    if (timeAverages.mobileUse > 50)
      return { message: "⚠️ Too much mobile usage!", color: "bg-red-900/50" };
    if (timeAverages.productivity > 50)
      return { message: "🎉 Excellent productivity!", color: "bg-green-900/50" };
    if (timeAverages.others > 50)
      return { message: "🤔 Interesting distribution", color: "bg-yellow-900/50" };
    return null;
  }, [timeAverages]);

  // Chart segments
  const chartSegments = useMemo(
    () => [
      { key: "mobileUse", color: "#ff3e3e", delay: "0s", icon: "📱", label: "Mobile" },
      { key: "productivity", color: "#2dd4bf", delay: "0.3s", icon: "💻", label: "Productivity" },
      { key: "others", color: "#facc15", delay: "0.6s", icon: "🕒", label: "Others" },
    ],
    []
  );

  // Animate active text
  const startTextAnimation = useCallback(() => {
    const texts = ["Tracking Time", "Measuring Focus", "Your Balance", "Your Time Breakdown"];
    let index = 0;
    const interval = setInterval(() => {
      setActiveText(texts[index]);
      index = (index + 1) % texts.length;
      if (index === texts.length - 1) clearInterval(interval);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // Fetch entries from backend
  const fetchTimeEntries = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/user/timeEntry");
      const data = await res.json();

      if (data.status === "success") {
        setEntries(data.data || []);
        setWeeklyData(calculateWeeklyTotals(data.data || []));
      }
    } catch (error) {
      toast.error("Failed to fetch entries");
      console.error("API Error:", error);
      setWeeklyData(null);
    } finally {
      setLoading(false);
    }
  }, [calculateWeeklyTotals]);

  // Initial effects
  useEffect(() => {
    fetchTimeEntries();
  }, [fetchTimeEntries]);

  useEffect(() => {
    if (entries.length > 0) {
      startTextAnimation();
    }
  }, [entries, startTextAnimation]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="py-10 bg-gray-900 sm:px-6 lg:px-8">
      <div className="md:w-4/5 m-auto bg-gray-700 shadow-2xl rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Your Time Tracking</h1>

        {/* Chart Section */}
        <div className="bg-gray-800 shadow rounded-lg md:p-6 p-2 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="relative md:w-72 md:h-72 w-44 h-44 mx-auto">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {chartSegments.map((seg, i, arr) => {
                  const offset = 25 - arr.slice(0, i).reduce((sum, s) => sum + timeAverages[s.key], 0);
                  return (
                    <circle
                      key={seg.key}
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke={seg.color}
                      strokeWidth="12"
                      strokeDasharray={`${timeAverages[seg.key]} ${100 - timeAverages[seg.key]}`}
                      strokeDashoffset={offset}
                      transform="rotate(-90 50 50)"
                    >
                      <animate
                        attributeName="stroke-dasharray"
                        from="0 100"
                        to={`${timeAverages[seg.key]} ${100 - timeAverages[seg.key]}`}
                        dur="1.2s"
                        begin={seg.delay}
                        fill="freeze"
                      />
                    </circle>
                  );
                })}

                <g transform="translate(50, 50)">
                  <circle r="25" fill="#1e293b" opacity="0.8">
                    <animate attributeName="r" values="25;28;25" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <text textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="6" fontWeight="bold">
                    <animate attributeName="opacity" values="0;1" dur="1.5s" fill="freeze" />
                    <tspan x="0" dy="-1.2em" fontSize="8">
                      {activeText}
                    </tspan>
                    {chartSegments.map((seg, i) => (
                      <tspan key={seg.key} x="0" dy={i === 0 ? "2.4em" : "1.2em"} fontSize="5" opacity="0.8">
                        {timeAverages[seg.key].toFixed(0)}% {seg.icon}
                      </tspan>
                    ))}
                  </text>
                </g>
              </svg>
            </div>

            <div className="flex-1">
              {warningMessage && (
                <div className={`p-4 mb-4 rounded-lg ${warningMessage.color}`}>
                  <p className="font-medium text-white">{warningMessage.message}</p>
                </div>
              )}

              <div className="space-y-3">
                {chartSegments.map((item) => (
                  <div key={item.key} className="flex items-center">
                    <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-300">
                      {item.label}: {timeAverages[item.key].toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Section */}
        <div className="bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Weekly Totals</h2>

          {!weeklyData ? (
            <p className="text-gray-400 text-center py-4">No weekly data found</p>
          ) : (
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-teal-300">This Week's Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-600 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-red-400 mb-2">📱</div>
                  <div className="text-lg font-semibold">Mobile</div>
                  <div className="text-xl mt-2">{weeklyData.mobileUse.toFixed(1)} hours</div>
                </div>

                <div className="bg-gray-600 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-teal-400 mb-2">💻</div>
                  <div className="text-lg font-semibold">Productivity</div>
                  <div className="text-xl mt-2">{weeklyData.productivity.toFixed(1)} hours</div>
                </div>

                <div className="bg-gray-600 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-400 mb-2">🕒</div>
                  <div className="text-lg font-semibold">Others</div>
                  <div className="text-xl mt-2">{weeklyData.others.toFixed(1)} hours</div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-600">
                <h4 className="text-md font-medium mb-3">Detailed Breakdown:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                  <div className="flex justify-around">
                    <span>Mobile Use:</span>
                    <span className="font-medium">{weeklyData.mobileUse.toFixed(1)}h</span>
                  </div>
                  <div className="flex justify-around">
                    <span>Productivity:</span>
                    <span className="font-medium">{weeklyData.productivity.toFixed(1)}h</span>
                  </div>
                  <div className="flex justify-around">
                    <span>Others:</span>
                    <span className="font-medium">{weeklyData.others.toFixed(1)}h</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
