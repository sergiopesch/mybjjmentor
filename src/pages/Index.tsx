import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Hero } from '@/components/Hero';
import { FeatureCard } from '@/components/FeatureCard';
import { TechniqueCarousel } from '@/components/TechniqueCarousel';
import { Video, Calendar, BarChart3, Target, Dumbbell, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const Index = () => {
  return <MainLayout>
      <Hero />
      
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto perspective-section">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 uppercase">
              <span className="text-white">YOUR PERSONAL</span> <span className="text-theme">GUIDE</span>
            </h2>
            <p className="text-muted-foreground">Comprehensive tools to enhance your Jiu-Jitsu training, track progress, and achieve your goals on and off the mat.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 stagger-container">
            <div className="stagger-item col-span-1 sm:col-span-1 lg:col-span-1">
              <Link to="/techniques" className="block h-full">
                <FeatureCard title="Techniques" description="Access a comprehensive collection of JJ techniques with detailed step-by-step instructions." icon={Video} />
              </Link>
            </div>
            <div className="stagger-item col-span-1 sm:col-span-1 lg:col-span-1">
              <Link to="/techniques/planner" className="block h-full">
                <FeatureCard title="Training Planner" description="Create personalized training plans based on your skill level and specific goals." icon={Calendar} />
              </Link>
            </div>
            <div className="stagger-item col-span-1 sm:col-span-1 lg:col-span-1">
              <Link to="/techniques/progress" className="block h-full">
                <FeatureCard title="Progress Tracking" description="Monitor your journey, track your skill development, and visualize your growth." icon={BarChart3} />
              </Link>
            </div>
            <div className="stagger-item col-span-1 sm:col-span-1 lg:col-span-1">
              <Link to="/techniques" className="block h-full">
                <FeatureCard title="Goal Setting" description="Set specific, measurable goals and get guidance on how to achieve them." icon={Target} />
              </Link>
            </div>
            <div className="stagger-item col-span-1 sm:col-span-1 lg:col-span-1">
              <Link to="/fitness" className="block h-full">
                <FeatureCard title="Fitness" description="Track and improve your fitness to enhance your jiu-jitsu performance." icon={Dumbbell} />
              </Link>
            </div>
            <div className="stagger-item col-span-1 sm:col-span-1 lg:col-span-1">
              <Link to="/nutrition" className="block h-full">
                <FeatureCard title="Nutrition" description="Optimize your nutrition to fuel your training and recovery." icon={Utensils} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-20 bg-black/30 backdrop-blur-sm relative">
        <div className="absolute -right-20 top-20 w-64 h-64 md:w-96 md:h-96 rounded-full bg-theme/5 filter blur-3xl parallax-element" data-parallax-direction="left" data-parallax-speed="5"></div>
        
        <div className="absolute -left-20 bottom-20 w-64 h-64 md:w-96 md:h-96 rounded-full bg-theme/5 filter blur-3xl parallax-element" data-parallax-direction="right" data-parallax-speed="7"></div>
        
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-theme/30 to-transparent opacity-50"></div>
        
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="text-center mb-12 perspective-section">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight uppercase">
              <span className="text-white">FEATURED</span> <span className="text-theme">TECHNIQUES</span>
            </h2>
          </div>

          <div className="stagger-item">
            <TechniqueCarousel />
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center perspective-section">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 md:mb-6 uppercase">
              <span className="text-white">START YOUR JJ</span> <span className="text-theme">JOURNEY</span>
            </h2>
            <p className="text-muted-foreground mb-8 md:mb-10">
              Whether you're just beginning or looking to refine your skills, 
              our comprehensive tools will help you progress and excel in Jiu-Jitsu.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 stagger-container">
              <Link to="/techniques/planner" className="w-full sm:w-auto stagger-item">
                <Button size="lg" className="w-full sm:w-auto bg-theme hover:bg-theme/80 text-white">
                  CREATE TRAINING PLAN
                </Button>
              </Link>
              <Link to="/techniques/progress" className="w-full sm:w-auto stagger-item">
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