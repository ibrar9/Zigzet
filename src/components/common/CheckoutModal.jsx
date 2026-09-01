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
    <div className="modal-overlay checkout-modal-overlay open" onClick={handleClose}>
      <div className="modal-box checkout-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Modal Top Header with Close */}
        <div className="checkout-modal-top-bar">
          <div className="checkout-modal-title-wrap">
            <ShieldCheck size={18} className="checkout-secure-icon" />
            <span className="checkout-modal-main-title">Secure Checkout</span>
          </div>
          <button className="checkout-close-icon" onClick={handleClose} aria-label="Close Checkout">
            <X size={20} />
          </button>
        </div>

        {/* Step Indicator Header */}
        <div className="checkout-steps-nav">
          <div className={`step-item ${step >= 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}`} onClick={() => step > 1 && setStep(1)}>
            <span className="step-number">{step > 1 ? '✓' : '1'}</span>
            <span className="step-label">Shipping</span>
          </div>
          <div className="step-divider" />
          <div className={`step-item ${step >= 2 ? 'active' : ''} ${step > 2 ? 'done' : ''}`} onClick={() => step > 2 && setStep(2)}>
            <span className="step-number">{step > 2 ? '✓' : '2'}</span>
            <span className="step-label">Payment</span>
          </div>
          <div className="step-divider" />
          <div className={`step-item ${step === 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">Review</span>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="checkout-modal-body">
          {/* Step 1: Shipping Address Form */}
          {step === 1 && (
            <div className="checkout-step-content">
              <div className="checkout-section-header">
                <h3>Delivery Address</h3>
                <p>Enter your details for fast courier delivery in the UAE.</p>
              </div>

              <div className="checkout-form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <input 
                    type="text" 
                    name="firstName" 
                    value={formData.firstName} 
                    onChange={handleChange} 
                    placeholder="First Name"
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
                    placeholder="Last Name"
                    required 
                  />
                </div>

                <div className="form-group full-width">
                  <label>Email Address (for Receipt &amp; Updates)</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="your.email@example.com"
                    required 
                  />
                </div>

                <div className="form-group full-width">
                  <label>Phone Number (for Courier SMS &amp; WhatsApp Alerts)</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    placeholder="+971 50 123 4567"
                    required 
                  />
                </div>

                <div className="form-group full-width">
                  <label>Street Address / Apartment / Building</label>
                  <input 
                    type="text" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleChange} 
                    placeholder="Street, Building, Flat No."
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

              {/* Order Quick Summary Preview */}
              <div className="checkout-mini-summary">
                <div className="mini-summary-line">
                  <span>Cart Items ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
                  <strong>{curr} {cartSubtotal.toFixed(2)}</strong>
                </div>
                <div className="mini-summary-line">
                  <span>Delivery</span>
                  <span style={{ color: '#10b981', fontWeight: '700' }}>{isFreeShipping ? 'FREE' : `${curr} ${shippingFee.toFixed(2)}`}</span>
                </div>
              </div>

              <div className="checkout-step-actions">
                <button 
                  className="checkout-btn" 
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
            <div className="checkout-step-content">
              <div className="checkout-section-header">
                <h3>Payment Method</h3>
                <p>Choose your preferred payment option.</p>
              </div>

              {/* Payment Methods Grid */}
              <div className="payment-methods-grid">
                {[
                  { id: 'Credit Card', name: 'Credit Card', sub: 'Visa / MC', badge: null },
                  { id: 'Apple Pay', name: 'Apple Pay', sub: '1-Tap Pay', badge: null },
                  { id: 'Tabby (4 Installments)', name: 'Tabby', sub: '4 Payments', badge: '0% Interest' },
                  { id: 'Cash on Delivery', name: 'Cash on Delivery', sub: 'Pay on Arrival', badge: null }
                ].map((m) => (
                  <div 
                    key={m.id}
                    className={`payment-card-opt ${formData.paymentMethod === m.id ? 'selected' : ''}`}
                    onClick={() => setFormData({ ...formData, paymentMethod: m.id })}
                  >
                    <div className="payment-opt-title">
                      <strong>{m.name}</strong>
                      {m.badge && <span className="payment-opt-badge">{m.badge}</span>}
                    </div>
                    <span className="payment-opt-sub">{m.sub}</span>
                  </div>
                ))}
              </div>

              {/* Credit Card Input & 3D Simulation */}
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
                      <div className="card-col">
                        <span className="card-lbl">CARDHOLDER</span>
                        <span className="card-val">{formData.cardHolder || 'SARAH JENKINS'}</span>
                      </div>
                      <div className="card-col" style={{ textAlign: 'right' }}>
                        <span className="card-lbl">EXPIRES</span>
                        <span className="card-val">{formData.cardExpiry || '12/28'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="checkout-form-grid card-fields-grid" style={{ marginTop: '16px' }}>
                    <div className="form-group full-width">
                      <div className="card-label-row">
                        <label>Card Number</label>
                        <span className="ssl-lock-badge">
                          <Lock size={11} /> 256-bit SSL Encrypted
                        </span>
                      </div>
                      <input 
                        type="text" 
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="4242 4242 4242 4242"
                        className="monospace-input"
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Cardholder Name</label>
                      <input 
                        type="text" 
                        name="cardHolder"
                        value={formData.cardHolder}
                        onChange={handleChange}
                        placeholder="Name on card"
                      />
                    </div>
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input 
                        type="text" 
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        placeholder="MM/YY" 
                      />
                    </div>
                    <div className="form-group">
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
              )}

              {formData.paymentMethod.includes('Tabby') && (
                <div className="tabby-split-info">
                  <div className="tabby-header">
                    <Sparkles size={16} color="#059669" />
                    <strong>Split in 4 interest-free payments of {curr} {(cartTotal / 4).toFixed(2)}</strong>
                  </div>
                  <p>No interest. No hidden fees. Instant approval at checkout with Emirates ID.</p>
                </div>
              )}

              {/* WhatsApp live order tracking updates banner */}
              <div className="checkout-whatsapp-banner">
                <Smartphone size={16} className="whatsapp-icon" />
                <div className="whatsapp-text">
                  <strong>WhatsApp Delivery Alerts:</strong> Real-time courier live tracking links will be sent to <strong>{formData.phone}</strong>.
                </div>
              </div>

              {/* Promo Code Input Box */}
              <div className="checkout-promo-box">
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
                  <form onSubmit={handleApplyCoupon} className="coupon-form-row">
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. KBEAUTY20)"
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
                  <div className="price-summary-row promo-discount-row">
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
                  <span className="total-due-val">{curr} {cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Actions */}
              <div className="checkout-step-actions payment-actions">
                <button 
                  onClick={() => setStep(1)}
                  className="checkout-back-btn"
                >
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
                <button 
                  className="checkout-btn place-order-btn" 
                  onClick={handlePlaceOrder}
                >
                  <Lock size={15} />
                  <span>Pay &amp; Place Order ({curr} {cartTotal.toFixed(2)})</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Order Confirmation */}
          {step === 3 && completedOrder && (
            <div className="checkout-confirmed-step">
              <div className="order-confirmed-icon-circle">
                <CheckCircle size={38} />
              </div>

              <h3 className="order-confirmed-title">
                Order Confirmed!
              </h3>
              <p className="order-confirmed-desc">
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

              <div className="order-confirmed-actions">
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
                >
                  Track My Order →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
