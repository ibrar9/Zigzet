import React from 'react';
import { Award, Star, Zap, Crown, Gift, ArrowRight, ShoppingBag } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const TIERS = [
  { name: 'Bronze Explorer', minSpend: 0, next: 500, color: '#92400e', bg: '#fef3c7', icon: Star, perks: ['1x Points on purchases', 'Member-only deals', 'Birthday discount 5%'] },
  { name: 'Silver Member', minSpend: 500, next: 1500, color: '#475569', bg: '#f1f5f9', icon: Zap, perks: ['1.25x Points', 'Free Express Delivery', 'Early Sale Access'] },
  { name: 'Gold VIP', minSpend: 1500, next: 3000, color: '#d97706', bg: '#fef3c7', icon: Crown, perks: ['1.5x Points', 'Priority Support', 'Monthly exclusive offer'] },
  { name: 'Platinum Elite', minSpend: 3000, next: null, color: '#7c3aed', bg: '#ede9fe', icon: Crown, perks: ['2x Points', 'Birthday gift', 'Early Product Access', 'Free returns'] },
];

const HISTORY = [
  { label: 'Order ORD-9842 — Smart Watch', pts: '+2,999', date: 'Aug 20, 2026', type: 'earn' },
  { label: 'Order ORD-9841 — Headphones', pts: '+1,999', date: 'Aug 20, 2026', type: 'earn' },
  { label: 'Redeemed for Discount', pts: '-500', date: 'Aug 15, 2026', type: 'redeem' },
  { label: 'Sign-up Bonus', pts: '+250', date: 'Aug 10, 2026', type: 'earn' },
];

export const UserLoyalty = ({ myOrders }) => {
  const { loyaltyProgram, navigatePage } = useStore();

  const totalSpent = myOrders.reduce((acc, o) => acc + (o.total || 0), 0);
  const pointsPerDollar = loyaltyProgram?.pointsPerDollar || 10;
  const redemptionRate = loyaltyProgram?.redemptionRate || 100;
  const totalPoints = Math.floor(totalSpent * pointsPerDollar);
  const cashValue = (totalPoints / redemptionRate).toFixed(2);

  const currentTierIdx = [...TIERS].findLastIndex(t => totalSpent >= t.minSpend);
  const currentTier = TIERS[Math.max(0, currentTierIdx)];
  const nextTier = TIERS[currentTierIdx + 1] || null;
  const progressPct = nextTier
    ? Math.min(100, ((totalSpent - currentTier.minSpend) / (nextTier.minSpend - currentTier.minSpend)) * 100)
    : 100;

  const TierIcon = currentTier.icon;

  return (
    <div className="ud2-orders-page">
      <div className="ud2-page-heading">
        <h2>Coupons &amp; Offers</h2>
        <p>Your loyalty points and membership benefits</p>
      </div>

      {/* Points card */}
      <div className="ud2-loyalty-hero2">
        <div className="ud2-loyalty-pts-wrap">
          <p className="ud2-lh-label">Total Points</p>
          <p className="ud2-lh-pts" style={{ color: currentTier.color }}>{totalPoints.toLocaleString()}</p>
          <p className="ud2-lh-cash"><Gift size={14} /> Redeemable value: <strong>${cashValue}</strong></p>
        </div>
        <div className="ud2-loyalty-tier-wrap">
          <span className="ud2-lh-tier" style={{ color: currentTier.color, background: currentTier.bg }}>
            <TierIcon size={14} /> {currentTier.name}
          </span>
        </div>
      </div>

      {/* Progress */}
      {nextTier && (
        <div className="ud2-section-card">
          <div className="ud2-loyalty-prog-header">
            <span>Progress to <strong style={{ color: nextTier.color }}>{nextTier.name}</strong></span>
            <span>${(nextTier.minSpend - totalSpent).toFixed(2)} more needed</span>
          </div>
          <div className="ud2-prog-bar">
            <div className="ud2-prog-fill" style={{ width: `${progressPct}%`, background: nextTier.color }} />
          </div>
        </div>
      )}

      {/* Tiers grid */}
      <div className="ud2-tiers2-grid">
        {TIERS.map(tier => {
          const Icon = tier.icon;
          const isActive = tier.name === currentTier.name;
          const isUnlocked = totalSpent >= tier.minSpend;
          return (
            <div key={tier.name} className={`ud2-tier2-card ${isActive ? 'active' : ''} ${!isUnlocked ? 'locked' : ''}`}
              style={isActive ? { borderColor: tier.color, borderWidth: '2px' } : {}}>
              <div className="ud2-tier2-top">
                <div className="ud2-tier2-icon" style={{ background: tier.bg, color: tier.color }}>
                  <Icon size={16} />
                </div>
                <div>
                  <p className="ud2-tier2-name" style={isActive ? { color: tier.color } : {}}>
                    {tier.name}
                    {isActive && <span className="ud2-tier2-curr">Current</span>}
                  </p>
                  <p className="ud2-tier2-thresh">Min. ${tier.minSpend.toLocaleString()} spend</p>
                </div>
              </div>
              <ul className="ud2-tier2-perks">
                {tier.perks.map(p => (
                  <li key={p}><span style={{ color: tier.color }}>✓</span> {p}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* History */}
      <div className="ud2-section-card">
        <h3 style={{ marginBottom: 16 }}>Points History</h3>
        {totalPoints === 0 ? (
          <div className="ud2-empty-page">
            <ShoppingBag size={40} />
            <p>No points yet. Start shopping to earn!</p>
            <button onClick={() => navigatePage('shop')}>Browse Products</button>
          </div>
        ) : (
          <div className="ud2-hist-list">
            {HISTORY.map((h, i) => (
              <div className="ud2-hist-row" key={i}>
                <div className="ud2-hist-dot" style={{ background: h.type === 'earn' ? '#16a34a' : '#d97706' }} />
                <div className="ud2-hist-info">
                  <p>{h.label}</p>
                  <span>{h.date}</span>
                </div>
                <span className="ud2-hist-pts" style={{ color: h.type === 'earn' ? '#16a34a' : '#d97706' }}>
                  {h.pts} pts
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
