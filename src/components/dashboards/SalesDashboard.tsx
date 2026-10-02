import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { StatCard, Card } from '../ui/Layout';
import { TrendingUp, DollarSign, Users, Package, Filter } from 'lucide-react';
import { DateRange } from '../ui/DateRangePicker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function SalesDashboard({ dateRange }: { dateRange: DateRange }) {
  // Simulate data filtering based on the selected range
  const getMultiplier = () => {
    switch(dateRange) {
      case '7d': return 0.2;
      case '30d': return 1;
      case '90d': return 2.8;
      case 'ytd': return 8.5;
      default: return 1;
    }
  };

  const multiplier = getMultiplier();

  const lineData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'],
    datasets: [{
      label: 'Receita (MZN)',
      data: [8.5, 9.2, 9.0, 10.1, 10.8, 11.2, 10.5, 11.8, 12.1, 12.45].map(v => v * multiplier),
      borderColor: '#2563eb',
      backgroundColor: 'rgba(37, 99, 235, 0.05)',
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 4,
    }]
  };

  const barData = {
    labels: ['Software ERP', 'Hardware POS', 'Consultoria IT', 'Licenças Cloud', 'Suporte Técnico', 'Formação'],
    datasets: [{
      label: 'Volume (MZN)',
      data: [4.5e6, 3.2e6, 2.1e6, 1.5e6, 1.15e6, 0.8e6].map(v => v * multiplier),
      backgroundColor: [
        '#2563eb',
        '#3b82f6',
        '#60a5fa',
        '#93c5fd',
        '#bfdbfe',
        '#dbeafe',
      ],
      borderRadius: 6,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0f172a',
        titleFont: { size: 12 },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 8,
      }
    },
    scales: {
      x: { 
        grid: { display: false },
        ticks: { color: '#94a3b8', font: { size: 11 } }
      },
      y: { 
        grid: { color: '#f1f5f9' },
        ticks: { color: '#94a3b8', font: { size: 11 } }
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Filter className="w-4 h-4 text-blue-600" />
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
          Filtro Ativo: {dateRange.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Receita Bruta Total"
          value={(12450000 * multiplier).toLocaleString()}
          unit="MZN"
          trend="up"
          trendValue="+14.5%"
          icon={DollarSign}
        />
        <StatCard 
          label="Margem de Lucro Líquido"
          value="25.4"
          unit="%"
          trend="up"
          trendValue="+3.2%"
          icon={TrendingUp}
        />
        <StatCard 
          label="Clientes B2B Ativos"
          value="142"
          trend="down"
          trendValue="-2.4%"
          icon={Users}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="Previsão de Crescimento de Receita (Milhões MZN)">
          <div className="h-72">
            <Line data={lineData} options={chartOptions} />
          </div>
        </Card>
        <Card title="Distribuição de Volume por Produto">
          <div className="h-72">
            <Bar data={barData} options={chartOptions} />
          </div>
        </Card>
      </div>

      <Card title="Transações Recentes">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-slate-400 font-medium border-b border-slate-100 dark:border-slate-800">
                <th className="pb-4 pr-4">Entidade</th>
                <th className="pb-4 px-4">Categoria</th>
                <th className="pb-4 px-4 text-right">Valor (MZN)</th>
                <th className="pb-4 pl-4 text-right">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {[
                { name: 'Caminhos de Ferro de Moçambique', cat: 'Manutenção ERP', amt: '450.000', status: 'Concluído' },
                { name: 'Standard Bank Maputo', cat: 'Auditoria de Segurança', amt: '1.200.000', status: 'Pendente' },
                { name: 'Vodacom Moçambique', cat: 'Expansão Cloud', amt: '890.500', status: 'Concluído' },
                { name: 'Electricidade de Moçambique', cat: 'Licenciamento', amt: '320.000', status: 'Falhou' },
                { name: 'Banco de Moçambique', cat: 'Infraestrutura', amt: '2.500.000', status: 'Concluído' },
                { name: 'Eni East Africa', cat: 'Consultoria IT', amt: '750.000', status: 'Concluído' },
                { name: 'Tmcel', cat: 'Suporte Técnico', amt: '120.000', status: 'Pendente' },
              ].map((row, i) => (
                <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 pr-4 font-semibold text-slate-900 dark:text-white truncate max-w-[200px]">{row.name}</td>
                  <td className="py-4 px-4 text-slate-500">{row.cat}</td>
                  <td className="py-4 px-4 text-right font-mono tabular-nums">{row.amt}</td>
                  <td className="py-4 pl-4 text-right">
                    <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${
                      row.status === 'Concluído' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' :
                      row.status === 'Pendente' ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/20' :
                      'bg-rose-50 text-rose-600 dark:bg-rose-900/20'
                    }`}>
                      {row.status}
                    </span>
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
