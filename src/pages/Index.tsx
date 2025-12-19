import React from "react";
import CheckinForm from "@/components/checkin/CheckinForm";
import HeroSection from "@/components/checkin/HeroSection";
import oneAiLogo from "@/assets/one-ai-logo.jpg";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen gradient-hero text-foreground flex flex-col">
      {/* Header */}
      <header className="w-full px-4 sm:px-8 pt-6 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
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
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-8 pb-10 flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto w-full">
        <HeroSection />

        <section className="lg:w-7/12">
          <CheckinForm />
        </section>
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
