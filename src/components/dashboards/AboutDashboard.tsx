import { ShieldCheck, Zap } from 'lucide-react';
import { Card } from '../ui/Layout';

export default function AboutDashboard() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-blue-500/20">
          <Zap className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">vona 360° | Inteligência de Negócio</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          O vona 360° é um serviço de geração de painéis de auxílio à tomada de decisões com base em dados compilados, 
          especificamente desenhado para o ecossistema empresarial de Moçambique.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card title="A Nossa Visão">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Consolidar dados de múltiplas áreas (Vendas, Finanças, RH) num único painel visual inteligente e accionável.
            </p>
          </div>
        </Card>

        <Card title="Diferencial Técnico">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-emerald-600" />
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
              Stack robusta com PWA para funcionamento offline e baixa conectividade (2G/3G), garantindo acesso a dados críticos em qualquer lugar.
            </p>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center">Os Nossos Valores</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { title: 'Transparência', desc: 'Dados claros e verificáveis em todos os níveis.' },
            { title: 'Inovação', desc: 'Sempre na vanguarda da tecnologia de visualização.' },
            { title: 'Localismo', desc: 'Soluções desenhadas especificamente para o mercado moçambicano.' },
          ].map((val, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">{val.title}</h4>
              <p className="text-sm text-slate-500">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
