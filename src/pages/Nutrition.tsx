
import React, { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Apple, 
  Carrot, 
  Utensils, 
  Vegan, 
  CookingPot, 
  BarChart3, 
  CalendarDays,
  Droplets,
  ShoppingBag
} from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample macro data
const macroData = [
  {
    name: 'Mon',
    protein: 120,
    carbs: 150,
    fat: 60,
  },
  {
    name: 'Tue',
    protein: 110,
    carbs: 140,
    fat: 65,
  },
  {
    name: 'Wed',
    protein: 130,
    carbs: 120,
    fat: 55,
  },
  {
    name: 'Thu',
    protein: 115,
    carbs: 130,
    fat: 60,
  },
  {
    name: 'Fri',
    protein: 125,
    carbs: 110,
    fat: 50,
  },
  {
    name: 'Sat',
    protein: 140,
    carbs: 180,
    fat: 70,
  },
  {
    name: 'Sun',
    protein: 100,
    carbs: 100,
    fat: 45,
  },
];

// Sample meal plans
const mealPlans = [
  {
    id: 1,
    title: "Competition Prep",
    description: "High protein, moderate carbs for peak performance",
    meals: [
      { name: "Breakfast", content: "Protein oats with banana and berries" },
      { name: "Lunch", content: "Grilled chicken breast with quinoa and vegetables" },
      { name: "Pre-Training", content: "Rice cakes with almond butter" },
      { name: "Post-Training", content: "Protein shake with quick-digesting carbs" },
      { name: "Dinner", content: "Salmon with sweet potatoes and steamed greens" }
    ]
  },
  {
    id: 2,
    title: "Recovery Focus",
    description: "Anti-inflammatory foods to support muscle recovery",
    meals: [
      { name: "Breakfast", content: "Green smoothie with protein powder and avocado" },
      { name: "Lunch", content: "Turkey and avocado wrap with leafy greens" },
      { name: "Snack", content: "Greek yogurt with berries and honey" },
      { name: "Dinner", content: "Grass-fed beef with roasted vegetables and turmeric rice" }
    ]
  }
];

// Sample supplements
const supplements = [
  {
    id: 1,
    name: "Protein Powder",
    timing: "Post-workout",
    benefits: "Muscle recovery and growth",
    dosage: "1-2 scoops (25-50g)",
    evidence: "Strong scientific support for muscle protein synthesis"
  },
  {
    id: 2,
    name: "Creatine Monohydrate",
    timing: "Daily (5g)",
    benefits: "Increased power output and recovery",
    dosage: "5g daily",
    evidence: "One of the most researched and proven supplements"
  },
  {
    id: 3,
    name: "Fish Oil (Omega-3)",
    timing: "With meals",
    benefits: "Reduced inflammation, joint health",
    dosage: "1-3g combined EPA/DHA daily",
    evidence: "Strong evidence for anti-inflammatory effects"
  },
  {
    id: 4,
    name: "Vitamin D3",
    timing: "With fatty meal",
    benefits: "Immune function, bone health",
    dosage: "1000-5000 IU daily",
    evidence: "Essential for athletes, especially with limited sun exposure"
  }
];

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

const MacroTracker = () => {
  // Daily targets
  const targets = {
    calories: 2500,
    protein: 180, // in grams
    carbs: 250,   // in grams
    fat: 70       // in grams
  };
  
  // Current progress (example values)
  const current = {
    calories: 1850,
    protein: 135,
    carbs: 180,
    fat: 50
  };
  
  // Calculate percentages
  const percentages = {
    calories: (current.calories / targets.calories) * 100,
    protein: (current.protein / targets.protein) * 100,
    carbs: (current.carbs / targets.carbs) * 100,
    fat: (current.fat / targets.fat) * 100
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Today's Nutrition</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add Meal</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Log Your Meal</DialogTitle>
              <DialogDescription>
                Enter the nutritional information for your meal.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="meal" className="text-right">
                  Meal
                </Label>
                <Input
                  id="meal"
                  placeholder="e.g. Lunch"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="calories" className="text-right">
                  Calories
                </Label>
                <Input
                  id="calories"
                  type="number"
                  placeholder="0"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="protein" className="text-right">
                  Protein (g)
                </Label>
                <Input
                  id="protein"
                  type="number"
                  placeholder="0"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="carbs" className="text-right">
                  Carbs (g)
                </Label>
                <Input
                  id="carbs"
                  type="number"
                  placeholder="0"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fat" className="text-right">
                  Fat (g)
                </Label>
                <Input
                  id="fat"
                  type="number"
                  placeholder="0"
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Save Meal</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Daily Macros</CardTitle>
            <CardDescription>
              Track your protein, carbs, and fat intake
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Calories</Label>
                <span className="text-sm">{current.calories} / {targets.calories} kcal</span>
              </div>
              <Progress value={percentages.calories} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Protein</Label>
                <span className="text-sm">{current.protein}g / {targets.protein}g</span>
              </div>
              <Progress value={percentages.protein} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Carbohydrates</Label>
                <span className="text-sm">{current.carbs}g / {targets.carbs}g</span>
              </div>
              <Progress value={percentages.carbs} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Fat</Label>
                <span className="text-sm">{current.fat}g / {targets.fat}g</span>
              </div>
              <Progress value={percentages.fat} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Weekly Overview</CardTitle>
            <CardDescription>
              Track your macro consistency over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={macroData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="protein" fill="#3b82f6" name="Protein" />
                  <Bar dataKey="carbs" fill="#10b981" name="Carbs" />
                  <Bar dataKey="fat" fill="#f59e0b" name="Fat" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const MealPlans = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Training Meal Plans</h3>
        <Button variant="outline">Create New Plan</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mealPlans.map((plan) => (
          <Card key={plan.id}>
            <CardHeader>
              <CardTitle>{plan.title}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {plan.meals.map((meal, index) => (
                  <div key={index} className="border-b pb-2 last:border-b-0 last:pb-0">
                    <div className="font-medium">{meal.name}</div>
                    <div className="text-sm text-muted-foreground">{meal.content}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const SupplementGuide = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Evidence-Based Supplements</h3>
        <Button variant="outline">Learn More</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {supplements.map((supplement) => (
          <Card key={supplement.id}>
            <CardHeader>
              <CardTitle>{supplement.name}</CardTitle>
              <CardDescription>Timing: {supplement.timing}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Benefits:</span> {supplement.benefits}
                </div>
                <div>
                  <span className="font-medium">Recommended Dosage:</span> {supplement.dosage}
                </div>
                <div>
                  <span className="font-medium">Evidence:</span> {supplement.evidence}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const HydrationTracker = () => {
  const [waterIntake, setWaterIntake] = useState(3);
  const dailyTarget = 8; // 8 glasses of water
  const percentage = (waterIntake / dailyTarget) * 100;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Hydration Tracker</h3>
        <Button 
          variant="outline"
          onClick={() => setWaterIntake(prev => Math.min(prev + 1, dailyTarget))}
        >
          Log Water Intake
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Daily Water Intake</CardTitle>
          <CardDescription>
            Tracking your hydration for optimal performance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold">{waterIntake}/{dailyTarget}</div>
                  <div className="text-sm text-muted-foreground">glasses</div>
                </div>
              </div>
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-muted stroke-current"
                  strokeWidth="10"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-primary stroke-current"
                  strokeWidth="10"
                  strokeLinecap="round"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                  strokeDasharray={`${percentage * 2.51} 251`}
                  strokeDashoffset="0"
                  transform="rotate(-90 50 50)"
                />
              </svg>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Hydration Tips</h4>
            <ul className="space-y-1 text-sm">
              <li>• Drink 16-20 oz water 2-3 hours before training</li>
              <li>• Sip 7-10 oz water every 20 minutes during training</li>
              <li>• Monitor urine color for hydration status</li>
              <li>• Consider electrolyte drinks for long sessions</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

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
              <span className="text-white">JIU-JITSU</span> <span className="text-theme">NUTRITION</span>
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
