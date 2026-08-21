import React from 'react';
import { Home, ShoppingBag, Grid, Heart, Tag } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const MobileNav = () => {
  const { 
    currentPage,
    navigatePage,
    cartItemsCount, 
    wishlist, 
    setIsCartOpen, 
    setIsWishlistOpen
  } = useStore();

  return (
    <nav className="mobile-bottom-nav">
      <div className="mobile-nav-items">
        <button 
          className={`mobile-nav-btn ${currentPage === 'home' ? 'active' : ''}`}
          onClick={() => navigatePage('home')}
        >
          <Home size={20} />
          <span>Home</span>
        </button>

        <button 
          className={`mobile-nav-btn ${currentPage === 'shop' ? 'active' : ''}`}
          onClick={() => navigatePage('shop')}
        >
          <ShoppingBag size={20} />
          <span>Shop</span>
        </button>

        <button 
          className={`mobile-nav-btn ${currentPage === 'categories' ? 'active' : ''}`}
          onClick={() => navigatePage('categories')}
        >
          <Grid size={20} />
          <span>Categories</span>
        </button>

        <button 
          className={`mobile-nav-btn ${currentPage === 'deals' ? 'active' : ''}`}
          onClick={() => navigatePage('deals')}
        >
          <Tag size={20} />
          <span>Deals</span>
        </button>

        <button 
          className="mobile-nav-btn"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingBag size={20} />
          {cartItemsCount > 0 && (
            <span className="action-badge">{cartItemsCount}</span>
          )}
          <span>Bag</span>
        </button>
      </div>
    </nav>
  );
};
