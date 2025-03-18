
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { SocialButton } from './auth/SocialButton';
import { AuthErrorAlert } from './auth/AuthErrorAlert';
import { AuthFooter } from './auth/AuthFooter';
import { useNavigate } from 'react-router-dom';
import { GoogleIcon } from './auth/GoogleIcon';
import { XIcon } from './auth/XIcon';

export const AuthForm = () => {
  const [loading, setLoading] = useState<{[key: string]: boolean}>({
    google: false,
    twitter: false
  });
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

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
      console.error('Authentication error:', err);
      let errorMessage = err.message || 'Authentication failed. Please try again.';
      
      // Provide more helpful error message for the specific error
      if (err.message.includes('provider is not enabled')) {
        errorMessage = `${provider.charAt(0).toUpperCase() + provider.slice(1)} login is not enabled. Please ask the administrator to enable it in Supabase.`;
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(prev => ({ ...prev, [provider]: false }));
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{isSignUp ? 'Create Account' : 'Sign In'}</CardTitle>
        <CardDescription>
          {isSignUp 
            ? 'Sign up to start tracking your BJJ journey' 
            : 'Sign in with your social account'}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <AuthErrorAlert error={error} />
        
        <div className="flex flex-col space-y-4">
          <SocialButton 
            provider="google" 
            CustomIcon={GoogleIcon}
            loading={loading.google} 
            onClick={() => handleSocialSignIn('google')} 
          />
          
          <SocialButton 
            provider="twitter" 
            CustomIcon={XIcon}
            loading={loading.twitter} 
            onClick={() => handleSocialSignIn('twitter')} 
          />
          
          <div className="text-center text-sm">
            <button 
              type="button" 
              className="text-bjj-blue hover:underline"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
            </button>
          </div>
        </div>
      </CardContent>
      
      <AuthFooter />
    </Card>
  );
};
