
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Shield, Target, Users } from 'lucide-react';
import { BJJTriangleLogo } from './BJJTriangleLogo';

export const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with subtle BJJ mat texture pattern */}
      <div className="absolute inset-0 bg-background -z-10" />

      {/* Large decorative triangle in background */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 transition-all duration-1000 ${
          isLoaded ? 'opacity-[0.03] scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <BJJTriangleLogo className="w-[600px] h-[600px] md:w-[800px] md:h-[800px]" variant="filled" />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background/90 -z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50 -z-10" />

      {/* Content */}
      <div className="container max-w-7xl px-4 sm:px-6 mx-auto py-20 sm:py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          {/* Triangle Logo */}
          <div
            className={`flex justify-center md:justify-start mb-6 sm:mb-8 transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <BJJTriangleLogo size="lg" variant="gradient" animated />
          </div>

          {/* Subtitle */}
          <div
            className={`transition-all duration-1000 delay-100 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <p className="text-[10px] sm:text-xs tracking-ultra-wide uppercase text-primary mb-4 sm:mb-6 text-center md:text-left">
              The Gentle Art - Mind, Body, Spirit
            </p>
          </div>

          {/* Main Title - BJJ focused */}
          <h1
            className={`font-serif text-center md:text-left transition-all duration-1000 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight leading-[1.1] mb-2">
              Brazilian
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight leading-[1.1] text-primary">
              Jiu-Jitsu
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-[1.1] text-muted-foreground mt-2 sm:mt-4">
              Mastery Platform
            </span>
          </h1>

          {/* Decorative Line */}
          <div
            className={`my-8 sm:my-10 md:my-12 flex justify-center md:justify-start transition-all duration-1000 delay-400 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className={`h-px bg-primary/50 transition-all duration-1000 delay-600 ${
                isLoaded ? 'w-20 sm:w-24' : 'w-0'
              }`}
            />
          </div>

          {/* Description */}
          <p
            className={`text-muted-foreground text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-xl text-center md:text-left mx-auto md:mx-0 transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            From white belt to black belt, master the gentle art with our comprehensive
            training system. Techniques, drilling, and strategy in the Gracie tradition.
          </p>

          {/* Core Principles */}
          <div
            className={`grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-10 sm:mt-12 md:mt-16 max-w-lg mx-auto md:mx-0 transition-all duration-1000 delay-600 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-2 sm:mb-3">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary" strokeWidth={1.5} />
              </div>
              <p className="text-[10px] sm:text-xs tracking-wider uppercase text-muted-foreground">
                Defense
              </p>
            </div>
            <div className="text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-2 sm:mb-3">
                <Target className="h-5 w-5 sm:h-6 sm:w-6 text-primary" strokeWidth={1.5} />
              </div>
              <p className="text-[10px] sm:text-xs tracking-wider uppercase text-muted-foreground">
                Technique
              </p>
            </div>
            <div className="text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-2 sm:mb-3">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary" strokeWidth={1.5} />
              </div>
              <p className="text-[10px] sm:text-xs tracking-wider uppercase text-muted-foreground">
                Community
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div
            className={`grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 md:gap-12 mt-10 sm:mt-12 md:mt-16 max-w-2xl mx-auto md:mx-0 transition-all duration-1000 delay-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="text-center md:text-left">
              <p className="text-3xl sm:text-4xl md:text-5xl font-serif font-light mb-1 sm:mb-2">50+</p>
              <p className="text-[10px] sm:text-xs tracking-extra-wide uppercase text-muted-foreground">
                Techniques
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-3xl sm:text-4xl md:text-5xl font-serif font-light mb-1 sm:mb-2">5</p>
              <p className="text-[10px] sm:text-xs tracking-extra-wide uppercase text-muted-foreground">
                Belt Ranks
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-3xl sm:text-4xl md:text-5xl font-serif font-light mb-1 sm:mb-2">24/7</p>
              <p className="text-[10px] sm:text-xs tracking-extra-wide uppercase text-muted-foreground">
                Training Access
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-3xl sm:text-4xl md:text-5xl font-serif font-light mb-1 sm:mb-2">100%</p>
              <p className="text-[10px] sm:text-xs tracking-extra-wide uppercase text-muted-foreground">
                Gi & No-Gi
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 sm:gap-6 mt-10 sm:mt-12 md:mt-16 transition-all duration-1000 delay-900 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Link
              to="/techniques"
              className="group flex items-center gap-3 text-sm tracking-extra-wide uppercase transition-all duration-300 hover:gap-5 bg-primary/10 hover:bg-primary/20 px-6 py-3 border border-primary/30"
            >
              <span>Start Training</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
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
        className={`absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex flex-col items-center gap-2 sm:gap-3">
          <span className="text-[10px] sm:text-xs tracking-extra-wide uppercase text-muted-foreground">
            Scroll
          </span>
          <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-primary/50 to-transparent" />
        </div>
      </div>

      {/* Belt Rank Indicator - decorative */}
      <div
        className={`absolute bottom-8 sm:bottom-12 right-4 sm:right-8 hidden lg:flex flex-col gap-1.5 transition-all duration-1000 delay-1100 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-8 h-1.5 bg-bjj-white rounded-sm" title="White Belt" />
        <div className="w-8 h-1.5 bg-bjj-blue rounded-sm" title="Blue Belt" />
        <div className="w-8 h-1.5 bg-bjj-purple rounded-sm" title="Purple Belt" />
        <div className="w-8 h-1.5 bg-bjj-brown rounded-sm" title="Brown Belt" />
        <div className="w-8 h-1.5 bg-bjj-black rounded-sm" title="Black Belt" />
      </div>
    </section>
  );
};
