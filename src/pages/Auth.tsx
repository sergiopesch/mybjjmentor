
import React, { useEffect } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { AuthForm } from '@/components/AuthForm';

const Auth = () => {
  // Setup staggered animations when the component mounts
  useEffect(() => {
    const animateElements = () => {
      const elements = document.querySelectorAll('.auth-animate');
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('appear');
        }, 100 * index);
      });
    };

    animateElements();
  }, []);

  return (
    <MainLayout>
      <section className="pt-40 pb-20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-theme/10 rounded-full filter blur-3xl animate-float opacity-40"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-theme/10 rounded-full filter blur-3xl animate-float opacity-30" style={{ animationDelay: '2s' }}></div>
        
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-center uppercase auth-animate fade-in-section">
              Join <span className="text-theme animated-gradient">Master</span>
            </h1>
            <p className="text-muted-foreground text-center mb-8 auth-animate fade-in-section">
              Sign in to track your progress, save favorite techniques, and customize your BJJ training plan.
            </p>
            
            <div className="auth-animate rotate-in-section">
              <AuthForm />
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Auth;
