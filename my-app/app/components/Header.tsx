"use client";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import { getPhaseForDay, getMenstrualPeriodLength } from "../lib/phases";

export default function Header() {
  const { userData, updateDayInCycle, updateCycleLength, updateUserName, resetToDayOne } = useUser();
  const [dayInput, setDayInput] = useState<string>("");
  const [dayError, setDayError] = useState<string>("");
  const [cycleLengthInput, setCycleLengthInput] = useState<string>("");
  const [cycleLengthError, setCycleLengthError] = useState<string>("");

  const handleUpdateDay = () => {
    const max = userData?.cycleLength ?? 35;
    const d = parseInt(dayInput, 10);
    if (dayInput.trim() === "" || isNaN(d)) {
      setDayError(`Please enter a day between 1 and ${max}.`);
      return;
    }
    if (d < 1 || d > max) {
      setDayError(`Day must be between 1 and ${max}.`);
      return;
    }
    setDayError("");
    updateDayInCycle(d);
    setDayInput("");
  };

  const handleCycleLengthBlur = () => {
    const raw = cycleLengthInput !== "" ? cycleLengthInput : (userData ? String(userData.cycleLength) : "");
    const v = parseInt(raw, 10);
    if (!isNaN(v) && v >= 21 && v <= 35) {
      updateCycleLength(v);
      setCycleLengthInput("");
      setCycleLengthError("");
    } else {
      setCycleLengthError("Cycle length must be between 21 and 35.");
      setCycleLengthInput("");
    }
  };

  return (
    <header className="flex flex-col items-center px-4 pt-4 mx-auto gap-4 h-screen lg:h-auto w-full">
      {/* 1. CycleCoach title - bigger on laptop */}
      <div className="flex flex-col items-center w-full">
        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold font-heading text-secondary text-center pb-18 py-8 lg:py-6 lg:pb-16">
          CycleCoach
        </h1>
      </div>

      {/* 2. Inputs section - shown on mobile, hidden on laptop */}
      <div className="flex lg:hidden flex-col items-center gap-3 w-full max-w-sm px-4">
        {/* Name input */}
        <div className="w-full">
          <input
            type="text"
            placeholder="Enter your name"
            value={userData?.name || ""}
            onChange={(e) => updateUserName(e.target.value)}
            className="w-full px-3 py-2 text-body border-2 border-primary rounded-full bg-surface text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        {/* Day in cycle input */}
        <div className="w-full">
          <input
            type="number"
            placeholder="Day in cycle"
            value={dayInput}
            onChange={(e) => { setDayInput(e.target.value); setDayError(""); }}
            min="1"
            max={userData?.cycleLength || 35}
            className={`w-full px-3 py-2 text-body border-2 rounded-full bg-surface text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${dayError ? "border-alert" : "border-primary"}`}
          />
          {dayError && <p className="text-body text-alert mt-1 px-1">{dayError}</p>}
        </div>

        {/* Cycle length input */}
        {userData && (
          <div className="w-full">
            <div className="flex gap-2 items-center w-full">
              <label className="text-body text-foreground font-medium whitespace-nowrap">Cycle Length:</label>
              <input
                type="number"
                value={cycleLengthInput !== "" ? cycleLengthInput : String(userData.cycleLength)}
                onChange={(e) => { setCycleLengthInput(e.target.value); setCycleLengthError(""); }}
                onBlur={handleCycleLengthBlur}
                min="21"
                max="35"
                className={`px-3 py-2 text-body border-2 rounded-full bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-20 ${cycleLengthError ? "border-alert" : "border-primary"}`}
              />
              <span className="text-body text-foreground">days</span>
            </div>
            {cycleLengthError && <p className="text-body text-alert mt-1 px-1">{cycleLengthError}</p>}
          </div>
        )}

        {/* Update button */}
        <button
          onClick={handleUpdateDay}
          className="bg-primary text-white text-body px-8 py-2 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-md w-full mb-6"
        >
          Update
        </button>
      </div>

      {/* 3. Hello headline - mobile only (between inputs and cycle) */}
      <div className="flex lg:hidden flex-col items-center w-full mt-16">
        <h2 className="text-3xl font-bold font-heading text-foreground text-center">
          Hello, {userData?.name || "there"} 👋
        </h2>
      </div>

      {/* 4. Desktop: two tiles (inputs left, cycle right). Mobile: cycle only. */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-6 lg:max-w-4xl w-full">
        {/* Left tile - Inputs (desktop only), border only, mobile colorways */}
        <div className="hidden lg:flex flex-col items-center justify-center rounded-lg border-2 border-primary p-10 lg:aspect-square">
          <div className="flex flex-col items-center gap-3 w-full max-w-xs">
            <input
              type="text"
              placeholder="Enter your name"
              value={userData?.name || ""}
              onChange={(e) => updateUserName(e.target.value)}
              className="w-full px-3 py-2 text-body border-2 border-primary rounded-full bg-surface text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
            <input
              type="number"
              placeholder="Day in cycle"
              value={dayInput}
              onChange={(e) => { setDayInput(e.target.value); setDayError(""); }}
              min="1"
              max={userData?.cycleLength || 35}
              className={`w-full px-3 py-2 text-body border-2 rounded-full bg-surface text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${dayError ? "border-alert" : "border-primary"}`}
            />
            {dayError && <p className="text-body text-alert mt-1 px-1 w-full text-left">{dayError}</p>}
            {userData && (
              <div className="w-full">
                <div className="flex gap-2 items-center w-full">
                  <label className="text-body text-foreground font-medium whitespace-nowrap">Cycle Length:</label>
                  <input
                    type="number"
                    value={cycleLengthInput !== "" ? cycleLengthInput : String(userData.cycleLength)}
                    onChange={(e) => { setCycleLengthInput(e.target.value); setCycleLengthError(""); }}
                    onBlur={handleCycleLengthBlur}
                    min="21"
                    max="35"
                    className={`px-3 py-2 text-body border-2 rounded-full bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-20 ${cycleLengthError ? "border-alert" : "border-primary"}`}
                  />
                  <span className="text-body text-foreground">days</span>
                </div>
                {cycleLengthError && <p className="text-body text-alert mt-1 px-1 w-full text-left">{cycleLengthError}</p>}
              </div>
            )}
            <button
              onClick={handleUpdateDay}
              className="bg-primary text-white text-body px-8 py-2 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-md w-full"
            >
              Update
            </button>
          </div>
        </div>

        {/* Right tile - Cycle indicator, no border, mobile colorways */}
      <div className="mt-4 lg:mt-0 flex flex-col items-center justify-center lg:rounded-lg lg:p-10 lg:aspect-square">
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
          <div className="flex flex-col items-center justify-center gap-6">
            {/* Headline */}
            <h3 className="text-headline text-foreground text-center">
              Where you are in your cycle:
            </h3>
            
            {/* SVG Circle */}
            <div className="relative w-60 h-60 lg:w-72 lg:h-72">
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
      </div>

      {/* 5. Hello headline - desktop only (below flexbox / button) */}
      <div className="hidden lg:flex flex-col items-center w-full pt-32 pb-2">
        <h2 className="text-3xl lg:text-4xl font-bold font-heading text-foreground text-center">
          Hello, {userData?.name || "there"} 👋
        </h2>
      </div>
    </header>
  );
}