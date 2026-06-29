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
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '400px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>Welcome back</h1>
          <p style={{ color: '#9ca3af', marginBottom: '32px' }}>Sign in to your AnswerFlow account</p>
          {error && <div style={{ background: '#450a0a', border: '1px solid #7f1d1d', borderRadius: '8px', padding: '12px', marginBottom: '20px', color: '#fca5a5', fontSize: '14px' }}>{error}</div>}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#d1d5db', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@business.com" style={{ width: '100%', background: '#1f2937', border: '1px solid #374151', borderRadius: '8px', padding: '10px 14px', color: '#f9fafb', fontSize: '15px', outline: 'none' }} />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', color: '#d1d5db', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={{ width: '100%', background: '#1f2937', border: '1px solid #374151', borderRadius: '8px', padding: '10px 14px', color: '#f9fafb', fontSize: '15px', outline: 'none' }} />
          </div>
          <button onClick={handleLogin} disabled={loading} style={{ width: '100%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', marginBottom: '20px' }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>
            Don&apos;t have an account?{' '}
            <Link href="/signup" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: '600' }}>Sign up free</Link>
          </p>
        </div>
      </div>
    </>
  );
}
