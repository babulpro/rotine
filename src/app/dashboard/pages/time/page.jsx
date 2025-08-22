"use client";

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function TimeTrackerPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeAverages, setTimeAverages] = useState({
    mobileUse: 0,
    productivity: 0,
    others: 0
  });
  const [activeText, setActiveText] = useState("Analyzing...");

  // Helper functions
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

  const calculateAverages = () => {
    const totals = {
      mobileUse: 0,
      productivity: 0,
      others: 0
    };

    entries.forEach(entry => {
      totals.mobileUse += (entry.mobileUse?.hours || 0) * 60 + (entry.mobileUse?.minutes || 0);
      totals.productivity += (entry.productivity?.hours || 0) * 60 + (entry.productivity?.minutes || 0);
      totals.others += (entry.others?.hours || 0) * 60 + (entry.others?.minutes || 0);
    });

    const totalMinutes = totals.mobileUse + totals.productivity + totals.others;
    const averages = {
      mobileUse: totalMinutes > 0 ? (totals.mobileUse / totalMinutes) * 100 : 0,
      productivity: totalMinutes > 0 ? (totals.productivity / totalMinutes) * 100 : 0,
      others: totalMinutes > 0 ? (totals.others / totalMinutes) * 100 : 0
    };

    setTimeAverages(averages);
  };

  const startTextAnimation = () => {
    const texts = [
      "Tracking Time",
      "Measuring Focus",
      "Your Balance",
      "Your Time Breakdown"
    ];
    let index = 0;
    
    const interval = setInterval(() => {
      setActiveText(texts[index]);
      index = (index + 1) % texts.length;
      if (index === texts.length - 1) {
        clearInterval(interval);
      }
    }, 800);
  };

  const fetchTimeEntries = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000//api/user/timeEntry');
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

  const getWarningMessage = () => {
    if (timeAverages.mobileUse > 50) {
      return { 
        message: "⚠️ You're in danger - too much mobile usage!", 
        color: 'bg-red-900/50' 
      };
    } else if (timeAverages.productivity > 50) {
      return { 
        message: "🎉 Excellent productivity! Keep it up!", 
        color: 'bg-green-900/50' 
      };
    } else if (timeAverages.others > 50) {
      return { 
        message: "🤔 Interesting time distribution - focus needed", 
        color: 'bg-yellow-900/50' 
      };
    }
    return null;
  };

  // Hooks
  useEffect(() => {
    fetchTimeEntries();
  }, []);

  useEffect(() => {
    if (entries.length > 0) {
      calculateAverages();
      startTextAnimation();
    }
  }, [entries]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="py-10 px-5 bg-gray-900 sm:px-6 lg:px-8">
      <div className="md:w-4/5 m-auto bg-gray-700 shadow-2xl rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Your Time Tracking</h1>

        {/* Enhanced Circular Chart Section */}
        <div className="bg-gray-800 shadow rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="relative w-72 h-72 mx-auto">
              {/* Thicker Animated Circle */}
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Mobile Use (Vibrant Red) */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#ff3e3e"
                  strokeWidth="12"
                  strokeDasharray={`${timeAverages.mobileUse} ${100 - timeAverages.mobileUse}`}
                  strokeDashoffset="25"
                  transform="rotate(-90 50 50)"
                >
                  <animate
                    attributeName="stroke-dasharray"
                    from="0 100"
                    to={`${timeAverages.mobileUse} ${100 - timeAverages.mobileUse}`}
                    dur="1.2s"
                    fill="freeze"
                  />
                </circle>
                
                {/* Productivity (Vibrant Green) */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#2dd4bf"
                  strokeWidth="12"
                  strokeDasharray={`${timeAverages.productivity} ${100 - timeAverages.productivity}`}
                  strokeDashoffset={25 - timeAverages.mobileUse}
                  transform="rotate(-90 50 50)"
                >
                  <animate
                    attributeName="stroke-dasharray"
                    from="0 100"
                    to={`${timeAverages.productivity} ${100 - timeAverages.productivity}`}
                    dur="1.2s"
                    begin="0.3s"
                    fill="freeze"
                  />
                </circle>
                
                {/* Others (Vibrant Yellow) */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#facc15"
                  strokeWidth="12"
                  strokeDasharray={`${timeAverages.others} ${100 - timeAverages.others}`}
                  strokeDashoffset={25 - timeAverages.mobileUse - timeAverages.productivity}
                  transform="rotate(-90 50 50)"
                >
                  <animate
                    attributeName="stroke-dasharray"
                    from="0 100"
                    to={`${timeAverages.others} ${100 - timeAverages.others}`}
                    dur="1.2s"
                    begin="0.6s"
                    fill="freeze"
                  />
                </circle>
                
                {/* Pulsing Center Animation */}
                <g transform="translate(50, 50)">
                  <circle
                    r="25"
                    fill="#1e293b"
                    opacity="0.8"
                  >
                    <animate
                      attributeName="r"
                      values="25;28;25"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <text 
                    textAnchor="middle" 
                    dominantBaseline="middle" 
                    fill="white" 
                    fontSize="6"
                    fontWeight="bold"
                  >
                    <animate
                      attributeName="opacity"
                      values="0;1"
                      dur="1.5s"
                      fill="freeze"
                    />
                    <tspan x="0" dy="-1.2em" fontSize="8">{activeText}</tspan>
                    <tspan x="0" dy="2.4em" fontSize="5" opacity="0.8">
                      {timeAverages.mobileUse.toFixed(0)}% 📱
                    </tspan>
                    <tspan x="0" dy="1.2em" fontSize="5" opacity="0.8">
                      {timeAverages.productivity.toFixed(0)}% 💻
                    </tspan>
                    <tspan x="0" dy="1.2em" fontSize="5" opacity="0.8">
                      {timeAverages.others.toFixed(0)}% 🕒
                    </tspan>
                  </text>
                </g>
              </svg>
            </div>
            
            {/* Warning Message and Legend */}
            <div className="flex-1">
              {getWarningMessage() && (
                <div className={`p-4 mb-4 rounded-lg ${getWarningMessage().color}`}>
                  <p className="font-medium text-white">{getWarningMessage().message}</p>
                </div>
              )}
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-gray-300">Mobile: {timeAverages.mobileUse.toFixed(1)}%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-300">Productivity: {timeAverages.productivity.toFixed(1)}%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-gray-300">Others: {timeAverages.others.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Time Entries List */}
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