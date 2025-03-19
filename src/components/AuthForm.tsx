
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { SocialButton } from './auth/SocialButton';
import { AuthErrorAlert } from './auth/AuthErrorAlert';
import { useNavigate } from 'react-router-dom';
import { GoogleIcon } from './auth/GoogleIcon';
import { XIcon } from './auth/XIcon';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';

export const AuthForm = () => {
  const [loading, setLoading] = useState<{[key: string]: boolean}>({
    google: false,
    twitter: false,
    email: false
  });
  const [view, setView] = useState<'signin' | 'signup' | 'forgot-password'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
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

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, email: true }));
    setError(null);
    
    try {
      let data, error;
      
      if (view === 'signin') {
        ({ data, error } = await supabase.auth.signInWithPassword({
          email, password
        }));
      } else if (view === 'signup') {
        ({ data, error } = await supabase.auth.signUp({
          email, password, 
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`
          }
        }));
      } else {
        ({ data, error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/callback`
        }));
      }

      if (error) throw error;
      
      if (view === 'forgot-password') {
        toast.success("Check your email for a password reset link");
      } else if (view === 'signup') {
        toast.success("Check your email to confirm your account");
      } else {
        toast.success("Successfully signed in!");
        navigate('/');
      }
    } catch (err: any) {
      console.error('Authentication error:', err);
      setError(err.message || 'Authentication failed. Please try again.');
      toast.error(err.message || 'Authentication failed');
    } finally {
      setLoading(prev => ({ ...prev, email: false }));
    }
  };

  return (
    <Card className="border-theme/10 bg-black/30 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl text-center">
          {view === 'signin' ? 'Sign In' : view === 'signup' ? 'Create Account' : 'Reset Password'}
        </CardTitle>
        <CardDescription className="text-center">
          {view === 'signin' 
            ? 'Sign in with your account or social providers' 
            : view === 'signup'
            ? 'Create an account to track your BJJ journey'
            : 'Enter your email to receive a reset link'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <AuthErrorAlert error={error} />
        
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              type="email" 
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-theme/20 focus-visible:ring-theme"
            />
          </div>
          
          {view !== 'forgot-password' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {view === 'signin' && (
                  <button
                    type="button"
                    onClick={() => setView('forgot-password')}
                    className="text-xs text-theme hover:text-theme/80 underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <Input 
                id="password"
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-theme/20 focus-visible:ring-theme"
              />
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full bg-theme hover:bg-theme/90 text-white"
            disabled={loading.email}
          >
            {loading.email 
              ? 'Processing...' 
              : view === 'signin' 
                ? 'Sign In' 
                : view === 'signup' 
                  ? 'Create Account' 
                  : 'Send Reset Link'}
          </Button>
        </form>
        
        {view !== 'forgot-password' && (
          <>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-theme/10"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2">
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
            </div>
          </>
        )}
      </CardContent>
      
      <CardFooter>
        <div className="text-center w-full text-sm">
          {view === 'signin' ? (
            <p>
              Don't have an account?{' '}
              <button 
                type="button" 
                onClick={() => setView('signup')}
                className="text-theme hover:text-theme/80 underline-offset-4 hover:underline font-medium"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button 
                type="button" 
                onClick={() => setView('signin')}
                className="text-theme hover:text-theme/80 underline-offset-4 hover:underline font-medium"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
