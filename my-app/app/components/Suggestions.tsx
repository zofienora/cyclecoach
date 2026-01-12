"use client";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import { getNextPhase, getDaysUntilNextPhase } from "../lib/phases";

export default function Suggestions() {
  const { userData } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextPhase = userData 
    ? getNextPhase(userData.currentDayInCycle, userData.cycleLength)
    : null;
  
  const daysUntil = userData
    ? getDaysUntilNextPhase(userData.currentDayInCycle, userData.cycleLength)
    : 0;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
   <section className="rounded-lg p-4 h-screen">
    <h2 className="text-2xl font-bold font-heading text-foreground text-center py-8">
      Explore
    </h2>
    <div className="">
        <button 
          onClick={handleOpenModal}
          className="w-full bg-primary rounded-lg p-10 mt-5 mb-5 hover:opacity-90 transition-opacity cursor-pointer"
        >
            <p className="text-lg font-bold font-heading text-white uppercase text-center pt-10 pb-10">Upcoming Phase</p>
        </button>
        <div className="border-2 border-secondary rounded-lg p-10 mt-5 mb-5">
            <p className="text-lg font-sans text-center pt-10 pb-10">Text</p>
        </div>
        <div className="border-2 border-alert rounded-lg p-10 mt-5 mb-5">
            <p className="text-lg font-sans text-center pt-10 pb-10">Text</p>
        </div>
    </div>

    {/* Modal/Popup */}
    {isModalOpen && nextPhase && (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={handleCloseModal}
      >
        <div 
          className="bg-surface rounded-lg p-8 max-w-md w-full relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 text-foreground hover:text-alert transition-colors text-2xl font-bold"
          >
            ×
          </button>

          {/* Modal content */}
          <div className="mt-4">
            <h3 
              className="text-3xl font-bold font-heading text-center mb-4"
              style={{ color: nextPhase.color }}
            >
              {nextPhase.label} Phase
            </h3>
            
            <div className="text-center mb-6">
              <p className="text-lg font-sans text-foreground">
                {daysUntil === 1 
                  ? "Starts tomorrow" 
                  : `Starts in ${daysUntil} days`}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-bold font-heading text-foreground mb-2">
                  What to expect:
                </h4>
                <p className="text-base font-sans text-foreground">
                  {nextPhase.name === "menstrual" && "A time for rest, gentle movement, and self-care. Focus on nourishing your body and allowing it to recover."}
                  {nextPhase.name === "follicular" && "A period of building energy and increasing activity. Great time for fresh starts, light exercise, and social connections."}
                  {nextPhase.name === "ovulatory" && "Peak energy phase! Perfect for strength training, high-intensity workouts, and social activities. Your body is at its strongest."}
                  {nextPhase.name === "luteal" && "A time for calm movement, nourishing foods, and rest. Focus on comfort, relaxation, and preparing for the next cycle."}
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold font-heading text-foreground mb-2">
                  Recommendations:
                </h4>
                <ul className="list-disc list-inside space-y-2 text-base font-sans text-foreground">
                  {nextPhase.tips && nextPhase.tips.slice(0, 2).map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
   </section>
  );
}