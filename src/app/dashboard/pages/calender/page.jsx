"use client";
import React from "react";

// Bangladesh govt. holidays (fixed for example)
const holidays = [
  "2025-02-21", // Language Martyrs' Day
  "2025-03-26", // Independence Day
  "2025-04-14", // Bengali New Year
  "2025-05-01", // May Day
  "2025-12-16", // Victory Day
];

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function YearCalendar({ year }) {
  const today = new Date();
  const isToday = (d) =>
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear();

  const isHoliday = (d) =>
    holidays.includes(d.toISOString().split("T")[0]);

  // Generate all months
  const renderMonth = (month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const blanks = Array(firstDay.getDay()).fill(null); // empty slots before first date
    const days = [...Array(daysInMonth)].map((_, i) => new Date(year, month, i + 1));

    const allDays = [...blanks, ...days];

    return (
      <div key={month} className="border rounded-xl shadow-md p-4 bg-slate-500">
        <h2 className="text-center font-bold text-lg mb-2">
          {firstDay.toLocaleString("en-US", { month: "long" })}
        </h2>

        {/* Days of Week */}
        <div className="grid grid-cols-7 text-center font-semibold mb-1 ">
          {daysOfWeek.map((d) => (
            <div key={d} className="text-slate-800">{d}</div>
          ))}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {allDays.map((day, idx) => {
            if (!day) return <div key={idx} />; // empty cell

            const classes = [
              "rounded-lg p-2",
              isToday(day) && "bg-red-500 text-slate-950 font-bold",
              isHoliday(day) && "bg-slate-500 text-white font-semibold",
              !isToday(day) && !isHoliday(day) && "hover:bg-slate-200 hover:text-slate-500",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div key={idx} className={classes}>
                {day.getDate()}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold text-center mb-6">
        {year} Yearly Calendar 📅
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 12 }, (_, i) => renderMonth(i))}
      </div>
    </div>
  );
}

export default function CalendarPage() {
  return <YearCalendar year={2025} />;
}
