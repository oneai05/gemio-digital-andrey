import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MessageCircle, X, Send, Sparkles } from "lucide-react";
import oneAiLogo from "@/assets/one-ai-logo.jpg";

interface ResultadoGemeoProps {
  onBack: () => void;
}

const ResultadoGemeo: React.FC<ResultadoGemeoProps> = ({ onBack }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content: "Olá! Sou seu assistente do Gêmeo Digital. Posso responder perguntas sobre suas análises e recomendações. Como posso ajudar?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  // TODO: Buscar dados reais do n8n
  const lastCheckInDate = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  const analiseGemeo = `Análise do Gêmeo Digital - Em breve você verá aqui as recomendações personalizadas do seu Gêmeo Digital.

Esta análise é atualizada automaticamente após cada check-in e considera:
• Carga de treino e intensidade
• Qualidade de sono e recuperação
• Dor e desconforto muscular
• Estado mental e motivação
• Contexto e fatores externos

As recomendações serão geradas pelo agente inteligente baseado no seu perfil e histórico.`;

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Adiciona mensagem do usuário
    setChatMessages(prev => [...prev, { role: "user", content: inputMessage }]);
    
    // TODO: Integrar com IA real
    // Simula resposta da IA
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        role: "assistant",
        content: "Entendi sua pergunta. Em breve estarei conectado ao histórico completo das suas análises para fornecer respostas mais precisas."
      }]);
    }, 1000);

    setInputMessage("");
  };

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
              {analiseGemeo}
            </div>
          </div>

          {/* Loading indicator (para quando estiver carregando dados reais) */}
          {/* <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-xl">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
              <p className="text-sm text-muted-foreground">Carregando análise...</p>
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
          💡 Use o chat no canto inferior direito para tirar dúvidas sobre sua análise
        </motion.p>
      </main>

      {/* Chat Flutuante */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden z-40"
          >
            {/* Chat Header */}
            <div className="px-4 py-3 bg-primary/10 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img 
                  src={oneAiLogo} 
                  alt="AI Assistant" 
                  className="h-8 w-8 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold text-sm">Assistente IA</h3>
                  <p className="text-xs text-muted-foreground">Tire suas dúvidas</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Faça uma pergunta..."
                  className="flex-1 px-4 py-2 bg-muted rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={handleSendMessage}
                  className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
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

