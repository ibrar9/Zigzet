import React, { useState } from 'react';
import { 
  Search, 
  Mail, 
  MapPin, 
  Phone, 
  ShoppingBag, 
  DollarSign, 
  Star, 
  UserCheck, 
  Calendar, 
  Package, 
  ChevronRight, 
  X, 
  ExternalLink,
  MessageSquare,
  Award,
  CreditCard,
  Truck
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminCustomers = ({ onOpenInbox }) => {
  const { customers, orders, userAccounts, loyaltyProgram } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'registered' | 'buyers' | 'vip'
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Combine customers with registered userAccounts to ensure complete synchronization
  const allCustomersMap = new Map();

  // First seed existing CRM customers
  customers.forEach((c) => {
    allCustomersMap.set(c.email.toLowerCase(), {
      ...c,
      isRegistered: c.isRegistered || false
    });
  });

  // Merge registered userAccounts
  userAccounts.forEach((u) => {
    const existing = allCustomersMap.get(u.email.toLowerCase());
    if (existing) {
      allCustomersMap.set(u.email.toLowerCase(), {
        ...existing,
        name: u.name || existing.name,
        phone: u.phone || existing.phone,
        address: u.address || existing.address,
        city: u.city || existing.city,
        zip: u.zip || existing.zip,
        isRegistered: true,
        joinedAt: u.joinedAt || existing.registeredAt || 'Aug 2026'
      });
    } else {
      allCustomersMap.set(u.email.toLowerCase(), {
        id: u.id,
        name: u.name,
        email: u.email,
        phone: u.phone || '',
        address: u.address || '',
        city: u.city || '',
        zip: u.zip || '',
        avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
        orders: 0,
        spent: '$0.00',
        location: u.city ? `${u.city}, US` : 'Registered Member',
        status: 'Registered Member',
        lastActive: 'Recently',
        isRegistered: true,
        joinedAt: u.joinedAt || 'Aug 2026'
      });
    }
  });

  // Calculate live dynamic orders and spend for each customer from real orders array
  const customerList = Array.from(allCustomersMap.values()).map((cust) => {
    const matchedOrders = orders.filter(
      (o) =>
        (o.email && o.email.toLowerCase() === cust.email.toLowerCase()) ||
        (o.customerName && o.customerName.toLowerCase() === cust.name.toLowerCase())
    );

    const dynamicOrderCount = matchedOrders.length;
    const dynamicTotalSpentNum = matchedOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
    const initialSpentNum = parseFloat((cust.spent || '$0').replace(/[^0-9.-]+/g, '')) || 0;
    const finalSpentNum = Math.max(dynamicTotalSpentNum, initialSpentNum);

    const isVIP = finalSpentNum >= 1500 || (cust.status && cust.status.includes('VIP'));

    return {
      ...cust,
      matchedOrders,
      orderCount: Math.max(dynamicOrderCount, cust.orders || 0),
      totalSpentFormatted: `$${finalSpentNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      totalSpentNum: finalSpentNum,
      isVIP
    };
  });

  // Filtered List
  const filtered = customerList.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.phone && c.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.location && c.location.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeFilter === 'registered') return c.isRegistered;
    if (activeFilter === 'buyers') return c.orderCount > 0;
    if (activeFilter === 'vip') return c.isVIP;
    return true;
  });

  // Overall CRM Metrics
  const totalRegisteredCount = customerList.filter((c) => c.isRegistered).length;
  const totalActiveBuyersCount = customerList.filter((c) => c.orderCount > 0).length;
  const totalRevenueAll = customerList.reduce((acc, c) => acc + c.totalSpentNum, 0);

  return (
    <div className="admin-page-container">
      {/* Header Bar */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-section-title">Customers &amp; Registered Users ({customerList.length})</h2>
          <p className="admin-section-desc">
            Complete CRM directory of registered accounts, purchase histories, and customer intelligence
          </p>
        </div>

        <div className="admin-page-actions">
          <div className="admin-search-wrapper" style={{ width: '280px' }}>
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search name, email, phone, city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="admin-customer-stats-grid">
        <div className="dash-card customer-stat-mini-card">
          <div className="stat-mini-icon purple">
            <UserCheck size={20} />
          </div>
          <div>
            <span className="stat-mini-label">Total Accounts</span>
            <h3 className="stat-mini-val">{customerList.length}</h3>
            <span className="stat-mini-sub">{totalRegisteredCount} Registered Online</span>
          </div>
        </div>

        <div className="dash-card customer-stat-mini-card">
          <div className="stat-mini-icon green">
            <ShoppingBag size={20} />
          </div>
          <div>
            <span className="stat-mini-label">Active Buyers</span>
            <h3 className="stat-mini-val">{totalActiveBuyersCount}</h3>
            <span className="stat-mini-sub">Placed 1+ Orders</span>
          </div>
        </div>

        <div className="dash-card customer-stat-mini-card">
          <div className="stat-mini-icon blue">
            <DollarSign size={20} />
          </div>
          <div>
            <span className="stat-mini-label">Customer Lifetime Spend</span>
            <h3 className="stat-mini-val">${totalRevenueAll.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
            <span className="stat-mini-sub">From all store purchases</span>
          </div>
        </div>

        <div className="dash-card customer-stat-mini-card">
          <div className="stat-mini-icon orange">
            <Star size={20} />
          </div>
          <div>
            <span className="stat-mini-label">VIP &amp; High-Value</span>
            <h3 className="stat-mini-val">{customerList.filter((c) => c.isVIP).length}</h3>
            <span className="stat-mini-sub">Spent $1,500+</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="admin-customer-filter-tabs">
        <button
          className={`filter-tab-pill ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All Profiles ({customerList.length})
        </button>
        <button
          className={`filter-tab-pill ${activeFilter === 'registered' ? 'active' : ''}`}
          onClick={() => setActiveFilter('registered')}
        >
          Registered Members ({totalRegisteredCount})
        </button>
        <button
          className={`filter-tab-pill ${activeFilter === 'buyers' ? 'active' : ''}`}
          onClick={() => setActiveFilter('buyers')}
        >
          Active Buyers ({totalActiveBuyersCount})
        </button>
        <button
          className={`filter-tab-pill ${activeFilter === 'vip' ? 'active' : ''}`}
          onClick={() => setActiveFilter('vip')}
        >
          VIP Members ({customerList.filter((c) => c.isVIP).length})
        </button>
      </div>

      {/* Customer Cards Grid */}
      {filtered.length === 0 ? (
        <div className="dash-card" style={{ padding: '60px 20px', textAlign: 'center', color: '#64748b' }}>
          <UserCheck size={48} style={{ opacity: 0.3, margin: '0 auto 12px' }} />
          <h3>No customers match your search</h3>
          <p style={{ fontSize: '13.5px', marginTop: '4px' }}>Try adjusting your filters or search keywords.</p>
        </div>
      ) : (
        <div className="admin-customers-grid">
          {filtered.map((cust) => (
            <div key={cust.id || cust.email} className="dash-card customer-card">
              <div className="customer-card-top">
                <div className="customer-avatar-box">
                  <img src={cust.avatar} alt={cust.name} />
                  <span className={`customer-active-badge ${cust.isRegistered ? 'online' : ''}`}></span>
                </div>

                <div className="customer-title-block">
                  <h3 className="customer-name">{cust.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginTop: '2px' }}>
                    {cust.isRegistered && (
                      <span className="customer-status-pill registered">
                        Registered User
                      </span>
                    )}
                    <span className={`customer-status-pill ${cust.isVIP ? 'vip' : 'active'}`}>
                      {cust.isVIP ? 'VIP Member' : cust.status || 'Active Customer'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="customer-details-list">
                <div className="customer-detail-row">
                  <Mail size={14} className="detail-icon" />
                  <span title={cust.email}>{cust.email}</span>
                </div>

                {cust.phone && (
                  <div className="customer-detail-row">
                    <Phone size={14} className="detail-icon" />
                    <span>{cust.phone}</span>
                  </div>
                )}

                <div className="customer-detail-row">
                  <MapPin size={14} className="detail-icon" />
                  <span>{cust.address ? `${cust.address}, ${cust.city || ''}` : cust.location || 'United States'}</span>
                </div>

                <div className="customer-stats-strip">
                  <div className="stat-box">
                    <span className="stat-label">Total Orders</span>
                    <span className="stat-val highlight">{cust.orderCount}</span>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="stat-box">
                    <span className="stat-label">Total Spent</span>
                    <span className="stat-val highlight-green">{cust.totalSpentFormatted}</span>
                  </div>
                </div>
              </div>

              <div className="customer-card-footer">
                <button 
                  className="customer-view-history-btn"
                  onClick={() => setSelectedCustomer(cust)}
                >
                  <Package size={13} />
                  <span>View Orders ({cust.orderCount})</span>
                </button>

                <button 
                  className="customer-contact-btn"
                  onClick={() => {
                    if (onOpenInbox) onOpenInbox(cust);
                  }}
                  title="Send message to customer"
                >
                  <MessageSquare size={13} />
                  <span>Message</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =========================================================================
          Detailed Customer Order History & CRM Dossier Modal
          ========================================================================= */}
      {selectedCustomer && (
        <div className="modal-overlay open" onClick={() => setSelectedCustomer(null)}>
          <div 
            className="modal-box admin-customer-modal-box" 
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '780px' }}
          >
            <button 
              className="modal-close-icon" 
              onClick={() => setSelectedCustomer(null)}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="customer-modal-header">
              <div className="customer-modal-avatar">
                <img src={selectedCustomer.avatar} alt={selectedCustomer.name} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                    {selectedCustomer.name}
                  </h2>
                  {selectedCustomer.isRegistered && (
                    <span className="customer-status-pill registered">Registered Account</span>
                  )}
                  {selectedCustomer.isVIP && (
                    <span className="customer-status-pill vip">VIP Member</span>
                  )}
                </div>
                <p style={{ fontSize: '13px', color: '#64748b', marginTop: '3px' }}>
                  {selectedCustomer.email} &nbsp;·&nbsp; {selectedCustomer.phone || 'No phone'} &nbsp;·&nbsp; Member since {selectedCustomer.joinedAt || 'Aug 2026'}
                </p>
              </div>
            </div>

            {/* Summary Highlights */}
            <div className="customer-modal-stats-row">
              <div className="modal-stat-pill">
                <span className="m-label">Orders Placed</span>
                <span className="m-val">{selectedCustomer.orderCount}</span>
              </div>
              <div className="modal-stat-pill">
                <span className="m-label">Total Spend</span>
                <span className="m-val green">{selectedCustomer.totalSpentFormatted}</span>
              </div>
              <div className="modal-stat-pill">
                <span className="m-label">Primary Address</span>
                <span className="m-val text" title={selectedCustomer.address || selectedCustomer.location}>
                  {selectedCustomer.address || selectedCustomer.location || 'United States'}
                </span>
              </div>
            </div>

            {/* Orders Section */}
            <div className="customer-modal-orders-section">
              <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShoppingBag size={16} color="#7c3aed" />
                <span>Complete Purchase History ({selectedCustomer.matchedOrders.length} recorded orders)</span>
              </h4>

              {selectedCustomer.matchedOrders.length === 0 ? (
                <div style={{ padding: '30px 20px', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '12px', color: '#64748b' }}>
                  <Package size={36} style={{ opacity: 0.3, margin: '0 auto 8px' }} />
                  <p style={{ fontWeight: '600', fontSize: '14px' }}>Registered User — No online orders placed yet.</p>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>When this user buys products, all invoices and ordered items will appear here automatically.</span>
                </div>
              ) : (
                <div className="customer-orders-accordion">
                  {selectedCustomer.matchedOrders.map((ord) => (
                    <div key={ord.id} className="customer-order-item-card">
                      <div className="customer-order-item-head">
                        <div>
                          <span style={{ fontWeight: '800', color: '#0f172a', fontSize: '14px' }}>
                            Order #{ord.id}
                          </span>
                          <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '10px' }}>
                            {ord.date}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span className={`order-status-badge ${ord.status?.toLowerCase() || 'processing'}`}>
                            {ord.status || 'Processing'}
                          </span>
                          <span style={{ fontWeight: '800', color: '#0f172a', fontSize: '15px' }}>
                            ${(ord.total || 0).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Items row */}
                      <div className="customer-order-products-list">
                        {ord.items?.map((it, idx) => (
                          <div key={idx} className="customer-order-prod-row">
                            <div className="prod-thumb-mini">
                              {it.image ? (
                                <img src={it.image} alt={it.name} />
                              ) : (
                                <Package size={16} />
                              )}
                            </div>
                            <div style={{ flex: 1 }}>
                              <p style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
                                {it.name}
                              </p>
                              <span style={{ fontSize: '11.5px', color: '#64748b' }}>
                                Qty: {it.quantity} &nbsp;·&nbsp; ${(it.price || 0).toFixed(2)} each
                              </span>
                            </div>
                            <span style={{ fontWeight: '700', fontSize: '13px', color: '#0f172a' }}>
                              ${((it.price || 0) * (it.quantity || 1)).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Shipping & Payment Meta */}
                      <div className="customer-order-meta-footer">
                        {ord.shippingAddress && (
                          <div className="order-meta-col">
                            <Truck size={12} />
                            <span><strong>Ship To:</strong> {ord.shippingAddress}</span>
                          </div>
                        )}
                        {ord.paymentMethod && (
                          <div className="order-meta-col">
                            <CreditCard size={12} />
                            <span><strong>Paid via:</strong> {ord.paymentMethod}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
              <button 
                onClick={() => setSelectedCustomer(null)}
                style={{
                  padding: '9px 18px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#ffffff',
                  color: '#475569',
                  fontWeight: '600',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Close Dossier
              </button>

              <button 
                onClick={() => {
                  const cust = selectedCustomer;
                  setSelectedCustomer(null);
                  if (onOpenInbox) onOpenInbox(cust);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#7c3aed',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                <MessageSquare size={14} />
                <span>Message Customer in Inbox</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
