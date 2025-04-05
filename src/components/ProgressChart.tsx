
import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis,

  Tooltip, 
  ResponsiveContainer
} from "recharts";
import { cn } from "@/lib/utils";

interface ProgressChartProps {
  title: string;
  data: Array<{ name: string; value: number }>;
  color?: string;
  unit?: string;
  className?: string;
}

const ProgressChart: React.FC<ProgressChartProps> = ({
  title,
  data,
  color = "#4CC9F0",
  unit = "",
  className
}) => {
  return (
    <div className={cn("glass-card p-4", className)}>
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              tick={{ fill: "#94A3B8" }}
              axisLine={{ stroke: "#334155" }}
              tickLine={{ stroke: "#334155" }}
            />
            <YAxis 
              tick={{ fill: "#94A3B8" }}
              axisLine={{ stroke: "#334155" }}
              tickLine={{ stroke: "#334155" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.8)",
                borderColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                color: "#F8FAFC"
              }}
              labelStyle={{ color: "#F8FAFC" }}
              formatter={(value: number) => [`${value}${unit}`, ""]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={{ r: 4, fill: color, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: color, strokeWidth: 2, stroke: "#111827" }}
              fillOpacity={1}
              fill="url(#colorGradient)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressChart;
