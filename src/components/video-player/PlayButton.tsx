
import React from 'react';
import { Play } from 'lucide-react';

interface PlayButtonProps {
  onClick: () => void;
  isLarge?: boolean;
}

export const PlayButton: React.FC<PlayButtonProps> = ({ onClick, isLarge = false }) => {
  if (isLarge) {
    return (
      <button
        onClick={onClick}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
      >
        <Play className="w-8 h-8 text-white" />
      </button>
    );
  }
  
  return (
    <button 
      onClick={onClick}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
    >
      <Play className="w-4 h-4 text-white" />
    </button>
  );
};
