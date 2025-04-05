
import React, { useState } from "react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface HealthMetricsFormProps {
  onSubmit: (data: HealthMetrics) => void;
  initialData?: Partial<HealthMetrics>;
}

export interface HealthMetrics {
  heartRate: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  hydration: number; // percentage
  sleepHours: number;
  weight: number; // in kg
  height: number; // in cm
  age: number;
}

const HealthMetricsForm: React.FC<HealthMetricsFormProps> = ({ onSubmit, initialData = {} }) => {
  const { isAuthenticated } = useAuth();
  const form = useForm<HealthMetrics>({
    defaultValues: {
      heartRate: initialData.heartRate || 70,
      bloodPressureSystolic: initialData.bloodPressureSystolic || 120,
      bloodPressureDiastolic: initialData.bloodPressureDiastolic || 80,
      hydration: initialData.hydration || 70,
      sleepHours: initialData.sleepHours || 7,
      weight: initialData.weight || 70,
      height: initialData.height || 170,
      age: initialData.age || 30,
    }
  });

  const handleSubmit = (data: HealthMetrics) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save your health metrics",
        variant: "destructive"
      });
      return;
    }
    
    onSubmit(data);
    toast({
      title: "Health Metrics Updated",
      description: "Your health metrics have been saved successfully.",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="heartRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Heart Rate (bpm)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                </FormControl>
                <FormDescription>Your resting heart rate in beats per minute</FormDescription>
              </FormItem>
            )}
          />
          
          <div className="space-y-4">
            <FormLabel>Blood Pressure (mmHg)</FormLabel>
            <div className="flex space-x-2">
              <FormField
                control={form.control}
                name="bloodPressureSystolic"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} placeholder="Systolic" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bloodPressureDiastolic"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} placeholder="Diastolic" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormDescription>Your blood pressure (systolic/diastolic)</FormDescription>
          </div>
          
          <FormField
            control={form.control}
            name="hydration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hydration (%)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" max="100" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                </FormControl>
                <FormDescription>Your estimated hydration level</FormDescription>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="sleepHours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sleep (hours)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" max="24" step="0.5" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                </FormControl>
                <FormDescription>Hours of sleep per night</FormDescription>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight (kg)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height (cm)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input type="number" min="0" max="120" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        <Button type="submit" className="w-full md:w-auto bg-fitverse-blue hover:bg-fitverse-blue/90">
          Save Health Metrics
        </Button>
      </form>
    </Form>
  );
};

export default HealthMetricsForm;
