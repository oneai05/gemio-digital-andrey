import React, { useState } from "react";
import TypeformCheckin from "@/components/typeform/TypeformCheckin";
import ResultadoGemeo from "@/components/ResultadoGemeo";

type PageView = "checkin" | "resultado";

const Index: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>("checkin");

  if (currentPage === "resultado") {
    return <ResultadoGemeo onBack={() => setCurrentPage("checkin")} />;
  }

  return <TypeformCheckin onNavigateToResultado={() => setCurrentPage("resultado")} />;
};

export default Index;
