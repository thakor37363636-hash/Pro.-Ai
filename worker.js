export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. જો કોઈ ચેટ માટે POST રિક્વેસ્ટ મોકલે તો Gemini API સાથે વાતચીત કરો
    if (request.method === 'POST') {
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
          throw new Error('Gemini API invalid JSON: ' + geminiText);
        }

        const aiReply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || 'માસ્ટર બ્રેઈનને રિસ્પોન્સ મેળવવામાં મુશ્કેલી થઈ.';

        return new Response(JSON.stringify({
          success: true,
          response: aiReply
        }), {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        });

      } catch (error) {
        return new Response(JSON.stringify({
          success: false,
          error: error.message
        }), {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        });
      }
    }

    // 2. બાકી બ્રાઉઝરમાં સીધું જ ખુલે તે માટે પૂરો HTML ઇન્ટરફેસ
    const htmlContent = `<!DOCTYPE html>
<html lang="gu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PRO AI — Master Brain v5.0</title>
    <style>
        body {
            background-color: #0b0f19;
            color: #ffffff;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            height: 100vh;
        }
        header {
            background: #111827;
            padding: 15px;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            border-bottom: 1px solid #1f2937;
        }
        #chat-container {
            flex: 1;
            overflow-y: auto;
            padding: 15px;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        .message {
            padding: 12px 16px;
            border-radius: 12px;
            max-width: 80%;
            line-height: 1.5;
            word-wrap: break-word;
        }
        .user-message {
            background: #1f2937;
            align-self: flex-end;
            border: 1px solid #374151;
        }
        .ai-message {
            background: #111827;
            align-self: flex-start;
            border: 1px solid #065f46;
        }
        #input-container {
            display: flex;
            padding: 10px;
            background: #111827;
            border-top: 1px solid #1f2937;
        }
        #user-input {
            flex: 1;
            padding: 12px;
            border-radius: 8px;
            border: 1px solid #374151;
            background: #1f2937;
            color: white;
            font-size: 16px;
            outline: none;
        }
        #send-btn {
            background: #10b981;
            color: white;
            border: none;
            padding: 0 20px;
            margin-left: 10px;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
        }
    </style>
</head>
<body>

    <header>🟢 PRO AI — MASTER BRAIN</header>

    <div id="chat-container">
        <div class="message ai-message">
            👋 નમસ્તે મિતુલ! હું **PRO AI** નું માસ્ટર બ્રેઈન છું. બોલો આજે કયા રિસર્ચ, કોડિંગ અથવા ઓટોમેશન ટાસ્ક માટે કયા એજન્ટને કામે લગાડવો છે?
        </div>
    </div>

    <div id="input-container">
        <input type="text" id="user-input" placeholder="માસ્ટર બ્રેઈનને કમાન્ડ આપો...">
        <button id="send-btn" onclick="sendMessage()">મોકલો</button>
    </div>

    <script>
        async function sendMessage() {
            const inputField = document.getElementById('user-input');
            const chatContainer = document.getElementById('chat-container');
            const prompt = inputField.value.trim();

            if (!prompt) return;

            const userMsgDiv = document.createElement('div');
            userMsgDiv.className = 'message user-message';
            userMsgDiv.textContent = prompt;
            chatContainer.appendChild(userMsgDiv);

            inputField.value = '';
            chatContainer.scrollTop = chatContainer.scrollHeight;

            const aiMsgDiv = document.createElement('div');
            aiMsgDiv.className = 'message ai-message';
            aiMsgDiv.textContent = '🧠 માસ્ટર બ્રેઈન પ્રોસેસ કરી રહ્યું છે...';
            chatContainer.appendChild(aiMsgDiv);
            chatContainer.scrollTop = chatContainer.scrollHeight;

            try {
                const response = await fetch('', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt: prompt })
                });

                const data = await response.json();

                if (data.success) {
                    aiMsgDiv.innerHTML = \`🧠 <b>Master Brain:</b><br>\` + data.response.replace(/\\n/g, '<br>');
                } else {
                    aiMsgDiv.textContent = '❌ ક્ષતિ: ' + (data.error || 'રિસ્પોન્સ મેળવવામાં નિષ્ફળતા.');
                }
            } catch (error) {
                aiMsgDiv.textContent = '❌ કનેક્શન એરર: ' + error.message;
            }

            chatContainer.scrollTop = chatContainer.scrollHeight;
        }

        document.getElementById('user-input').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    </script>
</body>
</html>`;

    return new Response(htmlContent, {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
      },
    });
  }
};

