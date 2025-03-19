
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Play, Info, BookOpen, AlignLeft } from 'lucide-react';
import { VideoPlayer } from './VideoPlayer';

// Sample technique data
const techniques = [
  {
    id: 1,
    title: 'Armbar from Guard',
    level: 'Beginner',
    category: 'Submissions',
    position: 'Guard',
    description: 'The armbar from guard is a fundamental submission in BJJ, allowing you to hyperextend your opponent\'s elbow joint when applied correctly.',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    steps: [
      'Control your opponent\'s posture by grabbing their collar and sleeve',
      'Open your guard and place one foot on the hip',
      'Swing your other leg over their head',
      'Squeeze your knees together and raise your hips',
      'Pull down on the arm while extending your hips'
    ]
  },
  {
    id: 2,
    title: 'Triangle Choke',
    level: 'Beginner',
    category: 'Submissions',
    position: 'Guard',
    description: 'The triangle choke is a powerful submission that uses your legs to cut off blood flow to your opponent\'s brain by compressing the carotid arteries.',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    steps: [
      'Control an arm by grabbing the wrist or sleeve',
      'Place your leg over their shoulder and behind their neck',
      'Lock your legs in a figure-four position',
      'Pull down on the head and squeeze your legs',
      'Adjust angle if needed for maximum pressure'
    ]
  },
  {
    id: 3,
    title: 'Scissor Sweep',
    level: 'Beginner',
    category: 'Sweeps',
    position: 'Guard',
    description: 'The scissor sweep is an effective technique to reverse positions from guard to mount, using leverage and timing.',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    steps: [
      'Grip their sleeve and collar',
      'Place one foot on their hip and the other leg across their body',
      'Create tension by pushing and pulling with your grips',
      'Extend your legs while pulling with your arms',
      'Follow through to the mount position'
    ]
  },
  {
    id: 4,
    title: 'Kimura from Guard',
    level: 'Intermediate',
    category: 'Submissions',
    position: 'Guard',
    description: 'The Kimura is a powerful shoulder lock that can be applied from multiple positions, including guard.',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    steps: [
      'Grip their wrist with your same-side hand',
      'Thread your other arm under theirs and grip your own wrist',
      'Control their posture by pulling them down',
      'Apply pressure to their shoulder by lifting their elbow',
      'Rotate their arm outward to complete the submission'
    ]
  }
];

export const TechniqueLibrary = () => {
  const [selectedTechnique, setSelectedTechnique] = useState(techniques[0]);
  const [showVideo, setShowVideo] = useState(false);

  const categories = ['All', 'Submissions', 'Sweeps', 'Passes', 'Escapes'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTechniques = activeCategory === 'All' 
    ? techniques 
    : techniques.filter(t => t.category === activeCategory);

  return (
    <section className="py-12">
      <div className="container max-w-6xl px-4 mx-auto">
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 perspective-section">
          <h2 className="text-3xl font-bold tracking-tight">Technique Library</h2>
          <Tabs defaultValue="All" className="w-full md:w-auto">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full md:w-auto">
              {categories.map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {selectedTechnique && (
            <Card className="overflow-hidden border-2 shadow-lg">
              <div className="grid md:grid-cols-5 gap-0">
                <div className="md:col-span-3 aspect-video bg-muted relative">
                  {showVideo ? (
                    <VideoPlayer url={selectedTechnique.videoUrl} />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-bjj-blue/10 to-bjj-purple/10">
                      <h3 className="text-xl md:text-2xl font-semibold mb-3">{selectedTechnique.title}</h3>
                      <Button onClick={() => setShowVideo(true)} size="lg" className="flex items-center gap-2">
                        <Play className="w-5 h-5" />
                        Play Video
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="md:col-span-2">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl md:text-2xl">{selectedTechnique.title}</CardTitle>
                      <Badge className="ml-2" variant="outline">{selectedTechnique.level}</Badge>
                    </div>
                    <CardDescription className="flex items-center mt-2">
                      <span className="mr-3">{selectedTechnique.category}</span>
                      <span>From {selectedTechnique.position}</span>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <Tabs defaultValue="description" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="description" className="flex items-center gap-2">
                          <Info className="w-4 h-4" />
                          Description
                        </TabsTrigger>
                        <TabsTrigger value="steps" className="flex items-center gap-2">
                          <AlignLeft className="w-4 h-4" />
                          Steps
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="description" className="pt-4">
                        <p className="text-muted-foreground">{selectedTechnique.description}</p>
                      </TabsContent>
                      <TabsContent value="steps" className="pt-4">
                        <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
                          {selectedTechnique.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ol>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </div>
              </div>
            </Card>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-container">
            {filteredTechniques.map((technique, index) => (
              <Card 
                key={technique.id}
                className={`cursor-pointer transition-all stagger-item ${selectedTechnique.id === technique.id ? 'border-2 border-bjj-blue' : ''}`}
                onClick={() => {
                  setSelectedTechnique(technique);
                  setShowVideo(false);
                }}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{technique.title}</CardTitle>
                    <Badge variant="outline">{technique.level}</Badge>
                  </div>
                  <CardDescription className="flex items-center mt-2">
                    <span className="mr-3">{technique.category}</span>
                    <span>From {technique.position}</span>
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
