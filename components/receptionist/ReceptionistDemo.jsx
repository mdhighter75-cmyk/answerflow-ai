'use client';
import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

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
    <div className="card" style={{ overflow: 'hidden', height: '500px', display: 'flex', flexDirection: 'column', padding: 0 }}>
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--border-color)' }}>
        <div className="live-dot" />
        <span style={{ fontWeight: 600 }}>AI Receptionist — {businessInfo?.name || 'Demo Mode'}</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', background: 'var(--bg-primary)' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ maxWidth: '75%', padding: '10px 14px', fontSize: '14px', lineHeight: 1.5,
              borderRadius: msg.role === 'user' ? '14px 4px 14px 14px' : '4px 14px 14px 14px',
              background: msg.role === 'user' ? 'var(--accent-primary)' : 'var(--bg-surface)',
              color: msg.role === 'user' ? '#fff' : 'var(--text-primary)',
              border: msg.role === 'user' ? 'none' : '1px solid var(--border-color)' }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <div style={{ color: 'var(--text-secondary)', fontSize: '13px', padding: '0 4px' }}>Typing…</div>}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding: '14px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '10px' }}>
        <input data-testid="receptionist-input" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Type a customer question..." className="input" />
        <button data-testid="receptionist-send" onClick={sendMessage} disabled={loading} className="btn btn-primary" style={{ padding: '0 16px' }}><Send size={17} strokeWidth={2} /></button>
      </div>
    </div>
  );
}
