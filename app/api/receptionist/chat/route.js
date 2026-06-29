import { buildReceptionistPrompt, mockReceptionistReply } from '../../../lib/receptionistPrompt';

export async function POST(req) {
  try {
    const { message, businessInfo } = await req.json();
    if (!message) return Response.json({ error: 'Message required' }, { status: 400 });

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return Response.json({ reply: mockReceptionistReply(message) });
    }

    const systemPrompt = buildReceptionistPrompt(businessInfo || { name: 'our business' });
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: 'gpt-3.5-turbo', messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: message }], max_tokens: 300 }),
    });

    const data = await openaiRes.json();
    const reply = data.choices?.[0]?.message?.content || mockReceptionistReply(message);
    return Response.json({ reply });
  } catch {
    return Response.json({ reply: 'Thank you for reaching out. How can I help you today?' });
  }
}
