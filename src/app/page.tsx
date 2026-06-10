import { OverviewCards, DistributionChart, JobsTable } from "@/components/dashboard";
import { parseVagas } from "@/services/vagas.service";

// Opcional: tempo em segundos para revalidar a página no cache do servidor
export const revalidate = 60;

export default async function Page() {
  const data = await parseVagas();

  if (!data) {
    return (
      <main className="w-full relative z-10 min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-6">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto">
            <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="display text-xl font-bold font-display uppercase tracking-widest text-dark">Erro ao carregar dados</h2>
          <p className="text-xs text-gray-500 font-body mb-4">
            Não foi possível estabelecer conexão com o servidor do webhook.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full relative z-10 selection:bg-accent/30 selection:text-dark min-h-screen">
      
      {/* 0. Hero Parallax Clean Clone */}
      <section className="h-[60vh] relative flex flex-col justify-end pb-20 px-6 md:px-20 max-w-[1800px] mx-auto overflow-hidden text-dark border-b border-black/10">
        <p className="text-xs font-body font-bold uppercase tracking-[0.5em] opacity-50 mb-4 mix-blend-difference">Aethereal Architecture x AI Automation</p>
        <div className="relative z-10 text-left">
          <h1 className="display text-[8vw] md:text-[6vw] font-bold leading-[0.85] hero-text overflow-hidden text-dark text-balance mb-2">
            <span className="block transform transition-transform duration-1000 translate-y-0">DASHBOARD</span>
          </h1>
          <h1 className="display text-[8vw] md:text-[6vw] font-bold leading-[0.85] hero-text overflow-hidden text-dark text-balance">
            <span className="block transform transition-transform duration-1000 translate-y-0 text-accent">VAGAS RP</span>
          </h1>
          <p className="mt-8 text-sm md:text-md uppercase tracking-widest font-body text-gray-500 max-w-lg">
            Análise e inteligência sobre o mercado de trabalho de Relações Públicas no Rio Grande do Sul.
          </p>
          {data?.lastUpdatedAt && (
            <p className="mt-3 text-xs font-body text-gray-400 tracking-widest">
              Última atualização: {data.lastUpdatedAt} (Brasília)
            </p>
          )}
        </div>
      </section>

      {/* 1. Visualizations and Detail View */}
      <section className="py-12 md:py-20 px-6 md:px-20 max-w-[1800px] mx-auto border-b border-black/10">
        <div className="text-xs uppercase tracking-widest mb-12 opacity-50 font-body font-semibold">01 / Detalhamento</div>
        
        <div className="w-full">
          <JobsTable vagas={data?.vagas || null} />
        </div>
      </section>

      {/* 2. KPIs */}
      <section className="py-12 md:py-20 px-6 md:px-20 max-w-[1800px] mx-auto border-b border-black/10">
        <div className="text-xs uppercase tracking-widest mb-12 opacity-50 font-body font-semibold">02 / Visão Geral</div>
        <div className="space-y-12">
          <OverviewCards kpis={data?.kpis || null} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-stretch">
            <div className="lg:col-span-1 h-[450px]">
              <DistributionChart data={data?.kpis || null} />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 text-center text-xs uppercase tracking-widest opacity-30 font-body font-bold">
        DASHBOARD DESIGN SYSTEM BLEND - 2026
      </footer>
    </main>
  );
}
