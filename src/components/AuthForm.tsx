
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Mail, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const AuthForm = () => {
  const [loading, setLoading] = useState<{[key: string]: boolean}>({
    google: false,
    twitter: false
  });
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
      
      // The user will be redirected to the OAuth provider
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
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="flex flex-col space-y-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => handleSocialSignIn('google')}
            disabled={loading.google}
          >
            <Mail className="mr-2 h-4 w-4" />
            {loading.google ? 'Connecting...' : 'Continue with Google'}
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => handleSocialSignIn('twitter')}
            disabled={loading.twitter}
          >
            <X className="mr-2 h-4 w-4" />
            {loading.twitter ? 'Connecting...' : 'Continue with X'}
          </Button>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        By signing in, you agree to our Terms of Service and Privacy Policy.
      </CardFooter>
    </Card>
  );
};
