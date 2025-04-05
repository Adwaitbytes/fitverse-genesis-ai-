
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock, Flame, Dumbbell, Award, ArrowLeft, Check, Trash2 } from "lucide-react";
import FitverseHeader from "@/components/FitverseHeader";
import FitverseNavigation from "@/components/FitverseNavigation";
import { Button } from "@/components/ui/button";
import { useWorkout } from "@/contexts/WorkoutContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

const WorkoutDetailPage: React.FC = () => {
  const { workoutId } = useParams<{ workoutId: string }>();
  const navigate = useNavigate();
  const { availableWorkouts, userWorkouts, addWorkoutToUser, removeWorkoutFromUser, completeWorkout, trackExercise } = useWorkout();
  const { isAuthenticated } = useAuth();
  
  // Find the workout either in user's workouts or available workouts
  const workout = userWorkouts.find(w => w.id === workoutId) || 
                 availableWorkouts.find(w => w.id === workoutId);
  
  const [exerciseStates, setExerciseStates] = useState<{[key: string]: boolean}>({});
  
  // Initialize exercise states from workout data
  React.useEffect(() => {
    if (workout) {
      const initialStates: {[key: string]: boolean} = {};
      workout.exercises.forEach(exercise => {
        initialStates[exercise.id] = exercise.completed || false;
      });
      setExerciseStates(initialStates);
    }
  }, [workout]);
  
  const isInUserWorkouts = userWorkouts.some(w => w.id === workoutId);
  const isWorkoutCompleted = workout?.completed || false;
  
  const handleAddToMyWorkouts = () => {
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add workouts to your collection.",
        variant: "destructive"
      });
      return;
    }
    
    if (workoutId) {
      addWorkoutToUser(workoutId);
    }
  };
  
  const handleRemoveFromMyWorkouts = () => {
    if (workoutId) {
      removeWorkoutFromUser(workoutId);
      navigate("/workouts");
    }
  };
  
  const handleCompleteWorkout = () => {
    if (workoutId) {
      completeWorkout(workoutId);
      toast({
        title: "Workout Completed!",
        description: "Great job! Your progress has been tracked.",
      });
    }
  };
  
  const handleToggleExercise = (exerciseId: string) => {
    const newValue = !exerciseStates[exerciseId];
    setExerciseStates(prev => ({
      ...prev,
      [exerciseId]: newValue
    }));
    
    // Update in context if the workout is in user's collection
    if (isInUserWorkouts && workoutId) {
      trackExercise(workoutId, exerciseId, newValue);
    }
  };
  
  // Check if all exercises are completed
  const allExercisesCompleted = workout?.exercises.every(e => exerciseStates[e.id]) || false;
  
  if (!workout) {
    return (
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="md:w-16 md:border-r md:border-white/10">
          <FitverseNavigation />
        </div>
        
        <div className="flex-1 overflow-auto pb-20 md:pb-8">
          <FitverseHeader />
          
          <main className="container px-4 py-6 mx-auto">
            <div className="flex items-center mb-8">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 mr-2"
                onClick={() => navigate("/workouts")}
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            </div>
            
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-white mb-2">Workout Not Found</h1>
              <p className="text-gray-400 mb-6">The workout you're looking for doesn't exist or has been removed.</p>
              <Button 
                onClick={() => navigate("/workouts")}
                className="bg-fitverse-blue hover:bg-fitverse-blue/80"
              >
                Browse Workouts
              </Button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-16 md:border-r md:border-white/10">
        <FitverseNavigation />
      </div>
      
      <div className="flex-1 overflow-auto pb-20 md:pb-8">
        <FitverseHeader />
        
        <main className="container px-4 py-6 mx-auto">
          <div className="flex items-center mb-8">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-400 mr-2"
              onClick={() => navigate("/workouts")}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div 
                className="rounded-xl overflow-hidden h-[300px] md:h-[400px] mb-6 bg-cover bg-center"
                style={{backgroundImage: `url(${workout.image})`}}
              >
                <div className="w-full h-full bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-fitverse-blue/80 text-white text-xs font-medium px-2.5 py-0.5 rounded">
                        {workout.category}
                      </span>
                      <span className={`
                        text-xs font-medium px-2.5 py-0.5 rounded
                        ${workout.difficulty === 'beginner' ? 'bg-green-500/80 text-white' : 
                          workout.difficulty === 'intermediate' ? 'bg-yellow-500/80 text-white' : 
                          'bg-red-500/80 text-white'}
                      `}>
                        {workout.difficulty.charAt(0).toUpperCase() + workout.difficulty.slice(1)}
                      </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{workout.title}</h1>
                    <div className="flex flex-wrap items-center text-gray-300 text-sm gap-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{workout.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Flame className="w-4 h-4 mr-1" />
                        <span>{workout.calories} calories</span>
                      </div>
                      <div className="flex items-center">
                        <Dumbbell className="w-4 h-4 mr-1" />
                        <span>{workout.exercises.length} exercises</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-card rounded-xl p-6 mb-6">
                <h2 className="text-xl font-bold text-white mb-4">Exercise Plan</h2>
                
                <div className="space-y-4">
                  {workout.exercises.map((exercise, index) => (
                    <div 
                      key={exercise.id} 
                      className={`
                        p-4 rounded-lg flex items-center justify-between
                        ${exerciseStates[exercise.id] ? 'bg-fitverse-blue/20 border border-fitverse-blue/30' : 'bg-white/5'}
                      `}
                    >
                      <div className="flex items-center">
                        <div className="mr-4 bg-fitverse-dark/80 w-8 h-8 rounded-full flex items-center justify-center text-white">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className={`font-medium ${exerciseStates[exercise.id] ? 'text-fitverse-blue' : 'text-white'}`}>
                            {exercise.name}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {exercise.sets} sets × {exercise.reps} reps
                            {exercise.duration && ` • ${exercise.duration}`}
                            {exercise.weight && ` • ${exercise.weight} kg`}
                          </p>
                        </div>
                      </div>
                      
                      {isInUserWorkouts && (
                        <Button
                          variant={exerciseStates[exercise.id] ? "default" : "outline"}
                          size="sm"
                          className={exerciseStates[exercise.id] ? "bg-green-600 hover:bg-green-700" : ""}
                          onClick={() => handleToggleExercise(exercise.id)}
                          disabled={isWorkoutCompleted}
                        >
                          {exerciseStates[exercise.id] ? (
                            <>
                              <Check className="w-4 h-4 mr-1" /> Done
                            </>
                          ) : "Mark Done"}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="md:col-span-1 space-y-6">
              <div className="glass-card rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Workout Actions</h2>
                
                {isInUserWorkouts ? (
                  <>
                    {isWorkoutCompleted ? (
                      <div className="bg-green-500/20 border border-green-500/30 p-4 rounded-lg mb-4">
                        <div className="flex items-center">
                          <Award className="w-5 h-5 text-green-500 mr-2" />
                          <h3 className="font-medium text-white">Workout Completed!</h3>
                        </div>
                        <p className="text-sm text-gray-300 mt-1">
                          You completed this workout on {new Date(workout.dateCompleted || "").toLocaleDateString()}
                        </p>
                      </div>
                    ) : (
                      <Button
                        className="w-full bg-fitverse-blue hover:bg-fitverse-blue/80 mb-4"
                        disabled={!allExercisesCompleted}
                        onClick={handleCompleteWorkout}
                      >
                        {allExercisesCompleted ? (
                          <>
                            <Check className="w-4 h-4 mr-2" /> Complete Workout
                          </>
                        ) : "Mark All Exercises Complete"}
                      </Button>
                    )}
                    
                    <Button
                      variant="outline"
                      className="w-full text-red-500 border-red-500/30 hover:bg-red-500/10"
                      onClick={handleRemoveFromMyWorkouts}
                    >
                      <Trash2 className="w-4 h-4 mr-2" /> Remove from My Workouts
                    </Button>
                  </>
                ) : (
                  <Button
                    className="w-full bg-fitverse-blue hover:bg-fitverse-blue/80"
                    onClick={handleAddToMyWorkouts}
                  >
                    <Dumbbell className="w-4 h-4 mr-2" /> Add to My Workouts
                  </Button>
                )}
              </div>
              
              <div className="glass-card rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Tips</h2>
                
                <div className="space-y-3">
                  <div className="bg-white/5 p-3 rounded-lg">
                    <p className="text-sm text-gray-300">
                      Maintain proper form throughout each exercise to prevent injury and maximize results.
                    </p>
                  </div>
                  
                  <div className="bg-white/5 p-3 rounded-lg">
                    <p className="text-sm text-gray-300">
                      Stay hydrated! Drink water before, during, and after your workout.
                    </p>
                  </div>
                  
                  <div className="bg-white/5 p-3 rounded-lg">
                    <p className="text-sm text-gray-300">
                      Rest for 30-60 seconds between sets for optimal recovery.
                    </p>
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

export default WorkoutDetailPage;
