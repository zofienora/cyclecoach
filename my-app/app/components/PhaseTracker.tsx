"use client";
import * as motion from "motion/react-client"
import { useRef, useState, useEffect, useMemo } from 'react';
import { useUser } from "../context/UserContext";
import { getPhaseForDay } from "../lib/phases";

export default function PhaseTracker() {
    const { userData } = useUser();
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({
        width: 375,
        height: 667,
      });

    useEffect(() => {
    if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
    }
    }, []);

    // Get the current phase
    const currentPhase = userData 
      ? getPhaseForDay(userData.currentDayInCycle, userData.cycleLength)
      : null;

    // Randomly select one recommendation from the current phase's tips
    // Use useMemo to keep the same recommendation until phase changes
    const selectedTip = useMemo(() => {
      if (!currentPhase || !currentPhase.tips || currentPhase.tips.length === 0) {
        return null;
      }
      const randomIndex = Math.floor(Math.random() * currentPhase.tips.length);
      return currentPhase.tips[randomIndex];
    }, [currentPhase?.name]); // Re-select when phase changes

  return (
   <section className="rounded-lg p-4 h-screen">
    <h2 className="text-2xl font-bold font-heading text-foreground text-center py-8">
      {currentPhase ? `Today in your ${currentPhase.name} phase` : "Today in your cycle"}
    </h2>
    <h3 className="text-lg font-sans text-foreground text-center py-8">
      {selectedTip || "focus on your wellbeing"}
    </h3>
    <div ref={containerRef} className="w-[90%] h-[80%] mx-auto relative">
      {/* Top circle */}
      <motion.div
        className="w-50 h-50 rounded-full bg-secondary absolute"
        initial={{ x: dimensions.width * 0.1, y: dimensions.height * 0.1 }}
        animate={{
          x: [dimensions.width * 0.1, dimensions.width * 0.4, dimensions.width * 0.1],
          y: [dimensions.height * 0.1, dimensions.height * 0.5, dimensions.height * 0.1],
        }}
        transition={{
        repeat: Infinity,
        duration: 100,
        ease: 'linear',
        }}
      />
      {/* Center circle */}
      <motion.div
        className="w-50 h-50 rounded-full bg-primary absolute"
        initial={{ x: dimensions.width * 0.3, y: dimensions.height * 0.3 }}
        animate={{
          x: [dimensions.width * 0.3, dimensions.width * 0.6, dimensions.width * 0.3],
          y: [dimensions.height * 0.3, dimensions.height * 0.6, dimensions.height * 0.3],
        }}
        transition={{
          repeat: Infinity,
          duration: 100,
          ease: 'linear',
        }}
      />

      {/* Bottom zone circle */}
      <motion.div
        className="w-50 h-50 rounded-full bg-accent absolute"
        initial={{ x: dimensions.width * 0.6, y: dimensions.height * 0.2 }}
        animate={{
          x: [dimensions.width * 0.6, dimensions.width * 0.2, dimensions.width * 0.6],
          y: [dimensions.height * 0.2, dimensions.height * 0.7, dimensions.height * 0.2],
        }}
        transition={{
          repeat: Infinity,
          duration: 100,
          ease: 'linear',
        }}
      />
    </div>
   </section>
  );
}