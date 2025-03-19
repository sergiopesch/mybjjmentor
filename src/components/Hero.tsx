
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Create split text animation with improved timing and effects
  useEffect(() => {
    if (!titleRef.current) return;
    const titleElement = titleRef.current;
    
    // Clear previous animation setup if any
    if (titleElement.querySelector('.split-text-container')) {
      return; // Animation already set up
    }
    
    // Get the text content without modifying the structure
    const container = document.createElement('span');
    container.className = 'split-text-container';
    
    // Create spans for "A FRAMEWORK TO" (white text)
    const frameworkSpan = document.createElement('span');
    frameworkSpan.className = 'text-white';
    frameworkSpan.innerText = "A FRAMEWORK TO ";
    
    // Create spans for "MASTERY" (theme text)
    const masterySpan = document.createElement('span');
    masterySpan.className = 'text-theme';
    masterySpan.innerText = "MASTERY";
    
    // Add them to container
    container.appendChild(frameworkSpan);
    container.appendChild(masterySpan);
    
    // Apply animation to the letters with staggered timing
    const applyLetterAnimation = (parentSpan, baseDelay = 0) => {
      const text = parentSpan.innerText;
      parentSpan.innerText = '';
      
      [...text].forEach((letter, i) => {
        const letterSpan = document.createElement('span');
        letterSpan.className = 'split-letter';
        letterSpan.innerText = letter === ' ' ? '\u00A0' : letter;
        letterSpan.style.transitionDelay = `${baseDelay + (i * 25)}ms`;
        parentSpan.appendChild(letterSpan);
      });
      
      return text.length;
    };
    
    // Apply with cascading delays
    const frameworkLength = applyLetterAnimation(frameworkSpan, 0);
    applyLetterAnimation(masterySpan, frameworkLength * 25); // Cascade the mastery text after framework
    
    // Clear the element and add the container
    titleElement.innerHTML = '';
    titleElement.appendChild(container);
    
    // Trigger animation after a short delay
    setTimeout(() => {
      container.classList.add('animate');
      setIsLoaded(true);
    }, 200);
  }, []);
  
  return (
    <section className="relative pt-20 sm:pt-28 md:pt-32 lg:pt-40 pb-20 sm:pb-24 md:pb-28 lg:pb-32 overflow-hidden">
      {/* Dark background with mountains/clouds from bottom */}
      <div className="absolute inset-0 -z-20 bg-theme-dark"></div>
      
      {/* Enhanced parallax elements with better visual balance */}
      <div className="absolute top-[20%] right-[10%] w-48 h-48 md:w-64 md:h-64 bg-theme/10 rounded-full filter blur-3xl opacity-40 parallax-element" data-parallax-direction="up" data-parallax-speed="15"></div>
      
      <div className="absolute bottom-[10%] left-[15%] w-56 h-56 md:w-80 md:h-80 bg-theme/10 rounded-full filter blur-3xl opacity-30 parallax-element" data-parallax-direction="down" data-parallax-speed="10"></div>
      
      {/* Content */}
      <div className="container max-w-6xl px-4 mx-auto relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Updated heading format with white/theme text split */}
          <h1 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 uppercase leading-tight hyphens-auto px-2 break-words">
            <span className="text-white">A FRAMEWORK TO</span> <span className="text-theme">MASTERY</span>
          </h1>
          
          <p className="text-xs sm:text-sm md:text-base uppercase tracking-widest text-muted-foreground mb-8 md:mb-12 perspective-section max-w-2xl mx-auto animate-fade-in">
            SUPPORT YOUR GROWTH EVERY STEP OF THE WAY — NO MATTER WHERE YOU ARE
          </p>
          
          {/* Stats Section with improved visual effects and staggered animation */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12 relative z-10 stagger-container ${isLoaded ? 'appear' : 'invisible'}`}>
            {/* Enhanced vertical beam for better design integration */}
            <div className="absolute inset-0 opacity-50" style={{ background: "linear-gradient(to bottom, transparent, rgba(234, 56, 76, 0.3), transparent)" }}></div>
            
            <div className="text-center p-4 md:p-8 stagger-item bg-black/20 backdrop-blur-sm rounded-lg hover:bg-black/30 transition-all hover:transform hover:scale-105 duration-300 hover:shadow-glow hover:shadow-theme/20">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-theme mb-2">50+</h2>
              <p className="text-sm uppercase tracking-widest text-muted-foreground">Techniques</p>
            </div>
            
            <div className="text-center p-4 md:p-8 stagger-item bg-black/20 backdrop-blur-sm rounded-lg hover:bg-black/30 transition-all hover:transform hover:scale-105 duration-300 hover:shadow-glow hover:shadow-theme/20">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-theme mb-2">10X</h2>
              <p className="text-sm uppercase tracking-widest text-muted-foreground">Faster Progress</p>
            </div>
          </div>
          
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 stagger-container ${isLoaded ? 'appear' : 'invisible'}`}>
            <Link to="/techniques" className="w-full sm:w-auto stagger-item">
              <Button size="lg" className="w-full sm:w-auto group bg-theme hover:bg-theme/80 text-white">
                DISCOVER MORE
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/techniques/planner" className="w-full sm:w-auto stagger-item">
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
