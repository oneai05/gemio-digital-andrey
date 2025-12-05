import React from "react";
import { SelectField, ToggleButtons, TextField } from "../FormField";

interface Props {
  formData: Record<string, any>;
  handleChange: (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  cafeina: "sim" | "nao" | "";
  setCafeina: (value: "sim" | "nao") => void;
}

const NutritionSection: React.FC<Props> = ({
  formData,
  handleChange,
  cafeina,
  setCafeina,
}) => {
  return (
    <div className="space-y-5 animate-fade-in">
      <h3 className="text-lg font-semibold font-display text-foreground">
        5) Nutrição e hidratação
      </h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <SelectField
          label="5.1. Hidratação percebida"
          options={["Adequada", "Moderada", "Baixa"]}
          onChange={handleChange("hidratacao")}
          value={formData.hidratacao}
        />

        <SelectField
          label="5.2. Cor da urina"
          options={["Transparente", "Amarelo claro", "Amarelo escuro", "Muito escura"]}
          onChange={handleChange("corUrina")}
          value={formData.corUrina}
        />

        <SelectField
          label="5.3. Refeição pré-treino adequada?"
          options={["Sim", "Não"]}
          onChange={handleChange("refeicaoPreTreino")}
          value={formData.refeicaoPreTreino}
        />

        <SelectField
          label="5.4. Ingestão proteica nas últimas 24h"
          options={["Adequada", "Moderada", "Baixa"]}
          onChange={handleChange("ingestaoProteica")}
          value={formData.ingestaoProteica}
        />
      </div>

      <ToggleButtons
        label="5.5. Consumiu cafeína hoje?"
        value={cafeina}
        onChange={setCafeina}
        yesVariant="primary"
      />

      {cafeina === "sim" && (
        <TextField
          label="Horário aproximado do consumo de cafeína"
          onChange={handleChange("horarioCafeina")}
          value={formData.horarioCafeina}
          placeholder="Ex.: 09:00, 14:30, antes do treino..."
        />
      )}
    </div>
  );
};

export default NutritionSection;
