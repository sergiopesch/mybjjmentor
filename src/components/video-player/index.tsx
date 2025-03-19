
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { VideoProgressBar } from './VideoProgressBar';
import { VideoControlBar } from './VideoControlBar';
import { PlayButton } from './PlayButton';
import { useIsMobile } from '@/hooks/use-mobile';

interface VideoPlayerProps {
  url: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [bufferProgress, setBufferProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => {
          console.error("Error playing video:", err);
          // Handle autoplay restrictions
          setShowControls(true);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      
      // Update buffer progress
      if (videoRef.current.buffered.length > 0) {
        const bufferedEnd = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
        const duration = videoRef.current.duration;
        setBufferProgress((bufferedEnd / duration) * 100);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (videoRef.current) {
      const newVolume = value[0];
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume > 0 ? volume : 0.5;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }

    if (isPlaying) {
      controlsTimeout.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().then(() => {
          setIsFullscreen(true);
          // For mobile, we should force controls to show briefly when entering fullscreen
          setShowControls(true);
          if (isPlaying) {
            controlsTimeout.current = setTimeout(() => {
              setShowControls(false);
            }, 3000);
          }
        }).catch(err => {
          console.error('Error attempting to enable fullscreen:', err);
        });
      } else {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        }).catch(err => {
          console.error('Error attempting to exit fullscreen:', err);
        });
      }
    }
  };

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, duration);
    }
  };

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0);
    }
  };

  // Handle fullscreen change event
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Handle touch events for mobile
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = () => {
      setShowControls(true);
      
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
      
      if (isPlaying) {
        controlsTimeout.current = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      }
    };

    container.addEventListener('touchstart', handleTouchStart);
    
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
    };
  }, [isPlaying]);

  // Pre-load video metadata
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.preload = "metadata";
    }
    
    return () => {
      // Cleanup on unmount
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative w-full h-full bg-black rounded-lg overflow-hidden",
        isFullscreen && "fixed inset-0 z-50"
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={url}
        className="w-full h-full"
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        poster="/placeholder.svg"
        playsInline // Important for mobile
      />
      
      {/* Video controls */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0",
          isMobile ? "pt-12 pb-4" : "p-4" // More touch area on mobile
        )}
      >
        <VideoProgressBar 
          currentTime={currentTime}
          duration={duration}
          onSeek={handleSeek}
          bufferProgress={bufferProgress}
        />
        
        <VideoControlBar 
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          volume={volume}
          isMuted={isMuted}
          onTogglePlay={togglePlay}
          onSkipBackward={skipBackward}
          onSkipForward={skipForward}
          onVolumeChange={handleVolumeChange}
          onToggleMute={toggleMute}
          onFullscreen={handleFullscreen}
          isFullscreen={isFullscreen}
          isMobile={isMobile}
        />
      </div>
      
      {/* Play/Pause center button overlay (visible only when controls are shown and video is not playing) */}
      {showControls && !isPlaying && (
        <PlayButton onClick={togglePlay} isLarge={true} />
      )}
    </div>
  );
};
