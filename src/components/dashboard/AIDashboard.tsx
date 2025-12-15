import React from "react";
import TreinoCard from "./TreinoCard";
import RecuperacaoCard from "./RecuperacaoCard";
import NutricaoCard from "./NutricaoCard";
import InsightsGeneticosCard from "./InsightsGeneticosCard";
import MonitoramentoCard from "./MonitoramentoCard";
import ProximoCheckinCard from "./ProximoCheckinCard";
import { AlertTriangle } from "lucide-react";
import type { N8nResponse } from "@/types/n8nResponse";

interface AIDashboardProps {
  data: N8nResponse | null;
  isLoading?: boolean;
}

const AIDashboard: React.FC<AIDashboardProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-48 animate-pulse rounded-xl bg-muted/50"
          />
        ))}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertTriangle className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <p className="text-muted-foreground">
          Complete o check-in para receber recomendações personalizadas da IA.
        </p>
      </div>
    );
  }

  const { recomendacoes, textos_dashboard } = data;

  return (
    <div className="space-y-6">
      {/* Risk Alert */}
      {data.risco_lesao && data.risco_lesao.nivel === "alto" && (
        <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            <div>
              <p className="font-semibold text-destructive">
                Risco de Lesão: {data.risco_lesao.percentual}%
              </p>
              <p className="text-sm text-muted-foreground">
                {data.risco_lesao.mecanismo_fisiologico}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        <TreinoCard
          data={recomendacoes.treino}
          explicacao={textos_dashboard.treino_explicacao}
        />
        <RecuperacaoCard
          data={recomendacoes.recuperacao}
          explicacao={textos_dashboard.recuperacao_explicacao}
        />
        <NutricaoCard
          data={recomendacoes.nutricao}
          explicacao={textos_dashboard.nutricao_explicacao}
        />
        <InsightsGeneticosCard
          data={recomendacoes.insights_geneticos}
          explicacao={textos_dashboard.insights_geneticos_explicacao}
        />
        <MonitoramentoCard
          data={recomendacoes.monitoramento}
          explicacao={textos_dashboard.monitoramento_explicacao}
        />
        <ProximoCheckinCard data={recomendacoes.proximo_checkin} />
      </div>
    </div>
  );
};

export default AIDashboard;
