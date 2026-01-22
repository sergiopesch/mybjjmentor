
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { BJJTriangleLogo } from './BJJTriangleLogo';

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Techniques', path: '/techniques' },
    { name: 'Fitness', path: '/fitness' },
    { name: 'Nutrition', path: '/nutrition' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const handleAuthClick = async () => {
    if (user) {
      await signOut();
      navigate('/');
    } else {
      navigate('/auth');
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-border/50'
          : 'bg-transparent'
      )}
    >
      <div className="container max-w-7xl px-6 mx-auto">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-70"
          >
            <BJJTriangleLogo size="sm" variant="default" animated />
            <div className="flex flex-col">
              <span className="text-base tracking-extra-wide uppercase font-light leading-none">
                Master JJ
              </span>
              <span className="text-[9px] tracking-wider uppercase text-muted-foreground hidden sm:block">
                Brazilian Jiu-Jitsu
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-xs tracking-extra-wide uppercase transition-all duration-300 editorial-underline',
                  isActive(link.path)
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={handleAuthClick}
              className="text-xs tracking-extra-wide uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 editorial-underline"
            >
              {user ? 'Sign Out' : 'Sign In'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -mr-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-5 w-5" strokeWidth={1} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-background z-40 md:hidden transition-all duration-500',
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="flex flex-col items-center justify-center h-full">
          {/* Mobile Logo */}
          <div
            className={cn(
              'mb-12 transition-all duration-500',
              isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <BJJTriangleLogo size="xl" variant="gradient" />
            <p className="text-xs tracking-ultra-wide uppercase text-muted-foreground text-center mt-4">
              Mind - Body - Spirit
            </p>
          </div>
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-2xl font-serif tracking-wide transition-all duration-500',
                  isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
                  isActive(link.path)
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
                style={{
                  transitionDelay: isOpen ? `${index * 100}ms` : '0ms'
                }}
              >
                {link.name}
              </Link>
            ))}

            <div
              className={cn(
                'pt-8 border-t border-border/30 mt-4 transition-all duration-500',
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
              style={{
                transitionDelay: isOpen ? `${navLinks.length * 100}ms` : '0ms'
              }}
            >
              <button
                onClick={handleAuthClick}
                className="text-sm tracking-extra-wide uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                {user ? 'Sign Out' : 'Sign In'}
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
