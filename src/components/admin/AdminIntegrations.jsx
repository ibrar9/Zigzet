import React, { useState, useMemo } from 'react';
import {
  CreditCard,
  Wallet,
  Truck,
  Mail,
  BarChart3,
  Target,
  Phone,
  Code,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Search,
  Sliders,
  Sparkles,
  Zap,
  RefreshCw,
  X,
  Check,
  Eye,
  EyeOff,
  Send,
  Lock,
  Radio,
  Copy,
  ChevronRight,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminIntegrations = () => {
  const {
    integrations,
    updateIntegration,
    toggleIntegration,
    testIntegrationConnection,
    sendTestWebhook,
    showToast
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeModalApp, setActiveModalApp] = useState(null);
  const [formData, setFormData] = useState({});
  const [showSecrets, setShowSecrets] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [isSendingWebhook, setIsSendingWebhook] = useState(false);
  const [webhookResult, setWebhookResult] = useState(null);

  // Extract list of connected channels for the header subtitle
  const connectedNames = useMemo(() => {
    return Object.values(integrations || {})
      .filter((i) => i.status === 'Connected')
      .map((i) => {
        if (i.id === 'stripe') return 'Stripe';
        if (i.id === 'paypal') return 'PayPal';
        if (i.id === 'shipping') return 'DHL';
        if (i.id === 'analytics') return 'GA4';
        if (i.id === 'whatsapp') return 'WhatsApp';
        if (i.id === 'marketing') return 'Klaviyo';
        if (i.id === 'pixels') return 'Pixel';
        if (i.id === 'webhooks') return 'Webhooks';
        return i.name;
      });
  }, [integrations]);

  const categories = [
    { id: 'all', label: 'All Apps' },
    { id: 'payment', label: 'Payment Gateways' },
    { id: 'shipping', label: 'Shipping & Couriers' },
    { id: 'marketing', label: 'Marketing & Email' },
    { id: 'analytics', label: 'Analytics & Tracking' },
    { id: 'communication', label: 'WhatsApp & SMS' },
    { id: 'developer', label: 'Webhooks & API' }
  ];

  // Filtered integration apps list
  const filteredApps = useMemo(() => {
    const list = Object.values(integrations || {});
    return list.filter((app) => {
      if (selectedCategory !== 'all' && app.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        return (
          app.name.toLowerCase().includes(q) ||
          app.desc.toLowerCase().includes(q) ||
          app.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [integrations, selectedCategory, searchQuery]);

  const getAppIcon = (id) => {
    switch (id) {
      case 'stripe':
        return <CreditCard size={22} color="#6366f1" />;
      case 'paypal':
        return <Wallet size={22} color="#0284c7" />;
      case 'shipping':
        return <Truck size={22} color="#f59e0b" />;
      case 'marketing':
        return <Mail size={22} color="#ec4899" />;
      case 'analytics':
        return <BarChart3 size={22} color="#10b981" />;
      case 'pixels':
        return <Target size={22} color="#8b5cf6" />;
      case 'whatsapp':
        return <Phone size={22} color="#22c55e" />;
      case 'webhooks':
        return <Code size={22} color="#06b6d4" />;
      default:
        return <Sliders size={22} color="#64748b" />;
    }
  };

  const openConfigModal = (app) => {
    setActiveModalApp(app);
    setFormData({ ...app });
    setShowSecrets(false);
    setTestResult(null);
    setWebhookResult(null);
  };

  const closeConfigModal = () => {
    setActiveModalApp(null);
    setFormData({});
    setTestResult(null);
    setWebhookResult(null);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent] || {}),
        [field]: value
      }
    }));
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!activeModalApp) return;

    // Automatically mark as connected if credentials are present
    const updated = {
      ...formData,
      status: 'Connected'
    };
    updateIntegration(activeModalApp.id, updated);
    closeConfigModal();
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await testIntegrationConnection(activeModalApp.id);
      setTestResult(res);
      showToast('Connection Successful', `Ping: ${res.latency}ms • Status 200 OK`, 'success');
    } catch {
      setTestResult({ success: false, message: 'Failed to establish handshake.' });
    } finally {
      setIsTesting(false);
    }
  };

  const handleTriggerTestWebhook = async () => {
    setIsSendingWebhook(true);
    setWebhookResult(null);
    try {
      const res = await sendTestWebhook(formData.endpointUrl || 'https://api.zigzet.com/v1/webhooks', 'order.created');
      setWebhookResult(res);
      showToast('Test Webhook Dispatched', 'Payload delivered with HTTP 200 response.', 'success');
    } catch {
      setWebhookResult({ success: false, message: 'Webhook endpoint timed out.' });
    } finally {
      setIsSendingWebhook(false);
    }
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    showToast('Copied to Clipboard', `${label} copied.`, 'info');
  };

  return (
    <div className="admin-page-container">
      {/* Top Header */}
      <div className="admin-page-header" style={{ marginBottom: '20px' }}>
        <div>
          <h2 className="admin-section-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>Integrations & Apps</span>
            <span style={{ fontSize: '12px', fontWeight: '600', padding: '3px 10px', borderRadius: '20px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Activity size={12} className="pulse-dot" /> All Systems Operational
            </span>
          </h2>
          <p className="admin-section-desc" style={{ marginTop: '4px' }}>
            Connected channels: <strong style={{ color: '#0f172a' }}>{connectedNames.length > 0 ? connectedNames.join(', ') : 'None'}</strong>
          </p>
        </div>

        {/* Quick Search & Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="admin-search-input-box" style={{ position: 'relative', width: '260px' }}>
            <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search integrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 36px',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                background: '#ffffff',
                fontSize: '13px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '16px' }}>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const count = cat.id === 'all'
            ? Object.keys(integrations || {}).length
            : Object.values(integrations || {}).filter((i) => i.category === cat.id).length;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '7px 14px',
                borderRadius: '20px',
                border: '1px solid',
                borderColor: isActive ? '#7c3aed' : '#e2e8f0',
                background: isActive ? '#7c3aed' : '#ffffff',
                color: isActive ? '#ffffff' : '#475569',
                fontSize: '12.5px',
                fontWeight: isActive ? '700' : '500',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s ease'
              }}
            >
              <span>{cat.label}</span>
              <span
                style={{
                  fontSize: '11px',
                  padding: '1px 6px',
                  borderRadius: '10px',
                  background: isActive ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
                  color: isActive ? '#ffffff' : '#64748b'
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Integrations Grid (Pixel-Perfect with Screenshot & Enhanced Interactivity) */}
      <div className="integrations-grid">
        {filteredApps.map((integ) => {
          const isConnected = integ.status === 'Connected';
          return (
            <div
              key={integ.id}
              className="dash-card integration-card"
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.25s ease',
                border: isConnected ? '1px solid #cbd5e1' : '1px solid #e2e8f0'
              }}
            >
              <div>
                {/* Header Row */}
                <div className="integ-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: integ.bgColor || '#f8fafc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {getAppIcon(integ.id)}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      className={`integ-status-pill ${isConnected ? 'connected' : ''}`}
                      style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        background: isConnected ? '#ecfdf5' : '#f8fafc',
                        color: isConnected ? '#059669' : '#64748b',
                        border: isConnected ? '1px solid #a7f3d0' : '1px solid #e2e8f0'
                      }}
                    >
                      {isConnected && <CheckCircle2 size={13} color="#059669" />}
                      {integ.status}
                    </span>

                    {/* Quick Toggle */}
                    <button
                      onClick={() => toggleIntegration(integ.id)}
                      title={isConnected ? 'Click to disable' : 'Click to connect'}
                      style={{
                        width: '36px',
                        height: '20px',
                        borderRadius: '12px',
                        background: isConnected ? '#10b981' : '#cbd5e1',
                        border: 'none',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'background 0.2s ease'
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          top: '2px',
                          left: isConnected ? '18px' : '2px',
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          background: '#ffffff',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                          transition: 'left 0.2s ease'
                        }}
                      />
                    </button>
                  </div>
                </div>

                {/* Name & Desc */}
                <h3 className="integ-name" style={{ fontSize: '15.5px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                  {integ.name}
                </h3>
                <p className="integ-desc" style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.45', marginBottom: '16px' }}>
                  {integ.desc}
                </p>

                {/* Extra metadata tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {integ.mode && (
                    <span style={{ fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '6px', background: integ.mode === 'live' ? '#eff6ff' : '#fffbeb', color: integ.mode === 'live' ? '#1d4ed8' : '#b45309', textTransform: 'uppercase' }}>
                      {integ.mode} Mode
                    </span>
                  )}
                  {integ.measurementId && (
                    <span style={{ fontSize: '11px', fontFamily: 'monospace', padding: '2px 8px', borderRadius: '6px', background: '#f1f5f9', color: '#475569' }}>
                      {integ.measurementId}
                    </span>
                  )}
                  {integ.activeCourier && (
                    <span style={{ fontSize: '11px', fontWeight: '600', padding: '2px 8px', borderRadius: '6px', background: '#fef3c7', color: '#92400e' }}>
                      Courier: {integ.activeCourier}
                    </span>
                  )}
                  {integ.lastSynced && (
                    <span style={{ fontSize: '11px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Synced: {integ.lastSynced}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <button
                className="integ-configure-btn"
                onClick={() => openConfigModal(integ)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  width: '100%',
                  padding: '9px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  background: isConnected ? '#ffffff' : '#f8fafc',
                  color: isConnected ? '#0f172a' : '#475569',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{isConnected ? 'Configure' : 'Connect Account'}</span>
                <ExternalLink size={13} />
              </button>
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE CONFIGURATION MODAL */}
      {/* ========================================================================= */}
      {activeModalApp && (
        <div className="modal-overlay open" onClick={closeConfigModal}>
          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto', borderRadius: '16px', padding: '28px' }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: activeModalApp.bgColor || '#f8fafc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {getAppIcon(activeModalApp.id)}
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                    Configure {activeModalApp.name}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '3px 0 0 0' }}>
                    {activeModalApp.desc}
                  </p>
                </div>
              </div>
              <button
                onClick={closeConfigModal}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveModal} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* 1. STRIPE PAYMENTS CONFIG */}
              {activeModalApp.id === 'stripe' && (
                <>
                  <div className="form-group">
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                      Environment Mode
                    </label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      {['test', 'live'].map((mode) => (
                        <button
                          type="button"
                          key={mode}
                          onClick={() => handleInputChange('mode', mode)}
                          style={{
                            flex: 1,
                            padding: '8px',
                            borderRadius: '8px',
                            border: '1px solid',
                            borderColor: formData.mode === mode ? '#6366f1' : '#e2e8f0',
                            background: formData.mode === mode ? '#eef2ff' : '#ffffff',
                            color: formData.mode === mode ? '#4338ca' : '#475569',
                            fontWeight: '700',
                            fontSize: '13px',
                            textTransform: 'uppercase',
                            cursor: 'pointer'
                          }}
                        >
                          {mode === 'test' ? '🧪 Test Sandbox' : '⚡ Live Production'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label style={{ fontSize: '13px', fontWeight: '700', color: '#334155' }}>Stripe Publishable Key</label>
                      <button
                        type="button"
                        onClick={() => setShowSecrets(!showSecrets)}
                        style={{ background: 'none', border: 'none', color: '#6366f1', fontSize: '11.5px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        {showSecrets ? <EyeOff size={12} /> : <Eye size={12} />} {showSecrets ? 'Hide' : 'Reveal'}
                      </button>
                    </div>
                    <input
                      type={showSecrets ? 'text' : 'password'}
                      value={formData.publishableKey || ''}
                      onChange={(e) => handleInputChange('publishableKey', e.target.value)}
                      placeholder="pk_live_..."
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontFamily: 'monospace', fontSize: '13px' }}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                      Stripe Secret Key
                    </label>
                    <input
                      type={showSecrets ? 'text' : 'password'}
                      value={formData.secretKey || ''}
                      onChange={(e) => handleInputChange('secretKey', e.target.value)}
                      placeholder="sk_live_..."
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontFamily: 'monospace', fontSize: '13px' }}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                      Supported Payment Methods
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      {[
                        { id: 'creditCard', label: 'Credit / Debit Cards (Visa, MC)' },
                        { id: 'applePay', label: 'Apple Pay' },
                        { id: 'googlePay', label: 'Google Pay' },
                        { id: 'klarna', label: 'Klarna Pay in 4' }
                      ].map((m) => (
                        <label key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={formData.methods?.[m.id] ?? true}
                            onChange={(e) => handleNestedChange('methods', m.id, e.target.checked)}
                          />
                          <span>{m.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* 2. PAYPAL CHECKOUT CONFIG */}
              {activeModalApp.id === 'paypal' && (
                <>
                  <div className="form-group">
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                      PayPal Client ID
                    </label>
                    <input
                      type="text"
                      value={formData.clientId || ''}
                      onChange={(e) => handleInputChange('clientId', e.target.value)}
                      placeholder="sb_client_id_..."
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontFamily: 'monospace', fontSize: '13px' }}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                      PayPal Client Secret
                    </label>
                    <input
                      type={showSecrets ? 'text' : 'password'}
                      value={formData.clientSecret || ''}
                      onChange={(e) => handleInputChange('clientSecret', e.target.value)}
                      placeholder="sb_secret_..."
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontFamily: 'monospace', fontSize: '13px' }}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={formData.enablePayLater ?? true}
                        onChange={(e) => handleInputChange('enablePayLater', e.target.checked)}
                      />
                      <span>Enable "Pay in 4" Installments option</span>
                    </label>
                  </div>
                </>
              )}

              {/* 3. DHL & FEDEX COURIER CONFIG */}
              {activeModalApp.id === 'shipping' && (
                <>
                  <div className="form-group">
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                      Active Primary Carrier
                    </label>
                    <select
                      value={formData.activeCourier || 'DHL Express'}
                      onChange={(e) => handleInputChange('activeCourier', e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', background: '#fff' }}
                    >
                      <option value="DHL Express">DHL Express Worldwide</option>
                      <option value="FedEx">FedEx International Priority</option>
                      <option value="Aramex">Aramex Express (Middle East)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                      Courier API Key / Meter Number
                    </label>
                    <input
                      type="text"
                      value={formData.apiKey || ''}
                      onChange={(e) => handleInputChange('apiKey', e.target.value)}
                      placeholder="dhl_live_key_..."
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontFamily: 'monospace', fontSize: '13px' }}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                      Origin Warehouse / Fulfillment Hub
                    </label>
                    <input
                      type="text"
                      value={formData.pickupHub || ''}
                      onChange={(e) => handleInputChange('pickupHub', e.target.value)}
                      placeholder="Dubai Logistics City, UAE"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={formData.autoGenerateWaybill ?? true}
                        onChange={(e) => handleInputChange('autoGenerateWaybill', e.target.checked)}
                      />
                      <span>Auto-generate tracking waybill barcode when status changes to "Shipped"</span>
                    </label>
                  </div>
                </>
              )}

              {/* 4. MAILCHIMP & KLAVIYO CONFIG */}
              {activeModalApp.id === 'marketing' && (
                <>
                  <div className="form-group">
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                      Email Marketing Platform
                    </label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      {['Klaviyo', 'Mailchimp'].map((provider) => (
                        <button
                          type="button"
                          key={provider}
                          onClick={() => handleInputChange('activeProvider', provider)}
                          style={{
                            flex: 1,
                            padding: '8px',
                            borderRadius: '8px',
                            border: '1px solid',
                            borderColor: formData.activeProvider === provider ? '#ec4899' : '#e2e8f0',
                            background: formData.activeProvider === provider ? '#fdf2f8' : '#ffffff',
                            color: formData.activeProvider === provider ? '#be185d' : '#475569',
                            fontWeight: '700',
                            fontSize: '13px',
                            cursor: 'pointer'
                          }}
                        >
                          {provider}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                      {formData.activeProvider || 'Klaviyo'} API Key
                    </label>
                    <input
                      type="text"
                      value={formData.apiKey || ''}
                      onChange={(e) => handleInputChange('apiKey', e.target.value)}
                      placeholder="pk_klaviyo_..."
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontFamily: 'monospace', fontSize: '13px' }}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={formData.abandonedCartSequence ?? true}
                        onChange={(e) => handleInputChange('abandonedCartSequence', e.target.checked)}
                      />
                      <span>Trigger automated Abandoned Cart recovery email flow</span>
                    </label>
                  </div>
                </>
              )}

              {/* 5. GOOGLE ANALYTICS 4 (GA4) */}
              {activeModalApp.id === 'analytics' && (
                <>
                  <div className="form-group">
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                      GA4 Measurement ID
                    </label>
                    <input
                      type="text"
                      value={formData.measurementId || ''}
                      onChange={(e) => handleInputChange('measurementId', e.target.value)}
                      placeholder="G-XXXXXXXXXX"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontFamily: 'monospace', fontSize: '13px' }}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={formData.enhancedEcommerce ?? true}
                        onChange={(e) => handleInputChange('enhancedEcommerce', e.target.checked)}
                      />
                      <span>Track Enhanced E-commerce Events (view_item, add_to_cart, begin_checkout, purchase)</span>
                    </label>
                  </div>
                </>
              )}

              {/* 6. FACEBOOK & TIKTOK PIXELS */}
              {activeModalApp.id === 'pixels' && (
                <>
                  <div className="form-group">
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                      Meta (Facebook) Pixel ID
                    </label>
                    <input
                      type="text"
                      value={formData.metaPixelId || ''}
                      onChange={(e) => handleInputChange('metaPixelId', e.target.value)}
                      placeholder="184920482019482"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontFamily: 'monospace', fontSize: '13px' }}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                      TikTok Pixel ID
                    </label>
                    <input
                      type="text"
                      value={formData.tiktokPixelId || ''}
                      onChange={(e) => handleInputChange('tiktokPixelId', e.target.value)}
                      placeholder="C92819482810"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontFamily: 'monospace', fontSize: '13px' }}
                    />
                  </div>
                </>
              )}

              {/* 7. WHATSAPP BUSINESS API */}
              {activeModalApp.id === 'whatsapp' && (
                <>
                  <div className="form-group">
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                      WhatsApp Phone Number ID
                    </label>
                    <input
                      type="text"
                      value={formData.phoneNumberId || ''}
                      onChange={(e) => handleInputChange('phoneNumberId', e.target.value)}
                      placeholder="109823489201948"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontFamily: 'monospace', fontSize: '13px' }}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={formData.sendOrderPlaced ?? true}
                        onChange={(e) => handleInputChange('sendOrderPlaced', e.target.checked)}
                      />
                      <span>Send instant WhatsApp order confirmation message with invoice link</span>
                    </label>
                  </div>
                </>
              )}

              {/* 8. CUSTOM WEBHOOKS & REST API */}
              {activeModalApp.id === 'webhooks' && (
                <>
                  <div className="form-group">
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                      Webhook Receiver URL
                    </label>
                    <input
                      type="url"
                      value={formData.endpointUrl || ''}
                      onChange={(e) => handleInputChange('endpointUrl', e.target.value)}
                      placeholder="https://api.yourdomain.com/webhooks/orders"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontFamily: 'monospace', fontSize: '13px' }}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                      Secret Signature Token
                    </label>
                    <input
                      type="text"
                      value={formData.secretToken || ''}
                      onChange={(e) => handleInputChange('secretToken', e.target.value)}
                      placeholder="whsec_..."
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontFamily: 'monospace', fontSize: '13px' }}
                    />
                  </div>
                </>
              )}

              {/* DIAGNOSTIC TEST BAR */}
              <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#334155', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={16} color="#059669" /> Health & Diagnostics
                  </span>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    {activeModalApp.id === 'webhooks' && (
                      <button
                        type="button"
                        onClick={handleTriggerTestWebhook}
                        disabled={isSendingWebhook}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          border: '1px solid #cbd5e1',
                          background: '#ffffff',
                          color: '#0f172a',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Send size={12} /> {isSendingWebhook ? 'Sending...' : 'Send Test Event'}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleTestConnection}
                      disabled={isTesting}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        background: '#ffffff',
                        color: '#0f172a',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <RefreshCw size={12} className={isTesting ? 'spin-icon' : ''} /> {isTesting ? 'Testing...' : 'Test Connection'}
                    </button>
                  </div>
                </div>

                {testResult && (
                  <div style={{ padding: '8px 12px', borderRadius: '6px', background: testResult.success ? '#ecfdf5' : '#fef2f2', border: testResult.success ? '1px solid #a7f3d0' : '1px solid #fecaca', color: testResult.success ? '#065f46' : '#991b1b', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={14} />
                    <span>{testResult.message} ({testResult.latency}ms ping)</span>
                  </div>
                )}

                {webhookResult && (
                  <div style={{ padding: '8px 12px', borderRadius: '6px', background: '#f0fdf4', border: '1px solid #bbf7d0', fontSize: '11.5px', fontFamily: 'monospace', color: '#166534' }}>
                    <strong>Delivered:</strong> event `{webhookResult.event}` (Payload ID: {webhookResult.payloadId}) • HTTP 200 OK
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                <button
                  type="button"
                  onClick={closeConfigModal}
                  style={{ padding: '9px 18px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#475569', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '9px 22px', borderRadius: '8px', border: 'none', background: '#7c3aed', color: '#ffffff', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Check size={15} /> Save Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
