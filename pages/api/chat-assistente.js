// pages/api/chat-assistente.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, contexto, conversaAnterior } = req.body;

    // Contexto base sobre o Andrey
    const contextoBase = `
VOCÊ É O ASSISTENTE ESPECIALIZADO DO GÊMEO DIGITAL DO ANDREY SANTOS.

PERFIL GENÉTICO DO ANDREY:
• COL5A1 CC = Tendões 80% mais sensíveis a cargas elevadas
• TNF-A GG + CRP GG = Resposta inflamatória 3x mais intensa
• MMP3 desfavorável = Recuperação tecidual 48h+ necessária
• CYP1A2 lento = Metabolismo de estimulantes 8-12h
• CLOCK T/T = Cronotipo diurno, performance ótima manhã/tarde
• ACE DD + ACTN3 RR = Potencial força/potência quando recuperado

DIRETRIZES:
- Use linguagem técnico-humanizada (acessível mas precisa)
- Sempre correlacione respostas com o genótipo específico do Andrey
- Explique o "porquê" científico de forma natural
- Para nutrição: use categorias funcionais, nunca produtos específicos
- Seja conversacional mas profissional
- Responda em português brasileiro
- Mantenha respostas concisas (máximo 4-5 frases)

${contexto ? `ANÁLISE MAIS RECENTE DO ANDREY:\n${contexto}` : ""}
    `;

    // Construir histórico da conversa
    const mensagens = [
      { role: "system", content: contextoBase },
      ...(conversaAnterior || []),
      { role: "user", content: message },
    ];

    // Chamar API Claude
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.CLAUDE_API_KEY,
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
      throw new Error(data.error?.message || "Erro na API Claude");
    }

    const aiResponse = data.content[0].text;

    res.status(200).json({ response: aiResponse });
  } catch (error) {
    console.error("Erro no chat assistente:", error);
    res.status(500).json({
      error: "Erro interno do servidor",
      response:
        "Desculpe, tive um problema técnico. Tente novamente em alguns segundos.",
    });
  }
}
