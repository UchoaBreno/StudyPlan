import { Layout } from '@/components/layout/Layout';
import { CalendarView } from '@/components/study/CalendarView';
import { useStudyPlans } from '@/contexts/StudyPlanContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CalendarDays, Plus } from 'lucide-react';

export default function Calendario() {
  const { plans } = useStudyPlans();

  return (
    <Layout>
      <div className="page-transition">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              Calendário
            </h1>
            <p className="text-muted-foreground mt-1">
              Visualize suas tarefas e provas no calendário
            </p>
          </div>
        </div>

        {plans.length === 0 ? (
          <div className="card-elevated p-12 text-center">
            <CalendarDays className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-heading text-xl font-semibold mb-2">
              Calendário vazio
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Crie um plano de estudo para ver suas tarefas e provas no calendário.
            </p>
            <Link to="/">
              <Button className="btn-accent gap-2">
                <Plus className="w-4 h-4" />
                Criar Plano de Estudo
              </Button>
            </Link>
          </div>
        ) : (
          <CalendarView plans={plans} />
        )}
      </div>
    </Layout>
  );
}
