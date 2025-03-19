
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
    { name: 'FITNESS', path: '/fitness' },
    { name: 'NUTRITION', path: '/nutrition' },
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
          ? 'bg-background/70 backdrop-blur-lg border-b border-border py-3' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="container max-w-6xl px-4 mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-bold tracking-tight transition-opacity hover:opacity-80 flex items-center"
        >
          {/* Belt-inspired logo */}
          <div className="relative h-8 w-10 mr-2 flex items-center justify-center">
            {/* Black belt with red bar */}
            <div className="absolute h-3 w-full bg-black rounded-sm"></div>
            <div className="absolute h-3 w-6 bg-theme rounded-sm left-1/2 transform -translate-x-1/2"></div>
            {/* White trim on edges */}
            <div className="absolute h-3 w-1 bg-white rounded-sm left-0"></div>
            <div className="absolute h-3 w-1 bg-white rounded-sm right-0"></div>
          </div>
          <span className="text-theme">Master</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-xs font-medium tracking-wide transition-all hover:text-theme uppercase',
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
            className="ml-2 border-primary/20 hover:border-primary/50"
            onClick={handleAuthClick}
          >
            <User className="h-4 w-4 mr-2" />
            {user ? 'Sign Out' : 'Sign In'}
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            className="p-2 focus:outline-none text-foreground"
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
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'fixed inset-0 bg-background/95 backdrop-blur-lg flex flex-col justify-center items-center md:hidden transition-all duration-300 ease-in-out z-40',
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        )}
      >
        <nav className="flex flex-col items-center space-y-6 p-8">
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
            className="mt-4 border-primary/20 hover:border-primary/50"
          >
            <User className="h-4 w-4 mr-2" />
            {user ? 'Sign Out' : 'Sign In'}
          </Button>
        </nav>
      </div>
    </header>
  );
};
