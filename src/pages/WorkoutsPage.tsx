
import React from "react";
import FitverseHeader from "@/components/FitverseHeader";
import FitverseNavigation from "@/components/FitverseNavigation";
import WorkoutCard from "@/components/WorkoutCard";

const workouts = [
  {
    title: "Full Body HIIT",
    category: "HIIT",
    duration: "30 min",
    calories: 320,
    difficulty: "intermediate" as const,
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Core Crusher",
    category: "Strength",
    duration: "25 min",
    calories: 280,
    difficulty: "advanced" as const,
    image: "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Morning Yoga Flow",
    category: "Yoga",
    duration: "20 min",
    calories: 150,
    difficulty: "beginner" as const,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Cardio Blast",
    category: "Cardio",
    duration: "35 min",
    calories: 400,
    difficulty: "intermediate" as const,
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const WorkoutsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-16 md:border-r md:border-white/10">
        <FitverseNavigation />
      </div>
      
      <div className="flex-1 overflow-auto pb-20 md:pb-8">
        <FitverseHeader />
        
        <main className="container px-4 py-6 mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1 text-white">Workouts Library</h1>
            <p className="text-gray-400">Find your perfect workout routine</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout, index) => (
              <WorkoutCard key={index} {...workout} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default WorkoutsPage;
