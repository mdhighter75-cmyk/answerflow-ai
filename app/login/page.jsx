'use client';
import Header from '../../components/Header';
import { createBrowserSupabase } from '../../lib/supabaseClient';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    const supabase = createBrowserSupabase();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError(error.message); } else { router.push('/dashboard'); }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
        <div className="card fade-up" style={{ padding: '40px', width: '100%', maxWidth: '420px' }}>
          <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Welcome back</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>Sign in to your AnswerFlow account</p>
          {error && <div data-testid="login-error" style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '9px', padding: '12px', marginBottom: '20px', color: 'var(--error)', fontSize: '14px' }}>{error}</div>}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '7px' }}>Email</label>
            <input data-testid="login-email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@business.com" className="input" />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '7px' }}>Password</label>
            <input data-testid="login-password" type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} placeholder="••••••••" className="input" />
          </div>
          <button data-testid="login-submit" onClick={handleLogin} disabled={loading} className="btn btn-primary" style={{ width: '100%', marginBottom: '20px' }}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '14px' }}>
            Don&apos;t have an account?{' '}
            <Link href="/signup" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Sign up free</Link>
          </p>
        </div>
      </div>
    </>
  );
}
