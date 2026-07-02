'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createBrowserSupabase } from '../../lib/supabaseClient';
import { LayoutDashboard, Bot, PhoneCall, Settings, CreditCard, ArrowLeft, Send, Calendar, MessageSquare, Star, Check } from 'lucide-react';

const NAV = [
  ['overview', 'Overview', LayoutDashboard],
  ['receptionist', 'AI Receptionist', Bot],
  ['calls', 'Call History', PhoneCall],
  ['settings', 'Business Settings', Settings],
  ['billing', 'Billing', CreditCard],
];

const SETTINGS_FIELDS = [
  ['name', 'Business Name', "e.g. Mike's Auto Shop"],
  ['hours', 'Business Hours', 'e.g. Mon-Fri 8am-6pm'],
  ['services', 'Services Offered', 'e.g. Oil changes, tire rotation...'],
  ['phone', 'Phone Number', 'e.g. (555) 123-4567'],
  ['address', 'Address', 'e.g. 123 Main St, Chicago, IL'],
  ['greeting', 'Custom Greeting', 'e.g. Thank you for calling!'],
];

const PLANS = [
  ['Starter', '$49', '100 calls/month', 'starter'],
  ['Pro', '$149', '500 calls/month', 'pro'],
  ['Business', '$299', 'Unlimited calls', 'business'],
];

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [messages, setMessages] = useState([{ role: 'assistant', content: "Hello! I'm your AI receptionist. How can I help you today?" }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', hours: '', services: '', phone: '', address: '', greeting: '', faqs: '' });
  const [saved, setSaved] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [plan, setPlan] = useState('trial');
  const [upgrading, setUpgrading] = useState('');
  const [billingError, setBillingError] = useState('');
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsError, setSettingsError] = useState('');

  useEffect(() => {
    const supabase = createBrowserSupabase();
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data?.user) {
        router.push('/login');
        return;
      }
      const user = data.user;
      setUserEmail(user.email);
      setUserId(user.id);

      const { data: biz } = await supabase
        .from('businesses')
        .select('name, hours, services, phone, address, greeting, faqs')
        .eq('user_id', user.id)
        .maybeSingle();
      if (biz) {
        setForm({
          name: biz.name || '', hours: biz.hours || '', services: biz.services || '',
          phone: biz.phone || '', address: biz.address || '', greeting: biz.greeting || '', faqs: biz.faqs || '',
        });
      }

      const { data: sub } = await supabase
        .from('subscriptions')
        .select('plan, status')
        .eq('email', user.email)
        .maybeSingle();
      if (sub && sub.status === 'active' && sub.plan) setPlan(sub.plan);
    });
  }, [router]);

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

  const handleUpgrade = async (planId) => {
    if (upgrading) return;
    setBillingError('');
    setUpgrading(planId);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId, email: userEmail || undefined })
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Unable to start checkout.');
      }
      window.location.href = data.url;
    } catch (err) {
      setBillingError(err.message || 'Checkout failed. Please try again.');
      setUpgrading('');
    }
  };

  const saveSettings = async () => {
    if (savingSettings || !userId) return;
    setSettingsError('');
    setSavingSettings(true);
    try {
      const supabase = createBrowserSupabase();
      const { error } = await supabase
        .from('businesses')
        .upsert({ user_id: userId, ...form }, { onConflict: 'user_id' });
      if (error) throw error;
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setSettingsError(err.message || 'Could not save settings.');
    }
    setSavingSettings(false);
  };

  const planLabel = plan === 'trial' ? 'Trial' : plan.charAt(0).toUpperCase() + plan.slice(1);

  const stats = [
    [PhoneCall, '0', 'Calls This Month'],
    [Calendar, '0', 'Appointments'],
    [MessageSquare, '0', 'Messages'],
    [Star, planLabel, 'Plan Status'],
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', background: 'var(--bg-surface)', borderRight: '1px solid var(--border-color)', padding: '24px 0', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh' }}>
        <div style={{ padding: '0 24px 22px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '9px' }}>
          <span style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'var(--accent-primary)', display: 'grid', placeItems: 'center' }}><PhoneCall size={16} strokeWidth={2} color="#fff" /></span>
          <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '18px', fontWeight: 700 }}>AnswerFlow</span>
        </div>
        <nav style={{ padding: '16px 12px', flex: 1 }}>
          {NAV.map(([id, label, Icon]) => (
            <button key={id} data-testid={`nav-${id}`} onClick={() => setActiveTab(id)}
              style={{ display: 'flex', alignItems: 'center', gap: '11px', width: '100%', textAlign: 'left', padding: '10px 12px', borderRadius: '9px', border: 'none', cursor: 'pointer', marginBottom: '3px',
                background: activeTab === id ? 'var(--accent-light)' : 'transparent',
                color: activeTab === id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                fontSize: '14.5px', fontWeight: activeTab === id ? 600 : 500 }}>
              <Icon size={18} strokeWidth={1.75} /> {label}
            </button>
          ))}
        </nav>
        <div style={{ padding: '16px 24px 0', borderTop: '1px solid var(--border-color)' }}>
          {userEmail && <p style={{ color: 'var(--text-secondary)', fontSize: '12.5px', marginBottom: '10px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{userEmail}</p>}
          <Link href="/" data-testid="back-to-site" style={{ color: 'var(--text-secondary)', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}><ArrowLeft size={14} strokeWidth={1.75} /> Back to site</Link>
        </div>
      </aside>

      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        {activeTab === 'overview' && (
          <div className="fade-up">
            <h1 style={{ fontSize: '30px', marginBottom: '6px' }}>Dashboard</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Welcome to AnswerFlow AI.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '16px' }}>
              {stats.map(([Icon, val, label]) => (
                <div key={label} data-testid={`stat-${label.toLowerCase().replace(/ /g, '-')}`} className="card" style={{ padding: '22px' }}>
                  <span style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--accent-light)', display: 'grid', placeItems: 'center', marginBottom: '14px' }}><Icon size={19} strokeWidth={1.75} color="var(--accent-primary)" /></span>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '28px', fontWeight: 700, marginBottom: '2px', letterSpacing: '-0.02em' }}>{val}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'receptionist' && (
          <div className="fade-up">
            <h1 style={{ fontSize: '30px', marginBottom: '6px' }}>AI Receptionist Demo</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Test how your AI responds to customer questions.</p>
            <div className="card" style={{ maxWidth: '620px', overflow: 'hidden', padding: 0 }}>
              <div style={{ padding: '15px 20px', display: 'flex', alignItems: 'center', gap: '9px', borderBottom: '1px solid var(--border-color)' }}>
                <span className="live-dot" />
                <span style={{ fontWeight: 600, fontSize: '14px' }}>AI Receptionist — Demo</span>
              </div>
              <div style={{ height: '320px', overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', background: 'var(--bg-primary)' }}>
                {messages.map((m, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                    <div data-testid={`chat-message-${i}`} style={{ maxWidth: '80%', padding: '10px 14px', fontSize: '14px', lineHeight: 1.5,
                      borderRadius: m.role === 'user' ? '14px 4px 14px 14px' : '4px 14px 14px 14px',
                      background: m.role === 'user' ? 'var(--accent-primary)' : 'var(--bg-surface)',
                      color: m.role === 'user' ? '#fff' : 'var(--text-primary)',
                      border: m.role === 'user' ? 'none' : '1px solid var(--border-color)' }}>{m.content}</div>
                  </div>
                ))}
                {loading && <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Typing…</div>}
              </div>
              <div style={{ padding: '14px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '9px' }}>
                <input data-testid="chat-input" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask something like a customer would..." className="input" />
                <button data-testid="chat-send" onClick={send} disabled={loading} className="btn btn-primary" style={{ padding: '0 16px' }}><Send size={17} strokeWidth={2} /></button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="fade-up">
            <h1 style={{ fontSize: '30px', marginBottom: '6px' }}>Business Settings</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>This information trains your AI receptionist.</p>
            <div className="card" style={{ maxWidth: '640px', padding: '32px' }}>
              {SETTINGS_FIELDS.map(([key, label, placeholder]) => (
                <div key={key} style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', marginBottom: '7px' }}>{label}</label>
                  <input data-testid={`settings-${key}`} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} className="input" />
                </div>
              ))}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '7px' }}>FAQs</label>
                <textarea data-testid="settings-faqs" value={form.faqs} onChange={e => setForm({ ...form, faqs: e.target.value })} placeholder="Q: Do you do same-day service?&#10;A: Yes, call early to schedule." rows={4} className="input" style={{ resize: 'vertical' }} />
              </div>
              {settingsError && <div data-testid="settings-error" style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '9px', padding: '12px', marginBottom: '18px', color: 'var(--error)', fontSize: '14px' }}>{settingsError}</div>}
              <button data-testid="save-settings-button" onClick={saveSettings} disabled={savingSettings} className="btn btn-primary">
                {savingSettings ? 'Saving…' : saved ? <><Check size={17} strokeWidth={2.25} /> Saved</> : 'Save settings'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'calls' && (
          <div className="fade-up">
            <h1 style={{ fontSize: '30px', marginBottom: '6px' }}>Call History</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Your call summaries will appear here once you go live.</p>
            <div className="card" style={{ padding: '64px', textAlign: 'center' }}>
              <span style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'var(--accent-light)', display: 'grid', placeItems: 'center', margin: '0 auto 18px' }}><PhoneCall size={26} strokeWidth={1.5} color="var(--accent-primary)" /></span>
              <p style={{ color: 'var(--text-secondary)' }}>No calls yet. Activate your phone number to start receiving calls.</p>
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="fade-up">
            <h1 style={{ fontSize: '30px', marginBottom: '6px' }}>Billing &amp; Plans</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>{plan === 'trial' ? 'You are currently on the free trial.' : `You are currently on the ${planLabel} plan.`}</p>
            {billingError && <div data-testid="billing-error" style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '9px', padding: '12px', marginBottom: '20px', color: 'var(--error)', fontSize: '14px', maxWidth: '660px' }}>{billingError}</div>}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px', maxWidth: '760px' }}>
              {PLANS.map(([name, price, calls, planId]) => {
                const isCurrent = plan === planId;
                return (
                  <div key={name} className="card" style={{ padding: '26px', border: isCurrent ? '1.5px solid var(--accent-primary)' : '1px solid var(--border-color)' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '6px' }}>{name}</h3>
                    <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '30px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '4px' }}>{price}<span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--text-secondary)' }}>/mo</span></div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '18px' }}>{calls}</p>
                    <button data-testid={`upgrade-${planId}-button`} onClick={() => handleUpgrade(planId)} disabled={!!upgrading || isCurrent}
                      className={`btn ${isCurrent ? 'btn-secondary' : 'btn-primary'}`} style={{ width: '100%', opacity: upgrading && upgrading !== planId ? 0.5 : 1 }}>
                      {isCurrent ? 'Current plan' : upgrading === planId ? 'Redirecting…' : 'Upgrade'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
