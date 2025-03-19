
import React from 'react';
import { BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface SessionItem {
  id: string;
  name: string;
  duration: number;
  type: string;
}

interface TrainingDistributionProps {
  items: SessionItem[];
  totalDuration: number;
}

const trainingTypes = ['Drilling', 'Sparring', 'Technique Study', 'Strength & Conditioning'];

export const TrainingDistribution = ({ items, totalDuration }: TrainingDistributionProps) => {
  // Calculate percentages for training types
  const typeStats = trainingTypes.map(type => {
    const minutes = items
      .filter(item => item.type === type)
      .reduce((sum, item) => sum + item.duration, 0);
    
    const percentage = totalDuration > 0 
      ? Math.round((minutes / totalDuration) * 100) 
      : 0;
      
    return { type, minutes, percentage };
  }).filter(stat => stat.minutes > 0);

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="mr-2 h-5 w-5 text-bjj-blue" />
          Training Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            Add training elements to see your distribution
          </p>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Training Type Distribution</span>
                <span>{totalDuration} minutes total</span>
              </div>
              
              <div className="space-y-3">
                {typeStats.map(stat => (
                  <div key={stat.type} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{stat.type}</span>
                      <span>{stat.minutes} min ({stat.percentage}%)</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-bjj-blue h-full rounded-full"
                        style={{ width: `${stat.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="recurring" />
                  <Label htmlFor="recurring">Make recurring</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="reminder" />
                  <Label htmlFor="reminder">Set reminders</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="track" />
                  <Label htmlFor="track">Track progress</Label>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
