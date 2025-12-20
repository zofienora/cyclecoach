export interface CycleData {
    lastPeriodStart: string; // ISO date string (YYYY-MM-DD)
    cycleLength: number; // days, e.g., 28
    periodLength: number; // days, e.g., 5
  }
  
  export interface UserData {
    name: string;
    cycleData: CycleData;
  }