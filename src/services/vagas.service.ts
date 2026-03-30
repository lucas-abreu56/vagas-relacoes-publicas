import { supabase } from '@/lib/supabase';
import type { VagaParsed, DashboardData } from '@/types/vagas';

const extractModality = (desc: string): VagaParsed['modality'] => {
  if (!desc) return 'Não Especificado';
  const lower = desc.toLowerCase();
  if (lower.includes('modalidade: remoto') || lower.match(/\bremoto\b/)) return 'Remoto';
  if (lower.includes('modalidade: híbrido') || lower.includes('modalidade: hibrido') || lower.match(/\bh[íi]brido\b/)) return 'Híbrido';
  if (lower.includes('modalidade: presencial') || lower.match(/\bpresencial\b/)) return 'Presencial';
  return 'Não Especificado';
};

const extractSalary = (desc: string): string => {
  if (!desc) return 'A Combinar';
  // Find the position of 'salário' (case-insensitive)
  const idx = desc.search(/sal[aá]rio/i);
  if (idx === -1) return 'A Combinar';
  // Only look within the next 80 chars after 'salário' to avoid picking up VR/VA values
  const chunk = desc.substring(idx, idx + 80);
  const match = chunk.match(/R\$\s*([\d][\d.,\s]*\d)/i);
  if (!match) return 'A Combinar';
  // Strip any spaces within the number (e.g. '1. 200,00' → '1.200,00')
  return `R$ ${match[1].replace(/\s+/g, '')}`;
};

export const parseVagas = async (): Promise<DashboardData | null> => {
  try {
    const { data: rows, error } = await supabase
      .from('vagas_oportunidades')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase query error:', error.message);
      return null;
    }

    if (!rows || rows.length === 0) {
      console.warn('No rows returned from Supabase.');
      return null;
    }

    console.log(`Fetched ${rows.length} rows from Supabase.`);

    // Last inserted row = first item (ordered desc by created_at)
    // Show created_at as UTC (no offset applied)
    let lastUpdatedAt: string | null = null;
    if (rows[0]?.created_at) {
      const utcDate = new Date(rows[0].created_at);
      lastUpdatedAt = utcDate.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC',
      }) + ' (UTC)';
    }

    const vagas: VagaParsed[] = rows.map((row, index) => {
      const description = row.job_description || '';
      return {
        id: row.id ?? `vaga-${index}`,
        title: row.job_title || 'Sem Título',
        company: row.employer_name || 'Empresa Confidencial',
        type: row.job_employment_type || 'Tempo Integral',
        location: row.job_location || 'Não Informado',
        modality: extractModality(description),
        salary: extractSalary(description),
        description,
        url: row.job_apply_link || '#',
        postedAt: row.job_posted_at || null,
      };
    });

    // KPIs
    const modalitiesCount = vagas.reduce((acc, vaga) => {
      acc[vaga.modality] = (acc[vaga.modality] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const employerCounts = vagas.reduce((acc, vaga) => {
      acc[vaga.company] = (acc[vaga.company] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topEmployers = Object.entries(employerCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    return {
      vagas,
      lastUpdatedAt,
      kpis: { total: vagas.length, modalitiesCount, topEmployers },
    };
  } catch (error) {
    console.error('Unexpected error fetching vagas:', error);
    return null;
  }
};
