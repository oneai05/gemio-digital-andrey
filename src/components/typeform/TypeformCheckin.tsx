import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import TypeformProgress from "./TypeformProgress";
import TypeformQuestion from "./TypeformQuestion";
import TypeformIntro from "./TypeformIntro";
import TypeformSuccess from "./TypeformSuccess";
import TypeformSelect from "./inputs/TypeformSelect";
import TypeformNumber from "./inputs/TypeformNumber";
import TypeformSlider from "./inputs/TypeformSlider";
import TypeformYesNo from "./inputs/TypeformYesNo";
import TypeformMultiSelect from "./inputs/TypeformMultiSelect";
import TypeformTextarea from "./inputs/TypeformTextarea";

type FormStep = "intro" | "questions" | "success";

interface FormData {
  tipoAtividade: string;
  duracaoMinutos: string;
  horarioSessao: string;
  pseGlobal: number;
  pseMuscular: number;
  pseRespiratoria: number;
  intensidadePercebida: string;
  sentiuDor: "sim" | "nao" | "";
  locaisDor: string[];
  intensidadeDor: number;
  inicioDor: string;
  evolucaoDor: string;
  dorLimitouMovimento: string;
  fadigaGeral: number;
  qualidadeSono: number;
  horasSono: string;
  sensacaoAcordar: string;
  pernasHoje: string;
  hidratacao: string;
  corUrina: string;
  refeicaoPreTreino: string;
  cafeina: "sim" | "nao" | "";
  estresseHoje: number;
  ansiedadePreTreino: number;
  focoConcentracao: number;
  motivacaoTreino: number;
  teveViagem: "sim" | "nao" | "";
  climaSessao: string;
  estresseExterno: "sim" | "nao" | "";
  comentarioLivre: string;
}

const painLocations = [
  "Posterior coxa",
  "Anterior coxa",
  "Adutores",
  "Panturrilha",
  "GlÃºteo",
  "Lombar",
  "Tornozelo",
  "Joelho",
  "Quadril",
];
const webhookUrl = "https://oneai.app.n8n.cloud/webhook/athlete-analysis";

interface TypeformCheckinProps {
  onBack?: () => void;
  onNavigateToResultado?: () => void;
}

const TypeformCheckin: React.FC<TypeformCheckinProps> = ({ onBack, onNavigateToResultado }) => {
  const [step, setStep] = useState<FormStep>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    tipoAtividade: "",
    duracaoMinutos: "",
    horarioSessao: "",
    pseGlobal: 5,
    pseMuscular: 5,
    pseRespiratoria: 5,
    intensidadePercebida: "",
    sentiuDor: "",
    locaisDor: [],
    intensidadeDor: 0,
    inicioDor: "",
    evolucaoDor: "",
    dorLimitouMovimento: "",
    fadigaGeral: 5,
    qualidadeSono: 5,
    horasSono: "",
    sensacaoAcordar: "",
    pernasHoje: "",
    hidratacao: "",
    corUrina: "",
    refeicaoPreTreino: "",
    cafeina: "",
    estresseHoje: 5,
    ansiedadePreTreino: 5,
    focoConcentracao: 5,
    motivacaoTreino: 5,
    teveViagem: "",
    climaSessao: "",
    estresseExterno: "",
    comentarioLivre: "",
  });

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Dynamic questions based on conditional logic
  const getQuestions = useCallback(() => {
    const questions: {
      id: string;
      title: string;
      subtitle?: string;
      render: () => React.ReactNode;
      canProceed: () => boolean;
    }[] = [
      // 1. Tipo de atividade
      {
        id: "tipoAtividade",
        title: "Qual foi o tipo de atividade de hoje?",
        render: () => (
          <TypeformSelect
            options={["Treino", "Jogo", "Regenerativo", "ForÃ§a", "TÃ©cnico/TÃ¡tico", "Outro"]}
            value={formData.tipoAtividade}
            onChange={(v) => updateField("tipoAtividade", v)}
            onAutoAdvance={handleNext}
          />
        ),
        canProceed: () => !!formData.tipoAtividade,
      },
      // 2. DuraÃ§Ã£o
      {
        id: "duracaoMinutos",
        title: "Qual foi a duraÃ§Ã£o total da sessÃ£o?",
        subtitle: "Em minutos",
        render: () => (
          <TypeformNumber
            value={formData.duracaoMinutos}
            onChange={(v) => updateField("duracaoMinutos", v)}
            placeholder="Ex: 90"
            min={0}
            unit="minutos"
          />
        ),
        canProceed: () => !!formData.duracaoMinutos,
      },
      // 3. HorÃ¡rio
      {
        id: "horarioSessao",
        title: "Em qual horÃ¡rio foi a sessÃ£o?",
        render: () => (
          <TypeformSelect
            options={["ManhÃ£", "Tarde", "Noite"]}
            value={formData.horarioSessao}
            onChange={(v) => updateField("horarioSessao", v)}
            onAutoAdvance={handleNext}
          />
        ),
        canProceed: () => !!formData.horarioSessao,
      },
      // 4. PSE Global
      {
        id: "pseGlobal",
        title: "Como vocÃª avalia o esforÃ§o global da sessÃ£o?",
        subtitle: "0 = muito leve, 10 = exaustivo",
        render: () => (
          <TypeformSlider
            value={formData.pseGlobal}
            onChange={(v) => updateField("pseGlobal", v)}
            onAutoAdvance={handleNext}
            minLabel="Muito leve"
            maxLabel="Exaustivo"
          />
        ),
        canProceed: () => true,
      },
      // 5. PSE Muscular
      {
        id: "pseMuscular",
        title: "E o esforÃ§o muscular?",
        subtitle: "0 = nenhum esforÃ§o, 10 = mÃ¡ximo",
        render: () => (
          <TypeformSlider
            value={formData.pseMuscular}
            onChange={(v) => updateField("pseMuscular", v)}
            onAutoAdvance={handleNext}
            minLabel="Nenhum"
            maxLabel="MÃ¡ximo"
          />
        ),
        canProceed: () => true,
      },
      // 6. PSE RespiratÃ³ria
      {
        id: "pseRespiratoria",
        title: "E o esforÃ§o respiratÃ³rio?",
        subtitle: "0 = muito fÃ¡cil, 10 = exausto/ofegante",
        render: () => (
          <TypeformSlider
            value={formData.pseRespiratoria}
            onChange={(v) => updateField("pseRespiratoria", v)}
            onAutoAdvance={handleNext}
            minLabel="Muito fÃ¡cil"
            maxLabel="Ofegante"
          />
        ),
        canProceed: () => true,
      },
      // 7. Intensidade percebida
      {
        id: "intensidadePercebida",
        title: "Como vocÃª classificaria a intensidade geral?",
        render: () => (
          <TypeformSelect
            options={["Muito leve", "Leve", "Moderada", "Intensa", "Muito intensa", "Exaustiva"]}
            value={formData.intensidadePercebida}
            onChange={(v) => updateField("intensidadePercebida", v)}
            onAutoAdvance={handleNext}
          />
        ),
        canProceed: () => !!formData.intensidadePercebida,
      },
      // 8. Sentiu dor?
      {
        id: "sentiuDor",
        title: "VocÃª sentiu dor ou desconforto hoje?",
        render: () => (
          <TypeformYesNo
            value={formData.sentiuDor}
            onChange={(v) => updateField("sentiuDor", v)}
            onAutoAdvance={handleNext}
            yesVariant="danger"
          />
        ),
        canProceed: () => !!formData.sentiuDor,
      },
    ];

    // Conditional pain questions
    if (formData.sentiuDor === "sim") {
      questions.push(
        {
          id: "locaisDor",
          title: "Onde vocÃª sentiu dor?",
          subtitle: "Marque todos os locais que se aplicam",
          render: () => (
            <TypeformMultiSelect
              options={painLocations}
              selected={formData.locaisDor}
              onChange={(v) => updateField("locaisDor", v)}
            />
          ),
          canProceed: () => formData.locaisDor.length > 0,
        },
        {
          id: "intensidadeDor",
          title: "Qual a intensidade da dor?",
          subtitle: "0 = sem dor, 10 = dor mÃ¡xima",
          render: () => (
            <TypeformSlider
              value={formData.intensidadeDor}
              onChange={(v) => updateField("intensidadeDor", v)}
              onAutoAdvance={handleNext}
              minLabel="Sem dor"
              maxLabel="MÃ¡xima"
            />
          ),
          canProceed: () => true,
        },
        {
          id: "inicioDor",
          title: "Quando a dor comeÃ§ou?",
          render: () => (
            <TypeformSelect
              options={["Hoje", "Ontem", "HÃ¡ mais de 2 dias", "CrÃ´nica / recorrente"]}
              value={formData.inicioDor}
              onChange={(v) => updateField("inicioDor", v)}
              onAutoAdvance={handleNext}
            />
          ),
          canProceed: () => !!formData.inicioDor,
        },
        {
          id: "evolucaoDor",
          title: "Como a dor estÃ¡ evoluindo?",
          render: () => (
            <TypeformSelect
              options={["Piorando", "Igual", "Melhorando"]}
              value={formData.evolucaoDor}
              onChange={(v) => updateField("evolucaoDor", v)}
              onAutoAdvance={handleNext}
            />
          ),
          canProceed: () => !!formData.evolucaoDor,
        }
      );
    }

    // Continue with rest of questions
    questions.push(
      // 9. Fadiga geral
      {
        id: "fadigaGeral",
        title: "Como estÃ¡ sua fadiga geral hoje?",
        subtitle: "0 = totalmente recuperado, 10 = extremamente cansado",
        render: () => (
          <TypeformSlider
            value={formData.fadigaGeral}
            onChange={(v) => updateField("fadigaGeral", v)}
            onAutoAdvance={handleNext}
            minLabel="Recuperado"
            maxLabel="Exausto"
          />
        ),
        canProceed: () => true,
      },
      // 10. Qualidade do sono
      {
        id: "qualidadeSono",
        title: "Como foi a qualidade do seu sono?",
        subtitle: "0 = pÃ©ssimo, 10 = excelente",
        render: () => (
          <TypeformSlider
            value={formData.qualidadeSono}
            onChange={(v) => updateField("qualidadeSono", v)}
            onAutoAdvance={handleNext}
            minLabel="PÃ©ssimo"
            maxLabel="Excelente"
          />
        ),
        canProceed: () => true,
      },
      // 11. Horas de sono
      {
        id: "horasSono",
        title: "Quantas horas vocÃª dormiu?",
        render: () => (
          <TypeformNumber
            value={formData.horasSono}
            onChange={(v) => updateField("horasSono", v)}
            placeholder="Ex: 7.5"
            min={0}
            max={24}
            step={0.5}
            unit="horas"
          />
        ),
        canProceed: () => !!formData.horasSono,
      },
      // 12. SensaÃ§Ã£o ao acordar
      {
        id: "sensacaoAcordar",
        title: "Como vocÃª se sentiu ao acordar?",
        render: () => (
          <TypeformSelect
            options={["Muito recuperado", "Recuperado", "Normal", "Cansado", "Muito cansado"]}
            value={formData.sensacaoAcordar}
            onChange={(v) => updateField("sensacaoAcordar", v)}
            onAutoAdvance={handleNext}
          />
        ),
        canProceed: () => !!formData.sensacaoAcordar,
      },
      // 13. Pernas hoje
      {
        id: "pernasHoje",
        title: "Como estavam suas pernas hoje?",
        render: () => (
          <TypeformSelect
            options={["Leves", "Normais", "Pesadas"]}
            value={formData.pernasHoje}
            onChange={(v) => updateField("pernasHoje", v)}
            onAutoAdvance={handleNext}
          />
        ),
        canProceed: () => !!formData.pernasHoje,
      },
      // 14. HidrataÃ§Ã£o
      {
        id: "hidratacao",
        title: "Como estÃ¡ sua hidrataÃ§Ã£o?",
        render: () => (
          <TypeformSelect
            options={["Adequada", "Moderada", "Baixa"]}
            value={formData.hidratacao}
            onChange={(v) => updateField("hidratacao", v)}
            onAutoAdvance={handleNext}
          />
        ),
        canProceed: () => !!formData.hidratacao,
      },
      // 15. Cor da urina
      {
        id: "corUrina",
        title: "Qual a cor da sua urina?",
        subtitle: "Indicador de hidrataÃ§Ã£o",
        render: () => (
          <TypeformSelect
            options={["Transparente", "Amarelo claro", "Amarelo escuro", "Muito escura"]}
            value={formData.corUrina}
            onChange={(v) => updateField("corUrina", v)}
            onAutoAdvance={handleNext}
          />
        ),
        canProceed: () => !!formData.corUrina,
      },
      // 16. RefeiÃ§Ã£o prÃ©-treino
      {
        id: "refeicaoPreTreino",
        title: "Sua refeiÃ§Ã£o prÃ©-treino foi adequada?",
        render: () => (
          <TypeformSelect
            options={["Sim", "NÃ£o"]}
            value={formData.refeicaoPreTreino}
            onChange={(v) => updateField("refeicaoPreTreino", v)}
            onAutoAdvance={handleNext}
          />
        ),
        canProceed: () => !!formData.refeicaoPreTreino,
      },
      // 17. CafeÃ­na
      {
        id: "cafeina",
        title: "VocÃª consumiu cafeÃ­na hoje?",
        render: () => (
          <TypeformYesNo
            value={formData.cafeina}
            onChange={(v) => updateField("cafeina", v)}
            onAutoAdvance={handleNext}
          />
        ),
        canProceed: () => !!formData.cafeina,
      },
      // 18. Estresse
      {
        id: "estresseHoje",
        title: "Qual seu nÃ­vel de estresse hoje?",
        subtitle: "0 = relaxado, 10 = muito estressado",
        render: () => (
          <TypeformSlider
            value={formData.estresseHoje}
            onChange={(v) => updateField("estresseHoje", v)}
            onAutoAdvance={handleNext}
            minLabel="Relaxado"
            maxLabel="Estressado"
          />
        ),
        canProceed: () => true,
      },
      // 19. Foco
      {
        id: "focoConcentracao",
        title: "Como estÃ¡ seu foco e concentraÃ§Ã£o?",
        subtitle: "0 = disperso, 10 = muito focado",
        render: () => (
          <TypeformSlider
            value={formData.focoConcentracao}
            onChange={(v) => updateField("focoConcentracao", v)}
            onAutoAdvance={handleNext}
            minLabel="Disperso"
            maxLabel="Focado"
          />
        ),
        canProceed: () => true,
      },
      // 20. MotivaÃ§Ã£o
      {
        id: "motivacaoTreino",
        title: "Qual sua motivaÃ§Ã£o para treinar hoje?",
        subtitle: "0 = sem vontade, 10 = super motivado",
        render: () => (
          <TypeformSlider
            value={formData.motivacaoTreino}
            onChange={(v) => updateField("motivacaoTreino", v)}
            onAutoAdvance={handleNext}
            minLabel="Sem vontade"
            maxLabel="Motivado"
          />
        ),
        canProceed: () => true,
      },
      // 21. Viagem
      {
        id: "teveViagem",
        title: "VocÃª viajou recentemente?",
        subtitle: "Viagens podem afetar recuperaÃ§Ã£o e desempenho",
        render: () => (
          <TypeformYesNo
            value={formData.teveViagem}
            onChange={(v) => updateField("teveViagem", v)}
            onAutoAdvance={handleNext}
          />
        ),
        canProceed: () => !!formData.teveViagem,
      },
      // 22. Clima
      {
        id: "climaSessao",
        title: "Como estava o clima durante a sessÃ£o?",
        render: () => (
          <TypeformSelect
            options={["Frio", "AgradÃ¡vel", "Quente", "Muito quente", "Ãšmido"]}
            value={formData.climaSessao}
            onChange={(v) => updateField("climaSessao", v)}
            onAutoAdvance={handleNext}
          />
        ),
        canProceed: () => !!formData.climaSessao,
      },
      // 23. Estresse externo
      {
        id: "estresseExterno",
        title: "Algum estresse externo relevante hoje?",
        subtitle: "FamÃ­lia, estudos, relacionamentos...",
        render: () => (
          <TypeformYesNo
            value={formData.estresseExterno}
            onChange={(v) => updateField("estresseExterno", v)}
            onAutoAdvance={handleNext}
            yesVariant="danger"
          />
        ),
        canProceed: () => !!formData.estresseExterno,
      },
      // 24. ComentÃ¡rio final
      {
        id: "comentarioLivre",
        title: "Quer adicionar algo mais?",
        subtitle: "Qualquer informaÃ§Ã£o extra que o GÃªmeo Digital deva saber",
        render: () => (
          <TypeformTextarea
            value={formData.comentarioLivre}
            onChange={(v) => updateField("comentarioLivre", v)}
            placeholder="Ex: sensaÃ§Ã£o diferente na perna direita, semana com muito estresse..."
          />
        ),
        canProceed: () => true,
      }
    );

    return questions;
  }, [formData]);

  const questions = getQuestions();
  const totalQuestions = questions.length;
  const currentQ = questions[currentQuestion];

  const handleNext = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  }, [currentQuestion, questions.length]);

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    } else {
      // Se estÃ¡ na primeira pergunta, volta para a tela de introduÃ§Ã£o
      setStep("intro");
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        athlete_id: "andrey_santos",
        source: "typeform_checkin",
        submitted_at: new Date().toISOString(),
        tipoAtividade: formData.tipoAtividade ?? "",
        duracaoMinutos: formData.duracaoMinutos ?? "",
        horarioSessao: formData.horarioSessao ?? "",
        pseGlobal: formData.pseGlobal ?? "",
        pseMuscular: formData.pseMuscular ?? "",
        pseRespiratoria: formData.pseRespiratoria ?? "",
        intensidadePercebida: formData.intensidadePercebida ?? "",
        sentiuDor: formData.sentiuDor ?? "",
        locaisDor: formData.locaisDor ?? [],
        intensidadeDor: formData.intensidadeDor ?? "",
        inicioDor: formData.inicioDor ?? "",
        evolucaoDor: formData.evolucaoDor ?? "",
        dorLimitouMovimento: formData.dorLimitouMovimento ?? "",
        fadigaGeral: formData.fadigaGeral ?? "",
        qualidadeSono: formData.qualidadeSono ?? "",
        horasSono: formData.horasSono ?? "",
        sensacaoAcordar: formData.sensacaoAcordar ?? "",
        pernasHoje: formData.pernasHoje ?? "",
        hidratacao: formData.hidratacao ?? "",
        corUrina: formData.corUrina ?? "",
        refeicaoPreTreino: formData.refeicaoPreTreino ?? "",
        cafeina: formData.cafeina ?? "",
        estresseHoje: formData.estresseHoje ?? "",
        ansiedadePreTreino: formData.ansiedadePreTreino ?? "",
        focoConcentracao: formData.focoConcentracao ?? "",
        motivacaoTreino: formData.motivacaoTreino ?? "",
        teveViagem: formData.teveViagem ?? "",
        climaSessao: formData.climaSessao ?? "",
        estresseExterno: formData.estresseExterno ?? "",
        comentarioLivre: formData.comentarioLivre ?? "",
      };

      console.log("Form submitted:", payload);

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Webhook error: ${response.status}`);
      }
      toast({
        title: "Check-in enviado!",
        description: "Seus dados foram processados pelo GÃªmeo Digital.",
      });
      
      setStep("success");
    } catch (err) {
      console.error(err);
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      tipoAtividade: "",
      duracaoMinutos: "",
      horarioSessao: "",
      pseGlobal: 5,
      pseMuscular: 5,
      pseRespiratoria: 5,
      intensidadePercebida: "",
      sentiuDor: "",
      locaisDor: [],
      intensidadeDor: 0,
      inicioDor: "",
      evolucaoDor: "",
      dorLimitouMovimento: "",
      fadigaGeral: 5,
      qualidadeSono: 5,
      horasSono: "",
      sensacaoAcordar: "",
      pernasHoje: "",
      hidratacao: "",
      corUrina: "",
      refeicaoPreTreino: "",
      cafeina: "",
      estresseHoje: 5,
      ansiedadePreTreino: 5,
      focoConcentracao: 5,
      motivacaoTreino: 5,
      teveViagem: "",
      climaSessao: "",
      estresseExterno: "",
      comentarioLivre: "",
    });
    setCurrentQuestion(0);
    setStep("intro");
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (step === "intro") {
          setStep("questions");
        } else if (step === "questions" && currentQ?.canProceed()) {
          handleNext();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [step, currentQ, handleNext]);

  return (
    <div className="min-h-screen gradient-hero text-foreground">
      {step === "questions" && (
        <TypeformProgress current={currentQuestion + 1} total={totalQuestions} />
      )}

      <AnimatePresence mode="wait">
        {step === "intro" && (
          <TypeformIntro key="intro" onStart={() => setStep("questions")} onBack={onBack} onNavigateToResultado={onNavigateToResultado} />
        )}

        {step === "questions" && currentQ && (
          <TypeformQuestion
            key={currentQ.id}
            questionNumber={currentQuestion + 1}
            totalQuestions={totalQuestions}
            title={currentQ.title}
            subtitle={currentQ.subtitle}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isFirst={currentQuestion === 0}
            isLast={currentQuestion === questions.length - 1}
            canProceed={currentQ.canProceed()}
            isSubmitting={isSubmitting}
          >
            {currentQ.render()}
          </TypeformQuestion>
        )}

        {step === "success" && (
          <TypeformSuccess key="success" onReset={handleReset} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TypeformCheckin;


