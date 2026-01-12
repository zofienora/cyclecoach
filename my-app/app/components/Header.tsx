"use client";
import { useUser } from "../context/UserContext";
import { useState } from "react";

export default function Header() {
  const { userData, updateDayInCycle, updateCycleLength, updateUserName, resetToDayOne } = useUser();
  const [dayInput, setDayInput] = useState<string>("");

  const handleUpdateDay = () => {
    const day = parseInt(dayInput, 10);
    if (day >= 1 && day <= (userData?.cycleLength || 35)) {
      updateDayInCycle(day);
      setDayInput("");
    }
  };

  return (
    <header className="flex flex-col items-center px-4 pt-4 mx-auto gap-4 h-screen w-full">
      <div className="flex flex-col items-center">
        <h1 className="text-7xl font-bold font-heading text-secondary text-center py-8">
          CycleCoach
        </h1>
      </div>

      {/* Inputs section - nicely designed */}
      <div className="flex flex-col items-center gap-4 w-full max-w-md px-4">
        {/* Name input */}
        <div className="w-full">
          <input
            type="text"
            placeholder="Enter your name"
            value={userData?.name || ""}
            onChange={(e) => updateUserName(e.target.value)}
            className="w-full px-4 py-3 border-2 border-primary rounded-full bg-surface text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        {/* Day in cycle input */}
        <div className="w-full">
          <input
            type="number"
            placeholder="Day in cycle"
            value={dayInput}
            onChange={(e) => setDayInput(e.target.value)}
            min="1"
            max={userData?.cycleLength || 35}
            className="w-full px-4 py-3 border-2 border-primary rounded-full bg-surface text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        {/* Cycle length input */}
        {userData && (
          <div className="flex gap-3 items-center w-full">
            <label className="text-sm text-foreground font-medium whitespace-nowrap">Cycle Length:</label>
            <input
              type="number"
              value={userData.cycleLength}
              onChange={(e) => updateCycleLength(parseInt(e.target.value, 10))}
              min="21"
              max="35"
              className="px-4 py-3 border-2 border-primary rounded-full bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-24"
            />
            <span className="text-sm text-foreground">days</span>
          </div>
        )}

        {/* Update button */}
        <button
          onClick={handleUpdateDay}
          className="bg-primary text-white text-sm px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-md w-full"
        >
          Update Day
        </button>
      </div>

      {/* Everything else appears after inputs */}
      <div className="flex flex-col items-center">
        <h2 className="font-heading text-foreground text-center text-4xl pt-8 pb-2">
          Hello, {userData?.name || "there"} 👋
        </h2>
      </div>

      {/* Debug: Show current data */}
      {userData && (
        <div className="mt-4 p-4 bg-gray-100 rounded text-xs">
          <p>Name: {userData.name}</p>
          <p>Current Day: {userData.currentDayInCycle}</p>
          <p>Cycle Length: {userData.cycleLength} days</p>
        </div>
      )}

      {/* Static cycle position indicator */}
      <div className="mt-10 flex flex-col items-center gap-3 pt-24">
        {/* Outer ring */}
        <div className="w-60 h-60 rounded-full border-14 border-alert bg-surface" />
        {/* Arrow + label */}
        <div className="flex flex-col items-center text-sm text-foreground">
          <span className="-mb-1">↑</span>
          <span className="text-sm font-bold text-foreground pt-2 pb-4">you are here</span>
        </div>
      </div>
    </header>
  );
}