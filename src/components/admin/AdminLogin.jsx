import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowLeft, LogIn } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminLogin = () => {
  const { loginAdmin, setViewMode } = useStore();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const success = loginAdmin(username, password);
    if (!success) {
      setErrorMsg('Invalid username or password. Default is admin / admin123');
    }
  };

  const handleBackToStore = () => {
    window.location.hash = '';
    setViewMode('store');
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        {/* Back link */}
        <button 
          className="admin-login-back"
          onClick={handleBackToStore}
        >
          <ArrowLeft size={16} />
          <span>Back to Storefront</span>
        </button>

        {/* Lock Icon Header */}
        <div className="admin-login-header">
          <div className="admin-lock-icon">
            <ShieldCheck size={32} />
          </div>
          <h2>Zigzet Admin Portal</h2>
          <p>Please enter your credentials to access store management</p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="admin-login-error">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin}>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label>Username</label>
            <div className="login-input-box">
              <User size={16} color="#9ca3af" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                autoFocus
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label>Password</label>
            <div className="login-input-box">
              <Lock size={16} color="#9ca3af" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ color: '#9ca3af', padding: '2px' }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="hero-cta-btn"
            style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '14.5px' }}
          >
            <LogIn size={16} />
            <span>Sign In to Admin Portal</span>
          </button>
        </form>

        {/* Credentials reminder box */}
        <div className="admin-login-hint">
          <span>Default Credentials:</span>
          <strong>Username: <code>admin</code> | Password: <code>admin123</code></strong>
        </div>
      </div>
    </div>
  );
};
