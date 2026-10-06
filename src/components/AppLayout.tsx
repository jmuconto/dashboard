import React from 'react';
import { 
  BarChart3, 
  Users, 
  Zap, 
  LogOut, 
  Bell, 
  Search,
  LayoutDashboard,
  ShieldCheck,
  DollarSign,
  ChevronDown,
  UserCircle,
  Shield
} from 'lucide-react';

import DateRangePicker, { DateRange } from './ui/DateRangePicker';
import { UserRole, ROLE_LABELS, PERMISSIONS } from '../types/auth';
import { PWAInstallButton } from './pwa/PWAInstallButton';

interface AppLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export default function AppLayout({ 
  children, 
  activeTab, 
  onTabChange, 
  dateRange, 
  onDateRangeChange,
  userRole,
  onRoleChange
}: AppLayoutProps) {
  const permissions = PERMISSIONS[userRole];

  const MENU_ITEMS = [
    { id: 'dashboard', label: 'Painel 360', icon: LayoutDashboard, visible: true },
    { id: 'sales', label: 'Vendas', icon: BarChart3, visible: permissions.vendas !== 'nenhum' },
    { id: 'finance', label: 'Financeiro', icon: DollarSign, visible: permissions.financas !== 'nenhum' },
    { id: 'hr', label: 'Recursos Humanos', icon: Users, visible: permissions.rh !== 'nenhum' },
    { id: 'audit', label: 'Auditoria', icon: Shield, visible: permissions.auditoria === 'total' },
    { id: 'settings', label: 'Configurações', icon: Zap, visible: permissions.configuracoes !== 'nenhum' },
    { id: 'about', label: 'Sobre', icon: ShieldCheck, visible: true },
  ].filter(item => item.visible);

  const currentTitle = MENU_ITEMS.find(item => item.id === activeTab)?.label || 'Painel';

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">vona 360°</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 mt-2">Módulos</p>
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-4">
          <PWAInstallButton />
          
          <div className="relative group">
            <button className="w-full flex items-center justify-between gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-[10px] font-bold uppercase tracking-wider hover:bg-slate-700 transition-colors text-left">
              <span className="truncate">{ROLE_LABELS[userRole]}</span>
              <ChevronDown className="w-3 h-3 shrink-0" />
            </button>
            <div className="absolute bottom-full left-0 w-full mb-2 bg-slate-800 rounded-lg shadow-xl border border-slate-700 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              {(Object.keys(ROLE_LABELS) as UserRole[]).map((role) => (
                <button
                  key={role}
                  onClick={() => onRoleChange(role)}
                  className={`w-full px-4 py-2 text-[10px] font-bold text-left hover:bg-slate-700 transition-colors ${userRole === role ? 'text-blue-400' : 'text-slate-400'}`}
                >
                  {ROLE_LABELS[role]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-8 shrink-0">
          <div className="flex items-center gap-4">
            {/* Mobile Logo */}
            <div className="md:hidden w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-white" />
            </div>
            
            <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">{currentTitle}</h1>
            <div className="h-4 w-px bg-slate-200 dark:border-slate-800 hidden lg:block" />
            <div className="hidden lg:block">
              <DateRangePicker value={dateRange} onChange={onDateRangeChange} />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900" />
            </button>
            
            <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-slate-200 dark:border-slate-800">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900 dark:text-white">Admin Demo</p>
                <p className="text-[9px] font-bold text-blue-600 uppercase tracking-widest leading-none mt-0.5">{userRole}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 border border-slate-200 dark:border-slate-700">
                <UserCircle className="w-6 h-6" />
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-7xl mx-auto pb-12">
            {children}
          </div>
        </div>
        
        {/* Mobile Nav */}
        <nav className="md:hidden h-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-around px-2 shrink-0 overflow-x-auto no-scrollbar">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all min-w-[64px] shrink-0 ${
                  isActive ? 'text-blue-600' : 'text-slate-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-bold whitespace-nowrap">{item.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </nav>
      </main>
    </div>
  );
}
