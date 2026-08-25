import React from 'react';
import { 
  Home, 
  ShoppingBag, 
  Heart, 
  Compass, 
  Truck, 
  User
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const MobileNavBar = () => {
  const { 
    currentPage, 
    navigatePage, 
    cartItemsCount, 
    setIsCartOpen, 
    wishlist, 
    setIsWishlistOpen,
    viewMode
  } = useStore();

  // If in admin mode, hide customer storefront mobile bottom bar
  if (viewMode === 'admin') return null;

  return (
    <nav className="mobile-native-bottom-bar" aria-label="Mobile Navigation">
      {/* Home */}
      <button
        className={`mobile-nav-item ${currentPage === 'home' ? 'active' : ''}`}
        onClick={() => navigatePage('home')}
      >
        <Home size={20} />
        <span>Home</span>
      </button>

      {/* Shop */}
      <button
        className={`mobile-nav-item ${currentPage === 'shop' ? 'active' : ''}`}
        onClick={() => navigatePage('shop')}
      >
        <Compass size={20} />
        <span>Explore</span>
      </button>

      {/* Cart with Live Count */}
      <button
        className="mobile-nav-item"
        onClick={() => setIsCartOpen(true)}
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <ShoppingBag size={20} />
          {cartItemsCount > 0 && (
            <span className="mobile-nav-badge">{cartItemsCount}</span>
          )}
        </div>
        <span>Bag</span>
      </button>

      {/* Wishlist with Count */}
      <button
        className="mobile-nav-item"
        onClick={() => setIsWishlistOpen(true)}
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Heart size={20} />
          {wishlist.length > 0 && (
            <span className="mobile-nav-badge">{wishlist.length}</span>
          )}
        </div>
        <span>Saved</span>
      </button>

      {/* Track Order */}
      <button
        className={`mobile-nav-item ${currentPage === 'track-order' ? 'active' : ''}`}
        onClick={() => navigatePage('track-order')}
      >
        <Truck size={20} />
        <span>Track</span>
      </button>
    </nav>
  );
};
