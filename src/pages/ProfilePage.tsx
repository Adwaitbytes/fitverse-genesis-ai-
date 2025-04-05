
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Edit, Dumbbell, Activity, Calendar, Award } from "lucide-react";
import FitverseHeader from "@/components/FitverseHeader";
import FitverseNavigation from "@/components/FitverseNavigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useWorkout } from "@/contexts/WorkoutContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProgressChart from "@/components/ProgressChart";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUserProfile } = useAuth();
  const { userWorkouts, workoutProgress } = useWorkout();
  
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [fitnessLevel, setFitnessLevel] = useState<"beginner" | "intermediate" | "advanced">(user?.fitnessLevel || "beginner");
  const [fitnessGoals, setFitnessGoals] = useState(user?.fitnessGoals?.join(", ") || "");
  
  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  
  // Update local state when user changes
  React.useEffect(() => {
    if (user) {
      setName(user.name);
      setFitnessLevel(user.fitnessLevel);
      setFitnessGoals(user.fitnessGoals?.join(", ") || "");
    }
  }, [user]);
  
  const handleSaveProfile = () => {
    updateUserProfile({
      name,
      fitnessLevel,
      fitnessGoals: fitnessGoals.split(",").map(goal => goal.trim()).filter(Boolean)
    });
    setIsEditDialogOpen(false);
  };
  
  // Format workout progress data for the chart
  const activityData = React.useMemo(() => {
    // Get the last 7 days
    const last7Days = [...Array(7)].map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split("T")[0];
    }).reverse();
    
    return last7Days.map(day => {
      const progress = workoutProgress.find(p => p.date === day);
      return {
        name: new Date(day).toLocaleDateString(undefined, { weekday: 'short' }),
        value: progress?.workoutsCompleted || 0
      };
    });
  }, [workoutProgress]);
  
  // Calculate stats
  const totalWorkouts = userWorkouts.length;
  const completedWorkouts = userWorkouts.filter(w => w.completed).length;
  const totalCaloriesBurned = workoutProgress.reduce((sum, day) => sum + day.totalCaloriesBurned, 0);
  const streakDays = 5; // In a real app, this would be calculated based on consecutive workout days
  
  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-16 md:border-r md:border-white/10">
        <FitverseNavigation />
      </div>
      
      <div className="flex-1 overflow-auto pb-20 md:pb-8">
        <FitverseHeader />
        
        <main className="container px-4 py-6 mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1 text-white">My Profile</h1>
            <p className="text-gray-400">View and manage your fitness profile</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="md:col-span-1">
              <div className="glass-card rounded-xl p-6 text-center">
                <div className="relative mx-auto mb-4">
                  <div className="w-24 h-24 rounded-full bg-fitverse-blue/20 flex items-center justify-center mx-auto overflow-hidden">
                    {user.profileImage ? (
                      <img src={user.profileImage} alt="User avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-fitverse-blue" />
                    )}
                  </div>
                  <button 
                    className="absolute bottom-0 right-1/3 bg-fitverse-blue/80 p-1 rounded-full text-white"
                    onClick={() => setIsEditDialogOpen(true)}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
                
                <h2 className="text-xl font-bold text-white">{user.name}</h2>
                <p className="text-sm text-fitverse-purple capitalize">{user.fitnessLevel} Level</p>
                
                <div className="mt-4 space-y-1">
                  <div className="flex items-center justify-center text-sm">
                    <Award className="w-4 h-4 text-yellow-400 mr-2" />
                    <span className="text-gray-300">Member since April 2025</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h3 className="text-sm font-medium text-white mb-3">Fitness Goals</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {user.fitnessGoals && user.fitnessGoals.length > 0 ? (
                      user.fitnessGoals.map((goal, index) => (
                        <span key={index} className="bg-fitverse-purple/20 text-fitverse-purple px-3 py-1 rounded-full text-xs">
                          {goal}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 text-sm">No goals set yet</span>
                    )}
                  </div>
                </div>
                
                <Button 
                  className="mt-6 w-full bg-fitverse-blue hover:bg-fitverse-blue/80"
                  onClick={() => setIsEditDialogOpen(true)}
                >
                  Edit Profile
                </Button>
              </div>
            </div>
            
            {/* Stats and Progress */}
            <div className="md:col-span-2 space-y-6">
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Fitness Stats</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-fitverse-blue/20 rounded-lg p-4 text-center">
                    <Dumbbell className="w-6 h-6 text-fitverse-blue mx-auto mb-2" />
                    <h4 className="text-2xl font-bold text-white">{totalWorkouts}</h4>
                    <p className="text-xs text-gray-400">Total Workouts</p>
                  </div>
                  
                  <div className="bg-fitverse-purple/20 rounded-lg p-4 text-center">
                    <Activity className="w-6 h-6 text-fitverse-purple mx-auto mb-2" />
                    <h4 className="text-2xl font-bold text-white">{completedWorkouts}</h4>
                    <p className="text-xs text-gray-400">Completed</p>
                  </div>
                  
                  <div className="bg-fitverse-pink/20 rounded-lg p-4 text-center">
                    <Calendar className="w-6 h-6 text-fitverse-pink mx-auto mb-2" />
                    <h4 className="text-2xl font-bold text-white">{streakDays}</h4>
                    <p className="text-xs text-gray-400">Day Streak</p>
                  </div>
                  
                  <div className="bg-fitverse-blue/20 rounded-lg p-4 text-center">
                    <Award className="w-6 h-6 text-fitverse-blue mx-auto mb-2" />
                    <h4 className="text-2xl font-bold text-white">{totalCaloriesBurned}</h4>
                    <p className="text-xs text-gray-400">Calories Burned</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-card rounded-xl p-6">
                <Tabs defaultValue="activity">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-white">Fitness Progress</h3>
                    <TabsList>
                      <TabsTrigger value="activity">Activity</TabsTrigger>
                      <TabsTrigger value="achievements">Achievements</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="activity">
                    <ProgressChart
                      title="Weekly Workout Frequency"
                      data={activityData}
                      color="#4CC9F0"
                      unit=""
                    />
                  </TabsContent>
                  
                  <TabsContent value="achievements">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-lg p-4 flex items-center space-x-3">
                        <div className="bg-yellow-500/20 p-2 rounded-full">
                          <Award className="w-6 h-6 text-yellow-500" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">First Workout</h4>
                          <p className="text-xs text-gray-400">Completed your first workout</p>
                        </div>
                      </div>
                      
                      <div className="bg-white/5 rounded-lg p-4 flex items-center space-x-3">
                        <div className="bg-fitverse-blue/20 p-2 rounded-full">
                          <Calendar className="w-6 h-6 text-fitverse-blue" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">3-Day Streak</h4>
                          <p className="text-xs text-gray-400">Workout for 3 days in a row</p>
                        </div>
                      </div>
                      
                      <div className="bg-white/5 rounded-lg p-4 flex items-center space-x-3 opacity-50">
                        <div className="bg-fitverse-pink/20 p-2 rounded-full">
                          <Activity className="w-6 h-6 text-fitverse-pink" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">Calorie Crusher</h4>
                          <p className="text-xs text-gray-400">Burn 1000 calories in a week</p>
                        </div>
                      </div>
                      
                      <div className="bg-white/5 rounded-lg p-4 flex items-center space-x-3 opacity-50">
                        <div className="bg-fitverse-purple/20 p-2 rounded-full">
                          <Dumbbell className="w-6 h-6 text-fitverse-purple" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">Strength Master</h4>
                          <p className="text-xs text-gray-400">Complete 10 strength workouts</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* Edit Profile Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-white"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="fitnessLevel">Fitness Level</Label>
              <Select 
                value={fitnessLevel} 
                onValueChange={(value) => setFitnessLevel(value as "beginner" | "intermediate" | "advanced")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your fitness level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="fitnessGoals">Fitness Goals (comma separated)</Label>
              <Input
                id="fitnessGoals"
                value={fitnessGoals}
                onChange={(e) => setFitnessGoals(e.target.value)}
                placeholder="e.g. Weight loss, Muscle gain, Flexibility"
                className="text-white"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              onClick={handleSaveProfile}
              className="bg-fitverse-blue hover:bg-fitverse-blue/80"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfilePage;
