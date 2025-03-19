
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  // Create split text animation
  useEffect(() => {
    if (!titleRef.current) return;
    
    const titleElement = titleRef.current;
    const text = titleElement.innerText;
    
    // Clear the element
    titleElement.innerText = '';
    
    // Set up for split text animation
    const container = document.createElement('span');
    container.className = 'split-text-container';
    
    // Create individual spans for each letter
    [...text].forEach((letter, i) => {
      const span = document.createElement('span');
      span.className = 'split-letter';
      span.innerText = letter === ' ' ? '\u00A0' : letter; // Use non-breaking space for actual spaces
      span.style.transitionDelay = `${i * 30}ms`;
      container.appendChild(span);
    });
    
    titleElement.appendChild(container);
    
    // Trigger animation after a short delay
    setTimeout(() => {
      container.classList.add('animate');
    }, 200);
  }, []);
  
  return (
    <section className="relative pt-40 pb-32 overflow-hidden">
      {/* Dark background with mountains/clouds from bottom */}
      <div className="absolute inset-0 -z-20 bg-theme-dark"></div>
      
      {/* Parallax elements */}
      <div 
        className="absolute top-[20%] right-[10%] w-64 h-64 bg-theme/10 rounded-full filter blur-3xl opacity-40 parallax-element"
        data-parallax-direction="up"
        data-parallax-speed="15"
      ></div>
      
      <div 
        className="absolute bottom-[10%] left-[15%] w-80 h-80 bg-theme/10 rounded-full filter blur-3xl opacity-30 parallax-element"
        data-parallax-direction="down"
        data-parallax-speed="10"
      ></div>
      
      {/* Content */}
      <div className="container max-w-6xl px-4 mx-auto relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 ref={titleRef} className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 uppercase">
            JJ Framework To Take You Anywhere
          </h1>
          
          <p className="text-sm md:text-base uppercase tracking-widest text-muted-foreground mb-12 perspective-section">
            Support your growth every step of the way
            — no matter where you're headed
          </p>
          
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 relative z-10 stagger-container">
            {/* Red vertical beam */}
            <div className="absolute inset-0 orange-beam"></div>
            
            <div className="text-center p-8 stagger-item">
              <h2 className="text-6xl font-bold text-theme mb-2">50+</h2>
              <p className="text-sm uppercase tracking-widest text-muted-foreground">Techniques</p>
            </div>
            
            <div className="text-center p-8 stagger-item">
              <h2 className="text-6xl font-bold text-theme mb-2">10X</h2>
              <p className="text-sm uppercase tracking-widest text-muted-foreground">Faster Progress</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 stagger-container">
            <Link to="/techniques" className="stagger-item">
              <Button size="lg" className="w-full sm:w-auto group bg-theme hover:bg-theme/80 text-white">
                DISCOVER MORE
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/planner" className="stagger-item">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-theme/50 text-theme hover:border-theme hover:bg-theme/5">
                CREATE PLAN
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
