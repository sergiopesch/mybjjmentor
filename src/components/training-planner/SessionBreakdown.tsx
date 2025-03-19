
import React from 'react';
import { Dumbbell, Clock, Plus, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SessionItemComponent } from './SessionItem';

interface SessionItem {
  id: string;
  name: string;
  duration: number;
  type: string;
}

interface SessionBreakdownProps {
  customPlan: {
    items: SessionItem[];
  };
  addSessionItem: () => void;
  updateSessionItem: (id: string, field: keyof SessionItem, value: any) => void;
  removeSessionItem: (id: string) => void;
  totalDuration: number;
  planDuration: number;
  handleSavePlan: () => void;
}

export const SessionBreakdown = ({
  customPlan,
  addSessionItem,
  updateSessionItem,
  removeSessionItem,
  totalDuration,
  planDuration,
  handleSavePlan
}: SessionBreakdownProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <Dumbbell className="mr-2 h-5 w-5 text-bjj-blue" />
          Session Breakdown
        </CardTitle>
        <div className="flex items-center">
          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Total: {totalDuration} / {planDuration} minutes
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {customPlan.items.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No training elements added yet</p>
            <Button onClick={addSessionItem}>
              <Plus className="mr-2 h-4 w-4" />
              Add Training Element
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {customPlan.items.map((item) => (
                <SessionItemComponent
                  key={item.id}
                  item={item}
                  updateSessionItem={updateSessionItem}
                  removeSessionItem={removeSessionItem}
                />
              ))}
            </div>
            
            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={addSessionItem}>
                <Plus className="mr-2 h-4 w-4" />
                Add Element
              </Button>
              
              <div className="flex items-center">
                {totalDuration > planDuration && (
                  <p className="text-sm text-destructive mr-4">
                    Duration exceeds planned session time
                  </p>
                )}
                <Button onClick={handleSavePlan}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Plan
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
