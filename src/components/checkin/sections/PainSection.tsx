import React from "react";
import { ToggleButtons, CheckboxList, RangeField, SelectField } from "../FormField";

interface Props {
  formData: Record<string, any>;
  handleChange: (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  sentiuDor: "sim" | "nao" | "";
  setSentiuDor: (value: "sim" | "nao") => void;
  locaisDor: string[];
  handleCheckboxList: (value: string) => void;
}

const painLocations = [
  "Posterior coxa",
  "Anterior coxa",
  "Adutores",
  "Panturrilha",
  "Glúteo",
  "Lombar",
  "Tornozelo",
  "Joelho",
  "Quadril",
];

const PainSection: React.FC<Props> = ({
  formData,
  handleChange,
  sentiuDor,
  setSentiuDor,
  locaisDor,
  handleCheckboxList,
}) => {
  return (
    <div className="space-y-5 animate-fade-in">
      <h3 className="text-lg font-semibold font-display text-foreground">
        3) Dor / desconforto
      </h3>

      <ToggleButtons
        label="3.1. Você sentiu dor hoje?"
        value={sentiuDor}
        onChange={setSentiuDor}
        yesVariant="destructive"
      />

      {sentiuDor === "sim" && (
        <div className="space-y-5 pl-2 border-l-2 border-destructive/30 ml-2">
          <CheckboxList
            label="3.2. Local da dor (marque todos que se aplicam)"
            options={painLocations}
            selected={locaisDor}
            onChange={handleCheckboxList}
          />

          <RangeField
            label="3.3. Intensidade da dor (0 = sem dor, 10 = dor máxima)"
            value={formData.intensidadeDor ?? 0}
            onChange={handleChange("intensidadeDor")}
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <SelectField
              label="3.4. Quando começou a dor?"
              options={["Hoje", "Ontem", "Há mais de 2 dias", "Crônica / recorrente"]}
              onChange={handleChange("inicioDor")}
              value={formData.inicioDor}
            />

            <SelectField
              label="3.5. A dor está:"
              options={["Piorando", "Igual", "Melhorando"]}
              onChange={handleChange("evolucaoDor")}
              value={formData.evolucaoDor}
            />

            <SelectField
              label="3.6. A dor limitou algum movimento?"
              options={["Sim", "Não"]}
              onChange={handleChange("dorLimitouMovimento")}
              value={formData.dorLimitouMovimento}
            />

            <SelectField
              label="3.7. A dor afetou aceleração/frenagem/mudança de direção?"
              options={["Sim", "Não"]}
              onChange={handleChange("dorAfetouAcel")}
              value={formData.dorAfetouAcel}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PainSection;
