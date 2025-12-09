"use client";
import * as motion from "motion/react-client"

export default function PhaseTracker() {
  return (
   <section className="border-2 border-alert rounded-lg p-4 h-screen">
    <h2 className="text-2xl font-bold font-heading text-foreground text-center py-8">
      Today in your luteal phase
    </h2>
    <h3 className="text-lg font-sans text-foreground text-center py-8">
      calm movement, nourishing food, sleep and relaxation
    </h3>
    <div className="w-[90%] h-[80%] mx-auto">
        <motion.div
            className="w-50 h-50 rounded-full bg-secondary absolute"
            animate={{
            x: [10, 60, -40, 30, -20, 0],
            y: [0, -30, 50, -10, 40, 0],
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
          x: [0, 300, -200, 150, -100, 0],
          y: [0, -200, 200, -150, 100, 0],
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
          x: [0, 400, -300, 200, -100, 0],
          y: [0, -100, 100, -50, 50, 0],
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