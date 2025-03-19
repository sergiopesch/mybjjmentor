
import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface VideoVolumeControlProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (value: number[]) => void;
  onToggleMute: () => void;
}

export const VideoVolumeControl: React.FC<VideoVolumeControlProps> = ({
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute
}) => {
  return (
    <div className="hidden sm:flex items-center space-x-2">
      <button onClick={onToggleMute}>
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-white" />
        ) : (
          <Volume2 className="w-4 h-4 text-white" />
        )}
      </button>
      
      <Slider
        value={[isMuted ? 0 : volume]}
        min={0}
        max={1}
        step={0.01}
        onValueChange={onVolumeChange}
        className="w-20"
      />
    </div>
  );
};
