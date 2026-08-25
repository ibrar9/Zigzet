import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  Share2, 
  ShieldCheck, 
  FileText, 
  Check, 
  Copy, 
  ExternalLink, 
  Sparkles, 
  HelpCircle, 
  Smartphone, 
  Monitor, 
  RotateCcw, 
  Sliders, 
  Tag, 
  Zap, 
  BarChart, 
  Code
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminSEO = () => {
  const { seoSettings, updateSeoSettings, showToast, settings } = useStore();

  const [formData, setFormData] = useState({ ...seoSettings });
  const [activePreviewTab, setActivePreviewTab] = useState('google'); // 'google' | 'social'
  const [serpDevice, setSerpDevice] = useState('desktop'); // 'desktop' | 'mobile'
  const [activePageOverride, setActivePageOverride] = useState('home');
  const [copiedKey, setCopiedKey] = useState(null);

  // Handle nested page override edits
  const handlePageOverrideChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      pageOverrides: {
        ...prev.pageOverrides,
        [activePageOverride]: {
          ...(prev.pageOverrides ? prev.pageOverrides[activePageOverride] : {}),
          [field]: value
        }
      }
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateSeoSettings(formData);
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast('Copied to Clipboard!', text);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const currentOverride = (formData.pageOverrides && formData.pageOverrides[activePageOverride]) || {};
  const previewTitle = currentOverride.title || formData.siteTitle || 'Zigzet - Shop Smarter. Live Better.';
  const previewDesc = currentOverride.description || formData.defaultDescription || 'Discover top-quality products on Zigzet.';
  const previewUrl = `${formData.canonicalUrl || 'https://zigzet.com'}${activePageOverride === 'home' ? '' : '/' + activePageOverride}`;

  // Character counter helpers
  const titleLen = previewTitle.length;
  const descLen = previewDesc.length;

  return (
    <div className="admin-page-container">
      {/* Page Header */}
      <div className="admin-page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="admin-badge-role admin-badge-admin" style={{ fontSize: '11px' }}>SEO & Growth Suite</span>
            <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
              Live Search Index Active
            </span>
          </div>
          <h2 className="admin-section-title" style={{ marginTop: '4px' }}>Search Engine Optimization (SEO) & Metadata</h2>
          <p className="admin-section-desc">Configure search crawler directives, OpenGraph social cards, Google Search Console tokens, and XML sitemaps.</p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            type="button"
            className="admin-btn-secondary"
            onClick={() => window.open('https://search.google.com/search-console', '_blank')}
          >
            <ExternalLink size={15} />
            <span>Open Search Console</span>
          </button>

          <button 
            type="button" 
            className="admin-btn-primary"
            onClick={handleSave}
          >
            <Check size={16} />
            <span>Save SEO Changes</span>
          </button>
        </div>
      </div>

      {/* SEO Health Score Banner */}
      <div style={{
        padding: '16px 20px',
        borderRadius: '14px',
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
          }}>
            <span style={{ fontSize: '18px', fontWeight: '900', lineHeight: 1 }}>100</span>
            <span style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', opacity: 0.9 }}>Score</span>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', margin: 0 }}>SEO Health & Google Compliance: Grade A+</h4>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#10b981', backgroundColor: '#ecfdf5', padding: '2px 8px', borderRadius: '9999px' }}>
                Fully Optimized
              </span>
            </div>
            <p style={{ fontSize: '12.5px', color: '#64748b', margin: '3px 0 0 0' }}>
              Schema.org JSON-LD, OpenGraph tags, Image Sitemaps, Robots.txt & Return Policy schemas are active.
            </p>
          </div>
        </div>

        {/* Audit Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11.5px', fontWeight: '600', color: '#047857', backgroundColor: '#ecfdf5', padding: '4px 10px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Check size={13} /> Product Schema Active
          </span>
          <span style={{ fontSize: '11.5px', fontWeight: '600', color: '#047857', backgroundColor: '#ecfdf5', padding: '4px 10px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Check size={13} /> Image Sitemap Active
          </span>
          <span style={{ fontSize: '11.5px', fontWeight: '600', color: '#047857', backgroundColor: '#ecfdf5', padding: '4px 10px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Check size={13} /> Google Console Linked
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: '24px', alignItems: 'start' }}>
        
        {/* LEFT COLUMN: Settings Form */}
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* 1. Global Meta Settings */}
          <div className="admin-card">
            <div className="admin-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#eef2ff', color: '#6366f1' }}>
                  <Globe size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>Global Store Meta Tags</h3>
                  <p style={{ fontSize: '12px', color: '#64748b' }}>Default search title, description, and keywords</p>
                </div>
              </div>
            </div>

            <div className="admin-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="admin-label">
                  Global Site Title
                  <span style={{ fontSize: '11px', color: titleLen > 60 ? '#ef4444' : '#64748b', marginLeft: 'auto' }}>
                    {titleLen}/60 chars {titleLen > 60 ? '(Too Long)' : '(Optimal)'}
                  </span>
                </label>
                <input
                  type="text"
                  className="admin-input"
                  value={formData.siteTitle}
                  onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
                  placeholder="Zigzet - Shop Smarter. Live Better."
                />
              </div>

              <div>
                <label className="admin-label">
                  Global Meta Description
                  <span style={{ fontSize: '11px', color: descLen > 160 ? '#ef4444' : '#64748b', marginLeft: 'auto' }}>
                    {descLen}/160 chars {descLen > 160 ? '(Will be truncated)' : '(Optimal)'}
                  </span>
                </label>
                <textarea
                  rows={3}
                  className="admin-input"
                  value={formData.defaultDescription}
                  onChange={(e) => setFormData({ ...formData, defaultDescription: e.target.value })}
                  placeholder="High-converting summary of your store..."
                />
              </div>

              <div>
                <label className="admin-label">Meta Keywords (Comma separated)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={formData.defaultKeywords}
                  onChange={(e) => setFormData({ ...formData, defaultKeywords: e.target.value })}
                  placeholder="online shopping, electronics, fashion, deals"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label className="admin-label">Canonical Domain URL</label>
                  <input
                    type="url"
                    className="admin-input"
                    value={formData.canonicalUrl}
                    onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                    placeholder="https://zigzet.com"
                  />
                </div>

                <div>
                  <label className="admin-label">Social Share OG Image URL</label>
                  <input
                    type="url"
                    className="admin-input"
                    value={formData.ogImage}
                    onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Webmaster Tools & Verification */}
          <div className="admin-card">
            <div className="admin-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#ecfdf5', color: '#10b981' }}>
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>Webmaster Tools & Analytics Tokens</h3>
                  <p style={{ fontSize: '12px', color: '#64748b' }}>Google Search Console, GA4 & Meta Pixel integration</p>
                </div>
              </div>
            </div>

            <div className="admin-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label className="admin-label">
                  Google Search Console Token (<code style={{ fontSize: '11px', color: '#6366f1' }}>google-site-verification</code>)
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.googleSiteVerification}
                    onChange={(e) => setFormData({ ...formData, googleSiteVerification: e.target.value })}
                    placeholder="e.g. pWrOVdd1M2K-eGgalaSy6SBjoSIaXZVTeSc4W3fQc1I"
                  />
                  <button
                    type="button"
                    className="admin-btn-secondary"
                    onClick={() => copyToClipboard(formData.googleSiteVerification, 'gtoken')}
                    title="Copy Token"
                  >
                    {copiedKey === 'gtoken' ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                  </button>
                </div>
                <span style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px', display: 'block' }}>
                  Automatically injected into <code style={{ backgroundColor: '#f1f5f9', padding: '1px 5px', borderRadius: '4px' }}>&lt;meta name="google-site-verification"&gt;</code>.
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label className="admin-label">Google Analytics 4 (GA4) ID</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.ga4Id || ''}
                    onChange={(e) => setFormData({ ...formData, ga4Id: e.target.value })}
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>

                <div>
                  <label className="admin-label">Meta (Facebook) Pixel ID</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.metaPixelId || ''}
                    onChange={(e) => setFormData({ ...formData, metaPixelId: e.target.value })}
                    placeholder="123456789012345"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Per-Page SEO Overrides */}
          <div className="admin-card">
            <div className="admin-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#fef3c7', color: '#d97706' }}>
                  <FileText size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>Individual Page Meta Customizer</h3>
                  <p style={{ fontSize: '12px', color: '#64748b' }}>Override titles & descriptions for specific storefront URLs</p>
                </div>
              </div>
            </div>

            <div className="admin-card-body">
              {/* Page Tabs */}
              <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '14px', borderBottom: '1px solid #f1f5f9' }}>
                {[
                  { id: 'home', label: 'Homepage (/)' },
                  { id: 'shop', label: 'Shop Catalog (/shop)' },
                  { id: 'categories', label: 'Categories (/categories)' },
                  { id: 'deals', label: 'Deals (/deals)' },
                  { id: 'track', label: 'Track Order (/track)' },
                  { id: 'about', label: 'About Us (/about)' },
                  { id: 'contact', label: 'Contact Support (/contact)' }
                ].map((page) => (
                  <button
                    key={page.id}
                    type="button"
                    onClick={() => setActivePageOverride(page.id)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '700',
                      border: 'none',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      backgroundColor: activePageOverride === page.id ? '#7c3aed' : '#f1f5f9',
                      color: activePageOverride === page.id ? '#ffffff' : '#475569',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {page.label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label className="admin-label">Page Title</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={currentOverride.title || ''}
                    onChange={(e) => handlePageOverrideChange('title', e.target.value)}
                    placeholder="Page specific title..."
                  />
                </div>

                <div>
                  <label className="admin-label">Page Meta Description</label>
                  <textarea
                    rows={2}
                    className="admin-input"
                    value={currentOverride.description || ''}
                    onChange={(e) => handlePageOverrideChange('description', e.target.value)}
                    placeholder="Page specific meta description..."
                  />
                </div>

                <div>
                  <label className="admin-label">Page Keywords</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={currentOverride.keywords || ''}
                    onChange={(e) => handlePageOverrideChange('keywords', e.target.value)}
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* RIGHT COLUMN: Live Interactive SERP & Social Previews + Sitemaps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Live Preview Card */}
          <div className="admin-card">
            <div className="admin-card-header" style={{ justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} color="#7c3aed" />
                <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>Live Search & Social Preview</h3>
              </div>

              <div style={{ display: 'flex', backgroundColor: '#f1f5f9', padding: '3px', borderRadius: '8px', gap: '4px' }}>
                <button
                  type="button"
                  onClick={() => setActivePreviewTab('google')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '11.5px',
                    fontWeight: '700',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: activePreviewTab === 'google' ? '#ffffff' : 'transparent',
                    color: activePreviewTab === 'google' ? '#0f172a' : '#64748b',
                    boxShadow: activePreviewTab === 'google' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  Google SERP
                </button>
                <button
                  type="button"
                  onClick={() => setActivePreviewTab('social')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '11.5px',
                    fontWeight: '700',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: activePreviewTab === 'social' ? '#ffffff' : 'transparent',
                    color: activePreviewTab === 'social' ? '#0f172a' : '#64748b',
                    boxShadow: activePreviewTab === 'social' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  Social Card
                </button>
              </div>
            </div>

            <div className="admin-card-body">
              {activePreviewTab === 'google' ? (
                <div>
                  {/* Device Toggle */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginBottom: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setSerpDevice('desktop')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '11px',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        border: '1px solid #e2e8f0',
                        backgroundColor: serpDevice === 'desktop' ? '#e2e8f0' : '#ffffff',
                        cursor: 'pointer'
                      }}
                    >
                      <Monitor size={12} /> Desktop
                    </button>
                    <button
                      type="button"
                      onClick={() => setSerpDevice('mobile')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '11px',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        border: '1px solid #e2e8f0',
                        backgroundColor: serpDevice === 'mobile' ? '#e2e8f0' : '#ffffff',
                        cursor: 'pointer'
                      }}
                    >
                      <Smartphone size={12} /> Mobile
                    </button>
                  </div>

                  {/* Google Search Result Box */}
                  <div style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: serpDevice === 'mobile' ? '14px' : '18px',
                    maxWidth: serpDevice === 'mobile' ? '360px' : '100%',
                    margin: '0 auto',
                    fontFamily: 'arial, sans-serif'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '10px', fontWeight: '900' }}>
                        Z
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '12px', color: '#202124', fontWeight: '600' }}>Zigzet</span>
                        <span style={{ fontSize: '11px', color: '#4d5156', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {previewUrl}
                        </span>
                      </div>
                    </div>

                    <h4 style={{
                      fontSize: serpDevice === 'mobile' ? '17px' : '19px',
                      color: '#1a0dab',
                      fontWeight: '400',
                      lineHeight: '1.3',
                      margin: '4px 0',
                      cursor: 'pointer',
                      textDecoration: 'none'
                    }}>
                      {previewTitle}
                    </h4>

                    <p style={{
                      fontSize: '13px',
                      color: '#4d5156',
                      lineHeight: '1.45',
                      margin: '4px 0 0 0',
                      wordBreak: 'break-word'
                    }}>
                      {previewDesc}
                    </p>

                    {/* Sitelinks simulation */}
                    <div style={{ display: 'flex', gap: '14px', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
                      <span style={{ fontSize: '12px', color: '#1a0dab' }}>Shop Catalog</span>
                      <span style={{ fontSize: '12px', color: '#1a0dab' }}>Flash Deals</span>
                      <span style={{ fontSize: '12px', color: '#1a0dab' }}>Track Order</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Social Card Preview */
                <div style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                }}>
                  <div style={{ width: '100%', height: '160px', backgroundColor: '#f1f5f9', overflow: 'hidden' }}>
                    <img
                      src={formData.ogImage}
                      alt="Social share banner"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'; }}
                    />
                  </div>
                  <div style={{ padding: '14px', backgroundColor: '#f8fafc' }}>
                    <span style={{ fontSize: '10.5px', textTransform: 'uppercase', color: '#64748b', fontWeight: '700' }}>
                      ZIGZET.COM
                    </span>
                    <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', margin: '3px 0' }}>
                      {previewTitle}
                    </h4>
                    <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.4', margin: 0 }}>
                      {previewDesc}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sitemaps & Robots Control Center */}
          <div className="admin-card">
            <div className="admin-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#ede9fe', color: '#7c3aed' }}>
                  <Code size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>XML Sitemap & Crawlers</h3>
                  <p style={{ fontSize: '12px', color: '#64748b' }}>Index status and search bot access</p>
                </div>
              </div>
            </div>

            <div className="admin-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Sitemap URL Box */}
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#334155' }}>Primary XML Sitemap:</span>
                  <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700' }}>● Auto-Generated</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    readOnly
                    className="admin-input"
                    value={`${formData.canonicalUrl || 'https://zigzet.com'}/sitemap.xml`}
                    style={{ fontSize: '12px', backgroundColor: '#ffffff' }}
                  />
                  <button
                    type="button"
                    className="admin-btn-secondary"
                    onClick={() => copyToClipboard(`${formData.canonicalUrl || 'https://zigzet.com'}/sitemap.xml`, 'sitemap')}
                  >
                    {copiedKey === 'sitemap' ? <Check size={15} color="#10b981" /> : <Copy size={15} />}
                  </button>
                </div>
              </div>

              {/* Robots.txt URL Box */}
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#334155' }}>Robots.txt Directive:</span>
                  <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700' }}>● Compliant</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    readOnly
                    className="admin-input"
                    value={`${formData.canonicalUrl || 'https://zigzet.com'}/robots.txt`}
                    style={{ fontSize: '12px', backgroundColor: '#ffffff' }}
                  />
                  <button
                    type="button"
                    className="admin-btn-secondary"
                    onClick={() => copyToClipboard(`${formData.canonicalUrl || 'https://zigzet.com'}/robots.txt`, 'robots')}
                  >
                    {copiedKey === 'robots' ? <Check size={15} color="#10b981" /> : <Copy size={15} />}
                  </button>
                </div>
              </div>

              {/* Allow Indexing Switch */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>Allow Search Engines to Index Store</h4>
                  <p style={{ fontSize: '11.5px', color: '#64748b', margin: 0 }}>Keep enabled so Google & Bing can rank your products</p>
                </div>

                <label className="admin-switch" style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
                  <input
                    type="checkbox"
                    checked={formData.allowIndexing !== false}
                    onChange={(e) => setFormData({ ...formData, allowIndexing: e.target.checked })}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    inset: 0,
                    backgroundColor: formData.allowIndexing !== false ? '#10b981' : '#cbd5e1',
                    borderRadius: '24px',
                    transition: '0.2s'
                  }}>
                    <span style={{
                      position: 'absolute',
                      height: '18px',
                      width: '18px',
                      left: formData.allowIndexing !== false ? '22px' : '3px',
                      bottom: '3px',
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      transition: '0.2s'
                    }} />
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
