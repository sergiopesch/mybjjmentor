
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Github, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { SocialButton } from './auth/SocialButton';
import { AuthErrorAlert } from './auth/AuthErrorAlert';
import { AuthFooter } from './auth/AuthFooter';
import { useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Create custom X logo component to match latest design
const XLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 4l11.733 16H20L8.267 4H4z" />
    <path d="M4 20h4l6.768-9.328" />
  </svg>
);

// Create custom Google logo component
const GoogleLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12h8" />
    <path d="M12 8v8" />
  </svg>
);

export const AuthForm = () => {
  const [loading, setLoading] = useState<{[key: string]: boolean}>({
    google: false,
    twitter: false,
    github: false,
    email: false
  });
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSocialSignIn = async (provider: 'google' | 'twitter' | 'github') => {
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

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(prev => ({ ...prev, email: true }));
    setError(null);
    
    try {
      let response;
      
      if (isSignUp) {
        response = await supabase.auth.signUp({
          email,
          password: generateSecurePassword(), // Generate a secure random password
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`
          }
        });
      } else {
        response = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`
          }
        });
      }

      if (response.error) throw response.error;
      
      toast.success(
        isSignUp 
          ? 'Check your email for a confirmation link!' 
          : 'Check your email for a magic link!'
      );
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
      toast.error('Authentication failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(prev => ({ ...prev, email: false }));
    }
  };

  // Generate a secure random password
  const generateSecurePassword = (): string => {
    const length = 16;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{isSignUp ? 'Create Account' : 'Sign In'}</CardTitle>
        <CardDescription>
          {isSignUp 
            ? 'Sign up to start tracking your BJJ journey' 
            : 'Sign in with your social account or email'}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <AuthErrorAlert error={error} />
        
        <div className="flex flex-col space-y-4">
          <SocialButton 
            provider="google" 
            icon={GoogleLogo} 
            loading={loading.google} 
            onClick={() => handleSocialSignIn('google')} 
          />
          
          <SocialButton 
            provider="github" 
            icon={Github} 
            loading={loading.github} 
            onClick={() => handleSocialSignIn('github')} 
          />
          
          <SocialButton 
            provider="twitter" 
            icon={XLogo} 
            loading={loading.twitter} 
            onClick={() => handleSocialSignIn('twitter')} 
          />
          
          <div className="relative my-2">
            <Separator className="absolute inset-0 m-auto" />
            <div className="relative flex justify-center">
              <span className="bg-card px-2 text-xs text-muted-foreground">OR</span>
            </div>
          </div>
          
          <form onSubmit={handleEmailSignIn} className="space-y-3">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading.email}
                required
                className="w-full"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={loading.email}
            >
              {loading.email ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending link...
                </>
              ) : (
                <>Continue with Email</>
              )}
            </Button>
          </form>
          
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
