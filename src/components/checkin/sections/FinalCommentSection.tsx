import React from "react";
import { TextAreaField } from "../FormField";

interface Props {
  formData: Record<string, any>;
  handleChange: (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const FinalCommentSection: React.FC<Props> = ({ formData, handleChange }) => {
  return (
    <div className="space-y-5 animate-fade-in">
      <h3 className="text-lg font-semibold font-display text-foreground">
        8) Comentário adicional
      </h3>
      
      <p className="text-sm text-muted-foreground">
        Use este espaço para contar ao Gêmeo Digital qualquer coisa que não tenha
        aparecido nas perguntas anteriores.
      </p>
      
      <TextAreaField
        label=""
        onChange={handleChange("comentarioLivre")}
        value={formData.comentarioLivre}
        placeholder="Ex.: sensação diferente na perna direita, semana com muito estresse, dormi em outro lugar..."
        rows={5}
      />
    </div>
  );
};

export default FinalCommentSection;
