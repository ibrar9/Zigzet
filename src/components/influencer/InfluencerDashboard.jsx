import React, { useState } from 'react';
import { 
  Sparkles, 
  Tag, 
  Copy, 
  Check, 
  DollarSign, 
  ShoppingBag, 
  Award, 
  Share2, 
  LogOut, 
  ExternalLink, 
  ArrowUpRight, 
  TrendingUp, 
  Wallet, 
  CheckCircle2, 
  Clock, 
  Package, 
  Store,
  Layers
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { InfluencerProducts } from './InfluencerProducts';

export const InfluencerDashboard = ({ influencer }) => {
  const { logoutInfluencer, navigatePage, formatPrice, requestInfluencerPayout, showToast } = useStore();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'products' | 'payouts'
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [payoutForm, setPayoutForm] = useState({
    points: 500,
    method: 'PayPal',
    details: ''
  });

  const couponCode = influencer?.couponCode || 'CREATOR15';
  const discountPercent = influencer?.discountPercent || 15;
  const commissionRate = influencer?.commissionRate || 10;
  const pointsBalance = influencer?.pointsBalance || 0;
  const cashEquivalent = pointsBalance / 10; // 10 points = $1

  const origin = window.location.origin;
  const affiliateUrl = `${origin}/?ref=${couponCode}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(couponCode);
    setCopiedCode(true);
    showToast('Coupon Code Copied!', `Promo code "${couponCode}" copied to clipboard.`);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(affiliateUrl);
    setCopiedLink(true);
    showToast('Store Referral Link Copied!', 'Share this link to automatically track customer orders.');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = `Hey! Check out Zigzet and get ${discountPercent}% OFF with my exclusive code ${couponCode}: ${affiliateUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShareTwitter = () => {
    const text = `Use code ${couponCode} for ${discountPercent}% off luxury beauty & lifestyle goods at @Zigzet: ${affiliateUrl}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSubmitPayout = (e) => {
    e.preventDefault();
    const pts = Number(payoutForm.points);
    if (!pts || pts <= 0) {
      showToast('Invalid Amount', 'Please specify a valid points amount.', 'error');
      return;
    }
    if (pts > pointsBalance) {
      showToast('Insufficient Points', `You only have ${pointsBalance} points available.`, 'error');
      return;
    }
    if (!payoutForm.details.trim()) {
      showToast('Details Required', `Please enter your ${payoutForm.method} account details.`, 'error');
      return;
    }

    const success = requestInfluencerPayout(influencer.id, pts, payoutForm.method, payoutForm.details);
    if (success) {
      setIsPayoutModalOpen(false);
      setPayoutForm({ points: 500, method: 'PayPal', details: '' });
    }
  };

  return (
    <div className="inf-dashboard-root">
      {/* Top Navbar */}
      <header className="inf-top-navbar">
        <div className="inf-navbar-left">
          <div className="inf-creator-badge-brand">
            <Sparkles size={18} color="#5A1F2D" />
            <span>Zigzet Creator Studio</span>
          </div>
          <span className="inf-divider-dot">•</span>
          <span className="inf-creator-tier-pill">{influencer.tier || 'Verified Creator'}</span>
        </div>

        <div className="inf-navbar-right">
          <button className="inf-btn-store" onClick={() => navigatePage('home')}>
            <Store size={15} />
            <span>View Storefront</span>
          </button>
          <button className="inf-btn-logout" onClick={logoutInfluencer}>
            <LogOut size={15} />
            <span>Log Out</span>
          </button>
        </div>
      </header>

      {/* Creator Profile Hero Bar */}
      <section className="inf-creator-hero">
        <div className="inf-creator-profile-row">
          <div className="inf-creator-avatar-wrap">
            <img src={influencer.avatar} alt={influencer.name} />
            <span className="inf-verified-tick">✓</span>
          </div>

          <div className="inf-creator-info">
            <div className="inf-creator-name-row">
              <h2>{influencer.name}</h2>
              <span className="inf-handle-pill">{influencer.handle}</span>
              <span className="inf-status-tag">{influencer.status}</span>
            </div>
            <p className="inf-creator-meta">
              <span>{influencer.platform}</span> • <span>{influencer.followers} Reach</span> • <span>{influencer.niche}</span>
            </p>
          </div>

          <div className="inf-creator-points-box">
            <div className="inf-points-label">Available Points Balance</div>
            <div className="inf-points-value">
              <Award size={22} color="#5A1F2D" />
              <span>{pointsBalance.toLocaleString()} pts</span>
            </div>
            <div className="inf-points-cash">≈ ${cashEquivalent.toFixed(2)} USD Value</div>
            <button className="inf-btn-redeem" onClick={() => setIsPayoutModalOpen(true)}>
              Redeem / Cash Out
            </button>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="inf-main-container">
        {/* KPI Stat Cards Grid */}
        <div className="inf-stats-grid">
          <div className="inf-stat-card">
            <div className="inf-stat-icon" style={{ background: '#fdf2f4', color: '#5A1F2D' }}>
              <DollarSign size={20} />
            </div>
            <div className="inf-stat-content">
              <span className="inf-stat-title">Total Sales Generated</span>
              <h3 className="inf-stat-number">${(influencer.totalSales || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
              <span className="inf-stat-hint">Customer orders referred</span>
            </div>
          </div>

          <div className="inf-stat-card">
            <div className="inf-stat-icon" style={{ background: '#ecfdf5', color: '#059669' }}>
              <ShoppingBag size={20} />
            </div>
            <div className="inf-stat-content">
              <span className="inf-stat-title">Total Orders Referred</span>
              <h3 className="inf-stat-number">{influencer.totalOrders || 0}</h3>
              <span className="inf-stat-hint">Completed checkouts</span>
            </div>
          </div>

          <div className="inf-stat-card">
            <div className="inf-stat-icon" style={{ background: '#fffbeb', color: '#d97706' }}>
              <Award size={20} />
            </div>
            <div className="inf-stat-content">
              <span className="inf-stat-title">Lifetime Points Earned</span>
              <h3 className="inf-stat-number">{(influencer.pointsEarned || 0).toLocaleString()} pts</h3>
              <span className="inf-stat-hint">1 point per $1 referred</span>
            </div>
          </div>

          <div className="inf-stat-card">
            <div className="inf-stat-icon" style={{ background: '#f5f3ff', color: '#7c3aed' }}>
              <TrendingUp size={20} />
            </div>
            <div className="inf-stat-content">
              <span className="inf-stat-title">Commission Rate</span>
              <h3 className="inf-stat-number">{commissionRate}%</h3>
              <span className="inf-stat-hint">{discountPercent}% discount for fans</span>
            </div>
          </div>
        </div>

        {/* Exclusive Promo Code & Sharing Card */}
        <div className="inf-share-card">
          <div className="inf-share-left">
            <div className="inf-share-badge">
              <Tag size={14} />
              <span>Your Exclusive Discount Code</span>
            </div>
            <h4>Share Your Code & Earn On Every Sale</h4>
            <p>
              Your audience saves <strong>{discountPercent}% OFF</strong> their entire order, and you earn <strong>{commissionRate}% in points</strong> automatically.
            </p>

            <div className="inf-code-row">
              <div className="inf-code-pill">
                <span className="inf-code-text">{couponCode}</span>
                <span className="inf-code-benefit">{discountPercent}% OFF</span>
              </div>
              <button
                className={`inf-btn-copy-code ${copiedCode ? 'copied' : ''}`}
                onClick={handleCopyCode}
              >
                {copiedCode ? <Check size={16} /> : <Copy size={16} />}
                <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>
          </div>

          <div className="inf-share-right">
            <label className="admin-label" style={{ color: '#475569', fontSize: '13px' }}>
              Direct Referral Storefront Link:
            </label>
            <div className="inf-link-box">
              <input type="text" readOnly value={affiliateUrl} />
              <button onClick={handleCopyLink} className="inf-btn-copy-link">
                {copiedLink ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedLink ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="inf-social-buttons">
              <button onClick={handleShareWhatsApp} className="inf-social-btn whatsapp">
                <span>Share WhatsApp</span>
              </button>
              <button onClick={handleShareTwitter} className="inf-social-btn twitter">
                <span>Share on X</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="inf-tabs-bar">
          <button
            className={`inf-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <TrendingUp size={16} />
            <span>Referred Orders & Sales ({influencer.referredOrders?.length || 0})</span>
          </button>

          <button
            className={`inf-tab-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <Package size={16} />
            <span>All Products Catalog & Affiliate Links</span>
          </button>

          <button
            className={`inf-tab-btn ${activeTab === 'payouts' ? 'active' : ''}`}
            onClick={() => setActiveTab('payouts')}
          >
            <Wallet size={16} />
            <span>Points & Payouts ({influencer.payouts?.length || 0})</span>
          </button>
        </div>

        {/* Tab 1: Orders & Sales Activity */}
        {activeTab === 'overview' && (
          <div className="inf-tab-content">
            <div className="admin-card">
              <div className="admin-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '700' }}>Referred Sales History</h4>
                  <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#64748b' }}>
                    Customer purchases made using coupon "{couponCode}".
                  </p>
                </div>
                <span className="inf-badge-success">{influencer.referredOrders?.length || 0} Orders Tracked</span>
              </div>

              <div className="admin-card-body" style={{ padding: 0 }}>
                {influencer.referredOrders && influencer.referredOrders.length > 0 ? (
                  <div className="table-responsive">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Date</th>
                          <th>Customer</th>
                          <th>Order Amount</th>
                          <th>Discount Given</th>
                          <th>Points Earned</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {influencer.referredOrders.map((ord) => (
                          <tr key={ord.id}>
                            <td style={{ fontWeight: '700', color: '#5A1F2D' }}>{ord.id}</td>
                            <td>{ord.date}</td>
                            <td>{ord.customerName}</td>
                            <td style={{ fontWeight: '700' }}>${Number(ord.total).toFixed(2)}</td>
                            <td style={{ color: '#059669' }}>-${Number(ord.discount || 0).toFixed(2)}</td>
                            <td>
                              <span className="inf-points-tag">+{ord.pointsEarned || 0} pts</span>
                            </td>
                            <td>
                              <span className="inf-badge-pill-completed">Completed</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="inf-empty-state">
                    <div className="inf-empty-icon">🛍️</div>
                    <h4>No Referred Orders Yet</h4>
                    <p>Share your promo code "{couponCode}" on social media. Whenever a fan buys, their order will appear here in real time!</p>
                    <button className="admin-btn-primary" onClick={handleCopyLink}>
                      Copy Store Link
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: All Products Catalog ("Sare product ka option") */}
        {activeTab === 'products' && (
          <div className="inf-tab-content">
            <InfluencerProducts influencer={influencer} />
          </div>
        )}

        {/* Tab 3: Points & Payouts */}
        {activeTab === 'payouts' && (
          <div className="inf-tab-content">
            <div className="inf-payouts-grid">
              {/* Points Summary Card */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '700' }}>Points & Redemption</h4>
                </div>
                <div className="admin-card-body">
                  <div className="inf-payout-balance-box">
                    <span className="inf-payout-balance-title">Available Points to Cash Out</span>
                    <h2 className="inf-payout-balance-number">{pointsBalance.toLocaleString()} pts</h2>
                    <p className="inf-payout-balance-sub">Current Value: ${(pointsBalance / 10).toFixed(2)} USD</p>
                    <button
                      className="admin-btn-primary"
                      onClick={() => setIsPayoutModalOpen(true)}
                      disabled={pointsBalance < 100}
                    >
                      {pointsBalance < 100 ? 'Min. 100 Points Needed' : 'Request Payout'}
                    </button>
                  </div>

                  <div className="inf-payout-rules">
                    <h5>Redemption Rules:</h5>
                    <ul>
                      <li>10 reward points = $1.00 USD cash equivalent.</li>
                      <li>Minimum payout threshold is 100 points ($10.00).</li>
                      <li>Payouts are processed via PayPal, Bank Wire, or Zigzet Gift Card within 48 hours.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Payout History */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '700' }}>Payout History</h4>
                </div>
                <div className="admin-card-body" style={{ padding: 0 }}>
                  {influencer.payouts && influencer.payouts.length > 0 ? (
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Payout ID</th>
                          <th>Date</th>
                          <th>Points</th>
                          <th>Amount</th>
                          <th>Method</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {influencer.payouts.map((pay) => (
                          <tr key={pay.id}>
                            <td style={{ fontWeight: '600' }}>{pay.id}</td>
                            <td>{pay.date}</td>
                            <td>{pay.points} pts</td>
                            <td style={{ fontWeight: '700', color: '#10b981' }}>${Number(pay.amount).toFixed(2)}</td>
                            <td>{pay.method}</td>
                            <td>
                              <span className={`inf-badge-pill-${pay.status.toLowerCase()}`}>
                                {pay.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="inf-empty-state" style={{ padding: '36px 20px' }}>
                      <p style={{ color: '#64748b' }}>No payout requests submitted yet.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payout Request Modal */}
      {isPayoutModalOpen && (
        <div className="inf-modal-backdrop" onClick={() => setIsPayoutModalOpen(false)}>
          <div className="inf-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="inf-modal-header">
              <h4>Request Payout</h4>
              <button className="inf-modal-close" onClick={() => setIsPayoutModalOpen(false)}>×</button>
            </div>

            <form onSubmit={handleSubmitPayout} className="inf-modal-body">
              <div className="inf-form-group" style={{ marginBottom: '14px' }}>
                <label className="admin-label">Points to Cash Out (Max: {pointsBalance})</label>
                <input
                  type="number"
                  className="admin-input"
                  min="100"
                  max={pointsBalance}
                  value={payoutForm.points}
                  onChange={(e) => setPayoutForm({ ...payoutForm, points: e.target.value })}
                  required
                />
                <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '600', marginTop: '4px', display: 'block' }}>
                  ≈ ${(Number(payoutForm.points || 0) / 10).toFixed(2)} USD Cash
                </span>
              </div>

              <div className="inf-form-group" style={{ marginBottom: '14px' }}>
                <label className="admin-label">Payout Method</label>
                <select
                  className="admin-input"
                  value={payoutForm.method}
                  onChange={(e) => setPayoutForm({ ...payoutForm, method: e.target.value })}
                >
                  <option value="PayPal">PayPal</option>
                  <option value="Bank Wire">Bank Wire Transfer</option>
                  <option value="Zigzet Gift Card">Zigzet Store Credit / Gift Card (+10% Bonus)</option>
                </select>
              </div>

              <div className="inf-form-group" style={{ marginBottom: '20px' }}>
                <label className="admin-label">
                  {payoutForm.method === 'PayPal' ? 'PayPal Email Address' : payoutForm.method === 'Bank Wire' ? 'IBAN / Bank Account & Routing' : 'Recipient Email for Gift Card'}
                </label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder={payoutForm.method === 'PayPal' ? 'paypal@yourmail.com' : 'Account Details'}
                  value={payoutForm.details}
                  onChange={(e) => setPayoutForm({ ...payoutForm, details: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="admin-btn-secondary"
                  onClick={() => setIsPayoutModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary">
                  Confirm Payout Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
