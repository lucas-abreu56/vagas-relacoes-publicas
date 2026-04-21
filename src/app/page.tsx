import { parseVagas } from "@/services/vagas.service";
import { OverviewCards, DistributionChart, JobsTable } from "@/components/dashboard";

export const revalidate = 0;

// Server action prevents client execution of xlsx node module logic
export default async function Page() {
  const data = await parseVagas();

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
