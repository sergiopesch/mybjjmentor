
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  BarChart, 
  TrendingUp, 
  Award, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileText,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Progress } from '@/components/ui/progress';

// Sample data for a user's progress
const userProgress = {
  currentBelt: {
    name: 'Blue',
    color: 'bjj-blue',
    earnedDate: '2022-06-15',
    progress: 38, // percentage toward next belt
  },
  trainingHistory: [
    { date: '2023-07-12', duration: 90, focus: 'Takedowns', notes: 'Worked on single-leg takedowns' },
    { date: '2023-07-10', duration: 60, focus: 'Guard Passing', notes: 'Practiced pressure passing' },
    { date: '2023-07-08', duration: 75, focus: 'Submissions', notes: 'Triangle choke variations' },
    { date: '2023-07-05', duration: 90, focus: 'Guard Retention', notes: 'Defensive guard work' },
    { date: '2023-07-03', duration: 60, focus: 'Positional Sparring', notes: 'Started from side control' },
  ],
  skills: [
    { name: 'Guard Retention', level: 75 },
    { name: 'Guard Passing', level: 60 },
    { name: 'Takedowns', level: 45 },
    { name: 'Submissions', level: 70 },
    { name: 'Escapes', level: 65 },
  ],
  recentAchievements: [
    { name: 'First Competition', date: '2023-05-20', type: 'competition' },
    { name: 'Consistent Training (30 days)', date: '2023-04-15', type: 'streak' },
    { name: 'Triangle Choke Mastery', date: '2023-03-10', type: 'technique' },
  ],
  trackingStreak: {
    current: 12,
    best: 45,
  },
  upcomingGoals: [
    { name: 'Compete in IBJJF Open', deadline: '2023-09-15', progress: 65 },
    { name: 'Master De la Riva Guard', deadline: '2023-08-30', progress: 40 },
    { name: 'Train 5x per week', deadline: '2023-08-01', progress: 80 },
  ],
};

const beltOrder = [
  { name: 'White', color: 'bjj-white' },
  { name: 'Blue', color: 'bjj-blue' },
  { name: 'Purple', color: 'bjj-purple' },
  { name: 'Brown', color: 'bjj-brown' },
  { name: 'Black', color: 'bjj-black' }
];

export const ProgressTracker = () => {
  const [showAllSessions, setShowAllSessions] = useState(false);
  
  // Find the index of the current belt in the belt order
  const currentBeltIndex = beltOrder.findIndex(belt => belt.name === userProgress.currentBelt.name);
  const nextBelt = beltOrder[currentBeltIndex + 1];
  
  // Format the training history display
  const displayedSessions = showAllSessions 
    ? userProgress.trainingHistory 
    : userProgress.trainingHistory.slice(0, 3);

  return (
    <section className="py-12">
      <div className="container max-w-6xl px-4 mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Progress Tracking</h2>
          <p className="text-muted-foreground">
            Monitor your BJJ journey, track your skills, and set goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5 text-bjj-blue" />
                  Belt Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Belt</p>
                      <div className="flex items-center mt-1">
                        <div className={`w-4 h-4 rounded-full bg-${userProgress.currentBelt.color} mr-2`}></div>
                        <span className="font-medium">{userProgress.currentBelt.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Since {format(new Date(userProgress.currentBelt.earnedDate), 'MMM d, yyyy')}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Next Belt</p>
                      <div className="flex items-center justify-end mt-1">
                        <span className="font-medium mr-2">{nextBelt.name}</span>
                        <div className={`w-4 h-4 rounded-full bg-${nextBelt.color}`}></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {userProgress.currentBelt.progress}% progress
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <Progress value={userProgress.currentBelt.progress} className="h-2" />
                  </div>
                  
                  {/* Belt progression visualization */}
                  <div className="flex justify-between pt-2">
                    {beltOrder.map((belt, index) => {
                      const isCurrent = belt.name === userProgress.currentBelt.name;
                      const isPast = index < currentBeltIndex;
                      const isFuture = index > currentBeltIndex;
                      
                      return (
                        <div 
                          key={belt.name} 
                          className="flex flex-col items-center"
                        >
                          <div 
                            className={cn(
                              "w-8 h-1.5 rounded-full",
                              index === 0 ? "w-4 ml-4" : "",
                              index === beltOrder.length - 1 ? "w-4 mr-4" : "",
                              isPast ? `bg-${belt.color}` : "bg-muted",
                            )}
                          ></div>
                          <div 
                            className={cn(
                              "w-5 h-5 rounded-full mt-1.5 border-2",
                              isPast ? `bg-${belt.color} border-${belt.color}` : "",
                              isCurrent ? `bg-${belt.color} border-${belt.color} ring-2 ring-offset-2 ring-${belt.color}` : "",
                              isFuture ? "bg-muted border-muted" : "",
                            )}
                          ></div>
                          <span className={cn(
                            "text-xs mt-1",
                            isCurrent ? "font-semibold" : "text-muted-foreground",
                          )}>
                            {belt.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-bjj-blue" />
                  Skill Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userProgress.skills.map(skill => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{skill.name}</span>
                        <span className="text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-bjj-blue" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userProgress.recentAchievements.map(achievement => (
                    <div key={achievement.name} className="flex justify-between items-center py-2 border-b last:border-0">
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium">{achievement.name}</span>
                          <Badge 
                            variant="outline" 
                            className="ml-2 text-xs"
                          >
                            {achievement.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(new Date(achievement.date), 'MMM d, yyyy')}
                        </p>
                      </div>
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                        <Award className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Achievement
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-8 space-y-6">
            <Tabs defaultValue="training" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="training" className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Training History
                </TabsTrigger>
                <TabsTrigger value="goals" className="flex items-center">
                  <BarChart className="mr-2 h-4 w-4" />
                  Goals
                </TabsTrigger>
                <TabsTrigger value="stats" className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Stats & Analytics
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="training" className="space-y-6">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle>Recent Training Sessions</CardTitle>
                      <div className="flex items-center bg-primary/10 px-3 py-1 rounded-full text-sm">
                        <Calendar className="mr-2 h-4 w-4 text-primary" />
                        <span>
                          {userProgress.trackingStreak.current}-day streak
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {displayedSessions.map((session, index) => (
                        <div 
                          key={index} 
                          className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b last:border-0"
                        >
                          <div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-bjj-blue mr-2" />
                              <span className="font-medium">
                                {session.duration} min - {session.focus}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {format(new Date(session.date), 'EEEE, MMMM d, yyyy')}
                            </p>
                          </div>
                          
                          <div className="mt-2 sm:mt-0">
                            <p className="text-sm text-muted-foreground italic">
                              "{session.notes}"
                            </p>
                          </div>
                        </div>
                      ))}
                      
                      {!showAllSessions && userProgress.trainingHistory.length > 3 && (
                        <Button 
                          variant="ghost" 
                          className="w-full"
                          onClick={() => setShowAllSessions(true)}
                        >
                          Show All Sessions
                        </Button>
                      )}
                      
                      <Button className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Log New Training Session
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <CardTitle>Training Calendar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center h-64 bg-muted/50 rounded-md">
                      <p className="text-muted-foreground">Calendar visualization coming soon</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="goals" className="space-y-6">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle>Current Goals</CardTitle>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Goal
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {userProgress.upcomingGoals.map((goal, index) => (
                        <div key={index} className="space-y-2 pb-4 border-b last:border-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{goal.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                Target: {format(new Date(goal.deadline), 'MMM d, yyyy')}
                              </p>
                            </div>
                            <Badge 
                              variant={goal.progress > 75 ? "default" : "outline"}
                              className={goal.progress > 75 ? "bg-green-500 hover:bg-green-600" : ""}
                            >
                              {goal.progress}% Complete
                            </Badge>
                          </div>
                          <Progress value={goal.progress} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Technique Goals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="glass-card p-4">
                        <h4 className="font-medium mb-2">Mastery Goals</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center text-sm">
                            <div className="w-2 h-2 rounded-full bg-bjj-blue mr-2"></div>
                            Triangle Choke variations
                          </li>
                          <li className="flex items-center text-sm">
                            <div className="w-2 h-2 rounded-full bg-bjj-blue mr-2"></div>
                            De la Riva Guard
                          </li>
                          <li className="flex items-center text-sm">
                            <div className="w-2 h-2 rounded-full bg-bjj-blue mr-2"></div>
                            Ankle lock defense
                          </li>
                        </ul>
                      </div>
                      
                      <div className="glass-card p-4">
                        <h4 className="font-medium mb-2">Competition Prep</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center text-sm">
                            <div className="w-2 h-2 rounded-full bg-bjj-purple mr-2"></div>
                            Guard passing strategy
                          </li>
                          <li className="flex items-center text-sm">
                            <div className="w-2 h-2 rounded-full bg-bjj-purple mr-2"></div>
                            Takedown to submission chain
                          </li>
                          <li className="flex items-center text-sm">
                            <div className="w-2 h-2 rounded-full bg-bjj-purple mr-2"></div>
                            Competition cardio
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="stats" className="space-y-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Training Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                      <div className="glass-card p-4 text-center">
                        <p className="text-sm text-muted-foreground">Total Hours</p>
                        <p className="text-3xl font-semibold">127</p>
                        <p className="text-xs text-muted-foreground">+12% from last month</p>
                      </div>
                      
                      <div className="glass-card p-4 text-center">
                        <p className="text-sm text-muted-foreground">Sessions</p>
                        <p className="text-3xl font-semibold">84</p>
                        <p className="text-xs text-muted-foreground">Past 6 months</p>
                      </div>
                      
                      <div className="glass-card p-4 text-center">
                        <p className="text-sm text-muted-foreground">Consistency</p>
                        <p className="text-3xl font-semibold">78%</p>
                        <p className="text-xs text-muted-foreground">Weekly target met</p>
                      </div>
                    </div>
                    
                    <div className="space-y-8">
                      <div>
                        <h4 className="text-sm font-medium mb-3">Training Focus Distribution</h4>
                        <div className="h-48 bg-muted/50 rounded-md flex items-center justify-center">
                          <p className="text-muted-foreground">Chart visualization coming soon</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-3">Weekly Training Pattern</h4>
                        <div className="h-48 bg-muted/50 rounded-md flex items-center justify-center">
                          <p className="text-muted-foreground">Chart visualization coming soon</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};
