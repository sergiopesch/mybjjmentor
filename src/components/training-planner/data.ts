
import { TemplateSession } from './types';

export const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
export const focusAreas = ['Guard Passing', 'Submissions', 'Escapes', 'Takedowns', 'Positional Control'];
export const trainingTypes = ['Drilling', 'Sparring', 'Technique Study', 'Strength & Conditioning'];

export const exampleSessions: TemplateSession[] = [
  {
    title: 'Beginner Guard Fundamentals',
    focus: 'Guard Passing',
    level: 'Beginner',
    duration: 60,
    days: 3,
    items: [
      { id: '1', name: 'Warm-up', duration: 10, type: 'Drilling' },
      { id: '2', name: 'Closed Guard Basics', duration: 20, type: 'Technique Study' },
      { id: '3', name: 'Guard Retention Drills', duration: 15, type: 'Drilling' },
      { id: '4', name: 'Positional Sparring', duration: 15, type: 'Sparring' },
    ],
  },
  {
    title: 'Intermediate Submission Focus',
    focus: 'Submissions',
    level: 'Intermediate',
    duration: 90,
    days: 4,
    items: [
      { id: '1', name: 'Dynamic Warm-up', duration: 10, type: 'Drilling' },
      { id: '2', name: 'Submission Chain Drills', duration: 25, type: 'Drilling' },
      { id: '3', name: 'Technical Sparring', duration: 30, type: 'Sparring' },
      { id: '4', name: 'Submission Analysis', duration: 15, type: 'Technique Study' },
      { id: '5', name: 'Cool Down & Stretching', duration: 10, type: 'Drilling' },
    ],
  },
];
