
import React from "react";
import { Activity, Heart, Dumbbell, Users, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface NavigationItem {
  name: string;
  icon: React.ReactNode;
  path: string;
}

const FitverseNavigation: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems: NavigationItem[] = [
    { name: "Dashboard", icon: <Activity />, path: "/" },
    { name: "Workouts", icon: <Dumbbell />, path: "/workouts" },
    { name: "Health", icon: <Heart />, path: "/health" },
    { name: "Social", icon: <Users />, path: "/social" },
    { name: "AI Coach", icon: <MessageCircle />, path: "/coach" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-glass-gradient backdrop-blur-lg border-t border-white/10 p-2 md:relative md:bottom-auto md:left-auto md:right-auto md:bg-transparent md:border-0 md:p-0">
      <nav className="container flex justify-between items-center md:flex-col md:h-screen md:justify-center md:py-8 md:space-y-8">
        {navItems.map((item) => (
          <NavItem 
            key={item.name} 
            item={item} 
            isActive={
              item.path === "/" 
                ? currentPath === "/" 
                : currentPath.startsWith(item.path)
            } 
          />
        ))}
      </nav>
    </div>
  );
};

const NavItem: React.FC<{ item: NavigationItem; isActive: boolean }> = ({ item, isActive }) => {
  return (
    <Link
      to={item.path}
      className={cn(
        "flex items-center justify-center p-2 rounded-xl transition-all",
        "md:w-14 md:h-14 md:flex-col md:space-y-1",
        isActive
          ? "bg-gradient-to-r from-fitverse-blue/20 to-fitverse-purple/20 text-white shadow-neon-blue" 
          : "text-gray-400 hover:text-white hover:bg-white/5"
      )}
    >
      <div 
        className={cn(
          "relative",
          isActive && "after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:transform after:-translate-x-1/2 after:w-1 after:h-1 after:bg-fitverse-blue after:rounded-full after:shadow-neon-blue"
        )}
      >
        {React.cloneElement(item.icon as React.ReactElement, { 
          className: cn("w-5 h-5", isActive ? "text-fitverse-blue" : "text-gray-400")
        })}
      </div>
      <span className="text-xs mt-1 hidden md:block">{item.name}</span>
    </Link>
  );
};

export default FitverseNavigation;
