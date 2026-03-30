"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardData } from "@/types/vagas";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Props {
  data: DashboardData['kpis'] | null;
}

const COLORS = ["#121212", "#374336", "#738b71", "#a2b4a1"];

export function DistributionChart({ data }: Props) {
  if (!data) return null;

  const chartData = Object.entries(data.modalitiesCount)
    .filter(([name]) => name !== 'Não Especificado')
    .map(([name, value]) => ({
      name,
      value
    }));

  return (
    <Card className="h-full bg-card border-black/10 flex flex-col">
      <CardHeader>
        <CardTitle className="uppercase tracking-widest text-sm opacity-50 font-body">Distribuição por Modalidade</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              animationDuration={1500}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              itemStyle={{ color: '#121212', fontFamily: 'var(--font-body)' }}
            />
            <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#121212' }} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
