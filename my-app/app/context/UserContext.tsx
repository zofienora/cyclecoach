"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserData } from "../lib/userData";

interface UserContextType {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  updateDayInCycle: (day: number) => void;
  updateCycleLength: (length: number) => void;
  updateUserName: (name: string) => void;
  resetToDayOne: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = "cyclecoach_user_data";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserDataState] = useState<UserData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUserDataState(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever userData changes
  useEffect(() => {
    if (isLoaded && userData) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      } catch (error) {
        console.error("Error saving user data:", error);
      }
    }
  }, [userData, isLoaded]);

  const setUserData = (data: UserData) => {
    setUserDataState(data);
  };

  const updateDayInCycle = (day: number) => {
    if (userData) {
      setUserDataState({ ...userData, currentDayInCycle: day });
    } else {
      // Initialize with default data if none exists
      setUserDataState({
        name: "",
        currentDayInCycle: day,
        cycleLength: 28,
      });
    }
  };

  const updateCycleLength = (length: number) => {
    if (userData) {
      setUserDataState({ ...userData, cycleLength: length });
    } else {
      setUserDataState({
        name: "",
        currentDayInCycle: 1,
        cycleLength: length,
      });
    }
  };

  const updateUserName = (name: string) => {
    if (userData) {
      setUserDataState({ ...userData, name });
    } else {
      // Initialize with just name if no data exists
      setUserDataState({
        name,
        currentDayInCycle: 1,
        cycleLength: 28,
      });
    }
  };

  const resetToDayOne = () => {
    if (userData) {
      setUserDataState({ ...userData, currentDayInCycle: 1 });
    } else {
      setUserDataState({
        name: "",
        currentDayInCycle: 1,
        cycleLength: 28,
      });
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        updateDayInCycle,
        updateCycleLength,
        updateUserName,
        resetToDayOne,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use the context
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}