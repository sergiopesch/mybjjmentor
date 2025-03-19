
import React from 'react';
import { Slider } from '@/components/ui/slider';

interface VideoProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (value: number[]) => void;
  bufferProgress?: number;
}

export const VideoProgressBar: React.FC<VideoProgressBarProps> = ({ 
  currentTime, 
  duration, 
  onSeek,
  bufferProgress = 0
}) => {
  // Calculate progress percentage for visual feedback
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  
  return (
    <div className="relative w-full h-5 group flex items-center">
      {/* Buffer progress indicator */}
      {bufferProgress > 0 && (
        <div 
          className="absolute h-1 bg-white/20 rounded-full z-0"
          style={{ width: `${bufferProgress}%` }}
        />
      )}
      
      <Slider
        value={[currentTime]}
        min={0}
        max={duration || 100}
        step={0.1}
        onValueChange={onSeek}
        className="z-10"
      />
      
      {/* Hover effect - show larger slider on hover */}
      <div className="absolute inset-0 -top-1 -bottom-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="absolute bottom-0 left-0 h-1.5 bg-theme-red rounded-full" style={{ width: `${progressPercentage}%` }} />
      </div>
    </div>
  );
};
