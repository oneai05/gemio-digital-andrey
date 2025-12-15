import React from "react";
import { Clock, Target, ListChecks } from "lucide-react";
import DashboardCard from "./DashboardCard";
import type { ProximoCheckin } from "@/types/n8nResponse";

interface ProximoCheckinCardProps {
  data: ProximoCheckin;
}

const ProximoCheckinCard: React.FC<ProximoCheckinCardProps> = ({ data }) => {
  return (
    <DashboardCard
      icon={<Clock className="h-5 w-5 text-red-500" />}
      title="Próximo Check-in"
      variant="highlight"
      recommendation={
        <p className="text-lg font-semibold text-red-500">
          {data.prazo.replace(/_/g, " ")}
        </p>
      }
    >
      <div className="space-y-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
            <Target className="h-3 w-3" />
            Focar em
          </p>
          <ul className="space-y-2">
            {data.focar_em.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-sm text-foreground"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-chelsea-blue" />
                {item.replace(/_/g, " ")}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
            <ListChecks className="h-3 w-3" />
            Decisões pendentes
          </p>
          <ul className="space-y-2">
            {data.decisoes_pendentes.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-sm text-foreground"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                {item.replace(/_/g, " ")}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardCard>
  );
};

export default ProximoCheckinCard;
