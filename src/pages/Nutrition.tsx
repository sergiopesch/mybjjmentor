
import React, { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BJJTriangleLogo } from '@/components/BJJTriangleLogo';
import { Apple, Carrot, Utensils, Vegan, CookingPot, Plus, Droplets } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { macroData, mealPlans, supplements } from '@/components/nutrition/data';

const NutritionCard = ({
  title,
  description,
  icon: Icon
}: {
  title: string;
  description: string;
  icon: React.ElementType;
}) => (
  <div className="group p-6 sm:p-8 border border-border/30 transition-all duration-500 hover:border-primary/30 h-full">
    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary mb-4 sm:mb-6 group-hover:text-primary/80 transition-colors duration-500" strokeWidth={1.5} />
    <h3 className="font-serif text-lg sm:text-xl font-light mb-2 sm:mb-3">{title}</h3>
    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{description}</p>
  </div>
);

const MacroTracker = () => {
  const targets = {
    calories: 2500,
    protein: 180,
    carbs: 250,
    fat: 70
  };

  const current = {
    calories: 1850,
    protein: 135,
    carbs: 180,
    fat: 50
  };

  const macros = [
    { name: 'Calories', current: current.calories, target: targets.calories, unit: 'kcal' },
    { name: 'Protein', current: current.protein, target: targets.protein, unit: 'g' },
    { name: 'Carbohydrates', current: current.carbs, target: targets.carbs, unit: 'g' },
    { name: 'Fat', current: current.fat, target: targets.fat, unit: 'g' },
  ];

  return (
    <div className="space-y-8 sm:space-y-12">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h3 className="font-serif text-xl sm:text-2xl font-light">Today's Nutrition</h3>
        <Dialog>
          <DialogTrigger asChild>
            <button className="text-xs tracking-extra-wide uppercase text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 self-start">
              <Plus className="h-4 w-4" strokeWidth={1.5} />
              Add Meal
            </button>
          </DialogTrigger>
          <DialogContent className="bg-background border-border/50 mx-4">
            <DialogHeader>
              <DialogTitle className="font-serif text-lg sm:text-xl font-light">Log Your Meal</DialogTitle>
              <DialogDescription>Enter the nutritional information for your meal.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {['Meal Name', 'Calories', 'Protein (g)', 'Carbs (g)', 'Fat (g)'].map((label) => (
                <div key={label} className="space-y-2">
                  <Label className="text-xs sm:text-sm text-muted-foreground">{label}</Label>
                  <Input
                    type={label === 'Meal Name' ? 'text' : 'number'}
                    placeholder={label === 'Meal Name' ? 'e.g. Pre-Training Meal' : '0'}
                    className="bg-transparent border-border/50 focus:border-primary"
                  />
                </div>
              ))}
            </div>
            <button className="w-full py-3 border border-primary/30 text-xs tracking-extra-wide uppercase hover:bg-primary/10 transition-colors">
              Save Meal
            </button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        {/* Daily Macros */}
        <div className="border border-border/30 p-6 sm:p-8">
          <h4 className="font-serif text-base sm:text-lg font-light mb-6 sm:mb-8">Daily Macros</h4>
          <div className="space-y-4 sm:space-y-6">
            {macros.map((macro) => (
              <div key={macro.name}>
                <div className="flex justify-between mb-2 text-xs sm:text-sm">
                  <span>{macro.name}</span>
                  <span className="text-muted-foreground">
                    {macro.current} / {macro.target} {macro.unit}
                  </span>
                </div>
                <div className="h-1.5 bg-border/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary/60 rounded-full transition-all duration-500"
                    style={{ width: `${(macro.current / macro.target) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Overview */}
        <div className="border border-border/30 p-6 sm:p-8">
          <h4 className="font-serif text-base sm:text-lg font-light mb-6 sm:mb-8">Weekly Overview</h4>
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={macroData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.3)" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border)/0.5)',
                    borderRadius: '0',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="protein" fill="hsl(var(--primary))" name="Protein" />
                <Bar dataKey="carbs" fill="hsl(var(--primary)/0.6)" name="Carbs" />
                <Bar dataKey="fat" fill="hsl(var(--primary)/0.3)" name="Fat" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const MealPlans = () => (
  <div className="space-y-8 sm:space-y-12">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <h3 className="font-serif text-xl sm:text-2xl font-light">Training Meal Plans</h3>
      <button className="text-xs tracking-extra-wide uppercase text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 self-start">
        <Plus className="h-4 w-4" strokeWidth={1.5} />
        Create Plan
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/30">
      {mealPlans.map((plan) => (
        <div key={plan.id} className="bg-background border border-border/30 p-6 sm:p-8 hover:border-primary/20 transition-colors">
          <h4 className="font-serif text-base sm:text-lg font-light mb-2">{plan.title}</h4>
          <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">{plan.description}</p>
          <div className="space-y-3 sm:space-y-4">
            {plan.meals.map((meal, index) => (
              <div key={index} className="py-2 sm:py-3 border-b border-border/30 last:border-b-0">
                <p className="font-medium text-xs sm:text-sm mb-1">{meal.name}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">{meal.content}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SupplementGuide = () => (
  <div className="space-y-8 sm:space-y-12">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <h3 className="font-serif text-xl sm:text-2xl font-light">Evidence-Based Supplements</h3>
      <button className="text-xs tracking-extra-wide uppercase text-muted-foreground hover:text-primary transition-colors self-start">
        Learn More
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/30">
      {supplements.map((supplement) => (
        <div key={supplement.id} className="bg-background border border-border/30 p-6 sm:p-8 hover:border-primary/20 transition-colors">
          <h4 className="font-serif text-base sm:text-lg font-light mb-2">{supplement.name}</h4>
          <p className="text-[10px] sm:text-xs text-primary mb-4 sm:mb-6">Timing: {supplement.timing}</p>
          <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
            <div>
              <span className="text-muted-foreground">Benefits:</span>{' '}
              <span>{supplement.benefits}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Dosage:</span>{' '}
              <span>{supplement.dosage}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Evidence:</span>{' '}
              <span>{supplement.evidence}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const HydrationTracker = () => {
  const [waterIntake, setWaterIntake] = useState(3);
  const dailyTarget = 8;
  const percentage = (waterIntake / dailyTarget) * 100;

  return (
    <div className="space-y-8 sm:space-y-12">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h3 className="font-serif text-xl sm:text-2xl font-light">Hydration</h3>
        <button
          onClick={() => setWaterIntake((prev) => Math.min(prev + 1, dailyTarget))}
          className="text-xs tracking-extra-wide uppercase text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 self-start"
        >
          <Droplets className="h-4 w-4" strokeWidth={1.5} />
          Log Water
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        {/* Water Intake Visual */}
        <div className="border border-border/30 p-6 sm:p-8 flex flex-col items-center justify-center">
          <div className="relative w-36 h-36 sm:w-48 sm:h-48 mb-4 sm:mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-serif font-light text-primary">{waterIntake}/{dailyTarget}</p>
                <p className="text-[10px] sm:text-xs tracking-extra-wide uppercase text-muted-foreground mt-1">glasses</p>
              </div>
            </div>
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                className="stroke-border/30"
                strokeWidth="2"
                fill="transparent"
                r="45"
                cx="50"
                cy="50"
              />
              <circle
                className="stroke-primary/70 transition-all duration-500"
                strokeWidth="2"
                strokeLinecap="round"
                fill="transparent"
                r="45"
                cx="50"
                cy="50"
                strokeDasharray={`${percentage * 2.83} 283`}
              />
            </svg>
          </div>
        </div>

        {/* Hydration Tips */}
        <div className="border border-border/30 p-6 sm:p-8">
          <h4 className="font-serif text-base sm:text-lg font-light mb-4 sm:mb-6">Hydration for Grapplers</h4>
          <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="text-primary">01</span>
              <span>Drink 16-20 oz water 2-3 hours before training</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">02</span>
              <span>Sip 7-10 oz water every 20 minutes during training</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">03</span>
              <span>Monitor urine color for hydration status</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">04</span>
              <span>Add electrolytes for sessions over 90 minutes</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const Nutrition = () => {
  return (
    <MainLayout>
      <section className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24">
        <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
          {/* Page Header */}
          <div className="max-w-2xl mb-12 sm:mb-16 md:mb-24">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <BJJTriangleLogo size="sm" variant="gradient" />
              <p className="text-[10px] sm:text-xs tracking-ultra-wide uppercase text-primary">
                Fighter Nutrition
              </p>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4 sm:mb-6">
              Fuel Your Training
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Optimize your nutrition for peak mat performance. From pre-training fuel to
              competition weight management in the Jiu-Jitsu tradition.
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-transparent border-b border-border/30 rounded-none h-auto p-0 mb-8 sm:mb-12 flex flex-wrap gap-0">
              {['overview', 'macros', 'plans', 'supplements', 'hydration'].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs tracking-extra-wide uppercase"
                >
                  {tab === 'plans' ? 'Meal Plans' : tab}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30">
                {[
                  { title: 'Macro Tracking', description: 'Balance protein, carbs, and fats for optimal recovery and energy during training.', icon: Apple },
                  { title: 'Pre/Post Training', description: 'Fuel properly before rolling and optimize recovery meals after intense sessions.', icon: Utensils },
                  { title: 'Weight Management', description: 'Cut or maintain weight strategically for IBJJF competition weight classes.', icon: Vegan },
                  { title: 'Competition Prep', description: 'Specialized nutrition protocols for tournament week and same-day fueling.', icon: Carrot },
                  { title: 'Meal Preparation', description: 'Time-saving meal prep strategies for busy grapplers training twice a day.', icon: CookingPot },
                ].map((item, index) => (
                  <div key={index} className="bg-background">
                    <NutritionCard {...item} />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="macros">
              <MacroTracker />
            </TabsContent>

            <TabsContent value="plans">
              <MealPlans />
            </TabsContent>

            <TabsContent value="supplements">
              <SupplementGuide />
            </TabsContent>

            <TabsContent value="hydration">
              <HydrationTracker />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </MainLayout>
  );
};

export default Nutrition;
