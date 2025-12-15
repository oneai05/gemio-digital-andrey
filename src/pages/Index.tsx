import React, { useState } from "react";
import CheckinForm from "@/components/checkin/CheckinForm";
import HeroSection from "@/components/checkin/HeroSection";
import AIDashboard from "@/components/dashboard/AIDashboard";
import oneAiLogo from "@/assets/one-ai-logo.jpg";
import { useN8nData } from "@/hooks/useN8nData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Radio } from "lucide-react";

const Index: React.FC = () => {
  const [view, setView] = useState<"checkin" | "dashboard">("dashboard");
  const { data, isLoading, loadSampleData } = useN8nData();

  // Load sample data on mount for demo
  React.useEffect(() => {
    loadSampleData();
  }, [loadSampleData]);

  return (
    <div className="min-h-screen gradient-hero text-foreground flex flex-col">
      {/* Header */}
      <header className="w-full px-4 sm:px-8 pt-6 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {view === "dashboard" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setView("checkin")}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Check-in
            </Button>
          )}
          <div className="h-12 w-12 rounded-xl overflow-hidden shadow-lg animate-glow-pulse">
            <img
              src={oneAiLogo}
              alt="One AI Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-semibold font-display text-foreground">
              Gêmeo Digital do Atleta
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Monitoramento inteligente de carga, recuperação e risco de lesão.
            </p>
          </div>
        </div>

        {view === "checkin" && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setView("dashboard")}
            className="border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10"
          >
            <Radio className="h-4 w-4 mr-2" />
            Monitoramento Ativo
          </Button>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-8 pb-10 max-w-7xl mx-auto w-full">
        {view === "checkin" ? (
          <div className="flex flex-col lg:flex-row gap-8">
            <HeroSection />
            <section className="lg:w-7/12">
              <CheckinForm />
            </section>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Athlete Header in Dashboard */}
            <div className="flex items-center gap-4 mb-6">
              <HeroSection compact />
            </div>

            {/* AI Dashboard */}
            <AIDashboard data={data} isLoading={isLoading} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full px-4 sm:px-8 py-4 border-t border-border/30">
        <div className="flex items-center justify-center gap-2">
          <img
            src={oneAiLogo}
            alt="One AI"
            className="h-6 w-6 rounded object-cover"
          />
          <p className="text-xs text-muted-foreground/50">
            © 2024 One AI - Gêmeo Digital do Atleta. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
