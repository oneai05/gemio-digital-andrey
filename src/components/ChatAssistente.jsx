// components/ChatAssistente.jsx
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export const ChatAssistente = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [ultimaAnalise, setUltimaAnalise] = useState(null);
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const functionUrl = supabaseUrl
    ? `${supabaseUrl}/functions/v1/chat-assistente`
    : '';

  // Buscar última análise do Supabase
  useEffect(() => {
    const fetchUltimaAnalise = async () => {
      const { data } = await supabase
        .from('gemeo_digital_analises')
        .select('*')
        .eq('athlete_id', 'andrey_santos')
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (data?.[0]) {
        setUltimaAnalise(data[0]);
      }
    };

    fetchUltimaAnalise();

    // Realtime para novas análises
    const subscription = supabase
      .channel('analises-chat')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'gemeo_digital_analises',
        filter: 'athlete_id=eq.andrey_santos'
      }, (payload) => {
        setUltimaAnalise(payload.new);
      })
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Contexto baseado na última análise
      const contexto = ultimaAnalise ? `
CONTEXTO ATUAL DO ANDREY (última análise):
- Data: ${ultimaAnalise.created_at}
- Treino: ${ultimaAnalise.treino_explicacao}
- Recuperação: ${ultimaAnalise.recuperacao_explicacao}
- Nutrição: ${ultimaAnalise.nutricao_explicacao}
- Insights Genéticos: ${ultimaAnalise.insights_geneticos_explicacao}
- Monitoramento: ${ultimaAnalise.monitoramento_explicacao}
      ` : '';

      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${supabaseAnonKey}`,
          apikey: supabaseAnonKey,
        },
        body: JSON.stringify({
          message: input,
          contexto: contexto,
          conversaAnterior: messages.slice(-6) // Últimas 6 mensagens para contexto
        })
      });

      const data = await response.json();
      
      const aiMessage = { role: 'assistant', content: data.response };
      setMessages(prev => [...prev, aiMessage]);
      
    } catch (error) {
      console.error('Erro no chat:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-96 bg-gray-900 rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          🧬
        </div>
        <div>
          <h3 className="text-white font-semibold">Assistente IA</h3>
          <p className="text-gray-400 text-sm">Tire suas dúvidas sobre as análises</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-gray-500 text-center text-sm">
            Olá! Sou seu assistente do Gêmeo Digital. Posso responder perguntas sobre suas análises e recomendações. Como posso ajudar?
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg text-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 text-gray-200 border border-gray-700'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 text-gray-200 px-3 py-2 rounded-lg text-sm border border-gray-700">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Faça uma pergunta..."
            className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm border border-gray-600 focus:border-blue-500 focus:outline-none"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};
