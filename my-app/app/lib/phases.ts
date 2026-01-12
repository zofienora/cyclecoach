
export type PhaseName = "menstrual" | "follicular" | "ovulatory" | "luteal";

export type Phase = {
  name: PhaseName;
  label: string;
  color: string; // can be a Tailwind token or hex
  tips?: string[]; // fill this later
};

export const phases: Phase[] = [
  {
    name: "menstrual",
    label: "Menstrual",
    color: "#F24535", // red-orange
    tips: [
      "rest, gentle movement, and self-care",
      "nourishing food, hydration, and relaxation",
      "warm baths",
      "yoga stretches",
      "herbal teas"
    ],
  },
  {
    name: "follicular",
    label: "Follicular",
    color: "#F2AEEE", // soft pink
    tips: [
      "building energy, light exercise, and fresh foods",
      "increasing activity, social connections, and new beginnings",
      "cardio workouts",
      "green vegetables",
      "morning routines"
    ],
  },
  {
    name: "ovulatory",
    label: "Ovulatory",
    color: "#F2B035", // golden yellow
    tips: [
      "peak energy, strength training, and social activities",
      "high-intensity workouts, communication, and confidence",
      "HIIT training",
      "protein-rich meals",
      "social events"
    ],
  },
  {
    name: "luteal",
    label: "Luteal",
    color: "#5941F2", // purple
    tips: [
      "calm movement, nourishing food, sleep and relaxation",
      "gentle exercise, comfort foods, and restful activities",
      "meditation",
      "dark chocolate",
      "early bedtime"
    ],
  },
];

/**
 * Calculate which phase a day belongs to based on cycle length
 * Typical cycle: Menstrual (1-5), Follicular (6-13), Ovulatory (14-16), Luteal (17-28)
 */
export function getPhaseForDay(day: number, cycleLength: number): Phase {
  // Menstrual phase: typically days 1-5
  const menstrualEnd = 5;
  
  // Ovulation typically occurs around day 14 for a 28-day cycle
  // Adjust proportionally for different cycle lengths
  const ovulationDay = Math.round((14 / 28) * cycleLength);
  const ovulatoryStart = ovulationDay - 1;
  const ovulatoryEnd = ovulationDay + 1;
  
  // Follicular phase: after menstrual until ovulation
  const follicularStart = menstrualEnd + 1;
  const follicularEnd = ovulatoryStart - 1;
  
  // Luteal phase: after ovulation until end of cycle
  const lutealStart = ovulatoryEnd + 1;

  if (day <= menstrualEnd) {
    return phases[0]; // menstrual
  } else if (day >= follicularStart && day <= follicularEnd) {
    return phases[1]; // follicular
  } else if (day >= ovulatoryStart && day <= ovulatoryEnd) {
    return phases[2]; // ovulatory
  } else {
    return phases[3]; // luteal
  }
}

/**
 * Get the typical length of the menstrual period (days 1-5)
 */
export function getMenstrualPeriodLength(): number {
  return 5; // typical period length
}

/**
 * Get the next upcoming phase after the current day
 */
export function getNextPhase(day: number, cycleLength: number): Phase {
  // Menstrual phase: typically days 1-5
  const menstrualEnd = 5;
  
  // Ovulation typically occurs around day 14 for a 28-day cycle
  const ovulationDay = Math.round((14 / 28) * cycleLength);
  const ovulatoryStart = ovulationDay - 1;
  const ovulatoryEnd = ovulationDay + 1;
  
  // Follicular phase: after menstrual until ovulation
  const follicularStart = menstrualEnd + 1;
  const follicularEnd = ovulatoryStart - 1;
  
  // Luteal phase: after ovulation until end of cycle
  const lutealStart = ovulatoryEnd + 1;

  if (day <= menstrualEnd) {
    return phases[1]; // Next: follicular
  } else if (day >= follicularStart && day <= follicularEnd) {
    return phases[2]; // Next: ovulatory
  } else if (day >= ovulatoryStart && day <= ovulatoryEnd) {
    return phases[3]; // Next: luteal
  } else {
    return phases[0]; // Next: menstrual (cycle resets)
  }
}

/**
 * Calculate how many days until the next phase
 */
export function getDaysUntilNextPhase(day: number, cycleLength: number): number {
  const menstrualEnd = 5;
  const ovulationDay = Math.round((14 / 28) * cycleLength);
  const ovulatoryStart = ovulationDay - 1;
  const ovulatoryEnd = ovulationDay + 1;
  const follicularStart = menstrualEnd + 1;
  const follicularEnd = ovulatoryStart - 1;
  const lutealStart = ovulatoryEnd + 1;

  if (day <= menstrualEnd) {
    return follicularStart - day; // Days until follicular
  } else if (day >= follicularStart && day <= follicularEnd) {
    return ovulatoryStart - day; // Days until ovulatory
  } else if (day >= ovulatoryStart && day <= ovulatoryEnd) {
    return lutealStart - day; // Days until luteal
  } else {
    return cycleLength - day + 1; // Days until next cycle (menstrual)
  }
}