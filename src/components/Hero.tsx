
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-bjj-blue/5 to-transparent -z-10"></div>
      
      {/* Content */}
      <div className="container max-w-6xl px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
            Master Brazilian Jiu-Jitsu
            <span className="block text-bjj-blue">With Precision</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-up">
            A personal BJJ coach, video researcher, and training planner to help you
            perfect your technique and advance to the next level.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
            <Link to="/techniques">
              <Button size="lg" className="w-full sm:w-auto group">
                Explore Techniques
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/planner">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Create Training Plan
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative circles */}
      <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-bjj-blue/5 -z-10"></div>
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-bjj-purple/5 -z-10"></div>
    </section>
  );
};
