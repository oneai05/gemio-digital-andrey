import React from "react";
import { RangeField, SelectField, NumberField } from "../FormField";

interface Props {
  formData: Record<string, any>;
  handleChange: (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const FatigueSection: React.FC<Props> = ({ formData, handleChange }) => {
  return (
    <div className="space-y-5 animate-fade-in">
      <h3 className="text-lg font-semibold font-display text-foreground">
        4) Fadiga e recuperação
      </h3>

      <RangeField
        label="4.1. Fadiga geral hoje (0–10)"
        value={formData.fadigaGeral ?? 0}
        onChange={handleChange("fadigaGeral")}
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <SelectField
          label="4.2. Sensação ao acordar"
          options={["Muito recuperado", "Recuperado", "Normal", "Cansado", "Muito cansado"]}
          onChange={handleChange("sensacaoAcordar")}
          value={formData.sensacaoAcordar}
        />

        <RangeField
          label="4.3. Qualidade do sono (0–10)"
          value={formData.qualidadeSono ?? 0}
          onChange={handleChange("qualidadeSono")}
        />

        <NumberField
          label="4.4. Horas de sono total"
          onChange={handleChange("horasSono")}
          value={formData.horasSono}
          min={0}
          max={24}
          step={0.5}
        />

        <SelectField
          label="4.5. Rigidez muscular ao acordar"
          options={["Não", "Leve", "Moderada", "Intensa"]}
          onChange={handleChange("rigidezMatinal")}
          value={formData.rigidezMatinal}
        />

        <SelectField
          label="4.6. Como estavam suas pernas hoje?"
          options={["Leves", "Normais", "Pesadas"]}
          onChange={handleChange("pernasHoje")}
          value={formData.pernasHoje}
        />
      </div>
    </div>
  );
};

export default FatigueSection;
