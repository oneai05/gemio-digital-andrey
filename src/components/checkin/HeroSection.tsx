import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="lg:w-5/12 space-y-6 flex flex-col justify-center">
      <div className="status-badge w-fit">
        <span className="pulse-dot" />
        Check-in diário conectado ao seu Gêmeo Digital
      </div>

      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display leading-tight text-foreground">
        Dê ao seu corpo uma voz.{" "}
        <span className="text-primary">O Gêmeo Digital faz o resto.</span>
      </h2>

      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
        Este check-in leva menos de 3 minutos e alimenta um modelo inteligente que
        analisa carga, dor, sono, estresse, genética e contexto para gerar
        recomendações personalizadas de treino, recuperação e prevenção de lesões.
      </p>

      <ul className="text-sm text-muted-foreground space-y-2">
        <li className="flex items-start gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
          Detecção precoce de risco de lesão e overuse.
        </li>
        <li className="flex items-start gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
          Ajustes finos de carga e recuperação em tempo real.
        </li>
        <li className="flex items-start gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
          Integração com n8n e relatórios automáticos para comissão técnica.
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
