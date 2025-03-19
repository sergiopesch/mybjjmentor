
import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { TechniqueLibrary } from '@/components/TechniqueLibrary';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, BarChart3 } from 'lucide-react';

const Techniques = () => {
  return (
    <MainLayout>
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-theme/20 rounded-full filter blur-3xl opacity-50 parallax-element" data-parallax-direction="up" data-parallax-speed="10"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-theme/20 rounded-full filter blur-3xl opacity-40 parallax-element" data-parallax-direction="down" data-parallax-speed="7"></div>
        
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-theme/40 to-transparent opacity-60"></div>
        
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto perspective-section">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 uppercase">
              <span className="text-white">JIU-JITSU</span> <span className="text-theme">TECHNIQUES</span>
            </h1>
            <p className="text-muted-foreground">
              Explore our comprehensive collection of Jiu-Jitsu techniques,
              plan your training sessions, and track your progress.
            </p>
            
            <div className="relative mt-8">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search techniques..." 
                className="pl-10"
              />
            </div>
          </div>
          
          <Tabs defaultValue="overview" className="w-full perspective-section">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="planner">Training Planner</TabsTrigger>
              <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="perspective-section stagger-container">
              <TechniqueLibrary />
            </TabsContent>
            
            <TabsContent value="planner">
              <div className="text-center py-4 mb-8">
                <h2 className="text-2xl font-semibold mb-4 uppercase">
                  <span className="text-white">TRAINING</span> <span className="text-theme">PLANNER</span>
                </h2>
                <p className="text-muted-foreground mb-6">Create personalized training plans, schedule sessions, and optimize your Jiu-Jitsu journey.</p>
                
                <Link to="/techniques/planner">
                  <Card className="hover:border-theme/50 transition-all hover:-translate-y-1 h-full">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <Calendar className="w-16 h-16 mb-4 text-theme" />
                      <p className="text-sm text-muted-foreground mt-2">
                        Click to navigate to the full Training Planner feature.
                      </p>
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
                <p className="text-muted-foreground mb-6">Monitor your Jiu-Jitsu journey, track skill development, and visualize your growth on the mat.</p>
                
                <Link to="/techniques/progress">
                  <Card className="hover:border-theme/50 transition-all hover:-translate-y-1 h-full">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <BarChart3 className="w-16 h-16 mb-4 text-theme" />
                      <p className="text-sm text-muted-foreground mt-2">
                        Click to navigate to the full Progress Tracking feature.
                      </p>
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
