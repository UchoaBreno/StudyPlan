import { useState } from 'react';
import { StudyPlan, DaySchedule } from '@/contexts/StudyPlanContext';
import { ChevronLeft, ChevronRight, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface CalendarViewProps {
  plans: StudyPlan[];
}

interface DayInfo {
  date: Date;
  tasks: DaySchedule['tasks'];
  examPlan?: StudyPlan;
  totalTime: string;
}

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export function CalendarView({ plans }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<DayInfo | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const getDayInfo = (day: number): DayInfo | null => {
    const date = new Date(year, month, day);
    const dateStr = date.toISOString().split('T')[0];
    
    let allTasks: DaySchedule['tasks'] = [];
    let totalMinutes = 0;
    let examPlan: StudyPlan | undefined;

    plans.forEach(plan => {
      if (plan.examDate === dateStr) {
        examPlan = plan;
      }
      
      const daySchedule = plan.schedule.find(s => s.date === dateStr);
      if (daySchedule) {
        allTasks = [...allTasks, ...daySchedule.tasks];
        totalMinutes += parseInt(daySchedule.totalTime) || 0;
      }
    });

    if (allTasks.length === 0 && !examPlan) return null;

    return {
      date,
      tasks: allTasks,
      examPlan,
      totalTime: `${totalMinutes} min`,
    };
  };

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handlePrint = () => {
    window.print();
  };

  const renderCalendarDays = () => {
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="p-2" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayInfo = getDayInfo(day);
      const isToday = date.getTime() === today.getTime();
      const hasTasks = dayInfo && dayInfo.tasks.length > 0;
      const isExamDay = dayInfo?.examPlan;

      days.push(
        <button
          key={day}
          onClick={() => dayInfo && setSelectedDay(dayInfo)}
          className={cn(
            'calendar-day min-h-[80px] text-left',
            isToday && 'ring-2 ring-primary',
            hasTasks && 'has-tasks',
            isExamDay && 'exam-day',
            !dayInfo && 'opacity-50 cursor-default'
          )}
        >
          <span className={cn(
            'text-sm font-medium',
            isToday && 'text-primary'
          )}>
            {day}
          </span>
          {hasTasks && (
            <div className="mt-1 space-y-0.5">
              <div className="text-xs text-muted-foreground">
                {dayInfo.tasks.length} tarefa{dayInfo.tasks.length > 1 ? 's' : ''}
              </div>
              {isExamDay && (
                <div className="text-xs font-medium text-destructive">
                  📝 Prova!
                </div>
              )}
            </div>
          )}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h2 className="font-heading text-xl font-semibold min-w-[180px] text-center">
            {currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </h2>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <Button variant="outline" onClick={handlePrint} className="gap-2">
          <Printer className="w-4 h-4" />
          <span className="hidden sm:inline">Imprimir</span>
        </Button>
      </div>

      <div className="card-elevated p-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {renderCalendarDays()}
        </div>
      </div>

      <div className="flex items-center gap-6 text-sm text-muted-foreground justify-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-accent/20 border border-accent/30" />
          <span>Com tarefas</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-destructive/20 border border-destructive/50" />
          <span>Dia da prova</span>
        </div>
      </div>

      <Dialog open={!!selectedDay} onOpenChange={() => setSelectedDay(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-heading">
              {selectedDay?.date.toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long' 
              })}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {selectedDay?.examPlan && (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                <p className="font-medium text-destructive">
                  📝 Prova: {selectedDay.examPlan.subject}
                </p>
              </div>
            )}

            <div className="text-sm text-muted-foreground">
              Tempo total: {selectedDay?.totalTime}
            </div>

            <div className="space-y-2">
              {selectedDay?.tasks.map((task, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border border-border bg-card"
                >
                  <span>{task.title}</span>
                  <span className="text-sm text-muted-foreground">{task.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
