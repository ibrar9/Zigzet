import React from 'react';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const WishlistDrawer = () => {
  const { 
    isWishlistOpen, 
    setIsWishlistOpen, 
    wishlist, 
    products, 
    toggleWishlist, 
    addToCart 
  } = useStore();

  if (!isWishlistOpen) return null;

  const savedProducts = wishlist
    .map((item) => {
      if (typeof item === 'object' && item && item.id) {
        const live = products.find((p) => p.id === item.id);
        return live || item;
      }
      return products.find((p) => p.id === item) || null;
    })
    .filter(Boolean);

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    toggleWishlist(product);
  };

  return (
    <>
      <div 
        className={`drawer-backdrop ${isWishlistOpen ? 'open' : ''}`}
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className={`slide-drawer ${isWishlistOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="drawer-header">
          <h3>
            <Heart size={20} fill="#ef4444" color="#ef4444" />
            <span>Wishlist ({savedProducts.length})</span>
          </h3>
          <button 
            className="drawer-close-btn"
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close Wishlist"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="drawer-body">
          {savedProducts.length === 0 ? (
            <div className="drawer-empty-state">
              <Heart size={54} strokeWidth={1.5} color="#d1d5db" />
              <h4>No favorites saved</h4>
              <p>Click the heart icon on any product to save items you love!</p>
              <button 
                className="hero-cta-btn"
                onClick={() => setIsWishlistOpen(false)}
              >
                Explore Products
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {savedProducts.map((product) => (
                <div className="cart-item-row" key={product.id}>
                  <div className="cart-item-thumb">
                    <img src={product.image} alt={product.name} />
                  </div>

                  <div className="cart-item-details">
                    <div className="cart-item-header">
                      <h4 className="cart-item-title">{product.name}</h4>
                      <button 
                        className="cart-item-trash"
                        onClick={() => toggleWishlist(product)}
                        aria-label="Remove from Wishlist"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="cart-item-footer">
                      <span className="cart-item-price">
                        ${Number(product.price).toFixed(2)}
                      </span>

                      <button
                        onClick={() => handleMoveToCart(product)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          backgroundColor: '#111827',
                          color: '#ffffff',
                          padding: '6px 14px',
                          borderRadius: '9999px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}
                      >
                        <ShoppingCart size={13} />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
