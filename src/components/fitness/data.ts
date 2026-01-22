// Fitness workout data
export const strengthWorkouts = [
  {
    id: 1,
    title: "BJJ Strength Foundations",
    description: "Basic strength workout focused on BJJ-specific movements",
    duration: 45,
    difficulty: "Beginner",
    exercises: [
      { name: "Pull-ups", sets: 3, reps: "8-10", rest: "90 sec" },
      { name: "Push-ups", sets: 3, reps: "15-20", rest: "60 sec" },
      { name: "Bodyweight Squats", sets: 3, reps: "20", rest: "60 sec" },
      { name: "Farmer's Carries", sets: 3, reps: "30 sec", rest: "60 sec" },
      { name: "Plank", sets: 3, reps: "45 sec", rest: "45 sec" }
    ]
  },
  {
    id: 2,
    title: "Grip & Core Power",
    description: "Focus on developing grip strength and core stability",
    duration: 50,
    difficulty: "Intermediate",
    exercises: [
      { name: "Dead Hangs", sets: 4, reps: "30-45 sec", rest: "60 sec" },
      { name: "Towel Pull-ups", sets: 3, reps: "6-8", rest: "90 sec" },
      { name: "Hollow Body Hold", sets: 3, reps: "30 sec", rest: "60 sec" },
      { name: "Russian Twists", sets: 3, reps: "20 each side", rest: "60 sec" },
      { name: "Farmer's Walks", sets: 3, reps: "40 sec", rest: "60 sec" }
    ]
  },
  {
    id: 3,
    title: "Explosive Power",
    description: "Develop power for takedowns and sweeps",
    duration: 55,
    difficulty: "Advanced",
    exercises: [
      { name: "Box Jumps", sets: 4, reps: "10", rest: "90 sec" },
      { name: "Medicine Ball Slams", sets: 4, reps: "12", rest: "90 sec" },
      { name: "Kettlebell Swings", sets: 4, reps: "15", rest: "90 sec" },
      { name: "Explosive Push-ups", sets: 3, reps: "10", rest: "90 sec" },
      { name: "Burpees", sets: 3, reps: "12", rest: "90 sec" }
    ]
  }
];

export const conditioningWorkouts = [
  {
    id: 1,
    title: "BJJ Endurance Circuit",
    description: "Improve your gas tank with BJJ-specific movements",
    duration: 30,
    difficulty: "Intermediate",
    format: "30 seconds work, 15 seconds rest, 3 rounds",
    exercises: ["Technical Stand-ups", "Sprawls", "Shrimping", "Bridge & Roll", "Squat Jumps"]
  },
  {
    id: 2,
    title: "Tabata for Grapplers",
    description: "High-intensity intervals to simulate competition",
    duration: 25,
    difficulty: "Advanced",
    format: "20 seconds work, 10 seconds rest, 8 rounds per exercise",
    exercises: ["Mountain Climbers", "Burpees", "Jump Squats", "Push-ups"]
  }
];

export const flexibilityRoutines = [
  {
    id: 1,
    title: "Hip Mobility Flow",
    description: "Improve hip mobility for guard work",
    duration: 15,
    areas: ["Hips", "Groin", "Lower Back"],
    poses: [
      { name: "Butterfly Stretch", duration: "60 sec" },
      { name: "Pigeon Pose", duration: "60 sec each side" },
      { name: "Lying Figure-4 Stretch", duration: "45 sec each side" },
      { name: "Frog Stretch", duration: "60 sec" },
      { name: "Hip Flexor Stretch", duration: "45 sec each side" }
    ]
  },
  {
    id: 2,
    title: "Upper Body Mobility",
    description: "Improve shoulder and neck mobility",
    duration: 12,
    areas: ["Shoulders", "Neck", "Upper Back"],
    poses: [
      { name: "Cat-Cow", duration: "45 sec" },
      { name: "Thread the Needle", duration: "45 sec each side" },
      { name: "Shoulder Circles", duration: "30 sec each direction" },
      { name: "Wall Angels", duration: "45 sec" },
      { name: "Child's Pose", duration: "60 sec" }
    ]
  }
];

export const recoveryProtocols = [
  {
    id: 1,
    title: "Active Recovery Day",
    description: "Light activity to promote blood flow and recovery",
    activities: [
      { name: "Light Jogging/Walking", duration: "15-20 min" },
      { name: "Dynamic Stretching", duration: "10 min" },
      { name: "Foam Rolling", duration: "10 min" },
      { name: "Light Technical Drilling", duration: "15-20 min" }
    ],
    tips: [
      "Keep heart rate below 140 BPM",
      "Focus on proper breathing",
      "Stay well hydrated throughout"
    ]
  },
  {
    id: 2,
    title: "Full Recovery Protocol",
    description: "Complete rest day protocol",
    activities: [
      { name: "Epsom Salt Bath", duration: "15-20 min" },
      { name: "Foam Rolling", duration: "15 min" },
      { name: "Static Stretching", duration: "15 min" },
      { name: "Sleep", duration: "8-9 hours" }
    ],
    tips: [
      "Focus on protein and anti-inflammatory foods",
      "Hydrate with electrolytes",
      "Prioritize quality sleep"
    ]
  }
];

// Type definitions
export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
}

export interface StrengthWorkout {
  id: number;
  title: string;
  description: string;
  duration: number;
  difficulty: string;
  exercises: Exercise[];
}

export interface ConditioningWorkout {
  id: number;
  title: string;
  description: string;
  duration: number;
  difficulty: string;
  format: string;
  exercises: string[];
}

export interface Pose {
  name: string;
  duration: string;
}

export interface FlexibilityRoutine {
  id: number;
  title: string;
  description: string;
  duration: number;
  areas: string[];
  poses: Pose[];
}

export interface Activity {
  name: string;
  duration: string;
}

export interface RecoveryProtocol {
  id: number;
  title: string;
  description: string;
  activities: Activity[];
  tips: string[];
}
