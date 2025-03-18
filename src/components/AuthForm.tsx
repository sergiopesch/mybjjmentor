
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { SocialButton } from './auth/SocialButton';
import { AuthErrorAlert } from './auth/AuthErrorAlert';
import { AuthFooter } from './auth/AuthFooter';

export const AuthForm = () => {
  const [loading, setLoading] = useState<{[key: string]: boolean}>({
    google: false,
    twitter: false
  });
  const [error, setError] = useState<string | null>(null);

  const handleSocialSignIn = async (provider: 'google' | 'twitter') => {
    setLoading(prev => ({ ...prev, [provider]: true }));
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;
      
      toast.success(`Redirecting to ${provider} login...`);
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
      toast.error('Authentication failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(prev => ({ ...prev, [provider]: false }));
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sign In / Sign Up</CardTitle>
        <CardDescription>
          Connect with your Google or X account to access BJJ Coach
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <AuthErrorAlert error={error} />
        
        <div className="flex flex-col space-y-4">
          <SocialButton 
            provider="google" 
            icon={Mail} 
            loading={loading.google} 
            onClick={() => handleSocialSignIn('google')} 
          />
          
          <SocialButton 
            provider="twitter" 
            icon={X} 
            loading={loading.twitter} 
            onClick={() => handleSocialSignIn('twitter')} 
          />
        </div>
      </CardContent>
      
      <AuthFooter />
    </Card>
  );
};
