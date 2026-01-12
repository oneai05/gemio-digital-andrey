import "jsr:@supabase/functions-js/edge-runtime.d.ts";

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

    const claudeApiKey = Deno.env.get("CLAUDE_API_KEY");
    if (!claudeApiKey) {
      return new Response(
        JSON.stringify({ error: "CLAUDE_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": claudeApiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 500,
        messages: mensagens,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: data?.error?.message || "Erro na API Claude" }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiResponse = data?.content?.[0]?.text ?? "";
    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Erro interno do servidor",
        response: "Desculpe, tive um problema tecnico. Tente novamente em alguns segundos.",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
