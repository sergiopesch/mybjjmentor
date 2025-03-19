
import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { TechniqueLibrary } from '@/components/TechniqueLibrary';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, BarChart3 } from 'lucide-react';

const Techniques = () => {
  return (
    <MainLayout>
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-bjj-blue/5 to-transparent -z-10"></div>
        
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-center uppercase">
              <span className="text-white">JIU-JITSU</span> <span className="text-theme">TECHNIQUES</span>
            </h1>
            <p className="text-muted-foreground text-center mb-8">
              Explore our comprehensive collection of Jiu-Jitsu techniques,
              plan your training sessions, and track your progress.
            </p>
            
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search techniques..." 
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Link to="/techniques/planner">
              <Card className="hover:border-theme/50 transition-all hover:-translate-y-1 h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Calendar className="w-16 h-16 mb-4 text-theme" />
                  <h2 className="text-2xl font-bold mb-2 uppercase">
                    <span className="text-white">TRAINING</span> <span className="text-theme">PLANNER</span>
                  </h2>
                  <p className="text-muted-foreground">
                    Create personalized training plans, schedule sessions, and optimize your Jiu-Jitsu journey.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/techniques/progress">
              <Card className="hover:border-theme/50 transition-all hover:-translate-y-1 h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <BarChart3 className="w-16 h-16 mb-4 text-theme" />
                  <h2 className="text-2xl font-bold mb-2 uppercase">
                    <span className="text-white">PROGRESS</span> <span className="text-theme">TRACKING</span>
                  </h2>
                  <p className="text-muted-foreground">
                    Monitor your Jiu-Jitsu journey, track skill development, and visualize your growth on the mat.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
          
          <TechniqueLibrary />
        </div>
      </section>
    </MainLayout>
  );
};

export default Techniques;
