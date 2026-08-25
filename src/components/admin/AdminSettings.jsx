import React, { useState } from 'react';
import { Save, RotateCcw, ShieldCheck, DollarSign, Bell, Store, Mail, Globe } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CustomDropdown } from '../common/CustomDropdown';

export const AdminSettings = () => {
  const { settings, updateSettings, resetToDefaults } = useStore();

  const [formSettings, setFormSettings] = useState({ ...settings });

  const currencyOptions = [
    { value: 'USD', label: 'USD ($ - United States Dollar)', dot: '#3b82f6' },
    { value: 'EUR', label: 'EUR (€ - European Union Euro)', dot: '#8b5cf6' },
    { value: 'GBP', label: 'GBP (£ - British Pound)', dot: '#10b981' },
    { value: 'CAD', label: 'CAD ($ - Canadian Dollar)', dot: '#f97316' }
  ];

  const handleChange = (e) => {
    setFormSettings({ ...formSettings, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateSettings({
      ...formSettings,
      freeShippingThreshold: parseFloat(formSettings.freeShippingThreshold) || 50
    });
  };

  return (
    <div className="admin-page-container" style={{ maxWidth: '820px' }}>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-section-title">Store Configuration & Preferences</h2>
          <p className="admin-section-desc">Manage global eCommerce parameters, announcements, shipping thresholds, and currency</p>
        </div>
      </div>

      <div className="dash-card" style={{ padding: '32px' }}>
        <form onSubmit={handleSave}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {/* Top Announcement Bar */}
            <div className="form-group">
              <label>Top Store Announcement Notice</label>
              <input
                type="text"
                name="announcement"
                value={formSettings.announcement}
                onChange={handleChange}
                placeholder="Free Shipping on Orders Over $50 (USA & Worldwide)"
              />
              <span style={{ fontSize: '12px', color: '#64748b', marginTop: '4px', display: 'block' }}>
                Displayed across the very top notification ticker on the customer storefront.
              </span>
            </div>

            {/* Free Shipping & Currency */}
            <div className="checkout-form-grid">
              <div className="form-group">
                <label>Free Shipping Minimum Threshold ($)</label>
                <input
                  type="number"
                  name="freeShippingThreshold"
                  value={formSettings.freeShippingThreshold}
                  onChange={handleChange}
                  min="0"
                  step="1"
                />
              </div>

              <div className="form-group">
                <label>Store Currency</label>
                <CustomDropdown
                  options={currencyOptions}
                  value={formSettings.currency}
                  onChange={(val) => setFormSettings({ ...formSettings, currency: val })}
                  width="100%"
                />
              </div>
            </div>

            {/* Store Name & Contact Email */}
            <div className="checkout-form-grid">
              <div className="form-group">
                <label>Store Brand Name</label>
                <input
                  type="text"
                  name="storeName"
                  value={formSettings.storeName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Support Contact Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formSettings.contactEmail}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '24px', borderTop: '1px solid #e2e8f0', flexWrap: 'wrap', gap: '12px' }}>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Reset all products and orders to initial demo state?')) {
                    resetToDefaults();
                  }
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#ef4444',
                  fontSize: '13px',
                  fontWeight: '600',
                  padding: '8px 14px',
                  background: '#fef2f2',
                  borderRadius: '8px'
                }}
              >
                <RotateCcw size={15} />
                <span>Reset Demo Store Data</span>
              </button>

              <button
                type="submit"
                className="hero-cta-btn"
                style={{ padding: '10px 28px', fontSize: '13.5px' }}
              >
                <Save size={15} />
                <span>Save Settings</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
