export function buildReceptionistPrompt(businessInfo) {
  return `You are an AI receptionist for ${businessInfo.name}.
Business Hours: ${businessInfo.hours || 'Mon-Fri 9am-5pm'}
Services: ${businessInfo.services || 'General services'}
Greeting: ${businessInfo.greeting || 'Thank you for calling!'}
FAQs: ${businessInfo.faqs || 'No FAQs provided.'}
Be professional, friendly, and helpful. Keep responses concise.`;
}

export function mockReceptionistReply(message) {
  const lower = message.toLowerCase();
  if (lower.includes('hour') || lower.includes('open')) return "We're open Monday through Friday, 9am to 5pm. Is there anything else I can help you with?";
  if (lower.includes('price') || lower.includes('cost')) return "I'd be happy to provide pricing information. Could you tell me more about what services you're interested in?";
  if (lower.includes('appointment') || lower.includes('book')) return "I can help you schedule an appointment! What date and time works best for you?";
  if (lower.includes('location') || lower.includes('address')) return "I can provide our location details. Would you like me to send that information to you?";
  return "Thank you for reaching out! How can I assist you today?";
}
