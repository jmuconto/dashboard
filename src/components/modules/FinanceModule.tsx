import React from 'react';
import { Card, StatCard } from '../ui/Layout';
import { FINANCE_DATA } from '../../data/mockData';
import { useAuditLog } from '../../hooks/useAuditLog';
import { UserRole } from '../../types/auth';
import { 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  FileSpreadsheet
} from 'lucide-react';
import { exportToExcel } from '../../utils/export';

interface FinanceModuleProps {
  viewMode: 'total' | 'operacional' | 'nenhum' | 'agregado' | 'custos_rh' | 'receita_apenas';
  currentUser: { id: string; name: string; role: UserRole };
}

export default function FinanceModule({ viewMode, currentUser }: FinanceModuleProps) {
  useAuditLog(currentUser.id, currentUser.name, currentUser.role, 'Financeiro');

  if (viewMode === 'operacional') {
    return <EmployeeFinanceView />;
  }

  return <ManagerFinanceView viewMode={viewMode} />;
}

function ManagerFinanceView({ viewMode }: { viewMode: string }) {
  const data = FINANCE_DATA.manager;

  const handleExport = () => {
    exportToExcel(data.budget, 'Execucao_Orcamental_vona360', 'Orcamento');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Relatórios Financeiros</h2>
        <button 
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors"
        >
          <FileSpreadsheet className="w-4 h-4" />
          Exportar Orçamento
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Saldo Disponível" value={data.cashFlow.balance} unit="MZN" icon={DollarSign} />
        <StatCard label="Entradas do Mês" value={data.cashFlow.in} unit="MZN" icon={ArrowUpRight} trend="up" trendValue="+5%" />
        <StatCard label="Saídas do Mês" value={data.cashFlow.out} unit="MZN" icon={ArrowDownRight} trend="down" trendValue="-2%" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="Aging - Contas a Receber">
          <div className="space-y-4">
            {data.accountsReceivable.map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-500">{item.range}</span>
                <div className="flex-1 mx-4 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: `${(parseFloat(item.value) / 4.2) * 100}%` }} />
                </div>
                <span className="text-sm font-mono font-bold text-slate-900 dark:text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Execução Orçamental por Categoria">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-[10px] text-slate-400 uppercase font-bold border-b border-slate-100 dark:border-slate-800">
                  <th className="pb-3 pr-4">Categoria</th>
                  <th className="pb-3 px-4 text-right">Planeado</th>
                  <th className="pb-3 px-4 text-right">Realizado</th>
                  <th className="pb-3 pl-4 text-right">Desvio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {data.budget.map((item, i) => (
                  <tr key={i}>
                    <td className="py-4 pr-4 font-semibold text-slate-700 dark:text-slate-300">{item.cat}</td>
                    <td className="py-4 px-4 text-right font-mono">{item.planned}</td>
                    <td className="py-4 px-4 text-right font-mono">{item.actual}</td>
                    <td className={`py-4 pl-4 text-right font-bold ${item.diff > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                      {item.diff > 0 ? '+' : ''}{item.diff}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-slate-50 dark:bg-slate-900/50">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Margem Bruta</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{data.margins.gross}</p>
        </Card>
        <Card className="bg-slate-50 dark:bg-slate-900/50">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Margem Operacional</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{data.margins.operational}</p>
        </Card>
        <Card className="bg-slate-50 dark:bg-slate-900/50">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">EBITDA</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{data.margins.ebitda}</p>
        </Card>
      </div>
    </div>
  );
}

function EmployeeFinanceView() {
  const data = FINANCE_DATA.employee;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="flex flex-col items-center text-center p-8">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 mb-4">
          <Clock className="w-6 h-6" />
        </div>
        <h3 className="text-3xl font-bold text-slate-900 dark:text-white font-mono">{data.pendingInvoices}</h3>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-2">Facturas Pendentes</p>
      </Card>
      
      <Card className="flex flex-col items-center text-center p-8">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 mb-4">
          <DollarSign className="w-6 h-6" />
        </div>
        <h3 className="text-3xl font-bold text-slate-900 dark:text-white font-mono">{data.paymentsThisWeek}</h3>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-2">Pagamentos / Semana</p>
      </Card>

      <Card className="flex flex-col items-center text-center p-8">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h3 className="text-3xl font-bold text-slate-900 dark:text-white font-mono">{data.unapprovedExpenses}</h3>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-2">Despesas por Aprovar</p>
      </Card>

      <Card className="flex flex-col items-center text-center p-8">
        <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 mb-4">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-3xl font-bold text-slate-900 dark:text-white font-mono">{data.reconciliations}</h3>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-2">Reconciliações</p>
      </Card>
    </div>
  );
}
