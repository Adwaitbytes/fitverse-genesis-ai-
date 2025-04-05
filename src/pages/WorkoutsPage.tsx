
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, PlusCircle, Check } from "lucide-react";
import FitverseHeader from "@/components/FitverseHeader";
import FitverseNavigation from "@/components/FitverseNavigation";
import WorkoutCard from "@/components/WorkoutCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWorkout } from "@/contexts/WorkoutContext";
import { useAuth } from "@/contexts/AuthContext";

const WorkoutsPage: React.FC = () => {
  const navigate = useNavigate();
  const { availableWorkouts, userWorkouts } = useWorkout();
  const { isAuthenticated } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  
  // Filter available workouts based on search and filters
  const filteredAvailableWorkouts = availableWorkouts.filter(workout => {
    // Apply search filter
    if (searchQuery && !workout.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply category filter
    if (selectedCategory && workout.category !== selectedCategory) {
      return false;
    }
    
    // Apply difficulty filter
    if (selectedDifficulty && workout.difficulty !== selectedDifficulty) {
      return false;
    }
    
    return true;
  });
  
  // Filter user workouts based on search and filters
  const filteredUserWorkouts = userWorkouts.filter(workout => {
    // Apply search filter
    if (searchQuery && !workout.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply category filter
    if (selectedCategory && workout.category !== selectedCategory) {
      return false;
    }
    
    // Apply difficulty filter
    if (selectedDifficulty && workout.difficulty !== selectedDifficulty) {
      return false;
    }
    
    return true;
  });
  
  // Get unique categories from all workouts
  const categories = Array.from(new Set([
    ...availableWorkouts.map(w => w.category)
  ]));
  
  // Handle filters
  const toggleCategory = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };
  
  const toggleDifficulty = (difficulty: string) => {
    if (selectedDifficulty === difficulty) {
      setSelectedDifficulty(null);
    } else {
      setSelectedDifficulty(difficulty);
    }
  };
  
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedDifficulty(null);
  };
  
  const handleWorkoutClick = (id: string) => {
    navigate(`/workouts/${id}`);
  };

  const handleTabChange = (tabValue: string) => {
    const tabElement = document.querySelector(`[data-value="${tabValue}"]`);
    if (tabElement) {
      // Fixed: Use better DOM manipulation approach instead of .click()
      (tabElement as HTMLElement).focus();
      (tabElement as HTMLElement).dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      (tabElement as HTMLElement).dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    }
  };

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
          
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search workouts..."
                className="pl-10 text-white"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="dropdown">
                <Button variant="outline" size="sm" className="text-gray-300">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                
                <div className="dropdown-content">
                  {/* Categories */}
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-white mb-2">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(category => (
                        <Button
                          key={category}
                          variant="outline"
                          size="sm"
                          className={`text-xs ${selectedCategory === category ? 'bg-fitverse-blue text-white' : 'text-gray-300'}`}
                          onClick={() => toggleCategory(category)}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Difficulty */}
                  <div>
                    <h3 className="text-sm font-medium text-white mb-2">Difficulty</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className={`text-xs ${selectedDifficulty === 'beginner' ? 'bg-green-600 text-white' : 'text-gray-300'}`}
                        onClick={() => toggleDifficulty('beginner')}
                      >
                        Beginner
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`text-xs ${selectedDifficulty === 'intermediate' ? 'bg-yellow-600 text-white' : 'text-gray-300'}`}
                        onClick={() => toggleDifficulty('intermediate')}
                      >
                        Intermediate
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`text-xs ${selectedDifficulty === 'advanced' ? 'bg-red-600 text-white' : 'text-gray-300'}`}
                        onClick={() => toggleDifficulty('advanced')}
                      >
                        Advanced
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {(selectedCategory || selectedDifficulty || searchQuery) && (
                <Button variant="ghost" size="sm" className="text-gray-300" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
          
          <Tabs defaultValue={isAuthenticated ? "my-workouts" : "all-workouts"}>
            <TabsList className="mb-6">
              {isAuthenticated && (
                <TabsTrigger value="my-workouts">My Workouts</TabsTrigger>
              )}
              <TabsTrigger value="all-workouts">All Workouts</TabsTrigger>
            </TabsList>
            
            {isAuthenticated && (
              <TabsContent value="my-workouts">
                {filteredUserWorkouts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredUserWorkouts.map((workout) => (
                      <div 
                        key={workout.id} 
                        className="relative cursor-pointer" 
                        onClick={() => handleWorkoutClick(workout.id)}
                      >
                        {workout.completed && (
                          <div className="absolute top-3 right-3 z-10 bg-green-600 rounded-full p-1">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <WorkoutCard {...workout} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-semibold text-white mb-2">No workouts found</h3>
                    <p className="text-gray-400 mb-6">
                      {searchQuery || selectedCategory || selectedDifficulty ? 
                        "Try adjusting your filters or search terms" : 
                        "You haven't added any workouts to your collection yet"}
                    </p>
                    <Button 
                      onClick={() => handleTabChange("all-workouts")}
                      className="bg-fitverse-blue hover:bg-fitverse-blue/80"
                    >
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Browse All Workouts
                    </Button>
                  </div>
                )}
              </TabsContent>
            )}
            
            <TabsContent value="all-workouts">
              {filteredAvailableWorkouts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAvailableWorkouts.map((workout) => (
                    <div 
                      key={workout.id} 
                      className="cursor-pointer" 
                      onClick={() => handleWorkoutClick(workout.id)}
                    >
                      <WorkoutCard {...workout} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-semibold text-white mb-2">No workouts found</h3>
                  <p className="text-gray-400 mb-6">
                    Try adjusting your filters or search terms
                  </p>
                  <Button 
                    onClick={clearFilters}
                    className="bg-fitverse-blue hover:bg-fitverse-blue/80"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
      
      {/* Fixed: Use proper CSS in style tag */}
      <style>{`
        .dropdown {
          position: relative;
          display: inline-block;
        }
        
        .dropdown-content {
          display: none;
          position: absolute;
          right: 0;
          margin-top: 0.5rem;
          min-width: 260px;
          background: rgba(20, 20, 30, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          padding: 1rem;
          z-index: 50;
        }
        
        .dropdown:hover .dropdown-content {
          display: block;
        }
      `}</style>
    </div>
  );
};

export default WorkoutsPage;
