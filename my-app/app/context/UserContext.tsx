"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserData, CycleData } from "../lib/userData";

interface UserContextType {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  updateCycleData: (cycleData: CycleData) => void;
  updateUserName: (name: string) => void;
  logPeriod: () => void; // Updates lastPeriodStart to today
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

  const updateCycleData = (cycleData: CycleData) => {
    if (userData) {
      setUserDataState({ ...userData, cycleData });
    }
  };

  const updateUserName = (name: string) => {
    if (userData) {
      setUserDataState({ ...userData, name });
    } else {
      // Initialize with just name if no data exists
      setUserDataState({
        name,
        cycleData: {
          lastPeriodStart: new Date().toISOString().split('T')[0],
          cycleLength: 28,
          periodLength: 5,
        },
      });
    }
  };

  const logPeriod = () => {
    console.log("logPeriod called!");
    console.log("Current userData:", userData);
  
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayString = `${year}-${month}-${day}`;

    if (userData) {
      // Update existing data
        const newData = {
        ...userData,
        cycleData: {
            ...userData.cycleData,
            lastPeriodStart: todayString,
        },
        };
        console.log("Updating with new data:", newData);
        setUserDataState(newData);
    } else {
      // Initialize with default data if none exists
      const newData = {
        name: "",
        cycleData: {
          lastPeriodStart: todayString,
          cycleLength: 28,
          periodLength: 5,
        },
      };
      console.log("Initializing with new data:", newData);
      setUserDataState(newData);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        updateCycleData,
        updateUserName,
        logPeriod,
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