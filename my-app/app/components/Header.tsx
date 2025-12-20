"use client";
import { useUser } from "../context/UserContext";

export default function Header() {
  const { userData, logPeriod, updateUserName } = useUser();

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

      {/* Quick test: Add input to change name */}
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Enter your name"
          value={userData?.name || ""}
          onChange={(e) => updateUserName(e.target.value)}
          className="px-3 py-1 border rounded"
        />
      </div>

      <button 
        onClick={logPeriod}
        className="bg-alert text-white text-sm px-4 py-2 rounded-full font-semibold shadow"
      >
        Log Period
      </button>

      {/* Debug: Show current data */}
      {userData && (
        <div className="mt-4 p-4 bg-gray-100 rounded text-xs">
          <p>Name: {userData.name}</p>
          <p>Last Period: {userData.cycleData.lastPeriodStart}</p>
          <p>Cycle Length: {userData.cycleData.cycleLength} days</p>
          <p>Period Length: {userData.cycleData.periodLength} days</p>
        </div>
      )}

      {/* ... rest of your component ... */}
    </header>
  );
}