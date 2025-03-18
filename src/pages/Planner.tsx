
import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { TrainingPlanner } from '@/components/TrainingPlanner';

const Planner = () => {
  return (
    <MainLayout>
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-bjj-blue/5 to-transparent -z-10"></div>
        
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-center">
              BJJ Training Planner
            </h1>
            <p className="text-muted-foreground text-center mb-8">
              Create personalized training plans based on your skill level, 
              schedule, and specific goals in Brazilian Jiu-Jitsu.
            </p>
          </div>
          
          <TrainingPlanner />
        </div>
      </section>
    </MainLayout>
  );
};

export default Planner;
