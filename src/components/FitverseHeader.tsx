
import React from "react";
import { Button } from "@/components/ui/button";
import { Bell, User, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const FitverseHeader: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <header className="relative z-10 w-full py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="relative mr-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="absolute inset-0 bg-gradient-to-r from-fitverse-blue to-fitverse-pink rounded-lg blur opacity-70"></div>
            <div className="relative bg-fitverse-dark p-1.5 rounded-lg">
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fitverse-blue via-fitverse-purple to-fitverse-pink">
                FitVerse
              </h1>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {isAuthenticated ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5 text-white" />
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-fitverse-pink"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-fitverse-dark border-fitverse-blue/20">
                  <DropdownMenuLabel className="text-white">Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-gray-300 cursor-pointer">
                    New workout plan available
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-300 cursor-pointer">
                    Complete your daily goal
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-300 cursor-pointer">
                    John started following you
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5 text-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-fitverse-dark border-fitverse-blue/20">
                  <DropdownMenuLabel className="text-white">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-gray-300 cursor-pointer" onClick={() => navigate("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-300 cursor-pointer" onClick={() => navigate("/settings")}>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-gray-300 cursor-pointer" onClick={logout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button onClick={handleLoginClick} className="bg-fitverse-blue hover:bg-fitverse-blue/90">
              Sign In
            </Button>
          )}
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default FitverseHeader;
