
import React from 'react';
import { NavBar } from '@/components/NavBar';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Implement fade-in animation for sections
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      fadeElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-theme-dark text-theme-light overflow-x-hidden">
      <NavBar />
      <main className="flex-grow relative">
        {/* Background image overlay */}
        <div className="absolute inset-0 bg-dark-clouds bg-cover bg-center bg-no-repeat opacity-50 pointer-events-none -z-10"></div>
        {children}
      </main>
      <footer className="py-8 bg-black/50 backdrop-blur-sm border-t border-white/10">
        <div className="container max-w-6xl px-4 mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} BJJ<span className="text-theme">Coach</span>. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
