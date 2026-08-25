import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, Eye, Bell } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ProductCard = ({ product }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setQuickViewProduct,
    openNotifyModal 
  } = useStore();

  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );

  const isSaved = isInWishlist(product.id);
  const activeImage = selectedColor ? selectedColor.image : product.image;
  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  // Render 5 stars based on rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => {
      const fillAmount = Math.max(0, Math.min(1, rating - i));
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

  return (
    <div className="product-card">
      {/* Product Image Tile */}
      <div 
        className="product-thumb-wrapper" 
        onClick={() => setQuickViewProduct({ ...product, activeImage, selectedColor })}
      >
        {/* Sale Badge & Out of Stock Badge */}
        {isOutOfStock ? (
          <span className="product-badge-sale" style={{ backgroundColor: '#ef4444', color: '#fff' }}>Out of Stock</span>
        ) : product.isSale ? (
          <span className="product-badge-sale">Sale</span>
        ) : null}

        {/* Wishlist Button */}
        <button
          className={`wishlist-btn ${isSaved ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label="Toggle Wishlist"
        >
          <Heart 
            size={16} 
            fill={isSaved ? '#ef4444' : 'none'} 
            color={isSaved ? '#ef4444' : '#111827'} 
          />
        </button>

        {/* Product Image */}
        <img
          src={activeImage}
          alt={product.name}
          loading="lazy"
        />

        {/* Quick View Button on Hover */}
        <button 
          className="quick-view-overlay-btn"
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct({ ...product, activeImage, selectedColor });
          }}
        >
          Quick View
        </button>
      </div>

      {/* Product Meta Details */}
      <div className="product-meta">
        <h4 
          className="product-name"
          onClick={() => setQuickViewProduct({ ...product, activeImage, selectedColor })}
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
          <span className="rating-number">({product.rating})</span>
        </div>

        {/* Price Row */}
        <div className="product-price-row">
          <span className="current-price">${Number(product.price).toFixed(2)}</span>
          {product.originalPrice && (
            <span className="original-price">${Number(product.originalPrice).toFixed(2)}</span>
          )}
        </div>

        {/* Action Button: Add to Cart OR Notify When in Stock */}
        {isOutOfStock ? (
          <button
            className="notify-stock-btn"
            onClick={() => openNotifyModal(product)}
          >
            <Bell size={14} />
            <span>Notify When Available</span>
          </button>
        ) : (
          <button
            className="add-to-cart-btn"
            onClick={() => addToCart({ ...product, image: activeImage, selectedColor: selectedColor?.name }, 1)}
          >
            <ShoppingCart size={15} />
            <span>Add to Cart</span>
          </button>
        )}
      </div>
    </div>
  );
};
