
export interface SessionItem {
  id: string;
  name: string;
  duration: number;
  type: string;
}

export interface TemplateSession {
  title: string;
  focus: string;
  level: string;
  duration: number;
  days: number;
  items: SessionItem[];
}

export interface PlanDetails {
  title: string;
  level: string;
  focus: string;
  daysPerWeek: number;
  sessionDuration: number;
}
