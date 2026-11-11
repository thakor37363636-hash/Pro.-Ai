if (request.method === 'POST') {
    try {
        const body = await request.json();
        const userPrompt = body.prompt || 'Hello';
        const apiKey = env.GEMINI_API_KEY || "AQ..YOUR_KEY.."; // અથવા એન્વાયર્નમેન્ટ વેરીએબલ

        const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: userPrompt }] }]
            })
        });

        // ચેક કરો કે રિસ્પોન્સ JSON છે કે નહીં
        const responseText = await geminiResponse.text();
        let geminiData;
        try {
            geminiData = JSON.parse(responseText);
        } catch (e) {
            throw new Error("API سے અયોગ્ય રિસ્પોન્સ મળ્યો: " + responseText);
        }

        if (!geminiResponse.ok) {
            throw new Error(geminiData.error?.message || "Gemini API એરર આવી છે.");
        }

        const aiReply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || 'કોઈ જવાબ મળ્યો નથી';

        return new Response(JSON.stringify({
            success: true,
            response: aiReply
        }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            error: error.message
        }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
}
