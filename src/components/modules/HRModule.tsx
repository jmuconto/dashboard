import React from 'react';
import { Card, StatCard } from '../ui/Layout';
import { HR_DATA } from '../../data/mockData';
import { useAuditLog } from '../../hooks/useAuditLog';
import { UserRole } from '../../types/auth';
import { 
  Users, 
  UserPlus, 
  Clock, 
  GraduationCap, 
  FileText, 
  Calendar,
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';
import { exportToExcel } from '../../utils/export';

interface HRModuleProps {
  viewMode: 'total' | 'pessoal' | 'equipa' | 'custos_apenas' | 'agregado';
  currentUser: { id: string; name: string; role: UserRole };
}

export default function HRModule({ viewMode, currentUser }: HRModuleProps) {
  useAuditLog(currentUser.id, currentUser.name, currentUser.role, 'Recursos Humanos');

  if (viewMode === 'pessoal') {
    return <EmployeeHRView />;
  }

  return <ManagerHRView viewMode={viewMode} />;
}

function ManagerHRView({ viewMode }: { viewMode: string }) {
  const data = HR_DATA.manager;

  const handleExport = () => {
    exportToExcel(data.headcount, 'Colaboradores_por_Departamento_vona360', 'RH');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Gestão de Capital Humano</h2>
        <button 
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors"
        >
          <FileSpreadsheet className="w-4 h-4" />
          Exportar Lista
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Colaboradores" value="60" icon={Users} />
        <StatCard label="Absentismo" value={data.absenteeism} icon={Clock} trend="down" trendValue="-0.5%" />
        <StatCard label="Turnover" value={data.turnover} icon={UserPlus} />
        <StatCard label="Custo Médio" value={data.avgCost} icon={FileText} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="Distribuição por Departamento">
          <div className="space-y-4">
            {data.headcount.map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-500">{item.dept}</span>
                <div className="flex-1 mx-4 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500" style={{ width: `${(item.count / 25) * 100}%` }} />
                </div>
                <span className="text-sm font-mono font-bold text-slate-900 dark:text-white">{item.count}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Formação e Avaliação">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Progresso de Formação</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">{data.training.completed} / {data.training.planned}</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '70.8%' }} />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Avaliações Pendentes</p>
                  <p className="text-xs text-amber-600">{data.pendingEvaluations} gestores não concluíram o ciclo</p>
                </div>
              </div>
              <button className="px-3 py-1 bg-amber-600 text-white text-[10px] font-bold rounded-lg uppercase tracking-wider">
                Notificar
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function EmployeeHRView() {
  const data = HR_DATA.employee;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Saldo de Férias</p>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{data.vacation.balance} dias</h3>
            <p className="text-[10px] text-slate-500">{data.vacation.pending} dias em aprovação</p>
          </div>
        </Card>

        <Card title="Últimos Recibos">
          <div className="space-y-2">
            {data.payslips.map((slip, i) => (
              <div key={i} className="flex justify-between items-center py-1">
                <span className="text-sm text-slate-600 dark:text-slate-400">{slip.month}</span>
                <button className="text-[10px] font-bold text-blue-600 hover:underline">Download PDF</button>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Minhas Formações">
          <div className="space-y-2">
            {data.trainings.map((t, i) => (
              <div key={i} className="flex justify-between items-center py-1">
                <span className="text-sm text-slate-600 dark:text-slate-400">{t.name}</span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  t.status === 'Concluído' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
