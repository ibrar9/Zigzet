import React, { useState } from 'react';
import { Bell, X, Mail, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const NotifyModal = () => {
  const { isNotifyOpen, notifyProduct, closeNotifyModal, requestRestockAlert, showToast } = useStore();
  const [email, setEmail] = useState('');

  if (!isNotifyOpen || !notifyProduct) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Invalid Email', 'Please enter a valid email address.', 'info');
      return;
    }

    requestRestockAlert(notifyProduct, email);
    setEmail('');
  };

  return (
    <div className="modal-overlay open" onClick={closeNotifyModal}>
      <div className="modal-box notify-modal-box" style={{ maxWidth: '440px', padding: '28px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-icon" onClick={closeNotifyModal} aria-label="Close Restock Modal">
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ width: '54px', height: '54px', borderRadius: '9999px', background: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
            <Bell size={26} />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>
            Back-in-Stock Alert
          </h3>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            Get an instant email the moment this item is replenished. No spam, ever.
          </p>
        </div>

        {/* Product Snippet */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: '#f8fafc', padding: '12px 14px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
          <img
            src={notifyProduct.image}
            alt={notifyProduct.name}
            style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #e2e8f0', background: '#fff' }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '13.5px', fontWeight: '700', color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {notifyProduct.name}
            </div>
            <div style={{ fontSize: '13px', fontWeight: '800', color: '#7c3aed', marginTop: '2px' }}>
              ${Number(notifyProduct.price).toFixed(2)}
            </div>
          </div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '18px' }}>
            <label style={{ fontSize: '12.5px', fontWeight: '700', color: '#334155' }}>Your Email Address *</label>
            <div style={{ position: 'relative', marginTop: '4px' }}>
              <Mail size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: '38px', width: '100%', borderRadius: '10px', border: '1.5px solid #e2e8f0', padding: '10px 12px 10px 38px', fontSize: '13.5px', outline: 'none' }}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="hero-cta-btn"
            style={{ width: '100%', padding: '12px', fontSize: '13.5px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <Bell size={15} />
            <span>Notify Me When in Stock</span>
          </button>
        </form>
      </div>
    </div>
  );
};
