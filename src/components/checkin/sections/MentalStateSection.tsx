import React from "react";
import { RangeField } from "../FormField";

interface Props {
  formData: Record<string, any>;
  handleChange: (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const mentalFields = [
  { field: "estresseHoje", label: "6.1. Nível de estresse hoje (0–10)" },
  { field: "ansiedadePreTreino", label: "6.2. Ansiedade pré-treino/jogo (0–10)" },
  { field: "focoConcentracao", label: "6.3. Nível de foco / concentração (0–10)" },
  { field: "motivacaoTreino", label: "6.4. Motivação para treinar hoje (0–10)" },
];

const MentalStateSection: React.FC<Props> = ({ formData, handleChange }) => {
  return (
    <div className="space-y-5 animate-fade-in">
      <h3 className="text-lg font-semibold font-display text-foreground">
        6) Estado mental e emocional
      </h3>

      {mentalFields.map(({ field, label }) => (
        <RangeField
          key={field}
          label={label}
          value={formData[field] ?? 0}
          onChange={handleChange(field)}
        />
      ))}
    </div>
  );
};

export default MentalStateSection;
