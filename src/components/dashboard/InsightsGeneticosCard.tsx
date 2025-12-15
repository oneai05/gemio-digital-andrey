import React from "react";
import { Dna, TrendingUp, AlertTriangle, Target } from "lucide-react";
import DashboardCard from "./DashboardCard";
import type { InsightsGeneticos } from "@/types/n8nResponse";

interface InsightsGeneticosCardProps {
  data: InsightsGeneticos;
  explicacao?: string;
}

const InsightsGeneticosCard: React.FC<InsightsGeneticosCardProps> = ({
  data,
  explicacao,
}) => {
  return (
    <DashboardCard
      icon={<Dna className="h-5 w-5 text-purple-500" />}
      title="Insights Genéticos"
      explanation={explicacao}
      recommendation={
        <p className="text-sm text-muted-foreground line-clamp-2">
          {data.correlacao_atual}
        </p>
      }
    >
      <div className="space-y-3">
        <div className="flex items-start gap-2 rounded-lg bg-emerald-500/10 p-3">
          <TrendingUp className="h-4 w-4 text-emerald-500 mt-0.5" />
          <div>
            <p className="text-xs text-muted-foreground">Vantagem do perfil</p>
            <p className="text-sm text-foreground">{data.vantagem_perfil}</p>
          </div>
        </div>

        <div className="flex items-start gap-2 rounded-lg bg-destructive/10 p-3">
          <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
          <div>
            <p className="text-xs text-muted-foreground">Limitação crítica</p>
            <p className="text-sm text-foreground">{data.limitacao_critica}</p>
          </div>
        </div>

        <div className="flex items-start gap-2 rounded-lg bg-chelsea-blue/10 p-3">
          <Target className="h-4 w-4 text-chelsea-blue mt-0.5" />
          <div>
            <p className="text-xs text-muted-foreground">Prognóstico</p>
            <p className="text-sm text-foreground">{data.prognostico}</p>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};

export default InsightsGeneticosCard;
