import { useState, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { PlanCard } from '@/components/study/PlanCard';
import { PlanViewer } from '@/components/study/PlanViewer';
import { useStudyPlans, StudyPlan } from '@/contexts/StudyPlanContext';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, FolderOpen, Plus, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function MeusPlanos() {
  const { plans, deletePlan } = useStudyPlans();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'exam'>('recent');
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredAndSortedPlans = useMemo(() => {
    let result = plans.filter(plan => 
      plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    result.sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return new Date(a.examDate).getTime() - new Date(b.examDate).getTime();
      }
    });

    return result;
  }, [plans, searchQuery, sortBy]);

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deletePlan(deleteId);
      toast({
        title: 'Plano excluído',
        description: 'O plano foi removido com sucesso.',
      });
      setDeleteId(null);
    }
  };

  const handleExport = (plan: StudyPlan) => {
    const content = `
# ${plan.title}

**Matéria:** ${plan.subject}
**Data da Prova:** ${new Date(plan.examDate).toLocaleDateString('pt-BR')}
**Nível:** ${plan.level}
**Tempo Diário:** ${plan.dailyTime} minutos

## Resumo
${plan.summary}

## Metas
${plan.goals.map((g, i) => `${i + 1}. ${g}`).join('\n')}

## Dicas
${plan.tips.map(t => `- ${t}`).join('\n')}

## Cronograma
${plan.schedule.map(day => `
### ${new Date(day.date).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
${day.tasks.map(t => `- ${t.title} (${t.duration})`).join('\n')}
`).join('')}
    `.trim();

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${plan.title.replace(/\s+/g, '-').toLowerCase()}.md`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: 'Plano exportado!',
      description: 'O arquivo foi baixado para seu computador.',
    });
  };

  return (
    <Layout>
      <div className="page-transition">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              Meus Planos
            </h1>
            <p className="text-muted-foreground mt-1">
              {plans.length} plano{plans.length !== 1 ? 's' : ''} salvo{plans.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Link to="/">
            <Button className="btn-accent gap-2">
              <Plus className="w-4 h-4" />
              Novo Plano
            </Button>
          </Link>
        </div>

        {plans.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por título, matéria ou tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 input-styled"
              />
            </div>
            <Select value={sortBy} onValueChange={(v: 'recent' | 'exam') => setSortBy(v)}>
              <SelectTrigger className="w-full sm:w-48 input-styled">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Mais recentes</SelectItem>
                <SelectItem value="exam">Próxima prova</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {plans.length === 0 ? (
          <div className="card-elevated p-12 text-center">
            <FolderOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-heading text-xl font-semibold mb-2">
              Nenhum plano salvo
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Você ainda não tem nenhum plano de estudo. Crie seu primeiro plano 
              usando nossa IA e comece a estudar de forma organizada!
            </p>
            <Link to="/">
              <Button className="btn-accent gap-2">
                <Plus className="w-4 h-4" />
                Criar Primeiro Plano
              </Button>
            </Link>
          </div>
        ) : filteredAndSortedPlans.length === 0 ? (
          <div className="card-elevated p-12 text-center">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-heading text-xl font-semibold mb-2">
              Nenhum resultado encontrado
            </h2>
            <p className="text-muted-foreground">
              Tente buscar por outro termo ou limpe a busca.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedPlans.map(plan => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onView={setSelectedPlan}
                onDelete={handleDelete}
                onExport={handleExport}
              />
            ))}
          </div>
        )}

        <PlanViewer
          plan={selectedPlan}
          open={!!selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />

        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir plano de estudo?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não pode ser desfeita. O plano será removido permanentemente.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
}
