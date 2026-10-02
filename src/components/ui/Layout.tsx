import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const Card = ({ children, className = '', title }: CardProps) => (
  <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden ${className}`}>
    {title && (
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
        <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
      </div>
    )}
    <div className="p-6">
      {children}
    </div>
  </div>
);

export const StatCard = ({ label, value, trend, trendValue, icon: Icon, unit }: {
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon: any;
  unit?: string;
}) => (
  <Card className="flex flex-col">
    <div className="flex justify-between items-start mb-4">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
      <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
        <Icon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
      </div>
    </div>
    <div className="flex items-baseline gap-2">
      <h3 className="text-3xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">{value}</h3>
      {unit && <span className="text-sm text-slate-500 font-medium">{unit}</span>}
    </div>
    {trend && (
      <div className="mt-4 flex items-center gap-1.5">
        <span className={`text-sm font-medium ${
          trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-rose-600' : 'text-slate-500'
        }`}>
          {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
        </span>
        <span className="text-xs text-slate-400">face ao mês anterior</span>
      </div>
    )}
  </Card>
);
