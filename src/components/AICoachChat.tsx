
import React, { useState, useEffect, useRef } from "react";
import { Bot, Send, Info, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getGeminiResponse } from "@/utils/geminiAI";
import { useAuth } from "@/contexts/AuthContext";
import { Label } from "@/components/ui/label";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const defaultMessages: Message[] = [
  {
    id: "welcome",
    text: "Hi there! I'm your FitVerse AI Coach. How can I help with your fitness journey today?",
    isUser: false,
    timestamp: new Date()
  }
];

// Default API key for demo purposes
const DEFAULT_API_KEY = 'AIzaSyAE9XvYg-cYkMeJbyLP2B05QXURAmMFKzU';

const AICoachChat: React.FC = () => {
  const { user, updateApiKey } = useAuth();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(user?.geminiApiKey || DEFAULT_API_KEY);
  const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Check if API key exists on component mount
  useEffect(() => {
    if (!user?.geminiApiKey) {
      // Save default API key if user is logged in but has no API key
      if (user) {
        updateApiKey(DEFAULT_API_KEY);
      }
      // Store default API key in localStorage
      if (!localStorage.getItem('gemini_api_key')) {
        localStorage.setItem('gemini_api_key', DEFAULT_API_KEY);
      }
    } else {
      setApiKey(user.geminiApiKey);
    }
  }, [user, updateApiKey]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      // Get API key - first try from state, then from user object, then default
      const currentApiKey = apiKey || user?.geminiApiKey || DEFAULT_API_KEY;
      
      const response = await getGeminiResponse(input, currentApiKey);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.success 
          ? response.message 
          : `Error: ${response.message}. Please check your API key.`,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      if (!response.success) {
        // If there's an API error, prompt to update the key
        setIsApiKeyDialogOpen(true);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [
        ...prev,
        {
          id: "error",
          text: "Sorry, I couldn't process your request. Please try again later.",
          isUser: false,
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const saveApiKey = () => {
    if (apiKey) {
      updateApiKey(apiKey);
      localStorage.setItem('gemini_api_key', apiKey);
      setIsApiKeyDialogOpen(false);
    }
  };

  return (
    <div className="h-full flex flex-col glass-card rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        <div className="flex items-center">
          <div className="bg-fitverse-blue/20 p-2 rounded-full mr-2">
            <Bot className="w-5 h-5 text-fitverse-blue" />
          </div>
          <h3 className="font-semibold text-white">FitVerse AI Coach</h3>
        </div>
        
        <div className="flex items-center space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Dialog open={isApiKeyDialogOpen} onOpenChange={setIsApiKeyDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                        <Settings2 className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Gemini AI API Key</DialogTitle>
                        <DialogDescription>
                          A default API key is already configured. You can keep using it or enter your own key.
                          Get your own key from <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" className="text-fitverse-blue hover:underline">Google AI Studio</a>.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="apiKey">API Key</Label>
                          <Input
                            id="apiKey"
                            type="password"
                            placeholder="AIza..."
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button onClick={saveApiKey} className="bg-fitverse-blue hover:bg-fitverse-blue/80">
                          Save
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>API Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.isUser ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-2",
                message.isUser
                  ? "bg-fitverse-blue/20 text-white"
                  : "bg-fitverse-purple/20 text-white"
              )}
            >
              <p className="whitespace-pre-wrap">{message.text}</p>
              <div className="text-xs opacity-50 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-fitverse-purple/20 max-w-[80%] rounded-2xl px-4 py-2 text-white">
              <div className="flex space-x-2">
                <div className="animate-bounce">•</div>
                <div className="animate-bounce delay-75">•</div>
                <div className="animate-bounce delay-150">•</div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-3 border-t border-white/10">
        <div className="relative">
          <Input
            ref={inputRef}
            placeholder="Ask your fitness coach..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pr-10 text-white"
            disabled={isLoading}
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-0 top-0 text-white"
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        {!user && (
          <div className="mt-2 text-xs flex items-center">
            <Info className="w-3 h-3 mr-1 text-fitverse-blue" />
            <span className="text-gray-300">AI coach is ready to use - no sign in required</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AICoachChat;
