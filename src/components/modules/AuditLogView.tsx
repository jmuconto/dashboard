import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Layout';
import { getAuditLogs, clearAuditLogs } from '../../utils/audit';
import { AuditEntry, ROLE_LABELS } from '../../types/auth';
import { Shield, Clock, User, HardDrive, Trash2, FileSpreadsheet } from 'lucide-react';
import { exportToExcel } from '../../utils/export';

export default function AuditLogView() {
  const [logs, setLogs] = useState<AuditEntry[]>([]);

  useEffect(() => {
    setLogs(getAuditLogs());
  }, []);

  const handleExport = () => {
    exportToExcel(logs, 'Registo_Auditoria_vona360', 'Auditoria');
  };

  const handleClear = () => {
    if (confirm('Tem a certeza que deseja limpar todos os registos de auditoria?')) {
      clearAuditLogs();
      setLogs([]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Registo de Auditoria</h2>
            <p className="text-sm text-slate-500">Rastreabilidade total de acessos e acções do sistema.</p>
          </div>
        </div>
        
        <button 
          onClick={handleClear}
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-all"
        >
          <Trash2 className="w-4 h-4" />
          Limpar Registo
        </button>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-slate-900/50 text-[10px] text-slate-400 uppercase font-bold border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="py-4 px-6">Timestamp</th>
                <th className="py-4 px-6">Utilizador</th>
                <th className="py-4 px-6">Perfil</th>
                <th className="py-4 px-6">Módulo / Dado</th>
                <th className="py-4 px-6">Acção</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400 italic">
                    Nenhum registo encontrado.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-6 font-mono text-[11px] text-slate-500">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {new Date(log.timestamp).toLocaleString('pt-PT')}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3 text-slate-400" />
                        {log.userName}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase">
                        {ROLE_LABELS[log.userRole]}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-700 dark:text-slate-300">
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-3 h-3 text-blue-500" />
                        {log.module}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded uppercase tracking-wider">
                        {log.action}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
