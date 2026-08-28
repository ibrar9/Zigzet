import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  ShieldCheck, 
  CreditCard, 
  ArrowRight, 
  Lock, 
  Sparkles, 
  Tag, 
  Check, 
  ArrowLeft,
  Printer,
  Download,
  Truck,
  Smartphone
} from 'lucide-react';
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
    navigatePage,
    integrations,
    settings,
    showToast
  } = useStore();

  const [step, setStep] = useState(1);
  const [couponInput, setCouponInput] = useState('');
  const [formData, setFormData] = useState({
    firstName: 'Sarah',
    lastName: 'Jenkins',
    email: 'sarah.j@example.com',
    phone: '+971 50 123 4567',
    address: 'Downtown Dubai, Boulevard Plaza Tower 1',
    city: 'Dubai',
    state: 'Dubai',
    zip: '00000',
    paymentMethod: 'Credit Card',
    cardNumber: '4242 •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '888',
    cardHolder: 'Sarah Jenkins'
  });

  const [completedOrder, setCompletedOrder] = useState(null);

  if (!isCheckoutOpen) return null;

  const curr = settings?.currency || 'AED';

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
        ? `Credit Card (${formData.cardNumber.slice(-4) ? `•••• ${formData.cardNumber.slice(-4)}` : 'Visa'})` 
        : formData.paymentMethod,
      total: cartTotal,
      subtotal: cartSubtotal,
      discount: couponDiscountAmount,
      couponCode: appliedCoupon ? appliedCoupon.code : null,
      items: cart
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

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="modal-overlay open" onClick={handleClose}>
      <div className="modal-box checkout-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-icon" onClick={handleClose} aria-label="Close Checkout">
          <X size={20} />
        </button>

        {/* Step Indicator Header */}
        <div className="checkout-steps-nav">
          <div className={`step-item ${step >= 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}`}>
            <span className="step-number">{step > 1 ? '✓' : '1'}</span>
            <span>Shipping</span>
          </div>
          <div className={`step-item ${step >= 2 ? 'active' : ''} ${step > 2 ? 'done' : ''}`}>
            <span className="step-number">{step > 2 ? '✓' : '2'}</span>
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
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px', color: 'var(--color-text-primary, #0f172a)' }}>
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
                <label>Email Address for Order Tracking</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-group full-width">
                <label>Phone Number (for SMS & WhatsApp delivery updates)</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-group full-width">
                <label>Street / Building / Apartment Address</label>
                <input 
                  type="text" 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Emirate / City</label>
                <select 
                  name="city" 
                  value={formData.city} 
                  onChange={handleChange}
                  className="checkout-select"
                >
                  <option value="Dubai">Dubai</option>
                  <option value="Abu Dhabi">Abu Dhabi</option>
                  <option value="Sharjah">Sharjah</option>
                  <option value="Ajman">Ajman</option>
                  <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                  <option value="Fujairah">Fujairah</option>
                  <option value="Umm Al Quwain">Umm Al Quwain</option>
                </select>
              </div>

              <div className="form-group">
                <label>Delivery Option</label>
                <div className="delivery-option-badge">
                  <Truck size={15} color="#10b981" />
                  <span>{isFreeShipping ? 'Free Express Delivery (1-2 Days)' : `Standard Delivery (${curr} ${shippingFee})`}</span>
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
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px', color: 'var(--color-text-primary, #0f172a)' }}>
              Payment & Order Summary
            </h3>

            <div className="payment-methods-grid">
              {['Credit Card', 'Apple Pay', 'Tabby (4 Installments)', 'Cash on Delivery'].map((m) => (
                <div 
                  key={m}
                  className={`payment-card-opt ${formData.paymentMethod === m ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, paymentMethod: m })}
                >
                  <span>{m}</span>
                  {m === 'Credit Card' && (
                    <span style={{ fontSize: '10px', color: '#6366f1', fontWeight: '700', marginLeft: '4px' }}>• Visa / MC</span>
                  )}
                  {m.includes('Tabby') && (
                    <span style={{ fontSize: '10px', color: '#10b981', fontWeight: '700', marginLeft: '4px' }}>• 0% Interest</span>
                  )}
                </div>
              ))}
            </div>

            {formData.paymentMethod === 'Credit Card' && (
              <div className="checkout-card-preview-box">
                {/* 3D Glassmorphic Card Mockup */}
                <div className="glass-credit-card">
                  <div className="card-chip-row">
                    <div className="gold-chip" />
                    <span className="card-network-label">VISA</span>
                  </div>
                  <div className="card-number-display">{formData.cardNumber || '•••• •••• •••• 4242'}</div>
                  <div className="card-bottom-row">
                    <div>
                      <span className="card-lbl">CARDHOLDER</span>
                      <span className="card-val">{formData.cardHolder || 'SARAH JENKINS'}</span>
                    </div>
                    <div>
                      <span className="card-lbl">EXPIRES</span>
                      <span className="card-val">{formData.cardExpiry || '12/28'}</span>
                    </div>
                  </div>
                </div>

                <div className="checkout-form-grid" style={{ marginTop: '16px' }}>
                  <div className="form-group full-width">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label>Card Number</label>
                      <span style={{ fontSize: '11px', color: '#6366f1', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Lock size={11} /> 256-bit SSL Encrypted
                      </span>
                    </div>
                    <input 
                      type="text" 
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="4242 4242 4242 4242"
                      style={{ fontFamily: 'monospace', fontWeight: '600' }} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Cardholder Name</label>
                    <input 
                      type="text" 
                      name="cardHolder"
                      value={formData.cardHolder}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{ flex: 1 }}>
                        <label>Expiry Date</label>
                        <input 
                          type="text" 
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleChange}
                          placeholder="MM/YY" 
                        />
                      </div>
                      <div style={{ width: '80px' }}>
                        <label>CVC / CVV</label>
                        <input 
                          type="text" 
                          name="cardCvc"
                          value={formData.cardCvc}
                          onChange={handleChange}
                          placeholder="888" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {formData.paymentMethod.includes('Tabby') && (
              <div className="tabby-split-info">
                <div className="tabby-header" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={16} color="#059669" />
                  <strong>Split in 4 interest-free payments of {curr} {(cartTotal / 4).toFixed(2)}</strong>
                </div>
                <p>No interest. No hidden fees. Instant approval at checkout with Emirates ID.</p>
              </div>
            )}

            {/* WhatsApp live order tracking updates banner */}
            <div className="checkout-whatsapp-banner" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Smartphone size={16} color="#16a34a" />
              <div style={{ flex: 1, fontSize: '12.5px', color: '#166534' }}>
                <strong>WhatsApp Delivery Alerts:</strong> Real-time courier live tracking links will be sent to <strong>{formData.phone}</strong>.
              </div>
            </div>

            {/* Promo Code Input Box */}
            <div style={{ marginBottom: '18px' }}>
              {appliedCoupon ? (
                <div className="applied-coupon-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Tag size={15} color="#10b981" />
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#065f46' }}>
                      Coupon Applied: <strong>{appliedCoupon.code}</strong> (-{curr} {couponDiscountAmount.toFixed(2)})
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="remove-coupon-btn"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Enter Promo Code (e.g. KBEAUTY20)..."
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    className="coupon-input-field"
                  />
                  <button
                    type="submit"
                    className="coupon-apply-btn"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Order Summary Recap */}
            <div className="checkout-summary-box">
              <div className="price-summary-row">
                <span>Items Subtotal</span>
                <span>{curr} {cartSubtotal.toFixed(2)}</span>
              </div>
              {appliedCoupon && (
                <div className="price-summary-row" style={{ color: '#10b981', fontWeight: '700' }}>
                  <span>Promo Discount ({appliedCoupon.code})</span>
                  <span>-{curr} {couponDiscountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="price-summary-row">
                <span>UAE Delivery</span>
                <span>{isFreeShipping ? 'FREE' : `${curr} ${shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="price-summary-row">
                <span>Estimated VAT (5%)</span>
                <span>{curr} {estimatedTax.toFixed(2)}</span>
              </div>
              <div className="price-summary-row total">
                <span>Total Amount Due</span>
                <span style={{ color: '#10b981' }}>{curr} {cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button 
                onClick={() => setStep(1)}
                className="checkout-back-btn"
              >
                ← Back
              </button>
              <button 
                className="checkout-btn" 
                style={{ width: 'auto', padding: '12px 32px' }}
                onClick={handlePlaceOrder}
              >
                <Lock size={15} />
                <span>Place Order ({curr} {cartTotal.toFixed(2)})</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Order Confirmation */}
        {step === 3 && completedOrder && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div className="order-confirmed-icon-circle">
              <CheckCircle size={38} />
            </div>

            <h3 style={{ fontSize: '24px', fontWeight: '900', color: 'var(--color-text-primary, #0f172a)', marginBottom: '8px' }}>
              Order Confirmed!
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-text-muted, #64748b)', marginBottom: '20px' }}>
              Thank you, <strong>{completedOrder.customerName}</strong>! Your order <strong>#{completedOrder.id}</strong> has been received and is being prepared.
            </p>

            <div className="order-confirmed-recap-card">
              <div className="recap-row">
                <span>Order Total:</span>
                <strong style={{ color: '#10b981' }}>{curr} {Number(completedOrder.total).toFixed(2)}</strong>
              </div>
              <div className="recap-row">
                <span>Payment Method:</span>
                <span>{completedOrder.paymentMethod}</span>
              </div>
              <div className="recap-row">
                <span>Tracking Number:</span>
                <span style={{ fontFamily: 'monospace', color: '#7c3aed', fontWeight: '700' }}>{completedOrder.trackingNumber}</span>
              </div>
              <div className="recap-row">
                <span>Status:</span>
                <span className="status-pill completed">{completedOrder.status}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={handlePrintReceipt}
                className="order-action-secondary-btn"
                title="Print Order Receipt"
              >
                <Printer size={15} />
                <span>Print Receipt</span>
              </button>
              <button
                onClick={handleClose}
                className="order-action-secondary-btn"
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
