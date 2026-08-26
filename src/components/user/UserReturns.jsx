import React, { useState } from 'react';
import { 
  RotateCcw, Package, CheckCircle2, Clock, Truck, 
  AlertCircle, ChevronRight, Plus, X, ArrowRight, ShieldCheck, HelpCircle
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const RETURN_STEPS = ['Requested', 'Approved', 'Pickup Scheduled', 'Refund Completed'];
const RETURN_STEP_MAP = {
  'Requested': [true, false, false, false],
  'Approved': [true, true, false, false],
  'Pickup Scheduled': [true, true, true, false],
  'Refund Completed': [true, true, true, true],
};

export const UserReturns = () => {
  const { userReturns, createReturnRequest, cancelReturnRequest, orders, currentUser, settings, navigatePage } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reason, setReason] = useState('Damaged in transit');
  const [resolution, setResolution] = useState('Replacement Product');
  const [notes, setNotes] = useState('');

  const myOrders = orders.filter(o =>
    o.email?.toLowerCase() === currentUser?.email?.toLowerCase() || !currentUser?.email
  );

  const eligibleOrders = myOrders.filter(o => o.items && o.items.length > 0);

  const handleOpenModal = () => {
    if (eligibleOrders.length > 0) {
      setSelectedOrderId(eligibleOrders[0].id);
      setSelectedProduct(eligibleOrders[0].items[0] || null);
    }
    setReason('Damaged in transit');
    setResolution('Replacement Product');
    setNotes('');
    setIsModalOpen(true);
  };

  const handleOrderChange = (orderId) => {
    setSelectedOrderId(orderId);
    const ord = eligibleOrders.find(o => o.id === orderId);
    if (ord && ord.items && ord.items.length > 0) {
      setSelectedProduct(ord.items[0]);
    } else {
      setSelectedProduct(null);
    }
  };

  const handleProductChange = (prodId) => {
    const ord = eligibleOrders.find(o => o.id === selectedOrderId);
    if (ord) {
      const p = ord.items.find(i => (i.id || i.name) === prodId);
      if (p) setSelectedProduct(p);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedOrderId || !selectedProduct) return;

    createReturnRequest({
      orderId: selectedOrderId,
      product: selectedProduct,
      reason,
      resolution,
      notes
    });

    setIsModalOpen(false);
  };

  return (
    <div className="ud2-orders-page">
      {/* Page Header */}
      <div className="ud2-page-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2>Returns &amp; Refunds</h2>
          <p>Track your return requests, replacements, and refund statuses</p>
        </div>
        <button 
          className="ud2-btn-track" 
          onClick={handleOpenModal}
          style={{ background: '#7c3aed', color: '#fff', display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 10, fontSize: 13.5, fontWeight: 600 }}
        >
          <Plus size={16} /> Request Return
        </button>
      </div>

      {/* Return Policy Notice Card */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 14, padding: '16px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ background: '#ede9fe', color: '#7c3aed', width: 40, height: 40, borderRadius: 10, display: 'grid', placeItems: 'center' }}>
            <ShieldCheck size={20} />
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 14, color: '#1e293b' }}>Hassle-Free 14-Day Return Guarantee</p>
            <p style={{ fontSize: 12.5, color: '#64748b' }}>Free doorstep pickup available across all UAE &amp; US emirates/states.</p>
          </div>
        </div>
        <button 
          onClick={() => navigatePage('contact')}
          style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: 8, padding: '6px 14px', fontSize: 12.5, fontWeight: 600, color: '#475569', cursor: 'pointer' }}
        >
          Read Policy
        </button>
      </div>

      {/* Returns List */}
      {userReturns.length === 0 ? (
        <div className="ud2-empty-page">
          <RotateCcw size={48} />
          <h3>No Active Returns</h3>
          <p>You haven't requested any returns or refunds yet.</p>
          <button onClick={handleOpenModal}>Request a Return</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {userReturns.map((ret) => {
            const steps = RETURN_STEP_MAP[ret.status] || RETURN_STEP_MAP['Requested'];
            return (
              <div key={ret.id} className="ud2-section-card" style={{ padding: 22, borderRadius: 16, border: '1px solid #e2e8f0' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, paddingBottom: 16, borderBottom: '1px solid #f1f5f9' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontWeight: 800, fontSize: 16, color: '#0f172a' }}>Return #{ret.id}</span>
                      <span style={{ background: '#ede9fe', color: '#7c3aed', fontSize: 11.5, fontWeight: 700, padding: '2px 8px', borderRadius: 6 }}>
                        {ret.status}
                      </span>
                    </div>
                    <p style={{ fontSize: 12.5, color: '#64748b' }}>
                      Associated with <strong>Order #{ret.orderId}</strong> · Requested on {ret.requestedAt}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {ret.trackingNumber && (
                      <span style={{ fontSize: 12, background: '#f1f5f9', color: '#475569', padding: '4px 10px', borderRadius: 6, fontWeight: 600 }}>
                        Waybill: {ret.trackingNumber}
                      </span>
                    )}
                    {ret.status === 'Requested' && (
                      <button 
                        onClick={() => cancelReturnRequest(ret.id)}
                        style={{ background: '#fee2e2', border: '1px solid #fecaca', color: '#dc2626', padding: '5px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                      >
                        Cancel Request
                      </button>
                    )}
                  </div>
                </div>

                {/* Progress Steps */}
                <div style={{ margin: '24px 0 20px 0' }}>
                  <div className="ud2-steps" style={{ margin: 0 }}>
                    {RETURN_STEPS.map((step, i) => (
                      <div key={step} className="ud2-step-item">
                        <div className={`ud2-step-circle ${steps[i] ? 'done' : ''}`} style={steps[i] ? { background: '#7c3aed', color: '#fff' } : {}}>
                          {steps[i] ? <CheckCircle2 size={14} /> : <span>{i + 1}</span>}
                        </div>
                        {i < RETURN_STEPS.length - 1 && (
                          <div className={`ud2-step-line ${steps[i + 1] ? 'done' : ''}`} style={steps[i + 1] ? { background: '#7c3aed' } : {}} />
                        )}
                        <p className={`ud2-step-name ${steps[i] ? 'done' : ''}`} style={steps[i] ? { color: '#7c3aed', fontWeight: 700 } : {}}>
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Item & Details Box */}
                <div style={{ background: '#f8fafc', borderRadius: 12, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 54, height: 54, borderRadius: 10, overflow: 'hidden', background: '#fff', border: '1px solid #e2e8f0', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                      {ret.product?.image ? (
                        <img src={ret.product.image} alt={ret.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <Package size={22} style={{ color: '#94a3b8' }} />
                      )}
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 14, color: '#1e293b' }}>{ret.product?.name || 'Product Item'}</p>
                      <p style={{ fontSize: 12.5, color: '#64748b' }}>
                        Qty: {ret.product?.quantity || 1} · {settings?.currency || 'AED'} {Number(ret.product?.price || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, textAlign: 'right' }}>
                    <p style={{ fontSize: 12.5, color: '#475569' }}>
                      <strong>Reason:</strong> <span style={{ color: '#0f172a' }}>{ret.reason}</span>
                    </p>
                    <p style={{ fontSize: 12.5, color: '#475569' }}>
                      <strong>Resolution:</strong> <span style={{ color: '#7c3aed', fontWeight: 600 }}>{ret.resolution}</span>
                    </p>
                  </div>
                </div>

                {ret.notes && (
                  <p style={{ fontSize: 12.5, color: '#64748b', marginTop: 12, fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Clock size={13} /> {ret.notes}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modal: Request New Return */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'grid', placeItems: 'center', padding: 16 }}>
          <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 520, padding: 24, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>Request Return / Exchange</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, width: 32, height: 32, display: 'grid', placeItems: 'center', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={16} />
              </button>
            </div>

            {eligibleOrders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <Package size={40} style={{ color: '#94a3b8', margin: '0 auto 12px' }} />
                <p style={{ fontWeight: 600, color: '#334155' }}>No Orders Found</p>
                <p style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>You must place an order before requesting a return.</p>
                <button 
                  onClick={() => { setIsModalOpen(false); navigatePage('shop'); }}
                  style={{ background: '#7c3aed', color: '#fff', border: 'none', padding: '9px 18px', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}
                >
                  Browse Shop
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Order Selector */}
                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Select Order *</label>
                  <select
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13.5, background: '#fff' }}
                    value={selectedOrderId}
                    onChange={e => handleOrderChange(e.target.value)}
                  >
                    {eligibleOrders.map(o => (
                      <option key={o.id} value={o.id}>
                        Order #{o.id} ({o.date}) - {settings?.currency || 'AED'} {Number(o.total || 0).toFixed(2)} [{o.status}]
                      </option>
                    ))}
                  </select>
                </div>

                {/* Product Selector */}
                {(() => {
                  const currentOrd = eligibleOrders.find(o => o.id === selectedOrderId);
                  const items = currentOrd?.items || [];
                  return (
                    <div>
                      <label style={{ fontSize: 12.5, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Select Item to Return *</label>
                      <select
                        style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13.5, background: '#fff' }}
                        value={selectedProduct?.id || selectedProduct?.name || ''}
                        onChange={e => handleProductChange(e.target.value)}
                      >
                        {items.map(it => (
                          <option key={it.id || it.name} value={it.id || it.name}>
                            {it.name} (Qty: {it.quantity}) - {settings?.currency || 'AED'} {Number(it.price || 0).toFixed(2)}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                })()}

                {/* Reason Selector */}
                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Reason for Return *</label>
                  <select
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13.5, background: '#fff' }}
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                  >
                    <option value="Damaged in transit">Damaged in transit / Broken seal</option>
                    <option value="Defective or does not work">Defective or expired formula</option>
                    <option value="Wrong item received">Wrong item / shade received</option>
                    <option value="Item not as described">Item not as described on website</option>
                    <option value="Changed mind / No longer needed">Changed mind / Unopened product</option>
                  </select>
                </div>

                {/* Resolution Selector */}
                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Desired Resolution *</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {[
                      { id: 'Replacement Product', title: 'Replacement Product', desc: 'We will dispatch an exact fresh replacement.' },
                      { id: 'Refund to Zigzet Wallet', title: 'Refund to Zigzet Wallet (Instant)', desc: 'Immediate store credit with bonus +5% cashback.' },
                      { id: 'Refund to Original Payment', title: 'Refund to Original Payment Method', desc: 'Credited back within 3-5 business days.' },
                    ].map(res => (
                      <label 
                        key={res.id}
                        style={{ 
                          display: 'flex', 
                          alignItems: 'flex-start', 
                          gap: 10, 
                          padding: 10, 
                          borderRadius: 8, 
                          border: resolution === res.id ? '2px solid #7c3aed' : '1px solid #cbd5e1',
                          background: resolution === res.id ? '#faf5ff' : '#fff',
                          cursor: 'pointer'
                        }}
                      >
                        <input
                          type="radio"
                          name="resolution"
                          value={res.id}
                          checked={resolution === res.id}
                          onChange={() => setResolution(res.id)}
                          style={{ marginTop: 3, accentColor: '#7c3aed' }}
                        />
                        <div>
                          <p style={{ fontWeight: 600, fontSize: 13, color: '#1e293b' }}>{res.title}</p>
                          <p style={{ fontSize: 12, color: '#64748b' }}>{res.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Additional Notes / Courier Instructions</label>
                  <textarea
                    rows={3}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13.5 }}
                    placeholder="Describe any issues or preferred pickup times..."
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                  />
                </div>

                {/* Submit */}
                <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    style={{ flex: 1, padding: '11px', borderRadius: 10, border: '1px solid #cbd5e1', background: '#f8fafc', color: '#475569', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ flex: 1, padding: '11px', borderRadius: 10, border: 'none', background: '#7c3aed', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Submit Return
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
