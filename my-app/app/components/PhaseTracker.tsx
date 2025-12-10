"use client";
import * as motion from "motion/react-client"
import { useRef, useState, useEffect } from 'react';

export default function PhaseTracker() {
    const containerRef = useRef(null);
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
  return (
   <section className="border-2 border-alert rounded-lg p-4 h-screen">
    <h2 className="text-2xl font-bold font-heading text-foreground text-center py-8">
      Today in your luteal phase
    </h2>
    <h3 className="text-lg font-sans text-foreground text-center py-8">
      calm movement, nourishing food, sleep and relaxation
    </h3>
    <div className="w-[90%] h-[80%] mx-auto border relative">
        <motion.div
            className="w-50 h-50 rounded-full bg-secondary absolute"
            animate={{
                x: [0, dimensions.width * 0.3, 0],
                y: [0, dimensions.height * 0.5, 0],
              }}
            transition={{
            repeat: Infinity,
            duration: 12,
            ease: 'linear',
            }}
      />
      {/* Center circle */}
      <motion.div
        className="w-10 h-10 rounded-full bg-primary absolute"
        animate={{
            x: [0, dimensions.width * 0.3, 0],
            y: [0, dimensions.height * 0.5, 0],
          }}
        transition={{
          repeat: Infinity,
          duration: 100,
          ease: 'linear',
        }}
      />

      {/* Bottom zone circle */}
      <motion.div
        className="w-8 h-8 rounded-full bg-accent absolute"
        animate={{
            x: [0, dimensions.width * 0.3, 0],
            y: [0, dimensions.height * 0.5, 0],
          }}
        transition={{
          repeat: Infinity,
          duration: 14,
          ease: 'linear',
        }}
      />
    </div>
   </section>
  );
}