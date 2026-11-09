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
        const body = await request.json();
        const userPrompt = body.prompt || '';
        const requestedModel = body.model || 'auto';

        const API_KEYS = {
          gemini: "AQ.Ab8RN6KvlKoyTNZkdyrI6uFBI3uGbWBFcDwjwiueJnNwbCcRMA",
          gpt: "તમારી_GPT_API_KEY_અહીં_મૂકો",
          deepseek: "તમારી_DEEPSEEK_API_KEY_અહીં_મૂકો",
          claude: "તમારી_CLAUDE_API_KEY_અહીં_મૂકો",
          grok: "તમારી_GROK_API_KEY_અહીં_મૂકો",
          llama: "તમારી_LLAMA_API_KEY_અહીં_મૂકો",
          mistral: "તમારી_MISTRAL_API_KEY_અહીં_મૂકો",
          qwen: "તમારી_QWEN_API_KEY_અહીં_મૂકો"
        };

        let selectedAI = 'Google Gemini 1.5 Flash';
        let aiReply = '';

        // Gemini API Call
        const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEYS.gemini}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userPrompt }] }]
          })
        });

        const geminiData = await geminiResponse.json();
        aiReply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || 'માસ્ટર બ્રેઈનને રિસ્પોન્સ મેળવવામાં મુશ્કેલી થઈ.';

        return new Response(JSON.stringify({
          success: true,
          orchestrator: 'Master Brain Ecosystem',
          model_used: selectedAI,
          user_prompt: userPrompt,
          agent_assigned: 'General Assistant',
          response: aiReply
        }), { headers: corsHeaders });

      } catch (error) {
        return new Response(JSON.stringify({
          success: false,
          error: error.message
        }), { status: 500, headers: corsHeaders });
      }
    }

    return new Response(JSON.stringify({ 
      message: 'PRO AI Master Brain v5.0 is running. Use /api/status or /api/chat' 
    }), { headers: corsHeaders });
  }
};
