export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // 1. Status Check Route
    if (url.pathname === '/api/status') {
      return new Response(JSON.stringify({
        status: 'online',
        system: 'PRO AI Master Brain',
        version: 'v5.0 Multi-Agent',
        timestamp: new Date().toISOString(),
        active_models: [
          '1. Google Gemini',
          '2. OpenAI GPT',
          '3. DeepSeek',
          '4. Claude',
          '5. Grok',
          '6. Meta Llama',
          '7. Mistral AI',
          '8. Qwen'
        ],
        server: 'Cloudflare Workers'
      }), { headers: corsHeaders });
    }

    // 2. Master Brain Multi-Model Chat Route
    if (url.pathname === '/api/chat' && request.method === 'POST') {
      try {
        let body;
        try {
          body = await request.json();
        } catch (e) {
          body = { prompt: 'Hello' };
        }

        const userPrompt = body.prompt || 'Hello';
        const apiKey = "AQ.Ab8RN6KvlKoyTNZkdyrI6uFBI3uGbWBFcDwjwiueJnNwbCcRMA";

        const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userPrompt }] }]
          })
        });

        const geminiText = await geminiResponse.text();
        let geminiData;
        try {
          geminiData = JSON.parse(geminiText);
        } catch (e) {
          throw new Error('Gemini API invalid JSON response: ' + geminiText);
        }

        const aiReply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || 'માસ્ટર બ્રેઈનને રિસ્પોન્સ મેળવવામાં મુશ્કેલી થઈ.';

        return new Response(JSON.stringify({
          success: true,
          orchestrator: 'Master Brain Ecosystem',
          model_used: 'Google Gemini 1.5 Flash',
          response: aiReply
        }), { headers: corsHeaders });

      } catch (error) {
        return new Response(JSON.stringify({
          success: false,
          error: error.message
        }), { headers: corsHeaders });
      }
    }

    return new Response(JSON.stringify({ 
      success: true,
      message: 'PRO AI Master Brain v5.0 is running.' 
    }), { headers: corsHeaders });
  }
};
