
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from "@/components/ui/use-toast";

export interface Workout {
  id: string;
  title: string;
  category: string;
  duration: string;
  calories: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  image: string;
  exercises: Exercise[];
  completed?: boolean;
  dateCompleted?: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: string;
  completed?: boolean;
}

interface WorkoutProgress {
  date: string; // ISO string
  workoutsCompleted: number;
  totalCaloriesBurned: number;
  totalDuration: number; // in minutes
}

interface WorkoutContextType {
  availableWorkouts: Workout[];
  userWorkouts: Workout[];
  workoutProgress: WorkoutProgress[];
  addWorkoutToUser: (workoutId: string) => void;
  removeWorkoutFromUser: (workoutId: string) => void;
  completeWorkout: (workoutId: string) => void;
  trackExercise: (workoutId: string, exerciseId: string, completed: boolean) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

// Sample workout data
const AVAILABLE_WORKOUTS: Workout[] = [
  {
    id: '1',
    title: "Full Body HIIT",
    category: "HIIT",
    duration: "30 min",
    calories: 320,
    difficulty: "intermediate",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    exercises: [
      { id: '1-1', name: "Jumping Jacks", sets: 3, reps: 20 },
      { id: '1-2', name: "Burpees", sets: 3, reps: 10 },
      { id: '1-3', name: "Mountain Climbers", sets: 3, reps: 20 },
      { id: '1-4', name: "Push-ups", sets: 3, reps: 15 }
    ]
  },
  {
    id: '2',
    title: "Core Crusher",
    category: "Strength",
    duration: "25 min",
    calories: 280,
    difficulty: "advanced",
    image: "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    exercises: [
      { id: '2-1', name: "Crunches", sets: 3, reps: 20 },
      { id: '2-2', name: "Plank", sets: 3, reps: 1, duration: "1 min" },
      { id: '2-3', name: "Russian Twists", sets: 3, reps: 15 },
      { id: '2-4', name: "Leg Raises", sets: 3, reps: 12 }
    ]
  },
  {
    id: '3',
    title: "Morning Yoga Flow",
    category: "Yoga",
    duration: "20 min",
    calories: 150,
    difficulty: "beginner",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    exercises: [
      { id: '3-1', name: "Downward Dog", sets: 1, reps: 1, duration: "1 min" },
      { id: '3-2', name: "Warrior I", sets: 1, reps: 1, duration: "1 min" },
      { id: '3-3', name: "Child's Pose", sets: 1, reps: 1, duration: "1 min" },
      { id: '3-4', name: "Cat-Cow Stretch", sets: 1, reps: 10 }
    ]
  },
  {
    id: '4',
    title: "Cardio Blast",
    category: "Cardio",
    duration: "35 min",
    calories: 400,
    difficulty: "intermediate",
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    exercises: [
      { id: '4-1', name: "Jogging", sets: 1, reps: 1, duration: "10 min" },
      { id: '4-2', name: "High Knees", sets: 3, reps: 30 },
      { id: '4-3', name: "Jumping Rope", sets: 1, reps: 1, duration: "5 min" },
      { id: '4-4', name: "Box Jumps", sets: 3, reps: 15 }
    ]
  }
];

export const WorkoutProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { user } = useAuth();
  const [availableWorkouts, setAvailableWorkouts] = useState<Workout[]>(AVAILABLE_WORKOUTS);
  const [userWorkouts, setUserWorkouts] = useState<Workout[]>([]);
  const [workoutProgress, setWorkoutProgress] = useState<WorkoutProgress[]>([]);
  
  // Load user workouts from localStorage when user changes
  useEffect(() => {
    if (user) {
      try {
        const savedWorkouts = localStorage.getItem(`fitverse_workouts_${user.id}`);
        if (savedWorkouts) {
          setUserWorkouts(JSON.parse(savedWorkouts));
        }
        
        const savedProgress = localStorage.getItem(`fitverse_progress_${user.id}`);
        if (savedProgress) {
          setWorkoutProgress(JSON.parse(savedProgress));
        }
      } catch (error) {
        console.error('Failed to load workout data', error);
      }
    } else {
      // Reset when user logs out
      setUserWorkouts([]);
      setWorkoutProgress([]);
    }
  }, [user]);
  
  // Save user workouts to localStorage whenever they change
  useEffect(() => {
    if (user && userWorkouts.length > 0) {
      localStorage.setItem(`fitverse_workouts_${user.id}`, JSON.stringify(userWorkouts));
    }
  }, [user, userWorkouts]);
  
  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (user && workoutProgress.length > 0) {
      localStorage.setItem(`fitverse_progress_${user.id}`, JSON.stringify(workoutProgress));
    }
  }, [user, workoutProgress]);

  const addWorkoutToUser = (workoutId: string) => {
    const workoutToAdd = availableWorkouts.find(w => w.id === workoutId);
    if (!workoutToAdd) return;
    
    // Check if it's already in the user's workouts
    if (userWorkouts.some(w => w.id === workoutId)) {
      toast({
        title: "Already Added",
        description: "This workout is already in your list.",
      });
      return;
    }
    
    const updatedWorkouts = [...userWorkouts, workoutToAdd];
    setUserWorkouts(updatedWorkouts);
    
    toast({
      title: "Workout Added",
      description: `${workoutToAdd.title} has been added to your workouts.`,
    });
  };

  const removeWorkoutFromUser = (workoutId: string) => {
    const updatedWorkouts = userWorkouts.filter(w => w.id !== workoutId);
    setUserWorkouts(updatedWorkouts);
    
    toast({
      title: "Workout Removed",
      description: "The workout has been removed from your list.",
    });
  };

  const completeWorkout = (workoutId: string) => {
    const workout = userWorkouts.find(w => w.id === workoutId);
    if (!workout) return;
    
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    // Update the workout completion status
    const updatedWorkouts = userWorkouts.map(w => {
      if (w.id === workoutId) {
        return { ...w, completed: true, dateCompleted: today };
      }
      return w;
    });
    
    setUserWorkouts(updatedWorkouts);
    
    // Update progress tracking
    const durationInMinutes = parseInt(workout.duration.split(' ')[0]);
    
    // Check if there's a progress entry for today
    const todayProgressIndex = workoutProgress.findIndex(p => p.date === today);
    
    if (todayProgressIndex >= 0) {
      // Update today's entry
      const updatedProgress = [...workoutProgress];
      updatedProgress[todayProgressIndex] = {
        ...updatedProgress[todayProgressIndex],
        workoutsCompleted: updatedProgress[todayProgressIndex].workoutsCompleted + 1,
        totalCaloriesBurned: updatedProgress[todayProgressIndex].totalCaloriesBurned + workout.calories,
        totalDuration: updatedProgress[todayProgressIndex].totalDuration + durationInMinutes
      };
      setWorkoutProgress(updatedProgress);
    } else {
      // Add new entry for today
      setWorkoutProgress([
        ...workoutProgress,
        {
          date: today,
          workoutsCompleted: 1,
          totalCaloriesBurned: workout.calories,
          totalDuration: durationInMinutes
        }
      ]);
    }
    
    toast({
      title: "Workout Completed!",
      description: `Great job finishing ${workout.title}!`,
    });
  };

  const trackExercise = (workoutId: string, exerciseId: string, completed: boolean) => {
    const updatedWorkouts = userWorkouts.map(workout => {
      if (workout.id === workoutId) {
        const updatedExercises = workout.exercises.map(exercise => {
          if (exercise.id === exerciseId) {
            return { ...exercise, completed };
          }
          return exercise;
        });
        
        // Check if all exercises are completed
        const allCompleted = updatedExercises.every(e => e.completed);
        
        return { 
          ...workout, 
          exercises: updatedExercises,
          completed: allCompleted,
          dateCompleted: allCompleted ? new Date().toISOString().split('T')[0] : workout.dateCompleted
        };
      }
      return workout;
    });
    
    setUserWorkouts(updatedWorkouts);
  };

  return (
    <WorkoutContext.Provider value={{
      availableWorkouts,
      userWorkouts,
      workoutProgress,
      addWorkoutToUser,
      removeWorkoutFromUser,
      completeWorkout,
      trackExercise
    }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
};
