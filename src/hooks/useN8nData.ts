import { useState, useCallback } from "react";
import type { N8nResponse } from "@/types/n8nResponse";

// Sample data matching the n8n format for testing
export const sampleN8nData: N8nResponse = {
  risco_lesao: {
    percentual: 85,
    nivel: "alto",
    principais_fatores: [
      "PSE muscular 8/10 crítico para genótipo COL5A1 CC",
      "Déficit sono 1.5h amplifica expressão TNF-A/CRP GG",
      "Dor muscular 6/10 indica ativação cascata inflamatória sistêmica",
    ],
    timeframe: "proximas_24h",
    mecanismo_fisiologico:
      "Sobrecarga mecânica + genética inflamatória + déficit recuperativo",
  },
  textos_dashboard: {
    treino_explicacao:
      "A redução de 40% no volume de treino é IMPERATIVA considerando o PSE muscular de 8/10 associado ao genótipo COL5A1 CC do Andrey. Este polimorfismo confere 80% maior risco de lesões tendinosas e ligamentares, tornando cargas elevadas potencialmente lesivas. A genética do atleta indica que estímulos intensos ativam cascatas inflamatórias (TNF-α, IL-6) que podem resultar em microlesões cumulativas no tecido conectivo. O foco deve migrar para estímulos técnicos de baixa intensidade, priorizando padrões motores e eficiência biomecânica. O genótipo ACE DD favorece adaptações de força, mas requer periodização cuidadosa. Intervalos de 48-72h entre sessões de alta intensidade são obrigatórios para este fenótipo específico, permitindo adequada síntese de colágeno e reparação tecidual.",
    recuperacao_explicacao:
      "O protocolo de crioterapia a 10°C por 15 minutos é especificamente direcionado ao perfil TNF-A GG do Andrey, que apresenta resposta inflamatória 3x mais intensa que a população geral. A exposição ao frio modulará a liberação de citocinas pró-inflamatórias e ativará vias anti-inflamatórias endógenas. A liberação miofascial (20min) complementa o processo facilitando drenagem linfática e reduzindo tensão mecânica nos tecidos. O sono de 8.5h é OBRIGATÓRIO devido à variante MMP3 desfavorável, que exige 25% mais tempo para reparação tecidual comparado a genótipos favoráveis. Durante o sono profundo, ocorre pico de liberação de GH e IGF-1, essenciais para síntese proteica e reparação. O cronotipo CLOCK T/T do atleta indica que o deitar antes das 22h30 otimiza a arquitetura do sono e maximiza as fases reparativas.",
    nutricao_explicacao:
      "A estratégia nutricional anti-inflamatória é altamente específica para o genótipo TNF-A GG + CRP GG do Andrey. O ômega-3 EPA (2g) demonstra eficácia superior na modulação da cascata do ácido araquidônico em indivíduos com este polimorfismo, reduzindo a síntese de prostaglandinas pró-inflamatórias. A cúrcuma (500mg) com piperina atua sinergicamente inibindo COX-2 e NF-κB, vias particularmente hiperativas no genótipo do atleta. O timing pós-exercício é crucial para interceptar a 'janela inflamatória' nas primeiras 2h, quando a ativação de macrófagos M1 está no pico. A proteína (25g) + carboidratos complexos estimulam síntese proteica via mTOR, processo fundamental para atletas com genética MMP3 desfavorável. Evitar cafeína após 16h é essencial devido ao metabolismo CYP1A2 lento, que pode interferir na qualidade do sono REM.",
    insights_geneticos_explicacao:
      "A correlação atual entre fenótipo observado e genótipo do Andrey é altamente significativa e preocupante. O PSE muscular 8/10 representa a manifestação clínica da variante COL5A1 CC sob estresse mecânico, enquanto o déficit de sono potencializa a expressão patológica dos genes TNF-A e CRP GG. Esta combinação cria um ambiente pró-inflamatório sistêmico que perpetua o ciclo fadiga-inflamação-sobrecarga. A dor muscular 6/10 confirma a ativação de nociceptores por mediadores inflamatórios (bradiquinina, substância P). O genótipo ACTN3 RR do atleta sugere capacidade superior para exercícios de potência, mas a expressão fenotípica está comprometida pelo estado inflamatório atual. A rigidez matinal moderada indica elevação noturna de cortisol e citocinas pró-inflamatórias. A janela terapêutica atual exige intervenção imediata para prevenir cronificação do processo inflamatório.",
    monitoramento_explicacao:
      "O protocolo de monitoramento intensificado (12h) é fundamental considerando a cinética específica do perfil genético do Andrey. O threshold de PSE muscular deve ser rigorosamente mantido ≤6/10 (não 8/10 como população geral) devido à variante COL5A1 CC. Valores superiores indicam sobrecarga do sistema de reparo tecidual e risco iminente de lesão estrutural. A qualidade do sono REM é biomarcador crítico para expressão adequada dos genes de reparação (MMP3, COL1A1). Variabilidade da frequência cardíaca (HRV) matinal reflete o balanço autonômico e deve ser correlacionada com marcadores subjetivos. A rigidez matinal quantifica a atividade inflamatória noturna em genótipos TNF-A GG. Biomarcadores salivares como cortisol e α-amilase podem fornecer dados objetivos complementares. A progressão dos sintomas nas próximas 24-48h determinará a necessidade de intervenção médica especializada ou ajustes no protocolo de recuperação.",
  },
  recomendacoes: {
    treino: {
      ajuste_volume: "-40%",
      ajuste_intensidade: "reduzir_significativamente",
      foco_sessao: "recuperacao_ativa_tecnica",
      evitar: ["estimulos_maximos", "volume_prolongado", "impacto_repetitivo"],
      duracao_maxima: "45_minutos",
      justificativa_cientifica: "Genótipo COL5A1 CC + estado inflamatório atual",
    },
    recuperacao: {
      protocolo_24h:
        "Crioterapia 15min 10°C + liberação miofascial 20min + meditação 15min",
      sono: "8.5h obrigatório (deitar 22h, acordar 6:30h)",
      modalidades: [
        "crioterapia_direcionada",
        "liberacao_miofascial_completa",
        "breathing_4-7-8",
      ],
      intervalo_minimo: "48_horas_estimulos_intensos",
    },
    nutricao: {
      anti_inflamatorios: [
        "Ômega-3 EPA 2g manhã (modulação TNF-α)",
        "Cúrcuma 500mg + piperina pós-treino",
        "Tart cherry 480mg noite (melatonina + antocianinas)",
      ],
      timing_pos_treino: "Proteína whey 25g + banana em 30min",
      hidratacao: "3.5L + eletrólitos (sódio 200mg/L)",
      evitar: "Cafeína após 16h (CYP1A2 lento)",
    },
    monitoramento: {
      metricas_prioritarias: [
        "PSE_muscular_≤6",
        "sono_REM_qualidade",
        "rigidez_matinal_escala",
        "HRV_matinal",
      ],
      frequencia: "12_horas",
      alertas_geneticos: [
        "PSE > 6 = suspensão",
        "sono < 7h = protocolo_emergencia",
        "dor > 4 = avaliacao_medica",
      ],
    },
    insights_geneticos: {
      correlacao_atual:
        "Ativação completa do perfil genético de risco: TNF-A/CRP GG (inflamação) + COL5A1 CC (sobrecarga tecidual) + MMP3 (recuperação lenta)",
      vantagem_perfil:
        "ACTN3 RR + ACE DD conferem potencial superior para adaptações de força quando em estado recuperado",
      limitacao_critica:
        "Janela terapêutica estreita: recuperação 48h+ obrigatória entre estímulos intensos",
      prognostico:
        "Reversão em 72-96h com protocolo adequado, risco lesional se mantida sobrecarga",
    },
    proximo_checkin: {
      prazo: "12 horas",
      focar_em: [
        "evolucao_PSE_muscular",
        "qualidade_sono_objetiva",
        "rigidez_matinal_numerica",
      ],
      decisoes_pendentes: [
        "Liberação_médica_treino",
        "Ajuste_suplementação",
        "Progressão_carga",
      ],
    },
  },
};

export const useN8nData = () => {
  const [data, setData] = useState<N8nResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (webhookUrl?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      if (webhookUrl) {
        // Fetch from n8n webhook
        const response = await fetch(webhookUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data from n8n");
        }

        const result = await response.json();
        setData(result);
      } else {
        // Use sample data for demo
        setData(sampleN8nData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadSampleData = useCallback(() => {
    setData(sampleN8nData);
  }, []);

  return { data, isLoading, error, fetchData, loadSampleData, setData };
};
