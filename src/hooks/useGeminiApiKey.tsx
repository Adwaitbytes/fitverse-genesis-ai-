
import { useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext';

// Default API key that's pre-filled for the demo
const DEFAULT_API_KEY = 'AIzaSyAE9XvYg-cYkMeJbyLP2B05QXURAmMFKzU';

export const useGeminiApiKey = () => {
  const [apiKey, setApiKey] = useState<string>(DEFAULT_API_KEY);
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
    } else {
      // Set the default API key if nothing was found
      localStorage.setItem('gemini_api_key', DEFAULT_API_KEY);
      if (user) {
        updateApiKey(DEFAULT_API_KEY);
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
      
      // Less strict format validation to accommodate different key formats
      if (!key.startsWith('AIza') || key.length < 30) {
        toast({
          title: "Invalid API Key Format",
          description: "The API key appears to be in an incorrect format. Gemini AI keys typically start with 'AIza' followed by characters.",
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
      setApiKey(DEFAULT_API_KEY); // Reset to default instead of empty string
      
      // Also update user profile if authenticated
      if (user) {
        updateApiKey(DEFAULT_API_KEY);
      } else {
        toast({
          title: "API Key Reset",
          description: "Your Gemini AI API key has been reset to the default.",
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
