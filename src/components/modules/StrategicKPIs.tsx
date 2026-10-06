import React from 'react';
import { Card } from '../ui/Layout';
import { STRATEGIC_KPIS } from '../../data/mockData';
import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';
import { useAuditLog } from '../../hooks/useAuditLog';
import { UserRole } from '../../types/auth';

interface StrategicKPIsProps {
  currentUser: { id: string; name: string; role: UserRole };
}

export default function StrategicKPIs({ currentUser }: StrategicKPIsProps) {
  useAuditLog(currentUser.id, currentUser.name, currentUser.role, 'KPIs Estratégicos');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">KPIs Estratégicos (Gestão de Topo)</h2>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Tempo Real</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {STRATEGIC_KPIS.map((kpi, i) => (
          <Card key={i} className="relative overflow-hidden group hover:border-blue-500/50 transition-colors">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider leading-tight max-w-[80%]">
                  {kpi.label}
                </p>
                <div className={`p-1.5 rounded-md ${
                  kpi.status === 'success' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' :
                  kpi.status === 'warning' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600' :
                  'bg-rose-50 dark:bg-rose-900/20 text-rose-600'
                }`}>
                  {kpi.trend === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : 
                   kpi.trend === 'down' ? <TrendingDown className="w-3.5 h-3.5" /> : 
                   <Minus className="w-3.5 h-3.5" />}
                </div>
              </div>
              
              <div className="flex items-baseline gap-1">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">
                  {kpi.value}
                </h3>
                <span className="text-xs font-semibold text-slate-400">{kpi.unit}</span>
              </div>
              
              <div className="flex items-center gap-1.5 pt-1">
                <span className={`text-[10px] font-bold ${
                  kpi.status === 'success' ? 'text-emerald-500' :
                  kpi.status === 'warning' ? 'text-amber-500' : 'text-rose-500'
                }`}>
                  {kpi.trendValue}
                </span>
                <span className="text-[10px] text-slate-400">vs ano anterior</span>
              </div>
            </div>
            
            {/* Status light */}
            <div className={`absolute top-0 left-0 w-1 h-full ${
              kpi.status === 'success' ? 'bg-emerald-500' :
              kpi.status === 'warning' ? 'bg-amber-500' : 'bg-rose-500'
            }`} />
          </Card>
        ))}
      </div>
    </div>
  );
}
