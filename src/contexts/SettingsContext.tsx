
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface AppSettings {
  theme: 'dark' | 'light' | 'system';
  notifications: boolean;
  metricSystem: 'imperial' | 'metric';
  privacySettings: {
    showOnlineStatus: boolean;
    allowFriendRequests: boolean;
    showWorkoutActivity: boolean;
  };
}

interface SettingsContextType {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
}

const defaultSettings: AppSettings = {
  theme: 'dark',
  notifications: true,
  metricSystem: 'metric',
  privacySettings: {
    showOnlineStatus: true,
    allowFriendRequests: true,
    showWorkoutActivity: true
  }
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  
  // Load settings from localStorage when user changes
  useEffect(() => {
    if (user) {
      const savedSettings = localStorage.getItem(`fitverse_settings_${user.id}`);
      if (savedSettings) {
        try {
          setSettings(JSON.parse(savedSettings));
        } catch (error) {
          console.error('Failed to parse settings', error);
        }
      }
    } else {
      // Reset to default when user logs out
      setSettings(defaultSettings);
    }
  }, [user]);
  
  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`fitverse_settings_${user.id}`, JSON.stringify(settings));
    }
  }, [user, settings]);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      ...newSettings,
      // Handle nested objects like privacySettings
      privacySettings: {
        ...prevSettings.privacySettings,
        ...(newSettings.privacySettings || {})
      }
    }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
