
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Clean black background */}
      <div className="absolute inset-0 bg-background -z-10" />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50 -z-10" />

      {/* Content */}
      <div className="container max-w-7xl px-6 mx-auto py-32">
        <div className="max-w-4xl mx-auto">
          {/* Subtitle */}
          <div
            className={`transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <p className="text-xs tracking-ultra-wide uppercase text-muted-foreground mb-8 text-center md:text-left">
              The Art of Brazilian Jiu-Jitsu
            </p>
          </div>

          {/* Main Title - Editorial Style */}
          <h1
            className={`font-serif text-center md:text-left transition-all duration-1000 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-none mb-2">
              Master
            </span>
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-none text-muted-foreground">
              Your Craft
            </span>
          </h1>

          {/* Decorative Line */}
          <div
            className={`my-12 md:my-16 flex justify-center md:justify-start transition-all duration-1000 delay-400 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className={`h-px bg-border transition-all duration-1000 delay-600 ${
                isLoaded ? 'w-24' : 'w-0'
              }`}
            />
          </div>

          {/* Description */}
          <p
            className={`text-muted-foreground text-lg md:text-xl font-light leading-relaxed max-w-xl text-center md:text-left mx-auto md:mx-0 transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            A comprehensive framework designed to support your growth,
            from fundamental techniques to advanced strategies.
          </p>

          {/* Stats Row */}
          <div
            className={`grid grid-cols-2 gap-8 md:gap-16 mt-16 md:mt-20 max-w-md mx-auto md:mx-0 transition-all duration-1000 delay-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="text-center md:text-left">
              <p className="text-4xl md:text-5xl font-serif font-light mb-2">50+</p>
              <p className="text-xs tracking-extra-wide uppercase text-muted-foreground">
                Techniques
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-4xl md:text-5xl font-serif font-light mb-2">10x</p>
              <p className="text-xs tracking-extra-wide uppercase text-muted-foreground">
                Faster Progress
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 mt-16 md:mt-20 transition-all duration-1000 delay-900 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Link
              to="/techniques"
              className="group flex items-center gap-3 text-sm tracking-extra-wide uppercase transition-all duration-300 hover:gap-5"
            >
              <span>Explore Techniques</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1} />
            </Link>

            <span className="hidden sm:block text-border">|</span>

            <Link
              to="/techniques/planner"
              className="text-sm tracking-extra-wide uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Create Plan
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs tracking-extra-wide uppercase text-muted-foreground">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent" />
        </div>
      </div>
    </section>
  );
};
