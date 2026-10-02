import { Bar, Doughnut } from 'react-chartjs-2';
import { StatCard, Card } from '../ui/Layout';
import { BookOpen, GraduationCap, Users, AlertTriangle, Filter } from 'lucide-react';
import { DateRange } from '../ui/DateRangePicker';

export default function AcademicDashboard({ dateRange }: { dateRange: DateRange }) {
  const barData = {
    labels: ['Português', 'Matemática', 'Físico-Química', 'História', 'Geografia', 'Biologia', 'Inglês', 'E.V.', 'Filosofia', 'T.I.C.'],
    datasets: [{
      label: 'Média (0-20)',
      data: [14.2, 9.8, 8.5, 15.1, 14.8, 13.5, 16.2, 17.0, 12.5, 18.2],
      backgroundColor: '#6366f1',
      borderRadius: 4,
    }]
  };

  const doughnutData = {
    labels: ['Aprovados (>=10)', 'Reprovados (<10)'],
    datasets: [{
      data: [82, 18],
      backgroundColor: ['#10b981', '#ef4444'],
      borderWidth: 0,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: { 
        beginAtZero: true, 
        max: 20,
        ticks: { font: { size: 10 } }
      },
      x: { 
        ticks: { font: { size: 10 } }
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard 
          label="Média Geral da Escola"
          value="13.8"
          unit="/ 20"
          icon={BookOpen}
        />
        <StatCard 
          label="Total de Alunos"
          value="1.245"
          icon={Users}
        />
        <StatCard 
          label="Taxa de Aprovação"
          value="82"
          unit="%"
          trend="up"
          trendValue="+5%"
          icon={GraduationCap}
        />
        <StatCard 
          label="Disciplinas Críticas"
          value="2"
          icon={AlertTriangle}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card title="Desempenho Médio por Disciplina" className="lg:col-span-2">
          <div className="h-64">
            <Bar data={barData} options={chartOptions} />
          </div>
        </Card>
        <Card title="Estado de Aproveitamento">
          <div className="h-64 flex items-center justify-center relative">
            <Doughnut data={doughnutData} options={{ ...chartOptions, cutout: '70%' }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">82%</span>
              <span className="text-[10px] text-slate-500 font-semibold uppercase">Aprovados</span>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Alertas de Desempenho Crítico">
        <div className="space-y-4">
          {[
            { subject: 'Matemática', issue: 'Média de 9.8', status: 'Aviso', color: 'amber' },
            { subject: 'Físico-Química', issue: 'Média de 8.5', status: 'Crítico', color: 'rose' },
            { subject: 'Biologia', issue: 'Queda de 12% na participação', status: 'Atenção', color: 'amber' },
            { subject: 'Filosofia', issue: 'Média de 10.2 (Limite)', status: 'Risco', color: 'amber' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${item.color === 'amber' ? 'bg-amber-500' : 'bg-rose-500'}`} />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{item.subject}</p>
                  <p className="text-xs text-slate-500">{item.issue}</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${
                item.color === 'amber' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
