'use client';
import Link from 'next/link';
import { Check } from 'lucide-react';

const plans = [
  { name: 'Starter', price: 49, features: ['100 calls/month', 'AI chat receptionist', 'Call summaries', 'Email notifications', '1 business profile'], highlight: false },
  { name: 'Pro', price: 149, features: ['500 calls/month', 'AI voice + chat', 'Detailed summaries', 'SMS + email alerts', '3 business profiles', 'Appointment booking'], highlight: true },
  { name: 'Business', price: 299, features: ['Unlimited calls', 'Full AI suite', 'Advanced analytics', 'Priority support', 'Unlimited profiles', 'Custom AI scripts'], highlight: false },
];

export default function PricingCards() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', maxWidth: '980px', margin: '0 auto', alignItems: 'stretch' }}>
      {plans.map((plan) => (
        <div key={plan.name} data-testid={`pricing-card-${plan.name.toLowerCase()}`} className="card"
          style={{ padding: '32px', position: 'relative', display: 'flex', flexDirection: 'column',
            border: plan.highlight ? '1.5px solid var(--accent-primary)' : '1px solid var(--border-color)',
            background: plan.highlight ? 'var(--accent-light)' : 'var(--bg-surface)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginBottom: '10px', minHeight: '26px' }}>
            <h3 style={{ fontSize: '22px' }}>{plan.name}</h3>
            {plan.highlight && <span style={{ background: 'var(--accent-primary)', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Most popular</span>}
          </div>
          <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '46px', fontWeight: 700, letterSpacing: '-0.03em' }}>${plan.price}</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>/month</span>
          </div>
          <ul style={{ listStyle: 'none', marginBottom: '28px', display: 'flex', flexDirection: 'column', gap: '11px', flex: 1 }}>
            {plan.features.map((f) => (
              <li key={f} style={{ color: 'var(--text-secondary)', fontSize: '14.5px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <Check size={18} strokeWidth={2} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '1px' }} /> {f}
              </li>
            ))}
          </ul>
          <Link href="/signup" data-testid={`pricing-cta-${plan.name.toLowerCase()}`} className={`btn ${plan.highlight ? 'btn-primary' : 'btn-secondary'}`} style={{ width: '100%' }}>
            Start free trial
          </Link>
        </div>
      ))}
    </div>
  );
}
