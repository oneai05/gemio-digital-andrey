import React from "react";
import { Activity } from "lucide-react";
import DashboardCard from "./DashboardCard";
import { Badge } from "@/components/ui/badge";
import type { RecomendacaoTreino } from "@/types/n8nResponse";

interface TreinoCardProps {
  data: RecomendacaoTreino;
  explicacao?: string;
}

const TreinoCard: React.FC<TreinoCardProps> = ({ data, explicacao }) => {
  return (
    <DashboardCard
      icon={<Activity className="h-5 w-5 text-yellow-500" />}
      title="Treino"
      explanation={explicacao}
      recommendation={
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">Volume</p>
              <p className="text-2xl font-bold text-yellow-500">
                {data.ajuste_volume}
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">Intensidade</p>
              <p className="text-lg font-semibold text-foreground">
                {data.ajuste_intensidade.replace(/_/g, " ")}
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-destructive/10 p-3">
            <p className="text-xs font-medium text-destructive mb-2">Evitar</p>
            <div className="flex flex-wrap gap-2">
              {data.evitar.map((item, index) => (
                <Badge
                  key={index}
                  variant="destructive"
                  className="bg-destructive/20 text-destructive"
                >
                  {item.replace(/_/g, " ")}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Foco da sessão</span>
          <span className="text-foreground">
            {data.foco_sessao.replace(/_/g, " ")}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Duração máxima</span>
          <span className="text-foreground">
            {data.duracao_maxima.replace(/_/g, " ")}
          </span>
        </div>
        <div className="mt-3 rounded-lg bg-muted/30 p-3">
          <p className="text-xs text-muted-foreground mb-1">
            Justificativa científica
          </p>
          <p className="text-sm text-foreground">
            {data.justificativa_cientifica}
          </p>
        </div>
      </div>
    </DashboardCard>
  );
};

export default TreinoCard;
