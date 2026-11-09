/**
 * 🟢 PRO AI — SECURE BACKEND WORKER (LIVE GEMINI AI)
 * Evolving With The World Architecture
 */

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
        version: 'v4.0 Live',
        timestamp: new Date().toISOString(),
        active_models: ['Google Gemini Pro/Flash', 'ChatGPT', 'Claude'],
        server: 'Cloudflare Workers'
      }), { headers: corsHeaders });
    }

    // 2. Master Brain Live Chat Route with Gemini API
    if (url.pathname === '/api/chat' && request.method === 'POST') {
      try {
        const body = await request.json();
        const userPrompt = body.prompt || '';

        // 👇 અહીં તમારી બનાવેલી Google Gemini API Key મૂકવાની છે (અવતરણ ચિહ્નો "" ની અંદર)
        const GEMINI_API_KEY = "AQ.Ab8RN6KvlkoyTNZkdyrI6uF8I3uGbWBFcDwjwiueJnNWbCcRWA";

        // Call Google Gemini API
        const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userPrompt }] }]
          })
        });

        const geminiData = await geminiResponse.json();
        const aiReply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "માસ્ટર બ્રેઈનને જવાબ મેળવવામાં મર્યાદા નડી.";

        return new Response(JSON.stringify({
          success: true,
          orchestrator: 'Master Brain (Live Gemini)',
          model_used: 'Google Gemini 1.5 Flash',
          user_prompt: userPrompt,
          agent_assigned: determineAgent(userPrompt),
          response: aiReply
        }), { headers: corsHeaders });

      } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
          status: 400,
          headers: corsHeaders
        });
      }
    }

    return new Response(JSON.stringify({
      message: '🟢 PRO AI Master Brain API is live with Gemini.'
    }), { headers: corsHeaders });
  }
};

function determineAgent(prompt) {
  const p = prompt.toLowerCase();
  if (p.includes('code') || p.includes('html') || p.includes('કોડ')) return 'Coding Agent';
  if (p.includes('video') || p.includes('cartoon') || p.includes('વીડિયો')) return 'Automation Agent';
  return 'Research & Assistant Agent';
}
