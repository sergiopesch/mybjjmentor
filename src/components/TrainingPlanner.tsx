
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
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
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  Clock, 
  Save, 
  Plus, 
  Trash2, 
  Award, 
  BarChart3, 
  Calendar, 
  DumbBell 
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
const focusAreas = ['Guard Passing', 'Submissions', 'Escapes', 'Takedowns', 'Positional Control'];
const trainingTypes = ['Drilling', 'Sparring', 'Technique Study', 'Strength & Conditioning'];

interface SessionItem {
  id: string;
  name: string;
  duration: number;
  type: string;
}

const exampleSessions = [
  {
    title: 'Beginner Guard Fundamentals',
    focus: 'Guard Passing',
    level: 'Beginner',
    duration: 60,
    days: 3,
    items: [
      { id: '1', name: 'Warm-up', duration: 10, type: 'Drilling' },
      { id: '2', name: 'Closed Guard Basics', duration: 20, type: 'Technique Study' },
      { id: '3', name: 'Guard Retention Drills', duration: 15, type: 'Drilling' },
      { id: '4', name: 'Positional Sparring', duration: 15, type: 'Sparring' },
    ],
  },
  {
    title: 'Intermediate Submission Focus',
    focus: 'Submissions',
    level: 'Intermediate',
    duration: 90,
    days: 4,
    items: [
      { id: '1', name: 'Dynamic Warm-up', duration: 10, type: 'Drilling' },
      { id: '2', name: 'Submission Chain Drills', duration: 25, type: 'Drilling' },
      { id: '3', name: 'Technical Sparring', duration: 30, type: 'Sparring' },
      { id: '4', name: 'Submission Analysis', duration: 15, type: 'Technique Study' },
      { id: '5', name: 'Cool Down & Stretching', duration: 10, type: 'Drilling' },
    ],
  },
];

export const TrainingPlanner = () => {
  const { toast } = useToast();

  const [plan, setPlan] = useState({
    title: '',
    level: 'Beginner',
    focus: 'Guard Passing',
    daysPerWeek: 3,
    sessionDuration: 60,
  });

  const [customPlan, setCustomPlan] = useState<{
    items: SessionItem[];
  }>({
    items: [],
  });

  const [selectedTemplate, setSelectedTemplate] = useState('');

  const addSessionItem = () => {
    const newItem = {
      id: Math.random().toString(36).substring(2, 9),
      name: '',
      duration: 10,
      type: 'Drilling',
    };
    
    setCustomPlan(prev => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  const updateSessionItem = (id: string, field: keyof SessionItem, value: any) => {
    setCustomPlan(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const removeSessionItem = (id: string) => {
    setCustomPlan(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id),
    }));
  };

  const totalDuration = customPlan.items.reduce(
    (total, item) => total + item.duration, 
    0
  );

  const handleSavePlan = () => {
    // Here you would typically save the plan to your state or backend
    toast({
      title: "Training Plan Saved",
      description: `Your ${plan.title || "training plan"} has been saved successfully.`,
    });
  };

  const applyTemplate = (index: number) => {
    const template = exampleSessions[index];
    
    setPlan({
      ...plan,
      title: template.title,
      level: template.level,
      focus: template.focus,
      daysPerWeek: template.days,
      sessionDuration: template.duration,
    });
    
    setCustomPlan({
      items: [...template.items],
    });
    
    setSelectedTemplate('');
  };

  return (
    <section className="py-12">
      <div className="container max-w-6xl px-4 mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Training Planner</h2>
          <p className="text-muted-foreground">
            Create a customized BJJ training plan based on your skill level and goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
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

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5 text-bjj-blue" />
                  Template Plans
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Use one of our pre-built templates to get started quickly.
                </p>
                
                <div className="space-y-2">
                  <Select 
                    value={selectedTemplate} 
                    onValueChange={(value) => {
                      setSelectedTemplate(value);
                      if (value) {
                        applyTemplate(parseInt(value));
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      {exampleSessions.map((session, index) => (
                        <SelectItem key={index} value={index.toString()}>
                          {session.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  {exampleSessions.map((session, index) => (
                    <AccordionItem key={index} value={`plan-${index}`}>
                      <AccordionTrigger>
                        <div className="flex items-center text-left">
                          <span>{session.title}</span>
                          <Badge variant="outline" className="ml-2">
                            {session.level}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 py-2">
                          <div className="flex justify-between text-sm">
                            <span>Focus: {session.focus}</span>
                            <span>{session.duration} min · {session.days}x/week</span>
                          </div>
                          <ul className="space-y-2">
                            {session.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="text-sm flex justify-between">
                                <span>{item.name}</span>
                                <span className="text-muted-foreground">{item.duration} min</span>
                              </li>
                            ))}
                          </ul>
                          <Button 
                            size="sm" 
                            className="w-full mt-2"
                            onClick={() => applyTemplate(index)}
                          >
                            Apply Template
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center">
                  <DumbBell className="mr-2 h-5 w-5 text-bjj-blue" />
                  Session Breakdown
                </CardTitle>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Total: {totalDuration} / {plan.sessionDuration} minutes
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
                        <div key={item.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-end pb-4 border-b">
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
                      ))}
                    </div>
                    
                    <div className="flex justify-between pt-2">
                      <Button variant="outline" onClick={addSessionItem}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Element
                      </Button>
                      
                      <div className="flex items-center">
                        {totalDuration > plan.sessionDuration && (
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

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-bjj-blue" />
                  Training Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                {customPlan.items.length === 0 ? (
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
                      
                      {(() => {
                        // Calculate percentages for training types
                        const typeStats = trainingTypes.map(type => {
                          const minutes = customPlan.items
                            .filter(item => item.type === type)
                            .reduce((sum, item) => sum + item.duration, 0);
                          
                          const percentage = totalDuration > 0 
                            ? Math.round((minutes / totalDuration) * 100) 
                            : 0;
                            
                          return { type, minutes, percentage };
                        }).filter(stat => stat.minutes > 0);
                        
                        return (
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
                        );
                      })()}
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
          </div>
        </div>
      </div>
    </section>
  );
};
