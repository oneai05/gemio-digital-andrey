import React from "react";
import { RangeField, SelectField } from "../FormField";

interface Props {
  formData: Record<string, any>;
  handleChange: (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const InternalLoadSection: React.FC<Props> = ({ formData, handleChange }) => {
  const pseFields = [
    { field: "pseGlobal", label: "PSE Global (0 = muito leve, 10 = exaustivo)" },
    { field: "pseMuscular", label: "PSE Muscular (0 = nenhum esforço, 10 = máximo)" },
    { field: "pseRespiratoria", label: "PSE Respiratória (0 = muito fácil, 10 = exausto/ofegante)" },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      <h3 className="text-lg font-semibold font-display text-foreground">
        2) Carga interna percebida
      </h3>

      {pseFields.map(({ field, label }) => (
        <RangeField
          key={field}
          label={label}
          value={formData[field] ?? 0}
          onChange={handleChange(field)}
        />
      ))}

      <SelectField
        label="Intensidade percebida"
        options={["Muito leve", "Leve", "Moderada", "Intensa", "Muito intensa", "Exaustiva"]}
        onChange={handleChange("intensidadePercebida")}
        value={formData.intensidadePercebida}
      />
    </div>
  );
};

export default InternalLoadSection;
