import React from 'react';
import { ALERTS } from '../../data/mockData';
import { AlertCircle, AlertTriangle, Info, Bell, ArrowRight } from 'lucide-react';

export default function NotificationCenter() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Bell className="w-5 h-5 text-blue-600" />
          Alertas e Notificações Accionáveis
        </h3>
        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
          {ALERTS.length} pendentes
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ALERTS.map((alert) => (
          <div 
            key={alert.id} 
            className={`p-4 rounded-2xl border-l-4 flex items-start gap-4 transition-all hover:shadow-md ${
              alert.type === 'danger' ? 'bg-rose-50 dark:bg-rose-900/10 border-rose-500' :
              alert.type === 'warning' ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-500' :
              'bg-blue-50 dark:bg-blue-900/10 border-blue-500'
            }`}
          >
            <div className={`p-2 rounded-xl shrink-0 ${
              alert.type === 'danger' ? 'bg-rose-100 text-rose-600' :
              alert.type === 'warning' ? 'bg-amber-100 text-amber-600' :
              'bg-blue-100 text-blue-600'
            }`}>
              {alert.type === 'danger' ? <AlertCircle className="w-5 h-5" /> :
               alert.type === 'warning' ? <AlertTriangle className="w-5 h-5" /> :
               <Info className="w-5 h-5" />}
            </div>
            
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{alert.title}</h4>
                <span className="text-[9px] font-bold text-slate-400 uppercase">{alert.area}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {alert.description}
              </p>
              <button className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-blue-600 uppercase tracking-wider hover:gap-2 transition-all">
                {alert.action} <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
