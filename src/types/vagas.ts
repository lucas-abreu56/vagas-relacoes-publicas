export interface VagaRaw {
  'Link da Vaga': string;
  'Título da Vaga': string;
  'Tipo da Vaga': string;
  'Descrição': string;
  'Local da Vaga': string;
  'Empregador': string;
}

export interface VagaParsed {
  id: string;
  title: string;
  company: string;
  type: string;
  location: string;
  modality: 'Remoto' | 'Híbrido' | 'Presencial' | 'Não Especificado';
  salary: string;
  description: string;
  url: string;
  postedAt: string | null;
}

export interface DashboardData {
  vagas: VagaParsed[];
  lastUpdatedAt: string | null;
  kpis: {
    total: number;
    modalitiesCount: Record<string, number>;
    topEmployers: { name: string; count: number }[];
  };
}
