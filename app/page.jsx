import Header from '../components/Header';
import PricingCards from '../components/PricingCards';
import Faq from '../components/Faq';
import Link from 'next/link';
import { PhoneCall, CalendarCheck, MessagesSquare, StickyNote, BarChart3, SlidersHorizontal, ArrowRight, Check } from 'lucide-react';

const features = [
  { Icon: PhoneCall, title: 'Answers every call', desc: 'Your AI picks up instantly, day or night. Zero missed opportunities, zero voicemail.' },
  { Icon: CalendarCheck, title: 'Books appointments', desc: 'Customers schedule directly with your AI. Syncs to your calendar automatically.' },
  { Icon: MessagesSquare, title: 'Answers questions', desc: 'Trained on your hours, services, pricing and FAQs. Always accurate, always on-brand.' },
  { Icon: StickyNote, title: 'Takes messages', desc: 'When something needs you, the AI captures a message and notifies you right away.' },
  { Icon: BarChart3, title: 'Call dashboard', desc: 'Clear summaries of every call. Track questions, appointments and follow-ups.' },
  { Icon: SlidersHorizontal, title: 'Fully customizable', desc: 'Set your greeting, services, hours and tone. Your AI sounds like your business.' },
];

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="grid-lines" style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'minmax(0,1.05fr) minmax(0,0.95fr)', gap: '56px', alignItems: 'center', padding: '88px 24px 96px' }}>
          <div className="fade-up">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '6px 14px', marginBottom: '28px' }}>
              <span className="live-dot" />
              <span className="eyebrow">AI receptionist · answering now</span>
            </div>
            <h1 style={{ fontSize: 'clamp(2.6rem, 5.2vw, 4.1rem)' }}>
              Never miss another<br /><span style={{ color: 'var(--accent-primary)' }}>customer call.</span>
            </h1>
            <p style={{ fontSize: '19px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '24px 0 36px', maxWidth: '480px' }}>
              AnswerFlow answers your business calls 24/7 — books appointments, answers questions, and never takes a day off.
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link href="/signup" data-testid="hero-cta-primary" className="btn btn-primary">Start free trial <ArrowRight size={18} strokeWidth={2} /></Link>
              <Link href="/pricing" data-testid="hero-cta-secondary" className="btn btn-secondary">See pricing</Link>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Check size={16} strokeWidth={2} color="var(--accent-primary)" /> No credit card required · Cancel anytime
            </p>
          </div>

          {/* Mock live-call card */}
          <div className="fade-up card" style={{ animationDelay: '.12s', padding: '0', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 20px', borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ width: '34px', height: '34px', borderRadius: '9px', background: 'var(--accent-light)', display: 'grid', placeItems: 'center' }}><PhoneCall size={17} strokeWidth={1.75} color="var(--accent-primary)" /></span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, fontSize: '14px' }}>Incoming call</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>Bright Smile Dental</div>
              </div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--success)', fontWeight: 600 }}><span className="live-dot" /> Live</span>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', background: 'var(--bg-primary)' }}>
              {[
                { who: 'caller', text: 'Hi, do you have any openings this Friday?' },
                { who: 'ai', text: "We do! I have 10:30am or 2:15pm on Friday. Which works best for you?" },
                { who: 'caller', text: '2:15 is perfect.' },
                { who: 'ai', text: "Booked — I'll text you a confirmation. Anything else I can help with?" },
              ].map((m, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: m.who === 'caller' ? 'flex-start' : 'flex-end' }}>
                  <div style={{ maxWidth: '82%', padding: '10px 14px', fontSize: '14px', lineHeight: 1.5,
                    borderRadius: m.who === 'caller' ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
                    background: m.who === 'caller' ? 'var(--bg-surface)' : 'var(--accent-primary)',
                    color: m.who === 'caller' ? 'var(--text-primary)' : '#fff',
                    border: m.who === 'caller' ? '1px solid var(--border-color)' : 'none' }}>{m.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-surface)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '24px', padding: '44px 24px' }}>
          {[['24/7', 'Always available'], ['< 1s', 'Response time'], ['99.9%', 'Uptime'], ['500+', 'Businesses served']].map(([num, label]) => (
            <div key={label}>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '38px', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--accent-primary)' }}>{num}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '2px' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container" style={{ padding: '96px 24px' }}>
        <span className="eyebrow">What it does</span>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: '12px', marginBottom: '52px', maxWidth: '640px' }}>Everything your front desk does — automated.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {features.map(({ Icon, title, desc }) => (
            <div key={title} className="card card-hover" style={{ padding: '28px' }}>
              <span style={{ width: '44px', height: '44px', borderRadius: '11px', background: 'var(--accent-light)', display: 'grid', placeItems: 'center', marginBottom: '18px' }}>
                <Icon size={22} strokeWidth={1.5} color="var(--accent-primary)" />
              </span>
              <h3 style={{ fontSize: '19px', marginBottom: '9px' }}>{title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '96px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="eyebrow">Pricing</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: '12px' }}>Simple, honest pricing.</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '17px', marginTop: '12px' }}>No hidden fees. Cancel anytime.</p>
        </div>
        <PricingCards />
      </section>

      {/* FAQ */}
      <section className="container" style={{ padding: '96px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="eyebrow">FAQ</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: '12px' }}>Frequently asked questions</h2>
        </div>
        <Faq />
      </section>

      {/* CTA */}
      <section style={{ padding: '24px' }}>
        <div className="container" style={{ background: 'var(--accent-primary)', borderRadius: '20px', padding: '72px 32px', textAlign: 'center' }}>
          <h2 style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '14px' }}>Ready to never miss a call again?</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '17px', marginBottom: '32px' }}>Join hundreds of businesses using AnswerFlow.</p>
          <Link href="/signup" data-testid="footer-cta" className="btn" style={{ background: '#fff', color: 'var(--accent-primary)' }}>Start your free trial <ArrowRight size={18} strokeWidth={2} /></Link>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginTop: '16px' }}>No credit card required</p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '40px 24px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'var(--accent-primary)', display: 'grid', placeItems: 'center' }}><PhoneCall size={15} strokeWidth={2} color="#fff" /></span>
            <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '18px', fontWeight: 700 }}>AnswerFlow</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>© 2026 AnswerFlow AI. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
