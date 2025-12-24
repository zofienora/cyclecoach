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
        <h2 className="font-heading text-foreground text-center text-4xl pt-8 pb-2">
          Hello, {userData?.name || "there"} 👋
        </h2>
      </div>

      {/* Name input */}
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Enter your name"
          value={userData?.name || ""}
          onChange={(e) => updateUserName(e.target.value)}
          className="px-3 py-1 border rounded"
        />
      </div>

      {/* Day in cycle input */}
      <div className="flex gap-2 items-center">
        <input
          type="number"
          placeholder="Day in cycle"
          value={dayInput}
          onChange={(e) => setDayInput(e.target.value)}
          min="1"
          max={userData?.cycleLength || 35}
          className="px-3 py-1 border rounded w-32"
        />
        <button
          onClick={handleUpdateDay}
          className="bg-primary text-white text-sm px-4 py-2 rounded font-semibold"
        >
          Update Day
        </button>
      </div>

      {/* Reset to day 1 button */}
      <button 
        onClick={resetToDayOne}
        className="bg-alert text-white text-sm px-4 py-2 rounded-full font-semibold shadow"
      >
        New Period (Reset to Day 1)
      </button>

      {/* Cycle length input */}
      {userData && (
        <div className="flex gap-2 items-center">
          <label className="text-sm">Cycle Length:</label>
          <input
            type="number"
            value={userData.cycleLength}
            onChange={(e) => updateCycleLength(parseInt(e.target.value, 10))}
            min="21"
            max="35"
            className="px-3 py-1 border rounded w-20"
          />
          <span className="text-sm">days</span>
        </div>
      )}

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