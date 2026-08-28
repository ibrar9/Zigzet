import React from 'react';
import { X, Heart, ShoppingCart, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const WishlistDrawer = () => {
  const { 
    isWishlistOpen, 
    setIsWishlistOpen, 
    wishlist, 
    products, 
    toggleWishlist, 
    addToCart,
    navigatePage,
    settings,
    showToast
  } = useStore();

  if (!isWishlistOpen) return null;

  const curr = settings?.currency || 'AED';

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

  const handleMoveAllToCart = () => {
    savedProducts.forEach((p) => {
      addToCart(p, 1);
      toggleWishlist(p);
    });
    showToast('All Items Moved', 'All wishlist items have been added to your shopping bag.');
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
              <Heart size={54} strokeWidth={1.5} color="var(--color-text-light, #d1d5db)" />
              <h4>No favorites saved</h4>
              <p>Click the heart icon on any product to save items you love!</p>
              <button 
                className="drawer-start-shopping-btn"
                onClick={() => {
                  setIsWishlistOpen(false);
                  navigatePage('shop');
                }}
              >
                Explore Products
              </button>
            </div>
          ) : (
            <>
              {savedProducts.length > 1 && (
                <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--color-border-light, #f1f5f9)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12.5px', color: 'var(--color-text-muted, #64748b)' }}>{savedProducts.length} items saved</span>
                  <button 
                    onClick={handleMoveAllToCart}
                    className="wishlist-move-all-btn"
                  >
                    <ShoppingCart size={13} />
                    <span>Move All to Bag</span>
                  </button>
                </div>
              )}

              <div className="cart-items-list">
                {savedProducts.map((product) => (
                  <div className="cart-item-card" key={product.id}>
                    <div className="cart-item-img-box">
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

                      {product.brand && (
                        <span className="product-brand-tag" style={{ fontSize: '10px', padding: '1px 6px' }}>{product.brand}</span>
                      )}

                      <div className="cart-item-footer">
                        <span className="cart-item-price">
                          {curr} {Number(product.price).toFixed(2)}
                        </span>

                        <button
                          onClick={() => handleMoveToCart(product)}
                          className="wishlist-add-item-btn"
                        >
                          <ShoppingCart size={13} />
                          <span>Move to Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
