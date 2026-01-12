"use client";
import * as motion from "motion/react-client"
import { useRef, useState, useEffect } from 'react';
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

  return (
   <section className="rounded-lg p-4 h-screen">
    <h2 className="text-2xl font-bold font-heading text-foreground text-center py-8">
      {currentPhase ? `Today in your ${currentPhase.name} phase` : "Today in your cycle"}
    </h2>
    <h3 className="text-lg font-sans text-foreground text-center py-8">
      calm movement, nourishing food, sleep and relaxation
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