import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, CreditCard, ArrowRight, Lock, Sparkles, Tag, Check, ArrowLeft } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CheckoutModal = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartTotal, 
    cartSubtotal, 
    shippingFee, 
    estimatedTax, 
    isFreeShipping,
    couponDiscountAmount,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
    createOrder,
    navigatePage
  } = useStore();

  const [step, setStep] = useState(1);
  const [couponInput, setCouponInput] = useState('');
  const [formData, setFormData] = useState({
    firstName: 'Sarah',
    lastName: 'Jenkins',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace',
    city: 'Springfield',
    state: 'OR',
    zip: '97477',
    paymentMethod: 'Credit Card'
  });

  const [completedOrder, setCompletedOrder] = useState(null);

  if (!isCheckoutOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = applyCouponCode(couponInput);
    if (success) {
      setCouponInput('');
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const orderData = {
      customerName: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`,
      paymentMethod: formData.paymentMethod === 'Credit Card' 
        ? 'Credit Card (Visa •••• 4242)' 
        : formData.paymentMethod,
      total: cartTotal,
      subtotal: cartSubtotal,
      discount: couponDiscountAmount,
      couponCode: appliedCoupon ? appliedCoupon.code : null
    };

    const newOrder = createOrder(orderData);
    setCompletedOrder(newOrder);
    setStep(3);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep(1);
    setCompletedOrder(null);
  };

  const handleTrackOrder = () => {
    handleClose();
    navigatePage('track');
  };

  return (
    <div className="modal-overlay open" onClick={handleClose}>
      <div className="modal-box checkout-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-icon" onClick={handleClose} aria-label="Close Checkout">
          <X size={20} />
        </button>

        {/* Step Indicator Header */}
        <div className="checkout-steps-nav">
          <div className={`step-item ${step >= 1 ? 'active' : ''}`}>
            <span className="step-number">1</span>
            <span>Shipping</span>
          </div>
          <div className={`step-item ${step >= 2 ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span>Payment</span>
          </div>
          <div className={`step-item ${step === 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* Step 1: Shipping Address Form */}
        {step === 1 && (
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>
              Shipping Address
            </h3>

            <div className="checkout-form-grid">
              <div className="form-group">
                <label>First Name</label>
                <input 
                  type="text" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input 
                  type="text" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-group full-width">
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-group full-width">
                <label>Street Address</label>
                <input 
                  type="text" 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-group">
                <label>City</label>
                <input 
                  type="text" 
                  name="city" 
                  value={formData.city} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-group">
                <label>State / ZIP</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input 
                    type="text" 
                    name="state" 
                    value={formData.state} 
                    onChange={handleChange} 
                    style={{ width: '80px' }} 
                  />
                  <input 
                    type="text" 
                    name="zip" 
                    value={formData.zip} 
                    onChange={handleChange} 
                    style={{ flex: 1 }} 
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button 
                className="checkout-btn" 
                style={{ width: 'auto', padding: '12px 28px' }}
                onClick={() => setStep(2)}
              >
                <span>Continue to Payment</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Payment & Promo Code */}
        {step === 2 && (
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>
              Payment & Order Summary
            </h3>

            <div className="payment-methods-grid">
              {['Credit Card', 'PayPal', 'Apple Pay', 'Cash on Delivery'].map((m) => (
                <div 
                  key={m}
                  className={`payment-card-opt ${formData.paymentMethod === m ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, paymentMethod: m })}
                >
                  {m}
                </div>
              ))}
            </div>

            {formData.paymentMethod === 'Credit Card' && (
              <div className="checkout-form-grid" style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
                <div className="form-group full-width">
                  <label>Card Number</label>
                  <input type="text" defaultValue="4242 •••• •••• 4242" readOnly />
                </div>
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input type="text" defaultValue="12/28" readOnly />
                </div>
                <div className="form-group">
                  <label>CVC / CVV</label>
                  <input type="text" defaultValue="888" readOnly />
                </div>
              </div>
            )}

            {/* Promo Code Input Box */}
            <div style={{ marginBottom: '18px' }}>
              {appliedCoupon ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '10px 14px', borderRadius: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Tag size={15} color="#10b981" />
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#065f46' }}>
                      Coupon Applied: <strong>{appliedCoupon.code}</strong> (-AED {couponDiscountAmount.toFixed(2)})
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    style={{ fontSize: '12px', color: '#ef4444', fontWeight: '700' }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Enter Promo Code (e.g. ZIGZET25)..."
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    style={{
                      flex: 1,
                      padding: '9px 14px',
                      borderRadius: '10px',
                      border: '1.5px solid #e2e8f0',
                      fontSize: '13px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      outline: 'none'
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      background: '#7c3aed',
                      color: '#ffffff',
                      padding: '9px 18px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: '700'
                    }}
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Order Summary Recap (AED) */}
            <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
              <div className="price-summary-row">
                <span>Items Subtotal</span>
                <span>AED {cartSubtotal.toFixed(2)}</span>
              </div>
              {appliedCoupon && (
                <div className="price-summary-row" style={{ color: '#10b981', fontWeight: '700' }}>
                  <span>Promo Discount ({appliedCoupon.code})</span>
                  <span>-AED {couponDiscountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="price-summary-row">
                <span>UAE Delivery</span>
                <span>{isFreeShipping ? 'FREE' : `AED ${shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="price-summary-row">
                <span>Estimated VAT (5%)</span>
                <span>AED {estimatedTax.toFixed(2)}</span>
              </div>
              <div className="price-summary-row total">
                <span>Total Amount Due</span>
                <span style={{ color: '#10b981' }}>AED {cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button 
                onClick={() => setStep(1)}
                style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280' }}
              >
                ← Back
              </button>
              <button 
                className="checkout-btn" 
                style={{ width: 'auto', padding: '12px 32px' }}
                onClick={handlePlaceOrder}
              >
                <Lock size={15} />
                <span>Place Order (AED {cartTotal.toFixed(2)})</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Order Confirmation */}
        {step === 3 && completedOrder && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '9999px', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <CheckCircle size={36} />
            </div>

            <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', marginBottom: '8px' }}>
              Order Confirmed!
            </h3>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>
              Thank you, <strong>{completedOrder.customerName}</strong>! Your order <strong>#{completedOrder.id}</strong> has been successfully placed.
            </p>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', maxWidth: '420px', margin: '0 auto 24px auto', textAlign: 'left', fontSize: '13px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span>Order Total:</span>
                <strong style={{ color: '#10b981' }}>${Number(completedOrder.total).toFixed(2)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span>Tracking Number:</span>
                <span style={{ fontFamily: 'monospace', color: '#7c3aed', fontWeight: '700' }}>{completedOrder.trackingNumber}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Status:</span>
                <span className="status-pill completed">{completedOrder.status}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={handleClose}
                style={{ padding: '10px 22px', borderRadius: '10px', background: '#f1f5f9', color: '#475569', fontWeight: '700', fontSize: '13.5px' }}
              >
                Continue Shopping
              </button>
              <button
                className="hero-cta-btn"
                onClick={handleTrackOrder}
                style={{ padding: '10px 24px', fontSize: '13.5px' }}
              >
                Track My Order →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
