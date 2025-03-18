
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/AuthProvider';

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'TECHNIQUES', path: '/techniques' },
    { name: 'TRAINING PLANNER', path: '/planner' },
    { name: 'PROGRESS', path: '/progress' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled 
          ? 'bg-black/70 backdrop-blur-lg border-b border-white/10 py-3' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="container max-w-6xl px-4 mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-bold tracking-tight transition-opacity hover:opacity-80 flex items-center"
        >
          <div className="h-8 w-8 rounded-full bg-theme mr-2 flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-theme-dark"></div>
          </div>
          <span className="text-theme">Master</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-medium tracking-wide transition-all hover:text-theme uppercase',
                isActive(link.path)
                  ? 'text-theme'
                  : 'text-muted-foreground'
              )}
            >
              {link.name}
            </Link>
          ))}
          
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-4 border-theme text-theme hover:bg-theme hover:text-white"
            onClick={handleAuthClick}
          >
            <User className="h-4 w-4 mr-2" />
            {user ? 'Sign Out' : 'Sign In'}
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 focus:outline-none text-theme"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'fixed inset-0 bg-black/95 backdrop-blur-lg flex flex-col justify-center items-center md:hidden transition-all duration-300 ease-in-out z-40',
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        )}
      >
        <nav className="flex flex-col items-center space-y-8 p-8">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-lg font-medium uppercase transition-all hover:text-theme',
                isActive(link.path) ? 'text-theme' : 'text-muted-foreground'
              )}
            >
              {link.name}
            </Link>
          ))}
          
          <Button 
            variant="outline"
            onClick={handleAuthClick}
            className="mt-4 border-theme text-theme hover:bg-theme hover:text-white"
          >
            <User className="h-4 w-4 mr-2" />
            {user ? 'Sign Out' : 'Sign In'}
          </Button>
        </nav>
      </div>
    </header>
  );
};
