import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Sparkles, MessageSquare, Check } from 'lucide-react';
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
    setIsCheckoutOpen,
    navigatePage,
    products,
    addToCart
  } = useStore();

  const [orderNote, setOrderNote] = useState('');
  const [noteOpen, setNoteOpen] = useState(false);

  if (!isCartOpen) return null;

  const curr = settings?.currency || 'AED';
  const threshold = settings?.freeShippingThreshold || 150;
  const progressPercent = Math.min(100, (cartSubtotal / threshold) * 100);
  const remainingForFree = Math.max(0, threshold - cartSubtotal);

  // Recommendations: products not in cart
  const cartIds = new Set(cart.map((i) => i.id));
  const crossSellProducts = products
    .filter((p) => !cartIds.has(p.id) && p.isActive !== false && p.stock > 0)
    .slice(0, 3);

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
        <div className={`free-shipping-meter ${isFreeShipping ? 'unlocked' : ''}`}>
          <div className="meter-label">
            {isFreeShipping ? (
              <span className="unlocked-text">
                <Sparkles size={14} /> You've unlocked FREE UAE Express Delivery!
              </span>
            ) : (
              <span>
                Add <strong>{curr} {remainingForFree.toFixed(2)}</strong> more for <strong>FREE Delivery</strong>
              </span>
            )}
            <span className="meter-percent">{Math.round(progressPercent)}%</span>
          </div>
          <div className="meter-track">
            <div 
              className={`meter-fill ${isFreeShipping ? 'complete' : ''}`} 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Drawer Body */}
        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="drawer-empty-state">
              <ShoppingBag size={48} strokeWidth={1} color="var(--color-text-light, #9ca3af)" />
              <h3>Your shopping bag is empty</h3>
              <p>Looks like you haven't added any K-Beauty favorites yet.</p>
              <button 
                className="drawer-start-shopping-btn"
                onClick={() => {
                  setIsCartOpen(false);
                  navigatePage('shop');
                }}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items-list">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item-card">
                    <div className="cart-item-img-box">
                      <img src={item.image} alt={item.name} />
                    </div>

                    <div className="cart-item-details">
                      <div className="cart-item-header">
                        <h4 className="cart-item-title">{item.name}</h4>
                        <button 
                          className="cart-item-trash"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      {item.selectedColor && (
                        <span className="cart-item-variant">Color: {item.selectedColor}</span>
                      )}

                      <div className="cart-item-footer">
                        <div className="qty-control">
                          <button 
                            className="qty-btn"
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            aria-label="Decrease"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="qty-value">{item.quantity}</span>
                          <button 
                            className="qty-btn"
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <span className="cart-item-price">
                          {curr} {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cross-Sell Recommendations */}
              {crossSellProducts.length > 0 && (
                <div className="cart-cross-sell-section">
                  <div className="cross-sell-title">
                    <Sparkles size={13} color="#7c3aed" />
                    <span>Pairs Well With Your Order</span>
                  </div>
                  <div className="cross-sell-list">
                    {crossSellProducts.map((cp) => (
                      <div key={cp.id} className="cross-sell-card">
                        <img src={cp.image} alt={cp.name} className="cross-sell-img" />
                        <div className="cross-sell-info">
                          <span className="cross-sell-name">{cp.name}</span>
                          <span className="cross-sell-price">{curr} {Number(cp.price).toFixed(2)}</span>
                        </div>
                        <button 
                          className="cross-sell-add-btn"
                          onClick={() => addToCart(cp, 1)}
                          title="Add to Cart"
                        >
                          + Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Order Notes Accordion */}
              <div className="cart-order-note-box">
                <button 
                  className="cart-note-toggle"
                  onClick={() => setNoteOpen(!noteOpen)}
                >
                  <MessageSquare size={14} />
                  <span>{orderNote ? 'Edit Order Note' : 'Add Delivery Note or Gift Wrap'}</span>
                </button>
                {noteOpen && (
                  <div className="cart-note-input-wrap">
                    <textarea 
                      placeholder="Special instructions for delivery (e.g. gate code, leave at door, gift note)..." 
                      value={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)}
                      rows={2}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="price-summary-row">
              <span>Subtotal</span>
              <span>{curr} {cartSubtotal.toFixed(2)}</span>
            </div>

            <div className="price-summary-row">
              <span>Estimated Shipping</span>
              <span>{isFreeShipping ? 'FREE' : `${curr} ${shippingFee.toFixed(2)}`}</span>
            </div>

            <div className="price-summary-row">
              <span>Estimated VAT (5%)</span>
              <span>{curr} {estimatedTax.toFixed(2)}</span>
            </div>

            <div className="price-summary-row total">
              <span>Total</span>
              <span>{curr} {cartTotal.toFixed(2)}</span>
            </div>

            <button 
              className="checkout-btn"
              onClick={handleCheckoutClick}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>

            <div className="checkout-trust-badge">
              <ShieldCheck size={14} color="#10b981" />
              <span>Safe & Secure 256-Bit SSL Encrypted Checkout</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
