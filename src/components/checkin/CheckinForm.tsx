import React, { useState } from "react";
import { toast } from "@/hooks/use-toast";
import SectionTabs from "./SectionTabs";
import GeneralInfoSection from "./sections/GeneralInfoSection";
import InternalLoadSection from "./sections/InternalLoadSection";
import PainSection from "./sections/PainSection";
import FatigueSection from "./sections/FatigueSection";
import NutritionSection from "./sections/NutritionSection";
import MentalStateSection from "./sections/MentalStateSection";
import ContextSection from "./sections/ContextSection";
import FinalCommentSection from "./sections/FinalCommentSection";

const sections = [
  "Informações gerais",
  "Carga interna",
  "Dor / desconforto",
  "Fadiga e recuperação",
  "Nutrição e hidratação",
  "Estado mental",
  "Contexto",
  "Comentário final",
];

const CheckinForm: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("Informações gerais");
  const [submitting, setSubmitting] = useState(false);
  const [sentiuDor, setSentiuDor] = useState<"sim" | "nao" | "">("");
  const [teveViagem, setTeveViagem] = useState<"sim" | "nao" | "">("");
  const [cafeina, setCafeina] = useState<"sim" | "nao" | "">("");
  const [estresseExterno, setEstresseExterno] = useState<"sim" | "nao" | "">("");
  const [locaisDor, setLocaisDor] = useState<string[]>([]);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleCheckboxList = (value: string) => {
    setLocaisDor((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const payload = {
        ...formData,
        sentiuDor,
        teveViagem,
        cafeina,
        estresseExterno,
        locaisDor,
        submittedAt: new Date().toISOString(),
      };

      console.log("Form payload:", payload);

      // TODO: Integrate with n8n webhook
      // await fetch("https://SEU-WEBHOOK-N8N.aqui", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload),
      // });

      toast({
        title: "Check-in enviado!",
        description: "Seus dados foram enviados com sucesso para o Gêmeo Digital.",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderSection = () => {
    const props = { formData, handleChange };

    switch (activeSection) {
      case "Informações gerais":
        return <GeneralInfoSection {...props} />;
      case "Carga interna":
        return <InternalLoadSection {...props} />;
      case "Dor / desconforto":
        return (
          <PainSection
            {...props}
            sentiuDor={sentiuDor}
            setSentiuDor={setSentiuDor}
            locaisDor={locaisDor}
            handleCheckboxList={handleCheckboxList}
          />
        );
      case "Fadiga e recuperação":
        return <FatigueSection {...props} />;
      case "Nutrição e hidratação":
        return (
          <NutritionSection
            {...props}
            cafeina={cafeina}
            setCafeina={setCafeina}
          />
        );
      case "Estado mental":
        return <MentalStateSection {...props} />;
      case "Contexto":
        return (
          <ContextSection
            {...props}
            teveViagem={teveViagem}
            setTeveViagem={setTeveViagem}
            estresseExterno={estresseExterno}
            setEstresseExterno={setEstresseExterno}
          />
        );
      case "Comentário final":
        return <FinalCommentSection {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="glass-card p-5 sm:p-6">
      <SectionTabs
        sections={sections}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin">
          {renderSection()}
        </div>

        <div className="pt-4 flex justify-between items-center border-t border-border/50">
          <p className="text-xs text-muted-foreground hidden sm:block">
            Seção {sections.indexOf(activeSection) + 1} de {sections.length}
          </p>
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary"
          >
            {submitting ? (
              <>
                <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar check-in"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckinForm;
