import React from 'react';
import { Home, Grid, Heart, ShoppingBag, UserCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const MobileNav = () => {
  const { 
    viewMode, 
    setViewMode, 
    cartItemsCount, 
    wishlist, 
    setIsCartOpen, 
    setIsWishlistOpen,
    setActiveCategory 
  } = useStore();

  return (
    <nav className="mobile-bottom-nav">
      <div className="mobile-nav-items">
        <button 
          className={`mobile-nav-btn ${viewMode === 'store' ? 'active' : ''}`}
          onClick={() => { setActiveCategory('all'); setViewMode('store'); }}
        >
          <Home size={20} />
          <span>Home</span>
        </button>

        <button 
          className="mobile-nav-btn"
          onClick={() => {
            setViewMode('store');
            const catElem = document.getElementById('shop-by-category');
            if (catElem) catElem.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <Grid size={20} />
          <span>Categories</span>
        </button>

        <button 
          className="mobile-nav-btn"
          onClick={() => setIsWishlistOpen(true)}
        >
          <Heart size={20} />
          {wishlist.length > 0 && <span className="action-badge">{wishlist.length}</span>}
          <span>Wishlist</span>
        </button>

        <button 
          className="mobile-nav-btn"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingBag size={20} />
          <span className="action-badge">{cartItemsCount}</span>
          <span>Cart</span>
        </button>

        <button 
          className={`mobile-nav-btn ${viewMode === 'admin' ? 'active' : ''}`}
          onClick={() => setViewMode(viewMode === 'admin' ? 'store' : 'admin')}
        >
          <UserCheck size={20} />
          <span>Admin</span>
        </button>
      </div>
    </nav>
  );
};
