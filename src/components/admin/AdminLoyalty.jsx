import React, { useState } from 'react';
import { 
  Award, 
  Coins, 
  Crown, 
  Users, 
  Save, 
  CheckCircle2, 
  Sparkles, 
  Gift, 
  Percent,
  Search
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminLoyalty = () => {
  const { loyaltyProgram, updateLoyaltyProgram, customers, showToast } = useStore();

  const [form, setForm] = useState({ ...loyaltyProgram });

  const handleSave = (e) => {
    e.preventDefault();
    updateLoyaltyProgram(form);
  };

  return (
    <div className="admin-page-container">
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-section-title">Customer Loyalty Points & VIP Rewards Engine</h2>
          <p className="admin-section-desc">Manage store rewards currency, VIP membership tier thresholds, and point redemption rates</p>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="admin-overview-stats-grid">
        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper purple">
            <Coins size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Points Issued</span>
            <span className="stat-main-number">48,920</span>
            <span className="stat-sub-text">Total rewards currency</span>
          </div>
        </div>

        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper emerald">
            <Crown size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">VIP Members</span>
            <span className="stat-main-number">
              {customers.filter((c) => c.status === 'VIP Customer').length + 12}
            </span>
            <span className="stat-sub-text">Gold & Platinum tier</span>
          </div>
        </div>

        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper blue">
            <Gift size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Points Redeemed</span>
            <span className="stat-main-number">14,200</span>
            <span className="stat-sub-text">Claimed at checkout</span>
          </div>
        </div>

        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper orange">
            <Award size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Repeat Order Rate</span>
            <span className="stat-main-number">46.2%</span>
            <span className="stat-sub-text">Boosted by rewards</span>
          </div>
        </div>
      </div>

      {/* Tiers Overview & Configuration Form */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {/* Tier Cards List */}
        <div className="dash-card">
          <div style={{ marginBottom: '18px', paddingBottom: '12px', borderBottom: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>VIP Membership Tiers</h3>
            <p style={{ fontSize: '12.5px', color: '#64748b' }}>Automated tier progression based on lifetime store spend</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {form.tiers && form.tiers.map((t, idx) => (
              <div
                key={idx}
                style={{
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  background: idx === 3 ? '#faf5ff' : '#ffffff',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Crown size={14} color={idx === 3 ? '#7c3aed' : idx === 2 ? '#f59e0b' : '#64748b'} />
                    <span style={{ fontWeight: '800', color: '#0f172a', fontSize: '14px' }}>{t.name}</span>
                  </div>
                  <span style={{ fontSize: '12px', color: '#64748b', marginTop: '2px', display: 'block' }}>
                    {t.perks}
                  </span>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: '#7c3aed' }}>
                    ${t.minSpend}+ Spend
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings Form */}
        <div className="dash-card">
          <div style={{ marginBottom: '18px', paddingBottom: '12px', borderBottom: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>Points Conversion Rates</h3>
            <p style={{ fontSize: '12.5px', color: '#64748b' }}>Set point earning velocity and cart redemption exchange values</p>
          </div>

          <form onSubmit={handleSave}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label>Points Earned Per $1.00 Spent</label>
                <input
                  type="number"
                  value={form.pointsPerDollar}
                  onChange={(e) => setForm({ ...form, pointsPerDollar: parseInt(e.target.value) || 10 })}
                  min="1"
                  required
                />
                <span style={{ fontSize: '12px', color: '#64748b' }}>Customer receives 10 points for every dollar checked out.</span>
              </div>

              <div className="form-group">
                <label>Redemption Exchange Rate (Points per $1.00 Discount)</label>
                <input
                  type="number"
                  value={form.redemptionRate}
                  onChange={(e) => setForm({ ...form, redemptionRate: parseInt(e.target.value) || 100 })}
                  min="10"
                  required
                />
                <span style={{ fontSize: '12px', color: '#64748b' }}>100 points = $1.00 off instant discount at checkout.</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button
                  type="submit"
                  className="hero-cta-btn"
                  style={{ padding: '10px 24px', fontSize: '13px' }}
                >
                  <Save size={15} />
                  <span>Save Loyalty Rules</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
