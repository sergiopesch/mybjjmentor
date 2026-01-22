
import React, { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Dumbbell,
  HeartPulse,
  StretchHorizontal,
  Activity,
  Bed,
  CheckCircle,
  Clock,
  Plus,
  CheckCircle2,
  X,
  ArrowRight
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  strengthWorkouts,
  conditioningWorkouts,
  flexibilityRoutines,
  recoveryProtocols
} from '@/components/fitness/data';

const FitnessCard = ({
  title,
  description,
  icon: Icon
}: {
  title: string;
  description: string;
  icon: React.ElementType;
}) => (
  <div className="group p-8 border border-border/30 transition-all duration-500 hover:border-border/60 h-full">
    <Icon className="h-6 w-6 text-muted-foreground mb-6 group-hover:text-foreground transition-colors duration-500" strokeWidth={1} />
    <h3 className="font-serif text-xl font-light mb-3">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
  </div>
);

const WorkoutCard = ({ workout, type }: { workout: any; type: string }) => {
  const [completed, setCompleted] = useState(false);

  return (
    <div className={`border border-border/30 transition-all duration-500 ${completed ? 'bg-card/30' : ''}`}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-serif text-lg font-light mb-2">{workout.title}</h3>
            <p className="text-sm text-muted-foreground">{workout.description}</p>
          </div>
          {completed && (
            <span className="text-xs tracking-extra-wide uppercase text-muted-foreground">Done</span>
          )}
        </div>

        <div className="flex gap-4 mb-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" strokeWidth={1} /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Activity className="h-3 w-3" strokeWidth={1} /> {workout.difficulty || 'All Levels'}
          </span>
        </div>

        {type === 'strength' && workout.exercises && (
          <ul className="space-y-2 mb-4">
            {workout.exercises.slice(0, 3).map((exercise: any, index: number) => (
              <li key={index} className="text-sm flex justify-between text-muted-foreground">
                <span>{exercise.name}</span>
                <span>{exercise.sets} x {exercise.reps}</span>
              </li>
            ))}
            {workout.exercises.length > 3 && (
              <li className="text-sm text-muted-foreground/60">+ {workout.exercises.length - 3} more</li>
            )}
          </ul>
        )}

        {type === 'conditioning' && workout.exercises && (
          <ul className="space-y-2 mb-4">
            {workout.exercises.slice(0, 3).map((exercise: string, index: number) => (
              <li key={index} className="text-sm text-muted-foreground">{exercise}</li>
            ))}
            {workout.exercises.length > 3 && (
              <li className="text-sm text-muted-foreground/60">+ {workout.exercises.length - 3} more</li>
            )}
          </ul>
        )}

        {type === 'flexibility' && workout.poses && (
          <ul className="space-y-2 mb-4">
            {workout.poses.slice(0, 3).map((pose: any, index: number) => (
              <li key={index} className="text-sm flex justify-between text-muted-foreground">
                <span>{pose.name}</span>
                <span>{pose.duration}</span>
              </li>
            ))}
            {workout.poses.length > 3 && (
              <li className="text-sm text-muted-foreground/60">+ {workout.poses.length - 3} more</li>
            )}
          </ul>
        )}

        {type === 'recovery' && workout.activities && (
          <ul className="space-y-2 mb-4">
            {workout.activities.slice(0, 3).map((activity: any, index: number) => (
              <li key={index} className="text-sm flex justify-between text-muted-foreground">
                <span>{activity.name}</span>
                <span>{activity.duration}</span>
              </li>
            ))}
            {workout.activities.length > 3 && (
              <li className="text-sm text-muted-foreground/60">+ {workout.activities.length - 3} more</li>
            )}
          </ul>
        )}

        <div className="flex justify-between items-center pt-4 border-t border-border/30">
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-xs tracking-extra-wide uppercase text-muted-foreground hover:text-foreground transition-colors">
                View Details
              </button>
            </DialogTrigger>
            <DialogContent className="bg-background border-border/50">
              <DialogHeader>
                <DialogTitle className="font-serif text-xl font-light">{workout.title}</DialogTitle>
                <DialogDescription>{workout.description}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>{workout.duration} min</span>
                  <span>{workout.difficulty || 'All Levels'}</span>
                </div>

                {type === 'strength' && workout.exercises && (
                  <ul className="space-y-3">
                    {workout.exercises.map((exercise: any, index: number) => (
                      <li key={index} className="flex justify-between py-2 border-b border-border/30 last:border-b-0">
                        <div>
                          <span className="font-medium">{exercise.name}</span>
                          <span className="text-sm text-muted-foreground ml-2">
                            {exercise.sets} x {exercise.reps}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">Rest: {exercise.rest}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </DialogContent>
          </Dialog>

          <button
            onClick={() => setCompleted(!completed)}
            className="text-xs tracking-extra-wide uppercase hover:text-foreground transition-colors"
          >
            {completed ? 'Completed' : 'Complete'}
          </button>
        </div>
      </div>
    </div>
  );
};

const StrengthTraining = () => (
  <div className="space-y-12">
    <div className="flex justify-between items-center">
      <h3 className="font-serif text-2xl font-light">Strength Training</h3>
      <button className="text-xs tracking-extra-wide uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
        <Plus className="h-4 w-4" strokeWidth={1} />
        Create Workout
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/30">
      {strengthWorkouts.map(workout => (
        <div key={workout.id} className="bg-background">
          <WorkoutCard workout={workout} type="strength" />
        </div>
      ))}
    </div>

    <div className="border border-border/30 p-8">
      <h4 className="font-serif text-lg font-light mb-6">Training Progress</h4>
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2 text-sm">
            <span>Pull-up Max</span>
            <span className="text-muted-foreground">12 reps</span>
          </div>
          <div className="h-1 bg-border/30">
            <div className="h-full bg-foreground/30" style={{ width: '60%' }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-2 text-sm">
            <span>Squat 5RM</span>
            <span className="text-muted-foreground">185 lbs</span>
          </div>
          <div className="h-1 bg-border/30">
            <div className="h-full bg-foreground/30" style={{ width: '70%' }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-2 text-sm">
            <span>Deadlift 5RM</span>
            <span className="text-muted-foreground">225 lbs</span>
          </div>
          <div className="h-1 bg-border/30">
            <div className="h-full bg-foreground/30" style={{ width: '75%' }} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ConditioningProgram = () => (
  <div className="space-y-12">
    <div className="flex justify-between items-center">
      <h3 className="font-serif text-2xl font-light">Conditioning</h3>
      <button className="text-xs tracking-extra-wide uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
        <Plus className="h-4 w-4" strokeWidth={1} />
        Create Program
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/30">
      {conditioningWorkouts.map(workout => (
        <div key={workout.id} className="bg-background">
          <WorkoutCard workout={workout} type="conditioning" />
        </div>
      ))}
    </div>

    <div className="grid grid-cols-3 gap-8 border border-border/30 p-8">
      <div className="text-center">
        <p className="text-3xl font-serif font-light mb-2">62</p>
        <p className="text-xs tracking-extra-wide uppercase text-muted-foreground">Resting BPM</p>
      </div>
      <div className="text-center">
        <p className="text-3xl font-serif font-light mb-2">72%</p>
        <p className="text-xs tracking-extra-wide uppercase text-muted-foreground">Recovery Rate</p>
      </div>
      <div className="text-center">
        <p className="text-3xl font-serif font-light mb-2">L4</p>
        <p className="text-xs tracking-extra-wide uppercase text-muted-foreground">HIIT Capacity</p>
      </div>
    </div>
  </div>
);

const FlexibilityTraining = () => (
  <div className="space-y-12">
    <div className="flex justify-between items-center">
      <h3 className="font-serif text-2xl font-light">Flexibility & Mobility</h3>
      <button className="text-xs tracking-extra-wide uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
        <Plus className="h-4 w-4" strokeWidth={1} />
        Create Routine
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/30">
      {flexibilityRoutines.map(routine => (
        <div key={routine.id} className="bg-background">
          <WorkoutCard workout={routine} type="flexibility" />
        </div>
      ))}
    </div>
  </div>
);

const RecoveryStrategies = () => (
  <div className="space-y-12">
    <div className="flex justify-between items-center">
      <h3 className="font-serif text-2xl font-light">Recovery</h3>
      <button className="text-xs tracking-extra-wide uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
        <Plus className="h-4 w-4" strokeWidth={1} />
        Add Protocol
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/30">
      {recoveryProtocols.map(protocol => (
        <div key={protocol.id} className="bg-background">
          <WorkoutCard workout={protocol} type="recovery" />
        </div>
      ))}
    </div>

    <div className="border border-border/30 p-8">
      <h4 className="font-serif text-lg font-light mb-6">Recovery Checklist</h4>
      <div className="space-y-4">
        {['8+ hours of sleep', 'Hydration goals met', 'Protein intake sufficient', 'Post-training stretching', 'Foam rolling/massage'].map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <Checkbox id={`check-${index}`} className="border-border/50" />
            <Label htmlFor={`check-${index}`} className="text-sm text-muted-foreground">{item}</Label>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Fitness = () => {
  return (
    <MainLayout>
      <section className="pt-32 pb-24">
        <div className="container max-w-7xl px-6 mx-auto">
          {/* Page Header */}
          <div className="max-w-2xl mb-16 md:mb-24">
            <p className="text-xs tracking-ultra-wide uppercase text-muted-foreground mb-4">
              Physical Conditioning
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6">
              Fitness
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Track and improve your fitness to enhance your Jiu-Jitsu performance on and off the mat.
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-transparent border-b border-border/30 rounded-none h-auto p-0 mb-12 flex flex-wrap">
              {['overview', 'strength', 'conditioning', 'flexibility', 'recovery'].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-6 py-4 text-xs tracking-extra-wide uppercase"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30">
                {[
                  { title: 'Strength Training', description: 'Build functional strength specific to jiu-jitsu movements.', icon: Dumbbell },
                  { title: 'Cardiovascular Endurance', description: 'Improve your gas tank for tough rolling sessions.', icon: HeartPulse },
                  { title: 'Flexibility & Mobility', description: 'Enhance movement range for better guard and escapes.', icon: StretchHorizontal },
                  { title: 'HIIT Training', description: 'High-intensity interval training to mimic the demands of sparring.', icon: Activity },
                  { title: 'Recovery & Sleep', description: 'Optimize your rest periods for better performance and growth.', icon: Bed },
                ].map((item, index) => (
                  <div key={index} className="bg-background">
                    <FitnessCard {...item} />
                  </div>
                ))}
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
