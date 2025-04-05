
import { useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";

export const useGeminiApiKey = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load API key from localStorage on component mount
  useEffect(() => {
    const storedApiKey = localStorage.getItem('gemini_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
    setIsLoading(false);
  }, []);

  // Save API key to localStorage whenever it changes
  const saveApiKey = (key: string) => {
    try {
      localStorage.setItem('gemini_api_key', key);
      setApiKey(key);
      toast({
        title: "API Key Saved",
        description: "Your Gemini AI API key has been saved successfully.",
      });
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

  // Clear API key from localStorage
  const clearApiKey = () => {
    try {
      localStorage.removeItem('gemini_api_key');
      setApiKey('');
      toast({
        title: "API Key Removed",
        description: "Your Gemini AI API key has been removed.",
      });
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
