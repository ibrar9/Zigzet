import React, { useState } from 'react';
import { X, Heart, ShoppingCart, Star, Check, Shield, Truck, Zap, Bell } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductImageZoom } from './ProductImageZoom';

export const ProductQuickView = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist,
    setIsCartOpen,
    setIsCheckoutOpen,
    openNotifyModal
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isSaved = isInWishlist(product.id);
  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  // Initialize selected color & size
  const currentColor = selectedColor || (product.colors && product.colors.length > 0 ? product.colors[0] : null);
  const currentSize = selectedSize || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : null);

  const images = product.images && product.images.length > 0 
    ? (currentColor ? [currentColor.image, ...product.images.filter(i => i !== currentColor.image)] : product.images)
    : [currentColor?.image || product.image];

  const handleBuyNow = () => {
    addToCart({ 
      ...product, 
      image: currentColor?.image || product.image,
      selectedColor: currentColor?.name,
      selectedSize: currentSize
    }, quantity);
    setQuickViewProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleAddToCart = () => {
    addToCart({ 
      ...product, 
      image: currentColor?.image || product.image,
      selectedColor: currentColor?.name,
      selectedSize: currentSize
    }, quantity);
    setQuickViewProduct(null);
    setIsCartOpen(true);
  };

  const handleNotifyMe = () => {
    setQuickViewProduct(null);
    openNotifyModal(product);
  };

  return (
    <div className="modal-overlay open" onClick={() => setQuickViewProduct(null)}>
      <div className="modal-box" style={{ maxWidth: '820px' }} onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close-icon"
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="quick-view-grid">
          {/* Interactive Zoom & Multi-Angle Gallery Column */}
          <div className="quick-view-gallery">
            <ProductImageZoom
              images={images}
              mainImage={currentColor?.image || product.image}
              productName={product.name}
            />
          </div>

          {/* Product Info Column */}
          <div className="quick-view-info">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              {product.brand && (
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#7c3aed', backgroundColor: '#f5f3ff', padding: '3px 10px', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {product.brand}
                </span>
              )}

              {product.productSize && (
                <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#1e293b', backgroundColor: '#f1f5f9', padding: '3px 10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  📦 Size: {product.productSize}
                </span>
              )}

              {isOutOfStock ? (
                <span className="product-badge-sale" style={{ position: 'static', backgroundColor: '#ef4444', color: '#fff' }}>Out of Stock</span>
              ) : product.isSale ? (
                <span className="product-badge-sale" style={{ position: 'static' }}>Sale</span>
              ) : null}

              <span style={{ fontSize: '12px', fontWeight: '700', color: isOutOfStock ? '#ef4444' : '#10b981', backgroundColor: isOutOfStock ? '#fef2f2' : '#ecfdf5', padding: '3px 10px', borderRadius: '9999px' }}>
                {isOutOfStock ? 'Sold Out' : `In Stock (${product.stock || 25} available)`}
              </span>
            </div>

            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', lineHeight: '1.3' }}>{product.name}</h2>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '8px 0 14px 0' }}>
              <div style={{ display: 'flex', color: '#f59e0b', gap: '2px' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#111827' }}>
                {product.rating}
              </span>
              <span style={{ fontSize: '13px', color: '#64748b' }}>
                ({product.reviewsCount || 48} verified reviews)
              </span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '16px' }}>
              <span style={{ fontSize: '26px', fontWeight: '900', color: '#0f172a' }}>
                ${Number(product.price).toFixed(2)}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '16px', color: '#94a3b8', textDecoration: 'line-through' }}>
                  ${Number(product.originalPrice).toFixed(2)}
                </span>
              )}
            </div>

            {/* Color Swatches Option */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#475569', marginBottom: '8px' }}>
                  Color Finish: <strong style={{ color: '#0f172a' }}>{currentColor?.name}</strong>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {product.colors.map((c, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedColor(c);
                        setSelectedImgIdx(0);
                      }}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '9999px',
                        backgroundColor: c.hex,
                        border: currentColor?.name === c.name ? '3px solid #7c3aed' : '2px solid #e2e8f0',
                        outline: currentColor?.name === c.name ? '2px solid rgba(124, 58, 237, 0.3)' : 'none',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size / Capacity Options */}
            {product.sizes && product.sizes.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#475569', marginBottom: '8px' }}>
                  Size / Option: <strong style={{ color: '#0f172a' }}>{currentSize}</strong>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {product.sizes.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSize(s)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '8px',
                        fontSize: '12.5px',
                        fontWeight: '700',
                        border: currentSize === s ? '2px solid #7c3aed' : '1px solid #e2e8f0',
                        background: currentSize === s ? '#f5f3ff' : '#ffffff',
                        color: currentSize === s ? '#7c3aed' : '#334155',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="quick-view-description">{product.description}</p>

            {/* Action Buttons */}
            {isOutOfStock ? (
              <div style={{ marginTop: '16px' }}>
                <button
                  className="hero-cta-btn"
                  onClick={handleNotifyMe}
                  style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#7c3aed' }}
                >
                  <Bell size={16} />
                  <span>Notify Me When in Stock</span>
                </button>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', marginTop: '14px' }}>
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
                    style={{ position: 'static', width: '44px', height: '44px', borderRadius: '10px' }}
                    onClick={() => toggleWishlist(product)}
                    aria-label="Wishlist"
                  >
                    <Heart size={18} fill={isSaved ? '#ef4444' : 'none'} color={isSaved ? '#ef4444' : '#111827'} />
                  </button>
                </div>

                <button 
                  onClick={handleBuyNow}
                  className="hero-cta-btn"
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '13.5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <Zap size={16} />
                  <span>Instant 1-Click Buy Now</span>
                </button>
              </>
            )}

            {/* Trust highlights */}
            <div style={{ display: 'flex', gap: '16px', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #f1f5f9', fontSize: '12px', color: '#64748b' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Truck size={14} color="#10b981" />
                <span>Free USA Shipping</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Shield size={14} color="#7c3aed" />
                <span>2-Year Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
