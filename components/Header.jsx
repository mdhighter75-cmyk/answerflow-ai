'use client';
import Link from 'next/link';
import { PhoneCall } from 'lucide-react';

export default function Header() {
  return (
    <header data-testid="site-header" style={{ background: 'rgba(244,244,240,0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container" style={{ height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" data-testid="logo-link" style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
          <span style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'var(--accent-primary)', display: 'grid', placeItems: 'center' }}>
            <PhoneCall size={17} strokeWidth={2} color="#fff" />
          </span>
          <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em' }}>AnswerFlow</span>
        </Link>
        <nav style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
          <Link href="/pricing" data-testid="nav-pricing" style={{ color: 'var(--text-secondary)', fontSize: '15px', fontWeight: 500 }}>Pricing</Link>
          <Link href="/login" data-testid="nav-login" style={{ color: 'var(--text-secondary)', fontSize: '15px', fontWeight: 500 }}>Login</Link>
          <Link href="/signup" data-testid="nav-signup" className="btn btn-primary" style={{ padding: '9px 18px', fontSize: '14px' }}>Start free trial</Link>
        </nav>
      </div>
    </header>
  );
}
