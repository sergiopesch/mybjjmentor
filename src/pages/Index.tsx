
import React, { useEffect } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Hero } from '@/components/Hero';
import { FeatureCard } from '@/components/FeatureCard';
import { TechniqueCarousel } from '@/components/TechniqueCarousel';
import { BJJTriangleLogo } from '@/components/BJJTriangleLogo';
import { Video, Calendar, BarChart3, Target, Dumbbell, Utensils, ArrowRight, Shield, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('appear');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal-section').forEach((section) => {
      observer.observe(section);
    });

    return () => {
      document.querySelectorAll('.reveal-section').forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <MainLayout>
      <Hero />

      {/* Belt Journey Section */}
      <section className="py-16 md:py-20 bg-card/30 reveal-section">
        <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <p className="text-[10px] sm:text-xs tracking-ultra-wide uppercase text-primary mb-3">
              Your BJJ Journey
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light tracking-tight">
              Belt Progression System
            </h2>
          </div>

          {/* Belt Ranks Display */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
            {[
              { name: 'White', color: 'bg-bjj-white', years: '0-2', desc: 'Foundation' },
              { name: 'Blue', color: 'bg-bjj-blue', years: '2-4', desc: 'Technical Growth' },
              { name: 'Purple', color: 'bg-bjj-purple', years: '4-6', desc: 'Game Development' },
              { name: 'Brown', color: 'bg-bjj-brown', years: '6-8', desc: 'Refinement' },
              { name: 'Black', color: 'bg-bjj-black', years: '10+', desc: 'Mastery' },
            ].map((belt, index) => (
              <div
                key={belt.name}
                className="flex flex-col items-center group"
              >
                <div
                  className={`w-16 sm:w-20 h-3 sm:h-4 ${belt.color} rounded-sm mb-2 sm:mb-3 transition-transform group-hover:scale-110 ${
                    belt.name === 'White' ? 'border border-foreground/20' : ''
                  }`}
                />
                <p className="text-xs sm:text-sm font-medium">{belt.name}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">{belt.years} years</p>
                <p className="text-[10px] text-primary mt-1 hidden sm:block">{belt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 reveal-section">
        <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
          {/* Section Header */}
          <div className="max-w-2xl mb-12 md:mb-16 lg:mb-24">
            <p className="text-[10px] sm:text-xs tracking-ultra-wide uppercase text-primary mb-3 sm:mb-4">
              Complete Training System
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-4 sm:mb-6">
              Everything You Need to Train BJJ
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              A comprehensive platform designed to support every aspect of your Jiu-Jitsu development,
              from fundamental movements to competition-level strategies.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30">
            <Link to="/techniques" className="block bg-background">
              <FeatureCard
                title="Technique Library"
                description="Master submissions, sweeps, passes, and escapes with detailed video breakdowns. From closed guard basics to advanced berimbolo sequences."
                icon={Video}
              />
            </Link>
            <Link to="/techniques/planner" className="block bg-background">
              <FeatureCard
                title="Training Planner"
                description="Structure your mat time effectively. Create drilling schedules, track rolling sessions, and plan your weekly training around your belt level goals."
                icon={Calendar}
              />
            </Link>
            <Link to="/techniques/progress" className="block bg-background">
              <FeatureCard
                title="Progress Tracking"
                description="Monitor technique retention, sparring performance, and competition readiness. Visualize your growth from white to black belt."
                icon={BarChart3}
              />
            </Link>
            <Link to="/techniques" className="block bg-background">
              <FeatureCard
                title="Goal Setting"
                description="Set specific targets: master the triangle choke, compete at IBJJF, or achieve your next belt. Track milestones on your journey."
                icon={Target}
              />
            </Link>
            <Link to="/fitness" className="block bg-background">
              <FeatureCard
                title="BJJ Conditioning"
                description="Build the specific strength, flexibility, and cardio needed for Jiu-Jitsu. Hip mobility, grip strength, and mat-specific endurance."
                icon={Dumbbell}
              />
            </Link>
            <Link to="/nutrition" className="block bg-background">
              <FeatureCard
                title="Fighter Nutrition"
                description="Fuel your training and recovery. Weight management for competition, optimal pre-training meals, and recovery nutrition."
                icon={Utensils}
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Techniques Showcase Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-card/30 reveal-section">
        <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8 mb-12 md:mb-16 lg:mb-24">
            <div className="max-w-xl">
              <p className="text-[10px] sm:text-xs tracking-ultra-wide uppercase text-primary mb-3 sm:mb-4">
                Technique Collection
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight">
                Master Fundamental Techniques
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-3 sm:mt-4">
                From basic guard retention to advanced submission chains.
                Learn the techniques that define world-class Jiu-Jitsu.
              </p>
            </div>
            <Link
              to="/techniques"
              className="group flex items-center gap-3 text-sm tracking-extra-wide uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <span>View All Techniques</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1} />
            </Link>
          </div>

          {/* Technique Carousel */}
          <div className="technique-carousel-container">
            <TechniqueCarousel />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 reveal-section">
        <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1">
              <p className="text-[10px] sm:text-xs tracking-ultra-wide uppercase text-primary mb-3 sm:mb-4">
                The Gracie Philosophy
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light tracking-tight mb-6">
                Mind, Body, Spirit
              </h2>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-medium mb-1">Self Defense Foundation</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      BJJ was developed for real-world self defense. Every technique has practical application,
                      empowering practitioners regardless of size or strength.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Award className="h-5 w-5 sm:h-6 sm:w-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-medium mb-1">Technical Excellence</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Leverage and technique triumph over raw power. The gentle art teaches efficiency,
                      timing, and the strategic use of body mechanics.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-medium mb-1">Community & Respect</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      The academy is a second home. Training partners become family. Respect for instructors,
                      teammates, and opponents is fundamental to the art.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Triangle Visual */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <BJJTriangleLogo className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72" variant="gradient" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl md:text-4xl font-serif font-light">OSS</p>
                    <p className="text-[10px] sm:text-xs tracking-wider uppercase text-muted-foreground mt-1">
                      Respect & Perseverance
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-card/30 reveal-section">
        <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <BJJTriangleLogo size="lg" variant="gradient" className="mx-auto mb-6 sm:mb-8" />
            <p className="text-[10px] sm:text-xs tracking-ultra-wide uppercase text-primary mb-3 sm:mb-4">
              Begin Your Journey
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-4 sm:mb-6">
              Start Training Today
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8 sm:mb-10 md:mb-12 max-w-xl mx-auto">
              Whether you're stepping on the mat for the first time or chasing your next belt,
              Master JJ will guide you on your path to Jiu-Jitsu mastery.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8">
              <Link
                to="/techniques/planner"
                className="group flex items-center gap-3 text-sm tracking-extra-wide uppercase transition-all duration-300 hover:gap-5 bg-primary/10 hover:bg-primary/20 px-6 py-3 border border-primary/30"
              >
                <span>Create Training Plan</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>

              <span className="hidden sm:block text-border">|</span>

              <Link
                to="/techniques/progress"
                className="text-sm tracking-extra-wide uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Track Progress
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
