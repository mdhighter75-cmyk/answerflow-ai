import { NextResponse } from 'next/server';
import { buildReceptionistPrompt } from '../../../../lib/receptionistPrompt';

export async function POST(req) {
  const formData = await req.formData();
  const userSpeech = formData.get('SpeechResult') || '';

  const apiKey = process.env.OPENAI_API_KEY;
  
  let aiReply = "Thank you for calling. How can I assist you today?";

  if (apiKey && userSpeech) {
    const systemPrompt = buildReceptionistPrompt({ name: 'our business' });
    
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userSpeech }
        ],
        max_tokens: 150,
      }),
    });

    const data = await openaiRes.json();
    aiReply = data.choices?.[0]?.message?.content || aiReply;
  }

  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather input="speech" action="/api/twilio/voice" method="POST" speechTimeout="auto">
    <Say>${aiReply}</Say>
  </Gather>
</Response>`;

  return new NextResponse(twiml, {
    headers: { 'Content-Type': 'text/xml' },
  });
}
