
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, Lock, Bell, Eye, Smartphone, Database } from "lucide-react";
import FitverseHeader from "@/components/FitverseHeader";
import FitverseNavigation from "@/components/FitverseNavigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { useSettings } from "@/contexts/SettingsContext";
import { toast } from "@/components/ui/use-toast";

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateApiKey, logout } = useAuth();
  const { settings, updateSettings } = useSettings();
  
  const [apiKey, setApiKey] = useState(user?.geminiApiKey || "");
  
  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleUpdateApiKey = () => {
    updateApiKey(apiKey);
    toast({
      title: "API Key Updated",
      description: "Your Gemini AI API key has been saved successfully."
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!isAuthenticated) {
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
            <h1 className="text-2xl font-bold mb-1 text-white">Settings</h1>
            <p className="text-gray-400">Customize your FitVerse experience</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="glass-card rounded-xl p-4">
                <nav className="space-y-2">
                  <a href="#account" className="flex items-center p-3 rounded-lg bg-fitverse-blue/20 text-white">
                    <Settings className="mr-2 h-5 w-5" />
                    <span>Account</span>
                  </a>
                  <a href="#privacy" className="flex items-center p-3 rounded-lg hover:bg-white/5 text-gray-300">
                    <Lock className="mr-2 h-5 w-5" />
                    <span>Privacy</span>
                  </a>
                  <a href="#notifications" className="flex items-center p-3 rounded-lg hover:bg-white/5 text-gray-300">
                    <Bell className="mr-2 h-5 w-5" />
                    <span>Notifications</span>
                  </a>
                  <a href="#appearance" className="flex items-center p-3 rounded-lg hover:bg-white/5 text-gray-300">
                    <Eye className="mr-2 h-5 w-5" />
                    <span>Appearance</span>
                  </a>
                  <a href="#devices" className="flex items-center p-3 rounded-lg hover:bg-white/5 text-gray-300">
                    <Smartphone className="mr-2 h-5 w-5" />
                    <span>Connected Devices</span>
                  </a>
                  <a href="#api" className="flex items-center p-3 rounded-lg hover:bg-white/5 text-gray-300">
                    <Database className="mr-2 h-5 w-5" />
                    <span>API Keys</span>
                  </a>
                </nav>
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-6">
              <section id="account" className="glass-card rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Account Settings</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={user?.name} readOnly className="bg-white/5 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" value={user?.email} readOnly className="bg-white/5 text-white" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Units System</Label>
                    <div className="flex items-center space-x-4">
                      <button
                        className={`px-4 py-2 rounded-lg ${settings.metricSystem === 'metric' ? 'bg-fitverse-blue text-white' : 'bg-white/5 text-gray-300'}`}
                        onClick={() => updateSettings({ metricSystem: 'metric' })}
                      >
                        Metric (kg, cm)
                      </button>
                      <button
                        className={`px-4 py-2 rounded-lg ${settings.metricSystem === 'imperial' ? 'bg-fitverse-blue text-white' : 'bg-white/5 text-gray-300'}`}
                        onClick={() => updateSettings({ metricSystem: 'imperial' })}
                      >
                        Imperial (lb, in)
                      </button>
                    </div>
                  </div>
                  
                  <Button 
                    variant="destructive" 
                    onClick={handleLogout}
                    className="mt-6"
                  >
                    Logout
                  </Button>
                </div>
              </section>
              
              <section id="api" className="glass-card rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">API Settings</h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="geminiKey">Gemini AI API Key</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="geminiKey" 
                        type="password"
                        value={apiKey} 
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="AIza..."
                        className="flex-1 text-white"
                      />
                      <Button onClick={handleUpdateApiKey} className="bg-fitverse-blue hover:bg-fitverse-blue/80">
                        Save
                      </Button>
                    </div>
                    <p className="text-xs text-gray-400">
                      Get your API key from <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" className="text-fitverse-blue hover:underline">Google AI Studio</a>
                    </p>
                  </div>
                </div>
              </section>
              
              <section id="privacy" className="glass-card rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Privacy Settings</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="showOnlineStatus" className="text-base font-medium">Show Online Status</Label>
                      <p className="text-sm text-gray-400">Let others see when you're active</p>
                    </div>
                    <Switch 
                      id="showOnlineStatus" 
                      checked={settings.privacySettings.showOnlineStatus} 
                      onCheckedChange={(checked) => updateSettings({
                        privacySettings: { ...settings.privacySettings, showOnlineStatus: checked }
                      })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="allowFriendRequests" className="text-base font-medium">Allow Friend Requests</Label>
                      <p className="text-sm text-gray-400">Receive connection requests from other users</p>
                    </div>
                    <Switch 
                      id="allowFriendRequests" 
                      checked={settings.privacySettings.allowFriendRequests} 
                      onCheckedChange={(checked) => updateSettings({
                        privacySettings: { ...settings.privacySettings, allowFriendRequests: checked }
                      })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="showWorkoutActivity" className="text-base font-medium">Share Workout Activity</Label>
                      <p className="text-sm text-gray-400">Show your workout progress in friends' feeds</p>
                    </div>
                    <Switch 
                      id="showWorkoutActivity" 
                      checked={settings.privacySettings.showWorkoutActivity} 
                      onCheckedChange={(checked) => updateSettings({
                        privacySettings: { ...settings.privacySettings, showWorkoutActivity: checked }
                      })}
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
