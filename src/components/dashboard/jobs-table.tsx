"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardData } from "@/types/vagas";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

interface Props {
  vagas: DashboardData['vagas'] | null;
}

export function JobsTable({ vagas }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  if (!vagas || vagas.length === 0) {
    return (
      <Card className="w-full bg-card border-black/10">
        <CardContent className="p-8 text-center text-gray-500 font-body">Nenhuma vaga encontrada.</CardContent>
      </Card>
    );
  }

  const totalPages = Math.ceil(vagas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentVagas = vagas.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Card className="w-full bg-card border-black/10 flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="uppercase tracking-widest text-sm opacity-50 font-body">Lista de Oportunidades</CardTitle>
          <p className="text-xs text-gray-500 mt-2 font-body font-light">
            Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, vagas.length)} de {vagas.length}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-full border border-black/10 hover:bg-black/5 disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full border border-black/10 hover:bg-black/5 disabled:opacity-30 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body text-sm block md:table">
            <thead className="hidden md:table-header-group">
              <tr className="border-b border-black/5">
                <th className="pb-3 px-4 font-medium uppercase tracking-widest text-xs opacity-50">Vaga / Empresa</th>
                <th className="pb-3 px-4 font-medium uppercase tracking-widest text-xs opacity-50 hidden md:table-cell">Local</th>
                <th className="pb-3 px-4 font-medium uppercase tracking-widest text-xs opacity-50 hidden md:table-cell">Modalidade</th>
                <th className="pb-3 px-4 font-medium uppercase tracking-widest text-xs opacity-50 hidden lg:table-cell">Publicado</th>
                <th className="pb-3 px-4 font-medium uppercase tracking-widest text-xs opacity-50 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="block md:table-row-group">
              {currentVagas.map((vaga) => (
                <tr key={vaga.id} className="border-b border-black/5 hover:bg-black/5 transition-colors group flex flex-col md:table-row py-4 md:py-0">
                  <td className="pb-4 md:py-4 px-4 block md:table-cell align-middle">
                    <div className="font-semibold text-dark text-balance">{vaga.title}</div>
                    <div className="text-xs text-gray-500 mt-1" title={vaga.company}>{vaga.company}</div>
                    {vaga.description && (
                      <p className="text-xs text-gray-400 mt-2 line-clamp-2 max-w-md">
                        {vaga.description.slice(0, 140)}…
                      </p>
                    )}

                    {/* Infos extras para mobile */}
                    <div className="mt-3 md:hidden flex gap-2 items-center flex-wrap">
                      <span className="px-2 py-0.5 rounded-full border border-black/20 text-[10px] uppercase font-bold tracking-widest text-dark bg-white/50 backdrop-blur-md">
                        {vaga.location}
                      </span>
                      <span className="px-2 py-0.5 rounded-full border border-black/20 text-[10px] uppercase font-bold tracking-widest text-dark bg-white/50 backdrop-blur-md">
                        {vaga.modality}
                      </span>
                      {vaga.postedAt && (
                        <span className="px-2 py-0.5 rounded-full border border-black/10 text-[10px] font-bold tracking-widest text-gray-500 bg-black/5">
                          {vaga.postedAt}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 hidden md:table-cell align-middle">
                    <span className="text-xs text-gray-500">{vaga.location}</span>
                  </td>
                  <td className="py-4 px-4 hidden md:table-cell align-middle">
                    <span className="px-3 py-1 rounded-full border border-black/20 text-[10px] uppercase font-bold tracking-widest text-dark bg-white/50 backdrop-blur-md">
                      {vaga.modality}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-xs text-gray-400 hidden lg:table-cell align-middle">
                    {vaga.postedAt}
                  </td>
                  <td className="pt-2 md:py-4 px-4 block md:table-cell text-left md:text-right align-middle">
                    <a
                      href={vaga.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full md:w-auto justify-center items-center gap-2 bg-dark text-background px-4 py-3 md:py-2 rounded-full text-[10px] font-medium uppercase tracking-widest hover:bg-accent hover:text-white transition-all shadow-xl shadow-black/10 hover:scale-105"
                    >
                      Detalhes {vaga.url !== '#' && <ExternalLink className="w-3 h-3" />}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
