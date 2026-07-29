
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '@/lib/supabase';
import { MainLayout } from '@/layouts/MainLayout';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const AuthCallback = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the session to see if the user is authenticated
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        if (!data.session) {
          // Check for OAuth or email confirmation
          const params = new URLSearchParams(window.location.hash.substring(1));
          const accessToken = params.get('access_token');
          const refreshToken = params.get('refresh_token');
          
          if (accessToken && refreshToken) {
            // Set the session from the URL
            const { error: sessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken
            });
            
            if (sessionError) {
              throw sessionError;
            }
          } else {
            throw new Error('No authentication information found');
          }
        }
        
        // Successfully authenticated
        toast.success('Successfully signed in');
        navigate('/planner');
      } catch (err: any) {
        console.error('Error during authentication:', err);
        setError(err.message || 'Authentication failed');
        toast.error('Authentication failed. Please try again.');
        setTimeout(() => navigate('/auth'), 3000);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <MainLayout>
      <div className="pt-32 pb-12 flex items-center justify-center min-h-[50vh]">
        {error ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Authentication Error</h2>
            <p className="text-muted-foreground">{error}</p>
            <p className="mt-4">Redirecting you back to the login page...</p>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Authentication Successful</h2>
            <p className="text-muted-foreground">Redirecting to your dashboard...</p>
            <div className="mt-6 flex justify-center">
              <Loader2 className="h-16 w-16 text-bjj-blue animate-spin" />
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default AuthCallback;
