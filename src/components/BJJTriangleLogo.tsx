
import React from 'react';
import { cn } from '@/lib/utils';

interface BJJTriangleLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'filled' | 'gradient';
  animated?: boolean;
}

export const BJJTriangleLogo = ({
  className,
  size = 'md',
  variant = 'default',
  animated = false
}: BJJTriangleLogoProps) => {
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn(
        sizeMap[size],
        animated && 'transition-transform duration-300 hover:scale-110',
        className
      )}
      aria-label="BJJ Triangle - Mind, Body, Spirit"
    >
      <defs>
        <linearGradient id="bjjGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--accent))" />
        </linearGradient>
      </defs>

      {/* Outer triangle - represents the complete practitioner */}
      <polygon
        points="50,8 92,85 8,85"
        fill={variant === 'filled' ? 'hsl(var(--primary))' : 'none'}
        stroke={variant === 'gradient' ? 'url(#bjjGradient)' : 'currentColor'}
        strokeWidth={variant === 'filled' ? '0' : '2.5'}
        className={cn(
          variant !== 'filled' && 'text-foreground',
          animated && 'transition-all duration-500'
        )}
      />

      {/* Inner triangle - represents the core principles */}
      <polygon
        points="50,28 75,70 25,70"
        fill="none"
        stroke={variant === 'gradient' ? 'url(#bjjGradient)' : 'currentColor'}
        strokeWidth="1.5"
        className={cn(
          'text-muted-foreground',
          animated && 'transition-all duration-500'
        )}
        strokeOpacity={variant === 'filled' ? '0.3' : '0.5'}
      />

      {/* Center point - represents unity */}
      <circle
        cx="50"
        cy="54"
        r="3"
        fill={variant === 'gradient' ? 'url(#bjjGradient)' : 'currentColor'}
        className={cn(
          variant !== 'gradient' && 'text-primary',
          animated && 'transition-all duration-500'
        )}
      />
    </svg>
  );
};

// Full logo with text
interface BJJLogoWithTextProps {
  className?: string;
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const BJJLogoWithText = ({
  className,
  showSubtitle = false,
  size = 'md'
}: BJJLogoWithTextProps) => {
  const textSizeMap = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  };

  const subtitleSizeMap = {
    sm: 'text-[8px]',
    md: 'text-[10px]',
    lg: 'text-xs',
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <BJJTriangleLogo size={size} variant="default" animated />
      <div className="flex flex-col">
        <span className={cn(
          'tracking-extra-wide uppercase font-light leading-none',
          textSizeMap[size]
        )}>
          Master JJ
        </span>
        {showSubtitle && (
          <span className={cn(
            'tracking-wider uppercase text-muted-foreground mt-0.5',
            subtitleSizeMap[size]
          )}>
            Brazilian Jiu-Jitsu
          </span>
        )}
      </div>
    </div>
  );
};
