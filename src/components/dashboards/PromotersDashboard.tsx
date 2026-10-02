import { Bar, Pie } from 'react-chartjs-2';
import { StatCard, Card } from '../ui/Layout';
import { MapPin, UserCheck, TrendingUp, Search, Filter } from 'lucide-react';
import { DateRange } from '../ui/DateRangePicker';

const PROMOTERS = [
  { 
    name: 'Edmilson', 
    region: 'Matola-Rio', 
    visits: 45, 
    revenue: '120.500', 
    status: 'Em Rota',
    avatar: "/src/assets/images/avatar_promoter_1_1790979883558.jpg"
  },
  { 
    name: 'Célia', 
    region: 'Maputo Central', 
    visits: 38, 
    revenue: '98.200', 
    status: 'Em Rota',
    avatar: "/src/assets/images/avatar_promoter_2_1790979895779.jpg"
  },
  { 
    name: 'Rofino', 
    region: 'Zimpeto / Marracuene', 
    visits: 29, 
    revenue: '65.000', 
    status: 'Pausa',
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rofino"
  },
  { 
    name: 'Anabela', 
    region: 'Beira - Baixa', 
    visits: 52, 
    revenue: '145.000', 
    status: 'Em Rota',
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anabela"
  },
  { 
    name: 'Joaquim', 
    region: 'Nampula - Central', 
    visits: 31, 
    revenue: '82.400', 
    status: 'Em Rota',
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joaquim"
  },
];

export default function PromotersDashboard({ dateRange }: { dateRange: DateRange }) {
  const barData = {
    labels: PROMOTERS.map(p => p.name),
    datasets: [
      {
        label: 'Realizado (MZN)',
        data: [120500, 98200, 65000, 145000, 82400],
        backgroundColor: '#f59e0b',
        borderRadius: 4,
      },
      {
        label: 'Meta Diária (MZN)',
        data: [100000, 100000, 100000, 100000, 100000],
        backgroundColor: '#fde68a',
        borderRadius: 4,
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Filter className="w-4 h-4 text-blue-600" />
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
          Filtro Ativo: {dateRange.toUpperCase()}
        </span>
      </div>

      <div className="bg-gradient-to-r from-orange-600 to-amber-500 rounded-2xl p-8 text-white shadow-lg flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Operação Nacional Moçambique</h2>
          <p className="text-orange-100/80 text-sm">Inteligência de campo e monitoria de promotores em tempo real.</p>
        </div>
        <div className="flex gap-12 text-center">
          <div>
            <p className="text-3xl font-bold font-mono">195</p>
            <p className="text-[10px] uppercase tracking-widest text-orange-200 font-bold">Visitas Hoje</p>
          </div>
          <div className="h-10 w-px bg-white/20 hidden md:block" />
          <div>
            <p className="text-3xl font-bold font-mono">24%</p>
            <p className="text-[10px] uppercase tracking-widest text-orange-200 font-bold">Conversão</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="Desempenho Individual vs Meta Diária">
          <div className="h-64">
            <Bar data={barData} options={{ 
              responsive: true, 
              maintainAspectRatio: false,
              plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 } } } }
            }} />
          </div>
        </Card>
        
        <Card title="Estado da Equipa em Tempo Real">
          <div className="space-y-3">
            {PROMOTERS.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <div className="flex items-center gap-3">
                  <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{p.name}</p>
                    <p className="text-[11px] text-slate-500">{p.region}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-mono font-bold text-slate-900 dark:text-white">{p.revenue} MZN</p>
                  <span className={`text-[9px] font-bold uppercase tracking-wider ${p.status === 'Em Rota' ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Distribuição Regional de Vendas">
         <div className="h-64 flex items-center justify-center">
            <Pie data={{
              labels: ['Maputo Cidade', 'Matola', 'Beira', 'Nampula', 'Outros'],
              datasets: [{
                data: [450000, 320000, 145000, 82400, 45000],
                backgroundColor: ['#f59e0b', '#fbbf24', '#fcd34d', '#fbd38d', '#fef3c7'],
                borderWidth: 0
              }]
            }} options={{ responsive: true, maintainAspectRatio: false }} />
         </div>
      </Card>
    </div>
  );
}
