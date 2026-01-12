
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
  },
  {
    name: "follicular",
    label: "Follicular",
    color: "#F2AEEE", // soft pink
  },
  {
    name: "ovulatory",
    label: "Ovulatory",
    color: "#F2B035", // golden yellow
  },
  {
    name: "luteal",
    label: "Luteal",
    color: "#5941F2", // purple
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