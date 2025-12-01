import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Sparkles, Loader2 } from 'lucide-react';

interface FormData {
  subject: string;
  examDate: string;
  dailyTime: number;
  level: 'iniciante' | 'intermediario' | 'avancado';
  preferences: string[];
  goal: string;
}

interface FormGeneratorProps {
  onSubmit: (data: FormData) => Promise<void>;
  isLoading: boolean;
}

const studyStyles = [
  { id: 'resumos', label: 'Resumos' },
  { id: 'exercicios', label: 'Exercícios' },
  { id: 'revisao-ativa', label: 'Revisão Ativa' },
  { id: 'spaced-repetition', label: 'Spaced Repetition' },
];

export function FormGenerator({ onSubmit, isLoading }: FormGeneratorProps) {
  const [formData, setFormData] = useState<FormData>({
    subject: '',
    examDate: '',
    dailyTime: 60,
    level: 'intermediario',
    preferences: [],
    goal: '',
  });

  const handlePreferenceChange = (id: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      preferences: checked
        ? [...prev.preferences, id]
        : prev.preferences.filter(p => p !== id),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="subject" className="text-sm font-medium">
            Tema / Assunto Principal
          </Label>
          <Input
            id="subject"
            placeholder="Ex: Matemática - Cálculo Integral"
            value={formData.subject}
            onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
            className="input-styled"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="examDate" className="text-sm font-medium">
            Data da Prova
          </Label>
          <Input
            id="examDate"
            type="date"
            min={minDate}
            value={formData.examDate}
            onChange={(e) => setFormData(prev => ({ ...prev, examDate: e.target.value }))}
            className="input-styled"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dailyTime" className="text-sm font-medium">
            Tempo Disponível por Dia (minutos)
          </Label>
          <Input
            id="dailyTime"
            type="number"
            min={15}
            max={480}
            value={formData.dailyTime}
            onChange={(e) => setFormData(prev => ({ ...prev, dailyTime: parseInt(e.target.value) || 60 }))}
            className="input-styled"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="level" className="text-sm font-medium">
            Nível Atual
          </Label>
          <Select
            value={formData.level}
            onValueChange={(value: 'iniciante' | 'intermediario' | 'avancado') => 
              setFormData(prev => ({ ...prev, level: value }))
            }
          >
            <SelectTrigger className="input-styled">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="iniciante">Iniciante</SelectItem>
              <SelectItem value="intermediario">Intermediário</SelectItem>
              <SelectItem value="avancado">Avançado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium">Preferências de Estudo</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {studyStyles.map(style => (
            <label
              key={style.id}
              className="flex items-center gap-2 p-3 rounded-lg border border-border bg-card hover:bg-secondary/50 cursor-pointer transition-colors"
            >
              <Checkbox
                checked={formData.preferences.includes(style.id)}
                onCheckedChange={(checked) => handlePreferenceChange(style.id, checked as boolean)}
              />
              <span className="text-sm">{style.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="goal" className="text-sm font-medium">
          Objetivo Final
        </Label>
        <Textarea
          id="goal"
          placeholder="Ex: Alcançar nota 9 na prova, dominar os conceitos fundamentais..."
          value={formData.goal}
          onChange={(e) => setFormData(prev => ({ ...prev, goal: e.target.value }))}
          className="input-styled min-h-[100px]"
        />
      </div>

      <Button 
        type="submit" 
        disabled={isLoading || !formData.subject || !formData.examDate}
        className="w-full btn-accent h-12 text-base font-semibold gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Gerando Plano...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Gerar Plano de Estudo com IA
          </>
        )}
      </Button>
    </form>
  );
}
