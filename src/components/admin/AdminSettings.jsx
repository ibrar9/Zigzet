import React, { useState } from 'react';
import { Save, RotateCcw, ShieldCheck, DollarSign, Bell } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminSettings = () => {
  const { settings, updateSettings, resetToDefaults } = useStore();

  const [formSettings, setFormSettings] = useState({ ...settings });

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
    <div style={{ maxWidth: '720px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Store Configuration</h2>
        <p style={{ fontSize: '13.5px', color: '#6b7280' }}>Manage global eCommerce parameters, announcements, and shipping thresholds</p>
      </div>

      <div className="admin-card-box" style={{ padding: '28px' }}>
        <form onSubmit={handleSave}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="form-group">
              <label>Top Announcement Notice</label>
              <input
                type="text"
                name="announcement"
                value={formSettings.announcement}
                onChange={handleChange}
                placeholder="⭐ Free Shipping on Orders Over $50 (USA Only)"
              />
              <span style={{ fontSize: '12px', color: '#6b7280' }}>
                Displayed at the very top of every page in the store
              </span>
            </div>

            <div className="checkout-form-grid">
              <div className="form-group">
                <label>Free Shipping Minimum ($)</label>
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
                <label>Default Currency</label>
                <select name="currency" value={formSettings.currency} onChange={handleChange}>
                  <option value="USD">USD ($ - United States Dollar)</option>
                  <option value="EUR">EUR (€ - Euro)</option>
                  <option value="GBP">GBP (£ - British Pound)</option>
                  <option value="CAD">CAD ($ - Canadian Dollar)</option>
                </select>
              </div>
            </div>

            <div className="checkout-form-grid">
              <div className="form-group">
                <label>Store Name</label>
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

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
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
                  fontWeight: '600'
                }}
              >
                <RotateCcw size={15} />
                <span>Reset Demo Store Data</span>
              </button>

              <button
                type="submit"
                className="hero-cta-btn"
                style={{ padding: '10px 24px', fontSize: '13.5px' }}
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
