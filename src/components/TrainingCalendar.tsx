
import React, { useState } from 'react';
import { format, startOfToday, eachDayOfInterval, endOfMonth, startOfMonth, getDay, add, parse, isToday, isSameDay, isEqual, parseISO } from 'date-fns';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Dumbbell, 
  Clock, 
  Save, 
  Trash2,
  CalendarCheck,
  Calendar,
  MoreVertical,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FeatureCard } from '@/components/FeatureCard';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Types
interface TrainingSession {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  focus: string;
  level: string;
  items: TrainingItem[];
  completed: boolean;
}

interface TrainingItem {
  id: string;
  name: string;
  duration: number;
  type: string;
}

// Constants
const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
const focusAreas = ['Guard Passing', 'Submissions', 'Escapes', 'Takedowns', 'Positional Control'];
const trainingTypes = ['Drilling', 'Sparring', 'Technique Study', 'Strength & Conditioning'];

// Sample data
const initialSessions: TrainingSession[] = [
  {
    id: '1',
    title: 'Guard Passing Fundamentals',
    date: '2023-06-15',
    time: '18:00',
    duration: 60,
    type: 'Regular Training',
    focus: 'Guard Passing',
    level: 'Beginner',
    completed: false,
    items: [
      { id: '1-1', name: 'Warm-up', duration: 10, type: 'Drilling' },
      { id: '1-2', name: 'Guard Passing Drills', duration: 25, type: 'Drilling' },
      { id: '1-3', name: 'Positional Sparring', duration: 15, type: 'Sparring' },
      { id: '1-4', name: 'Cool Down', duration: 10, type: 'Drilling' }
    ]
  },
  {
    id: '2',
    title: 'Advanced Submission Chains',
    date: '2023-06-18',
    time: '10:00',
    duration: 90,
    type: 'Technical Session',
    focus: 'Submissions',
    level: 'Advanced',
    completed: true,
    items: [
      { id: '2-1', name: 'Dynamic Warm-up', duration: 15, type: 'Drilling' },
      { id: '2-2', name: 'Submission Chain Study', duration: 30, type: 'Technique Study' },
      { id: '2-3', name: 'Application Sparring', duration: 30, type: 'Sparring' },
      { id: '2-4', name: 'Review & Cool Down', duration: 15, type: 'Technique Study' }
    ]
  }
];

export const TrainingCalendar = () => {
  const { toast } = useToast();
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
  const [sessions, setSessions] = useState<TrainingSession[]>(initialSessions);
  const [selectedSession, setSelectedSession] = useState<TrainingSession | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'agenda'>('month');
  
  // First day of the current month
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());
  
  // Days of the current month
  const days = eachDayOfInterval({
    start: startOfMonth(firstDayCurrentMonth),
    end: endOfMonth(firstDayCurrentMonth)
  });
  
  function previousMonth() {
    const firstDayPreviousMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayPreviousMonth, 'MMM-yyyy'));
  }
  
  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }
  
  // Get sessions for the selected day
  const selectedDaySessions = sessions.filter(session => 
    isSameDay(parseISO(session.date), selectedDay)
  );
  
  // Handle adding a new session
  const handleAddSession = (newSession: TrainingSession) => {
    setSessions(prev => [...prev, newSession]);
    setIsAddModalOpen(false);
    toast({
      title: "Session Added",
      description: `Your "${newSession.title}" session has been added to your calendar.`,
    });
  };
  
  // Handle updating an existing session
  const handleUpdateSession = (updatedSession: TrainingSession) => {
    setSessions(prev => prev.map(session => 
      session.id === updatedSession.id ? updatedSession : session
    ));
    setSelectedSession(null);
    toast({
      title: "Session Updated",
      description: `Your "${updatedSession.title}" session has been updated.`,
    });
  };
  
  // Handle deleting a session
  const handleDeleteSession = (id: string) => {
    setSessions(prev => prev.filter(session => session.id !== id));
    setSelectedSession(null);
    toast({
      title: "Session Deleted",
      description: "The training session has been removed from your calendar.",
    });
  };
  
  // Handle marking a session as complete
  const handleCompleteSession = (id: string) => {
    setSessions(prev => prev.map(session => 
      session.id === id ? { ...session, completed: !session.completed } : session
    ));
    toast({
      title: "Session Marked",
      description: "Your training session status has been updated.",
    });
  };
  
  return (
    <div className="pb-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-9">
          <Card className="shadow-md border-0">
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center">
                  <h2 className="text-xl font-bold">
                    {format(firstDayCurrentMonth, 'MMMM yyyy')}
                  </h2>
                  <div className="ml-4 flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={previousMonth}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={nextMonth}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-2 sm:mt-0 flex space-x-2">
                  <Button 
                    size="sm"
                    onClick={() => setSelectedDay(today)}
                    variant="outline"
                  >
                    Today
                  </Button>
                  <Tabs 
                    defaultValue="month" 
                    className="w-[300px]"
                    onValueChange={(value) => setViewMode(value as 'month' | 'week' | 'agenda')}
                  >
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="month">Month</TabsTrigger>
                      <TabsTrigger value="week">Week</TabsTrigger>
                      <TabsTrigger value="agenda">Agenda</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-px text-center text-sm leading-6 text-muted-foreground">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
              </div>
              <div className="mt-2 grid grid-cols-7 gap-px bg-muted rounded-md overflow-hidden">
                {days.map((day, dayIdx) => {
                  const daySessions = sessions.filter(session => 
                    isSameDay(parseISO(session.date), day)
                  );
                  
                  const firstDayOfMonth = dayIdx === 0;
                  const dayOffset = firstDayOfMonth ? getDay(day) : 0;
                  
                  return (
                    <React.Fragment key={day.toString()}>
                      {firstDayOfMonth && dayOffset > 0 && (
                        <div 
                          className="bg-background"
                          style={{ gridColumnStart: 1, gridColumnEnd: dayOffset + 1 }}
                        />
                      )}
                      <div
                        className={cn(
                          "h-36 p-1 bg-background relative flex flex-col",
                          isToday(day) && "bg-accent/50",
                          isEqual(day, selectedDay) && "ring-2 ring-primary",
                          "hover:bg-accent cursor-pointer"
                        )}
                        onClick={() => setSelectedDay(day)}
                      >
                        <time
                          dateTime={format(day, 'yyyy-MM-dd')}
                          className={cn(
                            "ml-auto mr-1 mt-1 flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium",
                            isToday(day) && "bg-primary text-white",
                            !isToday(day) && isEqual(day, selectedDay) && "text-primary font-bold"
                          )}
                        >
                          {format(day, 'd')}
                        </time>
                        <div className="flex-1 overflow-y-auto text-xs space-y-1 mt-1">
                          {daySessions.length > 0 ? (
                            daySessions.map((session) => (
                              <button
                                key={session.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedSession(session);
                                }}
                                className={cn(
                                  "block w-full text-left px-2 py-1 rounded-md overflow-hidden",
                                  session.completed ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800",
                                  "hover:opacity-80 transition-opacity"
                                )}
                              >
                                <div className="flex items-center">
                                  <div className="flex-1 truncate">{session.title}</div>
                                  <time className="ml-1">{session.time.slice(0, 5)}</time>
                                </div>
                              </button>
                            ))
                          ) : (
                            <div className="text-center text-muted-foreground h-full flex items-center justify-center opacity-50">
                              <div className="w-full">
                                <Plus className="w-4 h-4 mx-auto" />
                                <span className="text-[10px]">Add session</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setIsAddModalOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Training Session
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                {sessions.length} training sessions scheduled
              </div>
            </CardFooter>
          </Card>
        </div>
        
        <div className="md:col-span-3">
          <Card className="shadow-md border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarCheck className="mr-2 h-5 w-5 text-bjj-blue" />
                {format(selectedDay, 'MMMM d, yyyy')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDaySessions.length > 0 ? (
                <div className="space-y-4">
                  {selectedDaySessions.map((session) => (
                    <div 
                      key={session.id} 
                      className={cn(
                        "p-3 rounded-lg border",
                        session.completed ? "bg-green-50 border-green-200" : "bg-card"
                      )}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{session.title}</h3>
                        <div className="flex space-x-1">
                          <Button 
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7"
                            onClick={() => handleCompleteSession(session.id)}
                          >
                            <div className={cn(
                              "size-4 rounded-full border",
                              session.completed ? "bg-green-500 border-green-600" : "border-muted-foreground"
                            )}>
                              {session.completed && <Check className="size-3 text-white" />}
                            </div>
                          </Button>
                          <Button 
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7"
                            onClick={() => setSelectedSession(session)}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground space-x-3 mb-2">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          <span>{session.time} • {session.duration} min</span>
                        </div>
                        <div className="flex items-center">
                          <Dumbbell className="mr-1 h-3 w-3" />
                          <span>{session.focus}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {session.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <Calendar className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                  <p className="text-sm text-muted-foreground mb-4">
                    No training sessions scheduled for this day
                  </p>
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={() => setIsAddModalOpen(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Session
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="shadow-md border-0 mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5 text-bjj-blue" />
                Jump to Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(selectedDay, 'PPP')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDay}
                    onSelect={(date) => date && setSelectedDay(date)}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>
          
          {/* Smart Suggestions Card */}
          <FeatureCard
            title="Training Insights"
            description="Your training schedule shows a focus on submissions. Consider adding more guard passing sessions to balance your skills."
            icon={Dumbbell}
            className="mt-6"
          />
        </div>
      </div>
      
      {/* Add/Edit Training Session Dialog */}
      <Dialog 
        open={isAddModalOpen || !!selectedSession}
        onOpenChange={(open) => {
          if (!open) {
            setIsAddModalOpen(false);
            setSelectedSession(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedSession ? "Edit Training Session" : "Add Training Session"}
            </DialogTitle>
            <DialogDescription>
              {selectedSession 
                ? "Update your training session details" 
                : "Schedule a new training session to your calendar"}
            </DialogDescription>
          </DialogHeader>
          
          <SessionForm 
            initialData={selectedSession}
            selectedDate={selectedDay}
            onSubmit={selectedSession ? handleUpdateSession : handleAddSession}
            onDelete={selectedSession ? () => handleDeleteSession(selectedSession.id) : undefined}
          />
        </DialogContent>
      </Dialog>
      
      {/* View Session Sheet */}
      <Sheet open={!!selectedSession && !isAddModalOpen} onOpenChange={(open) => !open && setSelectedSession(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{selectedSession?.title}</SheetTitle>
            <SheetDescription>
              Training session details
            </SheetDescription>
          </SheetHeader>
          
          {selectedSession && (
            <div className="py-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Date & Time</div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(parseISO(selectedSession.date), 'PPP')} at {selectedSession.time}
                    </div>
                  </div>
                  <Badge variant={selectedSession.completed ? "success" : "secondary"}>
                    {selectedSession.completed ? "Completed" : "Upcoming"}
                  </Badge>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm font-medium">Session Details</div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4" />
                      {selectedSession.duration} minutes
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Dumbbell className="mr-2 h-4 w-4" />
                      {selectedSession.focus}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium">Training Schedule</div>
                  <div className="border rounded-md divide-y">
                    {selectedSession.items.map((item) => (
                      <div key={item.id} className="p-3 flex justify-between">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-muted-foreground">{item.type}</div>
                        </div>
                        <div className="text-sm text-muted-foreground">{item.duration} min</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-8">
                <Button
                  variant="default"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setIsAddModalOpen(true);
                  }}
                >
                  Edit Session
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleCompleteSession(selectedSession.id)}
                >
                  {selectedSession.completed ? "Mark Incomplete" : "Mark Complete"}
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

interface SessionFormProps {
  initialData: TrainingSession | null;
  selectedDate: Date;
  onSubmit: (data: TrainingSession) => void;
  onDelete?: () => void;
}

// Session Form Component
const SessionForm = ({ initialData, selectedDate, onSubmit, onDelete }: SessionFormProps) => {
  const [items, setItems] = useState<TrainingItem[]>(
    initialData?.items || []
  );
  
  // Form state
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    date: initialData?.date || format(selectedDate, 'yyyy-MM-dd'),
    time: initialData?.time || '09:00',
    duration: initialData?.duration || 60,
    type: initialData?.type || 'Regular Training',
    focus: initialData?.focus || 'Guard Passing',
    level: initialData?.level || 'Beginner',
  });
  
  // Handle form data change
  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  // Handle adding new training item
  const addItem = () => {
    const newItem: TrainingItem = {
      id: Math.random().toString(36).substring(2, 9),
      name: '',
      duration: 10,
      type: 'Drilling',
    };
    setItems(prev => [...prev, newItem]);
  };
  
  // Handle updating an item
  const updateItem = (id: string, field: keyof TrainingItem, value: any) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };
  
  // Handle removing an item
  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };
  
  // Calculate total duration of all items
  const totalItemsDuration = items.reduce((total, item) => total + item.duration, 0);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newSession: TrainingSession = {
      id: initialData?.id || Math.random().toString(36).substring(2, 9),
      ...formData,
      items,
      completed: initialData?.completed || false,
    };
    
    onSubmit(newSession);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Session Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="e.g., Guard Passing Fundamentals"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="level">Skill Level</Label>
            <Select
              value={formData.level}
              onValueChange={(value) => handleChange('level', value)}
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
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={(e) => handleChange('time', e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="focus">Primary Focus</Label>
            <Select
              value={formData.focus}
              onValueChange={(value) => handleChange('focus', value)}
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
            <Label htmlFor="type">Session Type</Label>
            <Input
              id="type"
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              placeholder="e.g., Regular Training"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <Label>Session Duration: {formData.duration} minutes</Label>
            <span className="text-xs text-muted-foreground">
              Activities: {totalItemsDuration} / {formData.duration} min
            </span>
          </div>
          <Slider
            value={[formData.duration]}
            min={30}
            max={180}
            step={15}
            onValueChange={(value) => handleChange('duration', value[0])}
          />
        </div>
        
        <div className="space-y-3 mt-2">
          <div className="flex justify-between items-center">
            <Label>Training Activities</Label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={addItem}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Activity
            </Button>
          </div>
          
          {items.length === 0 ? (
            <div className="text-center p-4 border rounded-md bg-muted/20">
              <p className="text-sm text-muted-foreground">
                No activities added yet. Add some to plan your session.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-end pb-3 border-b">
                  <div className="w-full sm:w-2/5">
                    <Label htmlFor={`name-${item.id}`}>Activity</Label>
                    <Input
                      id={`name-${item.id}`}
                      value={item.name}
                      placeholder="e.g., Guard Passing Drills"
                      onChange={(e) => updateItem(item.id, 'name', e.target.value)}
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
                      onChange={(e) => updateItem(item.id, 'duration', parseInt(e.target.value) || 5)}
                    />
                  </div>
                  
                  <div className="w-full sm:w-2/5">
                    <Label htmlFor={`type-${item.id}`}>Type</Label>
                    <Select
                      value={item.type}
                      onValueChange={(value) => updateItem(item.id, 'type', value)}
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
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              {totalItemsDuration > formData.duration && (
                <p className="text-sm text-destructive">
                  Total activity time exceeds the session duration
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      
      <DialogFooter>
        {onDelete && (
          <Button 
            type="button"
            variant="destructive"
            onClick={onDelete}
            className="mr-auto"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        )}
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit">
          <Save className="mr-2 h-4 w-4" />
          {initialData ? 'Update' : 'Create'} Session
        </Button>
      </DialogFooter>
    </form>
  );
};

function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
