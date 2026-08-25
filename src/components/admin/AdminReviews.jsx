import React, { useState } from 'react';
import { 
  Star, 
  CheckCircle2, 
  XCircle, 
  MessageSquare, 
  Search, 
  ShieldCheck, 
  Send, 
  CornerDownRight, 
  ThumbsUp,
  UserCheck
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CustomDropdown } from '../common/CustomDropdown';

export const AdminReviews = () => {
  const { reviews, moderateReview, showToast } = useStore();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [replyTextMap, setReplyTextMap] = useState({});
  const [activeReplyId, setActiveReplyId] = useState(null);

  const totalReviews = reviews.length;
  const pendingCount = reviews.filter((r) => r.status === 'Pending').length;
  const approvedCount = reviews.filter((r) => r.status === 'Approved').length;
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / Math.max(1, totalReviews)).toFixed(1);

  const filterOptions = [
    { value: 'all', label: 'All Reviews', dot: '#7c3aed', badge: totalReviews },
    { value: 'Pending', label: 'Pending Moderation', dot: '#f59e0b', badge: pendingCount },
    { value: 'Approved', label: 'Approved & Live', dot: '#10b981', badge: approvedCount },
    { value: 'Rejected', label: 'Rejected / Spam', dot: '#ef4444' }
  ];

  const filteredReviews = reviews.filter((r) => {
    const matchesSearch =
      r.productName.toLowerCase().includes(search.toLowerCase()) ||
      r.customerName.toLowerCase().includes(search.toLowerCase()) ||
      r.comment.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === 'all' || r.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleSendReply = (reviewId) => {
    const replyText = replyTextMap[reviewId];
    if (!replyText || !replyText.trim()) return;

    moderateReview(reviewId, 'Approved', replyText.trim());
    setActiveReplyId(null);
    setReplyTextMap({ ...replyTextMap, [reviewId]: '' });
  };

  return (
    <div className="admin-page-container">
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-section-title">Customer Reviews & Ratings Moderation ({totalReviews})</h2>
          <p className="admin-section-desc">Moderate product feedback, approve authentic verified reviews, and reply as the official store owner</p>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="admin-overview-stats-grid">
        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper purple">
            <MessageSquare size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Total Reviews</span>
            <span className="stat-main-number">{totalReviews}</span>
            <span className="stat-sub-text">Customer submissions</span>
          </div>
        </div>

        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper orange">
            <ShieldCheck size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Pending Approval</span>
            <span className="stat-main-number">{pendingCount}</span>
            <span className="stat-sub-text">Needs moderation</span>
          </div>
        </div>

        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper emerald">
            <CheckCircle2 size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Approved Live</span>
            <span className="stat-main-number">{approvedCount}</span>
            <span className="stat-sub-text">Visible on products</span>
          </div>
        </div>

        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper blue">
            <Star size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Store Avg. Rating</span>
            <span className="stat-main-number">{avgRating} / 5.0</span>
            <span className="stat-sub-text">Customer satisfaction</span>
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
              placeholder="Search by product, customer, or comment..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <CustomDropdown
            options={filterOptions}
            value={filter}
            onChange={(val) => setFilter(val)}
            minWidth="185px"
          />
        </div>
      </div>

      {/* Reviews Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredReviews.map((rev) => (
          <div key={rev.id} className="dash-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: '800', color: '#0f172a', fontSize: '15px' }}>{rev.customerName}</span>
                  {rev.verifiedPurchase && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#ecfdf5', color: '#10b981', fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '6px' }}>
                      <CheckCircle2 size={11} />
                      <span>Verified Buyer</span>
                    </span>
                  )}
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>• {rev.date}</span>
                </div>

                <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '600', display: 'block', marginTop: '2px' }}>
                  Product: <strong style={{ color: '#0f172a' }}>{rev.productName}</strong>
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className={`status-pill ${rev.status.toLowerCase()}`}>
                  <span className="status-dot-indicator" style={{ backgroundColor: rev.status === 'Approved' ? '#10b981' : rev.status === 'Pending' ? '#f59e0b' : '#ef4444' }} />
                  {rev.status}
                </span>

                <div style={{ display: 'flex', gap: '6px' }}>
                  {rev.status !== 'Approved' && (
                    <button
                      onClick={() => moderateReview(rev.id, 'Approved')}
                      style={{ padding: '6px 12px', borderRadius: '8px', background: '#ecfdf5', color: '#10b981', fontSize: '12px', fontWeight: '700', border: '1px solid #a7f3d0' }}
                    >
                      Approve
                    </button>
                  )}
                  {rev.status !== 'Rejected' && (
                    <button
                      onClick={() => moderateReview(rev.id, 'Rejected')}
                      style={{ padding: '6px 12px', borderRadius: '8px', background: '#fef2f2', color: '#ef4444', fontSize: '12px', fontWeight: '700', border: '1px solid #fecaca' }}
                    >
                      Reject
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Stars & Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={14}
                    fill={s <= rev.rating ? '#f59e0b' : '#e2e8f0'}
                    color={s <= rev.rating ? '#f59e0b' : '#e2e8f0'}
                  />
                ))}
              </div>
              <strong style={{ fontSize: '14px', color: '#0f172a' }}>{rev.title}</strong>
            </div>

            <p style={{ fontSize: '13.5px', color: '#334155', lineHeight: '1.6', marginBottom: '14px' }}>
              "{rev.comment}"
            </p>

            {/* Admin Reply Box */}
            {rev.adminReply ? (
              <div style={{ background: '#f8fafc', padding: '14px 18px', borderRadius: '10px', borderLeft: '3px solid #7c3aed', marginTop: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700', color: '#7c3aed', marginBottom: '4px' }}>
                  <CornerDownRight size={13} />
                  <span>Zigzet Store Response:</span>
                </div>
                <p style={{ fontSize: '13px', color: '#475569' }}>{rev.adminReply}</p>
              </div>
            ) : (
              <div>
                {activeReplyId === rev.id ? (
                  <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="Write an official response to this review..."
                      value={replyTextMap[rev.id] || ''}
                      onChange={(e) => setReplyTextMap({ ...replyTextMap, [rev.id]: e.target.value })}
                      style={{ flex: 1, padding: '8px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none' }}
                    />
                    <button
                      className="hero-cta-btn"
                      onClick={() => handleSendReply(rev.id)}
                      style={{ padding: '8px 18px', fontSize: '12.5px' }}
                    >
                      <Send size={13} />
                      <span>Post Reply</span>
                    </button>
                    <button
                      onClick={() => setActiveReplyId(null)}
                      style={{ padding: '8px 14px', borderRadius: '8px', background: '#f1f5f9', color: '#64748b', fontSize: '12.5px', fontWeight: '600' }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveReplyId(rev.id)}
                    style={{ fontSize: '12.5px', color: '#7c3aed', fontWeight: '700', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    <MessageSquare size={13} />
                    <span>Reply as Store Owner</span>
                  </button>
                )}
              </div>
            )}
          </div>
        ))}

        {filteredReviews.length === 0 && (
          <div className="dash-card" style={{ textAlign: 'center', padding: '48px 0', color: '#94a3b8' }}>
            <MessageSquare size={40} color="#cbd5e1" style={{ margin: '0 auto 12px auto' }} />
            <p style={{ fontWeight: '600', color: '#475569' }}>No customer reviews match the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};
