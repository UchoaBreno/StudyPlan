import { StudyPlan } from '@/contexts/StudyPlanContext';
import { Calendar, Clock, Target, Trash2, Eye, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PlanCardProps {
  plan: StudyPlan;
  onView: (plan: StudyPlan) => void;
  onDelete: (id: string) => void;
  onExport: (plan: StudyPlan) => void;
}

const tagColors: Record<string, string> = {
  'matematica': 'bg-blue-100 text-blue-800',
  'portugues': 'bg-green-100 text-green-800',
  'historia': 'bg-amber-100 text-amber-800',
  'fisica': 'bg-purple-100 text-purple-800',
  'quimica': 'bg-pink-100 text-pink-800',
  'biologia': 'bg-emerald-100 text-emerald-800',
  'default': 'bg-secondary text-secondary-foreground',
};

export function PlanCard({ plan, onView, onDelete, onExport }: PlanCardProps) {
  const daysUntilExam = Math.ceil(
    (new Date(plan.examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  
  const totalHours = Math.round(plan.schedule.length * plan.dailyTime / 60);
  
  const getTagColor = (tag: string) => {
    const normalizedTag = tag.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return tagColors[normalizedTag] || tagColors.default;
  };

  return (
    <div className="card-elevated p-6 animate-fade-in">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-lg font-semibold text-foreground truncate">
            {plan.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{plan.subject}</p>
        </div>
        <Badge 
          variant="outline" 
          className={cn(
            'shrink-0',
            daysUntilExam <= 7 ? 'border-destructive text-destructive' : 
            daysUntilExam <= 14 ? 'border-warning text-warning' : 
            'border-success text-success'
          )}
        >
          {daysUntilExam > 0 ? `${daysUntilExam} dias` : 'Hoje!'}
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{new Date(plan.examDate).toLocaleDateString('pt-BR')}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{totalHours}h total</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Target className="w-4 h-4" />
          <span className="capitalize">{plan.level}</span>
        </div>
      </div>

      {plan.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {plan.tags.map(tag => (
            <span 
              key={tag} 
              className={cn('tag-badge', getTagColor(tag))}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
        {plan.summary}
      </p>

      <div className="flex items-center gap-2 pt-4 border-t border-border">
        <Button 
          variant="default" 
          size="sm" 
          className="flex-1 gap-2"
          onClick={() => onView(plan)}
        >
          <Eye className="w-4 h-4" />
          Ver Detalhes
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onExport(plan)}
        >
          <FileDown className="w-4 h-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={() => onDelete(plan.id)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
