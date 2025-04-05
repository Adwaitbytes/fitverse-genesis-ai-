
import React, { useState } from "react";
import { Send, Mic, Dumbbell, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: "I've analyzed your recent workouts. Your form is improving, but I recommend focusing more on your core strength. Would you like me to suggest some exercises?",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full glass-card overflow-hidden">
      <div className="p-4 border-b border-white/10 bg-fitverse-dark/50 backdrop-blur-md">
        <div className="flex items-center">
          <div className="relative mr-3">
            <div className="absolute inset-0 rounded-full animate-pulse-glow" style={{ '--pulse-color': 'rgba(76, 201, 240, 0.6)' } as React.CSSProperties}></div>
            <div className="relative p-2 rounded-full bg-gradient-to-r from-fitverse-blue to-fitverse-purple">
              <Bot className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white">FitVerse AI Coach</h3>
            <p className="text-xs text-gray-400">Always online • Powered by advanced fitness AI</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                "max-w-[80%] p-3 rounded-xl",
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
      </div>
      
      <div className="p-4 border-t border-white/10 bg-fitverse-dark/50 backdrop-blur-md">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Ask your AI coach..."
            className="w-full bg-glass-gradient backdrop-blur-md rounded-full px-4 py-3 pl-12 pr-16 border border-white/10 focus:outline-none focus:ring-2 focus:ring-fitverse-blue/50 text-white"
          />
          
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Dumbbell className="w-5 h-5 text-fitverse-blue" />
          </div>
          
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex">
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-full text-fitverse-purple hover:text-fitverse-blue hover:bg-transparent mr-1"
            >
              <Mic className="w-5 h-5" />
            </Button>
            
            <Button 
              onClick={handleSendMessage}
              className="rounded-full bg-gradient-to-r from-fitverse-blue to-fitverse-purple text-white hover:opacity-90"
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICoachChat;
