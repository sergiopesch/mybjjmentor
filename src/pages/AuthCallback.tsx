
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { MainLayout } from '@/layouts/MainLayout';

const AuthCallback = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { error } = await supabase.auth.getSession();
      
      if (error) {
        setError(error.message);
        console.error('Error during authentication:', error);
        setTimeout(() => navigate('/auth'), 3000);
      } else {
        navigate('/planner');
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
            <div className="mt-6 w-16 h-16 border-4 border-bjj-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default AuthCallback;
