import React from "react";
import { SelectField, NumberField } from "../FormField";

interface Props {
  formData: Record<string, any>;
  handleChange: (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const GeneralInfoSection: React.FC<Props> = ({ formData, handleChange }) => {
  return (
    <div className="space-y-5 animate-fade-in">
      <h3 className="text-lg font-semibold font-display text-foreground">
        1) Informações gerais da sessão
      </h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <SelectField
          label="Tipo de atividade"
          options={["Treino", "Jogo", "Regenerativo", "Força", "Técnico/Tático", "Outro"]}
          onChange={handleChange("tipoAtividade")}
          value={formData.tipoAtividade}
        />

        <NumberField
          label="Duração total (minutos)"
          onChange={handleChange("duracaoMinutos")}
          value={formData.duracaoMinutos}
          min={0}
        />

        <SelectField
          label="Horário da sessão"
          options={["Manhã", "Tarde", "Noite"]}
          onChange={handleChange("horarioSessao")}
          value={formData.horarioSessao}
        />
      </div>
    </div>
  );
};

export default GeneralInfoSection;
