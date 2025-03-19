
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
import { Play, Award, Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const isMobile = useIsMobile();
  
  return (
    <Carousel 
      className="w-full max-w-5xl mx-auto"
      opts={{
        align: "start",
        loop: true,
        dragFree: true
      }}
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {techniques.map(technique => (
          <CarouselItem 
            key={technique.id} 
            className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
          >
            <Card 
              className="overflow-hidden border-0 shadow-lg rounded-lg transition-all duration-300 hover:shadow-card-hover"
            >
              <div className="aspect-video relative group">
                {playingVideo === technique.id ? (
                  <div className="h-full">
                    <VideoPlayer url={technique.videoUrl} />
                    <Button 
                      onClick={() => setPlayingVideo(null)}
                      className="absolute top-2 right-2 z-20 bg-black/50 hover:bg-black/80 w-8 h-8 p-0 rounded-full"
                      size="icon"
                      aria-label="Close video"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-80"
                      style={{ backgroundImage: `url('${technique.thumbnail}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/50 transition-all duration-300 group-hover:from-black/60 group-hover:to-black/40">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    </div>
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <Button 
                        onClick={() => setPlayingVideo(technique.id)} 
                        size="lg" 
                        className="relative z-10 bg-theme hover:bg-theme/90 rounded-full w-16 h-16 flex items-center justify-center transition-transform duration-300 transform group-hover:scale-110 shadow-glow shadow-theme/20"
                      >
                        <Play className="w-8 h-8 text-white ml-1" />
                      </Button>
                    </div>
                    
                    <div className="absolute bottom-0 w-full p-4 text-white z-10">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-xl font-bold line-clamp-1">{technique.title}</h3>
                        <Badge className="bg-theme hover:bg-theme/90 text-white border-none whitespace-nowrap ml-2 shrink-0">
                          {technique.level}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Award className="h-3.5 w-3.5 text-theme mr-1.5" />
                          <p className="text-sm text-white/90">{technique.instructor}</p>
                        </div>
                        <div className="flex items-center text-xs text-white/80">
                          <Clock className="h-3 w-3 mr-1" />
                          {technique.duration}
                        </div>
                      </div>
                      
                      {!isMobile && (
                        <p className="text-sm text-white/80 line-clamp-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {technique.description}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center mt-6 gap-4">
        <CarouselPrevious className="relative left-0 bg-theme/10 hover:bg-theme/20 text-white border-theme/20 hover:border-theme/30" />
        <CarouselNext className="relative right-0 bg-theme/10 hover:bg-theme/20 text-white border-theme/20 hover:border-theme/30" />
      </div>
    </Carousel>
  );
};
