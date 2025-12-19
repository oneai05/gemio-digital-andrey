import React from "react";
import { motion } from "framer-motion";

interface TypeformYesNoProps {
  value: "sim" | "nao" | "";
  onChange: (value: "sim" | "nao") => void;
  onAutoAdvance?: () => void;
  yesLabel?: string;
  noLabel?: string;
  yesVariant?: "default" | "danger";
}

const TypeformYesNo: React.FC<TypeformYesNoProps> = ({
  value,
  onChange,
  onAutoAdvance,
  yesLabel = "Sim",
  noLabel = "Não",
  yesVariant = "default",
}) => {
  const handleSelect = (val: "sim" | "nao") => {
    onChange(val);
    if (onAutoAdvance && val === "nao") {
      setTimeout(onAutoAdvance, 300);
    }
  };

  return (
    <div className="flex gap-4">
      <motion.button
        type="button"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => handleSelect("sim")}
        className={`flex-1 flex items-center justify-center gap-3 p-6 rounded-xl border-2 text-lg font-semibold transition-all ${
          value === "sim"
            ? yesVariant === "danger"
              ? "border-destructive bg-destructive/10 text-destructive"
              : "border-primary bg-primary/10 text-primary"
            : "border-border/50 hover:border-primary/50 hover:bg-muted/30 text-foreground"
        }`}
      >
        <span
          className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
            value === "sim"
              ? yesVariant === "danger"
                ? "bg-destructive text-destructive-foreground"
                : "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          Y
        </span>
        {yesLabel}
        {value === "sim" && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
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
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </motion.span>
        )}
      </motion.button>

      <motion.button
        type="button"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => handleSelect("nao")}
        className={`flex-1 flex items-center justify-center gap-3 p-6 rounded-xl border-2 text-lg font-semibold transition-all ${
          value === "nao"
            ? "border-success bg-success/10 text-success"
            : "border-border/50 hover:border-success/50 hover:bg-muted/30 text-foreground"
        }`}
      >
        <span
          className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
            value === "nao"
              ? "bg-success text-success-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          N
        </span>
        {noLabel}
        {value === "nao" && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
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
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </motion.span>
        )}
      </motion.button>
    </div>
  );
};

export default TypeformYesNo;
