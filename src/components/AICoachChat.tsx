
import React, { useState, useRef, useEffect } from "react";
import { Send, Mic, Dumbbell, Bot, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { getGeminiResponse } from "@/utils/geminiAI";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

const AICoachChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Hi there! I'm your AI fitness coach. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem("geminiApiKey") || "";
  });
  const [showApiKeyInput, setShowApiKeyInput] = useState(!localStorage.getItem("geminiApiKey"));
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const saveApiKey = (key: string) => {
    localStorage.setItem("geminiApiKey", key);
    setApiKey(key);
    setShowApiKeyInput(false);
    toast({
      title: "API Key Saved",
      description: "Your Gemini AI API key has been saved successfully.",
    });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    if (!apiKey) {
      setShowApiKeyInput(true);
      toast({
        title: "API Key Required",
        description: "Please enter your Gemini AI API key to continue.",
        variant: "destructive"
      });
      return;
    }
    
    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInput("");
    setIsProcessing(true);
    
    try {
      // Get response from Gemini AI
      const response = await getGeminiResponse(input, apiKey);
      
      // Create AI response message
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: response.success 
          ? response.message 
          : "I'm having trouble connecting to my AI services. Please check your API key or try again later.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      
      if (!response.success) {
        toast({
          title: "Connection Error",
          description: response.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error in AI response:", error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: "Sorry, I encountered an error. Please try again later.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-full glass-card overflow-hidden">
      {/* Header */}
      <div className="p-3 md:p-4 border-b border-white/10 bg-fitverse-dark/50 backdrop-blur-md">
        <div className="flex items-center">
          <div className="relative mr-3">
            <div className="absolute inset-0 rounded-full animate-pulse-glow" style={{ '--pulse-color': 'rgba(76, 201, 240, 0.6)' } as React.CSSProperties}></div>
            <div className="relative p-2 rounded-full bg-gradient-to-r from-fitverse-blue to-fitverse-purple">
              <Bot className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white text-sm md:text-base">FitVerse AI Coach</h3>
            <p className="text-xs text-gray-400">Powered by Gemini AI</p>
          </div>
        </div>
      </div>
      
      {/* API Key Input */}
      {showApiKeyInput && (
        <div className="p-3 md:p-4 border-b border-white/10 bg-fitverse-dark/60 backdrop-blur-md">
          <div className="flex flex-col space-y-2">
            <p className="text-xs text-gray-300">Enter your Gemini AI API key to enable the AI coach:</p>
            <div className="flex gap-2">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Paste your Gemini AI key here"
                className="flex-1 bg-glass-gradient backdrop-blur-md rounded-lg px-3 py-2 text-xs md:text-sm border border-white/10 focus:outline-none focus:ring-2 focus:ring-fitverse-blue/50 text-white"
              />
              <Button 
                onClick={() => saveApiKey(apiKey)}
                className="bg-gradient-to-r from-fitverse-blue to-fitverse-purple text-white text-xs"
                size="sm"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.sender === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div 
              className={cn(
                "max-w-[85%] p-2 md:p-3 rounded-xl text-sm",
                message.sender === "user" 
                  ? "bg-fitverse-blue/20 text-white rounded-tr-none" 
                  : "bg-glass-gradient backdrop-blur-sm border border-white/10 rounded-tl-none"
              )}
            >
              {message.text}
              <div className="text-right mt-1">
                <span className="text-xs text-gray-400">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
        
        {/* Processing indicator */}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-glass-gradient backdrop-blur-sm border border-white/10 rounded-xl rounded-tl-none p-3 max-w-[85%]">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 text-fitverse-blue animate-spin" />
                <span className="text-sm text-gray-300">Thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Input Area */}
      <div className="p-3 md:p-4 border-t border-white/10 bg-fitverse-dark/50 backdrop-blur-md">
        <div className="relative">
          {isMobile ? (
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
              placeholder="Ask your AI coach..."
              className="w-full bg-glass-gradient backdrop-blur-md rounded-full px-4 py-2 pl-10 pr-16 border border-white/10 focus:outline-none focus:ring-2 focus:ring-fitverse-blue/50 text-white text-sm"
            />
          ) : (
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
              placeholder="Ask your AI coach..."
              className="w-full bg-glass-gradient backdrop-blur-md rounded-2xl px-4 py-2 pl-10 pr-16 border border-white/10 focus:outline-none focus:ring-2 focus:ring-fitverse-blue/50 text-white text-sm min-h-[44px] resize-none"
              rows={1}
            />
          )}
          
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Dumbbell className="w-4 h-4 text-fitverse-blue" />
          </div>
          
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex">
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 rounded-full text-fitverse-purple hover:text-fitverse-blue hover:bg-transparent mr-1"
            >
              <Mic className="w-4 h-4" />
            </Button>
            
            <Button 
              onClick={handleSendMessage}
              disabled={isProcessing || !input.trim()}
              className="h-8 w-8 rounded-full bg-gradient-to-r from-fitverse-blue to-fitverse-purple text-white hover:opacity-90 disabled:opacity-50"
              size="icon"
            >
              <Send className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICoachChat;
