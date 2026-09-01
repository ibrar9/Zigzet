import React, { useState, useRef } from 'react';
import { 
  Save, RotateCcw, ShieldCheck, DollarSign, Bell, Store, 
  Mail, Globe, Image, Upload, Trash2, Sparkles, ExternalLink,
  Phone, MapPin, Eye, CheckCircle2
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CustomDropdown } from '../common/CustomDropdown';

export const AdminSettings = () => {
  const { settings, updateSettings, resetToDefaults, showToast } = useStore();

  const [formSettings, setFormSettings] = useState({
    storeName: 'Zigzet',
    logoUrl: '',
    faviconUrl: '',
    announcement: 'Free Express Delivery Across UAE on Orders Over 150 AED',
    freeShippingThreshold: 150,
    currency: 'AED',
    contactEmail: 'support@zigzet.com',
    contactPhone: '+971 50 123 4567',
    taxRate: 5,
    ...settings
  });

  const logoInputRef = useRef(null);
  const faviconInputRef = useRef(null);

  const currencyOptions = [
    { value: 'AED', label: 'AED (د.إ - UAE Dirham)', dot: '#10b981' },
    { value: 'USD', label: 'USD ($ - United States Dollar)', dot: '#3b82f6' },
    { value: 'SAR', label: 'SAR (﷼ - Saudi Riyal)', dot: '#059669' },
    { value: 'EUR', label: 'EUR (€ - European Union Euro)', dot: '#8b5cf6' },
    { value: 'GBP', label: 'GBP (£ - British Pound)', dot: '#6366f1' },
    { value: 'CAD', label: 'CAD ($ - Canadian Dollar)', dot: '#f97316' }
  ];

  const handleChange = (e) => {
    setFormSettings({ ...formSettings, [e.target.name]: e.target.value });
  };

  // Handle Logo File Upload (converts to Base64)
  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showToast('Image Too Large', 'Please upload a logo image smaller than 2MB', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormSettings(prev => ({ ...prev, logoUrl: event.target.result }));
      showToast('Logo Uploaded', 'Store logo updated successfully in preview');
    };
    reader.readAsDataURL(file);
  };

  // Handle Favicon File Upload (converts to Base64)
  const handleFaviconUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1 * 1024 * 1024) {
      showToast('Favicon Too Large', 'Please upload a favicon smaller than 1MB', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormSettings(prev => ({ ...prev, faviconUrl: event.target.result }));
      showToast('Favicon Uploaded', 'Website favicon updated in preview');
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateSettings({
      ...formSettings,
      freeShippingThreshold: parseFloat(formSettings.freeShippingThreshold) || 50,
      taxRate: parseFloat(formSettings.taxRate) || 5
    });

    // Update document favicon immediately
    if (formSettings.faviconUrl) {
      let faviconTag = document.querySelector("link[rel*='icon']");
      if (!faviconTag) {
        faviconTag = document.createElement('link');
        faviconTag.rel = 'icon';
        document.head.appendChild(faviconTag);
      }
      faviconTag.href = formSettings.faviconUrl;
    }

    showToast('Settings Saved', 'Store brand identity, logo, favicon, and preferences have been updated!');
  };

  return (
    <div className="admin-page-container" style={{ maxWidth: '880px' }}>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-section-title">Store Branding & Configuration</h2>
          <p className="admin-section-desc">Manage your logo, favicon, store details, currency, and global customer preferences</p>
        </div>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* =========================================================================
            1. BRAND MEDIA & ASSETS (LOGO & FAVICON)
            ========================================================================= */}
        <div className="dash-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ede9fe', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Store Brand Media (Logo & Favicon)</h3>
              <p style={{ fontSize: '12.5px', color: '#64748b', margin: '2px 0 0 0' }}>Upload custom brand assets to display across header, footer, invoices, and browser tabs</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            
            {/* Store Logo Card */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '13.5px', fontWeight: '700', color: '#1e293b' }}>Store Logo</label>
                {formSettings.logoUrl && (
                  <button
                    type="button"
                    onClick={() => setFormSettings(prev => ({ ...prev, logoUrl: '' }))}
                    style={{ background: 'transparent', border: 'none', color: '#ef4444', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Trash2 size={13} /> Remove
                  </button>
                )}
              </div>

              {/* Logo Preview Box */}
              <div style={{
                height: '80px',
                borderRadius: '12px',
                border: '2px dashed #cbd5e1',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px',
                overflow: 'hidden'
              }}>
                {formSettings.logoUrl ? (
                  <img
                    src={formSettings.logoUrl}
                    alt="Store Logo Preview"
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '13px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#7c3aed" />
                        <path d="M2 17L12 22L22 17" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 12L12 17L22 12" stroke="#9333ea" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span>Default SVG Icon + "{formSettings.storeName || 'Zigzet'}"</span>
                  </div>
                )}
              </div>

              {/* Upload & URL Inputs */}
              <input
                type="file"
                ref={logoInputRef}
                onChange={handleLogoUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => logoInputRef.current?.click()}
                  className="order-action-secondary-btn"
                  style={{ flex: 1, justifyContent: 'center', padding: '9px 12px', fontSize: '12.5px' }}
                >
                  <Upload size={14} /> Upload Logo File
                </button>
              </div>

              <div>
                <span style={{ fontSize: '11.5px', color: '#64748b', marginBottom: '4px', display: 'block' }}>Or enter Image URL:</span>
                <input
                  type="url"
                  name="logoUrl"
                  value={formSettings.logoUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/logo.png"
                  style={{ fontSize: '12px', padding: '8px 12px' }}
                />
              </div>
            </div>

            {/* Website Favicon Card */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '13.5px', fontWeight: '700', color: '#1e293b' }}>Website Favicon</label>
                {formSettings.faviconUrl && (
                  <button
                    type="button"
                    onClick={() => setFormSettings(prev => ({ ...prev, faviconUrl: '' }))}
                    style={{ background: 'transparent', border: 'none', color: '#ef4444', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Trash2 size={13} /> Remove
                  </button>
                )}
              </div>

              {/* Browser Tab Simulation Preview */}
              <div style={{
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                background: '#e2e8f0',
                padding: '6px 10px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <div style={{
                  background: '#ffffff',
                  borderRadius: '8px 8px 0 0',
                  padding: '6px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                  maxWidth: '220px',
                  overflow: 'hidden'
                }}>
                  {formSettings.faviconUrl ? (
                    <img
                      src={formSettings.faviconUrl}
                      alt="Favicon"
                      style={{ width: '16px', height: '16px', objectFit: 'contain', flexShrink: 0, borderRadius: '2px' }}
                    />
                  ) : (
                    <div style={{ width: '16px', height: '16px', borderRadius: '3px', background: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '9px', fontWeight: '900', flexShrink: 0 }}>
                      Z
                    </div>
                  )}
                  <span style={{ fontSize: '11px', fontWeight: '600', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {formSettings.storeName || 'Zigzet'} - Shop Smarter...
                  </span>
                </div>
              </div>

              {/* Upload & URL Inputs */}
              <input
                type="file"
                ref={faviconInputRef}
                onChange={handleFaviconUpload}
                accept="image/*,.ico"
                style={{ display: 'none' }}
              />

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => faviconInputRef.current?.click()}
                  className="order-action-secondary-btn"
                  style={{ flex: 1, justifyContent: 'center', padding: '9px 12px', fontSize: '12.5px' }}
                >
                  <Upload size={14} /> Upload Favicon File
                </button>
              </div>

              <div>
                <span style={{ fontSize: '11.5px', color: '#64748b', marginBottom: '4px', display: 'block' }}>Or enter Favicon URL:</span>
                <input
                  type="url"
                  name="faviconUrl"
                  value={formSettings.faviconUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/favicon.png"
                  style={{ fontSize: '12px', padding: '8px 12px' }}
                />
              </div>
            </div>

          </div>
        </div>

        {/* =========================================================================
            2. STORE GENERAL INFO & CONTACT DETAILS
            ========================================================================= */}
        <div className="dash-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Store size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>General Store Information</h3>
              <p style={{ fontSize: '12.5px', color: '#64748b', margin: '2px 0 0 0' }}>Brand identity, support emails, and phone numbers</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div className="checkout-form-grid">
              <div className="form-group">
                <label>Store Brand Name</label>
                <input
                  type="text"
                  name="storeName"
                  value={formSettings.storeName}
                  onChange={handleChange}
                  placeholder="Zigzet"
                  required
                />
              </div>

              <div className="form-group">
                <label>Support Contact Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formSettings.contactEmail}
                  onChange={handleChange}
                  placeholder="support@zigzet.com"
                />
              </div>
            </div>

            <div className="checkout-form-grid">
              <div className="form-group">
                <label>Support Contact Phone / WhatsApp</label>
                <input
                  type="text"
                  name="contactPhone"
                  value={formSettings.contactPhone || ''}
                  onChange={handleChange}
                  placeholder="+971 50 123 4567"
                />
              </div>

              <div className="form-group">
                <label>Estimated VAT / Tax Rate (%)</label>
                <input
                  type="number"
                  name="taxRate"
                  value={formSettings.taxRate ?? 5}
                  onChange={handleChange}
                  min="0"
                  max="50"
                  step="0.5"
                />
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3. STORE COMMERCE & ANNOUNCEMENTS
            ========================================================================= */}
        <div className="dash-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bell size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Commerce & Announcements</h3>
              <p style={{ fontSize: '12.5px', color: '#64748b', margin: '2px 0 0 0' }}>Manage top announcement ticker, shipping thresholds, and default currency</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Top Announcement Bar */}
            <div className="form-group">
              <label>Top Store Announcement Notice</label>
              <input
                type="text"
                name="announcement"
                value={formSettings.announcement}
                onChange={handleChange}
                placeholder="Free Express Delivery Across UAE on Orders Over 150 AED"
              />
              <span style={{ fontSize: '12px', color: '#64748b', marginTop: '4px', display: 'block' }}>
                Displayed across the very top notification ticker on the customer storefront.
              </span>
            </div>

            {/* Free Shipping & Currency */}
            <div className="checkout-form-grid">
              <div className="form-group">
                <label>Free Shipping Minimum Threshold</label>
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
                <label>Store Default Currency</label>
                <CustomDropdown
                  options={currencyOptions}
                  value={formSettings.currency}
                  onChange={(val) => setFormSettings({ ...formSettings, currency: val })}
                  width="100%"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', padding: '16px 0' }}>
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset all store settings and sample products to default demo state?')) {
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
              padding: '10px 16px',
              background: '#fef2f2',
              border: '1px solid #fee2e2',
              borderRadius: '10px',
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={15} />
            <span>Reset Demo Store Data</span>
          </button>

          <button
            type="submit"
            className="hero-cta-btn"
            style={{ padding: '12px 32px', fontSize: '14px', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Save size={16} />
            <span>Save All Changes</span>
          </button>
        </div>

      </form>
    </div>
  );
};
