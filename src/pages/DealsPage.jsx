import React, { useState, useEffect, useMemo } from 'react';
import { Flame, Clock, Copy, Check, Tag, Zap, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';

export const DealsPage = () => {
  const { products, showToast, coupons: adminCoupons, campaign, settings } = useStore();
  const [copiedCode, setCopiedCode] = useState(null);
  const [dealFilter, setDealFilter] = useState('all');

  const curr = settings?.currency || 'AED';

  // Live countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 38,
    seconds: 22
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Filter products on sale or with discounted originalPrice
  const allSaleProducts = useMemo(() => {
    return products.filter(
      (p) => p.isActive !== false && (p.isSale || (p.originalPrice && Number(p.originalPrice) > Number(p.price)))
    );
  }, [products]);

  // Filtered by sub-pill
  const displayedDeals = useMemo(() => {
    return allSaleProducts.filter((p) => {
      if (dealFilter === 'under-100') return Number(p.price) <= 100;
      if (dealFilter === 'big-discount') {
        if (!p.originalPrice) return false;
        const discount = ((Number(p.originalPrice) - Number(p.price)) / Number(p.originalPrice)) * 100;
        return discount >= 30;
      }
      if (dealFilter !== 'all') {
        return p.category === dealFilter;
      }
      return true;
    });
  }, [allSaleProducts, dealFilter]);

  const copyCoupon = (code) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }
    setCopiedCode(code);
    showToast('Promo Code Copied!', `"${code}" copied to clipboard. Paste at checkout.`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // Dynamic active coupons from StoreContext
  const activeCouponsList = adminCoupons && adminCoupons.length > 0
    ? adminCoupons.filter((c) => c.isActive !== false)
    : [
        {
          code: 'KBEAUTY20',
          discount: '20% OFF',
          description: `Applicable on all skincare sets and creams over 150 ${curr}`,
          expires: 'Valid today'
        },
        {
          code: 'UAESHIP',
          discount: 'FREE UAE DELIVERY',
          description: 'Unlock 100% free express delivery across all Emirates',
          expires: `Orders over 150 ${curr}`
        },
        {
          code: 'GLOW50',
          discount: `50 ${curr} OFF`,
          description: 'Exclusive discount on Luxury NAD+ and Triple PDRN sets',
          expires: 'Limited quantity'
        }
      ];

  return (
    <div className="deals-page-wrapper">
      {/* Hero Deals Banner with Live Countdown */}
      <div className="deals-hero-banner">
        <div className="container">
          <div className="deals-hero-content">
            <div className="hero-offer-badge">
              <Flame size={16} />
              <span>{campaign?.name || 'K-Beauty Flash Deals'}</span>
            </div>

            <h1 className="deals-hero-title">
              {campaign?.headline || 'Up to 45% Off Luxury Skincare Sets'}
            </h1>
            <p className="deals-hero-sub">
              Grab authentic Korean skincare formulas, sun care sticks, and cleansing sets. Deals expire when timer hits zero!
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
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--color-text-primary, #0f172a)' }}>Active Promo Vouchers</h2>
          </div>

          <div className="coupons-grid">
            {activeCouponsList.map((c) => {
              const discountLabel = c.discount || (c.type === 'percentage' ? `${c.value}% OFF` : `${c.value} ${curr} OFF`);
              const descLabel = c.description || (c.minSpend ? `On orders over ${c.minSpend} ${curr}` : 'Applicable on storewide items');
              const expiryLabel = c.expires || (c.expiryDate ? `Expires ${c.expiryDate}` : 'Valid today');

              return (
                <div key={c.id || c.code} className="coupon-ticket-card">
                  <div className="ticket-left">
                    <span className="ticket-discount">{discountLabel}</span>
                    <span className="ticket-desc">{descLabel}</span>
                    <span className="ticket-expiry">
                      <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />
                      {expiryLabel}
                    </span>
                  </div>

                  <div className="ticket-right">
                    <button 
                      className="ticket-copy-btn"
                      onClick={() => copyCoupon(c.code)}
                      title="Copy Coupon Code"
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
              );
            })}
          </div>
        </div>

        {/* Discounted Products Section with Quick Filters */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={22} color="#f59e0b" />
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-text-primary, #0f172a)' }}>Hot Deals on Sale</h2>
            </div>
            <span style={{ fontSize: '13px', color: 'var(--color-text-muted, #6b7280)' }}>
              Showing {displayedDeals.length} of {allSaleProducts.length} deals
            </span>
          </div>

          {/* Deals Quick Filter Pills */}
          <div className="deals-filter-pills-row">
            {[
              { id: 'all', label: 'All Deals' },
              { id: 'big-discount', label: '30%+ OFF' },
              { id: 'under-100', label: `Under ${curr} 100` },
              { id: 'sunscreen', label: 'Sun Care Deals' },
              { id: 'cleansers', label: 'Cleanser Specials' },
              { id: 'serums', label: 'Serum Bundles' }
            ].map((pill) => (
              <button
                key={pill.id}
                className={`deals-filter-pill ${dealFilter === pill.id ? 'active' : ''}`}
                onClick={() => setDealFilter(pill.id)}
              >
                {pill.label}
              </button>
            ))}
          </div>

          <div className="products-grid" style={{ marginTop: '24px' }}>
            {displayedDeals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {displayedDeals.length === 0 && (
            <div className="empty-catalog-state" style={{ marginTop: '24px' }}>
              <Zap size={44} color="#9ca3af" />
              <h3>No deals in this category</h3>
              <p>Try switching to another filter or exploring all deals.</p>
              <button className="hero-cta-btn" onClick={() => setDealFilter('all')} style={{ marginTop: '14px' }}>
                View All Deals
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
