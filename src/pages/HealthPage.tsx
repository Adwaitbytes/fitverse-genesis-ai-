
import React from "react";
import Layout from "@/components/Layout";
import StatsCard from "@/components/StatsCard";
import { Activity, Droplet, Heart, Moon, Scale } from "lucide-react";
import ProgressChart from "@/components/ProgressChart";
import HealthMetricsForm from "@/components/HealthMetricsForm";
import { useHealth } from "@/contexts/HealthContext";
import { useAuth } from "@/contexts/AuthContext";

const HealthPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { healthMetrics, updateHealthMetrics, healthHistory } = useHealth();

  return (
    <Layout>
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold text-white mb-6">Health Dashboard</h1>
        
        {isAuthenticated ? (
          <>
            {healthMetrics ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatsCard 
                  title="Heart Rate" 
                  value={`${healthMetrics.heartRate} bpm`} 
                  icon={<Heart className="text-fitverse-pink" />} 
                />
                <StatsCard 
                  title="Blood Pressure" 
                  value={`${healthMetrics.bloodPressureSystolic}/${healthMetrics.bloodPressureDiastolic}`} 
                  icon={<Activity className="text-fitverse-blue" />} 
                />
                <StatsCard 
                  title="Hydration" 
                  value={`${healthMetrics.hydration}%`} 
                  icon={<Droplet className="text-blue-400" />} 
                />
                <StatsCard 
                  title="Sleep" 
                  value={`${healthMetrics.sleepHours} hrs`}
                  icon={<Moon className="text-purple-400" />} 
                />
              </div>
            ) : (
              <div className="glass-card p-6 mb-6">
                <p className="text-gray-300 mb-4">
                  Enter your health metrics below to start tracking your health data.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="glass-card p-6">
                <h2 className="text-xl font-bold text-white mb-4">Update Health Metrics</h2>
                <HealthMetricsForm 
                  onSubmit={updateHealthMetrics}
                  initialData={healthMetrics || undefined}
                />
              </div>
              
              <div className="glass-card p-6">
                <h2 className="text-xl font-bold text-white mb-4">Health Trends</h2>
                {healthHistory.length > 0 ? (
                  <div className="h-80">
                    <ProgressChart 
                      data={healthHistory.map(entry => ({
                        date: entry.date,
                        heartRate: entry.heartRate,
                        systolic: entry.bloodPressureSystolic,
                        diastolic: entry.bloodPressureDiastolic,
                        hydration: entry.hydration,
                        sleep: entry.sleepHours
                      }))}
                    />
                  </div>
                ) : (
                  <p className="text-gray-300">
                    Start tracking your health metrics to see trends over time.
                  </p>
                )}
              </div>
            </div>
            
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-white mb-4">BMI & Body Stats</h2>
              
              {healthMetrics ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <StatsCard 
                    title="Weight" 
                    value={`${healthMetrics.weight} kg`} 
                    icon={<Scale className="text-yellow-400" />} 
                  />
                  <StatsCard 
                    title="Height" 
                    value={`${healthMetrics.height} cm`} 
                    icon={<Activity className="text-green-400" />} 
                  />
                  <StatsCard 
                    title="BMI" 
                    value={calculateBMI(healthMetrics.weight, healthMetrics.height).toFixed(1)} 
                    icon={<Activity className="text-fitverse-blue" />} 
                  />
                </div>
              ) : (
                <p className="text-gray-300">
                  Enter your weight and height in the form above to calculate your BMI.
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold text-white mb-4">Sign In Required</h2>
            <p className="text-gray-300">
              Please sign in to track and view your health metrics.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

// Helper function to calculate BMI
const calculateBMI = (weight: number, height: number): number => {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
};

export default HealthPage;
