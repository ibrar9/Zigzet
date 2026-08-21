import React, { useState, useEffect } from 'react';
import { Flame, Clock, Copy, Check, Tag, Zap, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';

export const DealsPage = () => {
  const { products, showToast } = useStore();
  const [copiedCode, setCopiedCode] = useState(null);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 15
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 12, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const copyCoupon = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast('Coupon Copied! 🎟️', `Code "${code}" copied to clipboard.`);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const saleProducts = products.filter((p) => p.isSale || p.originalPrice);

  const coupons = [
    {
      code: 'SHOP20',
      discount: '20% OFF',
      description: 'Applicable on all electronics and apparel orders over $75',
      expires: 'Valid today'
    },
    {
      code: 'FREESHIP50',
      discount: 'FREE USA SHIPPING',
      description: 'Unlock 100% free nationwide express shipping on all carts',
      expires: 'No minimum'
    },
    {
      code: 'TECHVIP',
      discount: '$30 OFF',
      description: 'Exclusive discount on Noise Cancelling Headphones & Smart Watches',
      expires: 'Limited quantity'
    }
  ];

  return (
    <div className="deals-page-wrapper">
      {/* Hero Deals Banner with Live Countdown */}
      <div className="deals-hero-banner">
        <div className="container">
          <div className="deals-hero-content">
            <div className="hero-offer-badge" style={{ backgroundColor: '#fee2e2', color: '#ef4444' }}>
              <Flame size={16} />
              <span>Flash Sale Madness</span>
            </div>

            <h1 style={{ fontSize: '42px', fontWeight: '800', margin: '12px 0 16px 0', letterSpacing: '-0.02em' }}>
              Up to 40% Off Top Brands
            </h1>
            <p style={{ fontSize: '16px', color: '#4b5563', maxWidth: '520px', margin: '0 auto 28px auto' }}>
              Grab unbeatable prices on high-demand electronics, shoes, and home comfort. Deals expire when timer hits zero!
            </p>

            {/* Countdown Box */}
            <div className="deals-countdown-box">
              <div className="countdown-unit">
                <span className="unit-number">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="unit-label">Hours</span>
              </div>
              <span className="countdown-colon">:</span>
              <div className="countdown-unit">
                <span className="unit-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="unit-label">Minutes</span>
              </div>
              <span className="countdown-colon">:</span>
              <div className="countdown-unit">
                <span className="unit-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="unit-label">Seconds</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 20px 70px 20px' }}>
        {/* Active Coupons Section */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Tag size={20} color="#ea580c" />
            <h2 style={{ fontSize: '22px', fontWeight: '800' }}>Active Promo Vouchers</h2>
          </div>

          <div className="coupons-grid">
            {coupons.map((c) => (
              <div key={c.code} className="coupon-ticket-card">
                <div className="ticket-left">
                  <span className="ticket-discount">{c.discount}</span>
                  <span className="ticket-desc">{c.description}</span>
                  <span className="ticket-expiry">⏳ {c.expires}</span>
                </div>

                <div className="ticket-right">
                  <button 
                    className="ticket-copy-btn"
                    onClick={() => copyCoupon(c.code)}
                  >
                    {copiedCode === c.code ? (
                      <>
                        <Check size={14} color="#10b981" />
                        <span style={{ color: '#10b981' }}>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>{c.code}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Discounted Products Grid */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={22} color="#f59e0b" />
              <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Hot Deals on Sale</h2>
            </div>
            <span style={{ fontSize: '13px', color: '#6b7280' }}>
              Showing {saleProducts.length} discounted items
            </span>
          </div>

          <div className="products-grid">
            {saleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
