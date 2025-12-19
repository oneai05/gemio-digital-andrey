import React from "react";
import { motion } from "framer-motion";

interface TypeformNumberProps {
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

const TypeformNumber: React.FC<TypeformNumberProps> = ({
  value,
  onChange,
  placeholder = "Digite aqui...",
  min,
  max,
  step = 1,
  unit,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-4"
    >
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        className="w-full text-2xl sm:text-3xl font-semibold bg-transparent border-b-2 border-muted-foreground/30 focus:border-primary outline-none py-3 text-foreground placeholder:text-muted-foreground/40 transition-colors"
      />
      {unit && (
        <span className="text-xl text-muted-foreground">{unit}</span>
      )}
    </motion.div>
  );
};

export default TypeformNumber;
