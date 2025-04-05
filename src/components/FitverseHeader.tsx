
import React from "react";
import { Button } from "@/components/ui/button";
import { Bell, User, Menu } from "lucide-react";

const FitverseHeader: React.FC = () => {
  return (
    <header className="relative z-10 w-full py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="relative mr-2">
            <div className="absolute inset-0 bg-gradient-to-r from-fitverse-blue to-fitverse-pink rounded-lg blur opacity-70"></div>
            <div className="relative bg-fitverse-dark p-1.5 rounded-lg">
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fitverse-blue via-fitverse-purple to-fitverse-pink">
                FitVerse
              </h1>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-white" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-fitverse-pink"></span>
          </Button>
          
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5 text-white" />
          </Button>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default FitverseHeader;
