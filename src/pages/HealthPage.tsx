
import React from "react";
import FitverseHeader from "@/components/FitverseHeader";
import FitverseNavigation from "@/components/FitverseNavigation";
import StatsCard from "@/components/StatsCard";
import ProgressChart from "@/components/ProgressChart";
import { Activity, Heart, Droplet, Moon } from "lucide-react";

const healthData = [
  { name: "Mon", value: 72 },
  { name: "Tue", value: 68 },
  { name: "Wed", value: 74 },
  { name: "Thu", value: 70 },
  { name: "Fri", value: 65 },
  { name: "Sat", value: 63 },
  { name: "Sun", value: 67 }
];

const sleepData = [
  { name: "Mon", value: 7.5 },
  { name: "Tue", value: 6.8 },
  { name: "Wed", value: 8.2 },
  { name: "Thu", value: 7.0 },
  { name: "Fri", value: 6.5 },
  { name: "Sat", value: 8.5 },
  { name: "Sun", value: 8.0 }
];

const HealthPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-16 md:border-r md:border-white/10">
        <FitverseNavigation />
      </div>
      
      <div className="flex-1 overflow-auto pb-20 md:pb-8">
        <FitverseHeader />
        
        <main className="container px-4 py-6 mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1 text-white">Health Metrics</h1>
            <p className="text-gray-400">Monitor your vital health statistics</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatsCard 
              title="Heart Rate" 
              value="72 bpm" 
              icon={<Heart className="w-5 h-5 text-fitverse-pink" />}
              trend={{ value: 2, isPositive: false }}
              gradientColor="pink"
            />
            <StatsCard 
              title="Blood Pressure" 
              value="120/80" 
              icon={<Activity className="w-5 h-5 text-fitverse-blue" />}
              trend={{ value: 5, isPositive: true }}
              gradientColor="blue"
            />
            <StatsCard 
              title="Hydration" 
              value="1.8L" 
              icon={<Droplet className="w-5 h-5 text-fitverse-blue" />}
              trend={{ value: 10, isPositive: true }}
              gradientColor="blue"
            />
            <StatsCard 
              title="Sleep" 
              value="7.2 hrs" 
              icon={<Moon className="w-5 h-5 text-fitverse-purple" />}
              trend={{ value: 8, isPositive: true }}
              gradientColor="purple"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <ProgressChart 
                title="Weekly Heart Rate" 
                data={healthData} 
                color="#F72585"
                unit=" bpm" 
              />
            </div>
            <div>
              <ProgressChart 
                title="Weekly Sleep Duration" 
                data={sleepData} 
                color="#7209B7"
                unit=" hrs" 
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HealthPage;
