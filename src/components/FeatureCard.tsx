
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
    <div
      className={cn(
        'group relative p-8 md:p-10 border border-border/30 transition-all duration-500 h-full',
        'hover:border-border/60 hover:bg-card/30',
        className
      )}
    >
      {/* Icon */}
      <div className="mb-8">
        <Icon
          className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors duration-500"
          strokeWidth={1}
        />
      </div>

      {/* Title */}
      <h3 className="font-serif text-xl md:text-2xl font-light mb-4 tracking-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>

      {/* Hover indicator line */}
      <div className="absolute bottom-0 left-0 h-px bg-foreground/20 w-0 group-hover:w-full transition-all duration-500" />
    </div>
  );
};
