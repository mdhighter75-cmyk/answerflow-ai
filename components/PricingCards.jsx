'use client';
import Link from 'next/link';

const plans = [
  { name: 'Starter', price: 49, features: ['100 calls/month', 'AI chat receptionist', 'Call summaries', 'Email notifications', '1 business profile'], highlight: false },
  { name: 'Pro', price: 149, features: ['500 calls/month', 'AI voice + chat', 'Detailed summaries', 'SMS + email alerts', '3 business profiles', 'Appointment booking'], highlight: true },
  { name: 'Business', price: 299, features: ['Unlimited calls', 'Full AI suite', 'Advanced analytics', 'Priority support', 'Unlimited profiles', 'Custom AI scripts'], highlight: false },
];

export default function PricingCards() {
  return (
    <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', padding: '0 24px' }}>
      {plans.map((plan) => (
        <div key={plan.name} style={{ background: plan.highlight ? 'linear-gradient(135deg, #1e3a5f, #2d1b69)' : '#111827', border: plan.highlight ? '2px solid #3b82f6' : '1px solid #1f2937', borderRadius: '16px', padding: '32px', width: '300px', position: 'relative' }}>
          {plan.highlight && <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: '#fff', padding: '4px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>MOST POPULAR</div>}
          <h3 style={{ color: '#f9fafb', fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>{plan.name}</h3>
          <div style={{ marginBottom: '24px' }}>
            <span style={{ color: '#f9fafb', fontSize: '48px', fontWeight: '800' }}>${plan.price}</span>
            <span style={{ color: '#6b7280', fontSize: '16px' }}>/month</span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '28px' }}>
            {plan.features.map((f) => (
              <li key={f} style={{ color: '#d1d5db', fontSize: '14px', padding: '6px 0', display: 'flex', gap: '8px' }}>
                <span style={{ color: '#3b82f6', fontWeight: '700' }}>✓</span> {f}
              </li>
            ))}
          </ul>
          <Link href="/signup" style={{ display: 'block', textAlign: 'center', background: plan.highlight ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' : 'transparent', border: plan.highlight ? 'none' : '1px solid #374151', color: '#fff', padding: '12px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>
            Start Free Trial
          </Link>
        </div>
      ))}
    </div>
  );
}
