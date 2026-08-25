import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Send, 
  Clock, 
  CheckCircle2, 
  DollarSign, 
  Mail, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles,
  Search,
  ExternalLink
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CustomDropdown } from '../common/CustomDropdown';

export const AdminAbandonedCarts = () => {
  const { abandonedCarts, sendCartRecoveryEmail } = useStore();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const totalAbandoned = abandonedCarts.length;
  const pendingRecovery = abandonedCarts.filter((c) => c.recoveryStatus === 'Pending').length;
  const emailsSent = abandonedCarts.filter((c) => c.recoveryStatus === 'Email Sent').length;
  const lostValue = abandonedCarts.reduce((sum, c) => sum + (c.cartTotal || 0), 0);

  const filterOptions = [
    { value: 'all', label: 'All Sessions', dot: '#7c3aed', badge: totalAbandoned },
    { value: 'Pending', label: 'Needs Follow-Up', dot: '#ea580c', badge: pendingRecovery },
    { value: 'Email Sent', label: 'Recovery Sent', dot: '#3b82f6', badge: emailsSent }
  ];

  const filteredCarts = abandonedCarts.filter((c) => {
    const matchesSearch =
      c.customerName.toLowerCase().includes(search.toLowerCase()) ||
      c.customerEmail.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === 'all' || c.recoveryStatus === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="admin-page-container">
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-section-title">Abandoned Cart Recovery Hub ({totalAbandoned})</h2>
          <p className="admin-section-desc">Re-engage shoppers who left without checking out with automated 1-click discount recovery emails</p>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="admin-overview-stats-grid">
        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper orange">
            <ShoppingCart size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Abandoned Carts</span>
            <span className="stat-main-number">{totalAbandoned}</span>
            <span className="stat-sub-text">Uncompleted checkouts</span>
          </div>
        </div>

        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper purple">
            <DollarSign size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">At-Risk Revenue</span>
            <span className="stat-main-number">${lostValue.toFixed(2)}</span>
            <span className="stat-sub-text">Potential recoverable sales</span>
          </div>
        </div>

        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper blue">
            <Mail size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Recovery Sent</span>
            <span className="stat-main-number">{emailsSent}</span>
            <span className="stat-sub-text">Discount vouchers emailed</span>
          </div>
        </div>

        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper emerald">
            <CheckCircle2 size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Recovery Rate</span>
            <span className="stat-main-number">38.4%</span>
            <span className="stat-sub-text">Industry benchmark: 18%</span>
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
              placeholder="Search by customer name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <CustomDropdown
            options={filterOptions}
            value={filter}
            onChange={(val) => setFilter(val)}
            minWidth="180px"
          />
        </div>
      </div>

      {/* Abandoned Sessions Table */}
      <div className="dash-card">
        <div className="table-responsive-wrapper">
          <table className="zigzet-admin-table">
            <thead>
              <tr>
                <th>Shopper</th>
                <th>Cart Items</th>
                <th>Cart Total</th>
                <th>Abandoned Time</th>
                <th>Recovery Voucher</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Recovery Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCarts.map((c) => {
                const isSent = c.recoveryStatus === 'Email Sent';

                return (
                  <tr key={c.id}>
                    {/* Shopper */}
                    <td>
                      <div>
                        <div style={{ fontWeight: '700', color: '#0f172a' }}>{c.customerName}</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>{c.customerEmail}</div>
                      </div>
                    </td>

                    {/* Cart Items */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {c.items.map((item, idx) => (
                          <div
                            key={idx}
                            title={`${item.name} ($${item.price})`}
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '6px',
                              overflow: 'hidden',
                              border: '1px solid #e2e8f0',
                              background: '#fff'
                            }}
                          >
                            <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                        ))}
                        <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginLeft: '4px' }}>
                          {c.items.length} {c.items.length === 1 ? 'item' : 'items'}
                        </span>
                      </div>
                    </td>

                    {/* Cart Total (AED) */}
                    <td>
                      <span style={{ fontWeight: '800', color: '#0f172a', fontSize: '14px' }}>
                        AED {Number(c.cartTotal).toFixed(2)}
                      </span>
                    </td>

                    {/* Time */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: '#64748b' }}>
                        <Clock size={13} color="#94a3b8" />
                        <span>{c.abandonedAt}</span>
                      </div>
                    </td>

                    {/* Voucher */}
                    <td>
                      <span
                        style={{
                          background: '#f5f3ff',
                          color: '#7c3aed',
                          border: '1px dashed #c4b5fd',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '11.5px',
                          fontWeight: '700',
                          fontFamily: 'monospace'
                        }}
                      >
                        {c.recoveryDiscount || 'RECOVER10'}
                      </span>
                    </td>

                    {/* Status */}
                    <td>
                      <span className={`status-pill ${isSent ? 'completed' : 'pending'}`}>
                        <span className="status-dot-indicator" style={{ backgroundColor: isSent ? '#3b82f6' : '#ea580c' }} />
                        {c.recoveryStatus}
                      </span>
                    </td>

                    {/* Recovery Action Button */}
                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => sendCartRecoveryEmail(c.id)}
                        disabled={isSent}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '7px 14px',
                          borderRadius: '8px',
                          fontSize: '12.5px',
                          fontWeight: '700',
                          background: isSent ? '#f1f5f9' : '#7c3aed',
                          color: isSent ? '#94a3b8' : '#ffffff',
                          cursor: isSent ? 'default' : 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <Send size={13} />
                        <span>{isSent ? 'Sent' : 'Send Recovery Email'}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filteredCarts.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '48px 0', color: '#94a3b8' }}>
                    <ShoppingCart size={40} color="#cbd5e1" style={{ margin: '0 auto 12px auto' }} />
                    <p style={{ fontWeight: '600', color: '#475569' }}>No abandoned carts found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
