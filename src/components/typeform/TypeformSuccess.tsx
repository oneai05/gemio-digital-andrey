import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface TypeformSuccessProps {
  onReset: () => void;
}

const TypeformSuccess: React.FC<TypeformSuccessProps> = ({ onReset }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-[100dvh] flex flex-col justify-center items-center px-6 py-12"
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mb-8"
      >
        <div className="w-24 h-24 rounded-full bg-success/20 flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-success" />
        </div>
      </motion.div>

      {/* Success Message */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center max-w-md"
      >
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-foreground mb-4">
          Check-in enviado!
        </h1>
        <p className="text-lg text-primary font-semibold mb-4">
          Obrigado, Andrey!
        </p>
        <p className="text-sm sm:text-base text-muted-foreground mb-8 leading-relaxed">
          Seus dados foram processados pelo Gêmeo Digital. A comissão técnica
          receberá as análises e recomendações em breve.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex gap-6 mb-8"
      >
        <div className="text-center">
          <p className="text-2xl font-bold text-chelsea">✓</p>
          <p className="text-xs text-muted-foreground">Dados coletados</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-chelsea">🧠</p>
          <p className="text-xs text-muted-foreground">IA processando</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-chelsea">📊</p>
          <p className="text-xs text-muted-foreground">Relatório gerado</p>
        </div>
      </motion.div>

      {/* Reset Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={onReset}
        className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
      >
        Fazer novo check-in
      </motion.button>
    </motion.div>
  );
};

export default TypeformSuccess;
