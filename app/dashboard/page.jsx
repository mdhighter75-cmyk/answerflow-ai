'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [messages, setMessages] = useState([{ role: 'assistant', content: "Hello! I'm your AI receptionist. How can I help you today?" }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', hours: '', services: '', phone: '', address: '', greeting: '', faqs: '' });
  const [saved, setSaved] = useState(false);

  const send = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/receptionist/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: input }) });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, there was an error.' }]);
    }
    setLoading(false);
  };

  const saveSettings = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0a' }}>
      <aside style={{ width: '240px', background: '#111827', borderRight: '1px solid #1f2937', padding: '24px 0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '0 20px 24px', borderBottom: '1px solid #1f2937' }}>
          <span style={{ fontSize: '18px', fontWeight: '800', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AnswerFlow AI</span>
        </div>
        <nav style={{ padding: '16px 12px', flex: 1 }}>
          {[['overview', '📊 Overview'], ['receptionist', '🤖 AI Receptionist'], ['calls', '📞 Call History'], ['settings', '⚙️ Business Settings'], ['billing', '💳 Billing']].map(([id, label]) => (
            <button key={id} onClick={() => setActiveTab(id)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 12px', borderRadius: '8px', border: 'none', background: activeTab === id ? '#1f2937' : 'transparent', color: activeTab === id ? '#f9fafb' : '#9ca3af', fontSize: '14px', fontWeight: activeTab === id ? '600' : '400', cursor: 'pointer', marginBottom: '4px' }}>
              {label}
            </button>
          ))}
        </nav>
        <div style={{ padding: '16px 20px', borderTop: '1px solid #1f2937' }}>
          <Link href="/" style={{ color: '#6b7280', fontSize: '13px', textDecoration: 'none' }}>← Back to site</Link>
        </div>
      </aside>

      <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
        {activeTab === 'overview' && (
          <>
            <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>Dashboard</h1>
            <p style={{ color: '#9ca3af', marginBottom: '32px' }}>Welcome to AnswerFlow AI.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '40px' }}>
              {[['📞', '0', 'Calls This Month'], ['📅', '0', 'Appointments'], ['💬', '0', 'Messages'], ['⭐', 'Trial', 'Plan Status']].map(([icon, val, label]) => (
                <div key={label} style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>{icon}</div>
                  <div style={{ fontSize: '28px', fontWeight: '800', marginBottom: '4px' }}>{val}</div>
                  <div style={{ color: '#9ca3af', fontSize: '13px' }}>{label}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#111827', border: '1px solid #3b82f6', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>🚀 Get Started</h3>
              {[['1', 'Set up your business profile', 'settings'], ['2', 'Test your AI receptionist', 'receptionist'], ['3', 'Choose a plan', 'billing']].map(([step, label, tab]) => (
                <div key={step} onClick={() => setActiveTab(tab)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: '1px solid #1f2937', cursor: 'pointer' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#1f2937', border: '2px solid #374151', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', color: '#9ca3af', flexShrink: 0 }}>{step}</div>
                  <span style={{ color: '#d1d5db', fontSize: '14px' }}>{label}</span>
                  <span style={{ marginLeft: 'auto', color: '#3b82f6', fontSize: '13px' }}>→</span>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'receptionist' && (
          <>
            <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>AI Receptionist Demo</h1>
            <p style={{ color: '#9ca3af', marginBottom: '24px' }}>Test how your AI responds to customer questions.</p>
            <div style={{ maxWidth: '600px', background: '#111827', borderRadius: '16px', border: '1px solid #1f2937', overflow: 'hidden' }}>
              <div style={{ background: '#1f2937', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
                <span style={{ color: '#f9fafb', fontWeight: '600', fontSize: '14px' }}>AI Receptionist — Demo</span>
              </div>
              <div style={{ height: '300px', overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {messages.map((m, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                    <div style={{ maxWidth: '80%', padding: '10px 14px', borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px', background: m.role === 'user' ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' : '#1f2937', color: '#f9fafb', fontSize: '14px', lineHeight: 1.5 }}>{m.content}</div>
                  </div>
                ))}
                {loading && <div style={{ color: '#9ca3af', fontSize: '13px' }}>Typing...</div>}
              </div>
              <div style={{ padding: '16px', borderTop: '1px solid #1f2937', display: 'flex', gap: '8px' }}>
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask something like a customer would..." style={{ flex: 1, background: '#1f2937', border: '1px solid #374151', borderRadius: '8px', padding: '10px 14px', color: '#f9fafb', fontSize: '14px', outline: 'none' }} />
                <button onClick={send} disabled={loading} style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: '600', cursor: 'pointer' }}>Send</button>
              </div>
            </div>
          </>
        )}

        {activeTab === 'settings' && (
          <>
            <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>Business Settings</h1>
            <p style={{ color: '#9ca3af', marginBottom: '32px' }}>This information trains your AI receptionist.</p>
            <div style={{ maxWidth: '600px' }}>
              {[['name', 'Business Name', 'e.g. Mike\'s Auto Shop'], ['hours', 'Business Hours', 'e.g. Mon-Fri 8am-6pm'], ['services', 'Services Offered', 'e.g. Oil changes, tire rotation...'], ['phone', 'Phone Number', 'e.g. (555) 123-4567'], ['address', 'Address', 'e.g. 123 Main St, Chicago, IL'], ['greeting', 'Custom Greeting', 'e.g. Thank you for calling!']].map(([key, label, placeholder]) => (
                <div key={key} style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', color: '#d1d5db', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>{label}</label>
                  <input value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} style={{ width: '100%', background: '#111827', border: '1px solid #374151', borderRadius: '8px', padding: '10px 14px', color: '#f9fafb', fontSize: '14px', outline: 'none' }} />
                </div>
              ))}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', color: '#d1d5db', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>FAQs</label>
                <textarea value={form.faqs} onChange={e => setForm({ ...form, faqs: e.target.value })} placeholder="Q: Do you do same-day service?&#10;A: Yes, call early to schedule." rows={4} style={{ width: '100%', background: '#111827', border: '1px solid #374151', borderRadius: '8px', padding: '10px 14px', color: '#f9fafb', fontSize: '14px', outline: 'none', resize: 'vertical' }} />
              </div>
              <button onClick={saveSettings} style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px 32px', fontWeight: '700', fontSize: '15px', cursor: 'pointer' }}>
                {saved ? '✓ Saved!' : 'Save Settings'}
              </button>
            </div>
          </>
        )}

        {activeTab === 'calls' && (
          <>
            <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>Call History</h1>
            <p style={{ color: '#9ca3af', marginBottom: '32px' }}>Your call summaries will appear here once you go live.</p>
            <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '60px', textAlign: 'center' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>📞</div>
              <p style={{ color: '#6b7280' }}>No calls yet. Activate your phone number to start receiving calls.</p>
            </div>
          </>
        )}

        {activeTab === 'billing' && (
          <>
            <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>Billing & Plans</h1>
            <p style={{ color: '#9ca3af', marginBottom: '32px' }}>You are currently on the free trial.</p>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              {[['Starter', '$49/mo', '100 calls/month'], ['Pro', '$149/mo', '500 calls/month'], ['Business', '$299/mo', 'Unlimited calls']].map(([name, price, calls]) => (
                <div key={name} style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px', minWidth: '200px' }}>
                  <h3 style={{ fontWeight: '700', marginBottom: '8px' }}>{name}</h3>
                  <div style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{price}</div>
                  <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>{calls}</p>
                  <button style={{ width: '100%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px', fontWeight: '600', cursor: 'pointer' }}>Upgrade</button>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
