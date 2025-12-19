import React from "react";
import { motion } from "framer-motion";

interface TypeformMultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

const TypeformMultiSelect: React.FC<TypeformMultiSelectProps> = ({
  options,
  selected,
  onChange,
}) => {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Selecione todos que se aplicam
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        {options.map((option, index) => (
          <motion.button
            key={option}
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
            onClick={() => toggleOption(option)}
            className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
              selected.includes(option)
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border/50 hover:border-primary/50 hover:bg-muted/30 text-foreground"
            }`}
          >
            <span
              className={`flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center transition-all ${
                selected.includes(option)
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50 border border-border"
              }`}
            >
              {selected.includes(option) && (
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </motion.svg>
              )}
            </span>
            <span className="text-sm sm:text-base">{option}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default TypeformMultiSelect;
