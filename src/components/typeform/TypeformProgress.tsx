import React from "react";
import { motion } from "framer-motion";

interface TypeformProgressProps {
  current: number;
  total: number;
}

const TypeformProgress: React.FC<TypeformProgressProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-1 bg-muted/30">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default TypeformProgress;
