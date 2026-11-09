export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method === 'POST') {
      try {
        const body = await request.json();
        const userPrompt = body.prompt || 'Hello';
        const apiKey = "AQ.Ab8RN6KvlKoyTNZkdyrI6uFBI3uGbWBFcDwjwiueJnNwbCcRMA";

        const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userPrompt }] }]
          })
        });

        const geminiData = await geminiResponse.json();
        const aiReply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || 'માસ્ટર બ્રેઈનને રિસ્પોન્સ મેળવવામાં મુશ્કેલી થઈ.';

        return new Response(JSON.stringify({
          success: true,
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
      status: 'online',
      message: 'PRO AI Master Brain v5.0 API is running'
    }), { headers: corsHeaders });
  }
};
