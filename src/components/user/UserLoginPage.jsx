import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ShoppingBag, User, ArrowRight, AlertCircle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const UserLoginPage = () => {
  const { loginUser, registerUser, navigatePage } = useStore();
  const [isSignup, setIsSignup] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (isSignup && !form.name.trim()) e.name = 'Full name required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.password || form.password.length < 6) e.password = 'Min. 6 characters';
    if (isSignup && form.password !== form.confirm) e.confirm = 'Passwords do not match';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const success = isSignup
      ? registerUser({ name: form.name, email: form.email, password: form.password })
      : loginUser(form.email, form.password);
    setLoading(false);
    if (!success) {
      setErrors({ general: isSignup ? 'Email already registered.' : 'Invalid email or password.' });
    } else {
      navigatePage('user-dashboard');
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
            <path d="M28 25 C28 14 52 14 52 25" stroke="#5b4fff" strokeWidth="3" strokeLinecap="round" fill="none"/>
            <path d="M32 52 L30 62 Q40 68 50 62 L48 52" fill="#5b4fff" opacity="0.15" stroke="#5b4fff" strokeWidth="1.5"/>
            <circle cx="33" cy="48" r="3" fill="#5b4fff" opacity="0.6"/>
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
            <path d="M5 20 L20 20 L30 55 L75 55 L85 28 L25 28" stroke="#5b4fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <circle cx="38" cy="72" r="7" fill="white" stroke="#5b4fff" strokeWidth="2.5"/>
            <circle cx="65" cy="72" r="7" fill="white" stroke="#5b4fff" strokeWidth="2.5"/>
          </svg>
        </div>
        <div className="nfloat nfloat-box">
          <div className="nfloat-icon-card">
            <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
              <rect x="3" y="12" width="26" height="18" rx="3" fill="#5b4fff" opacity="0.12"/>
              <path d="M3 15 L16 22 L29 15" stroke="#5b4fff" strokeWidth="2" fill="none"/>
              <path d="M16 22 L16 30" stroke="#5b4fff" strokeWidth="2"/>
              <path d="M9 4 L16 7 L23 4" stroke="#5b4fff" strokeWidth="2" fill="none"/>
              <rect x="3" y="7" width="26" height="15" rx="3" stroke="#5b4fff" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>
        <div className="nfloat nfloat-tag">
          <div className="nfloat-icon-card">
            <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
              <path d="M4 4 L4 16 L16 28 Q20 32 24 28 L28 24 Q32 20 28 16 L16 4 Z" fill="#5b4fff" opacity="0.12" stroke="#5b4fff" strokeWidth="2"/>
              <circle cx="10" cy="10" r="2.5" fill="#5b4fff"/>
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
            <ShoppingBag size={28} color="#5b4fff" />
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

          {!isSignup && (
            <div className="nlogin-forgot">
              <button type="button">Forgot Password?</button>
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
              setForm({ name: '', email: '', password: '', confirm: '' });
            }}
          >
            {isSignup ? 'Sign In' : 'Create Account'}
          </button>
        </p>
      </div>
    </div>
  );
};
