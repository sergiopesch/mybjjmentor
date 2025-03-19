import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Hero } from '@/components/Hero';
import { FeatureCard } from '@/components/FeatureCard';
import { TechniqueLibrary } from '@/components/TechniqueLibrary';
import { Video, CalendarCheck, BarChart3, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const Index = () => {
  return <MainLayout>
      <Hero />
      
      <section className="py-20 relative overflow-hidden">
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="mb-16 text-center max-w-3xl mx-auto perspective-section">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 uppercase">
              Your Personal JJ Guide
            </h2>
            <p className="text-muted-foreground">Comprehensive tools to enhance your Jiu-Jitsu training, track progress, and achieve your goals on and off the mat.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-container">
            <div className="stagger-item">
              <FeatureCard title="Technique Library" description="Access a comprehensive collection of JJ techniques with detailed step-by-step instructions." icon={Video} />
            </div>
            <div className="stagger-item">
              <FeatureCard title="Training Planner" description="Create personalized training plans based on your skill level and specific goals." icon={CalendarCheck} />
            </div>
            <div className="stagger-item">
              <FeatureCard title="Progress Tracking" description="Monitor your journey, track your skill development, and visualize your growth." icon={BarChart3} />
            </div>
            <div className="stagger-item">
              <FeatureCard title="Goal Setting" description="Set specific, measurable goals and get guidance on how to achieve them." icon={Target} />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-black/30 backdrop-blur-sm relative">
        <div className="absolute -right-20 top-20 w-96 h-96 rounded-full bg-theme/5 filter blur-3xl parallax-element" data-parallax-direction="left" data-parallax-speed="5"></div>
        
        <div className="absolute -left-20 bottom-20 w-96 h-96 rounded-full bg-theme/5 filter blur-3xl parallax-element" data-parallax-direction="right" data-parallax-speed="7"></div>
        
        <div className="absolute inset-0 orange-beam -z-10"></div>
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="text-center mb-12 perspective-section">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight uppercase">
              Featured Techniques
            </h2>
          </div>

          <div className="stagger-item">
            <TechniqueLibrary />
          </div>
          
          <div className="mt-12 text-center stagger-container">
            <Link to="/techniques" className="stagger-item">
              <Button size="lg" variant="outline" className="border-theme/50 text-theme hover:border-theme">
                EXPLORE ALL TECHNIQUES
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="py-24 relative overflow-hidden">
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center perspective-section">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 uppercase">
              Start Your JJ Journey
            </h2>
            <p className="text-muted-foreground mb-10">
              Whether you're just beginning or looking to refine your skills, 
              our comprehensive tools will help you progress and excel in Jiu-Jitsu.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 stagger-container">
              <Link to="/planner" className="stagger-item">
                <Button size="lg" className="w-full sm:w-auto bg-theme hover:bg-theme/80 text-white">
                  CREATE TRAINING PLAN
                </Button>
              </Link>
              <Link to="/progress" className="stagger-item">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-theme/50 text-theme hover:border-theme">
                  TRACK YOUR PROGRESS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>;
};
export default Index;