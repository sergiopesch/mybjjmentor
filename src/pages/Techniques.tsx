
import React, { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { TechniqueLibrary } from '@/components/TechniqueLibrary';
import { Search, Calendar, BarChart3, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

const Techniques = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <MainLayout>
      <section className="pt-32 pb-24">
        <div className="container max-w-7xl px-6 mx-auto">
          {/* Page Header */}
          <div className="max-w-2xl mb-16 md:mb-24">
            <p className="text-xs tracking-ultra-wide uppercase text-muted-foreground mb-4">
              Technique Library
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6">
              Techniques
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Explore our comprehensive collection of Jiu-Jitsu techniques,
              plan your training sessions, and track your progress.
            </p>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" strokeWidth={1} />
              <Input
                placeholder="Search techniques..."
                className="pl-12 h-12 bg-transparent border-border/50 focus:border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-transparent border-b border-border/30 rounded-none h-auto p-0 mb-12">
              <TabsTrigger
                value="overview"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-6 py-4 text-xs tracking-extra-wide uppercase"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="planner"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-6 py-4 text-xs tracking-extra-wide uppercase"
              >
                Training Planner
              </TabsTrigger>
              <TabsTrigger
                value="progress"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-6 py-4 text-xs tracking-extra-wide uppercase"
              >
                Progress
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <TechniqueLibrary searchQuery={searchQuery} />
            </TabsContent>

            <TabsContent value="planner">
              <div className="py-16">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                  <div>
                    <p className="text-xs tracking-ultra-wide uppercase text-muted-foreground mb-4">
                      Personalized Plans
                    </p>
                    <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight mb-6">
                      Training Planner
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-8">
                      Create personalized training plans, schedule sessions, and optimize
                      your Jiu-Jitsu journey. Our intelligent planning system adapts to
                      your skill level and goals.
                    </p>
                    <Link
                      to="/techniques/planner"
                      className="group inline-flex items-center gap-3 text-sm tracking-extra-wide uppercase transition-all duration-300 hover:gap-5"
                    >
                      <span>Open Planner</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1} />
                    </Link>
                  </div>
                  <div className="border border-border/30 p-12 flex items-center justify-center">
                    <Calendar className="h-24 w-24 text-muted-foreground/30" strokeWidth={0.5} />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="progress">
              <div className="py-16">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                  <div>
                    <p className="text-xs tracking-ultra-wide uppercase text-muted-foreground mb-4">
                      Track Your Growth
                    </p>
                    <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight mb-6">
                      Progress Tracking
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-8">
                      Monitor your Jiu-Jitsu journey, track skill development, and visualize
                      your growth on the mat. Set goals and celebrate milestones as you
                      advance through the ranks.
                    </p>
                    <Link
                      to="/techniques/progress"
                      className="group inline-flex items-center gap-3 text-sm tracking-extra-wide uppercase transition-all duration-300 hover:gap-5"
                    >
                      <span>Track Progress</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1} />
                    </Link>
                  </div>
                  <div className="border border-border/30 p-12 flex items-center justify-center">
                    <BarChart3 className="h-24 w-24 text-muted-foreground/30" strokeWidth={0.5} />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </MainLayout>
  );
};

export default Techniques;
