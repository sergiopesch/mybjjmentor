
import React, { useEffect } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Hero } from '@/components/Hero';
import { FeatureCard } from '@/components/FeatureCard';
import { TechniqueCarousel } from '@/components/TechniqueCarousel';
import { Video, Calendar, BarChart3, Target, Dumbbell, Utensils, ArrowRight } from 'lucide-react';
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

      {/* Features Section */}
      <section className="py-24 md:py-32 reveal-section">
        <div className="container max-w-7xl px-6 mx-auto">
          {/* Section Header */}
          <div className="max-w-2xl mb-16 md:mb-24">
            <p className="text-xs tracking-ultra-wide uppercase text-muted-foreground mb-4">
              Your Training Companion
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-6">
              Everything You Need
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Comprehensive tools designed to enhance every aspect of your Jiu-Jitsu journey,
              from technique mastery to physical conditioning.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30">
            <Link to="/techniques" className="block bg-background">
              <FeatureCard
                title="Techniques"
                description="Access a comprehensive collection of Jiu-Jitsu techniques with detailed step-by-step instructions and video demonstrations."
                icon={Video}
              />
            </Link>
            <Link to="/techniques/planner" className="block bg-background">
              <FeatureCard
                title="Training Planner"
                description="Create personalized training plans tailored to your skill level, available time, and specific goals."
                icon={Calendar}
              />
            </Link>
            <Link to="/techniques/progress" className="block bg-background">
              <FeatureCard
                title="Progress Tracking"
                description="Monitor your journey, track skill development, and visualize your growth over time."
                icon={BarChart3}
              />
            </Link>
            <Link to="/techniques" className="block bg-background">
              <FeatureCard
                title="Goal Setting"
                description="Set specific, measurable goals and receive guidance on achieving them efficiently."
                icon={Target}
              />
            </Link>
            <Link to="/fitness" className="block bg-background">
              <FeatureCard
                title="Fitness"
                description="Track and improve your physical conditioning to enhance your performance on the mat."
                icon={Dumbbell}
              />
            </Link>
            <Link to="/nutrition" className="block bg-background">
              <FeatureCard
                title="Nutrition"
                description="Optimize your nutrition to properly fuel your training sessions and recovery."
                icon={Utensils}
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Techniques Showcase Section */}
      <section className="py-24 md:py-32 bg-card/30 reveal-section">
        <div className="container max-w-7xl px-6 mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-24">
            <div className="max-w-xl">
              <p className="text-xs tracking-ultra-wide uppercase text-muted-foreground mb-4">
                Featured Collection
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-tight">
                Master Techniques
              </h2>
            </div>
            <Link
              to="/techniques"
              className="group flex items-center gap-3 text-sm tracking-extra-wide uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1} />
            </Link>
          </div>

          {/* Technique Carousel */}
          <div className="technique-carousel-container">
            <TechniqueCarousel />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 reveal-section">
        <div className="container max-w-7xl px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs tracking-ultra-wide uppercase text-muted-foreground mb-4">
              Begin Today
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-6">
              Start Your Journey
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-12 max-w-xl mx-auto">
              Whether you're just beginning or refining your skills,
              our comprehensive tools will guide you toward mastery.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <Link
                to="/techniques/planner"
                className="group flex items-center gap-3 text-sm tracking-extra-wide uppercase transition-all duration-300 hover:gap-5"
              >
                <span>Create Training Plan</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1} />
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
