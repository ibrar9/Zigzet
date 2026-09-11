import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ShoppingBag, User, ArrowRight, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const UserLoginPage = () => {
  const { loginUser, registerUser, resetUserPassword, navigatePage } = useStore();
  const [isSignup, setIsSignup] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', agreeTerms: false });
  const [errors, setErrors] = useState({});

  // Forgot Password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotForm, setForgotForm] = useState({ email: '', newPassword: '', confirmPassword: '' });
  const [forgotStatus, setForgotStatus] = useState({ loading: false, error: '', success: '' });

  const validate = () => {
    const e = {};
    if (isSignup && !form.name.trim()) e.name = 'Full name required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email.trim())) e.email = 'Valid email required';
    if (!form.password || form.password.length < 6) e.password = 'Min. 6 characters';
    if (isSignup && form.password !== form.confirm) e.confirm = 'Passwords do not match';
    if (isSignup && !form.agreeTerms) e.agreeTerms = 'You must agree to the Terms & Privacy Policy';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const trimmedEmail = form.email.trim().toLowerCase();
    const success = isSignup
      ? registerUser({ name: form.name.trim(), email: trimmedEmail, password: form.password })
      : loginUser(trimmedEmail, form.password);
    setLoading(false);
    if (!success) {
      setErrors({ general: isSignup ? 'Email already registered.' : 'Invalid email or password.' });
    } else {
      navigatePage('user-dashboard');
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setForgotStatus({ loading: true, error: '', success: '' });
    if (!forgotForm.email.trim() || !/\S+@\S+\.\S+/.test(forgotForm.email.trim())) {
      setForgotStatus({ loading: false, error: 'Please enter a valid email address.', success: '' });
      return;
    }
    if (!forgotForm.newPassword || forgotForm.newPassword.length < 6) {
      setForgotStatus({ loading: false, error: 'Password must be at least 6 characters.', success: '' });
      return;
    }
    if (forgotForm.newPassword !== forgotForm.confirmPassword) {
      setForgotStatus({ loading: false, error: 'Passwords do not match.', success: '' });
      return;
    }

    await new Promise(r => setTimeout(r, 600));
    const res = resetUserPassword(forgotForm.email.trim().toLowerCase(), forgotForm.newPassword);
    if (res.success) {
      setForgotStatus({ loading: false, error: '', success: 'Password reset successfully! You can now log in.' });
      setTimeout(() => {
        setShowForgotModal(false);
        setForgotForm({ email: '', newPassword: '', confirmPassword: '' });
        setForgotStatus({ loading: false, error: '', success: '' });
      }, 1500);
    } else {
      setForgotStatus({ loading: false, error: res.message || 'Email not found in our records.', success: '' });
    }
  };

  const set = (key, val) => { setForm(f => ({ ...f, [key]: val })); setErrors({}); };

  return (
    <div className="nlogin-root">
      {/* ── Floating 3D Background Decorations ── */}
      <div className="nlogin-bg">
        {/* Left side shapes */}
        <div className="nfloat nfloat-bag-lg">
          <svg viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="25" width="70" height="60" rx="10" fill="white" stroke="#e0e4f0" strokeWidth="2"/>
            <path d="M28 25 C28 14 52 14 52 25" stroke="#5A1F2D" strokeWidth="3" strokeLinecap="round" fill="none"/>
            <path d="M32 52 L30 62 Q40 68 50 62 L48 52" fill="#5A1F2D" opacity="0.15" stroke="#5A1F2D" strokeWidth="1.5"/>
            <circle cx="33" cy="48" r="3" fill="#5A1F2D" opacity="0.6"/>
          </svg>
        </div>
        <div className="nfloat nfloat-squiggle1">
          <svg viewBox="0 0 120 90" fill="none">
            <path d="M10 45 Q30 10 50 45 Q70 80 90 45 Q110 10 120 45" stroke="white" strokeWidth="18" strokeLinecap="round" fill="none" filter="drop-shadow(2px 4px 8px rgba(0,0,0,0.08))"/>
          </svg>
        </div>
        <div className="nfloat nfloat-squiggle2">
          <svg viewBox="0 0 100 100" fill="none">
            <path d="M50 10 C70 10 90 30 90 50 C90 70 70 90 50 90 C30 90 10 70 10 50 C10 30 30 10 50 10" stroke="white" strokeWidth="16" fill="none" filter="drop-shadow(2px 4px 10px rgba(0,0,0,0.07))"/>
          </svg>
        </div>
        <div className="nfloat nfloat-dots1">
          {[...Array(25)].map((_, i) => <span key={i} className="ndot" />)}
        </div>

        {/* Right side shapes */}
        <div className="nfloat nfloat-cart">
          <svg viewBox="0 0 100 90" fill="none">
            <rect x="15" y="8" width="70" height="55" rx="8" fill="white" stroke="#dde2f0" strokeWidth="2"/>
            <path d="M5 20 L20 20 L30 55 L75 55 L85 28 L25 28" stroke="#5A1F2D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <circle cx="38" cy="72" r="7" fill="white" stroke="#5A1F2D" strokeWidth="2.5"/>
            <circle cx="65" cy="72" r="7" fill="white" stroke="#5A1F2D" strokeWidth="2.5"/>
          </svg>
        </div>
        <div className="nfloat nfloat-box">
          <div className="nfloat-icon-card">
            <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
              <rect x="3" y="12" width="26" height="18" rx="3" fill="#5A1F2D" opacity="0.12"/>
              <path d="M3 15 L16 22 L29 15" stroke="#5A1F2D" strokeWidth="2" fill="none"/>
              <path d="M16 22 L16 30" stroke="#5A1F2D" strokeWidth="2"/>
              <path d="M9 4 L16 7 L23 4" stroke="#5A1F2D" strokeWidth="2" fill="none"/>
              <rect x="3" y="7" width="26" height="15" rx="3" stroke="#5A1F2D" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>
        <div className="nfloat nfloat-tag">
          <div className="nfloat-icon-card">
            <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
              <path d="M4 4 L4 16 L16 28 Q20 32 24 28 L28 24 Q32 20 28 16 L16 4 Z" fill="#5A1F2D" opacity="0.12" stroke="#5A1F2D" strokeWidth="2"/>
              <circle cx="10" cy="10" r="2.5" fill="#5A1F2D"/>
            </svg>
          </div>
        </div>
        <div className="nfloat nfloat-squiggle3">
          <svg viewBox="0 0 80 120" fill="none">
            <path d="M40 5 Q65 30 40 55 Q15 80 40 105 Q55 115 60 110" stroke="white" strokeWidth="14" strokeLinecap="round" fill="none" filter="drop-shadow(2px 4px 8px rgba(0,0,0,0.07))"/>
          </svg>
        </div>
        <div className="nfloat nfloat-dots2">
          {[...Array(25)].map((_, i) => <span key={i} className="ndot" />)}
        </div>
      </div>

      {/* ── Center Login Card ── */}
      <div className="nlogin-card">
        {/* Logo */}
        <div className="nlogin-logo" onClick={() => navigatePage('home')}>
          <div className="nlogin-logo-icon">
            <ShoppingBag size={28} color="#5A1F2D" />
          </div>
          <p className="nlogin-logo-text">Zigzet</p>
        </div>

        {/* Heading */}
        <h2 className="nlogin-title">
          {isSignup ? 'Create Account' : 'Welcome Back'}
        </h2>
        <p className="nlogin-sub">
          {isSignup ? 'Join Zigzet and start shopping' : 'Login to access your account'}
        </p>

        {errors.general && (
          <div className="nlogin-error" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertCircle size={15} />
            <span>{errors.general}</span>
          </div>
        )}

        <form className="nlogin-form" onSubmit={handleSubmit}>
          {isSignup && (
            <div className="nlogin-field">
              <label>Name</label>
              <div className={`nlogin-input ${errors.name ? 'err' : ''}`}>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                />
                <User size={16} className="nlogin-input-icon" />
              </div>
              {errors.name && <span className="nlogin-err">{errors.name}</span>}
            </div>
          )}

          <div className="nlogin-field">
            <label>Email</label>
            <div className={`nlogin-input ${errors.email ? 'err' : ''}`}>
              <input
                type="email"
                placeholder="yourname@email.com"
                value={form.email}
                onChange={e => set('email', e.target.value)}
              />
              <Mail size={16} className="nlogin-input-icon" />
            </div>
            {errors.email && <span className="nlogin-err">{errors.email}</span>}
          </div>

          <div className="nlogin-field">
            <label>Password</label>
            <div className={`nlogin-input ${errors.password ? 'err' : ''}`}>
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Enter your password"
                value={form.password}
                onChange={e => set('password', e.target.value)}
              />
              <button type="button" className="nlogin-eye" onClick={() => setShowPass(p => !p)}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <span className="nlogin-err">{errors.password}</span>}
          </div>

          {isSignup && (
            <div className="nlogin-field">
              <label>Confirm Password</label>
              <div className={`nlogin-input ${errors.confirm ? 'err' : ''}`}>
                <input
                  type="password"
                  placeholder="Repeat your password"
                  value={form.confirm}
                  onChange={e => set('confirm', e.target.value)}
                />
              </div>
              {errors.confirm && <span className="nlogin-err">{errors.confirm}</span>}
            </div>
          )}

          {isSignup && (
            <div style={{ marginTop: '12px', marginBottom: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer', fontSize: '13px', color: '#4a5568' }}>
                <input
                  type="checkbox"
                  checked={form.agreeTerms}
                  onChange={e => set('agreeTerms', e.target.checked)}
                  style={{ accentColor: '#5A1F2D', marginTop: '3px', cursor: 'pointer' }}
                />
                <span>
                  I agree to the <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Please review our full Terms of Service & Privacy Policy below in the website footer.'); }} style={{ color: '#5A1F2D', fontWeight: 600, textDecoration: 'underline' }}>Terms of Service & Privacy Policy</a>.
                </span>
              </label>
              {errors.agreeTerms && <span className="nlogin-err" style={{ display: 'block', marginTop: '4px' }}>{errors.agreeTerms}</span>}
            </div>
          )}

          {!isSignup && (
            <div className="nlogin-forgot">
              <button type="button" onClick={() => setShowForgotModal(true)}>Forgot Password?</button>
            </div>
          )}

          <button
            type="submit"
            className={`nlogin-btn-primary ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading
              ? <span className="nlogin-spinner" />
              : isSignup ? 'Create Account' : 'Sign In'
            }
          </button>
        </form>

        {/* Switch mode */}
        <p className="nlogin-switch" style={{ marginTop: '20px' }}>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          {' '}
          <button
            type="button"
            onClick={() => {
              setIsSignup(p => !p);
              setErrors({});
              setForm({ name: '', email: '', password: '', confirm: '', agreeTerms: false });
            }}
          >
            {isSignup ? 'Sign In' : 'Create Account'}
          </button>
        </p>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          padding: '16px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            maxWidth: '440px',
            width: '100%',
            padding: '28px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            position: 'relative',
            animation: 'fadeInUp 0.25s ease'
          }}>
            <button
              onClick={() => setShowForgotModal(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                border: 'none',
                background: '#f3f4f6',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6b7280'
              }}
            >
              <X size={18} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(90, 31, 45, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px auto'
              }}>
                <Lock size={24} color="#5A1F2D" />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: '0 0 6px 0' }}>
                Reset Your Password
              </h3>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
                Enter your registered account email and choose a new password.
              </p>
            </div>

            {forgotStatus.error && (
              <div style={{
                background: '#fef2f2',
                border: '1px solid #fee2e2',
                color: '#dc2626',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px'
              }}>
                <AlertCircle size={16} />
                <span>{forgotStatus.error}</span>
              </div>
            )}

            {forgotStatus.success && (
              <div style={{
                background: '#f0fdf4',
                border: '1px solid #dcfce7',
                color: '#16a34a',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px'
              }}>
                <CheckCircle2 size={16} />
                <span>{forgotStatus.success}</span>
              </div>
            )}

            <form onSubmit={handleForgotSubmit}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Registered Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={forgotForm.email}
                    onChange={e => setForgotForm(f => ({ ...f, email: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 38px',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  <Mail size={16} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  New Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    required
                    placeholder="Min. 6 characters"
                    value={forgotForm.newPassword}
                    onChange={e => setForgotForm(f => ({ ...f, newPassword: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 38px',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  <Lock size={16} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Confirm New Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    required
                    placeholder="Confirm new password"
                    value={forgotForm.confirmPassword}
                    onChange={e => setForgotForm(f => ({ ...f, confirmPassword: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 38px',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  <Lock size={16} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    background: '#ffffff',
                    color: '#374151',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={forgotStatus.loading}
                  style={{
                    flex: 2,
                    padding: '10px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#5A1F2D',
                    color: '#ffffff',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: forgotStatus.loading ? 0.7 : 1
                  }}
                >
                  {forgotStatus.loading ? 'Updating...' : 'Set New Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
