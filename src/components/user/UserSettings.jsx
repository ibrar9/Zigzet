import React, { useState } from 'react';
import { Bell, Moon, Sun, Lock, Shield, Save, LogOut, Trash2, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const UserSettings = () => {
  const { logoutUser, navigatePage, showToast } = useStore();
  const [notifs, setNotifs] = useState({ orders: true, promos: true, wishlist: false, newsletter: true });
  const [darkMode, setDarkMode] = useState(false);
  const [pw, setPw] = useState({ cur: '', nw: '', conf: '' });
  const [showPw, setShowPw] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);

  const handlePwSave = () => {
    if (!pw.cur || !pw.nw) { showToast('Error', 'Fill all fields.', 'error'); return; }
    if (pw.nw !== pw.conf) { showToast('Error', 'Passwords do not match.', 'error'); return; }
    if (pw.nw.length < 6) { showToast('Error', 'Min. 6 characters.', 'error'); return; }
    setPwSaved(true);
    setPw({ cur: '', nw: '', conf: '' });
    showToast('Password Updated', 'Your password has been changed.');
    setTimeout(() => setPwSaved(false), 2500);
  };

  const Toggle = ({ on, onClick }) => (
    <button
      className={`ud2-toggle2 ${on ? 'on' : ''}`}
      onClick={onClick}
      style={{ background: on ? '#7c3aed' : '#e5e7eb' }}
    >
      <span className="ud2-toggle2-knob" />
    </button>
  );

  return (
    <div className="ud2-orders-page">
      <div className="ud2-page-heading">
        <h2>Settings</h2>
        <p>Manage your account preferences</p>
      </div>

      <div className="ud2-settings-grid">
        {/* Notifications */}
        <div className="ud2-section-card">
          <h3 className="ud2-settings-section-title"><Bell size={16} /> Notifications</h3>
          {[
            { key: 'orders', label: 'Order Updates', desc: 'Status changes for your orders' },
            { key: 'promos', label: 'Promotions & Deals', desc: 'Flash sales and special offers' },
            { key: 'wishlist', label: 'Wishlist Alerts', desc: 'Price drops and restocks' },
            { key: 'newsletter', label: 'Newsletter', desc: 'Weekly product recommendations' },
          ].map(item => (
            <div className="ud2-settings-row2" key={item.key}>
              <div>
                <p className="ud2-sr-title">{item.label}</p>
                <p className="ud2-sr-desc">{item.desc}</p>
              </div>
              <Toggle on={notifs[item.key]} onClick={() => setNotifs(n => ({ ...n, [item.key]: !n[item.key] }))} />
            </div>
          ))}
        </div>

        {/* Appearance */}
        <div className="ud2-section-card">
          <h3 className="ud2-settings-section-title">{darkMode ? <Moon size={16} /> : <Sun size={16} />} Appearance</h3>
          <div className="ud2-settings-row2">
            <div>
              <p className="ud2-sr-title">Dark Mode</p>
              <p className="ud2-sr-desc">Switch interface theme</p>
            </div>
            <Toggle on={darkMode} onClick={() => setDarkMode(p => !p)} />
          </div>
        </div>

        {/* Change Password */}
        <div className="ud2-section-card">
          <h3 className="ud2-settings-section-title"><Lock size={16} /> Change Password</h3>
          {[
            { key: 'cur', label: 'Current Password', ph: 'Enter current password' },
            { key: 'nw', label: 'New Password', ph: 'Min. 6 characters' },
            { key: 'conf', label: 'Confirm Password', ph: 'Repeat new password' },
          ].map(f => (
            <div className="ud2-pw-field2" key={f.key}>
              <label>{f.label}</label>
              <div className="ud2-pw-input2">
                <Lock size={14} />
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder={f.ph}
                  value={pw[f.key]}
                  onChange={e => setPw(p => ({ ...p, [f.key]: e.target.value }))}
                />
                {f.key === 'nw' && (
                  <button type="button" onClick={() => setShowPw(p => !p)}>
                    {showPw ? <EyeOff size={13} /> : <Eye size={13} />}
                  </button>
                )}
              </div>
            </div>
          ))}
          <button className="ud2-save-pw-btn" onClick={handlePwSave}>
            {pwSaved ? <><CheckCircle2 size={14} /> Saved!</> : <><Save size={14} /> Update Password</>}
          </button>
        </div>

        {/* Danger Zone */}
        <div className="ud2-section-card ud2-danger-card">
          <h3 className="ud2-settings-section-title" style={{ color: '#dc2626' }}><Trash2 size={16} /> Danger Zone</h3>
          <div className="ud2-settings-row2">
            <div>
              <p className="ud2-sr-title">Sign Out</p>
              <p className="ud2-sr-desc">Sign out from this session</p>
            </div>
            <button className="ud2-danger-btn logout" onClick={() => { logoutUser(); navigatePage('home'); }}>
              <LogOut size={14} /> Sign Out
            </button>
          </div>
          <div className="ud2-settings-row2">
            <div>
              <p className="ud2-sr-title" style={{ color: '#dc2626' }}>Delete Account</p>
              <p className="ud2-sr-desc">Permanently remove your account</p>
            </div>
            <button className="ud2-danger-btn delete"
              onClick={() => showToast('Contact Support', 'Please contact support to delete your account.', 'info')}>
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
