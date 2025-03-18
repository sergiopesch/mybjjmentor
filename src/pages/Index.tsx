
import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Hero } from '@/components/Hero';
import { FeatureCard } from '@/components/FeatureCard';
import { TechniqueLibrary } from '@/components/TechniqueLibrary';
import { Video, CalendarCheck, BarChart3, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <MainLayout>
      <Hero />
      
      <section className="py-16 relative overflow-hidden">
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Your Personal BJJ Guide
            </h2>
            <p className="text-muted-foreground">
              Comprehensive tools to enhance your Brazilian Jiu-Jitsu training,
              track progress, and achieve your goals on the mat.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 fade-in-section">
            <FeatureCard
              title="Technique Library"
              description="Access a comprehensive collection of BJJ techniques with detailed step-by-step instructions."
              icon={Video}
            />
            <FeatureCard
              title="Training Planner"
              description="Create personalized training plans based on your skill level and specific goals."
              icon={CalendarCheck}
            />
            <FeatureCard
              title="Progress Tracking"
              description="Monitor your journey, track your skill development, and visualize your growth."
              icon={BarChart3}
            />
            <FeatureCard
              title="Goal Setting"
              description="Set specific, measurable goals and get guidance on how to achieve them."
              icon={Target}
            />
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gradient-to-b from-background to-secondary/30 fade-in-section">
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight">
              Featured Techniques
            </h2>
          </div>

          <TechniqueLibrary />
          
          <div className="mt-8 text-center">
            <Link to="/techniques">
              <Button size="lg" variant="outline">
                Explore All Techniques
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-background relative overflow-hidden fade-in-section">
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-bjj-blue/5 -z-10"></div>
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-bjj-purple/5 -z-10"></div>
      
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Start Your BJJ Journey
            </h2>
            <p className="text-muted-foreground mb-8">
              Whether you're just beginning or looking to refine your skills, 
              our comprehensive tools will help you progress and excel in Brazilian Jiu-Jitsu.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/planner">
                <Button size="lg" className="w-full sm:w-auto">
                  Create Training Plan
                </Button>
              </Link>
              <Link to="/progress">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Track Your Progress
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
