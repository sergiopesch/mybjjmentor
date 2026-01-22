
import React, { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BJJTriangleLogo } from '@/components/BJJTriangleLogo';
import {
  Dumbbell,
  HeartPulse,
  StretchHorizontal,
  Activity,
  Bed,
  Clock,
  Plus,
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
  <div className="group p-6 sm:p-8 border border-border/30 transition-all duration-500 hover:border-primary/30 h-full">
    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary mb-4 sm:mb-6 group-hover:text-primary/80 transition-colors duration-500" strokeWidth={1.5} />
    <h3 className="font-serif text-lg sm:text-xl font-light mb-2 sm:mb-3">{title}</h3>
    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{description}</p>
  </div>
);

const WorkoutCard = ({ workout, type }: { workout: any; type: string }) => {
  const [completed, setCompleted] = useState(false);

  return (
    <div className={`border border-border/30 transition-all duration-500 ${completed ? 'bg-primary/5 border-primary/20' : 'hover:border-primary/20'}`}>
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-start mb-3 sm:mb-4">
          <div>
            <h3 className="font-serif text-base sm:text-lg font-light mb-1 sm:mb-2">{workout.title}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">{workout.description}</p>
          </div>
          {completed && (
            <span className="text-[10px] sm:text-xs tracking-extra-wide uppercase text-primary">Done</span>
          )}
        </div>

        <div className="flex gap-3 sm:gap-4 mb-3 sm:mb-4 text-[10px] sm:text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" strokeWidth={1.5} /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Activity className="h-3 w-3" strokeWidth={1.5} /> {workout.difficulty || 'All Levels'}
          </span>
        </div>

        {type === 'strength' && workout.exercises && (
          <ul className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
            {workout.exercises.slice(0, 3).map((exercise: any, index: number) => (
              <li key={index} className="text-xs sm:text-sm flex justify-between text-muted-foreground">
                <span>{exercise.name}</span>
                <span>{exercise.sets} x {exercise.reps}</span>
              </li>
            ))}
            {workout.exercises.length > 3 && (
              <li className="text-xs sm:text-sm text-muted-foreground/60">+ {workout.exercises.length - 3} more</li>
            )}
          </ul>
        )}

        {type === 'conditioning' && workout.exercises && (
          <ul className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
            {workout.exercises.slice(0, 3).map((exercise: string, index: number) => (
              <li key={index} className="text-xs sm:text-sm text-muted-foreground">{exercise}</li>
            ))}
            {workout.exercises.length > 3 && (
              <li className="text-xs sm:text-sm text-muted-foreground/60">+ {workout.exercises.length - 3} more</li>
            )}
          </ul>
        )}

        {type === 'flexibility' && workout.poses && (
          <ul className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
            {workout.poses.slice(0, 3).map((pose: any, index: number) => (
              <li key={index} className="text-xs sm:text-sm flex justify-between text-muted-foreground">
                <span>{pose.name}</span>
                <span>{pose.duration}</span>
              </li>
            ))}
            {workout.poses.length > 3 && (
              <li className="text-xs sm:text-sm text-muted-foreground/60">+ {workout.poses.length - 3} more</li>
            )}
          </ul>
        )}

        {type === 'recovery' && workout.activities && (
          <ul className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
            {workout.activities.slice(0, 3).map((activity: any, index: number) => (
              <li key={index} className="text-xs sm:text-sm flex justify-between text-muted-foreground">
                <span>{activity.name}</span>
                <span>{activity.duration}</span>
              </li>
            ))}
            {workout.activities.length > 3 && (
              <li className="text-xs sm:text-sm text-muted-foreground/60">+ {workout.activities.length - 3} more</li>
            )}
          </ul>
        )}

        <div className="flex justify-between items-center pt-3 sm:pt-4 border-t border-border/30">
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-[10px] sm:text-xs tracking-extra-wide uppercase text-muted-foreground hover:text-primary transition-colors">
                View Details
              </button>
            </DialogTrigger>
            <DialogContent className="bg-background border-border/50 mx-4">
              <DialogHeader>
                <DialogTitle className="font-serif text-lg sm:text-xl font-light">{workout.title}</DialogTitle>
                <DialogDescription>{workout.description}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex gap-4 text-xs sm:text-sm text-muted-foreground">
                  <span>{workout.duration} min</span>
                  <span>{workout.difficulty || 'All Levels'}</span>
                </div>

                {type === 'strength' && workout.exercises && (
                  <ul className="space-y-3">
                    {workout.exercises.map((exercise: any, index: number) => (
                      <li key={index} className="flex justify-between py-2 border-b border-border/30 last:border-b-0">
                        <div>
                          <span className="font-medium text-sm">{exercise.name}</span>
                          <span className="text-xs sm:text-sm text-muted-foreground ml-2">
                            {exercise.sets} x {exercise.reps}
                          </span>
                        </div>
                        <span className="text-xs sm:text-sm text-muted-foreground">Rest: {exercise.rest}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </DialogContent>
          </Dialog>

          <button
            onClick={() => setCompleted(!completed)}
            className={`text-[10px] sm:text-xs tracking-extra-wide uppercase transition-colors ${
              completed ? 'text-primary' : 'text-muted-foreground hover:text-primary'
            }`}
          >
            {completed ? 'Completed' : 'Complete'}
          </button>
        </div>
      </div>
    </div>
  );
};

const StrengthTraining = () => (
  <div className="space-y-8 sm:space-y-12">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <h3 className="font-serif text-xl sm:text-2xl font-light">Strength Training</h3>
      <button className="text-xs tracking-extra-wide uppercase text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 self-start">
        <Plus className="h-4 w-4" strokeWidth={1.5} />
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

    <div className="border border-border/30 p-6 sm:p-8">
      <h4 className="font-serif text-base sm:text-lg font-light mb-4 sm:mb-6">Training Progress</h4>
      <div className="space-y-4 sm:space-y-6">
        <div>
          <div className="flex justify-between mb-2 text-xs sm:text-sm">
            <span>Pull-up Max</span>
            <span className="text-muted-foreground">12 reps</span>
          </div>
          <div className="h-1.5 bg-border/30 rounded-full overflow-hidden">
            <div className="h-full bg-primary/60 rounded-full" style={{ width: '60%' }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-2 text-xs sm:text-sm">
            <span>Squat 5RM</span>
            <span className="text-muted-foreground">185 lbs</span>
          </div>
          <div className="h-1.5 bg-border/30 rounded-full overflow-hidden">
            <div className="h-full bg-primary/60 rounded-full" style={{ width: '70%' }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-2 text-xs sm:text-sm">
            <span>Deadlift 5RM</span>
            <span className="text-muted-foreground">225 lbs</span>
          </div>
          <div className="h-1.5 bg-border/30 rounded-full overflow-hidden">
            <div className="h-full bg-primary/60 rounded-full" style={{ width: '75%' }} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ConditioningProgram = () => (
  <div className="space-y-8 sm:space-y-12">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <h3 className="font-serif text-xl sm:text-2xl font-light">Conditioning</h3>
      <button className="text-xs tracking-extra-wide uppercase text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 self-start">
        <Plus className="h-4 w-4" strokeWidth={1.5} />
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

    <div className="grid grid-cols-3 gap-4 sm:gap-8 border border-border/30 p-6 sm:p-8">
      <div className="text-center">
        <p className="text-2xl sm:text-3xl font-serif font-light mb-1 sm:mb-2 text-primary">62</p>
        <p className="text-[10px] sm:text-xs tracking-extra-wide uppercase text-muted-foreground">Resting BPM</p>
      </div>
      <div className="text-center">
        <p className="text-2xl sm:text-3xl font-serif font-light mb-1 sm:mb-2 text-primary">72%</p>
        <p className="text-[10px] sm:text-xs tracking-extra-wide uppercase text-muted-foreground">Recovery Rate</p>
      </div>
      <div className="text-center">
        <p className="text-2xl sm:text-3xl font-serif font-light mb-1 sm:mb-2 text-primary">L4</p>
        <p className="text-[10px] sm:text-xs tracking-extra-wide uppercase text-muted-foreground">HIIT Capacity</p>
      </div>
    </div>
  </div>
);

const FlexibilityTraining = () => (
  <div className="space-y-8 sm:space-y-12">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <h3 className="font-serif text-xl sm:text-2xl font-light">Flexibility & Mobility</h3>
      <button className="text-xs tracking-extra-wide uppercase text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 self-start">
        <Plus className="h-4 w-4" strokeWidth={1.5} />
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
  <div className="space-y-8 sm:space-y-12">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <h3 className="font-serif text-xl sm:text-2xl font-light">Recovery</h3>
      <button className="text-xs tracking-extra-wide uppercase text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 self-start">
        <Plus className="h-4 w-4" strokeWidth={1.5} />
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

    <div className="border border-border/30 p-6 sm:p-8">
      <h4 className="font-serif text-base sm:text-lg font-light mb-4 sm:mb-6">Recovery Checklist</h4>
      <div className="space-y-3 sm:space-y-4">
        {['8+ hours of sleep', 'Hydration goals met', 'Protein intake sufficient', 'Post-training stretching', 'Foam rolling/massage'].map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <Checkbox id={`check-${index}`} className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
            <Label htmlFor={`check-${index}`} className="text-xs sm:text-sm text-muted-foreground">{item}</Label>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Fitness = () => {
  return (
    <MainLayout>
      <section className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24">
        <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
          {/* Page Header */}
          <div className="max-w-2xl mb-12 sm:mb-16 md:mb-24">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <BJJTriangleLogo size="sm" variant="gradient" />
              <p className="text-[10px] sm:text-xs tracking-ultra-wide uppercase text-primary">
                BJJ Conditioning
              </p>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4 sm:mb-6">
              Fitness for the Mat
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Build the strength, endurance, and flexibility essential for Jiu-Jitsu.
              Train smarter with workouts designed specifically for grapplers.
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-transparent border-b border-border/30 rounded-none h-auto p-0 mb-8 sm:mb-12 flex flex-wrap gap-0">
              {['overview', 'strength', 'conditioning', 'flexibility', 'recovery'].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs tracking-extra-wide uppercase"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30">
                {[
                  { title: 'Grip Strength', description: 'Develop crushing grip strength for collar and sleeve control essential to gi Jiu-Jitsu.', icon: Dumbbell },
                  { title: 'Mat Cardio', description: 'Build the specific cardiovascular endurance needed for 5-minute rounds and competition.', icon: HeartPulse },
                  { title: 'Hip Mobility', description: 'Enhance hip flexibility for better guard retention, submissions, and escape movements.', icon: StretchHorizontal },
                  { title: 'Scramble Training', description: 'High-intensity interval training that mimics the explosive demands of live rolling.', icon: Activity },
                  { title: 'Recovery Protocol', description: 'Optimize rest and recovery to train consistently and prevent overtraining injuries.', icon: Bed },
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
