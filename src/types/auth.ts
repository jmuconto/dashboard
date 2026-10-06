export type UserRole = 
  | 'CEO_CFO' 
  | 'SALES_MANAGER' 
  | 'FINANCE_MANAGER' 
  | 'HR_MANAGER' 
  | 'SALES_REP' 
  | 'FINANCE_STAFF' 
  | 'GENERAL_STAFF' 
  | 'AUDITOR';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
  department?: string;
}

export const ROLE_LABELS: Record<UserRole, string> = {
  CEO_CFO: 'Gestão de Topo (CEO/CFO)',
  SALES_MANAGER: 'Gestor de Vendas',
  FINANCE_MANAGER: 'Gestor Financeiro',
  HR_MANAGER: 'Gestor de RH',
  SALES_REP: 'Funcionário de Vendas',
  FINANCE_STAFF: 'Funcionário Financeiro',
  GENERAL_STAFF: 'Funcionário Geral',
  AUDITOR: 'Auditor/Consultor'
};

export interface PermissionMatrix {
  vendas: 'total' | 'receita_apenas' | 'pessoal' | 'agregado' | 'nenhum';
  financas: 'total' | 'operacional' | 'nenhum' | 'agregado' | 'custos_rh' | 'receita_apenas';
  rh: 'total' | 'pessoal' | 'equipa' | 'custos_apenas' | 'agregado' | 'nenhum';
  kpis: 'total' | 'vendas' | 'financeiro' | 'rh' | 'nenhum' | 'agregado';
  auditoria: 'total' | 'nenhum';
  configuracoes: 'total' | 'pessoal' | 'nenhum';
}

export const PERMISSIONS: Record<UserRole, PermissionMatrix> = {
  CEO_CFO: { vendas: 'total', financas: 'total', rh: 'total', kpis: 'total', auditoria: 'total', configuracoes: 'total' },
  SALES_MANAGER: { vendas: 'total', financas: 'receita_apenas', rh: 'equipa', kpis: 'vendas', auditoria: 'nenhum', configuracoes: 'pessoal' },
  FINANCE_MANAGER: { vendas: 'receita_apenas', financas: 'total', rh: 'custos_apenas', kpis: 'financeiro', auditoria: 'nenhum', configuracoes: 'pessoal' },
  HR_MANAGER: { vendas: 'nenhum', financas: 'custos_rh', rh: 'total', kpis: 'rh', auditoria: 'nenhum', configuracoes: 'pessoal' },
  SALES_REP: { vendas: 'pessoal', financas: 'nenhum', rh: 'pessoal', kpis: 'nenhum', auditoria: 'nenhum', configuracoes: 'pessoal' },
  FINANCE_STAFF: { vendas: 'nenhum', financas: 'operacional', rh: 'pessoal', kpis: 'nenhum', auditoria: 'nenhum', configuracoes: 'pessoal' },
  GENERAL_STAFF: { vendas: 'nenhum', financas: 'nenhum', rh: 'pessoal', kpis: 'nenhum', auditoria: 'nenhum', configuracoes: 'pessoal' },
  AUDITOR: { vendas: 'agregado', financas: 'agregado', rh: 'agregado', kpis: 'agregado', auditoria: 'total', configuracoes: 'pessoal' }
};

export interface AuditEntry {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  module: string;
  timestamp: string;
}
