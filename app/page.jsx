import Header from '../components/Header';
import PricingCards from '../components/PricingCards';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Header />
      <section style={{ textAlign: 'center', padding: '100px 24px 80px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'inline-block', background: '#1f2937', border: '1px solid #374151', borderRadius: '20px', padding: '6px 16px', fontSize: '13px', color: '#60a5fa', fontWeight: '600', letterSpacing: '1px', marginBottom: '24px' }}>AI-POWERED BUSINESS RECEPTIONIST</div>
        <h1 style={{ fontSize: '64px', fontWeight: '900', lineHeight: '1.1', marginBottom: '24px', letterSpacing: '-2px' }}>
          Never Miss Another{' '}
          <span style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Customer Call</span>
        </h1>
        <p style={{ fontSize: '20px', color: '#9ca3af', lineHeight: '1.6', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
          AnswerFlow AI answers your business calls 24/7, books appointments, answers customer questions, and never takes a day off.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/signup" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: '#fff', padding: '16px 36px', borderRadius: '10px', textDecoration: 'none', fontSize: '17px', fontWeight: '700' }}>Start Free Trial</Link>
          <Link href="/pricing" style={{ background: 'transparent', border: '1px solid #374151', color: '#d1d5db', padding: '16px 36px', borderRadius: '10px', textDecoration: 'none', fontSize: '17px', fontWeight: '600' }}>See Pricing</Link>
        </div>
        <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '16px' }}>No credit card required · Cancel anytime</p>
      </section>

      <section style={{ background: '#111827', padding: '60px 24px', borderTop: '1px solid #1f2937', borderBottom: '1px solid #1f2937' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '80px', flexWrap: 'wrap', maxWidth: '900px', margin: '0 auto' }}>
          {[['24/7', 'Always Available'], ['< 1s', 'Response Time'], ['99.9%', 'Uptime'], ['500+', 'Businesses Served']].map(([num, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '40px', fontWeight: '900', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{num}</div>
              <div style={{ color: '#9ca3af', fontSize: '14px', marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '100px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '44px', fontWeight: '800', marginBottom: '64px', letterSpacing: '-1px' }}>Everything Your Business Needs</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {[
            { icon: '📞', title: 'Answers Every Call', desc: 'Your AI picks up every call instantly, day or night. Zero missed opportunities.' },
            { icon: '📅', title: 'Books Appointments', desc: 'Customers schedule directly with your AI. Syncs with your calendar automatically.' },
            { icon: '💬', title: 'Answers Questions', desc: 'Trained on your business info — hours, services, pricing, FAQs. Always accurate.' },
            { icon: '📝', title: 'Takes Messages', desc: 'When something needs your attention, the AI takes a message and notifies you.' },
            { icon: '📊', title: 'Call Dashboard', desc: 'See summaries of every call. Track questions, appointments, and messages.' },
            { icon: '🔧', title: 'Fully Customizable', desc: 'Set your greeting, services, hours, and tone. Your AI sounds like your brand.' },
          ].map((f) => (
            <div key={f.title} style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '16px', padding: '28px' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{f.icon}</div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{f.title}</h3>
              <p style={{ color: '#9ca3af', fontSize: '15px', lineHeight: '1.6' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '80px 24px', background: '#0d0d0d' }}>
        <h2 style={{ textAlign: 'center', fontSize: '44px', fontWeight: '800', marginBottom: '56px', letterSpacing: '-1px' }}>Simple, Transparent Pricing</h2>
        <PricingCards />
      </section>

      <section style={{ padding: '100px 24px', maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '44px', fontWeight: '800', marginBottom: '56px', letterSpacing: '-1px' }}>Frequently Asked Questions</h2>
        {[
          { q: 'How does the AI answer calls?', a: 'AnswerFlow AI connects to your phone number. When a customer calls, our AI answers instantly and handles the conversation based on your business info.' },
          { q: 'Can I use my existing phone number?', a: 'Yes! We can forward your existing number to AnswerFlow AI, or you can get a new number through our platform.' },
          { q: 'Can it book appointments?', a: 'Absolutely. The AI can check availability and book appointments directly, sending confirmations to both you and the customer.' },
          { q: 'Can I customize what it says?', a: 'Yes. You set the greeting, services list, FAQs, and tone. Your AI sounds exactly how you want it to.' },
          { q: 'How secure is my data?', a: 'All data is encrypted at rest and in transit. We use industry-standard security and never sell your data.' },
        ].map((item) => (
          <div key={item.q} style={{ borderBottom: '1px solid #1f2937', padding: '24px 0' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>{item.q}</h3>
            <p style={{ color: '#9ca3af', fontSize: '15px', lineHeight: '1.7' }}>{item.a}</p>
          </div>
        ))}
      </section>

      <section style={{ textAlign: 'center', padding: '100px 24px', background: 'linear-gradient(135deg, #0f172a, #1e1b4b)' }}>
        <h2 style={{ fontSize: '48px', fontWeight: '900', marginBottom: '16px', letterSpacing: '-1px' }}>Ready to Never Miss a Call Again?</h2>
        <p style={{ color: '#9ca3af', fontSize: '18px', marginBottom: '36px' }}>Join hundreds of businesses using AnswerFlow AI.</p>
        <Link href="/signup" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: '#fff', padding: '18px 48px', borderRadius: '12px', textDecoration: 'none', fontSize: '18px', fontWeight: '700' }}>Start Your Free Trial</Link>
        <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '16px' }}>No credit card required</p>
      </section>

      <footer style={{ background: '#0a0a0a', borderTop: '1px solid #1f2937', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: '20px', fontWeight: '800', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '16px' }}>AnswerFlow AI</div>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>© 2026 AnswerFlow AI. All rights reserved.</p>
      </footer>
    </>
  );
}
