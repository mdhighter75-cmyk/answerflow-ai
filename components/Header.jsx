'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <header style={{ background: '#0a0a0a', borderBottom: '1px solid #1a1a2e', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <span style={{ fontSize: '22px', fontWeight: '800', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          AnswerFlow AI
        </span>
      </Link>
      <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <Link href="/pricing" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '15px' }}>Pricing</Link>
        <Link href="/login" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '15px' }}>Login</Link>
        <Link href="/signup" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: '#fff', padding: '8px 20px', borderRadius: '8px', textDecoration: 'none', fontSize: '15px', fontWeight: '600' }}>
          Start Free Trial
        </Link>
      </nav>
    </header>
  );
}
