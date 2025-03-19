
import React from 'react';
import { NavBar } from '@/components/NavBar';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { setupScrollAnimations } from '@/lib/animations';
import { ThemeToggle } from '@/components/ThemeToggle';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Enhanced intersection observer for more sophisticated reveal animations
  useEffect(() => {
    const cleanupAnimations = setupScrollAnimations();
    return cleanupAnimations;
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      <NavBar />
      <main className="flex-grow relative page-transition-wrapper">
        {/* Animated background with parallax effect */}
        <div className="absolute inset-0 bg-dark-clouds bg-cover bg-center bg-no-repeat opacity-50 pointer-events-none -z-10 parallax-bg"></div>
        
        {/* Particle overlay effect */}
        <div className="absolute inset-0 particle-overlay pointer-events-none -z-5"></div>
        
        {/* Animated content wrapper with route transition */}
        <div key={location.pathname} className="animate-page-transition">
          {children}
        </div>
      </main>
      <footer className="py-8 bg-black/50 backdrop-blur-sm border-t border-white/10 dark:border-white/10 light:border-black/10 relative">
        <div className="container max-w-6xl px-4 mx-auto text-center flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} <span className="text-theme">Master</span>. All rights reserved.
          </p>
          <div className="mt-4 sm:mt-0">
            <ThemeToggle />
          </div>
        </div>
      </footer>
    </div>
  );
};
