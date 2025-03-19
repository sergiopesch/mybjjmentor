
import React from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface SocialButtonProps {
  provider: 'google' | 'twitter';
  icon?: LucideIcon;
  CustomIcon?: React.FC<{ className?: string }>;
  loading: boolean;
  onClick: () => void;
}

export const SocialButton = ({ 
  provider, 
  icon: Icon, 
  CustomIcon,
  loading, 
  onClick 
}: SocialButtonProps) => {
  const providerName = provider === 'twitter' ? 'X' : provider.charAt(0).toUpperCase() + provider.slice(1);
  
  return (
    <Button 
      variant="outline" 
      className="w-full hover:bg-accent/10 hover:border-accent/50"
      onClick={onClick}
      disabled={loading}
    >
      {CustomIcon ? (
        <CustomIcon className="mr-2 h-4 w-4" />
      ) : Icon ? (
        <Icon className="mr-2 h-4 w-4" />
      ) : null}
      {loading ? 'Connecting...' : `Continue with ${providerName}`}
    </Button>
  );
};
