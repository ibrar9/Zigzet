import React, { useState } from 'react';
import { 
  CreditCard, Wallet, Plus, Trash2, CheckCircle2, 
  Gift, ArrowDownRight, ArrowUpRight, ShieldCheck, X, Sparkles
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const UserPayment = () => {
  const { 
    savedCards, 
    addSavedCard, 
    removeSavedCard, 
    setDefaultCard, 
    userWallet, 
    redeemGiftCard, 
    addWalletFunds,
    settings 
  } = useStore();

  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');
  const [topUpAmount, setTopUpAmount] = useState('100');

  // Card Form
  const [cardForm, setCardForm] = useState({
    holderName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    brand: 'visa',
    isDefault: false
  });

  const handleCardSubmit = (e) => {
    e.preventDefault();
    if (!cardForm.holderName || !cardForm.cardNumber || !cardForm.expiry) return;

    const cleanNum = cardForm.cardNumber.replace(/\s+/g, '');
    const masked = `•••• •••• •••• ${cleanNum.slice(-4) || '4242'}`;
    const brand = cleanNum.startsWith('5') ? 'mastercard' : cleanNum.startsWith('3') ? 'amex' : 'visa';

    addSavedCard({
      holderName: cardForm.holderName.toUpperCase(),
      cardNumber: masked,
      expiry: cardForm.expiry,
      brand,
      isDefault: cardForm.isDefault
    });

    setIsCardModalOpen(false);
    setCardForm({ holderName: '', cardNumber: '', expiry: '', cvv: '', brand: 'visa', isDefault: false });
  };

  const handleRedeem = (e) => {
    e.preventDefault();
    if (!voucherCode.trim()) return;
    const success = redeemGiftCard(voucherCode.trim());
    if (success) setVoucherCode('');
  };

  const handleTopUpSubmit = (e) => {
    e.preventDefault();
    addWalletFunds(topUpAmount);
    setIsTopUpModalOpen(false);
  };

  return (
    <div className="ud2-orders-page">
      {/* Header */}
      <div className="ud2-page-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2>Payment Methods &amp; Wallet</h2>
          <p>Manage your saved payment cards, store credits, and wallet transactions</p>
        </div>
        <button 
          className="ud2-btn-track" 
          onClick={() => setIsCardModalOpen(true)}
          style={{ background: '#7c3aed', color: '#fff', display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 10, fontSize: 13.5, fontWeight: 600 }}
        >
          <Plus size={16} /> Add Payment Card
        </button>
      </div>

      {/* Grid: Wallet Hero + Gift Card Redeem */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, marginBottom: 28 }}>
        {/* Wallet Balance Hero Card */}
        <div style={{ 
          background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 60%, #9333ea 100%)', 
          borderRadius: 18, 
          padding: 24, 
          color: '#fff',
          boxShadow: '0 12px 30px -8px rgba(124, 58, 237, 0.45)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: 190
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Zigzet Cash Wallet
              </span>
              <h3 style={{ fontSize: 32, fontWeight: 800, margin: '6px 0 2px 0', letterSpacing: '-0.02em' }}>
                {settings?.currency || 'AED'} {Number(userWallet?.balance || 0).toFixed(2)}
              </h3>
              <p style={{ fontSize: 12.5, color: '#e9d5ff' }}>
                {settings?.currency || 'AED'} {Number(userWallet?.cashbackEarned || 45).toFixed(2)} total cashback earned
              </p>
            </div>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.15)', display: 'grid', placeItems: 'center' }}>
              <Wallet size={22} color="#fff" />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <button
              onClick={() => setIsTopUpModalOpen(true)}
              style={{
                background: '#fff',
                color: '#7c3aed',
                border: 'none',
                padding: '9px 18px',
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              + Top-up Funds
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.85)', fontSize: 12 }}>
              <ShieldCheck size={14} /> Instant 1-Click Checkout
            </div>
          </div>
        </div>

        {/* Voucher Redemption Card */}
        <div className="ud2-section-card" style={{ padding: 22, borderRadius: 18, border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Gift size={18} color="#7c3aed" />
              <h4 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>Redeem Gift Card / Voucher</h4>
            </div>
            <p style={{ fontSize: 13, color: '#64748b', marginBottom: 14 }}>
              Have a promotional voucher or gift card? Enter the code below to add credit directly to your wallet.
            </p>
            <form onSubmit={handleRedeem} style={{ display: 'flex', gap: 8 }}>
              <input
                style={{ flex: 1, padding: '10px 14px', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 13.5, textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}
                placeholder="e.g. WELCOME100, VIP100"
                value={voucherCode}
                onChange={e => setVoucherCode(e.target.value)}
              />
              <button
                type="submit"
                style={{ background: '#7c3aed', color: '#fff', border: 'none', padding: '0 18px', borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
              >
                Redeem
              </button>
            </form>
          </div>
          <p style={{ fontSize: 11.5, color: '#94a3b8', marginTop: 12 }}>
            Demo codes: <strong>WELCOME100</strong> (+AED 100) or <strong>ZIGZET50</strong> (+AED 50)
          </p>
        </div>
      </div>

      {/* Saved Cards Section */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 14 }}>Saved Payment Cards</h3>
        {savedCards.length === 0 ? (
          <div className="ud2-empty-page" style={{ padding: '32px 16px' }}>
            <CreditCard size={44} />
            <h3>No Cards Saved</h3>
            <p>Save your credit or debit card for faster, encrypted checkout.</p>
            <button onClick={() => setIsCardModalOpen(true)}>Add Your First Card</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 18 }}>
            {savedCards.map((card) => {
              const isVisa = card.brand === 'visa';
              return (
                <div 
                  key={card.id} 
                  style={{
                    background: isVisa ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' : 'linear-gradient(135deg, #831843 0%, #500724 100%)',
                    borderRadius: 16,
                    padding: 20,
                    color: '#fff',
                    position: 'relative',
                    boxShadow: '0 10px 25px -6px rgba(0,0,0,0.25)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: 175
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      {card.brand?.toUpperCase()}
                    </span>
                    {card.isDefault && (
                      <span style={{ background: 'rgba(34, 197, 94, 0.25)', color: '#4ade80', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 6 }}>
                        Default Card
                      </span>
                    )}
                  </div>

                  <div>
                    <p style={{ fontSize: 18, fontWeight: 700, letterSpacing: '0.12em', color: '#fff', margin: '14px 0 8px 0' }}>
                      {card.cardNumber}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <div>
                        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>Card Holder</span>
                        <p style={{ fontSize: 12.5, fontWeight: 600, color: '#fff' }}>{card.holderName}</p>
                      </div>
                      <div>
                        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>Expires</span>
                        <p style={{ fontSize: 12.5, fontWeight: 600, color: '#fff' }}>{card.expiry}</p>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, marginTop: 10, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                    {!card.isDefault ? (
                      <button
                        onClick={() => setDefaultCard(card.id)}
                        style={{ background: 'none', border: 'none', color: '#c4b5fd', fontSize: 12, fontWeight: 600, cursor: 'pointer', padding: 0 }}
                      >
                        Set as Default
                      </button>
                    ) : (
                      <span style={{ fontSize: 11.5, color: '#4ade80' }}>Primary Method</span>
                    )}
                    <button
                      onClick={() => removeSavedCard(card.id)}
                      style={{ background: 'rgba(239, 68, 68, 0.2)', border: 'none', borderRadius: 6, padding: '4px 8px', color: '#fca5a5', fontSize: 11.5, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                    >
                      <Trash2 size={12} /> Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Wallet History Ledger */}
      <div className="ud2-section-card" style={{ padding: 22, borderRadius: 16, border: '1px solid #e2e8f0' }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 14 }}>Wallet &amp; Credit Activity</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {userWallet?.history?.map((tx, idx) => (
            <div 
              key={tx.id || idx}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                borderRadius: 10,
                background: '#f8fafc',
                border: '1px solid #f1f5f9'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: '#dcfce7', color: '#16a34a', display: 'grid', placeItems: 'center' }}>
                  <ArrowDownRight size={18} />
                </div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 13.5, color: '#1e293b' }}>{tx.desc}</p>
                  <p style={{ fontSize: 12, color: '#94a3b8' }}>{tx.date}</p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: '#16a34a' }}>{tx.amount}</span>
                <p style={{ fontSize: 11, color: '#64748b' }}>{tx.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Card Modal */}
      {isCardModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'grid', placeItems: 'center', padding: 16 }}>
          <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 480, padding: 24, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>Add Payment Card</h3>
              <button 
                onClick={() => setIsCardModalOpen(false)}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, width: 32, height: 32, display: 'grid', placeItems: 'center', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCardSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 12.5, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Cardholder Name *</label>
                <input
                  required
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13.5 }}
                  placeholder="NAME ON CARD"
                  value={cardForm.holderName}
                  onChange={e => setCardForm({ ...cardForm, holderName: e.target.value })}
                />
              </div>

              <div>
                <label style={{ fontSize: 12.5, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Card Number *</label>
                <input
                  required
                  maxLength={19}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13.5 }}
                  placeholder="4000 1234 5678 9010"
                  value={cardForm.cardNumber}
                  onChange={e => setCardForm({ ...cardForm, cardNumber: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Expiry Date *</label>
                  <input
                    required
                    maxLength={5}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13.5 }}
                    placeholder="MM/YY"
                    value={cardForm.expiry}
                    onChange={e => setCardForm({ ...cardForm, expiry: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>CVV / CVC *</label>
                  <input
                    required
                    maxLength={4}
                    type="password"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13.5 }}
                    placeholder="123"
                    value={cardForm.cvv}
                    onChange={e => setCardForm({ ...cardForm, cvv: e.target.value })}
                  />
                </div>
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#334155', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={cardForm.isDefault}
                  onChange={e => setCardForm({ ...cardForm, isDefault: e.target.checked })}
                  style={{ width: 16, height: 16, accentColor: '#7c3aed' }}
                />
                Set as default payment method
              </label>

              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button
                  type="button"
                  onClick={() => setIsCardModalOpen(false)}
                  style={{ flex: 1, padding: '11px', borderRadius: 10, border: '1px solid #cbd5e1', background: '#f8fafc', color: '#475569', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, padding: '11px', borderRadius: 10, border: 'none', background: '#7c3aed', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
                >
                  Save Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Top Up Modal */}
      {isTopUpModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'grid', placeItems: 'center', padding: 16 }}>
          <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 440, padding: 24, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>Top-up Wallet Funds</h3>
              <button 
                onClick={() => setIsTopUpModalOpen(false)}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, width: 32, height: 32, display: 'grid', placeItems: 'center', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleTopUpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 12.5, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 8 }}>Select Amount ({settings?.currency || 'AED'})</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 10 }}>
                  {['50', '100', '250'].map(amt => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => setTopUpAmount(amt)}
                      style={{
                        padding: '10px',
                        borderRadius: 8,
                        border: topUpAmount === amt ? '2px solid #7c3aed' : '1px solid #cbd5e1',
                        background: topUpAmount === amt ? '#ede9fe' : '#fff',
                        color: topUpAmount === amt ? '#7c3aed' : '#475569',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {settings?.currency || 'AED'} {amt}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  required
                  min="10"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14, fontWeight: 600 }}
                  placeholder="Custom amount"
                  value={topUpAmount}
                  onChange={e => setTopUpAmount(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button
                  type="button"
                  onClick={() => setIsTopUpModalOpen(false)}
                  style={{ flex: 1, padding: '11px', borderRadius: 10, border: '1px solid #cbd5e1', background: '#f8fafc', color: '#475569', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, padding: '11px', borderRadius: 10, border: 'none', background: '#7c3aed', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
                >
                  Confirm &amp; Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
