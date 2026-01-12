import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MessageCircle, X, Sparkles } from "lucide-react";
import oneAiLogo from "@/assets/one-ai-logo.jpg";
import { ChatAssistente } from "@/components/ChatAssistente";

interface ResultadoGemeoProps {
  onBack: () => void;
}

const ResultadoGemeo: React.FC<ResultadoGemeoProps> = ({ onBack }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [analiseGemeo, setAnaliseGemeo] = useState<string>("");
  const [lastCheckInDate, setLastCheckInDate] = useState<string>("...");
  const [isLoadingAnalise, setIsLoadingAnalise] = useState(true);
  const [analiseError, setAnaliseError] = useState<string>("");
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
  const buildAnaliseText = (payload: Record<string, string | null>) => {
    const sections = [
      { title: "Treino", value: payload.treino_explicacao },
      { title: "Recuperacao", value: payload.recuperacao_explicacao },
      { title: "Nutricao", value: payload.nutricao_explicacao },
      { title: "Insights Geneticos", value: payload.insights_geneticos_explicacao },
      { title: "Monitoramento", value: payload.monitoramento_explicacao },
    ];

    const lines: string[] = [];
    sections.forEach((section) => {
      if (!section.value) {
        return;
      }
      lines.push(`${section.title}:`);
      lines.push(section.value);
      lines.push("");
    });

    return lines.join("\n").trim();
  };

  const fetchAnalise = useCallback(async () => {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      setAnaliseError("Configuracao do Supabase nao encontrada.");
      setIsLoadingAnalise(false);
      return;
    }

    try {
      setAnaliseError("");
      const endpoint = `${SUPABASE_URL}/rest/v1/gemeo_digital_analises?athlete_id=eq.andrey_santos&select=timestamp_analise,treino_explicacao,recuperacao_explicacao,nutricao_explicacao,insights_geneticos_explicacao,monitoramento_explicacao&order=timestamp_analise.desc&limit=1`;
      const response = await fetch(endpoint, {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}`);
      }

      const data = (await response.json()) as Array<Record<string, string | null>>;
      const latest = data[0];

      if (!latest) {
        setAnaliseGemeo("Nenhuma analise encontrada ainda.");
        setIsLoadingAnalise(false);
        return;
      }

      const builtText = buildAnaliseText(latest);
      setAnaliseGemeo(
        builtText || "A analise ainda nao possui texto gerado pelo agente."
      );

      if (latest.timestamp_analise) {
        const date = new Date(latest.timestamp_analise);
        const formatted = date.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
        setLastCheckInDate(formatted);
      }
    } catch (error) {
      setAnaliseError("Nao foi possivel carregar a analise.");
    } finally {
      setIsLoadingAnalise(false);
    }
  }, [SUPABASE_URL, SUPABASE_ANON_KEY]);

  useEffect(() => {
    fetchAnalise();
    const interval = window.setInterval(fetchAnalise, 10000);
    return () => window.clearInterval(interval);
  }, [fetchAnalise]);

  return (
    <div className="min-h-screen gradient-hero text-foreground">
      {/* Header */}
      <header className="w-full px-4 sm:px-8 pt-6 pb-4 flex items-center justify-between border-b border-border/30">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Voltar</span>
          </button>
          <div className="h-8 w-px bg-border" />
          <div className="flex items-center gap-3">
            <img 
              src={oneAiLogo} 
              alt="One AI" 
              className="h-10 w-10 rounded-xl object-cover shadow-lg"
            />
            <div>
              <h1 className="text-lg sm:text-xl font-semibold font-display">
                Resultado do Gêmeo Digital
              </h1>
              <p className="text-xs text-muted-foreground">
                Análises e recomendações personalizadas
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-8">
        {/* Data do último check-in */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center justify-center gap-2 text-sm text-muted-foreground"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span>Última análise: <strong className="text-foreground">{lastCheckInDate}</strong></span>
        </motion.div>

        {/* Caixa de Análise Central */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 sm:p-8 min-h-[500px] relative"
        >
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display">Análise Personalizada</h2>
              <p className="text-sm text-muted-foreground">Gerada pelo seu Gêmeo Digital</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="text-base leading-relaxed text-muted-foreground whitespace-pre-line">
              {isLoadingAnalise && "Carregando analise..."}
              {!isLoadingAnalise && analiseError && analiseError}
              {!isLoadingAnalise && !analiseError && analiseGemeo}
            </div>
          </div>

          {/* Loading indicator (para quando estiver carregando dados reais) */}
          {/* <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-xl">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
              <p className="text-sm text-muted-foreground">Carregando analise...</p>
            </div>
          </div> */}
        </motion.div>

        {/* Info adicional */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs text-muted-foreground/70 text-center mt-6"
        >
          Use o chat no canto inferior direito para tirar duvidas sobre sua analise
        </motion.p>
      </main>

      {/* Chat Flutuante */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden z-40 relative"
          >
            <button
              onClick={() => setIsChatOpen(false)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors z-10"
              aria-label="Fechar chat"
            >
              <X className="w-5 h-5" />
            </button>
            <ChatAssistente />
          </motion.div>
        )}
      </AnimatePresence>


      {/* Chat Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50"
      >
        {isChatOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </div>
  );
};

export default ResultadoGemeo;














