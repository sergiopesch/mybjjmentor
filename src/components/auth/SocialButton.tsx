
import React from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface SocialButtonProps {
  provider: 'google' | 'twitter';
  icon: LucideIcon;
  loading: boolean;
  onClick: () => void;
}

export const SocialButton = ({ 
  provider, 
  icon: Icon, 
  loading, 
  onClick 
}: SocialButtonProps) => {
  const providerName = provider === 'twitter' ? 'X' : 'Google';
  
  return (
    <Button 
      variant="outline" 
      className="w-full"
      onClick={onClick}
      disabled={loading}
    >
      <Icon className="mr-2 h-4 w-4" />
      {loading ? 'Connecting...' : `Continue with ${providerName}`}
    </Button>
  );
};
