import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Layout';
import { MessageSquare, Phone, CheckCircle2, ShieldAlert, BellRing } from 'lucide-react';

export default function SettingsModule() {
  const [phoneNumber, setPhone] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('dashone_wa_number');
    const status = localStorage.getItem('dashone_wa_status') === 'true';
    if (saved) setPhone(saved);
    setIsSubscribed(status);
  }, []);

  const handleSave = () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      localStorage.setItem('dashone_wa_number', phoneNumber);
      localStorage.setItem('dashone_wa_status', 'true');
      setIsSubscribed(true);
      setLoading(false);
    }, 1000);
  };

  const handleTest = () => {
    alert(`Mensagem de teste vona 360° enviada para +258 ${phoneNumber}`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
          <MessageSquare className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Integração WhatsApp</h2>
          <p className="text-sm text-slate-500 text-emerald-600 font-medium">Receba alertas vona 360° em tempo real.</p>
        </div>
      </div>

      <Card title="Configuração de Contacto">
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              Número de Telemóvel (Moçambique)
            </label>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 px-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500 font-bold text-sm">
                <span className="opacity-50">+258</span>
              </div>
              <div className="relative flex-1">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="tel" 
                  value={phoneNumber}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="84XXXXXXX / 82XXXXXXX"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-xl text-sm font-bold text-slate-900 dark:text-white outline-none transition-all"
                />
              </div>
            </div>
            <p className="mt-2 text-[10px] text-slate-500">
              * O seu número será utilizado exclusivamente para o envio de notificações críticas configuradas nos módulos DashOne.
            </p>
          </div>

          <div className="pt-2">
            <button 
              onClick={handleSave}
              disabled={loading || phoneNumber.length < 8}
              className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                loading ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.98]'
              }`}
            >
              {loading ? 'A processar...' : 'Activar Notificações'}
              {!loading && <CheckCircle2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </Card>

      {isSubscribed && (
        <Card className="border-emerald-200 dark:border-emerald-900/30 bg-emerald-50/50 dark:bg-emerald-900/10">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 shrink-0">
              <BellRing className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Serviço de Alertas Activo</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                As notificações de "Meta em Risco" e "Eventos Críticos" serão enviadas automaticamente para o WhatsApp do número registado.
              </p>
              <div className="mt-4 flex gap-3">
                <button 
                  onClick={handleTest}
                  className="px-4 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-all"
                >
                  Enviar Mensagem de Teste
                </button>
                <button 
                  onClick={() => {
                    localStorage.removeItem('dashone_wa_status');
                    setIsSubscribed(false);
                  }}
                  className="px-4 py-1.5 text-[10px] font-bold text-rose-600 hover:underline"
                >
                  Desactivar
                </button>
              </div>
            </div>
          </div>
        </Card>
      )}

      <div className="p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 bg-blue-50/30 dark:bg-blue-900/5 flex gap-4">
        <ShieldAlert className="w-5 h-5 text-blue-500 shrink-0" />
        <div>
          <h5 className="text-xs font-bold text-slate-900 dark:text-white">Privacidade e Segurança</h5>
          <p className="text-[10px] text-slate-500 mt-1">
            Os dados de contacto são encriptados e seguem a Política de Governação de Dados de Moçambique (2025). 
            A DashOne não partilha o seu número com entidades externas.
          </p>
        </div>
      </div>
    </div>
  );
}
