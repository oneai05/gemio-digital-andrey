import React from "react";
import { motion } from "framer-motion";

interface TypeformSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  onAutoAdvance?: () => void;
}

const TypeformSelect: React.FC<TypeformSelectProps> = ({
  options,
  value,
  onChange,
  onAutoAdvance,
}) => {
  const handleSelect = (option: string) => {
    onChange(option);
    // Auto-advance after a short delay
    if (onAutoAdvance) {
      setTimeout(onAutoAdvance, 300);
    }
  };

  return (
    <div className="grid gap-3">
      {options.map((option, index) => (
        <motion.button
          key={option}
          type="button"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          onClick={() => handleSelect(option)}
          className={`group flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
            value === option
              ? "border-primary bg-primary/10 text-foreground"
              : "border-border/50 hover:border-primary/50 hover:bg-muted/30 text-foreground"
          }`}
        >
          <span
            className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-sm font-semibold transition-all ${
              value === option
                ? "bg-primary text-primary-foreground"
                : "bg-muted/50 text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
            }`}
          >
            {String.fromCharCode(65 + index)}
          </span>
          <span className="text-base sm:text-lg">{option}</span>
          {value === option && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </motion.span>
          )}
        </motion.button>
      ))}
    </div>
  );
};

export default TypeformSelect;
