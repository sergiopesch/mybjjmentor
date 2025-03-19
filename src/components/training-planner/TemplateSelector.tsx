
import React from 'react';
import { Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface SessionItem {
  id: string;
  name: string;
  duration: number;
  type: string;
}

interface TemplateSession {
  title: string;
  focus: string;
  level: string;
  duration: number;
  days: number;
  items: SessionItem[];
}

interface TemplateSelectorProps {
  exampleSessions: TemplateSession[];
  selectedTemplate: string;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<string>>;
  applyTemplate: (index: number) => void;
}

export const TemplateSelector = ({ 
  exampleSessions, 
  selectedTemplate, 
  setSelectedTemplate, 
  applyTemplate 
}: TemplateSelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Award className="mr-2 h-5 w-5 text-bjj-blue" />
          Template Plans
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Use one of our pre-built templates to get started quickly.
        </p>
        
        <div className="space-y-2">
          <Select 
            value={selectedTemplate} 
            onValueChange={(value) => {
              setSelectedTemplate(value);
              if (value) {
                applyTemplate(parseInt(value));
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a template" />
            </SelectTrigger>
            <SelectContent>
              {exampleSessions.map((session, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {session.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {exampleSessions.map((session, index) => (
            <AccordionItem key={index} value={`plan-${index}`}>
              <AccordionTrigger>
                <div className="flex items-center text-left">
                  <span>{session.title}</span>
                  <Badge variant="outline" className="ml-2">
                    {session.level}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 py-2">
                  <div className="flex justify-between text-sm">
                    <span>Focus: {session.focus}</span>
                    <span>{session.duration} min · {session.days}x/week</span>
                  </div>
                  <ul className="space-y-2">
                    {session.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm flex justify-between">
                        <span>{item.name}</span>
                        <span className="text-muted-foreground">{item.duration} min</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    size="sm" 
                    className="w-full mt-2"
                    onClick={() => applyTemplate(index)}
                  >
                    Apply Template
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};
