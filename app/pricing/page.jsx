import Header from '../../components/Header';
import PricingCards from '../../components/PricingCards';

export default function Pricing() {
  return (
    <>
      <Header />
      <section style={{ textAlign: 'center', padding: '80px 24px 40px' }}>
        <h1 style={{ fontSize: '52px', fontWeight: '900', marginBottom: '16px', letterSpacing: '-1.5px' }}>Simple, Honest Pricing</h1>
        <p style={{ color: '#9ca3af', fontSize: '18px', marginBottom: '60px' }}>No hidden fees. Cancel anytime.</p>
        <PricingCards />
      </section>
    </>
  );
}
