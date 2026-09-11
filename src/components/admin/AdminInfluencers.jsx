import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Sparkles, 
  Search, 
  Tag, 
  DollarSign, 
  ShoppingBag, 
  Award, 
  ExternalLink, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  ShieldAlert, 
  Eye, 
  Copy,
  TrendingUp,
  Percent
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminInfluencers = () => {
  const { 
    influencers, 
    registerInfluencer, 
    updateInfluencer, 
    toggleInfluencerStatus, 
    deleteInfluencer, 
    showToast 
  } = useStore();

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // New Influencer Form State
  const [newInf, setNewInf] = useState({
    name: '',
    email: '',
    password: 'password123',
    platform: 'Instagram',
    handle: '',
    followers: '10K-50K',
    niche: 'Beauty & Skincare',
    couponCode: '',
    discountPercent: 15,
    commissionRate: 10
  });

  // Edit Influencer Form State
  const [editForm, setEditForm] = useState({
    id: '',
    couponCode: '',
    commissionRate: 10,
    discountPercent: 15,
    tier: 'Gold Ambassador'
  });

  // Computed Aggregates
  const stats = useMemo(() => {
    const totalCount = influencers.length;
    const totalSales = influencers.reduce((acc, i) => acc + (Number(i.totalSales) || 0), 0);
    const totalOrders = influencers.reduce((acc, i) => acc + (Number(i.totalOrders) || 0), 0);
    const totalPoints = influencers.reduce((acc, i) => acc + (Number(i.pointsEarned) || 0), 0);
    return { totalCount, totalSales, totalOrders, totalPoints };
  }, [influencers]);

  // Filtered Roster
  const filteredInfluencers = useMemo(() => {
    return influencers.filter((i) => {
      const matchSearch =
        !search.trim() ||
        i.name.toLowerCase().includes(search.toLowerCase()) ||
        (i.handle && i.handle.toLowerCase().includes(search.toLowerCase())) ||
        (i.couponCode && i.couponCode.toLowerCase().includes(search.toLowerCase())) ||
        i.email.toLowerCase().includes(search.toLowerCase());

      const matchStatus = filterStatus === 'all' || i.status.toLowerCase() === filterStatus.toLowerCase();
      const matchPlatform = filterPlatform === 'all' || i.platform.toLowerCase() === filterPlatform.toLowerCase();

      return matchSearch && matchStatus && matchPlatform;
    });
  }, [influencers, search, filterStatus, filterPlatform]);

  const handleCreateInfluencer = (e) => {
    e.preventDefault();
    if (!newInf.name.trim() || !newInf.email.trim() || !newInf.handle.trim()) {
      showToast('Missing Fields', 'Please complete all required fields.', 'error');
      return;
    }
    const success = registerInfluencer(newInf);
    if (success) {
      setIsAddModalOpen(false);
      setNewInf({
        name: '',
        email: '',
        password: 'password123',
        platform: 'Instagram',
        handle: '',
        followers: '10K-50K',
        niche: 'Beauty & Skincare',
        couponCode: '',
        discountPercent: 15,
        commissionRate: 10
      });
    }
  };

  const openEditModal = (inf) => {
    setEditForm({
      id: inf.id,
      couponCode: inf.couponCode || '',
      commissionRate: inf.commissionRate || 10,
      discountPercent: inf.discountPercent || 15,
      tier: inf.tier || 'Verified Creator'
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    updateInfluencer(editForm.id, {
      couponCode: editForm.couponCode.toUpperCase().replace(/[^A-Z0-9]/g, ''),
      commissionRate: Number(editForm.commissionRate),
      discountPercent: Number(editForm.discountPercent),
      tier: editForm.tier
    });
    setIsEditModalOpen(false);
  };

  const openOrdersModal = (inf) => {
    setSelectedInfluencer(inf);
    setIsOrdersModalOpen(true);
  };

  return (
    <div className="admin-page-container">
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <div className="admin-pill-badge" style={{ background: '#faf0f2', color: '#5A1F2D' }}>
            <Sparkles size={14} />
            <span>Affiliate & Partner Network</span>
          </div>
          <h2 className="admin-section-title">Influencers & Creators Program</h2>
          <p className="admin-section-desc">
            Manage your registered influencers, exclusive coupon codes, performance points, and referred customer sales.
          </p>
        </div>

        <div className="admin-page-actions">
          <button className="admin-btn-primary" onClick={() => setIsAddModalOpen(true)}>
            <Plus size={16} />
            <span>Add Creator Manually</span>
          </button>
        </div>
      </div>

      {/* Aggregate Stats Cards */}
      <div className="admin-metrics-grid" style={{ marginBottom: '24px' }}>
        <div className="admin-metric-card">
          <div className="admin-metric-header">
            <span className="admin-metric-title">Active Creators</span>
            <div className="admin-metric-icon" style={{ background: '#faf0f2', color: '#5A1F2D' }}>
              <Users size={18} />
            </div>
          </div>
          <div className="admin-metric-value">{stats.totalCount}</div>
          <div className="admin-metric-hint">Registered partner accounts</div>
        </div>

        <div className="admin-metric-card">
          <div className="admin-metric-header">
            <span className="admin-metric-title">Influencer Revenue</span>
            <div className="admin-metric-icon" style={{ background: '#ecfdf5', color: '#059669' }}>
              <DollarSign size={18} />
            </div>
          </div>
          <div className="admin-metric-value">
            ${stats.totalSales.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="admin-metric-hint">{stats.totalOrders} customer checkouts</div>
        </div>

        <div className="admin-metric-card">
          <div className="admin-metric-header">
            <span className="admin-metric-title">Reward Points Issued</span>
            <div className="admin-metric-icon" style={{ background: '#fffbeb', color: '#d97706' }}>
              <Award size={18} />
            </div>
          </div>
          <div className="admin-metric-value">{stats.totalPoints.toLocaleString()} pts</div>
          <div className="admin-metric-hint">≈ ${(stats.totalPoints / 10).toFixed(2)} USD in commissions</div>
        </div>

        <div className="admin-metric-card">
          <div className="admin-metric-header">
            <span className="admin-metric-title">Avg. Conversion Commission</span>
            <div className="admin-metric-icon" style={{ background: '#f5f3ff', color: '#7c3aed' }}>
              <Percent size={18} />
            </div>
          </div>
          <div className="admin-metric-value">10% - 15%</div>
          <div className="admin-metric-hint">Customizable per influencer</div>
        </div>
      </div>

      {/* Toolbar / Search & Filter */}
      <div className="admin-card" style={{ marginBottom: '20px', padding: '16px 20px' }}>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
            <input
              type="text"
              className="admin-input"
              placeholder="Search by creator name, @handle, coupon code, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: '38px' }}
            />
            <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <select
              className="admin-input"
              style={{ width: 'auto' }}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Only</option>
              <option value="suspended">Suspended</option>
            </select>

            <select
              className="admin-input"
              style={{ width: 'auto' }}
              value={filterPlatform}
              onChange={(e) => setFilterPlatform(e.target.value)}
            >
              <option value="all">All Platforms</option>
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="youtube">YouTube</option>
            </select>
          </div>
        </div>
      </div>

      {/* Influencers Table */}
      <div className="admin-card">
        <div className="admin-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700' }}>
            Creator Roster ({filteredInfluencers.length})
          </h3>
          <span className="admin-badge-role">Live Attribution Active</span>
        </div>

        <div className="admin-card-body" style={{ padding: 0 }}>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Creator / Handle</th>
                  <th>Platform & Reach</th>
                  <th>Assigned Coupon</th>
                  <th>Total Sales</th>
                  <th>Orders</th>
                  <th>Points Balance</th>
                  <th>Commission</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInfluencers.map((inf) => (
                  <tr key={inf.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={inf.avatar}
                          alt={inf.name}
                          style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px' }}>{inf.name}</div>
                          <div style={{ color: '#5A1F2D', fontWeight: '600', fontSize: '12px' }}>{inf.handle}</div>
                          <div style={{ color: '#94a3b8', fontSize: '11px' }}>{inf.email}</div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div style={{ fontWeight: '600', fontSize: '13px' }}>{inf.platform}</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>{inf.followers} followers</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>{inf.niche}</div>
                    </td>

                    <td>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#faf0f2', border: '1px solid #f2d6dc', padding: '4px 10px', borderRadius: '8px' }}>
                        <Tag size={13} color="#5A1F2D" />
                        <span style={{ fontWeight: '800', color: '#5A1F2D', fontSize: '13px' }}>{inf.couponCode}</span>
                        <span style={{ fontSize: '11px', color: '#059669', fontWeight: '700' }}>({inf.discountPercent || 15}% OFF)</span>
                      </div>
                    </td>

                    <td>
                      <div style={{ fontWeight: '800', color: '#0f172a', fontSize: '14px' }}>
                        ${(Number(inf.totalSales) || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                    </td>

                    <td>
                      <span style={{ fontWeight: '700', color: '#334155' }}>{inf.totalOrders || 0}</span>
                    </td>

                    <td>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#d97706', fontWeight: '700' }}>
                        <Award size={14} />
                        <span>{(inf.pointsBalance || 0).toLocaleString()} pts</span>
                      </div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                        Lifetime: {(inf.pointsEarned || 0).toLocaleString()}
                      </div>
                    </td>

                    <td>
                      <span style={{ fontWeight: '700', color: '#5A1F2D' }}>{inf.commissionRate || 10}%</span>
                    </td>

                    <td>
                      <span
                        className={`admin-status-badge ${inf.status === 'Active' ? 'status-completed' : 'status-cancelled'}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => toggleInfluencerStatus(inf.id)}
                        title="Click to toggle status"
                      >
                        {inf.status}
                      </span>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        <button
                          className="admin-btn-icon"
                          onClick={() => openOrdersModal(inf)}
                          title="View Referred Customer Orders"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          className="admin-btn-icon"
                          onClick={() => openEditModal(inf)}
                          title="Edit Commission & Coupon"
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          className="admin-btn-icon delete"
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to remove ${inf.name} from the Creator Program?`)) {
                              deleteInfluencer(inf.id);
                            }
                          }}
                          title="Delete Influencer"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredInfluencers.length === 0 && (
                  <tr>
                    <td colSpan="9" style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
                      No matching influencers found. Click "Add Creator Manually" to register one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal: Add Influencer Manually */}
      {isAddModalOpen && (
        <div className="inf-modal-backdrop" onClick={() => setIsAddModalOpen(false)}>
          <div className="inf-modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
            <div className="inf-modal-header">
              <h4>Register New Influencer Partner</h4>
              <button className="inf-modal-close" onClick={() => setIsAddModalOpen(false)}>×</button>
            </div>

            <form onSubmit={handleCreateInfluencer} className="inf-modal-body">
              <div className="inf-form-row">
                <div className="inf-form-group">
                  <label className="admin-label">Creator Full Name *</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g. Elena Gomez"
                    value={newInf.name}
                    onChange={(e) => setNewInf({ ...newInf, name: e.target.value })}
                    required
                  />
                </div>

                <div className="inf-form-group">
                  <label className="admin-label">Email Address *</label>
                  <input
                    type="email"
                    className="admin-input"
                    placeholder="elena@creators.com"
                    value={newInf.email}
                    onChange={(e) => setNewInf({ ...newInf, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="inf-form-row">
                <div className="inf-form-group">
                  <label className="admin-label">Primary Platform</label>
                  <select
                    className="admin-input"
                    value={newInf.platform}
                    onChange={(e) => setNewInf({ ...newInf, platform: e.target.value })}
                  >
                    <option value="Instagram">Instagram</option>
                    <option value="TikTok">TikTok</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Blog">Blog / Website</option>
                  </select>
                </div>

                <div className="inf-form-group">
                  <label className="admin-label">Social Handle *</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="@elena_style"
                    value={newInf.handle}
                    onChange={(e) => setNewInf({ ...newInf, handle: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="inf-form-row">
                <div className="inf-form-group">
                  <label className="admin-label">Exclusive Coupon Code</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g. ELENA15 (Auto-generated if blank)"
                    value={newInf.couponCode}
                    onChange={(e) => setNewInf({ ...newInf, couponCode: e.target.value.toUpperCase() })}
                  />
                </div>

                <div className="inf-form-group">
                  <label className="admin-label">Commission Rate (%)</label>
                  <input
                    type="number"
                    className="admin-input"
                    min="1"
                    max="50"
                    value={newInf.commissionRate}
                    onChange={(e) => setNewInf({ ...newInf, commissionRate: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button
                  type="button"
                  className="admin-btn-secondary"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary">
                  Save & Activate Influencer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Influencer Details */}
      {isEditModalOpen && (
        <div className="inf-modal-backdrop" onClick={() => setIsEditModalOpen(false)}>
          <div className="inf-modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div className="inf-modal-header">
              <h4>Edit Influencer Settings</h4>
              <button className="inf-modal-close" onClick={() => setIsEditModalOpen(false)}>×</button>
            </div>

            <form onSubmit={handleSaveEdit} className="inf-modal-body">
              <div className="inf-form-group" style={{ marginBottom: '14px' }}>
                <label className="admin-label">Assigned Coupon Code</label>
                <input
                  type="text"
                  className="admin-input"
                  value={editForm.couponCode}
                  onChange={(e) => setEditForm({ ...editForm, couponCode: e.target.value })}
                  required
                />
              </div>

              <div className="inf-form-row" style={{ marginBottom: '14px' }}>
                <div className="inf-form-group">
                  <label className="admin-label">Customer Discount (%)</label>
                  <input
                    type="number"
                    className="admin-input"
                    min="5"
                    max="50"
                    value={editForm.discountPercent}
                    onChange={(e) => setEditForm({ ...editForm, discountPercent: e.target.value })}
                  />
                </div>

                <div className="inf-form-group">
                  <label className="admin-label">Commission Rate (%)</label>
                  <input
                    type="number"
                    className="admin-input"
                    min="1"
                    max="50"
                    value={editForm.commissionRate}
                    onChange={(e) => setEditForm({ ...editForm, commissionRate: e.target.value })}
                  />
                </div>
              </div>

              <div className="inf-form-group" style={{ marginBottom: '20px' }}>
                <label className="admin-label">Creator Ambassador Tier</label>
                <select
                  className="admin-input"
                  value={editForm.tier}
                  onChange={(e) => setEditForm({ ...editForm, tier: e.target.value })}
                >
                  <option value="Rising Creator">Rising Creator</option>
                  <option value="Silver Creator">Silver Creator</option>
                  <option value="Gold Ambassador">Gold Ambassador</option>
                  <option value="Platinum Partner">Platinum Partner</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="admin-btn-secondary"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary">
                  Update Partner Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: View Referred Orders */}
      {isOrdersModalOpen && selectedInfluencer && (
        <div className="inf-modal-backdrop" onClick={() => setIsOrdersModalOpen(false)}>
          <div className="inf-modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '720px' }}>
            <div className="inf-modal-header">
              <div>
                <h4 style={{ margin: 0 }}>Orders Referred by {selectedInfluencer.name}</h4>
                <span style={{ fontSize: '12px', color: '#5A1F2D', fontWeight: '700' }}>
                  Coupon: {selectedInfluencer.couponCode}
                </span>
              </div>
              <button className="inf-modal-close" onClick={() => setIsOrdersModalOpen(false)}>×</button>
            </div>

            <div className="inf-modal-body" style={{ padding: 0 }}>
              {selectedInfluencer.referredOrders && selectedInfluencer.referredOrders.length > 0 ? (
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Discount</th>
                        <th>Points Awarded</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedInfluencer.referredOrders.map((ord) => (
                        <tr key={ord.id}>
                          <td style={{ fontWeight: '700', color: '#5A1F2D' }}>{ord.id}</td>
                          <td>{ord.date}</td>
                          <td>{ord.customerName}</td>
                          <td style={{ fontWeight: '700' }}>${Number(ord.total).toFixed(2)}</td>
                          <td style={{ color: '#059669' }}>-${Number(ord.discount || 0).toFixed(2)}</td>
                          <td style={{ fontWeight: '700', color: '#d97706' }}>+{ord.pointsEarned} pts</td>
                          <td>
                            <span className="admin-status-badge status-completed">Completed</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '36px 20px', color: '#64748b' }}>
                  No orders have been placed with this creator's coupon code yet.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
