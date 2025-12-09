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
    <div className="w-[90%] h-[80%]">
        <motion.div
        className="w-12 h-12 rounded-full bg-secondary absolute"
        animate={{
            x: [100, 40, -30, 20, 0],
            y: [0, -30, 60, -10, 0],
        }}
        transition={{
            repeat: Infinity,
            duration: 10,
            ease: 'linear',
        }}
        />
    </div>
   </section>
  );
}