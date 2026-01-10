import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowLeft, Brain, BarChart3 } from "lucide-react";
import athletePhoto from "@/assets/athlete-profile.png";
import oneAiLogo from "@/assets/one-ai-logo.jpg";

interface TypeformIntroProps {
  onStart: () => void;
  onBack?: () => void;
  onNavigateToResultado?: () => void;
}

const TypeformIntro: React.FC<TypeformIntroProps> = ({ onStart, onBack, onNavigateToResultado }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[100dvh] flex flex-col justify-center items-center px-6 py-12 relative"
    >
      {/* Floating Menu */}
      <div 
        className="absolute top-6 left-6 z-50"
        onMouseEnter={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          {/* Menu Icon */}
          <motion.button
            className="w-12 h-12 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 flex items-center justify-center hover:bg-primary/20 transition-all shadow-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img 
              src={oneAiLogo} 
              alt="One AI Menu" 
              className="w-full h-full object-cover"
            />
          </motion.button>

          {/* Expanded Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-14 left-0 w-64 bg-card/95 backdrop-blur-md border border-border rounded-xl shadow-2xl overflow-hidden"
              >
                {/* Resultado do Gêmeo Digital */}
                <button
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-primary/10 transition-colors text-left group"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onNavigateToResultado?.();
                  }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Brain className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-foreground">Resultado do Gêmeo Digital</p>
                    <p className="text-xs text-muted-foreground">Veja análises e recomendações</p>
                  </div>
                </button>

                {/* Divider */}
                <div className="h-px bg-border" />

                {/* Dashboard de Medidas */}
                <button
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-primary/10 transition-colors text-left group"
                  onClick={() => {
                    // TODO: Adicionar navegação para dashboard
                    console.log("Navegar para Dashboard de Medidas");
                  }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-foreground">Dashboard de Medidas</p>
                    <p className="text-xs text-muted-foreground">Medidas antropométricas</p>
                  </div>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Back Button */}
      {onBack && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={onBack}
          className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Voltar</span>
        </motion.button>
      )}
      {/* Athlete Photo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative mb-8"
      >
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-chelsea shadow-2xl">
          <img
            src={athletePhoto}
            alt="Andrey Santos"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-chelsea border-3 border-background flex items-center justify-center font-bold text-sm text-foreground">
          17
        </div>
      </motion.div>

      {/* Welcome Text */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center max-w-md"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground mb-4">
          Olá, Andrey!
        </h1>
        <p className="text-lg sm:text-xl text-primary font-semibold mb-6">
          Seu Gêmeo Digital está pronto para check-in.
        </p>
        <p className="text-sm sm:text-base text-muted-foreground mb-8 leading-relaxed">
          Este check-in leva menos de 3 minutos e alimenta um modelo inteligente
          que analisa sua carga, dor, sono, estresse e contexto para gerar
          recomendações personalizadas.
        </p>
      </motion.div>

      {/* Start Button */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={onStart}
        className="group flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all"
      >
        <Play className="w-5 h-5" />
        Iniciar Check-in
      </motion.button>

      {/* Time estimate */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-xs text-muted-foreground/50 mt-6"
      >
        ⏱️ Tempo estimado: 2-3 minutos
      </motion.p>

      {/* Keyboard hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-xs text-muted-foreground/40 mt-4"
      >
        Pressione{" "}
        <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">
          Enter ↵
        </kbd>{" "}
        para começar
      </motion.p>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="absolute bottom-0 left-0 right-0 w-full px-4 sm:px-8 py-4"
      >
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
      </motion.footer>
    </motion.div>
  );
};

export default TypeformIntro;
