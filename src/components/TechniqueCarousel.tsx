
import React, { useState } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { VideoPlayer } from './video-player';
import { Badge } from '@/components/ui/badge';
import { Play, Info, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample technique data with enhanced metadata
const techniques = [
  {
    id: 1,
    title: 'Armbar from Guard',
    level: 'Beginner',
    category: 'Submission',
    duration: '3:45',
    instructor: 'Master Lee',
    description: 'A fundamental submission that hyperextends the opponent\'s elbow joint when applied correctly.',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    thumbnail: '/placeholder.svg'
  },
  {
    id: 2,
    title: 'Triangle Choke',
    level: 'Beginner',
    category: 'Submission',
    duration: '4:20',
    instructor: 'Master Chen',
    description: 'A powerful choke that uses your legs to cut off blood flow to your opponent\'s brain.',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    thumbnail: '/placeholder.svg'
  },
  {
    id: 3,
    title: 'Scissor Sweep',
    level: 'Beginner',
    category: 'Sweep',
    duration: '2:55',
    instructor: 'Master Kim',
    description: 'An effective technique to reverse positions from guard to mount using leverage and timing.',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    thumbnail: '/placeholder.svg'
  },
  {
    id: 4,
    title: 'Kimura from Guard',
    level: 'Intermediate',
    category: 'Submission',
    duration: '5:10',
    instructor: 'Master Garcia',
    description: 'A powerful shoulder lock that can be applied from multiple positions including guard.',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    thumbnail: '/placeholder.svg'
  }
];

export const TechniqueCarousel = () => {
  // Track which technique is being hovered
  const [hoveredTechnique, setHoveredTechnique] = useState<number | null>(null);
  // Track which video is being played
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  return (
    <Carousel 
      className="w-full max-w-5xl mx-auto"
      opts={{
        align: "start",
        loop: true
      }}
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {techniques.map(technique => (
          <CarouselItem key={technique.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card 
                className="overflow-hidden border-0 shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-theme/10"
                onMouseEnter={() => setHoveredTechnique(technique.id)}
                onMouseLeave={() => setHoveredTechnique(null)}
              >
                <div className="aspect-video relative group">
                  {playingVideo === technique.id ? (
                    <div className="h-full">
                      <VideoPlayer url={technique.videoUrl} />
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-black/80 to-black/60 group-hover:from-black/60 group-hover:to-black/40 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      
                      <Button 
                        onClick={() => setPlayingVideo(technique.id)} 
                        size="lg" 
                        className="relative z-10 bg-theme hover:bg-theme/80 rounded-full w-16 h-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-glow shadow-theme/20"
                      >
                        <Play className="w-8 h-8 text-white ml-1" />
                      </Button>
                      
                      <div className="absolute bottom-0 w-full p-4 text-white z-10">
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="text-xl font-bold">{technique.title}</h3>
                          <Badge className="bg-theme/80 hover:bg-theme text-white border-none">{technique.level}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-white/80">{technique.category}</p>
                          <div className="flex items-center text-xs text-white/70">
                            <Clock className="h-3 w-3 mr-1" />
                            {technique.duration}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Preview image (replace with actual technique thumbnails in production) */}
                  {playingVideo !== technique.id && (
                    <div className="absolute inset-0 z-0 bg-cover bg-center opacity-80"
                         style={{ backgroundImage: `url('${technique.thumbnail}')` }}>
                    </div>
                  )}
                </div>
                
                {hoveredTechnique === technique.id && playingVideo !== technique.id && (
                  <CardContent className="p-4 bg-black/90">
                    <div className="flex items-center mb-2">
                      <Award className="h-4 w-4 text-theme mr-1" />
                      <span className="text-xs text-theme">{technique.instructor}</span>
                    </div>
                    <p className="text-sm text-white/80 line-clamp-2">{technique.description}</p>
                  </CardContent>
                )}
                
                {/* Add a close button when video is playing */}
                {playingVideo === technique.id && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setPlayingVideo(null);
                    }}
                    className="absolute top-2 right-2 z-20 bg-black/50 hover:bg-black/80 w-8 h-8 rounded-full flex items-center justify-center text-white"
                    aria-label="Close video"
                  >
                    ✕
                  </button>
                )}
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center mt-6 gap-2">
        <CarouselPrevious className="relative left-0 bg-theme/10 hover:bg-theme/20 text-white border-none" />
        <CarouselNext className="relative right-0 bg-theme/10 hover:bg-theme/20 text-white border-none" />
      </div>
    </Carousel>
  );
};
