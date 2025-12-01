import { StudyPlan } from '@/contexts/StudyPlanContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Save, RefreshCw, Calendar, Clock, Target, CheckCircle2, Lightbulb, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GeneratedPlanDisplayProps {
  plan: Omit<StudyPlan, 'id' | 'createdAt' | 'tags'>;
  onSave: () => void;
  onRegenerate: () => void;
  isRegenerating: boolean;
}

const taskTypeColors: Record<string, string> = {
  resumo: 'bg-blue-100 text-blue-800',
  exercicio: 'bg-green-100 text-green-800',
  revisao: 'bg-amber-100 text-amber-800',
  leitura: 'bg-purple-100 text-purple-800',
};

export function GeneratedPlanDisplay({ 
  plan, 
  onSave, 
  onRegenerate, 
  isRegenerating 
}: GeneratedPlanDisplayProps) {
  const daysUntilExam = Math.ceil(
    (new Date(plan.examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  
  const totalHours = Math.round(plan.schedule.length * plan.dailyTime / 60);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="card-elevated p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-foreground">
              {plan.title}
            </h2>
            <p className="text-muted-foreground mt-1">{plan.subject}</p>
          </div>
          <Badge 
            variant="outline"
            className={cn(
              'self-start text-base px-4 py-1',
              daysUntilExam <= 7 ? 'border-destructive text-destructive' : 
              daysUntilExam <= 14 ? 'border-warning text-warning' : 
              'border-success text-success'
            )}
          >
            {daysUntilExam} dias até a prova
          </Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>{new Date(plan.examDate).toLocaleDateString('pt-BR')}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{plan.dailyTime} min/dia</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Target className="w-4 h-4 text-muted-foreground" />
            <span className="capitalize">{plan.level}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <BookOpen className="w-4 h-4 text-muted-foreground" />
            <span>{totalHours}h total</span>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed">{plan.summary}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card-elevated p-6">
          <h3 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-success" />
            Metas do Plano
          </h3>
          <ul className="space-y-3">
            {plan.goals.map((goal, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="w-6 h-6 rounded-full bg-success/10 text-success flex items-center justify-center text-xs font-medium shrink-0">
                  {index + 1}
                </span>
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-elevated p-6">
          <h3 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-accent" />
            Dicas de Estudo
          </h3>
          <ul className="space-y-3">
            {plan.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-accent">💡</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card-elevated p-6">
        <h3 className="font-heading text-lg font-semibold mb-4">
          Cronograma (Próximos 7 dias)
        </h3>
        <div className="space-y-3">
          {plan.schedule.slice(0, 7).map((day, index) => (
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
              <div className="grid sm:grid-cols-2 gap-2">
                {day.tasks.map((task, taskIndex) => (
                  <div 
                    key={taskIndex}
                    className="flex items-center justify-between text-sm p-2 rounded bg-secondary/50"
                  >
                    <span>{task.title}</span>
                    <span className={cn('tag-badge text-xs', taskTypeColors[task.type])}>
                      {task.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          onClick={onSave}
          className="flex-1 btn-accent h-12 text-base font-semibold gap-2"
        >
          <Save className="w-5 h-5" />
          Salvar Plano
        </Button>
        <Button 
          variant="outline"
          onClick={onRegenerate}
          disabled={isRegenerating}
          className="flex-1 h-12 text-base gap-2"
        >
          <RefreshCw className={cn("w-5 h-5", isRegenerating && "animate-spin")} />
          Gerar Novamente
        </Button>
      </div>
    </div>
  );
}
