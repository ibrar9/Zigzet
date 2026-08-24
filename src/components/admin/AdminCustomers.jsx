import React, { useState } from 'react';
import { Search, Mail, MapPin, ShoppingBag, DollarSign, Star, MoreVertical, Plus } from 'lucide-react';
import { adminCustomersData } from '../../data/adminMockData';

export const AdminCustomers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState(adminCustomersData);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-page-container">
      {/* Header Bar */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-section-title">Customers Directory ({customers.length})</h2>
          <p className="admin-section-desc">Manage customer accounts, purchase histories, and VIP rewards</p>
        </div>

        <div className="admin-page-actions">
          <div className="admin-search-wrapper" style={{ width: '260px' }}>
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search by customer name, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input"
            />
          </div>
        </div>
      </div>

      {/* Customer Cards Grid */}
      <div className="admin-customers-grid">
        {filtered.map((cust) => (
          <div key={cust.id} className="dash-card customer-card">
            <div className="customer-card-top">
              <div className="customer-avatar-box">
                <img src={cust.avatar} alt={cust.name} />
                <span className="customer-active-badge"></span>
              </div>

              <div className="customer-title-block">
                <h3 className="customer-name">{cust.name}</h3>
                <span className={`customer-status-pill ${cust.status.includes('VIP') ? 'vip' : 'active'}`}>
                  {cust.status}
                </span>
              </div>
            </div>

            <div className="customer-details-list">
              <div className="customer-detail-row">
                <Mail size={14} className="detail-icon" />
                <span>{cust.email}</span>
              </div>

              <div className="customer-detail-row">
                <MapPin size={14} className="detail-icon" />
                <span>{cust.location}</span>
              </div>

              <div className="customer-stats-strip">
                <div className="stat-box">
                  <span className="stat-label">Total Orders</span>
                  <span className="stat-val">{cust.orders}</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-box">
                  <span className="stat-label">Total Spent</span>
                  <span className="stat-val highlight">{cust.spent}</span>
                </div>
              </div>
            </div>

            <div className="customer-card-footer">
              <span className="customer-active-time">Active {cust.lastActive}</span>
              <button className="customer-contact-btn">
                <span>Message</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
