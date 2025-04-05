
import React from "react";
import { cn } from "@/lib/utils";

interface AvatarHologramProps {
  image: string;
  name: string;
  status?: "online" | "offline" | "workout";
  className?: string;
  size?: "sm" | "md" | "lg";
}

const AvatarHologram: React.FC<AvatarHologramProps> = ({
  image,
  name,
  status = "offline",
  className,
  size = "md"
}) => {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24"
  };
  
  const statusColor = {
    online: "bg-green-500",
    offline: "bg-gray-500",
    workout: "bg-fitverse-pink"
  };
  
  const baseRingColor = status === "online" 
    ? "from-fitverse-blue to-green-500" 
    : status === "workout" 
      ? "from-fitverse-pink to-fitverse-purple" 
      : "from-gray-500 to-gray-700";

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        {/* Base plate reflection */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-fitverse-blue blur-sm rounded-full opacity-70"></div>
        
        {/* Avatar container with animated glow */}
        <div className="relative w-full h-full">
          {/* Holographic border ring */}
          <div 
            className={cn(
              "absolute -inset-1 rounded-full animate-pulse-glow",
              status !== "offline" ? "opacity-100" : "opacity-30"
            )}
            style={{ 
              '--pulse-color': status === 'online' 
                ? 'rgba(76, 201, 240, 0.6)' 
                : status === 'workout' 
                  ? 'rgba(247, 37, 133, 0.6)' 
                  : 'rgba(107, 114, 128, 0.3)'
            } as React.CSSProperties}
          ></div>
          
          {/* Holographic ring */}
          <div 
            className={cn(
              "absolute -inset-1 rounded-full bg-gradient-to-r",
              baseRingColor,
              status !== "offline" ? "opacity-70" : "opacity-30"
            )}
          ></div>
          
          {/* Avatar image */}
          <div className="absolute inset-0 rounded-full overflow-hidden backdrop-blur-sm">
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Holographic overlay effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-white/10 opacity-50"></div>
          
          {/* Status indicator */}
          <div className={cn(
            "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-fitverse-dark",
            statusColor[status]
          )}></div>
        </div>
      </div>
      
      {/* Name with holographic effect */}
      <div className="mt-2 text-center">
        <p className="text-sm text-white">{name}</p>
        {status === "workout" && (
          <span className="text-xs text-fitverse-pink">Working out</span>
        )}
      </div>
    </div>
  );
};

export default AvatarHologram;
