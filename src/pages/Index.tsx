import React, { useState } from "react";
import TypeformCheckin from "@/components/typeform/TypeformCheckin";
import Home from "@/components/Home";

const Index: React.FC = () => {
  const [showHome, setShowHome] = useState(false);

  if (showHome) {
    return <Home onStartCheckin={() => setShowHome(false)} />;
  }

  return <TypeformCheckin onBack={() => setShowHome(true)} />;
};

export default Index;
