
import React, { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type AnimatePresenceProps = {
  children: React.ReactNode;
  mode?: 'sync' | 'wait';
};

export const AnimatePresence: React.FC<AnimatePresenceProps> = ({ 
  children, 
  mode = 'sync' 
}) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevPathRef = useRef(location.pathname);
  
  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      setIsTransitioning(true);
      
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        prevPathRef.current = location.pathname;
      }, 600); // Match this with your CSS transition duration
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <div className={`page-transition-container ${isTransitioning ? 'transitioning' : ''}`}>
      {children}
    </div>
  );
};
