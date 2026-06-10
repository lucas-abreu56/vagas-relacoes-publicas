import type { VagaRaw, VagaParsed, DashboardData } from '@/types/vagas';

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
    const token = process.env.VITE_API_TOKEN_N8N;
    if (!token) {
      console.error('API Token VITE_API_TOKEN_N8N is not set in environment variables.');
      return null;
    }

    const response = await fetch('https://n8n.lucasschwingel.com/webhook/vagas-relacoes-publicas', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': '*/*'
      },
      // Desabilita cache estático para sempre buscar dados novos, opcionalmente pode ser revalidado a cada X segundos
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      console.error(`n8n API fetch error: ${response.status} ${response.statusText}`);
      return null;
    }

    const rows: VagaRaw[] = await response.json();

    if (!rows || rows.length === 0) {
      console.warn('No rows returned from n8n API.');
      return {
        vagas: [],
        lastUpdatedAt: null,
        kpis: {
          total: 0,
          modalitiesCount: {},
          topEmployers: [],
        },
      };
    }

    console.log(`Fetched ${rows.length} rows from n8n API.`);

    const now = new Date();
    const lastUpdatedAt = now.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Sao_Paulo',
    });

    const vagas: VagaParsed[] = rows.map((row, index) => {
      const description = row.job_description || '';
      return {
        id: row.id ?? `vaga-${index}`,
        job_title: row.job_title || 'Sem Título',
        employer_name: row.employer_name || 'Empresa Confidencial',
        job_employment_type: row.job_employment_type || 'Tempo Integral',
        job_location: row.job_location || 'Não Informado',
        modality: extractModality(description),
        salary: extractSalary(description),
        job_description: description,
        job_apply_link: row.job_apply_link || '#',
        job_posted_at: row.job_posted_at || null,
      };
    });

    // KPIs
    const modalitiesCount = vagas.reduce((acc, vaga) => {
      acc[vaga.modality] = (acc[vaga.modality] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const employerCounts = vagas.reduce((acc, vaga) => {
      acc[vaga.employer_name] = (acc[vaga.employer_name] || 0) + 1;
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
