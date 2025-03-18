
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

export const FeatureCard = ({ title, description, icon: Icon, className }: FeatureCardProps) => {
  return (
    <div className={cn(
      "glass-card p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
      className
    )}>
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-bjj-blue/10 mb-4">
        <Icon className="h-6 w-6 text-bjj-blue" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
