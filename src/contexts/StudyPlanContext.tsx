import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Task {
  title: string;
  duration: string;
  type: 'resumo' | 'exercicio' | 'revisao' | 'leitura';
  completed?: boolean;
}

export interface DaySchedule {
  date: string;
  tasks: Task[];
  totalTime: string;
}

export interface StudyPlan {
  id: string;
  title: string;
  subject: string;
  examDate: string;
  createdAt: string;
  level: 'iniciante' | 'intermediario' | 'avancado';
  dailyTime: number;
  summary: string;
  schedule: DaySchedule[];
  goals: string[];
  tips: string[];
  tags: string[];
}

interface StudyPlanContextType {
  plans: StudyPlan[];
  savePlan: (plan: StudyPlan) => void;
  deletePlan: (id: string) => void;
  updatePlan: (id: string, updates: Partial<StudyPlan>) => void;
  getPlanById: (id: string) => StudyPlan | undefined;
}

const StudyPlanContext = createContext<StudyPlanContextType | undefined>(undefined);

const STORAGE_KEY = 'study-plans';

export function loadPlans(): StudyPlan[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function savePlans(plans: StudyPlan[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
}

export function StudyPlanProvider({ children }: { children: ReactNode }) {
  const [plans, setPlans] = useState<StudyPlan[]>([]);

  useEffect(() => {
    setPlans(loadPlans());
  }, []);

  const savePlan = (plan: StudyPlan) => {
    const newPlans = [...plans, plan];
    setPlans(newPlans);
    savePlans(newPlans);
  };

  const deletePlan = (id: string) => {
    const newPlans = plans.filter(p => p.id !== id);
    setPlans(newPlans);
    savePlans(newPlans);
  };

  const updatePlan = (id: string, updates: Partial<StudyPlan>) => {
    const newPlans = plans.map(p => p.id === id ? { ...p, ...updates } : p);
    setPlans(newPlans);
    savePlans(newPlans);
  };

  const getPlanById = (id: string) => plans.find(p => p.id === id);

  return (
    <StudyPlanContext.Provider value={{ plans, savePlan, deletePlan, updatePlan, getPlanById }}>
      {children}
    </StudyPlanContext.Provider>
  );
}

export function useStudyPlans() {
  const context = useContext(StudyPlanContext);
  if (!context) {
    throw new Error('useStudyPlans must be used within a StudyPlanProvider');
  }
  return context;
}
