import React, { useState } from 'react';
import { 
  Tag, 
  Plus, 
  Trash2, 
  Search, 
  Copy, 
  Calendar, 
  Percent, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  X, 
  Save,
  Check,
  AlertCircle
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CustomDropdown } from '../common/CustomDropdown';

export const AdminCoupons = () => {
  const { coupons, addCoupon, deleteCoupon, toggleCouponActive, showToast } = useStore();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const [form, setForm] = useState({
    code: '',
    description: '',
    type: 'percentage',
    value: 20,
    minSpend: 50,
    maxDiscount: 100,
    expiryDate: '2026-12-31',
    usageLimit: 100
  });

  const totalCoupons = coupons.length;
  const activeCouponsCount = coupons.filter((c) => c.isActive).length;
  const totalRedemptions = coupons.reduce((sum, c) => sum + (c.usageCount || 0), 0);

  const filterOptions = [
    { value: 'all', label: 'All Coupons', dot: '#7c3aed', badge: totalCoupons },
    { value: 'active', label: 'Active Codes', dot: '#10b981', badge: activeCouponsCount },
    { value: 'inactive', label: 'Disabled / Expired', dot: '#ef4444' }
  ];

  const filteredCoupons = coupons.filter((c) => {
    const matchesSearch =
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      (c.description && c.description.toLowerCase().includes(search.toLowerCase()));

    let matchesStatus = true;
    if (statusFilter === 'active') matchesStatus = c.isActive;
    if (statusFilter === 'inactive') matchesStatus = !c.isActive;

    return matchesSearch && matchesStatus;
  });

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    showToast('Code Copied', `"${code}" copied to clipboard.`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!form.code.trim()) {
      alert('Please enter a valid coupon promo code.');
      return;
    }

    addCoupon({
      ...form,
      value: parseFloat(form.value) || 10,
      minSpend: parseFloat(form.minSpend) || 0,
      maxDiscount: parseFloat(form.maxDiscount) || 100,
      usageLimit: parseInt(form.usageLimit) || 100
    });

    setIsModalOpen(false);
    setForm({
      code: '',
      description: '',
      type: 'percentage',
      value: 20,
      minSpend: 50,
      maxDiscount: 100,
      expiryDate: '2026-12-31',
      usageLimit: 100
    });
  };

  return (
    <div className="admin-page-container">
      {/* Header Title & Actions */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-section-title">Discount Coupons & Promo Codes ({totalCoupons})</h2>
          <p className="admin-section-desc">Create discount promotions, seasonal vouchers, and minimum spend promo rules</p>
        </div>

        <div className="admin-page-actions">
          <button
            className="hero-cta-btn"
            onClick={() => setIsModalOpen(true)}
            style={{ padding: '10px 22px', fontSize: '13.5px' }}
          >
            <Plus size={16} />
            <span>Create Promo Code</span>
          </button>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="admin-overview-stats-grid">
        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper purple">
            <Tag size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Total Codes</span>
            <span className="stat-main-number">{totalCoupons}</span>
            <span className="stat-sub-text">Promo campaigns</span>
          </div>
        </div>

        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper emerald">
            <CheckCircle2 size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Active Now</span>
            <span className="stat-main-number">{activeCouponsCount}</span>
            <span className="stat-sub-text">Claimable at checkout</span>
          </div>
        </div>

        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper orange">
            <Clock size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Total Redemptions</span>
            <span className="stat-main-number">{totalRedemptions}</span>
            <span className="stat-sub-text">Customer uses</span>
          </div>
        </div>

        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper blue">
            <Percent size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Avg. Discount</span>
            <span className="stat-main-number">22%</span>
            <span className="stat-sub-text">Average savings</span>
          </div>
        </div>
      </div>

      {/* Modern Toolbar */}
      <div className="products-modern-toolbar">
        <div className="toolbar-left-group">
          <div className="toolbar-search-box">
            <Search size={16} color="#94a3b8" />
            <input
              type="text"
              placeholder="Search by coupon code or title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <CustomDropdown
            options={filterOptions}
            value={statusFilter}
            onChange={(val) => setStatusFilter(val)}
            minWidth="180px"
          />
        </div>
      </div>

      {/* Coupons Table Card */}
      <div className="dash-card">
        <div className="table-responsive-wrapper">
          <table className="zigzet-admin-table">
            <thead>
              <tr>
                <th>Coupon Code</th>
                <th>Discount Value</th>
                <th>Min. Spend</th>
                <th>Redemptions / Limit</th>
                <th>Expiry Date</th>
                <th>Active</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoupons.map((c) => (
                <tr key={c.id}>
                  {/* Coupon Code & Title */}
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          background: '#f5f3ff',
                          color: '#7c3aed',
                          border: '1.5px dashed #c4b5fd',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          fontWeight: '800',
                          fontFamily: 'monospace',
                          fontSize: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>{c.code}</span>
                        <button
                          onClick={() => handleCopy(c.code, c.id)}
                          style={{ color: '#7c3aed', padding: '2px' }}
                          title="Copy Code"
                        >
                          {copiedId === c.id ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                        </button>
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>
                          {c.description || 'Special store discount'}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Discount Value */}
                  <td>
                    <span style={{ fontWeight: '800', fontSize: '14px', color: '#0f172a' }}>
                      {c.type === 'percentage' ? `${c.value}% OFF` : `$${c.value}.00 OFF`}
                    </span>
                  </td>

                  {/* Min Spend */}
                  <td>
                    <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
                      ${c.minSpend || 0}.00
                    </span>
                  </td>

                  {/* Redemptions Progress */}
                  <td>
                    <div style={{ minWidth: '120px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '3px' }}>
                        <span style={{ fontWeight: '700', color: '#1e293b' }}>{c.usageCount || 0} used</span>
                        <span style={{ color: '#94a3b8' }}>/ {c.usageLimit || 100}</span>
                      </div>
                      <div style={{ height: '5px', background: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                        <div
                          style={{
                            height: '100%',
                            background: '#7c3aed',
                            width: `${Math.min(100, ((c.usageCount || 0) / (c.usageLimit || 100)) * 100)}%`
                          }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Expiry Date */}
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: '#475569' }}>
                      <Calendar size={13} color="#94a3b8" />
                      <span>{c.expiryDate || 'No Expiry'}</span>
                    </div>
                  </td>

                  {/* Active Toggle Switch */}
                  <td>
                    <label className="ios-switch">
                      <input
                        type="checkbox"
                        checked={c.isActive}
                        onChange={() => toggleCouponActive(c.id)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </td>

                  {/* Actions */}
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="action-circle-btn delete"
                      onClick={() => {
                        if (window.confirm(`Delete coupon code "${c.code}"?`)) {
                          deleteCoupon(c.id);
                        }
                      }}
                      title="Delete Coupon"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredCoupons.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '48px 0', color: '#94a3b8' }}>
                    <Tag size={40} color="#cbd5e1" style={{ margin: '0 auto 12px auto' }} />
                    <p style={{ fontWeight: '600', color: '#475569' }}>No discount coupons found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Coupon Modal */}
      {isModalOpen && (
        <div className="modal-overlay open" onClick={() => setIsModalOpen(false)}>
          <div className="modal-box" style={{ maxWidth: '560px', padding: '32px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-icon" onClick={() => setIsModalOpen(false)}>
              <X size={18} />
            </button>

            <div style={{ marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '12px', color: '#7c3aed', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Promotional Campaign
              </span>
              <h3 style={{ fontSize: '20px', fontWeight: '800', marginTop: '2px', color: '#0f172a' }}>
                Create New Coupon Code
              </h3>
            </div>

            <form onSubmit={handleCreate}>
              <div className="checkout-form-grid">
                {/* Code */}
                <div className="form-group">
                  <label>Promo Code *</label>
                  <input
                    type="text"
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                    placeholder="e.g. FLASH30"
                    required
                    style={{ textTransform: 'uppercase', fontWeight: '700' }}
                  />
                </div>

                {/* Discount Type */}
                <div className="form-group">
                  <label>Discount Type</label>
                  <CustomDropdown
                    options={[
                      { value: 'percentage', label: 'Percentage (%) Off', dot: '#7c3aed' },
                      { value: 'fixed', label: 'Fixed Amount ($) Off', dot: '#10b981' }
                    ]}
                    value={form.type}
                    onChange={(val) => setForm({ ...form, type: val })}
                    width="100%"
                  />
                </div>

                {/* Discount Value */}
                <div className="form-group">
                  <label>{form.type === 'percentage' ? 'Percentage (%) Value' : 'Discount ($) Value'} *</label>
                  <input
                    type="number"
                    value={form.value}
                    onChange={(e) => setForm({ ...form, value: e.target.value })}
                    min="1"
                    required
                  />
                </div>

                {/* Min Spend */}
                <div className="form-group">
                  <label>Min. Subtotal Spend ($)</label>
                  <input
                    type="number"
                    value={form.minSpend}
                    onChange={(e) => setForm({ ...form, minSpend: e.target.value })}
                    min="0"
                  />
                </div>

                {/* Expiry Date */}
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    type="date"
                    value={form.expiryDate}
                    onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
                  />
                </div>

                {/* Usage Limit */}
                <div className="form-group">
                  <label>Total Usage Limit</label>
                  <input
                    type="number"
                    value={form.usageLimit}
                    onChange={(e) => setForm({ ...form, usageLimit: e.target.value })}
                    min="1"
                  />
                </div>

                {/* Description */}
                <div className="form-group full-width">
                  <label>Promotion Description</label>
                  <input
                    type="text"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="e.g. 20% off all orders over $50"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ padding: '10px 20px', borderRadius: '10px', background: '#f1f5f9', color: '#475569', fontWeight: '600', fontSize: '13.5px' }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="hero-cta-btn"
                  style={{ padding: '10px 28px', fontSize: '13.5px' }}
                >
                  <Save size={15} />
                  <span>Create Coupon</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
