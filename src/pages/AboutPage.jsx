import React from 'react';
import { ShieldCheck, Truck, Headphones, HeartHandshake, CheckCircle2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutPage = () => {
  const { navigatePage } = useStore();

  const values = [
    {
      icon: <Truck size={30} color="#111827" strokeWidth={1.8} />,
      title: 'Fast USA Fulfillment',
      desc: 'With distribution centers strategically located in California, Texas, and Ohio, orders arrive in 2-3 business days.'
    },
    {
      icon: <ShieldCheck size={30} color="#111827" strokeWidth={1.8} />,
      title: 'Verified Quality Guarantee',
      desc: 'Every single product in our catalog undergoes rigorous quality inspection before being packaged.'
    },
    {
      icon: <Headphones size={30} color="#111827" strokeWidth={1.8} />,
      title: '24/7 Human Customer Care',
      desc: 'No endless phone trees. Real support agents are ready to assist you via live chat, email, and toll-free phone.'
    },
    {
      icon: <HeartHandshake size={30} color="#111827" strokeWidth={1.8} />,
      title: 'Hassle-Free 30-Day Returns',
      desc: 'If you are not 100% in love with your purchase, return it easily with our prepaid shipping labels.'
    }
  ];

  return (
    <div className="about-page-wrapper">
      {/* Hero Banner */}
      <div className="shop-header-banner">
        <div className="container">
          <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
            <span style={{ fontSize: '12.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6b7280' }}>
              About Zigzet
            </span>
            <h1 style={{ fontSize: '40px', fontWeight: '800', marginTop: '6px', marginBottom: '12px', letterSpacing: '-0.02em' }}>
              Empowering Everyday Life with Premium Essentials
            </h1>
            <p style={{ color: '#4b5563', fontSize: '15.5px', lineHeight: '1.6' }}>
              Founded with the simple belief that modern shopping should be dependable, beautifully designed, and lightning-fast.
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '50px 20px 80px 20px' }}>
        {/* Story Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '48px', alignItems: 'center', marginBottom: '64px' }}>
          <div>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#ea580c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Our Mission
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: '800', margin: '8px 0 16px 0', lineHeight: '1.2' }}>
              Shop Smarter. Live Better.
            </h2>
            <p style={{ color: '#4b5563', fontSize: '15px', lineHeight: '1.7', marginBottom: '16px' }}>
              At Zigzet, we curate high-performance electronics, trendy fashion apparel, modern home living comfort, and wellness essentials so you never have to guess the quality.
            </p>
            <p style={{ color: '#4b5563', fontSize: '15px', lineHeight: '1.7', marginBottom: '24px' }}>
              We partner directly with leading manufacturing hubs to bring you premium design and factory-direct savings, backed by full warranty coverage and rapid delivery across the United States.
            </p>
            <button className="hero-cta-btn" onClick={() => navigatePage('shop')}>
              <span>Explore Our Products</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', border: '1px solid #e5e7eb' }}>
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80" 
              alt="Zigzet Team and Modern Fulfillment" 
              style={{ width: '100%', height: '360px', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div style={{ marginBottom: '64px' }}>
          <div style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto 36px auto' }}>
            <h3 style={{ fontSize: '26px', fontWeight: '800' }}>Why Thousands Choose Zigzet</h3>
            <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '6px' }}>Built on trust, speed, and uncompromising customer focus.</p>
          </div>

          <div className="about-values-grid">
            {values.map((v, i) => (
              <div key={i} className="about-value-card">
                <div className="about-value-icon">
                  {v.icon}
                </div>
                <h4 style={{ fontSize: '17px', fontWeight: '800', margin: '14px 0 6px 0' }}>{v.title}</h4>
                <p style={{ fontSize: '13.5px', color: '#6b7280', lineHeight: '1.5' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Strip */}
        <div className="about-stats-strip">
          <div className="stat-strip-item">
            <h2>50,000+</h2>
            <p>Orders Delivered</p>
          </div>
          <div className="stat-strip-item">
            <h2>99.4%</h2>
            <p>Satisfaction Rating</p>
          </div>
          <div className="stat-strip-item">
            <h2>24h</h2>
            <p>Average Dispatch</p>
          </div>
          <div className="stat-strip-item">
            <h2>30-Day</h2>
            <p>Money Back Guarantee</p>
          </div>
        </div>
      </div>
    </div>
  );
};
