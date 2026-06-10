export interface VagaRaw {
  id: string;
  job_title: string;
  employer_name: string;
  job_location: string;
  job_employment_type: string;
  job_description: string;
  job_apply_link: string;
  job_posted_at: string | null;
}

export interface VagaParsed {
  id: string;
  job_title: string;
  employer_name: string;
  job_employment_type: string;
  job_location: string;
  modality: 'Remoto' | 'Híbrido' | 'Presencial' | 'Não Especificado';
  salary: string;
  job_description: string;
  job_apply_link: string;
  job_posted_at: string | null;
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
