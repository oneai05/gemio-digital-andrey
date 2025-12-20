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
      {/* Quick Select Buttons */}
      <div className="flex justify-center gap-2 flex-wrap">
        {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((num) => (
          <div key={num} className="flex flex-col items-center">
            <button
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
            {/* Labels below numbers */}
            {num === min && minLabel && (
              <span className="text-xs text-muted-foreground mt-2">{minLabel}</span>
            )}
            {num === max && maxLabel && (
              <span className="text-xs text-muted-foreground mt-2">{maxLabel}</span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TypeformSlider;
