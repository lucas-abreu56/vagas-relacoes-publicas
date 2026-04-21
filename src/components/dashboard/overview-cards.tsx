import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Building2, MapPin } from "lucide-react";
import type { DashboardData } from "@/types/vagas";

interface OverviewCardsProps {
  kpis: DashboardData['kpis'] | null;
}

export function OverviewCards({ kpis }: OverviewCardsProps) {
  if (!kpis) return null;

  const topEmployer = kpis.topEmployers?.[0]?.name || "N/A";

  const topModality = Object.entries(kpis.modalitiesCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="bg-[#121212] text-white border-white/10 group">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium opacity-70 uppercase tracking-widest font-body text-white">Total de Vagas</CardTitle>
          <Briefcase className="h-4 w-4 text-accent transition-transform group-hover:scale-125" />
        </CardHeader>
        <CardContent>
          <div className="text-5xl md:text-6xl font-display mt-2 text-white">{kpis.total}</div>
          <p className="text-xs text-gray-400 mt-2 font-body font-light">Ativas em Porto Alegre</p>
        </CardContent>
      </Card>

      <Card className="bg-card text-dark border-black/10 group">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium opacity-50 uppercase tracking-widest font-body">Maior Empregador</CardTitle>
          <Building2 className="h-4 w-4 text-accent transition-transform group-hover:scale-125" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl md:text-3xl font-display mt-2 line-clamp-1 truncate" title={topEmployer}>
            {topEmployer}
          </div>
          <p className="text-xs text-gray-500 mt-2 font-body font-light">Empresa com mais oportunidades</p>
        </CardContent>
      </Card>
    </div>
  );
}
