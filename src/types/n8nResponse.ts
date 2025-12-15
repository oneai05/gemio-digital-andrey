export interface RiscoLesao {
  percentual: number;
  nivel: string;
  principais_fatores: string[];
  timeframe: string;
  mecanismo_fisiologico: string;
}

export interface TextosDashboard {
  treino_explicacao: string;
  recuperacao_explicacao: string;
  nutricao_explicacao: string;
  insights_geneticos_explicacao: string;
  monitoramento_explicacao: string;
}

export interface RecomendacaoTreino {
  ajuste_volume: string;
  ajuste_intensidade: string;
  foco_sessao: string;
  evitar: string[];
  duracao_maxima: string;
  justificativa_cientifica: string;
}

export interface RecomendacaoRecuperacao {
  protocolo_24h: string;
  sono: string;
  modalidades: string[];
  intervalo_minimo: string;
}

export interface RecomendacaoNutricao {
  anti_inflamatorios: string[];
  timing_pos_treino: string;
  hidratacao: string;
  evitar: string;
}

export interface RecomendacaoMonitoramento {
  metricas_prioritarias: string[];
  frequencia: string;
  alertas_geneticos: string[];
}

export interface InsightsGeneticos {
  correlacao_atual: string;
  vantagem_perfil: string;
  limitacao_critica: string;
  prognostico: string;
}

export interface ProximoCheckin {
  prazo: string;
  focar_em: string[];
  decisoes_pendentes: string[];
}

export interface Recomendacoes {
  treino: RecomendacaoTreino;
  recuperacao: RecomendacaoRecuperacao;
  nutricao: RecomendacaoNutricao;
  monitoramento: RecomendacaoMonitoramento;
  insights_geneticos: InsightsGeneticos;
  proximo_checkin: ProximoCheckin;
}

export interface N8nResponse {
  risco_lesao: RiscoLesao;
  textos_dashboard: TextosDashboard;
  recomendacoes: Recomendacoes;
}
