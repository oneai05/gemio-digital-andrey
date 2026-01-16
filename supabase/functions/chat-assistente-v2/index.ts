import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const N8N_WEBHOOK_URL = "https://oneai.app.n8n.cloud/webhook/fc725edb-26c9-4c5a-a072-0a75c3d9bc2d";

serve(async (req) => {
  console.log("Edge function invoked, method:", req.method);
  
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { message, athlete_id, timestamp } = body;
    
    console.log("Received request body:", JSON.stringify(body));

    const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, athlete_id, timestamp }),
    });

    console.log("n8n response status:", n8nResponse.status);

    // Tenta obter resposta como texto primeiro
    const responseText = await n8nResponse.text();
    console.log("n8n raw response:", responseText.substring(0, 500));

    if (!n8nResponse.ok) {
      console.error("n8n error response:", responseText);
      return new Response(
        JSON.stringify({ error: "Erro ao conectar com o assistente n8n", details: responseText }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Tenta parsear como JSON, se falhar retorna como texto
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      // Se não for JSON, retorna como resposta de texto
      responseData = { response: responseText };
    }

    console.log("Returning response:", JSON.stringify(responseData).substring(0, 200));

    return new Response(
      JSON.stringify(responseData),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: unknown) {
    console.error("Edge function error:", err);
    const errorMessage = err instanceof Error ? err.message : "Erro interno";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
