import React from "react";
import athletePhoto from "@/assets/athlete-profile.png";

const HeroSection: React.FC = () => {
  return (
    <section className="lg:w-5/12 space-y-6 flex flex-col justify-center">
      {/* Athlete Card */}
      <div className="relative">
        <div className="glass-card p-4 flex items-center gap-4 animate-fade-in">
          <div className="relative">
            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl overflow-hidden border-2 border-chelsea/50 shadow-lg">
              <img 
                src={athletePhoto} 
                alt="Foto do Atleta" 
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-success border-2 border-background flex items-center justify-center">
              <span className="text-[10px]">✓</span>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-1">Bem-vindo de volta,</p>
            <h3 className="text-lg sm:text-xl font-bold font-display text-foreground">
              Wesley Fofana
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs px-2 py-0.5 rounded-full bg-chelsea/20 text-chelsea border border-chelsea/30">
                Zagueiro
              </span>
              <span className="text-xs text-muted-foreground">
                Chelsea FC
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="status-badge w-fit">
        <span className="pulse-dot" />
        Check-in diário conectado ao seu Gêmeo Digital
      </div>

      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display leading-tight text-foreground">
        Olá, Wesley!{" "}
        <span className="text-primary">Seu Gêmeo Digital está pronto.</span>
      </h2>

      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
        Este check-in leva menos de 3 minutos e alimenta um modelo inteligente que
        analisa sua carga, dor, sono, estresse e contexto para gerar
        recomendações personalizadas focadas em sua recuperação e prevenção de lesões.
      </p>

      <ul className="text-sm text-muted-foreground space-y-2">
        <li className="flex items-start gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-chelsea mt-2 shrink-0" />
          Monitoramento específico para sua posição de zagueiro.
        </li>
        <li className="flex items-start gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-chelsea mt-2 shrink-0" />
          Análise de carga adaptada ao calendário do Chelsea.
        </li>
        <li className="flex items-start gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-chelsea mt-2 shrink-0" />
          Relatórios automáticos para a comissão técnica.
        </li>
      </ul>

      <div className="hidden lg:block pt-4">
        <p className="text-xs text-muted-foreground/70">
          Preencha sempre antes de dormir ou até 1h após o treino/jogo para máxima precisão.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
