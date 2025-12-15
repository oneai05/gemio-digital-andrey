import React from "react";
import athletePhoto from "@/assets/athlete-profile.png";
import { Clock } from "lucide-react";

interface HeroSectionProps {
  compact?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="h-12 w-12 rounded-xl overflow-hidden border-2 border-chelsea/50 shadow-lg">
              <img
                src={athletePhoto}
                alt="Andrey Santos"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-chelsea border-2 border-background flex items-center justify-center font-bold text-[10px] text-foreground">
              17
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold font-display text-foreground">
              Andrey Santos
            </h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Atualizado há 1 min</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="lg:w-5/12 space-y-6 flex flex-col justify-center">
      {/* Athlete Card */}
      <div className="relative">
        <div className="glass-card p-4 flex items-center gap-4 animate-fade-in">
          <div className="relative">
            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl overflow-hidden border-2 border-chelsea/50 shadow-lg">
              <img 
                src={athletePhoto} 
                alt="Andrey Santos" 
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-chelsea border-2 border-background flex items-center justify-center font-bold text-xs text-foreground">
              17
            </div>
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-1">Bem-vindo de volta,</p>
            <h3 className="text-lg sm:text-xl font-bold font-display text-foreground">
              Andrey Santos
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="text-xs px-2 py-0.5 rounded-full bg-chelsea/20 text-chelsea border border-chelsea/30">
                Meio-campista
              </span>
              <span className="text-xs text-muted-foreground">
                Chelsea FC
              </span>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-success/20 text-success">
                🇧🇷 Brasil
              </span>
            </div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 mt-3">
          <div className="glass-card p-2 text-center">
            <p className="text-lg font-bold text-chelsea">20</p>
            <p className="text-[10px] text-muted-foreground">Jogos</p>
          </div>
          <div className="glass-card p-2 text-center">
            <p className="text-lg font-bold text-chelsea">876</p>
            <p className="text-[10px] text-muted-foreground">Minutos</p>
          </div>
          <div className="glass-card p-2 text-center">
            <p className="text-lg font-bold text-chelsea">1</p>
            <p className="text-[10px] text-muted-foreground">Gol</p>
          </div>
        </div>
      </div>

      <div className="status-badge w-fit">
        <span className="pulse-dot" />
        Check-in diário conectado ao seu Gêmeo Digital
      </div>

      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display leading-tight text-foreground">
        Olá, Andrey!{" "}
        <span className="text-primary">Seu Gêmeo Digital está pronto.</span>
      </h2>

      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
        Este check-in leva menos de 3 minutos e alimenta um modelo inteligente que
        analisa sua carga, dor, sono, estresse e contexto para gerar
        recomendações personalizadas focadas em sua recuperação e performance.
      </p>

      <ul className="text-sm text-muted-foreground space-y-2">
        <li className="flex items-start gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-chelsea mt-2 shrink-0" />
          Monitoramento específico para sua posição de meio-campista box-to-box.
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
