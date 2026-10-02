# DashOne — Plataforma de Business Intelligence & Desempenho para o Contexto Moçambicano 🇲🇿

**DashOne** é uma plataforma modular de demonstração desenvolvida em um único ficheiro HTML (`index.html`) que integra múltiplos dashboards interativos em tempo real. Projetada para ambientes empresariais e institucionais em Moçambique, a ferramenta combina gráficos dinâmicos, suporte a upload de ficheiros CSV, dados fictícios parametrizados (em Meticais - MZN e métricas académicas locais) e alternância fluida entre diferentes módulos.

---

## 🚀 Módulos Disponíveis na Demo

### 1. Dashboard de Vendas e Receitas por Área de Negócio (Empresa Média)
* **Foco:** Gestão financeira corporativa e acompanhamento de metas de faturação.
* **Moeda:** Meticais (MZN).
* **Funcionalidades:**
  * Indicadores globais (Faturamento Total, Despesas, Margem de Lucro e Faturação Pendente / Contas a Receber).
  * Gráficos dinâmicos (Evolução Mensal vs. Meta e Distribuição por Área de Negócio: Soluções Tecnológicas, Logística & Distribuição, Equipamentos Industriais, etc.).
  * Alertas de cobrança proativa para faturas pendentes.
  * Filtros em tempo real por período, região (Maputo, Beira, Nampula, Tete) e área.

### 2. Painel de Desempenho Académico
* **Foco:** Gestão escolar e acompanhamento pedagógico.
* **Sistema de Avaliação:** Escala de 0 a 20 valores.
* **Funcionalidades:**
  * Indicadores de taxa de aprovação, média geral, total de alunos e frequência.
  * Gráficos de aproveitamento por disciplina e distribuição de notas por turmas (ex: 10ª Classe, 12ª Classe).
  * Tabela detalhada de desempenho por professor e disciplina com alertas de risco de reprovação.

### 3. Monitoria de Promotores de Vendas (Trade Marketing / Campo)
* **Foco:** Gestão de equipas comerciais em campo e auditoria de pontos de venda (PDV).
* **Equipa Demo (3 Promotores):** Edmilson Chissano, Rofino Macamo e Célia Mondlane.
* **Funcionalidades:**
  * Acompanhamento de KPIs diários: Visitas realizadas, rupturas de stock detetadas, ativações de produtos e volume de vendas em campo (Supermercados, Lojas de Bairro e Grossistas em Maputo e Matola).
  * Gráficos de cumprimento de rotas e performance individual dos promotores.
  * Simulação de mapa de localização e status de check-in em tempo real.

---

## 🛠️ Tecnologias e Arquitetura

O projeto foi construído para ser incrivelmente leve, portátil e sem dependências complexas de servidores backend:
* **HTML5 & Tailwind CSS:** Estilização moderna, responsiva, com suporte integrado a modo claro/escuro.
* **JavaScript (Vanilla):** Lógica reativa para manipulação do DOM, filtragem de dados em tempo real e processamento de ficheiros CSV enviados pelo utilizador.
* **Chart.js:** Renderização de gráficos interativos (linhas, barras, rosca e radar).
* **FontAwesome:** Iconografia corporativa moderna.
* **Single-Page Application (SPA):** Navegação instantânea e sem recarregamentos através de abas unificadas no mesmo ficheiro `index.html`.

---

## 📦 Como Usar

Não é necessário instalar Node.js, Python ou configurar bases de dados para testar a aplicação.

1. Faça o download ou clone o repositório:
   ```bash
   git clone [https://github.com/seu-utilizador/dashone.git](https://github.com/seu-utilizador/dashone.git)
