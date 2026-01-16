"use client";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import { getPhaseForDay, getMenstrualPeriodLength } from "../lib/phases";

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
    <header className="flex flex-col items-center px-4 pt-4 mx-auto gap-4 h-screen lg:h-auto w-full">
      {/* CycleCoach title - bigger on laptop */}
      <div className="flex flex-col items-center w-full">
        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold font-heading text-secondary text-center pb-18 py-8 lg:py-6">
          CycleCoach
        </h1>
      </div>

      {/* Hello headline - bigger on laptop */}
      <div className="flex flex-col items-center w-full">
        <h2 className="font-heading text-foreground text-center text-2xl sm:text-3xl lg:text-5xl pt-20 lg:pt-4 lg:pb-6">
          Hello, {userData?.name || "there"} 👋
        </h2>
      </div>

      {/* Flexbox: Inputs on left, Cycle indicator on right (laptop) */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-center lg:gap-12 w-full lg:max-w-5xl">
        {/* Left side - Inputs section */}
        <div className="flex flex-col items-center lg:items-stretch gap-3 w-full max-w-sm lg:max-w-md px-4 lg:px-0">
          {/* Name input */}
          <div className="w-full">
            <input
              type="text"
              placeholder="Enter your name"
              value={userData?.name || ""}
              onChange={(e) => updateUserName(e.target.value)}
              className="w-full px-3 py-2 text-base border-2 border-primary rounded-full bg-surface text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
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
              className="w-full px-3 py-2 text-base border-2 border-primary rounded-full bg-surface text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          {/* Cycle length input */}
          {userData && (
            <div className="flex gap-2 items-center w-full">
              <label className="text-xs text-foreground font-medium whitespace-nowrap">Cycle Length:</label>
              <input
                type="number"
                value={userData.cycleLength}
                onChange={(e) => updateCycleLength(parseInt(e.target.value, 10))}
                min="21"
                max="35"
                className="px-3 py-2 text-base border-2 border-primary rounded-full bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-20"
              />
              <span className="text-xs text-foreground">days</span>
            </div>
          )}

          {/* Update button */}
          <button
            onClick={handleUpdateDay}
            className="bg-primary text-white text-sm px-4 py-2 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-md w-full"
          >
            Update Day
          </button>
        </div>

        {/* Right side - Dynamic cycle position indicator */}
      {userData && (() => {
        const currentDay = userData.currentDayInCycle;
        const cycleLength = userData.cycleLength;
        const phase = getPhaseForDay(currentDay, cycleLength);
        const periodLength = getMenstrualPeriodLength();
        
        // Calculate progress: current day / cycle length
        const progress = currentDay / cycleLength;
        
        // Circle parameters - responsive size
        const size = 240; // Base size, CSS handles responsive sizing
        const center = size / 2;
        const radius = center - 14; // accounting for border width (14px)
        const circumference = 2 * Math.PI * radius;
        
        // Calculate stroke dash for the progress
        // Start from top (12 o'clock), so we offset by -90 degrees
        const dashLength = circumference * progress;
        const dashOffset = circumference - dashLength;
        
        // The circle should fill progressively through the cycle
        // Color matches the current phase
        return (
          <div className="mt-10 lg:mt-0 flex flex-col items-center gap-8 lg:flex-1">
            {/* Headline */}
            <h3 className="text-lg sm:text-xl lg:text-3xl font-heading text-foreground text-center">
              Where you are in your cycle:
            </h3>
            
            {/* SVG Circle */}
            <div className="relative w-60 h-60 lg:w-80 lg:h-80">
              <svg width="100%" height="100%" viewBox="0 0 240 240" className="transform -rotate-90 lg:w-full lg:h-full" preserveAspectRatio="xMidYMid meet">
                {/* Background circle (gray) */}
                <circle
                  cx="120"
                  cy="120"
                  r="106"
                  fill="none"
                  stroke="#F2F2F2"
                  strokeWidth="14"
                />
                {/* Progress circle - fills based on current day, color matches phase */}
                <circle
                  cx="120"
                  cy="120"
                  r="106"
                  fill="none"
                  stroke={phase.color}
                  strokeWidth="14"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              </svg>
            </div>
          </div>
        );
      })()}
      </div>
    </header>
  );
}