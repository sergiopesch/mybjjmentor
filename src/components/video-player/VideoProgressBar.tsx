
import React from 'react';
import { Slider } from '@/components/ui/slider';

interface VideoProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (value: number[]) => void;
}

export const VideoProgressBar: React.FC<VideoProgressBarProps> = ({ 
  currentTime, 
  duration, 
  onSeek 
}) => {
  return (
    <Slider
      value={[currentTime]}
      min={0}
      max={duration || 100}
      step={0.1}
      onValueChange={onSeek}
      className="mb-4"
    />
  );
};
