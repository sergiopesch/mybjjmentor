
import React, { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Dumbbell, 
  HeartPulse, 
  StretchHorizontal, 
  Activity, 
  Bed,
  Calendar,
  CheckCircle,
  Clock,
  Plus,
  Repeat,
  Timer,
  Clipboard,
  CheckCircle2,
  X
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const strengthWorkouts = [
  {
    id: 1,
    title: "BJJ Strength Foundations",
    description: "Basic strength workout focused on BJJ-specific movements",
    duration: 45,
    difficulty: "Beginner",
    exercises: [
      { name: "Pull-ups", sets: 3, reps: "8-10", rest: "90 sec" },
      { name: "Push-ups", sets: 3, reps: "15-20", rest: "60 sec" },
      { name: "Bodyweight Squats", sets: 3, reps: "20", rest: "60 sec" },
      { name: "Farmer's Carries", sets: 3, reps: "30 sec", rest: "60 sec" },
      { name: "Plank", sets: 3, reps: "45 sec", rest: "45 sec" }
    ]
  },
  {
    id: 2,
    title: "Grip & Core Power",
    description: "Focus on developing grip strength and core stability",
    duration: 50,
    difficulty: "Intermediate",
    exercises: [
      { name: "Dead Hangs", sets: 4, reps: "30-45 sec", rest: "60 sec" },
      { name: "Towel Pull-ups", sets: 3, reps: "6-8", rest: "90 sec" },
      { name: "Hollow Body Hold", sets: 3, reps: "30 sec", rest: "60 sec" },
      { name: "Russian Twists", sets: 3, reps: "20 each side", rest: "60 sec" },
      { name: "Farmer's Walks", sets: 3, reps: "40 sec", rest: "60 sec" }
    ]
  },
  {
    id: 3,
    title: "Explosive Power",
    description: "Develop power for takedowns and sweeps",
    duration: 55,
    difficulty: "Advanced",
    exercises: [
      { name: "Box Jumps", sets: 4, reps: "10", rest: "90 sec" },
      { name: "Medicine Ball Slams", sets: 4, reps: "12", rest: "90 sec" },
      { name: "Kettlebell Swings", sets: 4, reps: "15", rest: "90 sec" },
      { name: "Explosive Push-ups", sets: 3, reps: "10", rest: "90 sec" },
      { name: "Burpees", sets: 3, reps: "12", rest: "90 sec" }
    ]
  }
];

const conditioningWorkouts = [
  {
    id: 1,
    title: "BJJ Endurance Circuit",
    description: "Improve your gas tank with BJJ-specific movements",
    duration: 30,
    difficulty: "Intermediate",
    format: "30 seconds work, 15 seconds rest, 3 rounds",
    exercises: ["Technical Stand-ups", "Sprawls", "Shrimping", "Bridge & Roll", "Squat Jumps"]
  },
  {
    id: 2,
    title: "Tabata for Grapplers",
    description: "High-intensity intervals to simulate competition",
    duration: 25,
    difficulty: "Advanced",
    format: "20 seconds work, 10 seconds rest, 8 rounds per exercise",
    exercises: ["Mountain Climbers", "Burpees", "Jump Squats", "Push-ups"]
  }
];

const flexibilityRoutines = [
  {
    id: 1,
    title: "Hip Mobility Flow",
    description: "Improve hip mobility for guard work",
    duration: 15,
    areas: ["Hips", "Groin", "Lower Back"],
    poses: [
      { name: "Butterfly Stretch", duration: "60 sec" },
      { name: "Pigeon Pose", duration: "60 sec each side" },
      { name: "Lying Figure-4 Stretch", duration: "45 sec each side" },
      { name: "Frog Stretch", duration: "60 sec" },
      { name: "Hip Flexor Stretch", duration: "45 sec each side" }
    ]
  },
  {
    id: 2,
    title: "Upper Body Mobility",
    description: "Improve shoulder and neck mobility",
    duration: 12,
    areas: ["Shoulders", "Neck", "Upper Back"],
    poses: [
      { name: "Cat-Cow", duration: "45 sec" },
      { name: "Thread the Needle", duration: "45 sec each side" },
      { name: "Shoulder Circles", duration: "30 sec each direction" },
      { name: "Wall Angels", duration: "45 sec" },
      { name: "Child's Pose", duration: "60 sec" }
    ]
  }
];

const recoveryProtocols = [
  {
    id: 1,
    title: "Active Recovery Day",
    description: "Light activity to promote blood flow and recovery",
    activities: [
      { name: "Light Jogging/Walking", duration: "15-20 min" },
      { name: "Dynamic Stretching", duration: "10 min" },
      { name: "Foam Rolling", duration: "10 min" },
      { name: "Light Technical Drilling", duration: "15-20 min" }
    ],
    tips: [
      "Keep heart rate below 140 BPM",
      "Focus on proper breathing",
      "Stay well hydrated throughout"
    ]
  },
  {
    id: 2,
    title: "Full Recovery Protocol",
    description: "Complete rest day protocol",
    activities: [
      { name: "Epsom Salt Bath", duration: "15-20 min" },
      { name: "Foam Rolling", duration: "15 min" },
      { name: "Static Stretching", duration: "15 min" },
      { name: "Sleep", duration: "8-9 hours" }
    ],
    tips: [
      "Focus on protein and anti-inflammatory foods",
      "Hydrate with electrolytes",
      "Prioritize quality sleep"
    ]
  }
];

const FitnessCard = ({ 
  title, 
  description, 
  icon: Icon 
}: { 
  title: string; 
  description: string; 
  icon: React.ElementType 
}) => (
  <Card className="glass-card h-full transition-all">
    <CardHeader className="pb-2">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-theme/10 mb-3">
        <Icon className="h-5 w-5 text-theme" />
      </div>
      <CardTitle className="text-xl">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm">Track and monitor your {title.toLowerCase()} progress to improve your overall jiu-jitsu performance.</p>
    </CardContent>
  </Card>
);

const WorkoutCard = ({ workout, type }: { workout: any, type: string }) => {
  const [completed, setCompleted] = useState(false);
  
  return (
    <Card className={`transition-all ${completed ? 'bg-primary/5 border-primary/30' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{workout.title}</CardTitle>
            <CardDescription className="mt-1">{workout.description}</CardDescription>
          </div>
          {completed && (
            <Badge className="bg-green-500">Completed</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {workout.duration} min
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Activity className="h-3 w-3" /> {workout.difficulty || 'All Levels'}
          </Badge>
        </div>
        
        {type === 'strength' && (
          <div className="space-y-2 my-2">
            <h4 className="font-medium text-sm">Exercises:</h4>
            <ul className="space-y-1.5">
              {workout.exercises.slice(0, 3).map((exercise: any, index: number) => (
                <li key={index} className="text-sm flex justify-between">
                  <span>{exercise.name}</span>
                  <span className="text-muted-foreground">{exercise.sets} x {exercise.reps}</span>
                </li>
              ))}
              {workout.exercises.length > 3 && (
                <li className="text-sm text-muted-foreground">+ {workout.exercises.length - 3} more exercises</li>
              )}
            </ul>
          </div>
        )}
        
        {type === 'conditioning' && (
          <div className="space-y-2 my-2">
            <h4 className="font-medium text-sm">Format:</h4>
            <p className="text-sm">{workout.format}</p>
            <ul className="flex flex-wrap gap-2 mt-2">
              {workout.exercises.slice(0, 3).map((exercise: string, index: number) => (
                <li key={index}>
                  <Badge variant="secondary" className="font-normal">{exercise}</Badge>
                </li>
              ))}
              {workout.exercises.length > 3 && (
                <li>
                  <Badge variant="secondary" className="font-normal">+{workout.exercises.length - 3} more</Badge>
                </li>
              )}
            </ul>
          </div>
        )}
        
        {type === 'flexibility' && (
          <div className="space-y-2 my-2">
            <div className="flex flex-wrap gap-1 mb-2">
              {workout.areas.map((area: string, index: number) => (
                <Badge key={index} variant="secondary" className="font-normal">{area}</Badge>
              ))}
            </div>
            <h4 className="font-medium text-sm">Key poses:</h4>
            <ul className="space-y-1">
              {workout.poses.slice(0, 3).map((pose: any, index: number) => (
                <li key={index} className="text-sm flex justify-between">
                  <span>{pose.name}</span>
                  <span className="text-muted-foreground">{pose.duration}</span>
                </li>
              ))}
              {workout.poses.length > 3 && (
                <li className="text-sm text-muted-foreground">+ {workout.poses.length - 3} more poses</li>
              )}
            </ul>
          </div>
        )}
        
        {type === 'recovery' && (
          <div className="space-y-2 my-2">
            <h4 className="font-medium text-sm">Activities:</h4>
            <ul className="space-y-1">
              {workout.activities.slice(0, 3).map((activity: any, index: number) => (
                <li key={index} className="text-sm flex justify-between">
                  <span>{activity.name}</span>
                  <span className="text-muted-foreground">{activity.duration}</span>
                </li>
              ))}
              {workout.activities.length > 3 && (
                <li className="text-sm text-muted-foreground">+ {workout.activities.length - 3} more activities</li>
              )}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">View Details</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{workout.title}</DialogTitle>
              <DialogDescription>{workout.description}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {workout.duration} min
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Activity className="h-3 w-3" /> {workout.difficulty || 'All Levels'}
                </Badge>
              </div>
              
              {type === 'strength' && (
                <div className="space-y-2">
                  <h4 className="font-medium">Exercises:</h4>
                  <ul className="space-y-2">
                    {workout.exercises.map((exercise: any, index: number) => (
                      <li key={index} className="flex justify-between items-center py-1.5 border-b last:border-b-0">
                        <div>
                          <div className="font-medium">{exercise.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {exercise.sets} sets x {exercise.reps}
                          </div>
                        </div>
                        <div className="text-sm">
                          Rest: {exercise.rest}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {type === 'conditioning' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Format:</h4>
                    <p className="text-sm mt-1">{workout.format}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Exercises:</h4>
                    <ul className="space-y-1 mt-1">
                      {workout.exercises.map((exercise: string, index: number) => (
                        <li key={index} className="flex items-center py-1.5 border-b last:border-b-0">
                          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 mr-2">
                            <span className="text-xs font-medium text-primary">{index + 1}</span>
                          </div>
                          <span>{exercise}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {type === 'flexibility' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Target Areas:</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {workout.areas.map((area: string, index: number) => (
                        <Badge key={index} variant="secondary" className="font-normal">{area}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium">Poses:</h4>
                    <ul className="space-y-1 mt-1">
                      {workout.poses.map((pose: any, index: number) => (
                        <li key={index} className="flex justify-between items-center py-1.5 border-b last:border-b-0">
                          <span>{pose.name}</span>
                          <span className="text-sm text-muted-foreground">{pose.duration}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {type === 'recovery' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Activities:</h4>
                    <ul className="space-y-1 mt-1">
                      {workout.activities.map((activity: any, index: number) => (
                        <li key={index} className="flex justify-between items-center py-1.5 border-b last:border-b-0">
                          <span>{activity.name}</span>
                          <span className="text-sm text-muted-foreground">{activity.duration}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium">Tips:</h4>
                    <ul className="space-y-1 mt-1">
                      {workout.tips.map((tip: string, index: number) => (
                        <li key={index} className="flex items-start py-1">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span className="text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCompleted(!completed)}>
                {completed ? (
                  <><X className="mr-2 h-4 w-4" /> Mark Incomplete</>
                ) : (
                  <><CheckCircle2 className="mr-2 h-4 w-4" /> Mark Complete</>
                )}
              </Button>
              <Button>Add to Schedule</Button>
            </div>
          </DialogContent>
        </Dialog>
        
        <Button size="sm" onClick={() => setCompleted(!completed)}>
          {completed ? 'Completed' : 'Complete'}
        </Button>
      </CardFooter>
    </Card>
  );
};

const StrengthTraining = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">BJJ-Specific Strength Training</h3>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Workout
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {strengthWorkouts.map(workout => (
          <WorkoutCard 
            key={workout.id} 
            workout={workout} 
            type="strength" 
          />
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Training Progress</CardTitle>
          <CardDescription>
            Track your strength gains over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Pull-up Max</span>
                <span>12 reps (+2 from last month)</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Squat 5RM</span>
                <span>185 lbs (+15 from last month)</span>
              </div>
              <Progress value={70} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Deadlift 5RM</span>
                <span>225 lbs (+20 from last month)</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ConditioningProgram = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">BJJ Conditioning Programs</h3>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Program
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {conditioningWorkouts.map(workout => (
          <WorkoutCard 
            key={workout.id} 
            workout={workout} 
            type="conditioning" 
          />
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Cardio Performance</CardTitle>
          <CardDescription>
            Track your conditioning metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Resting Heart Rate</div>
              <div className="text-3xl font-semibold">62 bpm</div>
              <div className="text-xs text-green-500">-3 from last month</div>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Recovery Rate</div>
              <div className="text-3xl font-semibold">72%</div>
              <div className="text-xs text-green-500">+5% from last month</div>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">HIIT Capacity</div>
              <div className="text-3xl font-semibold">Level 4</div>
              <div className="text-xs text-green-500">+1 from last month</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const FlexibilityTraining = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Mobility & Flexibility Routines</h3>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Routine
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {flexibilityRoutines.map(routine => (
          <WorkoutCard 
            key={routine.id} 
            workout={routine} 
            type="flexibility" 
          />
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Flexibility Assessment</CardTitle>
          <CardDescription>
            Track your range of motion improvements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Hip Mobility</span>
                <span>Intermediate</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Shoulder Mobility</span>
                <span>Advanced</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Hamstring Flexibility</span>
                <span>Beginner</span>
              </div>
              <Progress value={40} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Ankle Mobility</span>
                <span>Intermediate</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const RecoveryStrategies = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Recovery & Regeneration</h3>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Protocol
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recoveryProtocols.map(protocol => (
          <WorkoutCard 
            key={protocol.id} 
            workout={protocol} 
            type="recovery" 
          />
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Sleep & Recovery Tracker</CardTitle>
          <CardDescription>
            Monitor your recovery quality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Average Sleep</span>
                  <span>7.2 hours</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Sleep Quality</span>
                  <span>Good</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Stress Level</span>
                  <span>Moderate</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Recovery Checklist</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="sleep" />
                  <Label htmlFor="sleep" className="text-sm">8+ hours of sleep</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="water" defaultChecked />
                  <Label htmlFor="water" className="text-sm">Hydration goals met</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="protein" defaultChecked />
                  <Label htmlFor="protein" className="text-sm">Protein intake sufficient</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="stretching" />
                  <Label htmlFor="stretching" className="text-sm">Post-training stretching</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="foam" />
                  <Label htmlFor="foam" className="text-sm">Foam rolling/massage</Label>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Fitness = () => {
  return (
    <MainLayout>
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-theme/20 rounded-full filter blur-3xl opacity-50 parallax-element" data-parallax-direction="up" data-parallax-speed="10"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-theme/20 rounded-full filter blur-3xl opacity-40 parallax-element" data-parallax-direction="down" data-parallax-speed="7"></div>
        
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-theme/40 to-transparent opacity-60"></div>
        
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto perspective-section">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 uppercase">
              <span className="text-white">JIU-JITSU</span> <span className="text-theme">FITNESS</span>
            </h1>
            <p className="text-muted-foreground">Track and improve your fitness to enhance your jiu-jitsu performance on and off the mat.</p>
          </div>
          
          <Tabs defaultValue="overview" className="w-full perspective-section">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="strength">Strength</TabsTrigger>
              <TabsTrigger value="conditioning">Conditioning</TabsTrigger>
              <TabsTrigger value="flexibility">Flexibility</TabsTrigger>
              <TabsTrigger value="recovery">Recovery</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="perspective-section stagger-container">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                <div className="stagger-item">
                  <FitnessCard 
                    title="Strength Training" 
                    description="Build functional strength specific to jiu-jitsu movements." 
                    icon={Dumbbell} 
                  />
                </div>
                <div className="stagger-item">
                  <FitnessCard 
                    title="Cardiovascular Endurance" 
                    description="Improve your gas tank for tough rolling sessions." 
                    icon={HeartPulse} 
                  />
                </div>
                <div className="stagger-item">
                  <FitnessCard 
                    title="Flexibility & Mobility" 
                    description="Enhance movement range for better guard and escapes." 
                    icon={StretchHorizontal} 
                  />
                </div>
                <div className="stagger-item">
                  <FitnessCard 
                    title="HIIT Training" 
                    description="High-intensity interval training to mimic the demands of sparring." 
                    icon={Activity} 
                  />
                </div>
                <div className="stagger-item">
                  <FitnessCard 
                    title="Recovery & Sleep" 
                    description="Optimize your rest periods for better performance and growth." 
                    icon={Bed} 
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="strength">
              <StrengthTraining />
            </TabsContent>
            
            <TabsContent value="conditioning">
              <ConditioningProgram />
            </TabsContent>
            
            <TabsContent value="flexibility">
              <FlexibilityTraining />
            </TabsContent>
            
            <TabsContent value="recovery">
              <RecoveryStrategies />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </MainLayout>
  );
};

export default Fitness;
