import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Heart, 
  User, 
  ShoppingCart, 
  ChevronDown, 
  Menu, 
  X,
  Flame,
  Home,
  Grid,
  Award,
  Truck,
  Sparkles,
  MessageCircle,
  ShieldCheck,
  ChevronRight,
  Sun,
  Moon,
  LogOut,
  Package,
  Gift,
  Settings,
  ShieldAlert
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { categories } from '../../data/categories';

export const Header = () => {
  const { 
    products,
    cartItemsCount, 
    wishlist, 
    setIsCartOpen, 
    setIsWishlistOpen, 
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    currentPage,
    navigatePage,
    setViewMode,
    settings,
    currentUser,
    logoutUser,
    theme,
    toggleTheme
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [mobileBrandsOpen, setMobileBrandsOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const userDropdownRef = useRef(null);

  // Close user dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Global Ctrl+K / Cmd+K search shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  // Extract unique active brands dynamically
  const uniqueBrands = useMemo(() => {
    const brandMap = new Map();
    products.forEach((p) => {
      if (p.brand && p.brand.trim() && p.isActive !== false) {
        const bName = p.brand.trim();
        brandMap.set(bName, (brandMap.get(bName) || 0) + 1);
      }
    });
    return Array.from(brandMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [products]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(true);
    }
  };

  const closeAllDropdowns = () => {
    setShopDropdownOpen(false);
    setCatDropdownOpen(false);
    setBrandDropdownOpen(false);
    setUserDropdownOpen(false);
  };

  const storeName = settings?.storeName || 'Zigzet';

  return (
    <header className="main-header">
      <div className="container header-container">
        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Toggle menu"
        >
          <Menu size={22} />
        </button>

        {/* Brand Logo */}
        <div 
          className="brand-logo" 
          onClick={() => { navigatePage('home'); closeAllDropdowns(); }}
          style={{ cursor: 'pointer' }}
        >
          <div className="brand-logo-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#7c3aed" />
              <path d="M2 17L12 22L22 17" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="#9333ea" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span>{storeName}</span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="nav-links">
          <span 
            className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => { navigatePage('home'); closeAllDropdowns(); }}
          >
            Home
          </span>

          {/* Shop Mega Dropdown */}
          <div 
            className={`nav-item dropdown-trigger ${currentPage === 'shop' ? 'active' : ''}`}
            onMouseEnter={() => setShopDropdownOpen(true)}
            onMouseLeave={() => setShopDropdownOpen(false)}
            onClick={() => { navigatePage('shop'); closeAllDropdowns(); }}
          >
            <span>Shop</span>
            <ChevronDown size={14} className={`nav-chevron ${shopDropdownOpen ? 'rotate' : ''}`} />

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
                    <span className="mega-link" onClick={() => { navigatePage('shop', 'all'); closeAllDropdowns(); }}>
                      All Products Catalog
                    </span>
                    <span className="mega-link" onClick={() => { navigatePage('deals'); closeAllDropdowns(); }}>
                      Flash Sale Deals & Sets
                    </span>
                    <span className="mega-link" onClick={() => { navigatePage('shop', 'sunscreen'); closeAllDropdowns(); }}>
                      Sun Care & SPF
                    </span>
                    <span className="mega-link" onClick={() => { navigatePage('shop', 'cleansers'); closeAllDropdowns(); }}>
                      Cleansers & Balms
                    </span>
                  </div>

                  <div className="mega-col">
                    <h5 className="mega-col-title">Skincare Routine</h5>
                    <span className="mega-link" onClick={() => { navigatePage('shop', 'serums'); closeAllDropdowns(); }}>
                      Serums & Ampoules
                    </span>
                    <span className="mega-link" onClick={() => { navigatePage('shop', 'moisturizers'); closeAllDropdowns(); }}>
                      Creams & Moisturizers
                    </span>
                    <span className="mega-link" onClick={() => { navigatePage('shop', 'masks'); closeAllDropdowns(); }}>
                      Cooling Masks & Pads
                    </span>
                    <span className="mega-link" onClick={() => { navigatePage('categories'); closeAllDropdowns(); }}>
                      View All Categories →
                    </span>
                  </div>

                  <div className="mega-col promo-col">
                    <div className="mega-promo-card">
                      <span className="mega-promo-badge">BEST DEAL</span>
                      <h4>Up to 45% Off K-Beauty Sets</h4>
                      <p>Experience authentic Korean skincare with fast delivery.</p>
                      <button 
                        className="mega-promo-btn"
                        onClick={() => { navigatePage('deals'); closeAllDropdowns(); }}
                      >
                        Shop Bundles
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
            onClick={() => { navigatePage('categories'); closeAllDropdowns(); }}
          >
            <span>Categories</span>
            <ChevronDown size={14} className={`nav-chevron ${catDropdownOpen ? 'rotate' : ''}`} />

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
                      closeAllDropdowns();
                    }}
                  >
                    <span>{cat.name}</span>
                    <span style={{ fontSize: '11px', color: '#9ca3af' }}>{cat.itemCount}</span>
                  </div>
                ))}
                <div 
                  className="simple-dropdown-item footer-item"
                  onClick={() => { navigatePage('categories'); closeAllDropdowns(); }}
                >
                  <strong>Explore All Departments →</strong>
                </div>
              </div>
            )}
          </div>

          {/* Brands Dropdown */}
          <div 
            className={`nav-item dropdown-trigger ${currentPage === 'brands' ? 'active' : ''}`}
            onMouseEnter={() => setBrandDropdownOpen(true)}
            onMouseLeave={() => setBrandDropdownOpen(false)}
            onClick={() => { navigatePage('brands'); closeAllDropdowns(); }}
          >
            <span>Brands</span>
            <ChevronDown size={14} className={`nav-chevron ${brandDropdownOpen ? 'rotate' : ''}`} />

            {brandDropdownOpen && (
              <div 
                className="simple-dropdown-menu" 
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => setBrandDropdownOpen(true)}
                onMouseLeave={() => setBrandDropdownOpen(false)}
                style={{ minWidth: '240px' }}
              >
                <div style={{ padding: '8px 14px 6px 14px', borderBottom: '1px solid var(--color-border-light, #f1f5f9)', fontSize: '11px', fontWeight: '800', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Official Brands
                </div>
                {uniqueBrands.map((b) => (
                  <div
                    key={b.name}
                    className="simple-dropdown-item"
                    onClick={() => {
                      navigatePage('shop', 'all', b.name);
                      closeAllDropdowns();
                    }}
                  >
                    <span style={{ fontWeight: '600' }}>{b.name}</span>
                    <span style={{ fontSize: '11px', color: '#7c3aed', background: 'var(--color-surface-subtle, #f5f3ff)', padding: '1px 6px', borderRadius: '8px', fontWeight: '700' }}>
                      {b.count}
                    </span>
                  </div>
                ))}
                <div 
                  className="simple-dropdown-item footer-item"
                  onClick={() => { navigatePage('brands'); closeAllDropdowns(); }}
                >
                  <strong>All Brands Directory →</strong>
                </div>
              </div>
            )}
          </div>

          {/* Flash Deals */}
          <span 
            className={`nav-item ${currentPage === 'deals' ? 'active' : ''}`}
            onClick={() => { navigatePage('deals'); closeAllDropdowns(); }}
            style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ea580c' }}
          >
            <Flame size={14} />
            <span>Deals</span>
          </span>

          {/* Track Order */}
          <span 
            className={`nav-item ${currentPage === 'track' ? 'active' : ''}`}
            onClick={() => { navigatePage('track'); closeAllDropdowns(); }}
          >
            Track Order
          </span>

          {/* About */}
          <span 
            className={`nav-item ${currentPage === 'about' ? 'active' : ''}`}
            onClick={() => { navigatePage('about'); closeAllDropdowns(); }}
          >
            About
          </span>

          {/* Contact */}
          <span 
            className={`nav-item ${currentPage === 'contact' ? 'active' : ''}`}
            onClick={() => { navigatePage('contact'); closeAllDropdowns(); }}
          >
            Contact
          </span>
        </nav>

        {/* Search Bar */}
        <div className="header-search">
          <form onSubmit={handleSearchSubmit} className="search-input-box" onClick={() => setIsSearchOpen(true)}>
            <Search size={16} color="var(--color-text-light, #9ca3af)" />
            <input 
              type="text" 
              placeholder="Search products, brands, ingredients..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              readOnly
            />
            <kbd className="search-shortcut-badge">⌘K</kbd>
          </form>
        </div>

        {/* Header Actions */}
        <div className="header-actions">
          {/* Theme Toggle Button */}
          <button 
            className="action-icon-btn theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>

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

          {/* User Account Button with Dropdown Popover */}
          <div className="user-account-wrapper" ref={userDropdownRef}>
            <button 
              className="action-icon-btn user-account-btn" 
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              aria-label="My Account"
              title={currentUser ? `${currentUser.name}'s Account` : 'Sign In'}
              style={{ position: 'relative' }}
            >
              {currentUser?.avatar ? (
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }}
                />
              ) : (
                <User size={20} />
              )}
              {currentUser && (
                <span className="user-online-indicator" />
              )}
            </button>

            {/* User Popover Menu */}
            {userDropdownOpen && (
              <div className="user-popover-menu">
                {currentUser ? (
                  <>
                    <div className="user-popover-header">
                      <div className="user-popover-avatar">
                        {currentUser.name ? currentUser.name.charAt(0) : 'U'}
                      </div>
                      <div className="user-popover-info">
                        <strong>{currentUser.name}</strong>
                        <span>{currentUser.email}</span>
                      </div>
                    </div>

                    <div className="user-popover-divider" />

                    <div className="user-popover-links">
                      <button 
                        className="user-popover-item"
                        onClick={() => { navigatePage('user-dashboard'); closeAllDropdowns(); }}
                      >
                        <User size={15} />
                        <span>Account Overview</span>
                      </button>

                      <button 
                        className="user-popover-item"
                        onClick={() => { navigatePage('user-dashboard'); closeAllDropdowns(); }}
                      >
                        <Package size={15} />
                        <span>My Orders</span>
                      </button>

                      <button 
                        className="user-popover-item"
                        onClick={() => { setIsWishlistOpen(true); closeAllDropdowns(); }}
                      >
                        <Heart size={15} />
                        <span>Saved Wishlist ({wishlist.length})</span>
                      </button>

                      <button 
                        className="user-popover-item"
                        onClick={() => { navigatePage('user-dashboard'); closeAllDropdowns(); }}
                      >
                        <Gift size={15} />
                        <span>Loyalty Points</span>
                      </button>
                    </div>

                    <div className="user-popover-divider" />

                    <button 
                      className="user-popover-logout"
                      onClick={() => { logoutUser(); closeAllDropdowns(); }}
                    >
                      <LogOut size={14} />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <div className="user-popover-guest">
                    <h4>Welcome to {storeName}</h4>
                    <p>Sign in to access your orders, saved addresses and exclusive member rewards.</p>
                    <button 
                      className="user-popover-signin-btn"
                      onClick={() => { navigatePage('user-login'); closeAllDropdowns(); }}
                    >
                      Sign In / Register
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Shopping Cart Button */}
          <button 
            className="action-icon-btn cart-btn" 
            onClick={() => setIsCartOpen(true)}
            aria-label="Shopping Cart"
            title="View Bag"
          >
            <ShoppingCart size={20} />
            <span className="action-badge">{cartItemsCount}</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          Mobile Navigation Slide-over Drawer (Fixed overlay & native app drawer)
          ========================================================================= */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
            {/* Drawer Header */}
            <div className="mobile-drawer-header">
              <div className="brand-logo">
                <div className="brand-logo-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#7c3aed" />
                    <path d="M2 17L12 22L22 17" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 12L12 17L22 12" stroke="#9333ea" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span>{storeName}</span>
              </div>
              <button 
                className="mobile-drawer-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Quick Search Inside Drawer */}
            <div className="mobile-drawer-search">
              <form onSubmit={handleSearchSubmit} className="search-input-box" onClick={() => { setMobileMenuOpen(false); setIsSearchOpen(true); }}>
                <Search size={16} color="var(--color-text-light, #9ca3af)" />
                <input 
                  type="text" 
                  placeholder="Search products in Zigzet..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  readOnly
                />
              </form>
            </div>

            {/* Mobile User Profile Bar */}
            <div className="mobile-drawer-user-card" onClick={() => { navigatePage(currentUser ? 'user-dashboard' : 'user-login'); setMobileMenuOpen(false); }}>
              <div className="mobile-user-avatar">
                {currentUser?.name ? currentUser.name.charAt(0) : <User size={18} />}
              </div>
              <div className="mobile-user-details">
                <strong>{currentUser ? currentUser.name : 'Sign In / Register'}</strong>
                <span>{currentUser ? currentUser.email : 'Earn loyalty points on every order'}</span>
              </div>
              <ChevronRight size={16} color="#9ca3af" />
            </div>

            {/* Drawer Scrollable Links */}
            <div className="mobile-drawer-body">
              <div className="mobile-nav-section-title">Navigation</div>
              <div className="mobile-nav-links">
                <button 
                  className={`mobile-drawer-nav-item ${currentPage === 'home' ? 'active' : ''}`}
                  onClick={() => { navigatePage('home'); setMobileMenuOpen(false); }}
                >
                  <Home size={18} />
                  <span>Home</span>
                  <ChevronRight size={15} className="drawer-nav-arrow" />
                </button>

                <button 
                  className={`mobile-drawer-nav-item ${currentPage === 'shop' ? 'active' : ''}`}
                  onClick={() => { navigatePage('shop'); setMobileMenuOpen(false); }}
                >
                  <ShoppingBag size={18} />
                  <span>Shop All Products</span>
                  <ChevronRight size={15} className="drawer-nav-arrow" />
                </button>

                <button 
                  className={`mobile-drawer-nav-item deals-link ${currentPage === 'deals' ? 'active' : ''}`}
                  onClick={() => { navigatePage('deals'); setMobileMenuOpen(false); }}
                >
                  <Flame size={18} color="#ea580c" />
                  <span>Flash Sale Deals</span>
                  <span className="mobile-deals-pill">Up to 45% OFF</span>
                  <ChevronRight size={15} className="drawer-nav-arrow" />
                </button>

                {/* Categories Accordion */}
                <div className="mobile-drawer-group">
                  <button 
                    className={`mobile-drawer-nav-item has-sub ${currentPage === 'categories' ? 'active' : ''}`}
                    onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                  >
                    <Grid size={18} />
                    <span>Categories</span>
                    <div className="mobile-drawer-group-right">
                      <span className="drawer-badge">{categories.length}</span>
                      <ChevronDown 
                        size={15} 
                        className={`drawer-chevron ${mobileCategoriesOpen ? 'rotate' : ''}`} 
                      />
                    </div>
                  </button>

                  {mobileCategoriesOpen && (
                    <div className="mobile-drawer-sublist">
                      <div 
                        className="mobile-drawer-subitem view-all"
                        onClick={() => { navigatePage('categories'); setMobileMenuOpen(false); }}
                      >
                        <span>✨ Browse All Departments</span>
                        <ChevronRight size={13} />
                      </div>
                      {categories.map((cat) => (
                        <div
                          key={cat.id}
                          className="mobile-drawer-subitem"
                          onClick={() => {
                            navigatePage('shop', cat.id);
                            setMobileMenuOpen(false);
                          }}
                        >
                          <span className="subitem-name">{cat.name}</span>
                          <span className="subitem-count">{cat.itemCount}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Brands Accordion */}
                <div className="mobile-drawer-group">
                  <button 
                    className={`mobile-drawer-nav-item has-sub ${currentPage === 'brands' ? 'active' : ''}`}
                    onClick={() => setMobileBrandsOpen(!mobileBrandsOpen)}
                  >
                    <Award size={18} />
                    <span>Brands</span>
                    <div className="mobile-drawer-group-right">
                      <span className="drawer-badge">{uniqueBrands.length}</span>
                      <ChevronDown 
                        size={15} 
                        className={`drawer-chevron ${mobileBrandsOpen ? 'rotate' : ''}`} 
                      />
                    </div>
                  </button>

                  {mobileBrandsOpen && (
                    <div className="mobile-drawer-sublist">
                      <div 
                        className="mobile-drawer-subitem view-all"
                        onClick={() => { navigatePage('brands'); setMobileMenuOpen(false); }}
                      >
                        <span>✨ View Brand Directory</span>
                        <ChevronRight size={13} />
                      </div>
                      {uniqueBrands.map((b) => (
                        <div
                          key={b.name}
                          className="mobile-drawer-subitem"
                          onClick={() => {
                            navigatePage('shop', 'all', b.name);
                            setMobileMenuOpen(false);
                          }}
                        >
                          <span className="subitem-name">{b.name}</span>
                          <span className="subitem-count">{b.count}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button 
                  className={`mobile-drawer-nav-item ${currentPage === 'track' ? 'active' : ''}`}
                  onClick={() => { navigatePage('track'); setMobileMenuOpen(false); }}
                >
                  <Truck size={18} />
                  <span>Track Order</span>
                  <ChevronRight size={15} className="drawer-nav-arrow" />
                </button>

                <button 
                  className={`mobile-drawer-nav-item ${currentPage === 'about' ? 'active' : ''}`}
                  onClick={() => { navigatePage('about'); setMobileMenuOpen(false); }}
                >
                  <Sparkles size={18} />
                  <span>About {storeName}</span>
                  <ChevronRight size={15} className="drawer-nav-arrow" />
                </button>

                <button 
                  className={`mobile-drawer-nav-item ${currentPage === 'contact' ? 'active' : ''}`}
                  onClick={() => { navigatePage('contact'); setMobileMenuOpen(false); }}
                >
                  <MessageCircle size={18} />
                  <span>Help & Contact Support</span>
                  <ChevronRight size={15} className="drawer-nav-arrow" />
                </button>
              </div>

              {/* Theme & Currency Controls inside drawer */}
              <div className="mobile-drawer-footer-actions">
                <div className="mobile-theme-row">
                  <span>Appearance</span>
                  <button 
                    className="mobile-theme-toggle-btn"
                    onClick={toggleTheme}
                  >
                    {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                    <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
