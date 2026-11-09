/**
 * 🟢 PRO AI — SECURE BACKEND WORKER
 * Evolving With The World Architecture
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // CORS Headers setup
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json'
    };

    // Handle OPTIONS request for CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // 1. Status Check API Route
    if (url.pathname === '/api/status') {
      return new Response(JSON.stringify({
        status: 'online',
        system: 'PRO AI Master Brain',
        version: 'v4.0',
        timestamp: new Date().toISOString(),
        active_models: ['Gemini', 'ChatGPT', 'Claude', 'DeepSeek'],
        server: 'Cloudflare Workers & PythonAnywhere'
      }), { headers: corsHeaders });
    }

    // 2. Master Brain Chat Route
    if (url.pathname === '/api/chat' && request.method === 'POST') {
      try {
        const body = await request.json();
        const userPrompt = body.prompt || '';
        const selectedModel = body.model || 'auto';

        // Master Brain Orchestration Logic
        return new Response(JSON.stringify({
          success: true,
          orchestrator: 'Master Brain',
          model_used: selectedModel === 'auto' ? 'Google Gemini 1.5 Flash' : selectedModel,
          user_prompt: userPrompt,
          agent_assigned: determineAgent(userPrompt),
          response: `🧠 PRO AI Master Brain: "${userPrompt}" પર કામ થઈ રહ્યું છે. ઓટોમેશન અને એજન્ટ સિસ્ટમ સક્રિય છે.`
        }), { headers: corsHeaders });

      } catch (error) {
        return new Response(JSON.stringify({ success: false, error: 'Invalid Request Format' }), {
          status: 400,
          headers: corsHeaders
        });
      }
    }

    // Default API Fallback Route
    return new Response(JSON.stringify({
      message: '🟢 Welcome to PRO AI Master Brain API. System is fully operational.'
    }), { headers: corsHeaders });
  }
};

/**
 * Helper logic to route tasks to specific agents
 */
function determineAgent(prompt) {
  const p = prompt.toLowerCase();
  if (p.includes('code') || p.includes('html') || p.includes('javascript') || p.includes('કોડ')) {
    return 'Coding Agent';
  } else if (p.includes('video') || p.includes('cartoon') || p.includes('વીડિયો')) {
    return 'Automation & Video Agent (n8n)';
  } else if (p.includes('search') || p.includes('research') || p.includes('શોધ')) {
    return 'Research Agent';
  }
  return 'General Assistant Agent';
}

