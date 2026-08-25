import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CartDrawer = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    cartSubtotal,
    isFreeShipping,
    shippingFee,
    estimatedTax,
    cartTotal,
    settings,
    setIsCheckoutOpen
  } = useStore();

  if (!isCartOpen) return null;

  const threshold = settings.freeShippingThreshold;
  const progressPercent = Math.min(100, (cartSubtotal / threshold) * 100);
  const remainingForFree = Math.max(0, threshold - cartSubtotal);

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <div 
        className={`drawer-backdrop ${isCartOpen ? 'open' : ''}`}
        onClick={() => setIsCartOpen(false)}
      />

      <div className={`slide-drawer ${isCartOpen ? 'open' : ''}`}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <h3>
            <ShoppingBag size={20} />
            <span>Your Bag ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
          </h3>
          <button 
            className="drawer-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close Bag"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="free-shipping-meter">
          <div className="meter-label">
            {isFreeShipping ? (
              <span style={{ color: '#10b981', fontWeight: '700' }}>
                You've unlocked FREE USA Shipping!
              </span>
            ) : (
              <span>
                Add <strong>${remainingForFree.toFixed(2)}</strong> more for <strong>FREE USA Shipping</strong>
              </span>
            )}
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <div className="meter-track">
            <div 
              className="meter-fill" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Drawer Body */}
        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="drawer-empty-state">
              <ShoppingBag size={54} strokeWidth={1.5} />
              <h4>Your bag is empty</h4>
              <p>Looks like you haven't added anything yet.</p>
              <button 
                className="hero-cta-btn"
                onClick={() => setIsCartOpen(false)}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item) => (
                <div className="cart-item-row" key={item.id}>
                  <div className="cart-item-thumb">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="cart-item-details">
                    <div className="cart-item-header">
                      <h4 className="cart-item-title">{item.name}</h4>
                      <button 
                        className="cart-item-trash"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="cart-item-footer">
                      <div className="qty-control">
                        <button 
                          className="qty-btn"
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button 
                          className="qty-btn"
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span className="cart-item-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="price-summary-row">
              <span>Subtotal</span>
              <span>${cartSubtotal.toFixed(2)}</span>
            </div>

            <div className="price-summary-row">
              <span>Estimated Shipping</span>
              <span>{isFreeShipping ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
            </div>

            <div className="price-summary-row">
              <span>Estimated Tax (8%)</span>
              <span>${estimatedTax.toFixed(2)}</span>
            </div>

            <div className="price-summary-row total">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <button 
              className="checkout-btn"
              onClick={handleCheckoutClick}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '11.5px', color: '#6b7280', marginTop: '12px' }}>
              <ShieldCheck size={14} color="#10b981" />
              <span>Safe & Secure 256-Bit SSL Encrypted Checkout</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
