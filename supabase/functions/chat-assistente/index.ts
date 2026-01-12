/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { message, contexto, conversaAnterior } = await req.json();

    const contextoBase = `
VOCE E O ASSISTENTE ESPECIALIZADO DO GEMEO DIGITAL DO ANDREY SANTOS.

PERFIL GENETICO DO ANDREY:
• COL5A1 CC = Tendoes 80% mais sensiveis a cargas elevadas
• TNF-A GG + CRP GG = Resposta inflamatoria 3x mais intensa
• MMP3 desfavoravel = Recuperacao tecidual 48h+ necessaria
• CYP1A2 lento = Metabolismo de estimulantes 8-12h
• CLOCK T/T = Cronotipo diurno, performance otima manha/tarde
• ACE DD + ACTN3 RR = Potencial forca/potencia quando recuperado

DIRETRIZES:
- Use linguagem tecnico-humanizada (acessivel mas precisa)
- Sempre correlacione respostas com o genotipo especifico do Andrey
- Explique o "porque" cientifico de forma natural
- Para nutricao: use categorias funcionais, nunca produtos especificos
- Seja conversacional mas profissional
- Responda em portugues brasileiro
- Mantenha respostas concisas (maximo 4-5 frases)

${contexto ? `ANALISE MAIS RECENTE DO ANDREY:\n${contexto}` : ""}
    `;

    const mensagens = [
      { role: "system", content: contextoBase },
      ...(Array.isArray(conversaAnterior) ? conversaAnterior : []),
      { role: "user", content: message },
    ];

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "LOVABLE_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        max_tokens: 500,
        messages: mensagens,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Tente novamente em alguns segundos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos insuficientes. Adicione créditos no workspace Lovable." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Erro na API de IA" }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const aiResponse = data?.choices?.[0]?.message?.content ?? "";
    
    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({
        error: "Erro interno do servidor",
        response: "Desculpe, tive um problema tecnico. Tente novamente em alguns segundos.",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
