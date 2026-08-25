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
    viewMode,
    currentUser
  } = useStore();

  // If in admin mode or full-screen dashboard/login mode, hide storefront bottom bar
  if (viewMode === 'admin' || currentPage === 'user-dashboard' || currentPage === 'user-login') {
    return null;
  }

  const isAccountActive = currentPage === 'user-dashboard' || currentPage === 'user-login';

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

      {/* User Account / Profile */}
      <button
        className={`mobile-nav-item ${isAccountActive ? 'active' : ''}`}
        onClick={() => navigatePage(currentUser ? 'user-dashboard' : 'user-login')}
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <User size={20} />
          {currentUser && (
            <span style={{
              position: 'absolute',
              top: '-1px',
              right: '-1px',
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#10b981'
            }} />
          )}
        </div>
        <span>{currentUser ? 'Account' : 'Sign In'}</span>
      </button>
    </nav>
  );
};
