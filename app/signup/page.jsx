'use client';
import Header from '../../components/Header';
import { createBrowserSupabase } from '../../lib/supabaseClient';
import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    setError('');
    const supabase = createBrowserSupabase();
    const { error } = await supabase.auth.signUp({ email, password, options: { data: { business_name: businessName } } });
    if (error) { setError(error.message); } else { setSuccess(true); }
    setLoading(false);
  };

  if (success) return (
    <>
      <Header />
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
        <div className="card fade-up" style={{ textAlign: 'center', maxWidth: '420px', padding: '48px 40px' }} data-testid="signup-success">
          <CheckCircle2 size={48} strokeWidth={1.5} color="var(--accent-primary)" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: '26px', marginBottom: '12px' }}>Account created</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '26px' }}>Check your email to confirm, then log in.</p>
          <Link href="/login" className="btn btn-primary">Go to login</Link>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Header />
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
        <div className="card fade-up" style={{ padding: '40px', width: '100%', maxWidth: '420px' }}>
          <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Start your free trial</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>No credit card required</p>
          {error && <div data-testid="signup-error" style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '9px', padding: '12px', marginBottom: '20px', color: 'var(--error)', fontSize: '14px' }}>{error}</div>}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '7px' }}>Business name</label>
            <input data-testid="signup-business" type="text" value={businessName} onChange={e => setBusinessName(e.target.value)} placeholder="Your Business Name" className="input" />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '7px' }}>Email</label>
            <input data-testid="signup-email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@business.com" className="input" />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '7px' }}>Password</label>
            <input data-testid="signup-password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 6 characters" className="input" />
          </div>
          <button data-testid="signup-submit" onClick={handleSignup} disabled={loading} className="btn btn-primary" style={{ width: '100%', marginBottom: '20px' }}>
            {loading ? 'Creating account…' : 'Create free account'}
          </button>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '14px' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </div>
    </>
  );
}
