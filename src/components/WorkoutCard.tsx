
import React from "react";
import { Play, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface WorkoutCardProps {
  id: string;
  title: string;
  category: string;
  duration: string;
  calories: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  image: string;
  className?: string;
  onStartWorkout?: (id: string) => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  id,
  title,
  category,
  duration,
  calories,
  difficulty,
  image,
  className,
  onStartWorkout
}) => {
  const navigate = useNavigate();
  const difficultyColor = {
    beginner: "text-green-400",
    intermediate: "text-yellow-400",
    advanced: "text-fitverse-pink"
  };

  const handleStartWorkout = () => {
    if (onStartWorkout) {
      onStartWorkout(id);
    } else {
      navigate(`/workouts/${id}`);
    }
  };

  return (
    <div 
      className={cn(
        "group glass-card overflow-hidden",
        className
      )}
    >
      <div className="relative h-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-fitverse-dark to-transparent z-10"></div>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full z-20">
          <span className="text-xs font-medium">{category}</span>
        </div>
        <div className="absolute bottom-3 left-3 flex items-center space-x-3 z-20">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3 text-gray-300" />
            <span className="text-xs text-gray-300">{duration}</span>
          </div>
          <div className="text-xs text-gray-300">
            {calories} cal
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <span className={cn("text-xs font-medium", difficultyColor[difficulty])}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
        </div>
        
        <Button 
          onClick={handleStartWorkout}
          className="w-full bg-gradient-to-r from-fitverse-blue to-fitverse-purple mt-2 hover:opacity-90 transition-opacity"
        >
          <Play className="w-4 h-4 mr-2" /> Start Workout
        </Button>
      </div>
    </div>
  );
};

export default WorkoutCard;
