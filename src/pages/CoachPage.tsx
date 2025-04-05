
import React from "react";
import FitverseHeader from "@/components/FitverseHeader";
import FitverseNavigation from "@/components/FitverseNavigation";
import AICoachChat from "@/components/AICoachChat";

const CoachPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-16 md:border-r md:border-white/10">
        <FitverseNavigation />
      </div>
      
      <div className="flex-1 overflow-auto pb-20 md:pb-8">
        <FitverseHeader />
        
        <main className="container px-4 py-6 mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1 text-white">AI Fitness Coach</h1>
            <p className="text-gray-400">Your personal fitness assistant powered by AI</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 h-[600px]">
              <AICoachChat />
            </div>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Coach Features</h2>
                <div className="glass-card p-4 rounded-xl space-y-4">
                  <div className="flex items-start">
                    <div className="bg-fitverse-blue/20 p-2 rounded-full mr-3">
                      <div className="text-fitverse-blue text-lg font-bold">1</div>
                    </div>
                    <div>
                      <h3 className="font-medium text-white text-sm">Personalized Workout Plans</h3>
                      <p className="text-xs text-gray-400">Get custom workout routines based on your goals</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-fitverse-purple/20 p-2 rounded-full mr-3">
                      <div className="text-fitverse-purple text-lg font-bold">2</div>
                    </div>
                    <div>
                      <h3 className="font-medium text-white text-sm">Form Check Assistant</h3>
                      <p className="text-xs text-gray-400">AI-powered form correction advice</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-fitverse-pink/20 p-2 rounded-full mr-3">
                      <div className="text-fitverse-pink text-lg font-bold">3</div>
                    </div>
                    <div>
                      <h3 className="font-medium text-white text-sm">Nutrition Guidance</h3>
                      <p className="text-xs text-gray-400">Meal planning and nutrition advice</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-fitverse-blue/20 p-2 rounded-full mr-3">
                      <div className="text-fitverse-blue text-lg font-bold">4</div>
                    </div>
                    <div>
                      <h3 className="font-medium text-white text-sm">Progress Tracking</h3>
                      <p className="text-xs text-gray-400">Track and analyze your fitness journey</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Popular Questions</h2>
                <div className="glass-card p-4 rounded-xl space-y-3">
                  <button className="text-left w-full bg-fitverse-dark/30 hover:bg-fitverse-dark/50 p-3 rounded-lg text-white text-sm transition-colors">
                    How can I improve my squat form?
                  </button>
                  <button className="text-left w-full bg-fitverse-dark/30 hover:bg-fitverse-dark/50 p-3 rounded-lg text-white text-sm transition-colors">
                    What's the best pre-workout meal?
                  </button>
                  <button className="text-left w-full bg-fitverse-dark/30 hover:bg-fitverse-dark/50 p-3 rounded-lg text-white text-sm transition-colors">
                    How many rest days should I take?
                  </button>
                  <button className="text-left w-full bg-fitverse-dark/30 hover:bg-fitverse-dark/50 p-3 rounded-lg text-white text-sm transition-colors">
                    Can you suggest a HIIT routine?
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CoachPage;
