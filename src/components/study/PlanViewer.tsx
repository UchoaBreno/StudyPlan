import { StudyPlan } from '@/contexts/StudyPlanContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Target, Lightbulb, CheckCircle2, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlanViewerProps {
  plan: StudyPlan | null;
  open: boolean;
  onClose: () => void;
}

const taskTypeColors: Record<string, string> = {
  resumo: 'bg-blue-100 text-blue-800',
  exercicio: 'bg-green-100 text-green-800',
  revisao: 'bg-amber-100 text-amber-800',
  leitura: 'bg-purple-100 text-purple-800',
};

const taskTypeLabels: Record<string, string> = {
  resumo: 'Resumo',
  exercicio: 'Exercício',
  revisao: 'Revisão',
  leitura: 'Leitura',
};

export function PlanViewer({ plan, open, onClose }: PlanViewerProps) {
  if (!plan) return null;

  const daysUntilExam = Math.ceil(
    (new Date(plan.examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <DialogTitle className="font-heading text-2xl">{plan.title}</DialogTitle>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>Prova: {new Date(plan.examDate).toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{plan.dailyTime} min/dia</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Target className="w-4 h-4" />
              <span className="capitalize">{plan.level}</span>
            </div>
            <Badge 
              variant="outline"
              className={cn(
                daysUntilExam <= 7 ? 'border-destructive text-destructive' : 
                daysUntilExam <= 14 ? 'border-warning text-warning' : 
                'border-success text-success'
              )}
            >
              {daysUntilExam > 0 ? `${daysUntilExam} dias restantes` : 'Hoje!'}
            </Badge>
          </div>
        </DialogHeader>

        <Tabs defaultValue="schedule" className="flex-1">
          <TabsList className="w-full justify-start px-6 pt-2 bg-transparent border-b border-border rounded-none">
            <TabsTrigger value="schedule">Cronograma</TabsTrigger>
            <TabsTrigger value="goals">Metas</TabsTrigger>
            <TabsTrigger value="tips">Dicas</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[50vh]">
            <TabsContent value="schedule" className="p-6 pt-4 space-y-4 m-0">
              <p className="text-sm text-muted-foreground">{plan.summary}</p>
              
              <div className="space-y-3">
                {plan.schedule.slice(0, 14).map((day, index) => (
                  <div 
                    key={day.date} 
                    className="p-4 rounded-lg border border-border bg-card hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {new Date(day.date).toLocaleDateString('pt-BR', { 
                            weekday: 'short', 
                            day: 'numeric', 
                            month: 'short' 
                          })}
                        </span>
                        {index === 0 && (
                          <Badge variant="secondary" className="text-xs">Hoje</Badge>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">{day.totalTime}</span>
                    </div>
                    <div className="space-y-2">
                      {day.tasks.map((task, taskIndex) => (
                        <div 
                          key={taskIndex}
                          className="flex items-center justify-between text-sm"
                        >
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-3.5 h-3.5 text-muted-foreground" />
                            <span>{task.title}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">{task.duration}</span>
                            <span className={cn('tag-badge text-xs', taskTypeColors[task.type])}>
                              {taskTypeLabels[task.type]}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {plan.schedule.length > 14 && (
                  <p className="text-center text-sm text-muted-foreground py-2">
                    + {plan.schedule.length - 14} dias restantes...
                  </p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="goals" className="p-6 pt-4 m-0">
              <div className="space-y-3">
                {plan.goals.map((goal, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card"
                  >
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span>{goal}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tips" className="p-6 pt-4 m-0">
              <div className="space-y-3">
                {plan.tips.map((tip, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card"
                  >
                    <Lightbulb className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
