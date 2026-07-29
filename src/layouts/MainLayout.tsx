
import React, { useEffect } from 'react';
import { NavBar } from '@/components/NavBar';
import { useLocation, Link } from 'react-router';
import { setupScrollAnimations } from '@/lib/animations';
import { BJJTriangleLogo } from '@/components/BJJTriangleLogo';

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

      {/* BJJ-Branded Footer */}
      <footer className="py-12 md:py-16 border-t border-border/30">
        <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
          {/* Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
            {/* Brand Column */}
            <div className="text-center md:text-left">
              <Link to="/" className="inline-flex items-center gap-2 mb-4">
                <BJJTriangleLogo size="md" variant="default" />
                <div className="flex flex-col">
                  <span className="text-base tracking-extra-wide uppercase font-light">
                    Master JJ
                  </span>
                  <span className="text-[9px] tracking-wider uppercase text-muted-foreground">
                    Brazilian Jiu-Jitsu
                  </span>
                </div>
              </Link>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto md:mx-0">
                Master the gentle art. Train smarter, progress faster, achieve excellence.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h4 className="text-xs tracking-extra-wide uppercase mb-4">Training</h4>
              <nav className="flex flex-col gap-2">
                <Link to="/techniques" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Technique Library
                </Link>
                <Link to="/techniques/planner" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Training Planner
                </Link>
                <Link to="/fitness" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Fitness
                </Link>
                <Link to="/nutrition" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Nutrition
                </Link>
              </nav>
            </div>

            {/* Belt Progression */}
            <div className="text-center md:text-left">
              <h4 className="text-xs tracking-extra-wide uppercase mb-4">Belt Ranks</h4>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="w-4 h-2 bg-bjj-white rounded-sm"></span>
                  White
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="w-4 h-2 bg-bjj-blue rounded-sm"></span>
                  Blue
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="w-4 h-2 bg-bjj-purple rounded-sm"></span>
                  Purple
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="w-4 h-2 bg-bjj-brown rounded-sm"></span>
                  Brown
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="w-4 h-2 bg-bjj-black rounded-sm"></span>
                  Black
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-4 italic">
                "The triangle represents the perfect base - mind, body, spirit."
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground tracking-wide">
              {new Date().getFullYear()} Master JJ. All Rights Reserved.
            </p>
            <p className="text-xs text-muted-foreground tracking-wide">
              In the Gracie Tradition
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
