
import React, { useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis,
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { cn } from "@/lib/utils";

// Define the data structure for a single data point in health metrics
interface HealthDataPoint {
  date: string;
  heartRate?: number;
  systolic?: number;
  diastolic?: number;
  hydration?: number;
  sleep?: number;
}

// Original interface for simple charts
interface ProgressChartProps {
  title: string;
  data: Array<{ name: string; value: number }>;
  color?: string;
  unit?: string;
  className?: string;
}

// New interface for health metrics chart
interface HealthProgressChartProps {
  data: HealthDataPoint[];
  className?: string;
}

// Combined type for the component to accept either format
type CombinedProgressChartProps = ProgressChartProps | HealthProgressChartProps;

// Function to determine if the data is health data
const isHealthData = (data: any[]): data is HealthDataPoint[] => {
  return data.length > 0 && 'date' in data[0];
};

const ProgressChart: React.FC<CombinedProgressChartProps> = (props) => {
  // For health data visualization, we need to track which metric to show
  const [activeMetric, setActiveMetric] = useState<string>("heartRate");
  
  // If we have health data
  if (isHealthData(props.data)) {
    const healthData = props.data;
    
    // Colors for different metrics
    const metricColors = {
      heartRate: "#FF5757", // Red for heart rate
      systolic: "#4CC9F0", // Blue for blood pressure
      diastolic: "#7B61FF", // Purple for blood pressure
      hydration: "#36A2EB", // Light blue for hydration
      sleep: "#8A2BE2"      // Dark purple for sleep
    };
    
    // Labels for the metrics
    const metricLabels = {
      heartRate: "Heart Rate (bpm)",
      systolic: "Systolic (mmHg)",
      diastolic: "Diastolic (mmHg)",
      hydration: "Hydration (%)",
      sleep: "Sleep (hrs)"
    };
    
    const handleMetricChange = (metric: string) => {
      setActiveMetric(metric);
    };
    
    return (
      <div className={cn("h-full w-full", props.className)}>
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(metricLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => handleMetricChange(key)}
              className={cn(
                "px-3 py-1 text-xs rounded-full transition-colors",
                activeMetric === key 
                  ? `bg-${metricColors[key as keyof typeof metricColors]}/20 text-white` 
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              )}
              style={{
                backgroundColor: activeMetric === key 
                  ? `${metricColors[key as keyof typeof metricColors]}20` 
                  : undefined
              }}
            >
              {label}
            </button>
          ))}
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={healthData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <defs>
                <linearGradient id={`color${activeMetric}`} x1="0" y1="0" x2="0" y2="1">
                  <stop 
                    offset="5%" 
                    stopColor={metricColors[activeMetric as keyof typeof metricColors]} 
                    stopOpacity={0.8} 
                  />
                  <stop 
                    offset="95%" 
                    stopColor={metricColors[activeMetric as keyof typeof metricColors]} 
                    stopOpacity={0} 
                  />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
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
              />
              <Line
                type="monotone"
                dataKey={activeMetric}
                stroke={metricColors[activeMetric as keyof typeof metricColors]}
                strokeWidth={2}
                dot={{ r: 4, fill: metricColors[activeMetric as keyof typeof metricColors], strokeWidth: 0 }}
                activeDot={{ r: 6, fill: metricColors[activeMetric as keyof typeof metricColors], strokeWidth: 2, stroke: "#111827" }}
                fillOpacity={1}
                fill={`url(#color${activeMetric})`}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
  
  // Original simple chart implementation
  const { title, data, color = "#4CC9F0", unit = "", className } = props as ProgressChartProps;
  
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
