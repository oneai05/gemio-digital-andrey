// components/ChatAssistente.jsx
import { useState, useEffect } from "react";
import oneAiLogo from "@/assets/one-ai-logo.jpg";
import { supabase } from "@/lib/supabase";

export const ChatAssistente = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [ultimaAnalise, setUltimaAnalise] = useState(null);
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const functionUrl = supabaseUrl
    ? `${supabaseUrl}/functions/v1/chat-assistente`
    : "";

  // Buscar ultima analise do Supabase
  useEffect(() => {
    const fetchUltimaAnalise = async () => {
      const { data } = await supabase
        .from("gemeo_digital_analises")
        .select("*")
        .eq("athlete_id", "andrey_santos")
        .order("created_at", { ascending: false })
        .limit(1);

      if (data?.[0]) {
        setUltimaAnalise(data[0]);
      }
    };

    fetchUltimaAnalise();

    // Realtime para novas analises
    const subscription = supabase
      .channel("analises-chat")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "gemeo_digital_analises",
          filter: "athlete_id=eq.andrey_santos",
        },
        (payload) => {
          setUltimaAnalise(payload.new);
        }
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Contexto baseado na ultima analise
      const contexto = ultimaAnalise
        ? `
CONTEXTO ATUAL DO ANDREY (ultima analise):
- Data: ${ultimaAnalise.created_at}
- Treino: ${ultimaAnalise.treino_explicacao}
- Recuperacao: ${ultimaAnalise.recuperacao_explicacao}
- Nutricao: ${ultimaAnalise.nutricao_explicacao}
- Insights Geneticos: ${ultimaAnalise.insights_geneticos_explicacao}
- Monitoramento: ${ultimaAnalise.monitoramento_explicacao}
      `
        : "";

      const response = await fetch(functionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${supabaseAnonKey}`,
          apikey: supabaseAnonKey,
        },
        body: JSON.stringify({
          message: input,
          contexto: contexto,
          conversaAnterior: messages.slice(-6),
        }),
      });

      const data = await response.json();

      const aiMessage = { role: "assistant", content: data.response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Erro no chat:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* Header */}
      <div className="px-4 py-3 bg-primary/10 border-b border-border flex items-center gap-2">
        <img
          src={oneAiLogo}
          alt="AI Assistant"
          className="h-8 w-8 rounded-lg object-cover"
        />
        <div>
          <h3 className="font-semibold text-sm">Assistente IA</h3>
          <p className="text-xs text-muted-foreground">Tire suas duvidas</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-muted-foreground text-sm">
            Ola! Sou seu assistente do Gemeo Digital. Posso responder perguntas
            sobre suas analises e recomendacoes. Como posso ajudar?
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-muted text-foreground px-4 py-2 rounded-2xl text-sm">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Faca uma pergunta..."
            className="flex-1 px-4 py-2 bg-muted rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
            aria-label="Enviar"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};
