
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
      "glass-card p-6 rounded-lg transition-all duration-300 hover:border-theme/50 group hover:shadow-lg relative overflow-hidden h-full",
      className
    )}>
      {/* Subtle gradient background that appears on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-theme/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
      
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-theme/10 mb-4 group-hover:bg-theme/20 transition-colors relative">
        <Icon className="h-6 w-6 text-theme group-hover:scale-110 transition-transform duration-300" />
      </div>
      <h3 className="text-xl font-semibold mb-2 group-hover:text-theme/90 transition-colors">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
