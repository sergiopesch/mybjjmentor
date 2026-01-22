
import React, { useEffect } from 'react';
import { NavBar } from '@/components/NavBar';
import { useLocation } from 'react-router-dom';
import { setupScrollAnimations } from '@/lib/animations';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Setup scroll animations
  useEffect(() => {
    const cleanup = setupScrollAnimations();
    return cleanup;
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <NavBar />

      <main className="flex-grow">
        <div key={location.pathname} className="animate-fade-in">
          {children}
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="py-12 border-t border-border/30">
        <div className="container max-w-7xl px-6 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <p className="text-sm tracking-extra-wide uppercase font-light">
              Master
            </p>

            {/* Copyright */}
            <p className="text-xs text-muted-foreground tracking-wide">
              {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
