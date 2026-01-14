// components/ChatAssistente.jsx
import { useState } from "react";
import oneAiLogo from "@/assets/one-ai-logo.jpg";

export const ChatAssistente = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const webhookUrl =
    import.meta.env.VITE_CHAT_WEBHOOK_URL ||
    "https://oneai.app.n8n.cloud/webhook/fc725edb-26c9-4c5a-a072-0a75c3d9bc2d";

  const sendMessage = async () => {
    if (!input.trim()) return;
    if (!webhookUrl) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Servico de chat indisponivel no momento." },
      ]);
      return;
    }

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          conversaAnterior: messages.slice(-6),
        }),
      });

      console.log("Response status:", response.status);

      const data = await response.json();
      const content =
        data.response ??
        data.error ??
        (response.ok ? "Sem resposta do assistente." : "Erro ao responder.");

      const aiMessage = { role: "assistant", content };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Erro no chat:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Erro ao responder. Tente novamente." },
      ]);
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
