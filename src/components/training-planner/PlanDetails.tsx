
import React from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
const focusAreas = ['Guard Passing', 'Submissions', 'Escapes', 'Takedowns', 'Positional Control'];

interface PlanDetailsProps {
  plan: {
    title: string;
    level: string;
    focus: string;
    daysPerWeek: number;
    sessionDuration: number;
  };
  setPlan: React.Dispatch<React.SetStateAction<{
    title: string;
    level: string;
    focus: string;
    daysPerWeek: number;
    sessionDuration: number;
  }>>;
}

export const PlanDetails = ({ plan, setPlan }: PlanDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-bjj-blue" />
          Plan Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Plan Title</Label>
          <Input 
            id="title" 
            placeholder="My Training Plan"
            value={plan.title}
            onChange={(e) => setPlan({ ...plan, title: e.target.value })}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="level">Skill Level</Label>
          <Select 
            value={plan.level} 
            onValueChange={(value) => setPlan({ ...plan, level: value })}
          >
            <SelectTrigger id="level">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              {skillLevels.map(level => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="focus">Primary Focus</Label>
          <Select 
            value={plan.focus} 
            onValueChange={(value) => setPlan({ ...plan, focus: value })}
          >
            <SelectTrigger id="focus">
              <SelectValue placeholder="Select focus area" />
            </SelectTrigger>
            <SelectContent>
              {focusAreas.map(area => (
                <SelectItem key={area} value={area}>{area}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Training Days Per Week: {plan.daysPerWeek}</Label>
          <Slider
            value={[plan.daysPerWeek]}
            min={1}
            max={7}
            step={1}
            onValueChange={(value) => setPlan({ ...plan, daysPerWeek: value[0] })}
          />
        </div>

        <div className="space-y-2">
          <Label>Session Duration: {plan.sessionDuration} minutes</Label>
          <Slider
            value={[plan.sessionDuration]}
            min={30}
            max={180}
            step={15}
            onValueChange={(value) => setPlan({ ...plan, sessionDuration: value[0] })}
          />
        </div>
      </CardContent>
    </Card>
  );
};
