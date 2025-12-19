import React from "react";
import { motion } from "framer-motion";

interface TypeformTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

const TypeformTextarea: React.FC<TypeformTextareaProps> = ({
  value,
  onChange,
  placeholder = "Digite sua resposta...",
  rows = 4,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full text-lg bg-transparent border-2 border-muted-foreground/30 focus:border-primary rounded-xl outline-none p-4 text-foreground placeholder:text-muted-foreground/40 transition-colors resize-none"
      />
      <p className="text-xs text-muted-foreground/50 mt-2">
        Shift + Enter para nova linha
      </p>
    </motion.div>
  );
};

export default TypeformTextarea;
