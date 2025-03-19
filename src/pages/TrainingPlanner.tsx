
import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { TrainingPlanner } from '@/components/TrainingPlanner';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const TrainingPlannerPage = () => {
  return (
    <MainLayout>
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-bjj-blue/5 to-transparent -z-10"></div>
        
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="flex items-center mb-8">
            <Link to="/techniques">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Techniques
              </Button>
            </Link>
          </div>
          
          <div className="max-w-3xl mx-auto mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-center uppercase">
              <span className="text-white">TRAINING</span> <span className="text-theme">PLANNER</span>
            </h1>
            <p className="text-muted-foreground text-center mb-8">
              Plan your Jiu-Jitsu training sessions, track your progress, 
              and optimize your JJ journey with our intelligent calendar system.
            </p>
          </div>
          
          <TrainingPlanner />
        </div>
      </section>
    </MainLayout>
  );
};

export default TrainingPlannerPage;
