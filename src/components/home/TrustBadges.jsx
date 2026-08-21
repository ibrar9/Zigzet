import React from 'react';
import { Truck, ShieldCheck, Headphones, HeartHandshake } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const TrustBadges = () => {
  const { settings } = useStore();

  const badges = [
    {
      icon: <Truck size={28} strokeWidth={1.75} />,
      title: 'Free USA Shipping',
      description: `On Orders Over $${settings.freeShippingThreshold}`
    },
    {
      icon: <ShieldCheck size={28} strokeWidth={1.75} />,
      title: 'Secure Payments',
      description: '100% Safe & Encrypted'
    },
    {
      icon: <Headphones size={28} strokeWidth={1.75} />,
      title: '24/7 Support',
      description: 'Always Here for You'
    },
    {
      icon: <HeartHandshake size={28} strokeWidth={1.75} />,
      title: 'Top Quality Products',
      description: 'Trusted by Thousands'
    }
  ];

  return (
    <section className="trust-badges-section">
      <div className="container">
        <div className="trust-badges-grid">
          {badges.map((badge, idx) => (
            <div className="trust-badge-card" key={idx}>
              <div className="trust-badge-icon">
                {badge.icon}
              </div>
              <div className="trust-badge-text">
                <h4>{badge.title}</h4>
                <p>{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
