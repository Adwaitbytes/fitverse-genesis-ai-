
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from "@/components/ui/use-toast";
import { HealthMetrics } from '@/components/HealthMetricsForm';

interface HealthContextType {
  healthMetrics: HealthMetrics | null;
  updateHealthMetrics: (metrics: HealthMetrics) => void;
  healthHistory: HealthMetricsHistoryEntry[];
  addHealthHistoryEntry: (entry: Omit<HealthMetricsHistoryEntry, 'date'>) => void;
}

export interface HealthMetricsHistoryEntry extends HealthMetrics {
  date: string; // ISO date string
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export const HealthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { user } = useAuth();
  const [healthMetrics, setHealthMetrics] = useState<HealthMetrics | null>(null);
  const [healthHistory, setHealthHistory] = useState<HealthMetricsHistoryEntry[]>([]);
  
  // Load health metrics from localStorage when user changes
  useEffect(() => {
    if (user) {
      try {
        const savedMetrics = localStorage.getItem(`fitverse_health_metrics_${user.id}`);
        if (savedMetrics) {
          setHealthMetrics(JSON.parse(savedMetrics));
        }
        
        const savedHistory = localStorage.getItem(`fitverse_health_history_${user.id}`);
        if (savedHistory) {
          setHealthHistory(JSON.parse(savedHistory));
        }
      } catch (error) {
        console.error('Failed to load health data', error);
      }
    } else {
      // Reset when user logs out
      setHealthMetrics(null);
      setHealthHistory([]);
    }
  }, [user]);
  
  // Save health metrics to localStorage whenever they change
  useEffect(() => {
    if (user && healthMetrics) {
      localStorage.setItem(`fitverse_health_metrics_${user.id}`, JSON.stringify(healthMetrics));
    }
  }, [user, healthMetrics]);
  
  // Save health history to localStorage whenever it changes
  useEffect(() => {
    if (user && healthHistory.length > 0) {
      localStorage.setItem(`fitverse_health_history_${user.id}`, JSON.stringify(healthHistory));
    }
  }, [user, healthHistory]);

  const updateHealthMetrics = (metrics: HealthMetrics) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save your health metrics",
        variant: "destructive"
      });
      return;
    }
    
    setHealthMetrics(metrics);
    
    // Also add to history
    addHealthHistoryEntry(metrics);
    
    toast({
      title: "Health Metrics Updated",
      description: "Your health metrics have been saved successfully.",
    });
  };

  const addHealthHistoryEntry = (entry: HealthMetrics) => {
    if (!user) return;
    
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    // Check if we already have an entry for today
    const existingEntryIndex = healthHistory.findIndex(h => h.date === today);
    
    if (existingEntryIndex >= 0) {
      // Update today's entry
      const updatedHistory = [...healthHistory];
      updatedHistory[existingEntryIndex] = {
        ...entry,
        date: today
      };
      setHealthHistory(updatedHistory);
    } else {
      // Add new entry for today
      setHealthHistory([
        ...healthHistory,
        {
          ...entry,
          date: today
        }
      ]);
    }
  };

  return (
    <HealthContext.Provider value={{
      healthMetrics,
      updateHealthMetrics,
      healthHistory,
      addHealthHistoryEntry
    }}>
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (context === undefined) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};
