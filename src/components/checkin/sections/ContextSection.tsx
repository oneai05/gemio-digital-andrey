import React from "react";
import { ToggleButtons, SelectField, NumberField, TextAreaField } from "../FormField";

interface Props {
  formData: Record<string, any>;
  handleChange: (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  teveViagem: "sim" | "nao" | "";
  setTeveViagem: (value: "sim" | "nao") => void;
  estresseExterno: "sim" | "nao" | "";
  setEstresseExterno: (value: "sim" | "nao") => void;
}

const ContextSection: React.FC<Props> = ({
  formData,
  handleChange,
  teveViagem,
  setTeveViagem,
  estresseExterno,
  setEstresseExterno,
}) => {
  return (
    <div className="space-y-5 animate-fade-in">
      <h3 className="text-lg font-semibold font-display text-foreground">
        7) Variáveis contextuais
      </h3>

      <ToggleButtons
        label="7.1. Teve viagem recente?"
        value={teveViagem}
        onChange={setTeveViagem}
        yesVariant="primary"
      />

      {teveViagem === "sim" && (
        <div className="grid sm:grid-cols-2 gap-4 pl-2 border-l-2 border-primary/30 ml-2">
          <NumberField
            label="Horas totais de viagem"
            onChange={handleChange("horasViagem")}
            value={formData.horasViagem}
            min={0}
          />

          <SelectField
            label="Houve mudança de fuso horário?"
            options={["Sim", "Não"]}
            onChange={handleChange("mudancaFuso")}
            value={formData.mudancaFuso}
          />
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <SelectField
          label="7.2. Clima da sessão"
          options={["Frio", "Agradável", "Quente", "Muito quente", "Úmido"]}
          onChange={handleChange("climaSessao")}
          value={formData.climaSessao}
        />

        <SelectField
          label="7.3. Tipo de superfície"
          options={["Grama natural", "Grama alta", "Sintético", "Piso duro", "Outro"]}
          onChange={handleChange("superficie")}
          value={formData.superficie}
        />
      </div>

      <ToggleButtons
        label="7.4. Algum estresse externo relevante hoje? (família, estudos, etc.)"
        value={estresseExterno}
        onChange={setEstresseExterno}
        yesVariant="destructive"
      />

      {estresseExterno === "sim" && (
        <TextAreaField
          label="Descreva brevemente o estresse externo"
          onChange={handleChange("descricaoEstresseExterno")}
          value={formData.descricaoEstresseExterno}
          placeholder="Ex.: problemas familiares, provas na faculdade..."
        />
      )}
    </div>
  );
};

export default ContextSection;
