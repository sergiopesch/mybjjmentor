
import React, { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { TechniqueLibrary } from '@/components/TechniqueLibrary';
import { BJJTriangleLogo } from '@/components/BJJTriangleLogo';
import { Search, Calendar, BarChart3, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

const Techniques = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <MainLayout>
      <section className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24">
        <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
          {/* Page Header */}
          <div className="max-w-2xl mb-12 sm:mb-16 md:mb-24">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <BJJTriangleLogo size="sm" variant="gradient" />
              <p className="text-[10px] sm:text-xs tracking-ultra-wide uppercase text-primary">
                Technique Library
              </p>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4 sm:mb-6">
              Master the Fundamentals
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 sm:mb-8">
              From closed guard sweeps to back attacks. Explore our comprehensive collection
              of Jiu-Jitsu techniques organized by position and belt level.
            </p>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              <Input
                placeholder="Search techniques... (e.g. armbar, triangle, sweep)"
                className="pl-12 h-11 sm:h-12 bg-transparent border-border/50 focus:border-primary text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-transparent border-b border-border/30 rounded-none h-auto p-0 mb-8 sm:mb-12 flex flex-wrap gap-0">
              <TabsTrigger
                value="overview"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs tracking-extra-wide uppercase"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="planner"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs tracking-extra-wide uppercase"
              >
                Training Planner
              </TabsTrigger>
              <TabsTrigger
                value="progress"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs tracking-extra-wide uppercase"
              >
                Progress
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <TechniqueLibrary searchQuery={searchQuery} />
            </TabsContent>

            <TabsContent value="planner">
              <div className="py-12 sm:py-16">
                <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
                  <div>
                    <p className="text-[10px] sm:text-xs tracking-ultra-wide uppercase text-primary mb-3 sm:mb-4">
                      Personalized Plans
                    </p>
                    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light tracking-tight mb-4 sm:mb-6">
                      Training Planner
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 sm:mb-8">
                      Create personalized drilling schedules based on your belt level and goals.
                      Track your mat time, organize techniques by position, and build a
                      structured path to your next promotion.
                    </p>
                    <Link
                      to="/techniques/planner"
                      className="group inline-flex items-center gap-3 text-xs sm:text-sm tracking-extra-wide uppercase transition-all duration-300 hover:gap-5 text-primary"
                    >
                      <span>Open Planner</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                    </Link>
                  </div>
                  <div className="border border-border/30 p-8 sm:p-12 flex items-center justify-center hover:border-primary/20 transition-colors">
                    <Calendar className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 text-primary/30" strokeWidth={0.5} />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="progress">
              <div className="py-12 sm:py-16">
                <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
                  <div>
                    <p className="text-[10px] sm:text-xs tracking-ultra-wide uppercase text-primary mb-3 sm:mb-4">
                      Track Your Growth
                    </p>
                    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light tracking-tight mb-4 sm:mb-6">
                      Progress Tracking
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 sm:mb-8">
                      Monitor your journey from white to black belt. Track technique mastery,
                      rolling performance, competition results, and celebrate milestones as
                      you advance through the ranks.
                    </p>
                    <Link
                      to="/techniques/progress"
                      className="group inline-flex items-center gap-3 text-xs sm:text-sm tracking-extra-wide uppercase transition-all duration-300 hover:gap-5 text-primary"
                    >
                      <span>Track Progress</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                    </Link>
                  </div>
                  <div className="border border-border/30 p-8 sm:p-12 flex items-center justify-center hover:border-primary/20 transition-colors">
                    <BarChart3 className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 text-primary/30" strokeWidth={0.5} />
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
