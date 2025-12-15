import React from "react";
import { Bell, AlertCircle } from "lucide-react";
import DashboardCard from "./DashboardCard";
import { Badge } from "@/components/ui/badge";
import type { RecomendacaoMonitoramento } from "@/types/n8nResponse";

interface MonitoramentoCardProps {
  data: RecomendacaoMonitoramento;
  explicacao?: string;
}

const MonitoramentoCard: React.FC<MonitoramentoCardProps> = ({
  data,
  explicacao,
}) => {
  return (
    <DashboardCard
      icon={<Bell className="h-5 w-5 text-amber-500" />}
      title="Monitoramento"
      explanation={explicacao}
      recommendation={
        <p className="text-sm text-muted-foreground">
          Frequência: {data.frequencia.replace(/_/g, " ")}
        </p>
      }
    >
      <div className="space-y-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">
            Métricas prioritárias
          </p>
          <div className="flex flex-wrap gap-2">
            {data.metricas_prioritarias.map((item, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-muted text-foreground"
              >
                {item.replace(/_/g, " ")}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
            <AlertCircle className="h-3 w-3 text-destructive" />
            Alertas genéticos
          </p>
          <ul className="space-y-2">
            {data.alertas_geneticos.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-sm text-destructive"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-destructive" />
                {item.replace(/_/g, " ")}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardCard>
  );
};

export default MonitoramentoCard;
