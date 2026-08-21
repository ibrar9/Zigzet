import React from 'react';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ProductCard = ({ product }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setQuickViewProduct 
  } = useStore();

  const isSaved = isInWishlist(product.id);

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
        onClick={() => setQuickViewProduct(product)}
      >
        {/* Sale Badge */}
        {product.isSale && (
          <span className="product-badge-sale">Sale</span>
        )}

        {/* Wishlist Button */}
        <button
          className={`wishlist-btn ${isSaved ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
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
          src={product.image}
          alt={product.name}
          loading="lazy"
        />

        {/* Quick View Button on Hover */}
        <button 
          className="quick-view-overlay-btn"
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
        >
          Quick View
        </button>
      </div>

      {/* Product Meta Details */}
      <div className="product-meta">
        <h4 
          className="product-name"
          onClick={() => setQuickViewProduct(product)}
          title={product.name}
        >
          {product.name}
        </h4>

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

        {/* Add to Cart Button */}
        <button
          className="add-to-cart-btn"
          onClick={() => addToCart(product, 1)}
        >
          <ShoppingCart size={15} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};
