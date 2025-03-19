
import React from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import { VideoPlayer } from './VideoPlayer';

// Sample technique data
const techniques = [
  {
    id: 1,
    title: 'Armbar from Guard',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
  },
  {
    id: 2,
    title: 'Triangle Choke',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
  },
  {
    id: 3,
    title: 'Scissor Sweep',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
  },
  {
    id: 4,
    title: 'Kimura from Guard',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
  }
];

export const TechniqueCarousel = () => {
  return (
    <Carousel className="w-full max-w-4xl mx-auto">
      <CarouselContent>
        {techniques.map(technique => (
          <CarouselItem key={technique.id}>
            <div className="p-1">
              <Card className="overflow-hidden">
                <div className="aspect-video">
                  <VideoPlayer url={technique.videoUrl} />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold">{technique.title}</h3>
                </div>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
};
