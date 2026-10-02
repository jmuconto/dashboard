import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, GraduationCap, Users, ShieldCheck, Zap } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  const HERO_IMAGE = "/src/assets/images/dashone_hero_cityscape_1790979872448.jpg";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-100 dark:selection:bg-blue-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">DashOne</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#solutions" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">Soluções</a>
            <a href="#about" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">Sobre</a>
          </nav>

          <button 
            onClick={onStart}
            className="px-5 py-2 bg-slate-900 dark:bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-slate-800 dark:hover:bg-blue-500 transition-all shadow-sm active:scale-95"
          >
            Aceder à Plataforma
          </button>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden border-b border-slate-200 dark:border-slate-900">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Inteligência para o Mercado <span className="text-blue-600">Moçambicano</span>.
              </h1>
              <p className="mt-8 text-xl text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
                Centralize as suas operações com dashboards especializados para equipas de Vendas, Educação e Engenharia.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={onStart}
                  className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20 active:scale-95 group"
                >
                  Começar agora <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
            >
              <img 
                src={HERO_IMAGE} 
                alt="Skyline de Maputo" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section id="solutions" className="py-24 max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-blue-600 font-semibold tracking-wider text-xs uppercase">Módulos Especializados</span>
            <h2 className="mt-4 text-4xl font-bold text-slate-900 dark:text-white">Criado para resultados concretos.</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <SolutionCard 
              icon={BarChart3}
              title="Vendas e Finanças"
              description="Acompanhe a receita em MZN, analise margens de produtos e preveja o crescimento local."
              color="blue"
            />
            <SolutionCard 
              icon={GraduationCap}
              title="Gestão Académica"
              description="Monitorize o desempenho na escala de 0 a 20 com métricas profundas dos alunos."
              color="emerald"
            />
            <SolutionCard 
              icon={Users}
              title="Operações de Campo"
              description="Monitorize a atividade dos promotores em Maputo, Matola e Beira em tempo real."
              color="orange"
            />
            <SolutionCard 
              icon={Zap}
              title="Engenharia Ágil"
              description="Conformidade ISO 56002 e saúde tecnológica para sistemas C# e Elixir."
              color="purple"
            />
          </div>
        </section>

        <section id="about" className="py-24 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center p-12 text-white">
                <div className="space-y-6 text-center">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">A Nossa Missão</h3>
                  <p className="text-blue-100 leading-relaxed">
                    Transformar dados complexos em clareza estratégica para o crescimento de Moçambique.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <span className="text-blue-600 font-semibold tracking-wider text-xs uppercase">Sobre o DashOne</span>
              <h2 className="mt-4 text-4xl font-bold text-slate-900 dark:text-white leading-tight">Decisões Inteligentes baseadas em Dados Reais.</h2>
              <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                O DashOne é um serviço de geração de painéis de auxílio à tomada de decisões com base em dados compilados. 
                Nascemos da necessidade de simplificar a gestão empresarial em Moçambique, oferecendo uma visão 360º da sua operação.
              </p>
              <div className="mt-10 space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Compilação Automática</h4>
                    <p className="text-sm text-slate-500">Agregamos dados de múltiplas fontes para uma visão unificada.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center shrink-0">
                    <BarChart3 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Visualização Estratégica</h4>
                    <p className="text-sm text-slate-500">Gráficos desenhados para destacar o que realmente importa.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="bg-slate-900 py-24">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
            <div>
              <h2 className="text-3xl font-bold text-white max-w-md">O Standard para Empresas Moçambicanas Modernas.</h2>
              <p className="mt-4 text-slate-400">Confiado por empresas líderes em Maputo Central e Matola Rio.</p>
            </div>
            <div className="flex gap-12 text-center">
              <div>
                <p className="text-4xl font-bold text-white font-mono">1.2M</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-2 font-semibold">Transações / Dia</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-white font-mono">92%</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-2 font-semibold">Taxa de Conformidade</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© 2026 DashOne Moçambique. Analytics de Nível Profissional.</p>
          <div className="flex gap-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacidade</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SolutionCard({ icon: Icon, title, description, color }: any) {
  const colors: any = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
    orange: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
  };

  return (
    <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${colors[color]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
        {description}
      </p>
    </div>
  );
}
