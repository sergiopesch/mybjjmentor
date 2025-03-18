
import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { TechniqueLibrary } from '@/components/TechniqueLibrary';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Techniques = () => {
  return (
    <MainLayout>
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-bjj-blue/5 to-transparent -z-10"></div>
        
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-center">
              BJJ Technique Library
            </h1>
            <p className="text-muted-foreground text-center mb-8">
              Explore our comprehensive collection of Brazilian Jiu-Jitsu techniques,
              from fundamental movements to advanced submissions.
            </p>
            
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search techniques..." 
                className="pl-10"
              />
            </div>
          </div>
          
          <TechniqueLibrary />
        </div>
      </section>
    </MainLayout>
  );
};

export default Techniques;
