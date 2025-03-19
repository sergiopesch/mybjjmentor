
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const trainingTypes = ['Drilling', 'Sparring', 'Technique Study', 'Strength & Conditioning'];

interface SessionItemProps {
  item: {
    id: string;
    name: string;
    duration: number;
    type: string;
  };
  updateSessionItem: (id: string, field: string, value: any) => void;
  removeSessionItem: (id: string) => void;
}

export const SessionItemComponent = ({ 
  item, 
  updateSessionItem, 
  removeSessionItem 
}: SessionItemProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end pb-4 border-b">
      <div className="w-full sm:w-2/5">
        <Label htmlFor={`name-${item.id}`}>Activity</Label>
        <Input
          id={`name-${item.id}`}
          value={item.name}
          placeholder="e.g., Guard Passing Drills"
          onChange={(e) => updateSessionItem(item.id, 'name', e.target.value)}
        />
      </div>
      
      <div className="w-full sm:w-1/5">
        <Label htmlFor={`duration-${item.id}`}>Minutes</Label>
        <Input
          id={`duration-${item.id}`}
          type="number"
          min="5"
          max="60"
          step="5"
          value={item.duration}
          onChange={(e) => updateSessionItem(item.id, 'duration', parseInt(e.target.value) || 5)}
        />
      </div>
      
      <div className="w-full sm:w-2/5">
        <Label htmlFor={`type-${item.id}`}>Type</Label>
        <Select
          value={item.type}
          onValueChange={(value) => updateSessionItem(item.id, 'type', value)}
        >
          <SelectTrigger id={`type-${item.id}`}>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {trainingTypes.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => removeSessionItem(item.id)}
        className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
