import { UserRole } from '../types/auth';

export const STRATEGIC_KPIS = [
  { label: 'EBITDA', value: '4.2M', unit: 'MZN', trend: 'up', trendValue: '+12%', status: 'success' },
  { label: 'Crescimento Receita (YoY)', value: '18.5', unit: '%', trend: 'up', trendValue: '+2%', status: 'success' },
  { label: 'Margem Líquida', value: '14.2', unit: '%', trend: 'down', trendValue: '-1.5%', status: 'warning' },
  { label: 'Autonomia Financeira', value: '62', unit: '%', trend: 'neutral', trendValue: '0%', status: 'success' },
  { label: 'Prazo Médio Recebimentos', value: '42', unit: 'dias', trend: 'up', trendValue: '+5 dias', status: 'danger' },
];

export const SALES_DATA = {
  manager: {
    totalRevenue: { value: '12.4M', meta: '15M', percent: 82.6 },
    byProduct: [
      { name: 'Software ERP', value: 4500000 },
      { name: 'Hardware POS', value: 3200000 },
      { name: 'Consultoria IT', value: 2100000 },
      { name: 'Licenças Cloud', value: 1500000 },
      { name: 'Suporte', value: 1100000 },
    ],
    byRegion: [
      { name: 'Maputo', value: 6500000 },
      { name: 'Matola', value: 3200000 },
      { name: 'Beira', value: 1800000 },
      { name: 'Nampula', value: 900000 },
    ],
    topClients: [
      { name: 'Caminhos de Ferro de Moçambique', revenue: '2.5M' },
      { name: 'Standard Bank', revenue: '1.8M' },
      { name: 'Vodacom', revenue: '1.4M' },
      { name: 'EDM', revenue: '1.1M' },
      { name: 'Hulene Logística', revenue: '850k' },
    ],
    inactiveClients: [
      { name: 'Livraria Central', days: 112 },
      { name: 'Papelaria Rex', days: 95 },
    ]
  },
  employee: {
    personalSales: '850k',
    personalMeta: '1.2M',
    ranking: 3,
    totalTeam: 12,
    opportunities: [
      { client: 'Mcel-Tmcel', value: '450k', stage: 'Proposta', nextAction: 'Reunião 08/10' },
      { client: 'BCI', value: '1.2M', stage: 'Negociação', nextAction: 'Telefonema 06/10' },
    ]
  }
};

export const FINANCE_DATA = {
  manager: {
    cashFlow: { in: '12.4M', out: '9.8M', balance: '2.6M' },
    accountsReceivable: [
      { range: '0-30 dias', value: '4.2M' },
      { range: '31-60 dias', value: '1.8M' },
      { range: '61-90 dias', value: '950k' },
      { range: '> 90 dias', value: '420k' },
    ],
    accountsPayable: [
      { range: '0-30 dias', value: '2.1M' },
      { range: '31-60 dias', value: '850k' },
      { range: '> 60 dias', value: '120k' },
    ],
    margins: { gross: '32%', operational: '18%', ebitda: '14%' },
    budget: [
      { cat: 'Operacional', planned: '4.5M', actual: '4.2M', diff: -6.6 },
      { cat: 'RH', planned: '3.2M', actual: '3.4M', diff: 6.2 },
      { cat: 'Marketing', planned: '1.2M', actual: '0.8M', diff: -33.3 },
    ]
  },
  employee: {
    pendingInvoices: 12,
    paymentsThisWeek: 8,
    unapprovedExpenses: 5,
    reconciliations: 3
  }
};

export const HR_DATA = {
  manager: {
    headcount: [
      { dept: 'Vendas', count: 12 },
      { dept: 'Financeiro', count: 5 },
      { dept: 'Tecnologia', count: 18 },
      { dept: 'Logística', count: 25 },
    ],
    absenteeism: '4.2%',
    turnover: '8.5%',
    avgCost: '45k MZN',
    overtime: '142h',
    training: { completed: 85, planned: 120 },
    pendingEvaluations: 4
  },
  employee: {
    vacation: { balance: 18, pending: 2 },
    payslips: [
      { month: 'Setembro 2026', date: '28/09' },
      { month: 'Agosto 2026', date: '27/08' },
    ],
    trainings: [
      { name: 'Segurança de Dados', status: 'Concluído' },
      { name: 'Gestão de Tempo', status: 'Em Curso' },
    ]
  }
};

export const ALERTS = [
  { id: 1, type: 'danger', area: 'vendas', title: 'Meta mensal em risco', description: 'Realizado 62% no dia 15. Recomenda-se focar no fecho do pipeline "A".', action: 'Ver Pipeline' },
  { id: 2, type: 'warning', area: 'financas', title: 'Saldo abaixo do mínimo', description: 'Fluxo de caixa projetado para amanhã atinge 95% do limite prudencial.', action: 'Ver Fluxo' },
  { id: 3, type: 'danger', area: 'rh', title: 'Contrato a expirar', description: 'O contrato de "Rofino Macamo" expira em 45 dias.', action: 'Renovar' },
  { id: 4, type: 'info', area: 'vendas', title: 'Cliente sem contacto', description: 'Standard Bank não é contactado há 32 dias.', action: 'Agendar Chamada' },
];
