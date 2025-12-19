import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, BarChart3, ArrowRight } from "lucide-react";
import oneAiLogo from "@/assets/one-ai-logo.jpg";
import athletePhoto from "@/assets/athlete-profile.png";
import TypeformCheckin from "@/components/typeform/TypeformCheckin";

const Index: React.FC = () => {
  const [showCheckin, setShowCheckin] = useState(false);

  if (showCheckin) {
    return <TypeformCheckin />;
  }

  return (
    <div className="min-h-screen gradient-hero text-foreground flex flex-col">
      {/* Header */}
      <header className="w-full px-4 sm:px-8 pt-6 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl overflow-hidden shadow-lg animate-glow-pulse">
            <img 
              src={oneAiLogo} 
              alt="One AI Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-semibold font-display text-foreground">
              Gêmeo Digital do Atleta
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Monitoramento inteligente de carga, recuperação e risco de lesão.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-8 pb-10 flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
        {/* Athlete Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full glass-card p-4 flex items-center gap-4 mb-4"
        >
          <div className="relative">
            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl overflow-hidden border-2 border-chelsea/50 shadow-lg">
              <img 
                src={athletePhoto} 
                alt="Andrey Santos" 
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-chelsea border-2 border-background flex items-center justify-center font-bold text-xs text-foreground">
              17
            </div>
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-1">Bem-vindo de volta,</p>
            <h3 className="text-lg sm:text-xl font-bold font-display text-foreground">
              Andrey Santos
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="text-xs px-2 py-0.5 rounded-full bg-chelsea/20 text-chelsea border border-chelsea/30">
                Meio-campista
              </span>
              <span className="text-xs text-muted-foreground">Chelsea FC</span>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-success/20 text-success">
                🇧🇷 Brasil
              </span>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Link */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full glass-card p-4 flex items-center gap-4 mb-6 hover:bg-muted/20 transition-colors group"
        >
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold text-foreground">Ver Dashboard de Análise</p>
            <p className="text-xs text-muted-foreground">Visualize seu risco de lesão e recomendações</p>
          </div>
          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </motion.button>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="status-badge w-fit mb-6"
        >
          <span className="pulse-dot" />
          Check-in diário conectado ao seu Gêmeo Digital
        </motion.div>

        {/* Welcome Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display leading-tight text-foreground mb-2">
            Olá, Andrey!{" "}
            <span className="text-primary">Seu Gêmeo Digital está pronto.</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg mx-auto">
            Este check-in leva menos de 3 minutos e alimenta um modelo inteligente que
            analisa sua carga, dor, sono, estresse e contexto para gerar
            recomendações personalizadas focadas em sua recuperação e performance.
          </p>
        </motion.div>

        {/* Features */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-muted-foreground space-y-2 mb-8 text-center"
        >
          <li>• Monitoramento específico para sua posição de meio-campista box-to-box.</li>
          <li>• Análise de carga adaptada ao seu calendário.</li>
          <li>• Relatórios automáticos e personalizados para o seu caso.</li>
        </motion.ul>

        {/* Start Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => setShowCheckin(true)}
          className="w-full max-w-md flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all"
        >
          <Play className="w-5 h-5" />
          Iniciar Check-in
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xs text-muted-foreground/70 mt-4 text-center"
        >
          Preencha sempre antes de dormir ou até 1h após o treino/jogo para máxima precisão.
        </motion.p>
      </main>

      {/* Footer */}
      <footer className="w-full px-4 sm:px-8 py-4 border-t border-border/30">
        <div className="flex items-center justify-center gap-2">
          <img 
            src={oneAiLogo} 
            alt="One AI" 
            className="h-6 w-6 rounded object-cover"
          />
          <p className="text-xs text-muted-foreground/50">
            © 2025 One AI - Gêmeo Digital do Atleta. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
