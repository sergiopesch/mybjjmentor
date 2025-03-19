
import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Apple, Carrot, Utensils, Vegan, CookingPot } from 'lucide-react';

const NutritionCard = ({ 
  title, 
  description, 
  icon: Icon 
}: { 
  title: string; 
  description: string; 
  icon: React.ElementType 
}) => (
  <Card className="glass-card h-full transition-all">
    <CardHeader className="pb-2">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-theme/10 mb-3">
        <Icon className="h-5 w-5 text-theme" />
      </div>
      <CardTitle className="text-xl">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm">Optimize your {title.toLowerCase()} to fuel your jiu-jitsu training and recovery.</p>
    </CardContent>
  </Card>
);

const Nutrition = () => {
  return (
    <MainLayout>
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-theme/20 rounded-full filter blur-3xl opacity-50 parallax-element" data-parallax-direction="up" data-parallax-speed="10"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-theme/20 rounded-full filter blur-3xl opacity-40 parallax-element" data-parallax-direction="down" data-parallax-speed="7"></div>
        
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-theme/40 to-transparent opacity-60"></div>
        
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto perspective-section">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 uppercase">
              Jiu-Jitsu <span className="text-theme animated-gradient">Nutrition</span>
            </h1>
            <p className="text-muted-foreground">Track and optimize your nutrition to fuel your jiu-jitsu performance and recovery.</p>
          </div>
          
          <Tabs defaultValue="overview" className="w-full perspective-section">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="macros">Macros</TabsTrigger>
              <TabsTrigger value="plans">Meal Plans</TabsTrigger>
              <TabsTrigger value="supplements">Supplements</TabsTrigger>
              <TabsTrigger value="hydration">Hydration</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="perspective-section stagger-container">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                <div className="stagger-item">
                  <NutritionCard 
                    title="Macro Tracking" 
                    description="Balance your proteins, carbs, and fats for optimal performance." 
                    icon={Apple} 
                  />
                </div>
                <div className="stagger-item">
                  <NutritionCard 
                    title="Pre/Post Workout Nutrition" 
                    description="Fuel properly before and after training sessions." 
                    icon={Utensils} 
                  />
                </div>
                <div className="stagger-item">
                  <NutritionCard 
                    title="Weight Management" 
                    description="Maintain or adjust your weight for competition classes." 
                    icon={Vegan} 
                  />
                </div>
                <div className="stagger-item">
                  <NutritionCard 
                    title="Competition Nutrition" 
                    description="Specialized nutrition plans for competition preparation." 
                    icon={Carrot} 
                  />
                </div>
                <div className="stagger-item">
                  <NutritionCard 
                    title="Meal Preparation" 
                    description="Time-saving meal prep strategies for busy athletes." 
                    icon={CookingPot} 
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="macros">
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold mb-4">Macro Nutrient Tracking</h3>
                <p className="text-muted-foreground mb-6">Coming soon: Track your protein, carbohydrates, and fats to optimize your jiu-jitsu performance.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="plans">
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold mb-4">Custom Meal Plans</h3>
                <p className="text-muted-foreground mb-6">Coming soon: Personalized meal plans based on your training schedule and goals.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="supplements">
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold mb-4">Supplement Guide</h3>
                <p className="text-muted-foreground mb-6">Coming soon: Evidence-based supplement recommendations for jiu-jitsu athletes.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="hydration">
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold mb-4">Hydration Tracking</h3>
                <p className="text-muted-foreground mb-6">Coming soon: Monitor your water intake and electrolyte balance to optimize performance.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </MainLayout>
  );
};

export default Nutrition;
