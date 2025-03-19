
import React from 'react';

interface VideoTimeDisplayProps {
  currentTime: number;
  duration: number;
}

// Format time as mm:ss
const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const VideoTimeDisplay: React.FC<VideoTimeDisplayProps> = ({ currentTime, duration }) => {
  return (
    <div className="text-xs text-white">
      {formatTime(currentTime)} / {formatTime(duration)}
    </div>
  );
};
