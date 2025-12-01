# 📚 StudyPlan AI - Gerador Inteligente de Planos de Estudo

Um aplicativo web moderno para gerar planos de estudo personalizados utilizando Inteligência Artificial. Organize seus estudos de forma eficiente com cronogramas diários, metas claras e visualização em calendário.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss)

---

## 🎯 Funcionalidades

### Geração de Planos com IA
- ✅ Formulário intuitivo para coletar informações do estudo
- ✅ Geração automática de cronograma até a data da prova
- ✅ Distribuição equilibrada de tarefas
- ✅ Metas diárias personalizadas
- ✅ Dicas de estudo e materiais recomendados

### Gerenciamento de Planos
- ✅ Salvar e organizar múltiplos planos
- ✅ Visualizar detalhes completos de cada plano
- ✅ Busca por título ou assunto
- ✅ Ordenação por data de criação ou da prova
- ✅ Exclusão de planos
- ✅ Exportação para Markdown

### Calendário / Cronograma
- ✅ Visualização mensal das tarefas
- ✅ Destaque para o dia da prova
- ✅ Indicadores visuais de tarefas por dia
- ✅ Modal com detalhes ao clicar em um dia
- ✅ Navegação entre meses

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição |
|------------|-----------|
| **React 18** | Biblioteca para construção de interfaces |
| **TypeScript** | Superset JavaScript com tipagem estática |
| **Vite** | Build tool e dev server ultrarrápido |
| **Tailwind CSS** | Framework CSS utilitário |
| **shadcn/ui** | Componentes UI acessíveis e customizáveis |
| **React Router** | Navegação entre páginas |
| **TanStack Query** | Gerenciamento de estado assíncrono |
| **date-fns** | Manipulação de datas |
| **Lucide React** | Ícones modernos |

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **bun** (gerenciador de pacotes)

### Verificar instalação

```bash
node --version
# v18.x.x ou superior

npm --version
# 9.x.x ou superior
```

---

## 🚀 Como Rodar Localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/studyplan-ai.git
cd studyplan-ai
```

### 2. Instale as dependências

```bash
# Com npm
npm install

# Ou com bun
bun install
```

### 3. Inicie o servidor de desenvolvimento

```bash
# Com npm
npm run dev

# Ou com bun
bun run dev
```

### 4. Acesse a aplicação

Abra o navegador e acesse:

```
http://localhost:8080
```

---

## 📁 Estrutura do Projeto

```
studyplan-ai/
├── public/                    # Arquivos públicos estáticos
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── layout/            # Componentes de layout
│   │   │   ├── Layout.tsx     # Layout principal
│   │   │   └── Navbar.tsx     # Barra de navegação
│   │   ├── study/             # Componentes de estudo
│   │   │   ├── CalendarView.tsx
│   │   │   ├── FormGenerator.tsx
│   │   │   ├── GeneratedPlanDisplay.tsx
│   │   │   ├── PlanCard.tsx
│   │   │   ├── PlanViewer.tsx
│   │   │   └── SkeletonPlan.tsx
│   │   └── ui/                # Componentes UI (shadcn)
│   ├── contexts/
│   │   └── StudyPlanContext.tsx  # Context global de planos
│   ├── hooks/                 # Hooks customizados
│   ├── lib/
│   │   └── utils.ts           # Funções utilitárias
│   ├── pages/                 # Páginas da aplicação
│   │   ├── Index.tsx          # Página de geração
│   │   ├── MeusPlanos.tsx     # Página de planos salvos
│   │   ├── Calendario.tsx     # Página de calendário
│   │   └── NotFound.tsx       # Página 404
│   ├── services/
│   │   └── ai.ts              # Serviço de integração com IA
│   ├── App.tsx                # Componente raiz
│   ├── index.css              # Estilos globais e tokens
│   └── main.tsx               # Ponto de entrada
├── index.html
├── tailwind.config.ts         # Configuração do Tailwind
├── vite.config.ts             # Configuração do Vite
├── tsconfig.json              # Configuração do TypeScript
└── package.json
```

---

## 📖 Como Usar

### 1. Gerar um Plano de Estudo

1. Acesse a página inicial **"Gerar Plano"**
2. Preencha o formulário com:
   - **Tema/Assunto**: O que você vai estudar
   - **Data da Prova**: Quando é a avaliação
   - **Tempo disponível**: Minutos por dia para estudar
   - **Nível atual**: Iniciante, intermediário ou avançado
   - **Preferências**: Resumos, exercícios, revisão ativa, etc.
   - **Objetivo**: Sua meta (ex: "Alcançar nota 9")
3. Clique em **"Gerar Plano de Estudo com IA"**
4. Aguarde a geração (skeleton loading)
5. Visualize o plano gerado e clique em **"Salvar Plano"**

### 2. Gerenciar Planos Salvos

1. Acesse **"Meus Planos"** no menu
2. Use a barra de busca para encontrar planos específicos
3. Ordene por data de criação ou data da prova
4. Clique em um card para ver detalhes
5. Use os botões de ação:
   - 👁️ Ver detalhes completos
   - 📥 Exportar para Markdown
   - 🗑️ Excluir plano

### 3. Visualizar no Calendário

1. Acesse **"Calendário"** no menu
2. Selecione um plano no dropdown
3. Navegue entre os meses
4. Clique em um dia para ver as tarefas
5. Dias com tarefas mostram indicadores coloridos
6. O dia da prova é destacado em vermelho

---

## ⚙️ Configuração da IA

O sistema utiliza um serviço de IA para gerar os planos. Para configurar:

### Opção 1: Usar o mock (padrão)

O sistema já vem com um gerador mock que simula a resposta da IA, perfeito para testes e desenvolvimento.

### Opção 2: Integrar com API real

Edite o arquivo `src/services/ai.ts` e substitua a função `generateStudyPlan`:

```typescript
export async function generateStudyPlan(data: StudyPlanInput): Promise<StudyPlanOutput> {
  const response = await fetch('SUA_API_URL', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SEU_TOKEN}`
    },
    body: JSON.stringify({
      prompt: buildPrompt(data)
    })
  });
  
  return response.json();
}
```

---

## 🎨 Personalização

### Temas e Cores

As cores são definidas em `src/index.css` usando variáveis CSS HSL:

```css
:root {
  --primary: 222 47% 31%;      /* Azul escuro */
  --accent: 38 92% 50%;        /* Âmbar/Dourado */
  --background: 210 40% 98%;   /* Fundo claro */
}

.dark {
  --primary: 213 31% 91%;
  --background: 222 47% 11%;
}
```

### Fontes

O projeto usa:
- **Playfair Display**: Títulos e headers
- **Inter**: Texto do corpo

---

## 📱 Responsividade

O aplicativo é totalmente responsivo e funciona em:

- 📱 Smartphones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Telas grandes (1440px+)

---

## ⌨️ Atalhos de Teclado

| Atalho | Ação |
|--------|------|
| `N` | Criar novo plano (em Meus Planos) |
| `Esc` | Fechar modais |

---

## 🧪 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Linting
npm run lint
```

---

## 📊 Estrutura dos Dados

### StudyPlan

```typescript
interface StudyPlan {
  id: string;
  subject: string;
  examDate: string;
  dailyTime: number;
  level: 'iniciante' | 'intermediario' | 'avancado';
  preferences: string[];
  goal: string;
  summary: string;
  schedule: DaySchedule[];
  goals: string[];
  tips: string[];
  materials: string[];
  createdAt: string;
}
```

### DaySchedule

```typescript
interface DaySchedule {
  date: string;
  tasks: Task[];
  totalTime: number;
}
```

### Task

```typescript
interface Task {
  id: string;
  title: string;
  type: 'resumo' | 'exercicio' | 'revisao' | 'leitura';
  duration: number;
  completed: boolean;
}
```

---

## 🔒 Armazenamento

Os dados são salvos no **localStorage** do navegador:

- **Chave**: `studyplans`
- **Formato**: JSON
- **Persistência**: Local no dispositivo

⚠️ **Importante**: Os dados são salvos apenas no navegador atual. Para backup, use a função de exportação.

---

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🙏 Agradecimentos

- [shadcn/ui](https://ui.shadcn.com/) - Componentes UI
- [Lucide](https://lucide.dev/) - Ícones
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Vite](https://vitejs.dev/) - Build tool

---

## 📞 Suporte

Encontrou um bug ou tem uma sugestão? Abra uma [issue](https://github.com/seu-usuario/studyplan-ai/issues) no GitHub.

---

<p align="center">
  Feito com ❤️ para estudantes
</p>
