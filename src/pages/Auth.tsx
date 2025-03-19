import React, { useEffect } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { AuthForm } from '@/components/AuthForm';
const Auth = () => {
  useEffect(() => {
    // Add the staggered items to appear with a delay
    const staggerContainers = document.querySelectorAll('.stagger-container');
    staggerContainers.forEach(container => {
      const items = container.querySelectorAll('.stagger-item');
      items.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('stagger-appear');
        }, 100 * index + 200); // Base delay of 200ms plus staggered delay
      });
    });

    // Add split text animation to title
    const titleElement = document.querySelector('.auth-title');
    if (titleElement) {
      const text = titleElement.textContent || '';
      titleElement.textContent = '';
      const container = document.createElement('span');
      container.className = 'split-text-container';
      [...text].forEach((letter, i) => {
        const span = document.createElement('span');
        span.className = 'split-letter';
        span.textContent = letter === ' ' ? '\u00A0' : letter;
        span.style.transitionDelay = `${i * 30}ms`;
        container.appendChild(span);
      });
      titleElement.appendChild(container);
      setTimeout(() => {
        container.classList.add('animate');
      }, 200);
    }
  }, []);
  return <MainLayout>
      <section className="pt-40 pb-20 relative overflow-hidden">
        {/* Enhanced animated background elements matching the site style */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-theme/20 rounded-full filter blur-3xl opacity-50 parallax-element" data-parallax-direction="up" data-parallax-speed="10"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-theme/20 rounded-full filter blur-3xl opacity-40 parallax-element" data-parallax-direction="down" data-parallax-speed="7"></div>
        
        {/* Subtle gradient line matching the Hero section */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-theme/40 to-transparent opacity-60"></div>
        
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-center uppercase auth-title">
              Join <span className="text-theme animated-gradient">Master</span>
            </h1>
            <p className="text-muted-foreground text-center mb-8 perspective-section">Sign in to track your progress, save favourite  techniques, and customise  your Jiu-Jitsu training plan.</p>
            
            <div className="perspective-section stagger-container">
              <div className="stagger-item glass-card p-1">
                <AuthForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>;
};
export default Auth;