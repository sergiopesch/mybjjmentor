
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

  // Enhanced intersection observer for more sophisticated reveal animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add staggered animations based on data attribute
          const delay = entry.target.getAttribute('data-delay') || '0';
          // Fix: Use HTMLElement instead of Element to access style property
          if (entry.target instanceof HTMLElement) {
            entry.target.style.transitionDelay = `${delay}ms`;
          }
          entry.target.classList.add('appear');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Target all elements with fade-in classes
    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach((element, index) => {
      // Add staggered delay to elements
      element.setAttribute('data-delay', `${index * 100}`);
      observer.observe(element);
    });

    // Add special animations for specific elements
    const slideElements = document.querySelectorAll('.slide-in-section');
    slideElements.forEach((element, index) => {
      element.setAttribute('data-delay', `${index * 150}`);
      observer.observe(element);
    });

    // Add 3D rotate animations
    const rotateElements = document.querySelectorAll('.rotate-in-section');
    rotateElements.forEach((element, index) => {
      element.setAttribute('data-delay', `${index * 120}`);
      observer.observe(element);
    });

    return () => {
      fadeElements.forEach(element => observer.unobserve(element));
      slideElements.forEach(element => observer.unobserve(element));
      rotateElements.forEach(element => observer.unobserve(element));
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-theme-dark text-theme-light overflow-x-hidden">
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
      <footer className="py-8 bg-black/50 backdrop-blur-sm border-t border-white/10">
        <div className="container max-w-6xl px-4 mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} <span className="text-theme">Master</span>. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
