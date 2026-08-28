import React, { useState } from 'react';
import { X, Heart, ShoppingCart, Star, Check, Shield, Truck, Zap, Bell, Share2, Copy, MessageCircle } from 'lucide-react';
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
    openNotifyModal,
    settings,
    showToast
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isSaved = isInWishlist(product.id);
  const isOutOfStock = product.stock !== undefined && product.stock <= 0;
  const isLowStock = !isOutOfStock && product.stock !== undefined && product.stock <= 5;
  const curr = settings?.currency || 'AED';

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

  const handleCopyLink = () => {
    const url = `${window.location.origin}/#product-${product.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
    setCopiedLink(true);
    showToast('Link Copied!', 'Product link copied to clipboard.');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`Check out ${product.name} on Zigzet: ${window.location.origin}/#product-${product.id}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
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
                <span className="quick-view-brand-tag">
                  {product.brand}
                </span>
              )}

              {product.productSize && (
                <span className="quick-view-size-tag">
                  📦 Size: {product.productSize}
                </span>
              )}

              {isOutOfStock ? (
                <span className="product-badge-sale out-of-stock" style={{ position: 'static' }}>Out of Stock</span>
              ) : product.isSale ? (
                <span className="product-badge-sale" style={{ position: 'static' }}>Sale</span>
              ) : null}

              <span className={`quick-view-stock-pill ${isOutOfStock ? 'out' : isLowStock ? 'low' : 'in'}`}>
                {isOutOfStock ? 'Sold Out' : isLowStock ? `⚡ Only ${product.stock} Left in Stock!` : `In Stock (${product.stock || 25} available)`}
              </span>
            </div>

            <h2 className="quick-view-title">{product.name}</h2>

            {/* Rating */}
            <div className="quick-view-rating-row">
              <div style={{ display: 'flex', color: '#f59e0b', gap: '2px' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <span className="rating-score">
                {product.rating || 5}
              </span>
              <span className="rating-count">
                ({product.reviewsCount || 48} verified reviews)
              </span>
            </div>

            {/* Price (Dynamic Currency) */}
            <div className="quick-view-price-row">
              <span className="quick-view-current-price">
                {curr} {Number(product.price).toFixed(2)}
              </span>
              {product.originalPrice && Number(product.originalPrice) > Number(product.price) && (
                <span className="quick-view-original-price">
                  {curr} {Number(product.originalPrice).toFixed(2)}
                </span>
              )}
            </div>

            {/* Low stock scarcity progress indicator */}
            {isLowStock && (
              <div className="quick-view-scarcity-bar">
                <div className="scarcity-label">
                  <span>⚡ High demand — selling fast!</span>
                  <strong>{product.stock} left</strong>
                </div>
                <div className="scarcity-track">
                  <div className="scarcity-fill" style={{ width: `${(product.stock / 10) * 100}%` }} />
                </div>
              </div>
            )}

            {/* Color Swatches Option */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <div className="quick-view-option-title">
                  Color Finish: <strong>{currentColor?.name}</strong>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {product.colors.map((c, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(c)}
                      className={`color-swatch-btn ${currentColor?.name === c.name ? 'active' : ''}`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                      aria-label={`Select color ${c.name}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size / Capacity Options */}
            {product.sizes && product.sizes.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <div className="quick-view-option-title">
                  Size / Option: <strong>{currentSize}</strong>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {product.sizes.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSize(s)}
                      className={`size-option-btn ${currentSize === s ? 'active' : ''}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Actions */}
            {!isOutOfStock && (
              <div className="quick-view-actions-row">
                <div className="quantity-selector">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    style={{ opacity: quantity <= 1 ? 0.4 : 1, cursor: quantity <= 1 ? 'not-allowed' : 'pointer' }}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button 
                  className="quick-view-add-btn" 
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={18} />
                  <span>Add to Shopping Bag</span>
                </button>

                <button
                  className={`quick-view-wish-btn ${isSaved ? 'active' : ''}`}
                  onClick={() => toggleWishlist(product)}
                  aria-label="Save to Wishlist"
                  title={isSaved ? "Saved in wishlist" : "Add to wishlist"}
                >
                  <Heart size={20} fill={isSaved ? '#ef4444' : 'none'} color={isSaved ? '#ef4444' : 'currentColor'} />
                </button>
              </div>
            )}

            {/* If out of stock, show notify button */}
            {isOutOfStock ? (
              <button 
                onClick={handleNotifyMe}
                className="hero-cta-btn notify-full-btn"
              >
                <Bell size={18} />
                <span>Notify Me When Available in Stock</span>
              </button>
            ) : (
              <button
                onClick={handleBuyNow}
                className="quick-view-buy-now-btn"
              >
                <Zap size={16} />
                <span>Instant 1-Click Buy Now</span>
              </button>
            )}

            <p className="quick-view-description">{product.description}</p>

            {/* Share & Social Row */}
            <div className="quick-view-share-row">
              <span className="share-label">Share Product:</span>
              <button 
                className="share-action-btn"
                onClick={handleCopyLink}
                title="Copy Product Link"
              >
                {copiedLink ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                <span>{copiedLink ? 'Copied' : 'Copy Link'}</span>
              </button>
              <button 
                className="share-action-btn whatsapp"
                onClick={handleWhatsAppShare}
                title="Share via WhatsApp"
              >
                <MessageCircle size={14} />
                <span>WhatsApp</span>
              </button>
            </div>

            {/* Trust highlights */}
            <div className="quick-view-trust-row">
              <div className="trust-item">
                <Truck size={14} color="#10b981" />
                <span>Free Express Delivery over {curr} {settings?.freeShippingThreshold || 150}</span>
              </div>
              <div className="trust-item">
                <Shield size={14} color="#7c3aed" />
                <span>100% Authentic Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
