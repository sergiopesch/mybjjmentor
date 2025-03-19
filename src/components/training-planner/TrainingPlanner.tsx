
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { PlanDetails } from './PlanDetails';
import { TemplateSelector } from './TemplateSelector';
import { SessionBreakdown } from './SessionBreakdown';
import { TrainingDistribution } from './TrainingDistribution';
import { exampleSessions } from './data';
import { PlanDetails as PlanDetailsType, SessionItem } from './types';

export const TrainingPlanner = () => {
  const { toast } = useToast();

  const [plan, setPlan] = useState<PlanDetailsType>({
    title: '',
    level: 'Beginner',
    focus: 'Guard Passing',
    daysPerWeek: 3,
    sessionDuration: 60,
  });

  const [customPlan, setCustomPlan] = useState<{
    items: SessionItem[];
  }>({
    items: [],
  });

  const [selectedTemplate, setSelectedTemplate] = useState('');

  const addSessionItem = () => {
    const newItem = {
      id: Math.random().toString(36).substring(2, 9),
      name: '',
      duration: 10,
      type: 'Drilling',
    };
    
    setCustomPlan(prev => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  const updateSessionItem = (id: string, field: keyof SessionItem, value: any) => {
    setCustomPlan(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const removeSessionItem = (id: string) => {
    setCustomPlan(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id),
    }));
  };

  const totalDuration = customPlan.items.reduce(
    (total, item) => total + item.duration, 
    0
  );

  const handleSavePlan = () => {
    // Here you would typically save the plan to your state or backend
    toast({
      title: "Training Plan Saved",
      description: `Your ${plan.title || "training plan"} has been saved successfully.`,
    });
  };

  const applyTemplate = (index: number) => {
    const template = exampleSessions[index];
    
    setPlan({
      ...plan,
      title: template.title,
      level: template.level,
      focus: template.focus,
      daysPerWeek: template.days,
      sessionDuration: template.duration,
    });
    
    setCustomPlan({
      items: [...template.items],
    });
    
    setSelectedTemplate('');
  };

  return (
    <section className="py-12">
      <div className="container max-w-6xl px-4 mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Training Planner</h2>
          <p className="text-muted-foreground">
            Create a customized BJJ training plan based on your skill level and goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <PlanDetails plan={plan} setPlan={setPlan} />
            <TemplateSelector 
              exampleSessions={exampleSessions}
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
              applyTemplate={applyTemplate}
            />
          </div>

          <div className="lg:col-span-8">
            <SessionBreakdown 
              customPlan={customPlan}
              addSessionItem={addSessionItem}
              updateSessionItem={updateSessionItem}
              removeSessionItem={removeSessionItem}
              totalDuration={totalDuration}
              planDuration={plan.sessionDuration}
              handleSavePlan={handleSavePlan}
            />
            
            <TrainingDistribution 
              items={customPlan.items} 
              totalDuration={totalDuration} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};
