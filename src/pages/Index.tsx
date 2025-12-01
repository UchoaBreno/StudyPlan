import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { FormGenerator } from '@/components/study/FormGenerator';
import { GeneratedPlanDisplay } from '@/components/study/GeneratedPlanDisplay';
import { SkeletonPlan } from '@/components/study/SkeletonPlan';
import { generateStudyPlan, generateId } from '@/services/ai';
import { useStudyPlans, StudyPlan } from '@/contexts/StudyPlanContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Sparkles, BookOpen, Target, Calendar } from 'lucide-react';

type GeneratedPlan = Omit<StudyPlan, 'id' | 'createdAt' | 'tags'>;

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan | null>(null);
  const [lastFormData, setLastFormData] = useState<any>(null);
  const { savePlan } = useStudyPlans();
  const navigate = useNavigate();

  const handleSubmit = async (formData: any) => {
    setIsLoading(true);
    setLastFormData(formData);
    setGeneratedPlan(null);

    try {
      const plan = await generateStudyPlan(formData);
      setGeneratedPlan(plan);
      toast({
        title: 'Plano gerado com sucesso!',
        description: 'Revise seu plano de estudo e salve quando estiver satisfeito.',
      });
    } catch (error) {
      toast({
        title: 'Erro ao gerar plano',
        description: 'Tente novamente em alguns instantes.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (!generatedPlan) return;

    const fullPlan: StudyPlan = {
      ...generatedPlan,
      id: generateId(),
      createdAt: new Date().toISOString(),
      tags: [generatedPlan.subject.split(' ')[0]],
    };

    savePlan(fullPlan);
    toast({
      title: 'Plano salvo!',
      description: 'Acesse "Meus Planos" para ver todos os seus planos salvos.',
    });
    setGeneratedPlan(null);
    navigate('/meus-planos');
  };

  const handleRegenerate = async () => {
    if (lastFormData) {
      await handleSubmit(lastFormData);
    }
  };

  return (
    <Layout>
      <div className="page-transition max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Gerar Plano de Estudo
            <span className="text-accent"> com IA</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Crie um cronograma personalizado e inteligente para suas provas. 
            Nossa IA analisa seus dados e gera um plano otimizado para você.
          </p>
        </div>

        {!generatedPlan && !isLoading && (
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            <div className="card-elevated p-4 text-center">
              <Sparkles className="w-8 h-8 text-accent mx-auto mb-2" />
              <h3 className="font-medium">Personalizado</h3>
              <p className="text-sm text-muted-foreground">Adaptado ao seu nível</p>
            </div>
            <div className="card-elevated p-4 text-center">
              <Target className="w-8 h-8 text-accent mx-auto mb-2" />
              <h3 className="font-medium">Focado em Metas</h3>
              <p className="text-sm text-muted-foreground">Objetivos claros</p>
            </div>
            <div className="card-elevated p-4 text-center">
              <Calendar className="w-8 h-8 text-accent mx-auto mb-2" />
              <h3 className="font-medium">Cronograma Visual</h3>
              <p className="text-sm text-muted-foreground">Fácil de seguir</p>
            </div>
          </div>
        )}

        {!generatedPlan && (
          <div className="card-elevated p-6 sm:p-8">
            <FormGenerator onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        )}

        {isLoading && (
          <div className="space-y-6">
            <div className="text-center">
              <BookOpen className="w-12 h-12 text-accent mx-auto mb-4 animate-pulse" />
              <h2 className="font-heading text-xl font-semibold mb-2">
                Gerando seu plano de estudo...
              </h2>
              <p className="text-muted-foreground">
                Nossa IA está criando um cronograma personalizado para você.
              </p>
            </div>
            <SkeletonPlan />
            <SkeletonPlan />
          </div>
        )}

        {generatedPlan && !isLoading && (
          <GeneratedPlanDisplay
            plan={generatedPlan}
            onSave={handleSave}
            onRegenerate={handleRegenerate}
            isRegenerating={isLoading}
          />
        )}
      </div>
    </Layout>
  );
}
