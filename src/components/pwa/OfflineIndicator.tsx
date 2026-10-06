import React from 'react';
import { useOnlineStatus } from './useOnlineStatus';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 rounded-full bg-amber-600 px-5 py-2.5 text-xs font-bold text-white shadow-2xl animate-bounce">
      <WifiOff className="w-4 h-4" />
      Modo Offline — Dados em cache ativos
    </div>
  );
};
