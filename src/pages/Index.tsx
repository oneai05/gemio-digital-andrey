import React from "react";
import CheckinForm from "@/components/checkin/CheckinForm";
import HeroSection from "@/components/checkin/HeroSection";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen gradient-hero text-foreground flex flex-col">
      {/* Header */}
      <header className="w-full px-4 sm:px-8 pt-6 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg animate-glow-pulse">
            <span className="font-bold text-lg text-primary-foreground font-display">GD</span>
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
        <p className="text-xs text-muted-foreground/50 text-center">
          © 2024 Gêmeo Digital do Atleta. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};

export default Index;
