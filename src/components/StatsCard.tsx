
import React from "react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  gradientColor?: "blue" | "purple" | "pink";
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  trend,
  className,
  gradientColor = "blue"
}) => {
  const gradientClasses = {
    blue: "from-fitverse-blue/20 to-fitverse-blue/5",
    purple: "from-fitverse-purple/20 to-fitverse-purple/5",
    pink: "from-fitverse-pink/20 to-fitverse-pink/5"
  };

  const shadowClasses = {
    blue: "shadow-neon-blue",
    purple: "shadow-neon-purple",
    pink: "shadow-neon-pink"
  };

  return (
    <div 
      className={cn(
        "glass-card p-4 overflow-hidden",
        `bg-gradient-to-br ${gradientClasses[gradientColor]}`,
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm text-gray-400 mb-1">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
          
          {trend && (
            <div className="flex items-center mt-1">
              <span 
                className={cn(
                  "text-xs font-medium",
                  trend.isPositive ? "text-green-400" : "text-fitverse-pink"
                )}
              >
                {trend.isPositive ? "+" : "-"}{trend.value}%
              </span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className={cn("p-2 rounded-full", shadowClasses[gradientColor])}>
            {icon}
          </div>
        )}
      </div>
      
      <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-3xl opacity-20 bg-gradient-to-r from-fitverse-blue to-fitverse-purple" />
    </div>
  );
};

export default StatsCard;
