import { StudyPlan, DaySchedule } from '@/contexts/StudyPlanContext';

interface GeneratePlanInput {
  subject: string;
  examDate: string;
  dailyTime: number;
  level: 'iniciante' | 'intermediario' | 'avancado';
  preferences: string[];
  goal: string;
}

function generateMockPlan(input: GeneratePlanInput): Omit<StudyPlan, 'id' | 'createdAt' | 'tags'> {
  const startDate = new Date();
  const endDate = new Date(input.examDate);
  const daysUntilExam = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  const schedule: DaySchedule[] = [];
  const taskTypes = ['resumo', 'exercicio', 'revisao', 'leitura'] as const;
  
  for (let i = 0; i < Math.min(daysUntilExam, 30); i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    const numTasks = Math.min(Math.floor(input.dailyTime / 30), 4);
    const tasks = [];
    
    for (let j = 0; j < numTasks; j++) {
      const typeIndex = (i + j) % taskTypes.length;
      tasks.push({
        title: getTaskTitle(taskTypes[typeIndex], input.subject, i, j),
        duration: `${Math.floor(input.dailyTime / numTasks)} min`,
        type: taskTypes[typeIndex],
        completed: false,
      });
    }
    
    schedule.push({
      date: date.toISOString().split('T')[0],
      tasks,
      totalTime: `${input.dailyTime} min`,
    });
  }

  const levelMultiplier = input.level === 'iniciante' ? 1 : input.level === 'intermediario' ? 1.2 : 1.5;
  
  return {
    title: `Plano de Estudo: ${input.subject}`,
    subject: input.subject,
    examDate: input.examDate,
    level: input.level,
    dailyTime: input.dailyTime,
    summary: `Plano personalizado de ${daysUntilExam} dias para ${input.subject}. Com ${input.dailyTime} minutos diários de estudo focado, você terá ${Math.round(daysUntilExam * input.dailyTime / 60)} horas totais de preparação. O plano inclui ${input.preferences.join(', ')} conforme suas preferências.`,
    schedule,
    goals: [
      `Dominar os conceitos fundamentais de ${input.subject}`,
      `Completar ${Math.round(daysUntilExam * levelMultiplier * 2)} exercícios práticos`,
      `Fazer ${Math.ceil(daysUntilExam / 7)} revisões semanais completas`,
      `${input.goal}`,
    ],
    tips: [
      'Use a técnica Pomodoro: 25 min de foco + 5 min de pausa',
      'Revise o conteúdo do dia anterior antes de começar',
      'Faça anotações em suas próprias palavras',
      'Pratique exercícios sem consultar o material primeiro',
      'Durma bem, especialmente na véspera da prova',
    ],
  };
}

function getTaskTitle(type: string, subject: string, dayIndex: number, taskIndex: number): string {
  const titles = {
    resumo: [
      `Resumir capítulo ${dayIndex + 1}`,
      `Mapear conceitos principais`,
      `Criar fichas de estudo`,
      `Sintetizar teoria`,
    ],
    exercicio: [
      `Resolver exercícios práticos`,
      `Fazer questões de fixação`,
      `Praticar problemas`,
      `Simulado de exercícios`,
    ],
    revisao: [
      `Revisar conteúdo anterior`,
      `Revisão ativa com perguntas`,
      `Revisão espaçada`,
      `Revisão geral`,
    ],
    leitura: [
      `Leitura do material base`,
      `Estudar referências`,
      `Ler capítulo novo`,
      `Explorar material complementar`,
    ],
  };
  
  return titles[type as keyof typeof titles][taskIndex % 4];
}

export async function generateStudyPlan(input: GeneratePlanInput): Promise<Omit<StudyPlan, 'id' | 'createdAt' | 'tags'>> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return generateMockPlan(input);
}

export function generateId(): string {
  return `plan-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
