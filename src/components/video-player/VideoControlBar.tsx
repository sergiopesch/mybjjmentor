
import React from 'react';
import { Play, Pause, Maximize, SkipBack, SkipForward } from 'lucide-react';
import { VideoTimeDisplay } from './VideoTimeDisplay';
import { VideoVolumeControl } from './VideoVolumeControl';

interface VideoControlBarProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  onTogglePlay: () => void;
  onSkipBackward: () => void;
  onSkipForward: () => void;
  onVolumeChange: (value: number[]) => void;
  onToggleMute: () => void;
  onFullscreen: () => void;
}

export const VideoControlBar: React.FC<VideoControlBarProps> = ({
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  onTogglePlay,
  onSkipBackward,
  onSkipForward,
  onVolumeChange,
  onToggleMute,
  onFullscreen
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <button 
          onClick={onTogglePlay}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-white" />
          ) : (
            <Play className="w-4 h-4 text-white" />
          )}
        </button>
        
        <button 
          onClick={onSkipBackward}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <SkipBack className="w-4 h-4 text-white" />
        </button>
        
        <button 
          onClick={onSkipForward}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <SkipForward className="w-4 h-4 text-white" />
        </button>
        
        <VideoTimeDisplay currentTime={currentTime} duration={duration} />
      </div>
      
      <div className="flex items-center space-x-2">
        <VideoVolumeControl 
          volume={volume}
          isMuted={isMuted}
          onVolumeChange={onVolumeChange}
          onToggleMute={onToggleMute}
        />
        
        <button 
          onClick={onFullscreen}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <Maximize className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
};
