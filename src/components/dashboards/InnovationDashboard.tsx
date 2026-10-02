import { Line, Bar } from 'react-chartjs-2';
import { StatCard, Card } from '../ui/Layout';
import { ShieldCheck, Cpu, Database, Network, Filter } from 'lucide-react';
import { DateRange } from '../ui/DateRangePicker';

export default function InnovationDashboard({ dateRange }: { dateRange: DateRange }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Filter className="w-4 h-4 text-blue-600" />
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
          Filtro Ativo: {dateRange.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex items-center gap-6">
          <div className="relative w-16 h-16 shrink-0">
             <svg className="w-full h-full transform -rotate-90">
               <circle cx="32" cy="32" r="28" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-slate-100 dark:text-slate-800" />
               <circle cx="32" cy="32" r="28" fill="transparent" stroke="currentColor" strokeWidth="4" strokeDasharray={175.9} strokeDashoffset={175.9 * (1 - 0.92)} className="text-blue-600" />
             </svg>
             <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-slate-900 dark:text-white">
               92%
             </div>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Conformidade</p>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Auditoria ISO 56002</h3>
            <p className="text-xs text-emerald-500 mt-1">✓ Aprovada Out 2026</p>
          </div>
        </Card>

        <StatCard 
          label="Estabilidade APIs C#"
          value="99.98"
          unit="%"
          icon={Cpu}
        />

        <StatCard 
          label="Débito Oban (Elixir)"
          value="12.5"
          unit="k jobs/h"
          trend="up"
          trendValue="+12%"
          icon={Database}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="Velocidade da Equipa Scrum (Story Points)">
          <div className="h-64">
            <Bar 
              data={{
                labels: ['Sprint 41', 'Sprint 42', 'Sprint 43', 'Sprint 44'],
                datasets: [
                  { label: 'Concluído', data: [85, 92, 78, 65], backgroundColor: '#8b5cf6', borderRadius: 4 },
                  { label: 'Bugs (UAT)', data: [12, 8, 15, 3], backgroundColor: '#f43f5e', borderRadius: 4 }
                ]
              }} 
              options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 } } } }
              }} 
            />
          </div>
        </Card>

        <Card title="Processamento de Jobs Oban (Elixir/Phoenix)">
          <div className="h-64">
            <Line 
              data={{
                labels: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00'],
                datasets: [{
                  label: 'Jobs Processados',
                  data: [5000, 8200, 12500, 11000, 6000, 5500],
                  borderColor: '#8b5cf6',
                  backgroundColor: 'rgba(139, 92, 246, 0.05)',
                  fill: true,
                  tension: 0.3,
                  pointRadius: 0
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { x: { grid: { display: false } }, y: { grid: { color: '#f1f5f9' } } }
              }}
            />
          </div>
        </Card>
      </div>

      <Card title="Saúde dos Nós do Sistema">
         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: 'Gateway-01', status: 'Saudável', load: '12%' },
              { name: 'Worker-Alpha', status: 'Saudável', load: '45%' },
              { name: 'DB-Primary', status: 'Saudável', load: '28%' },
              { name: 'Cache-Redis', status: 'Saudável', load: '5%' },
              { name: 'Auth-Node', status: 'Saudável', load: '18%' },
              { name: 'Search-Indexer', status: 'Carga Alta', load: '82%' },
              { name: 'Mail-Relay', status: 'Saudável', load: '2%' },
              { name: 'Backup-Sync', status: 'Inativo', load: '0%' },
            ].map((node, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{node.name}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{node.load}</span>
                  <div className={`w-2 h-2 rounded-full shadow-sm ${
                    node.status === 'Saudável' ? 'bg-emerald-500' : 
                    node.status === 'Carga Alta' ? 'bg-amber-500' : 'bg-slate-300'
                  }`} />
                </div>
                <p className="text-[9px] mt-1 text-slate-500 font-medium">{node.status}</p>
              </div>
            ))}
         </div>
      </Card>
    </div>
  );
}
