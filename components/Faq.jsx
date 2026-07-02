'use client';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  { q: 'How does the AI answer calls?', a: 'AnswerFlow connects to your business number. When a customer calls, the AI answers instantly and handles the conversation using your business info — hours, services, pricing and FAQs.' },
  { q: 'Can I use my existing phone number?', a: 'Yes. We can forward your existing number to AnswerFlow, or you can get a new dedicated number through the platform.' },
  { q: 'Can it book appointments?', a: 'Absolutely. The AI checks availability and books appointments directly, sending confirmations to both you and the customer.' },
  { q: 'Can I customize what it says?', a: 'You set the greeting, services list, FAQs and tone. Your AI sounds exactly the way your brand should.' },
  { q: 'How secure is my data?', a: 'All data is encrypted at rest and in transit. We use industry-standard security and never sell your data.' },
];

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} data-testid={`faq-item-${i}`} style={{ borderBottom: '1px solid var(--border-color)' }}>
            <button onClick={() => setOpen(isOpen ? -1 : i)} data-testid={`faq-toggle-${i}`}
              style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', padding: '24px 0' }}>
              <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '19px', fontWeight: 500, color: 'var(--text-primary)' }}>{item.q}</span>
              {isOpen ? <Minus size={20} strokeWidth={1.75} color="var(--accent-primary)" style={{ flexShrink: 0 }} /> : <Plus size={20} strokeWidth={1.75} color="var(--text-secondary)" style={{ flexShrink: 0 }} />}
            </button>
            <div style={{ maxHeight: isOpen ? '200px' : '0', overflow: 'hidden', transition: 'max-height .3s ease, opacity .3s ease', opacity: isOpen ? 1 : 0 }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15.5px', lineHeight: 1.7, paddingBottom: '24px', maxWidth: '640px' }}>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
