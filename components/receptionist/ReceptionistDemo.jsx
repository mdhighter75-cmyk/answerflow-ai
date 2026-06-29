'use client';
import { useState, useRef, useEffect } from 'react';

export default function ReceptionistDemo({ businessInfo }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Hello! Thank you for calling ${businessInfo?.name || 'our business'}. How can I help you today?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/receptionist/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: input, businessInfo }) });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, there was an error. Please try again.' }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ background: '#111827', borderRadius: '16px', border: '1px solid #1f2937', overflow: 'hidden', height: '500px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: '#1f2937', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
        <span style={{ color: '#f9fafb', fontWeight: '600' }}>AI Receptionist — {businessInfo?.name || 'Demo Mode'}</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ maxWidth: '75%', padding: '10px 14px', borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px', background: msg.role === 'user' ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' : '#1f2937', color: '#f9fafb', fontSize: '14px', lineHeight: '1.5' }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <div style={{ color: '#9ca3af', fontSize: '13px', padding: '0 4px' }}>Typing...</div>}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding: '16px', borderTop: '1px solid #1f2937', display: 'flex', gap: '10px' }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Type a customer question..." style={{ flex: 1, background: '#1f2937', border: '1px solid #374151', borderRadius: '8px', padding: '10px 14px', color: '#f9fafb', fontSize: '14px', outline: 'none' }} />
        <button onClick={sendMessage} disabled={loading} style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: '600', cursor: 'pointer' }}>Send</button>
      </div>
    </div>
  );
}
