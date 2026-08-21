import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Heart, 
  User, 
  ShoppingCart, 
  ChevronDown, 
  Menu, 
  X,
  Flame
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { categories } from '../../data/categories';

export const Header = () => {
  const { 
    cartItemsCount, 
    wishlist, 
    setIsCartOpen, 
    setIsWishlistOpen, 
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    currentPage,
    navigatePage,
    setViewMode
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(true);
    }
  };

  return (
    <header className="main-header">
      <div className="container header-container">
        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Brand Logo */}
        <div 
          className="brand-logo" 
          onClick={() => navigatePage('home')}
          style={{ cursor: 'pointer' }}
        >
          <ShoppingBag size={26} strokeWidth={2.3} />
          <span>ShopNest</span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="nav-links">
          <span 
            className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => navigatePage('home')}
          >
            Home
          </span>

          {/* Shop Mega Dropdown */}
          <div 
            className={`nav-item dropdown-trigger ${currentPage === 'shop' ? 'active' : ''}`}
            onMouseEnter={() => setShopDropdownOpen(true)}
            onMouseLeave={() => setShopDropdownOpen(false)}
            onClick={() => navigatePage('shop')}
          >
            <span>Shop</span>
            <ChevronDown size={14} />

            {/* Dropdown Menu */}
            {shopDropdownOpen && (
              <div 
                className="mega-menu-dropdown" 
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => setShopDropdownOpen(true)}
                onMouseLeave={() => setShopDropdownOpen(false)}
              >
                <div className="mega-menu-grid">
                  <div className="mega-col">
                    <h5 className="mega-col-title">Collections</h5>
                    <span className="mega-link" onClick={() => { navigatePage('shop', 'all'); setShopDropdownOpen(false); }}>
                      All Products Catalog
                    </span>
                    <span className="mega-link" onClick={() => { navigatePage('deals'); setShopDropdownOpen(false); }}>
                      🔥 Flash Sale Deals
                    </span>
                    <span className="mega-link" onClick={() => { navigatePage('shop', 'electronics'); setShopDropdownOpen(false); }}>
                      ⚡ Tech & Gadgets
                    </span>
                    <span className="mega-link" onClick={() => { navigatePage('shop', 'fashion'); setShopDropdownOpen(false); }}>
                      👕 Modern Fashion
                    </span>
                  </div>

                  <div className="mega-col">
                    <h5 className="mega-col-title">Departments</h5>
                    <span className="mega-link" onClick={() => { navigatePage('shop', 'home-living'); setShopDropdownOpen(false); }}>
                      🛋️ Home & Living
                    </span>
                    <span className="mega-link" onClick={() => { navigatePage('shop', 'beauty'); setShopDropdownOpen(false); }}>
                      ✨ Beauty & Wellness
                    </span>
                    <span className="mega-link" onClick={() => { navigatePage('shop', 'sports'); setShopDropdownOpen(false); }}>
                      🏀 Sports & Fitness
                    </span>
                    <span className="mega-link" onClick={() => { navigatePage('categories'); setShopDropdownOpen(false); }}>
                      View All 8 Categories →
                    </span>
                  </div>

                  <div className="mega-col promo-col">
                    <div className="mega-promo-card">
                      <span className="mega-promo-badge">HOT DEAL</span>
                      <h4>Up to 40% Off Noise Cancelling</h4>
                      <p>Experience studio acoustics with fast USA shipping.</p>
                      <button 
                        onClick={() => { navigatePage('deals'); setShopDropdownOpen(false); }}
                        className="mega-promo-btn"
                      >
                        Claim Offer →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Categories Dropdown */}
          <div 
            className={`nav-item dropdown-trigger ${currentPage === 'categories' ? 'active' : ''}`}
            onMouseEnter={() => setCatDropdownOpen(true)}
            onMouseLeave={() => setCatDropdownOpen(false)}
            onClick={() => navigatePage('categories')}
          >
            <span>Categories</span>
            <ChevronDown size={14} />

            {catDropdownOpen && (
              <div 
                className="simple-dropdown-menu"
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => setCatDropdownOpen(true)}
                onMouseLeave={() => setCatDropdownOpen(false)}
              >
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="simple-dropdown-item"
                    onClick={() => {
                      navigatePage('shop', cat.id);
                      setCatDropdownOpen(false);
                    }}
                  >
                    <span>{cat.name}</span>
                    <span style={{ fontSize: '11px', color: '#9ca3af' }}>{cat.itemCount}</span>
                  </div>
                ))}
                <div 
                  className="simple-dropdown-item footer-item"
                  onClick={() => { navigatePage('categories'); setCatDropdownOpen(false); }}
                >
                  <strong>Explore All Departments →</strong>
                </div>
              </div>
            )}
          </div>

          {/* Flash Deals */}
          <span 
            className={`nav-item ${currentPage === 'deals' ? 'active' : ''}`}
            onClick={() => navigatePage('deals')}
            style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ea580c' }}
          >
            <Flame size={14} />
            <span>Deals</span>
          </span>

          {/* Track Order */}
          <span 
            className={`nav-item ${currentPage === 'track' ? 'active' : ''}`}
            onClick={() => navigatePage('track')}
          >
            Track Order
          </span>

          {/* About */}
          <span 
            className={`nav-item ${currentPage === 'about' ? 'active' : ''}`}
            onClick={() => navigatePage('about')}
          >
            About
          </span>

          {/* Contact */}
          <span 
            className={`nav-item ${currentPage === 'contact' ? 'active' : ''}`}
            onClick={() => navigatePage('contact')}
          >
            Contact
          </span>
        </nav>

        {/* Search Bar */}
        <div className="header-search">
          <form onSubmit={handleSearchSubmit} className="search-input-box" onClick={() => setIsSearchOpen(true)}>
            <Search size={16} color="#9ca3af" />
            <input 
              type="text" 
              placeholder="Search for products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        {/* Header Actions matching exact screenshot */}
        <div className="header-actions">
          {/* Wishlist Button */}
          <button 
            className="action-icon-btn" 
            onClick={() => setIsWishlistOpen(true)}
            aria-label="Wishlist"
            title="View Wishlist"
          >
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span className="action-badge">{wishlist.length}</span>
            )}
          </button>

          {/* Account Profile Button */}
          <button 
            className="action-icon-btn" 
            onClick={() => {
              window.location.hash = '#admin';
              setViewMode('admin');
            }}
            aria-label="Account Login"
            title="My Account / Admin Login"
          >
            <User size={20} />
          </button>

          {/* Shopping Cart Button */}
          <button 
            className="action-icon-btn" 
            onClick={() => setIsCartOpen(true)}
            aria-label="Shopping Cart"
            title="View Bag"
          >
            <ShoppingCart size={20} />
            <span className="action-badge">{cartItemsCount}</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
              <div className="brand-logo">
                <ShoppingBag size={22} />
                <span>ShopNest</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="mobile-nav-links">
              <span className="mobile-nav-link" onClick={() => { navigatePage('home'); setMobileMenuOpen(false); }}>
                🏠 Home
              </span>
              <span className="mobile-nav-link" onClick={() => { navigatePage('shop', 'all'); setMobileMenuOpen(false); }}>
                🛍️ All Products Catalog
              </span>
              <span className="mobile-nav-link" onClick={() => { navigatePage('categories'); setMobileMenuOpen(false); }}>
                🗂️ Categories & Departments
              </span>
              <span className="mobile-nav-link" onClick={() => { navigatePage('deals'); setMobileMenuOpen(false); }}>
                🔥 Flash Deals & Discounts
              </span>
              <span className="mobile-nav-link" onClick={() => { navigatePage('track'); setMobileMenuOpen(false); }}>
                🚚 Track Order Status
              </span>
              <span className="mobile-nav-link" onClick={() => { navigatePage('about'); setMobileMenuOpen(false); }}>
                ✨ About ShopNest
              </span>
              <span className="mobile-nav-link" onClick={() => { navigatePage('contact'); setMobileMenuOpen(false); }}>
                💬 Contact & FAQs
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
