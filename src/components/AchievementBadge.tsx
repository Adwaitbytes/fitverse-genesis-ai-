
import React from "react";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface AchievementBadgeProps {
  name: string;
  description: string;
  icon?: React.ReactNode;
  rarity: "common" | "rare" | "epic" | "legendary";
  className?: string;
  isLocked?: boolean;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  name,
  description,
  icon = <Trophy />,
  rarity = "common",
  className,
  isLocked = false
}) => {
  const rarityColors = {
    common: "from-slate-400 to-slate-300",
    rare: "from-fitverse-blue to-blue-300",
    epic: "from-fitverse-purple to-violet-300",
    legendary: "from-fitverse-pink to-orange-300"
  };
  
  const bgColor = isLocked ? "from-gray-700 to-gray-600" : rarityColors[rarity];

  return (
    <div className={cn("relative group", className)}>
      <div className={cn(
        "absolute inset-0 rounded-xl animate-pulse-glow opacity-60",
        isLocked ? "hidden" : "block"
      )} style={{ '--pulse-color': 'rgba(76, 201, 240, 0.3)' } as React.CSSProperties}></div>
      
      <div className="glass-card overflow-hidden transition-transform duration-300 transform group-hover:scale-[1.02]">
        <div className={cn(
          "aspect-square relative overflow-hidden bg-gradient-to-br",
          bgColor
        )}>
          {/* Badge geometric pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(0,0,0,0.2)_70%)]"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 border-2 border-white/30 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 border-2 border-white/20 rounded-full"></div>
          </div>
          
          {/* Badge icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={cn(
              "w-16 h-16 flex items-center justify-center text-white",
              isLocked ? "opacity-30" : "opacity-100"
            )}>
              {React.cloneElement(icon as React.ReactElement, { 
                className: "w-10 h-10"
              })}
            </div>
          </div>
          
          {/* Locked overlay */}
          {isLocked && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <div className="rounded-full bg-fitverse-dark/80 p-2 border border-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-3 text-center">
          <h3 className={cn(
            "font-bold text-sm",
            isLocked ? "text-gray-400" : "text-white"
          )}>
            {name}
          </h3>
          <p className="text-xs text-gray-400 mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default AchievementBadge;
