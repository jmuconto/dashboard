import React from 'react';
import { Card, StatCard } from '../ui/Layout';
import { SALES_DATA } from '../../data/mockData';
import { Bar, Line } from 'react-chartjs-2';
import { useAuditLog } from '../../hooks/useAuditLog';
import { UserRole } from '../../types/auth';
import { 
  Users, 
  Target, 
  Trophy, 
  Calendar, 
  ArrowRight, 
  MapPin, 
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';
import { exportToExcel } from '../../utils/export';

interface SalesModuleProps {
  viewMode: 'total' | 'receita_apenas' | 'pessoal' | 'agregado';
  currentUser: { id: string; name: string; role: UserRole };
}

export default function SalesModule({ viewMode, currentUser }: SalesModuleProps) {
  useAuditLog(currentUser.id, currentUser.name, currentUser.role, 'Vendas');

  if (viewMode === 'pessoal') {
    return <EmployeeSalesView />;
  }

  return <ManagerSalesView viewMode={viewMode} />;
}

function ManagerSalesView({ viewMode }: { viewMode: string }) {
  const data = SALES_DATA.manager;

  const handleExport = () => {
    exportToExcel(data.topClients, 'Top_Clientes_vona360', 'Clientes');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Análise de Vendas</h2>
        <button 
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors"
        >
          <FileSpreadsheet className="w-4 h-4" />
          Exportar Excel
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          label="Receita Total Realizada"
          value={data.totalRevenue.value}
          unit="MZN"
          trend="up"
          trendValue="+12.4%"
          icon={Target}
        />
        <Card className="flex flex-col justify-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Meta Mensal</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-mono">{data.totalRevenue.meta}</h3>
            <span className="text-xs font-medium text-slate-500">MZN</span>
          </div>
          <div className="mt-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div 
              className={`h-full rounded-full ${data.totalRevenue.percent >= 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
              style={{ width: `${data.totalRevenue.percent}%` }} 
            />
          </div>
          <p className="mt-2 text-[10px] font-bold text-slate-500">{data.totalRevenue.percent}% atingido</p>
        </Card>
        <StatCard 
          label="Ticket Médio"
          value="45.2k"
          unit="MZN"
          trend="neutral"
          trendValue="0%"
          icon={Users}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="Receita por Região (MZN)">
          <div className="space-y-4">
            {data.byRegion.map((region, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-20 text-xs font-bold text-slate-500">{region.name}</div>
                <div className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-full h-4 overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${(region.value / data.byRegion[0].value) * 100}%` }} 
                  />
                </div>
                <div className="w-16 text-right text-xs font-mono font-bold text-slate-900 dark:text-white">
                  {(region.value / 1e6).toFixed(1)}M
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Top 5 Clientes">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {data.topClients.map((client, i) => (
              <div key={i} className="py-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-[10px] font-bold text-blue-600">
                    {i + 1}
                  </div>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{client.name}</span>
                </div>
                <span className="text-sm font-mono font-bold text-slate-900 dark:text-white">{client.revenue}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Alertas de Inatividade (>90 dias)" className="border-rose-200 dark:border-rose-900/30">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.inactiveClients.map((client, i) => (
            <div key={i} className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/20 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{client.name}</p>
                <p className="text-xs text-rose-600 font-medium">{client.days} dias sem transações</p>
              </div>
              <button className="p-2 text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-900/30 rounded-lg transition-colors">
                <Calendar className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function EmployeeSalesView() {
  const data = SALES_DATA.employee;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          label="Minhas Vendas (Mês)"
          value={data.personalSales}
          unit="MZN"
          icon={Target}
        />
        <Card className="flex flex-col justify-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Minha Meta Individual</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-mono">{data.personalMeta}</h3>
          <div className="mt-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: '71%' }} />
          </div>
          <p className="mt-2 text-[10px] font-bold text-slate-500">71% atingido</p>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ranking</p>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">#{data.ranking} <span className="text-xs font-normal text-slate-400">de {data.totalTeam}</span></h3>
          </div>
        </Card>
      </div>

      <Card title="Minhas Oportunidades em Aberto">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] text-slate-400 uppercase font-bold border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="pb-3 pr-4">Cliente</th>
                <th className="pb-3 px-4">Valor Estimado</th>
                <th className="pb-3 px-4">Estágio</th>
                <th className="pb-3 pl-4">Próxima Acção</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {data.opportunities.map((opp, i) => (
                <tr key={i} className="group">
                  <td className="py-4 pr-4 font-bold text-slate-900 dark:text-white">{opp.client}</td>
                  <td className="py-4 px-4 font-mono">{opp.value} MZN</td>
                  <td className="py-4 px-4">
                    <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                      {opp.stage}
                    </span>
                  </td>
                  <td className="py-4 pl-4 text-slate-500 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    {opp.nextAction}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
