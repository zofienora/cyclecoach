"use client";
import { useState, useMemo } from "react";
import { useUser } from "../context/UserContext";
import { getNextPhase, getDaysUntilNextPhase } from "../lib/phases";

// Mini articles about menstrual cycles
const articles = [
  {
    title: "The Science of Cycle Syncing",
    content: "Cycle syncing involves aligning your lifestyle, diet, and exercise with your menstrual cycle phases. Research shows that adapting your activities to your cycle can improve energy levels, mood, and overall wellbeing. Each phase has unique hormonal profiles that affect your body differently."
  },
  {
    title: "Hormones and Your Energy Levels",
    content: "Throughout your cycle, hormones like estrogen and progesterone fluctuate significantly. During the follicular phase, rising estrogen boosts energy. The ovulatory phase brings peak energy, while the luteal phase sees a decline as progesterone increases. Understanding these patterns helps you plan activities accordingly."
  },
  {
    title: "Nutrition Through Your Cycle",
    content: "Your nutritional needs change throughout your cycle. During menstruation, focus on iron-rich foods and anti-inflammatory options. The follicular phase benefits from fresh, energizing foods. Ovulation calls for protein and healthy fats, while the luteal phase may increase cravings for comfort foods—listen to your body's needs."
  },
  {
    title: "Exercise and Menstrual Health",
    content: "Exercise can help manage menstrual symptoms and improve cycle health. Gentle movement during menstruation supports blood flow and reduces cramps. The follicular and ovulatory phases are ideal for more intense workouts, while the luteal phase benefits from moderate, calming exercises like yoga or walking."
  },
  {
    title: "Sleep Patterns and Your Cycle",
    content: "Hormonal changes throughout your cycle can affect sleep quality. Progesterone in the luteal phase can make you feel sleepier, while some experience insomnia. Tracking your sleep alongside your cycle helps identify patterns and optimize your rest schedule for each phase."
  },
  {
    title: "The Menstrual Cycle and Mental Health",
    content: "Hormonal fluctuations can significantly impact mood and mental health. Many people experience mood changes, particularly during the luteal phase. Understanding these patterns helps normalize experiences and develop coping strategies. Self-compassion and cycle awareness are key to managing emotional wellbeing."
  },
  {
    title: "Cycle Length Variations",
    content: "A 'normal' cycle can range from 21 to 35 days, with the average being 28 days. Cycle length can vary month to month and change with age, stress, and lifestyle factors. Tracking your cycle helps you understand your unique pattern and identify any significant changes that might need attention."
  },
  {
    title: "Fertility Awareness Basics",
    content: "Understanding your cycle helps with fertility awareness. Ovulation typically occurs around day 14 of a 28-day cycle, but this varies. Tracking basal body temperature, cervical mucus, and cycle length can help identify your fertile window. This knowledge empowers informed reproductive health decisions."
  },
  {
    title: "Managing Period Pain Naturally",
    content: "Many natural approaches can help manage menstrual cramps. Heat therapy, gentle stretching, and magnesium-rich foods can provide relief. Regular exercise, staying hydrated, and managing stress throughout your cycle can reduce period pain severity. Herbal teas like chamomile and ginger may also help."
  },
  {
    title: "Cycle Tracking Benefits",
    content: "Tracking your menstrual cycle offers numerous benefits beyond fertility awareness. It helps you understand your body's patterns, predict symptoms, optimize workouts and nutrition, and identify potential health concerns. Regular tracking creates valuable data about your unique cycle and overall health."
  }
];

export default function Suggestions() {
  const { userData } = useUser();
  const [isPhaseModalOpen, setIsPhaseModalOpen] = useState(false);
  const [isArticle1ModalOpen, setIsArticle1ModalOpen] = useState(false);
  const [isArticle2ModalOpen, setIsArticle2ModalOpen] = useState(false);

  const nextPhase = userData 
    ? getNextPhase(userData.currentDayInCycle, userData.cycleLength)
    : null;
  
  const daysUntil = userData
    ? getDaysUntilNextPhase(userData.currentDayInCycle, userData.cycleLength)
    : 0;

  // Randomly select 2 articles for the tiles
  const selectedArticles = useMemo(() => {
    const shuffled = [...articles].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 2);
  }, [userData?.currentDayInCycle]); // Re-select when day changes

  const handleOpenPhaseModal = () => {
    setIsPhaseModalOpen(true);
  };

  const handleClosePhaseModal = () => {
    setIsPhaseModalOpen(false);
  };

  const handleOpenArticle1Modal = () => {
    setIsArticle1ModalOpen(true);
  };

  const handleCloseArticle1Modal = () => {
    setIsArticle1ModalOpen(false);
  };

  const handleOpenArticle2Modal = () => {
    setIsArticle2ModalOpen(true);
  };

  const handleCloseArticle2Modal = () => {
    setIsArticle2ModalOpen(false);
  };

  return (
   <section className="rounded-lg p-4 h-screen">
    <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground text-center py-6 sm:py-8">
      Explore
    </h2>
    <div className="">
        <button 
          onClick={handleOpenPhaseModal}
          className="w-full bg-primary rounded-lg p-10 mt-5 mb-5 hover:opacity-90 transition-opacity cursor-pointer"
        >
            <p className="text-base sm:text-lg font-bold font-heading text-white uppercase text-center pt-10 pb-10">Upcoming Phase</p>
        </button>
        <button 
          onClick={handleOpenArticle1Modal}
          className="w-full border-2 border-secondary rounded-lg p-10 mt-5 mb-5 hover:opacity-90 transition-opacity cursor-pointer"
        >
            <p className="text-base sm:text-lg font-sans text-center pt-10 pb-10">{selectedArticles[0]?.title || "Article"}</p>
        </button>
        <button 
          onClick={handleOpenArticle2Modal}
          className="w-full border-2 border-alert rounded-lg p-10 mt-5 mb-5 hover:opacity-90 transition-opacity cursor-pointer"
        >
            <p className="text-base sm:text-lg font-sans text-center pt-10 pb-10">{selectedArticles[1]?.title || "Article"}</p>
        </button>
    </div>

    {/* Phase Modal/Popup */}
    {isPhaseModalOpen && nextPhase && (
      <div 
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        onClick={handleClosePhaseModal}
      >
        <div 
          className="bg-surface rounded-lg p-8 max-w-md w-full relative shadow-lg border-2"
          style={{ borderColor: nextPhase.color }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClosePhaseModal}
            className="absolute top-4 right-4 text-foreground hover:text-alert transition-colors text-2xl font-bold"
          >
            ×
          </button>

          {/* Modal content */}
          <div className="mt-4">
            <h3 
              className="text-2xl sm:text-3xl font-bold font-heading text-center mb-4"
              style={{ color: nextPhase.color }}
            >
              {nextPhase.label} Phase
            </h3>
            
            <div className="text-center mb-6">
              <p className="text-base sm:text-lg font-sans text-foreground">
                {daysUntil === 1 
                  ? "Starts tomorrow" 
                  : `Starts in ${daysUntil} days`}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-lg sm:text-xl font-bold font-heading text-foreground mb-2">
                  What to expect:
                </h4>
                <p className="text-sm sm:text-base font-sans text-foreground">
                  {nextPhase.name === "menstrual" && "A time for rest, gentle movement, and self-care. Focus on nourishing your body and allowing it to recover."}
                  {nextPhase.name === "follicular" && "A period of building energy and increasing activity. Great time for fresh starts, light exercise, and social connections."}
                  {nextPhase.name === "ovulatory" && "Peak energy phase! Perfect for strength training, high-intensity workouts, and social activities. Your body is at its strongest."}
                  {nextPhase.name === "luteal" && "A time for calm movement, nourishing foods, and rest. Focus on comfort, relaxation, and preparing for the next cycle."}
                </p>
              </div>

              <div>
                <h4 className="text-lg sm:text-xl font-bold font-heading text-foreground mb-2">
                  Recommendations:
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base font-sans text-foreground">
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

    {/* Article 1 Modal/Popup */}
    {isArticle1ModalOpen && selectedArticles[0] && (
      <div 
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        onClick={handleCloseArticle1Modal}
      >
        <div 
          className="bg-surface rounded-lg p-8 max-w-md w-full relative shadow-lg border-2 border-secondary"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleCloseArticle1Modal}
            className="absolute top-4 right-4 text-foreground hover:text-alert transition-colors text-2xl font-bold"
          >
            ×
          </button>

          {/* Modal content */}
          <div className="mt-4">
            <h3 
              className="text-2xl sm:text-3xl font-bold font-heading text-center mb-6"
              style={{ color: "#5941F2" }}
            >
              {selectedArticles[0].title}
            </h3>
            
            <p className="text-sm sm:text-base font-sans text-foreground leading-relaxed">
              {selectedArticles[0].content}
            </p>
          </div>
        </div>
      </div>
    )}

    {/* Article 2 Modal/Popup */}
    {isArticle2ModalOpen && selectedArticles[1] && (
      <div 
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        onClick={handleCloseArticle2Modal}
      >
        <div 
          className="bg-surface rounded-lg p-8 max-w-md w-full relative shadow-lg border-2 border-alert"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleCloseArticle2Modal}
            className="absolute top-4 right-4 text-foreground hover:text-alert transition-colors text-2xl font-bold"
          >
            ×
          </button>

          {/* Modal content */}
          <div className="mt-4">
            <h3 
              className="text-2xl sm:text-3xl font-bold font-heading text-center mb-6"
              style={{ color: "#F24535" }}
            >
              {selectedArticles[1].title}
            </h3>
            
            <p className="text-sm sm:text-base font-sans text-foreground leading-relaxed">
              {selectedArticles[1].content}
            </p>
          </div>
        </div>
      </div>
    )}
   </section>
  );
}