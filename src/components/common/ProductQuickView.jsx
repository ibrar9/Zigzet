import React, { useState } from 'react';
import { X, Heart, ShoppingCart, Star, Check, Shield, Truck, Zap } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ProductQuickView = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist,
    setIsCartOpen,
    setIsCheckoutOpen
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isSaved = isInWishlist(product.id);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setQuickViewProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuickViewProduct(null);
    setIsCartOpen(true);
  };

  return (
    <div className="modal-overlay open" onClick={() => setQuickViewProduct(null)}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close-icon"
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="quick-view-grid">
          {/* Gallery Column */}
          <div className="quick-view-gallery">
            <div className="quick-view-main-image">
              <img src={images[selectedImgIdx] || product.image} alt={product.name} />
            </div>

            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImgIdx(idx)}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '8px',
                      padding: '4px',
                      border: selectedImgIdx === idx ? '2px solid #111827' : '1px solid #e5e7eb',
                      cursor: 'pointer',
                      backgroundColor: '#f9fafb'
                    }}
                  >
                    <img src={img} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Column */}
          <div className="quick-view-info">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              {product.isSale && <span className="product-badge-sale" style={{ position: 'static' }}>Sale</span>}
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#10b981', backgroundColor: '#ecfdf5', padding: '2px 8px', borderRadius: '9999px' }}>
                In Stock ({product.stock || 25} available)
              </span>
            </div>

            <h2>{product.name}</h2>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '8px 0 16px 0' }}>
              <div style={{ display: 'flex', color: '#f59e0b', gap: '2px' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#111827' }}>
                {product.rating}
              </span>
              <span style={{ fontSize: '13px', color: '#6b7280' }}>
                ({product.reviewsCount || 48} customer reviews)
              </span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '18px' }}>
              <span style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'var(--font-primary)' }}>
                ${Number(product.price).toFixed(2)}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '16px', color: '#9ca3af', textDecoration: 'line-through' }}>
                  ${Number(product.originalPrice).toFixed(2)}
                </span>
              )}
            </div>

            <p className="quick-view-description">{product.description}</p>

            {/* Specifications */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="quick-view-specs">
                <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#4b5563', marginBottom: '6px' }}>
                  Specifications
                </div>
                {Object.entries(product.specs).map(([key, val]) => (
                  <div className="spec-row" key={key}>
                    <span className="spec-label">{key}</span>
                    <span className="spec-value">{val}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity and Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div className="qty-control" style={{ padding: '2px' }}>
                <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span className="qty-value">{quantity}</span>
                <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>

              <button 
                className="add-to-cart-btn" 
                style={{ flex: 1, margin: 0 }}
                onClick={handleAddToCart}
              >
                <ShoppingCart size={16} />
                <span>Add to Bag</span>
              </button>

              <button
                className={`wishlist-btn ${isSaved ? 'active' : ''}`}
                style={{ position: 'static', width: '42px', height: '42px' }}
                onClick={() => toggleWishlist(product.id)}
                aria-label="Wishlist"
              >
                <Heart size={18} fill={isSaved ? '#ef4444' : 'none'} color={isSaved ? '#ef4444' : '#111827'} />
              </button>
            </div>

            <button 
              onClick={handleBuyNow}
              style={{
                width: '100%',
                backgroundColor: '#2563eb',
                color: '#fff',
                padding: '12px',
                borderRadius: '9999px',
                fontWeight: '700',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'background 0.2s'
              }}
            >
              <Zap size={16} />
              <span>Instant Buy Now</span>
            </button>

            {/* Trust highlights */}
            <div style={{ display: 'flex', gap: '16px', marginTop: '18px', paddingTop: '14px', borderTop: '1px solid #f1f5f9', fontSize: '12px', color: '#6b7280' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Truck size={14} color="#10b981" />
                <span>Free USA Shipping</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Shield size={14} color="#3b82f6" />
                <span>2-Year Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
