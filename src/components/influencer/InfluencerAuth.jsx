import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Award, 
  CheckCircle2, 
  Tag, 
  Instagram, 
  Youtube, 
  Share2, 
  Lock, 
  Mail, 
  User, 
  Globe, 
  Users, 
  ArrowLeft,
  DollarSign
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const InfluencerAuth = () => {
  const { registerInfluencer, loginInfluencer, influencers, navigatePage, showToast } = useStore();
  const [isRegister, setIsRegister] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    platform: 'Instagram',
    handle: '',
    profileUrl: '',
    followers: '10K-50K',
    niche: 'Beauty & Skincare',
    couponCode: ''
  });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleNameChange = (val) => {
    setForm((f) => {
      const cleanName = val.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 8);
      const suggestedCode = cleanName ? `${cleanName}15` : '';
      return {
        ...f,
        name: val,
        couponCode: f.couponCode ? f.couponCode : suggestedCode
      };
    });
    setErrors({});
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email is required';
    if (!form.password || form.password.length < 6) errs.password = 'Min 6 characters required';
    if (!form.handle.trim()) errs.handle = 'Social handle is required (e.g. @username)';
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const success = registerInfluencer(form);
    if (!success) {
      setErrors({ general: 'Email or handle already registered.' });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginForm.email.trim() || !loginForm.password) {
      setErrors({ general: 'Please enter both email and password.' });
      return;
    }
    const success = loginInfluencer(loginForm.email, loginForm.password);
    if (!success) {
      setErrors({ general: 'Invalid email or password.' });
    }
  };

  const handleQuickDemoLogin = (inf) => {
    loginInfluencer(inf.email, inf.password || 'password123');
  };

  return (
    <div className="inf-auth-page">
      {/* Top Bar with Return Link */}
      <div className="inf-auth-nav">
        <button className="inf-back-btn" onClick={() => navigatePage('home')}>
          <ArrowLeft size={16} />
          <span>Return to Store</span>
        </button>
        <div className="inf-brand-tag">
          <Sparkles size={16} color="#5A1F2D" />
          <span>Zigzet Creator & Influencer Hub</span>
        </div>
      </div>

      <div className="inf-auth-container">
        {/* Left Side: Program Value Proposition */}
        <div className="inf-hero-card">
          <div className="inf-hero-pill">
            <Award size={14} />
            <span>Official Partner Program</span>
          </div>
          <h2>Turn Your Audience Into Revenue with Zigzet</h2>
          <p className="inf-hero-desc">
            Partner with Zigzet and earn generous commissions, personal discount codes for your followers, and redeemable points on every single sale you generate.
          </p>

          <div className="inf-perks-list">
            <div className="inf-perk-item">
              <div className="inf-perk-icon">
                <Tag size={18} />
              </div>
              <div className="inf-perk-text">
                <h5>Exclusive 15% Audience Promo Code</h5>
                <p>Get your own custom coupon code (e.g. YOURNAME15) to share with your audience.</p>
              </div>
            </div>

            <div className="inf-perk-item">
              <div className="inf-perk-icon">
                <DollarSign size={18} />
              </div>
              <div className="inf-perk-text">
                <h5>Up to 12% Commission & Reward Points</h5>
                <p>Earn 1 reward point per $1 referred. Redeem your points for PayPal cash, gift cards, or bank wire.</p>
              </div>
            </div>

            <div className="inf-perk-item">
              <div className="inf-perk-icon">
                <Share2 size={18} />
              </div>
              <div className="inf-perk-text">
                <h5>Promote Any Store Product</h5>
                <p>Access our entire product inventory and generate custom affiliate tracking links with 1 click.</p>
              </div>
            </div>

            <div className="inf-perk-item">
              <div className="inf-perk-icon">
                <Sparkles size={18} />
              </div>
              <div className="inf-perk-text">
                <h5>100 Bonus Points on Sign-Up</h5>
                <p>Kickstart your partnership with an instant 100 reward points credited upon registration.</p>
              </div>
            </div>
          </div>

          {/* Quick Demo Logins for fast tester access */}
          <div className="inf-demo-login-box">
            <span className="inf-demo-title">⚡ Quick Demo Creator Access:</span>
            <div className="inf-demo-chips">
              {influencers.slice(0, 3).map((inf) => (
                <button
                  key={inf.id}
                  type="button"
                  className="inf-demo-chip"
                  onClick={() => handleQuickDemoLogin(inf)}
                >
                  <img src={inf.avatar} alt={inf.name} />
                  <span>{inf.name} ({inf.couponCode})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="inf-form-card">
          {/* Mode Switcher Tabs */}
          <div className="inf-auth-tabs">
            <button
              className={`inf-auth-tab ${isRegister ? 'active' : ''}`}
              onClick={() => { setIsRegister(true); setErrors({}); }}
            >
              Apply as Creator
            </button>
            <button
              className={`inf-auth-tab ${!isRegister ? 'active' : ''}`}
              onClick={() => { setIsRegister(false); setErrors({}); }}
            >
              Creator Sign In
            </button>
          </div>

          {errors.general && (
            <div className="inf-alert-error">
              <span>{errors.general}</span>
            </div>
          )}

          {isRegister ? (
            /* Registration / Application Form */
            <form onSubmit={handleRegister} className="inf-form-body">
              <div className="inf-form-row">
                <div className="inf-form-group">
                  <label className="admin-label">Full Name *</label>
                  <div className="inf-input-wrapper">
                    <User size={16} color="#94a3b8" />
                    <input
                      type="text"
                      placeholder="e.g. Sarah Miller"
                      value={form.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      required
                    />
                  </div>
                  {errors.name && <span className="inf-field-error">{errors.name}</span>}
                </div>

                <div className="inf-form-group">
                  <label className="admin-label">Email Address *</label>
                  <div className="inf-input-wrapper">
                    <Mail size={16} color="#94a3b8" />
                    <input
                      type="email"
                      placeholder="creator@gmail.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                  {errors.email && <span className="inf-field-error">{errors.email}</span>}
                </div>
              </div>

              <div className="inf-form-row">
                <div className="inf-form-group">
                  <label className="admin-label">Account Password *</label>
                  <div className="inf-input-wrapper">
                    <Lock size={16} color="#94a3b8" />
                    <input
                      type="password"
                      placeholder="Min. 6 characters"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      required
                    />
                  </div>
                  {errors.password && <span className="inf-field-error">{errors.password}</span>}
                </div>

                <div className="inf-form-group">
                  <label className="admin-label">Primary Social Platform</label>
                  <select
                    className="admin-input"
                    value={form.platform}
                    onChange={(e) => setForm({ ...form, platform: e.target.value })}
                  >
                    <option value="Instagram">Instagram</option>
                    <option value="TikTok">TikTok</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Blog">Personal Blog / Website</option>
                    <option value="X">X (Twitter)</option>
                    <option value="Pinterest">Pinterest</option>
                  </select>
                </div>
              </div>

              <div className="inf-form-row">
                <div className="inf-form-group">
                  <label className="admin-label">Social Handle / Username *</label>
                  <div className="inf-input-wrapper">
                    <span style={{ color: '#94a3b8', fontSize: '14px', fontWeight: '600' }}>@</span>
                    <input
                      type="text"
                      placeholder="your_handle"
                      value={form.handle.replace(/^@/, '')}
                      onChange={(e) => setForm({ ...form, handle: e.target.value })}
                      required
                    />
                  </div>
                  {errors.handle && <span className="inf-field-error">{errors.handle}</span>}
                </div>

                <div className="inf-form-group">
                  <label className="admin-label">Followers / Audience Size</label>
                  <select
                    className="admin-input"
                    value={form.followers}
                    onChange={(e) => setForm({ ...form, followers: e.target.value })}
                  >
                    <option value="1K - 10K">1K - 10K (Micro Creator)</option>
                    <option value="10K - 50K">10K - 50K (Rising Creator)</option>
                    <option value="50K - 200K">50K - 200K (Macro Creator)</option>
                    <option value="200K+">200K+ (Top Tier Creator)</option>
                  </select>
                </div>
              </div>

              <div className="inf-form-row">
                <div className="inf-form-group">
                  <label className="admin-label">Content Niche</label>
                  <select
                    className="admin-input"
                    value={form.niche}
                    onChange={(e) => setForm({ ...form, niche: e.target.value })}
                  >
                    <option value="Beauty & Skincare">Beauty & Skincare</option>
                    <option value="Tech & Modern Gadgets">Tech & Modern Gadgets</option>
                    <option value="Fashion & Apparel">Fashion & Apparel</option>
                    <option value="Home & Living">Home & Living</option>
                    <option value="Fitness & Lifestyle">Fitness & Lifestyle</option>
                  </select>
                </div>

                <div className="inf-form-group">
                  <label className="admin-label">
                    <span>Desired Discount Code</span>
                    <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700' }}>15% OFF for Fans</span>
                  </label>
                  <div className="inf-input-wrapper">
                    <Tag size={16} color="#5A1F2D" />
                    <input
                      type="text"
                      placeholder="e.g. SARAH15"
                      value={form.couponCode}
                      onChange={(e) => setForm({ ...form, couponCode: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '') })}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="admin-btn-primary inf-submit-btn">
                <span>Complete Application & Get My Code</span>
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            /* Creator Sign In Form */
            <form onSubmit={handleLogin} className="inf-form-body">
              <div className="inf-form-group" style={{ marginBottom: '16px' }}>
                <label className="admin-label">Creator Account Email</label>
                <div className="inf-input-wrapper">
                  <Mail size={16} color="#94a3b8" />
                  <input
                    type="email"
                    placeholder="sophia@glamvance.com"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="inf-form-group" style={{ marginBottom: '24px' }}>
                <label className="admin-label">Password</label>
                <div className="inf-input-wrapper">
                  <Lock size={16} color="#94a3b8" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="admin-btn-primary inf-submit-btn">
                <span>Sign In to Creator Dashboard</span>
                <ArrowRight size={16} />
              </button>

              <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
                Don't have an influencer account yet?{' '}
                <span
                  style={{ color: '#5A1F2D', fontWeight: '700', cursor: 'pointer' }}
                  onClick={() => { setIsRegister(true); setErrors({}); }}
                >
                  Apply Here
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
