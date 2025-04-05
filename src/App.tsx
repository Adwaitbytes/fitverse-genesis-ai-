
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { WorkoutProvider } from "./contexts/WorkoutContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import { HealthProvider } from "./contexts/HealthContext";
import { SocialProvider } from "./contexts/SocialContext";

import Index from "./pages/Index";
import WorkoutsPage from "./pages/WorkoutsPage";
import HealthPage from "./pages/HealthPage";
import SocialPage from "./pages/SocialPage";
import CoachPage from "./pages/CoachPage";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import WorkoutDetailPage from "./pages/WorkoutDetailPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <WorkoutProvider>
          <HealthProvider>
            <SocialProvider>
              <SettingsProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/workouts" element={<WorkoutsPage />} />
                    <Route path="/workouts/:workoutId" element={<WorkoutDetailPage />} />
                    <Route path="/health" element={<HealthPage />} />
                    <Route path="/social" element={<SocialPage />} />
                    <Route path="/coach" element={<CoachPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </SettingsProvider>
            </SocialProvider>
          </HealthProvider>
        </WorkoutProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
