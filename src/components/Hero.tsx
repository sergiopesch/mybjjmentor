
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative pt-40 pb-32 overflow-hidden">
      {/* Dark background with mountains/clouds from bottom */}
      <div className="absolute inset-0 -z-20 bg-theme-dark"></div>
      
      {/* Content */}
      <div className="container max-w-6xl px-4 mx-auto relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 animate-fade-in uppercase">
            BJJ Framework
            <span className="block">To Take You</span>
            <span className="block">Anywhere</span>
          </h1>
          
          <p className="text-sm md:text-base uppercase tracking-widest text-muted-foreground mb-12 animate-fade-up max-w-xl mx-auto">
            Support your growth every step of the way
            — no matter where you're headed
          </p>
          
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 relative z-10">
            {/* Orange vertical beam */}
            <div className="absolute inset-0 orange-beam"></div>
            
            <div className="text-center p-8 animate-fade-up" style={{ animationDelay: '200ms' }}>
              <h2 className="text-6xl font-bold text-theme mb-2">50+</h2>
              <p className="text-sm uppercase tracking-widest text-muted-foreground">Techniques</p>
            </div>
            
            <div className="text-center p-8 animate-fade-up" style={{ animationDelay: '400ms' }}>
              <h2 className="text-6xl font-bold text-theme mb-2">10X</h2>
              <p className="text-sm uppercase tracking-widest text-muted-foreground">Faster Progress</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-up" style={{ animationDelay: '600ms' }}>
            <Link to="/techniques">
              <Button size="lg" className="w-full sm:w-auto group bg-theme hover:bg-theme/80 text-white">
                DISCOVER MORE
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/planner">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-theme/50 text-theme hover:border-theme">
                CREATE PLAN
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
