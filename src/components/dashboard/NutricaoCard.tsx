import React from "react";
import { Utensils, Droplets, AlertCircle } from "lucide-react";
import DashboardCard from "./DashboardCard";
import type { RecomendacaoNutricao } from "@/types/n8nResponse";

interface NutricaoCardProps {
  data: RecomendacaoNutricao;
  explicacao?: string;
}

const NutricaoCard: React.FC<NutricaoCardProps> = ({ data, explicacao }) => {
  return (
    <DashboardCard
      icon={<Utensils className="h-5 w-5 text-orange-500" />}
      title="Nutrição"
      explanation={explicacao}
      recommendation={
        <p className="text-sm text-muted-foreground">
          {data.anti_inflamatorios.length} anti-inflamatórios recomendados
        </p>
      }
    >
      <div className="space-y-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">
            Anti-inflamatórios
          </p>
          <ul className="space-y-2">
            {data.anti_inflamatorios.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-foreground"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500 mt-2" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3">
          <Droplets className="h-4 w-4 text-blue-400 mt-0.5" />
          <div>
            <p className="text-xs text-muted-foreground">Hidratação</p>
            <p className="text-sm font-medium text-foreground">
              {data.hidratacao}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3">
          <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-xs text-muted-foreground">Timing pós-treino</p>
            <p className="text-sm font-medium text-foreground">
              {data.timing_pos_treino}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2 rounded-lg bg-destructive/10 p-3">
          <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
          <div>
            <p className="text-xs text-muted-foreground">Evitar</p>
            <p className="text-sm font-medium text-destructive">{data.evitar}</p>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};

// Fix missing import
import { Clock } from "lucide-react";

export default NutricaoCard;
