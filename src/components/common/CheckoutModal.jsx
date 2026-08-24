import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, CreditCard, ArrowRight, Lock, Sparkles } from 'lucide-react';
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
    createOrder,
    setViewMode,
    setAdminTab
  } = useStore();

  const [step, setStep] = useState(1);
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

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const orderData = {
      customerName: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`,
      paymentMethod: formData.paymentMethod === 'Credit Card' 
        ? 'Credit Card (Visa •••• 4242)' 
        : formData.paymentMethod
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

  const handleViewInAdmin = () => {
    handleClose();
    setViewMode('admin');
    setAdminTab('orders');
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

        {/* Step 2: Payment Method */}
        {step === 2 && (
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>
              Payment Method
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

            {/* Order Summary Recap */}
            <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
              <div className="price-summary-row">
                <span>Items Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="price-summary-row">
                <span>USA Shipping</span>
                <span>{isFreeShipping ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="price-summary-row">
                <span>Estimated Tax</span>
                <span>${estimatedTax.toFixed(2)}</span>
              </div>
              <div className="price-summary-row total">
                <span>Total Amount Due</span>
                <span>${cartTotal.toFixed(2)}</span>
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
                <span>Place Order (${cartTotal.toFixed(2)})</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Order Confirmation */}
        {step === 3 && completedOrder && (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ width: '64px', height: '64px', backgroundColor: '#ecfdf5', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', color: '#10b981' }}>
              <CheckCircle size={38} />
            </div>

            <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '6px' }}>
              Order Placed Successfully!
            </h3>
            <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>
              Thank you for shopping with <strong>Zigzet</strong>. Your confirmation email is on the way.
            </p>

            <div style={{ background: '#f9fafb', padding: '18px 24px', borderRadius: '16px', border: '1px solid #e5e7eb', textAlign: 'left', maxWidth: '480px', margin: '0 auto 28px auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                <span style={{ color: '#6b7280' }}>Order ID:</span>
                <span style={{ fontWeight: '700', color: '#111827' }}>#{completedOrder.id}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                <span style={{ color: '#6b7280' }}>Customer:</span>
                <span style={{ fontWeight: '600' }}>{completedOrder.customerName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                <span style={{ color: '#6b7280' }}>Payment:</span>
                <span style={{ fontWeight: '600' }}>{completedOrder.paymentMethod}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '800', borderTop: '1px solid #e5e7eb', paddingTop: '8px', marginTop: '8px' }}>
                <span>Total Paid:</span>
                <span style={{ color: '#10b981' }}>${Number(completedOrder.total).toFixed(2)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button 
                className="hero-cta-btn"
                onClick={handleClose}
              >
                Continue Shopping
              </button>

              <button 
                onClick={handleViewInAdmin}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#2563eb',
                  color: '#fff',
                  padding: '12px 20px',
                  borderRadius: '9999px',
                  fontWeight: '600',
                  fontSize: '13.5px'
                }}
              >
                <Sparkles size={15} />
                <span>View Order in Admin Panel</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
