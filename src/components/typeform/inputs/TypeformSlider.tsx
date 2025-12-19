import React from "react";
import { motion } from "framer-motion";

interface TypeformSliderProps {
  value: number;
  onChange: (value: number) => void;
  onAutoAdvance?: () => void;
  min?: number;
  max?: number;
  step?: number;
  minLabel?: string;
  maxLabel?: string;
}

const TypeformSlider: React.FC<TypeformSliderProps> = ({
  value,
  onChange,
  onAutoAdvance,
  min = 0,
  max = 10,
  step = 1,
  minLabel,
  maxLabel,
}) => {
  const handleSelect = (num: number) => {
    onChange(num);
    if (onAutoAdvance) {
      setTimeout(onAutoAdvance, 300);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Value Display */}
      <div className="flex justify-center">
        <motion.div
          key={value}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 rounded-2xl bg-primary/10 border-2 border-primary flex items-center justify-center"
        >
          <span className="text-4xl font-bold text-primary">{value}</span>
        </motion.div>
      </div>

      {/* Labels */}
      <div className="flex justify-between text-sm text-muted-foreground px-2">
        <span>{minLabel || min}</span>
        <span>{maxLabel || max}</span>
      </div>

      {/* Quick Select Buttons */}
      <div className="flex justify-center gap-2 flex-wrap">
        {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => handleSelect(num)}
            className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all ${
              value === num
                ? "bg-primary text-primary-foreground scale-110"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default TypeformSlider;
