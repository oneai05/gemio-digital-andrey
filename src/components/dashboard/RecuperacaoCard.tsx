import React from "react";
import { Heart, Moon, Clock } from "lucide-react";
import DashboardCard from "./DashboardCard";
import type { RecomendacaoRecuperacao } from "@/types/n8nResponse";

interface RecuperacaoCardProps {
  data: RecomendacaoRecuperacao;
  explicacao?: string;
}

const RecuperacaoCard: React.FC<RecuperacaoCardProps> = ({
  data,
  explicacao,
}) => {
  return (
    <DashboardCard
      icon={<Heart className="h-5 w-5 text-emerald-500" />}
      title="Recuperação"
      variant="highlight"
      explanation={explicacao}
      recommendation={
        <div className="space-y-4">
          <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4">
            <p className="text-sm font-medium text-emerald-400">
              {data.protocolo_24h}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3">
              <Moon className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Sono</p>
                <p className="text-sm font-medium text-foreground">
                  {data.sono}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3">
              <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Intervalo</p>
                <p className="text-sm font-medium text-foreground">
                  {data.intervalo_minimo.replace(/_/g, " ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-3">
        <p className="text-xs font-medium text-muted-foreground">Modalidades</p>
        <ul className="space-y-2">
          {data.modalidades.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-2 text-sm text-foreground"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {item.replace(/_/g, " ")}
            </li>
          ))}
        </ul>
      </div>
    </DashboardCard>
  );
};

export default RecuperacaoCard;
