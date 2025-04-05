
import { useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext';

export const useGeminiApiKey = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user, updateApiKey } = useAuth();

  // Load API key from user profile or localStorage on component mount
  useEffect(() => {
    if (user?.geminiApiKey) {
      setApiKey(user.geminiApiKey);
      setIsLoading(false);
      return;
    }
    
    const storedApiKey = localStorage.getItem('gemini_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
      
      // If we have a user but no API key in their profile, update it
      if (user && !user.geminiApiKey) {
        updateApiKey(storedApiKey);
      }
    }
    setIsLoading(false);
  }, [user, updateApiKey]);

  // Save API key to both localStorage and user profile
  const saveApiKey = (key: string) => {
    try {
      // Basic validation
      if (!key) {
        toast({
          title: "API Key Required",
          description: "Please enter a valid Gemini AI API key.",
          variant: "destructive"
        });
        return false;
      }
      
      // Basic format validation
      if (!/^AIza[0-9A-Za-z_-]{35}$/.test(key)) {
        toast({
          title: "Invalid API Key Format",
          description: "The API key appears to be in an incorrect format. Gemini AI keys typically start with 'AIza' followed by 35 characters.",
          variant: "destructive"
        });
        return false;
      }
      
      localStorage.setItem('gemini_api_key', key);
      setApiKey(key);
      
      // Also update user profile if authenticated
      if (user) {
        updateApiKey(key);
      } else {
        toast({
          title: "API Key Saved",
          description: "Your Gemini AI API key has been saved successfully.",
        });
      }
      
      return true;
    } catch (error) {
      console.error('Failed to save API key:', error);
      toast({
        title: "Error Saving API Key",
        description: "Failed to save your API key. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  // Clear API key from localStorage and user profile
  const clearApiKey = () => {
    try {
      localStorage.removeItem('gemini_api_key');
      setApiKey('');
      
      // Also update user profile if authenticated
      if (user) {
        updateApiKey('');
      } else {
        toast({
          title: "API Key Removed",
          description: "Your Gemini AI API key has been removed.",
        });
      }
      
      return true;
    } catch (error) {
      console.error('Failed to clear API key:', error);
      return false;
    }
  };

  return {
    apiKey,
    isLoading,
    saveApiKey,
    clearApiKey
  };
};
