import React from 'react';
import { Heart, ShoppingBag, Trash2, Star, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const UserWishlist = () => {
  const { wishlist, toggleWishlist, addToCart, navigatePage, settings } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="ud2-orders-page">
        <div className="ud2-page-heading">
          <h2>My Wishlist</h2>
          <p>Items you have saved for later</p>
        </div>
        <div className="ud2-empty-page">
          <Heart size={60} />
          <h3>Your wishlist is empty</h3>
          <p>Save items you love by clicking the heart icon on any product.</p>
          <button onClick={() => navigatePage('shop')}>Discover Products</button>
        </div>
      </div>
    );
  }

  return (
    <div className="ud2-orders-page">
      <div className="ud2-page-heading">
        <h2>My Wishlist</h2>
        <p>{wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="ud2-wish-grid">
        {wishlist.map(product => {
          const discount = product.originalPrice
            ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
            : 0;

          return (
            <div className="ud2-wish-card" key={product.id}>
              <div className="ud2-wish-img">
                <img src={product.image} alt={product.name} />
                {discount > 0 && <span className="ud2-wish-disc">-{discount}%</span>}
                <button className="ud2-wish-del" onClick={() => toggleWishlist(product)}>
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="ud2-wish-body">
                <p className="ud2-wish-cat">{product.category}</p>
                <h4 className="ud2-wish-name">{product.name}</h4>
                <div className="ud2-wish-rating">
                  <Star size={12} fill="#f59e0b" color="#f59e0b" />
                  <span>{product.rating || '4.8'}</span>
                  <span className="ud2-wish-rev">({product.reviewsCount || 0})</span>
                </div>
                <div className="ud2-wish-price">
                  <span className="ud2-wish-cur">{settings?.currency || 'AED'} {Number(product.price).toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="ud2-wish-orig">{settings?.currency || 'AED'} {Number(product.originalPrice).toFixed(2)}</span>
                  )}
                </div>
                <button className="ud2-wish-add" onClick={() => addToCart(product)}>
                  <ShoppingBag size={14} />
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
