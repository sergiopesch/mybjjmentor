
import React from 'react';

interface VideoTimeDisplayProps {
  currentTime: number;
  duration: number;
}

// Format time as mm:ss
const formatTime = (time: number) => {
  if (isNaN(time)) return "0:00";
  
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const VideoTimeDisplay: React.FC<VideoTimeDisplayProps> = ({ currentTime, duration }) => {
  // Add remaining time calculation
  const remainingTime = Math.max(0, duration - currentTime);
  
  return (
    <div className="flex justify-between w-full text-xs text-white">
      <span className="font-medium">{formatTime(currentTime)}</span>
      <span className="text-white/70">
        {/* Show remaining time with a minus sign */}
        -{formatTime(remainingTime)}
      </span>
    </div>
  );
};
