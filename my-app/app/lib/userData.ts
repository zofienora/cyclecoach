export interface UserData {
    name: string;
    currentDayInCycle: number; // e.g., 15 (day 15 of their cycle)
    cycleLength: number; // e.g., 28 (to know when cycle resets)
  }