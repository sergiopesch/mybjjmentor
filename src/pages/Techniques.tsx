
import React, { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { TechniqueLibrary } from '@/components/TechniqueLibrary';
import { Search, Calendar, BarChart3 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Techniques = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <MainLayout>
      <section className="pt-40 pb-20 relative overflow-hidden">
        {/* Enhanced background effects */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-theme/20 rounded-full filter blur-3xl opacity-50 parallax-element" data-parallax-direction="up" data-parallax-speed="10"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-theme/20 rounded-full filter blur-3xl opacity-40 parallax-element" data-parallax-direction="down" data-parallax-speed="7"></div>
        
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-theme/40 to-transparent opacity-60"></div>
        
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto perspective-section">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 uppercase">
              <span className="text-white">JIU-JITSU</span> <span className="text-theme">TECHNIQUES</span>
            </h1>
            <p className="text-muted-foreground mt-4 mb-6">
              Explore our comprehensive collection of Jiu-Jitsu techniques,
              plan your training sessions, and track your progress.
            </p>
            
            <div className="relative mt-8 max-w-md mx-auto">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search techniques..." 
                className="pl-10 transition-all focus:ring-1 focus:ring-theme/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs defaultValue="overview" className="w-full perspective-section">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="overview" className="data-[state=active]:bg-theme/10 data-[state=active]:text-theme">Overview</TabsTrigger>
              <TabsTrigger value="planner" className="data-[state=active]:bg-theme/10 data-[state=active]:text-theme">Training Planner</TabsTrigger>
              <TabsTrigger value="progress" className="data-[state=active]:bg-theme/10 data-[state=active]:text-theme">Progress Tracking</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="perspective-section stagger-container">
              <TechniqueLibrary searchQuery={searchQuery} />
            </TabsContent>
            
            <TabsContent value="planner">
              <div className="text-center py-4 mb-8">
                <h2 className="text-2xl font-semibold mb-4 uppercase">
                  <span className="text-white">TRAINING</span> <span className="text-theme">PLANNER</span>
                </h2>
                <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
                  Create personalized training plans, schedule sessions, and optimize your Jiu-Jitsu journey.
                  Our intelligent planning system adapts to your skill level and goals.
                </p>
                
                <Link to="/techniques/planner" className="block transition-all hover:transform hover:scale-[1.02] duration-300">
                  <Card className="hover:border-theme/50 transition-all hover:-translate-y-1 h-full bg-black/20 backdrop-blur-sm border-white/10">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <Calendar className="w-16 h-16 mb-4 text-theme" />
                      <h3 className="font-semibold text-lg mb-2">Training Calendar</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        Plan your sessions, set goals, and track your progress over time.
                      </p>
                      <Button className="mt-4 bg-theme hover:bg-theme/80">Open Planner</Button>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </TabsContent>
            
            <TabsContent value="progress">
              <div className="text-center py-4 mb-8">
                <h2 className="text-2xl font-semibold mb-4 uppercase">
                  <span className="text-white">PROGRESS</span> <span className="text-theme">TRACKING</span>
                </h2>
                <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
                  Monitor your Jiu-Jitsu journey, track skill development, and visualize your growth on the mat.
                  Set goals and celebrate milestones as you advance through the ranks.
                </p>
                
                <Link to="/techniques/progress" className="block transition-all hover:transform hover:scale-[1.02] duration-300">
                  <Card className="hover:border-theme/50 transition-all hover:-translate-y-1 h-full bg-black/20 backdrop-blur-sm border-white/10">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <BarChart3 className="w-16 h-16 mb-4 text-theme" />
                      <h3 className="font-semibold text-lg mb-2">Skill Analytics</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        Visualize your improvement and identify areas for growth with detailed analytics.
                      </p>
                      <Button className="mt-4 bg-theme hover:bg-theme/80">Track Progress</Button>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </MainLayout>
  );
};

export default Techniques;
