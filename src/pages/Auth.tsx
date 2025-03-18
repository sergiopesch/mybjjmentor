
import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { AuthForm } from '@/components/AuthForm';

const Auth = () => {
  return (
    <MainLayout>
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-bjj-blue/5 to-transparent -z-10"></div>
        
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-center">
              Join BJJ Coach
            </h1>
            <p className="text-muted-foreground text-center mb-8">
              Sign in to track your progress, save favorite techniques, and customize your BJJ training plan.
            </p>
            
            <AuthForm />
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Auth;
