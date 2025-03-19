
import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell, HeartPulse, StretchHorizontal, Activity, Bed } from 'lucide-react';

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
              Jiu-Jitsu <span className="text-theme animated-gradient">Fitness</span>
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
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold mb-4">Strength Training Programs</h3>
                <p className="text-muted-foreground mb-6">Coming soon: Customized strength training routines for jiu-jitsu athletes.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="conditioning">
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold mb-4">Conditioning Programs</h3>
                <p className="text-muted-foreground mb-6">Coming soon: Cardio and conditioning workouts to improve your endurance.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="flexibility">
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold mb-4">Flexibility Training</h3>
                <p className="text-muted-foreground mb-6">Coming soon: Stretching and mobility exercises to improve your range of motion.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="recovery">
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold mb-4">Recovery Strategies</h3>
                <p className="text-muted-foreground mb-6">Coming soon: Sleep tracking and recovery protocols to optimize your training.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </MainLayout>
  );
};

export default Fitness;
