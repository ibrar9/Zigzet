import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, Eye, Bell, Check, Sparkles, Zap } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ProductCard = ({ product }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setQuickViewProduct, 
    openNotifyModal,
    setIsCheckoutOpen,
    settings 
  } = useStore();

  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );
  const [isAdded, setIsAdded] = useState(false);

  const isSaved = isInWishlist(product.id);
  const activeImage = selectedColor ? selectedColor.image : product.image;
  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  // Calculate discount percentage
  const discountPercent = (product.originalPrice && Number(product.originalPrice) > Number(product.price))
    ? Math.round(((Number(product.originalPrice) - Number(product.price)) / Number(product.originalPrice)) * 100)
    : 0;

  // Render 5 stars based on rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => {
      const fillAmount = Math.max(0, Math.min(1, (rating || 5) - i));
      return (
        <Star
          key={i}
          size={13}
          fill={fillAmount > 0.5 ? '#f59e0b' : 'none'}
          color="#f59e0b"
          strokeWidth={1.5}
        />
      );
    });
  };

  // Extract size/volume from product name or property
  const extractSize = (name, sizeProp) => {
    if (sizeProp) return sizeProp;
    if (!name) return null;
    const match = name.match(/(\d+\s*ml\s*[×x]\s*\d+|\d+\s*g\s*[×x]\s*\d+|\d+\s*ml\s*\+\s*\d+\s*ml|\d+\s*[×x]\s*\d+\s*ml|\d+\s*Pads|\d+\s*EA|\d+\s*ea|\d+\s*ml|\d+\s*g)/i);
    return match ? match[0] : null;
  };

  const productSize = extractSize(product.name, product.size);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ 
      ...product, 
      image: activeImage, 
      selectedColor: selectedColor?.name,
      productSize 
    }, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1400);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    addToCart({ 
      ...product, 
      image: activeImage, 
      selectedColor: selectedColor?.name,
      productSize 
    }, 1);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="product-card">
      {/* Product Image Tile */}
      <div 
        className="product-thumb-wrapper" 
        onClick={() => setQuickViewProduct({ ...product, activeImage, selectedColor, productSize })}
      >
        {/* Dynamic Badges */}
        <div className="product-badge-group">
          {isOutOfStock ? (
            <span className="product-badge-sale out-of-stock">Sold Out</span>
          ) : discountPercent > 0 ? (
            <span className="product-badge-sale discount-badge">-{discountPercent}%</span>
          ) : product.isSale ? (
            <span className="product-badge-sale">Sale</span>
          ) : null}

          {productSize && (
            <span className="product-size-badge" title={`Size / Volume: ${productSize}`}>
              {productSize}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          className={`wishlist-btn ${isSaved ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label="Toggle Wishlist"
          title={isSaved ? "Remove from Wishlist" : "Save to Wishlist"}
        >
          <Heart 
            size={16} 
            fill={isSaved ? '#ef4444' : 'none'} 
            color={isSaved ? '#ef4444' : 'currentColor'} 
          />
        </button>

        {/* Product Image */}
        <img
          src={activeImage}
          alt={product.name}
          loading="lazy"
        />

        {/* Quick View Button on Hover & Mobile */}
        <button 
          className="quick-view-overlay-btn"
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct({ ...product, activeImage, selectedColor, productSize });
          }}
          title="Quick View"
        >
          <Eye size={14} />
          <span>Quick View</span>
        </button>
      </div>

      {/* Product Meta Details */}
      <div className="product-meta">
        {product.brand && (
          <span className="product-brand-tag">{product.brand}</span>
        )}
        <h4 
          className="product-name"
          onClick={() => setQuickViewProduct({ ...product, activeImage, selectedColor, productSize })}
          title={product.name}
        >
          {product.name}
        </h4>

        {/* Color Swatches if available */}
        {product.colors && product.colors.length > 0 && (
          <div className="product-card-colors-row" onClick={(e) => e.stopPropagation()}>
            {product.colors.map((c, idx) => (
              <button
                key={idx}
                className={`color-swatch-dot ${selectedColor?.name === c.name ? 'active' : ''}`}
                style={{ backgroundColor: c.hex }}
                onClick={() => setSelectedColor(c)}
                title={c.name}
                aria-label={`Select ${c.name}`}
              />
            ))}
            <span className="color-swatch-label">{selectedColor?.name}</span>
          </div>
        )}

        {/* Rating */}
        <div className="product-rating">
          <div className="stars-row">
            {renderStars(product.rating || 5)}
          </div>
          <span className="rating-number">({product.rating || 5})</span>
        </div>

        {/* Price Row (Dynamic Currency) */}
        <div className="product-price-row">
          <span className="current-price">{settings?.currency || 'AED'} {Number(product.price).toFixed(2)}</span>
          {product.originalPrice && Number(product.originalPrice) > Number(product.price) && (
            <span className="original-price">{settings?.currency || 'AED'} {Number(product.originalPrice).toFixed(2)}</span>
          )}
        </div>

        {/* Action Button: Dual Actions (Add to Bag + Buy Now) OR Notify When in Stock */}
        {isOutOfStock ? (
          <button
            className="notify-stock-btn"
            onClick={(e) => { e.stopPropagation(); openNotifyModal(product); }}
          >
            <Bell size={14} />
            <span>Notify When Available</span>
          </button>
        ) : (
          <div className="product-card-actions-group" onClick={(e) => e.stopPropagation()}>
            <button
              className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
              onClick={handleAddToCart}
              title="Add to Shopping Bag"
            >
              {isAdded ? (
                <>
                  <Check size={14} className="add-check-icon" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={14} />
                  <span>Add to Bag</span>
                </>
              )}
            </button>
            <button
              className="card-buy-now-btn"
              onClick={handleBuyNow}
              title="Instant 1-Click Checkout"
            >
              <Zap size={13} />
              <span>Buy Now</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
