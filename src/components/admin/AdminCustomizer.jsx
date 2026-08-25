import React, { useState } from 'react';
import { 
  Palette, 
  Layout, 
  Image as ImageIcon, 
  Save, 
  Eye, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw,
  Type
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminCustomizer = () => {
  const { cmsContent, updateCmsContent, showToast } = useStore();

  const [form, setForm] = useState({ ...cmsContent });

  const handleSave = (e) => {
    e.preventDefault();
    updateCmsContent(form);
  };

  return (
    <div className="admin-page-container">
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-section-title">Visual Homepage & Hero CMS Customizer</h2>
          <p className="admin-section-desc">Edit storefront headlines, hero photography, announcement banners, and Call-to-Action buttons with zero code</p>
        </div>
      </div>

      {/* Live Preview Card */}
      <div className="dash-card" style={{ marginBottom: '24px', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Eye size={16} color="#7c3aed" />
          <span style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', color: '#7c3aed', letterSpacing: '0.05em' }}>
            Storefront Live Hero Preview
          </span>
        </div>

        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'center' }}>
          <div>
            <span style={{ display: 'inline-block', background: '#ecfdf5', color: '#10b981', fontSize: '11px', fontWeight: '800', padding: '4px 10px', borderRadius: '9999px', letterSpacing: '0.05em', marginBottom: '12px' }}>
              {form.heroBadge || 'LATEST ARRIVALS 2026'}
            </span>
            <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', lineHeight: '1.2', marginBottom: '10px' }}>
              {form.heroTitle || 'Shop Smarter. Live Better.'}
            </h1>
            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', marginBottom: '18px' }}>
              {form.heroSubtitle || 'Discover curated electronics, trending modern apparel, and functional home essentials.'}
            </p>
            <button className="hero-cta-btn" style={{ padding: '10px 22px', fontSize: '13px' }}>
              {form.ctaText || 'Explore Catalog'}
            </button>
          </div>

          <div style={{ height: '200px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#fff' }}>
            <img
              src={form.heroImage}
              alt="Hero Preview"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';
              }}
            />
          </div>
        </div>
      </div>

      {/* Editor Form */}
      <div className="dash-card" style={{ padding: '32px' }}>
        <form onSubmit={handleSave}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="checkout-form-grid">
              {/* Hero Badge */}
              <div className="form-group">
                <label>Top Pill Badge Text</label>
                <input
                  type="text"
                  value={form.heroBadge}
                  onChange={(e) => setForm({ ...form, heroBadge: e.target.value })}
                  placeholder="e.g. LATEST ARRIVALS 2026"
                />
              </div>

              {/* CTA Button Text */}
              <div className="form-group">
                <label>Main Button Text</label>
                <input
                  type="text"
                  value={form.ctaText}
                  onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
                  placeholder="e.g. Explore Catalog"
                />
              </div>
            </div>

            {/* Main Headline */}
            <div className="form-group">
              <label>Hero Main Headline *</label>
              <input
                type="text"
                value={form.heroTitle}
                onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
                placeholder="e.g. Shop Smarter. Live Better."
                required
              />
            </div>

            {/* Subtitle */}
            <div className="form-group">
              <label>Hero Subtitle Description</label>
              <textarea
                rows="3"
                value={form.heroSubtitle}
                onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
                placeholder="Brief brand tagline describing your collection and value proposition..."
              />
            </div>

            {/* Hero Image URL */}
            <div className="form-group">
              <label>Hero Photography / Banner URL</label>
              <input
                type="url"
                value={form.heroImage}
                onChange={(e) => setForm({ ...form, heroImage: e.target.value })}
                placeholder="https://images.unsplash.com/photo-..."
              />
            </div>

            {/* Save Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px', paddingTop: '18px', borderTop: '1px solid #e2e8f0' }}>
              <button
                type="submit"
                className="hero-cta-btn"
                style={{ padding: '10px 28px', fontSize: '13.5px' }}
              >
                <Save size={15} />
                <span>Save Homepage Content</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
