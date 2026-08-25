import React, { useState } from 'react';
import { 
  Zap, 
  Clock, 
  Calendar, 
  Percent, 
  Save, 
  CheckCircle2, 
  Play, 
  Pause,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminCampaigns = () => {
  const { campaign, updateCampaign, showToast } = useStore();

  const [form, setForm] = useState({
    name: campaign.name || 'Labor Day Mega Flash Sale',
    headline: campaign.headline || 'Limited-Time Weekend Clearance: Up to 35% Off Everything',
    discountPercent: campaign.discountPercent || 20,
    isActive: campaign.isActive !== undefined ? campaign.isActive : true,
    endsAt: campaign.endsAt ? campaign.endsAt.split('T')[0] : '2026-09-10'
  });

  const handleSave = (e) => {
    e.preventDefault();
    updateCampaign({
      ...form,
      discountPercent: parseInt(form.discountPercent) || 15,
      endsAt: `${form.endsAt}T23:59:59`
    });
  };

  return (
    <div className="admin-page-container" style={{ maxWidth: '900px' }}>
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-section-title">Flash Sale & Campaign Timer Manager</h2>
          <p className="admin-section-desc">Schedule store-wide flash discount events and configure the live storefront urgency countdown timer</p>
        </div>
      </div>

      {/* Live Preview Banner Card */}
      <div 
        className="dash-card" 
        style={{ 
          background: form.isActive ? 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)' : '#f1f5f9', 
          color: form.isActive ? '#ffffff' : '#64748b',
          padding: '24px 28px',
          marginBottom: '24px',
          borderRadius: '16px',
          border: 'none',
          boxShadow: form.isActive ? '0 12px 28px -6px rgba(124, 58, 237, 0.35)' : 'none'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: form.isActive ? 'rgba(255, 255, 255, 0.2)' : '#e2e8f0', padding: '4px 10px', borderRadius: '9999px', fontSize: '11.5px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <Zap size={13} fill={form.isActive ? '#fde047' : '#94a3b8'} color={form.isActive ? '#fde047' : '#94a3b8'} />
              <span>{form.isActive ? 'FLASH SALE IS LIVE ON STORE' : 'CAMPAIGN CURRENTLY PAUSED'}</span>
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginTop: '8px', color: form.isActive ? '#ffffff' : '#1e293b' }}>
              {form.headline}
            </h3>
            <p style={{ fontSize: '13px', opacity: 0.9, marginTop: '2px', color: form.isActive ? '#e0e7ff' : '#64748b' }}>
              Customers receive an automatic {form.discountPercent}% checkout voucher.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ background: form.isActive ? 'rgba(0, 0, 0, 0.25)' : '#ffffff', padding: '10px 14px', borderRadius: '10px', textAlign: 'center', minWidth: '60px' }}>
              <span style={{ fontSize: '18px', fontWeight: '800', display: 'block', color: form.isActive ? '#fff' : '#1e293b' }}>04</span>
              <span style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.8 }}>Days</span>
            </div>
            <span style={{ fontSize: '18px', fontWeight: '800' }}>:</span>
            <div style={{ background: form.isActive ? 'rgba(0, 0, 0, 0.25)' : '#ffffff', padding: '10px 14px', borderRadius: '10px', textAlign: 'center', minWidth: '60px' }}>
              <span style={{ fontSize: '18px', fontWeight: '800', display: 'block', color: form.isActive ? '#fff' : '#1e293b' }}>16</span>
              <span style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.8 }}>Hours</span>
            </div>
            <span style={{ fontSize: '18px', fontWeight: '800' }}>:</span>
            <div style={{ background: form.isActive ? 'rgba(0, 0, 0, 0.25)' : '#ffffff', padding: '10px 14px', borderRadius: '10px', textAlign: 'center', minWidth: '60px' }}>
              <span style={{ fontSize: '18px', fontWeight: '800', display: 'block', color: form.isActive ? '#fff' : '#1e293b' }}>42</span>
              <span style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.8 }}>Mins</span>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Settings Form */}
      <div className="dash-card" style={{ padding: '32px' }}>
        <form onSubmit={handleSave}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {/* Status Switch */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div>
                <h4 style={{ fontSize: '14.5px', fontWeight: '700', color: '#0f172a' }}>Activate Campaign on Storefront</h4>
                <p style={{ fontSize: '12.5px', color: '#64748b' }}>When enabled, the flash sale banner and live countdown timer will appear at the top of the homepage.</p>
              </div>

              <label className="ios-switch">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                />
                <span className="slider round"></span>
              </label>
            </div>

            {/* Campaign Name */}
            <div className="form-group">
              <label>Internal Campaign Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Black Friday 2026 Mega Sale"
                required
              />
            </div>

            {/* Public Headline */}
            <div className="form-group">
              <label>Storefront Public Banner Headline *</label>
              <input
                type="text"
                value={form.headline}
                onChange={(e) => setForm({ ...form, headline: e.target.value })}
                placeholder="e.g. Weekend Clearance: Up to 35% Off Everything"
                required
              />
            </div>

            {/* Discount & End Date */}
            <div className="checkout-form-grid">
              <div className="form-group">
                <label>Automatic Discount Percentage (%)</label>
                <input
                  type="number"
                  value={form.discountPercent}
                  onChange={(e) => setForm({ ...form, discountPercent: e.target.value })}
                  min="5"
                  max="90"
                  required
                />
              </div>

              <div className="form-group">
                <label>Campaign Expiry Date</label>
                <input
                  type="date"
                  value={form.endsAt}
                  onChange={(e) => setForm({ ...form, endsAt: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Save Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
              <button
                type="submit"
                className="hero-cta-btn"
                style={{ padding: '10px 28px', fontSize: '13.5px' }}
              >
                <Save size={15} />
                <span>Save Campaign Settings</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
