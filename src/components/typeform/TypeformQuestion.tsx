import React from "react";
import { motion } from "framer-motion";

interface TypeformQuestionProps {
  questionNumber: number;
  totalQuestions: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
  canProceed?: boolean;
  isSubmitting?: boolean;
}

const TypeformQuestion: React.FC<TypeformQuestionProps> = ({
  questionNumber,
  totalQuestions,
  title,
  subtitle,
  children,
  onNext,
  onPrevious,
  isFirst,
  isLast,
  canProceed = true,
  isSubmitting = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-[100dvh] flex flex-col justify-center px-6 py-12 max-w-2xl mx-auto"
    >
      {/* Question Number */}
      <div className="mb-6">
        <span className="text-sm text-muted-foreground">
          {questionNumber} → {totalQuestions}
        </span>
      </div>

      {/* Question Title */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-foreground mb-3 leading-tight">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-base sm:text-lg text-muted-foreground mb-8">
          {subtitle}
        </p>
      )}

      {/* Answer Content */}
      <div className="flex-1 flex flex-col justify-start mt-4">
        {children}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-12 pt-6 border-t border-border/30">
        <button
          type="button"
          onClick={onPrevious}
          disabled={isFirst}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
            isFirst
              ? "text-muted-foreground/40 cursor-not-allowed"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Voltar
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed || isSubmitting}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl transition-all ${
            canProceed && !isSubmitting
              ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl hover:scale-[1.02]"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {isSubmitting ? (
            <>
              <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Enviando...
            </>
          ) : isLast ? (
            <>
              Enviar Check-in
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </>
          ) : (
            <>
              OK
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      </div>

      {/* Keyboard Hint */}
      <p className="text-xs text-muted-foreground/50 text-center mt-4">
        Pressione <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">Enter ↵</kbd> para continuar
      </p>
    </motion.div>
  );
};

export default TypeformQuestion;
