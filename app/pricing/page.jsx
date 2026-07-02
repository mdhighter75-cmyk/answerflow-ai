import Header from '../../components/Header';
import PricingCards from '../../components/PricingCards';

export default function Pricing() {
  return (
    <>
      <Header />
      <section className="container" style={{ textAlign: 'center', padding: '88px 24px 56px' }}>
        <span className="eyebrow">Pricing</span>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.6rem)', marginTop: '14px', marginBottom: '16px' }}>Simple, honest pricing</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', marginBottom: '60px' }}>No hidden fees. Cancel anytime.</p>
        <PricingCards />
      </section>
    </>
  );
}
