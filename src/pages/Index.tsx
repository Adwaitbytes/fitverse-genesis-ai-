
import React from "react";
import { Activity, Heart, Dumbbell, Flame, Calendar, Zap } from "lucide-react";
import FitverseHeader from "@/components/FitverseHeader";
import FitverseNavigation from "@/components/FitverseNavigation";
import StatsCard from "@/components/StatsCard";
import WorkoutCard from "@/components/WorkoutCard";
import AvatarHologram from "@/components/AvatarHologram";
import ProgressChart from "@/components/ProgressChart";
import AICoachChat from "@/components/AICoachChat";
import AchievementBadge from "@/components/AchievementBadge";

const activityData = [
  { name: "Mon", value: 65 },
  { name: "Tue", value: 59 },
  { name: "Wed", value: 80 },
  { name: "Thu", value: 81 },
  { name: "Fri", value: 56 },
  { name: "Sat", value: 95 },
  { name: "Sun", value: 72 }
];

const workouts = [
  {
    id: "sample-1", // Added id property
    title: "Full Body HIIT",
    category: "HIIT",
    duration: "30 min",
    calories: 320,
    difficulty: "intermediate" as const,
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "sample-2", // Added id property
    title: "Core Crusher",
    category: "Strength",
    duration: "25 min",
    calories: 280,
    difficulty: "advanced" as const,
    image: "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const friends = [
  { name: "Taylor", image: "https://randomuser.me/api/portraits/women/44.jpg", status: "workout" as const },
  { name: "Alex", image: "https://randomuser.me/api/portraits/men/32.jpg", status: "online" as const },
  { name: "Morgan", image: "https://randomuser.me/api/portraits/women/68.jpg", status: "online" as const },
  { name: "Jordan", image: "https://randomuser.me/api/portraits/men/75.jpg", status: "offline" as const }
];

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Navigation */}
      <div className="md:w-16 md:border-r md:border-white/10">
        <FitverseNavigation />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-20 md:pb-8">
        <FitverseHeader />
        
        <main className="container px-4 py-6 mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1 text-white">Hello, Fitness Seeker</h1>
            <p className="text-gray-400">Your fitness journey continues today</p>
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatsCard 
              title="Daily Steps" 
              value="8,243" 
              icon={<Activity className="w-5 h-5 text-fitverse-blue" />}
              trend={{ value: 12, isPositive: true }}
              gradientColor="blue"
            />
            <StatsCard 
              title="Calories" 
              value="1,840" 
              icon={<Flame className="w-5 h-5 text-fitverse-pink" />}
              trend={{ value: 5, isPositive: true }}
              gradientColor="pink"
            />
            <StatsCard 
              title="Heart Rate" 
              value="72 bpm" 
              icon={<Heart className="w-5 h-5 text-fitverse-pink" />}
              trend={{ value: 3, isPositive: false }}
              gradientColor="pink"
            />
            <StatsCard 
              title="Workouts" 
              value="4/5" 
              icon={<Dumbbell className="w-5 h-5 text-fitverse-purple" />}
              trend={{ value: 80, isPositive: true }}
              gradientColor="purple"
            />
          </div>
          
          {/* Weekly Activity Chart */}
          <div className="mb-8">
            <ProgressChart 
              title="Weekly Activity Score" 
              data={activityData} 
              color="#4CC9F0"
              unit=" pts" 
            />
          </div>
          
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-2 space-y-6">
              {/* Today's Workout */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-white">Today's Workout</h2>
                  <a href="#" className="text-sm text-fitverse-blue hover:text-fitverse-purple transition-colors">View All</a>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {workouts.map((workout, index) => (
                    <WorkoutCard key={index} {...workout} />
                  ))}
                </div>
              </div>
              
              {/* Achievements */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-white">Latest Achievements</h2>
                  <a href="#" className="text-sm text-fitverse-blue hover:text-fitverse-purple transition-colors">View All</a>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <AchievementBadge 
                    name="Early Riser" 
                    description="Complete 5 workouts before 8 AM" 
                    icon={<Calendar />}
                    rarity="rare" 
                  />
                  <AchievementBadge 
                    name="Strength Master" 
                    description="Lift 1000kg in a single workout" 
                    icon={<Dumbbell />}
                    rarity="epic" 
                  />
                  <AchievementBadge 
                    name="Calorie Crusher" 
                    description="Burn 5000 calories in a week" 
                    icon={<Flame />}
                    rarity="legendary" 
                    isLocked={true}
                  />
                  <AchievementBadge 
                    name="Streak Keeper" 
                    description="Workout for 10 days in a row" 
                    icon={<Zap />}
                    rarity="common" 
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* AI Coach */}
              <div className="h-[400px]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-white">AI Coach</h2>
                </div>
                
                <AICoachChat />
              </div>
              
              {/* Friends Activity */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-white">Friends</h2>
                  <a href="#" className="text-sm text-fitverse-blue hover:text-fitverse-purple transition-colors">View All</a>
                </div>
                
                <div className="glass-card p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {friends.map((friend, index) => (
                      <AvatarHologram 
                        key={index}
                        name={friend.name}
                        image={friend.image}
                        status={friend.status}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
