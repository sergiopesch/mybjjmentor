// Nutrition data

export const macroData = [
  { name: 'Mon', protein: 120, carbs: 150, fat: 60 },
  { name: 'Tue', protein: 110, carbs: 140, fat: 65 },
  { name: 'Wed', protein: 130, carbs: 120, fat: 55 },
  { name: 'Thu', protein: 115, carbs: 130, fat: 60 },
  { name: 'Fri', protein: 125, carbs: 110, fat: 50 },
  { name: 'Sat', protein: 140, carbs: 180, fat: 70 },
  { name: 'Sun', protein: 100, carbs: 100, fat: 45 },
];

export const mealPlans = [
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

export const supplements = [
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

// Type definitions
export interface MacroData {
  name: string;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Meal {
  name: string;
  content: string;
}

export interface MealPlan {
  id: number;
  title: string;
  description: string;
  meals: Meal[];
}

export interface Supplement {
  id: number;
  name: string;
  timing: string;
  benefits: string;
  dosage: string;
  evidence: string;
}
