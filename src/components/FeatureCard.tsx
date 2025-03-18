
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
      "glass-card p-6 transition-all duration-300 hover:border-theme/50 group",
      className
    )}>
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-theme/10 mb-4 group-hover:bg-theme/20 transition-colors">
        <Icon className="h-6 w-6 text-theme" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
