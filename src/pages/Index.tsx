import React, { useState } from "react";
import TypeformCheckin from "@/components/typeform/TypeformCheckin";
import Home from "@/components/Home";

const Index: React.FC = () => {
  const [showCheckin, setShowCheckin] = useState(false);

  if (showCheckin) {
    return <TypeformCheckin onBack={() => setShowCheckin(false)} />;
  }

  return <Home onStartCheckin={() => setShowCheckin(true)} />;
};

export default Index;
