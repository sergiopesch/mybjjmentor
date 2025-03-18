
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This will be handled by Supabase auth state
  const location = useLocation();
  const navigate = useNavigate();

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
    { name: 'Home', path: '/' },
    { name: 'Techniques', path: '/techniques' },
    { name: 'Training Planner', path: '/planner' },
    { name: 'Progress', path: '/progress' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleAuthClick = () => {
    if (isLoggedIn) {
      // Handle logout - will be implemented with Supabase
      console.log('Logging out');
      setIsLoggedIn(false);
    } else {
      navigate('/auth');
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled 
          ? 'bg-background/80 backdrop-blur-lg shadow-sm py-3' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="container max-w-6xl px-4 mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-semibold tracking-tight transition-opacity hover:opacity-80"
        >
          BJJ<span className="text-bjj-blue">Coach</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-all hover:text-primary',
                isActive(link.path)
                  ? 'text-primary border-b-2 border-primary pb-1'
                  : 'text-muted-foreground'
              )}
            >
              {link.name}
            </Link>
          ))}
          
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-4"
            onClick={handleAuthClick}
          >
            <User className="h-4 w-4 mr-2" />
            {isLoggedIn ? 'Profile' : 'Sign In'}
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 focus:outline-none"
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
          'fixed inset-0 bg-background/95 backdrop-blur-lg flex flex-col justify-center items-center md:hidden transition-all duration-300 ease-in-out z-40',
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        )}
      >
        <nav className="flex flex-col items-center space-y-8 p-8">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-lg font-medium transition-all hover:text-primary',
                isActive(link.path) ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {link.name}
            </Link>
          ))}
          
          <Button 
            variant="outline"
            onClick={handleAuthClick}
            className="mt-4"
          >
            <User className="h-4 w-4 mr-2" />
            {isLoggedIn ? 'Profile' : 'Sign In'}
          </Button>
        </nav>
      </div>
    </header>
  );
};
