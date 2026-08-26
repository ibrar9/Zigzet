import React, { useState, useMemo } from 'react';
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
  ChevronRight
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
    currentUser
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [mobileBrandsOpen, setMobileBrandsOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);

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
          onClick={() => navigatePage('home')}
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
                      Flash Sale Deals & Sets
                    </span>
                    <span className="mega-link" onClick={() => { navigatePage('shop', 'sunscreen'); setShopDropdownOpen(false); }}>
                      Sun Care & SPF
                    </span>
                    <span className="mega-link" onClick={() => { navigatePage('shop', 'cleansers'); setShopDropdownOpen(false); }}>
                      Cleansers & Balms
                    </span>
                  </div>

                  <div className="mega-col">
                    <h5 className="mega-col-title">Skincare Routine</h5>
                    <span className="mega-link" onClick={() => { navigatePage('shop', 'serums'); setShopDropdownOpen(false); }}>
                      Serums & Ampoules
                    </span>
                    <span className="mega-link" onClick={() => { navigatePage('shop', 'moisturizers'); setShopDropdownOpen(false); }}>
                      Creams & Moisturizers
                    </span>
                    <span className="mega-link" onClick={() => { navigatePage('shop', 'masks'); setShopDropdownOpen(false); }}>
                      Cooling Masks & Pads
                    </span>
                    <span className="mega-link" onClick={() => { navigatePage('categories'); setShopDropdownOpen(false); }}>
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
                        onClick={() => { navigatePage('deals'); setShopDropdownOpen(false); }}
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

          {/* Brands Dropdown */}
          <div 
            className={`nav-item dropdown-trigger ${currentPage === 'brands' ? 'active' : ''}`}
            onMouseEnter={() => setBrandDropdownOpen(true)}
            onMouseLeave={() => setBrandDropdownOpen(false)}
            onClick={() => navigatePage('brands')}
          >
            <span>Brands</span>
            <ChevronDown size={14} />

            {brandDropdownOpen && (
              <div 
                className="simple-dropdown-menu" 
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => setBrandDropdownOpen(true)}
                onMouseLeave={() => setBrandDropdownOpen(false)}
                style={{ minWidth: '240px' }}
              >
                <div style={{ padding: '8px 14px 6px 14px', borderBottom: '1px solid #f1f5f9', fontSize: '11px', fontWeight: '800', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Official Brands
                </div>
                {uniqueBrands.map((b) => (
                  <div
                    key={b.name}
                    className="simple-dropdown-item"
                    onClick={() => {
                      navigatePage('shop', 'all', b.name);
                      setBrandDropdownOpen(false);
                    }}
                  >
                    <span style={{ fontWeight: '600' }}>{b.name}</span>
                    <span style={{ fontSize: '11px', color: '#7c3aed', background: '#f5f3ff', padding: '1px 6px', borderRadius: '8px', fontWeight: '700' }}>
                      {b.count}
                    </span>
                  </div>
                ))}
                <div 
                  className="simple-dropdown-item footer-item"
                  onClick={() => { navigatePage('brands'); setBrandDropdownOpen(false); }}
                >
                  <strong>All Brands Directory →</strong>
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

        {/* Header Actions */}
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

          {/* User Account Button */}
          <button 
            className="action-icon-btn user-account-btn" 
            onClick={() => navigatePage(currentUser ? 'user-dashboard' : 'user-login')}
            aria-label="My Account"
            title={currentUser ? `${currentUser.name}'s Account` : 'Sign In'}
            style={{ position: 'relative' }}
          >
            <User size={20} />
            {currentUser && (
              <span style={{
                position: 'absolute', top: '-3px', right: '-3px',
                width: '9px', height: '9px', borderRadius: '50%',
                background: '#22c55e', border: '2px solid var(--bg-primary, #0f0f0f)'
              }} />
            )}
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
                <Search size={16} color="#9ca3af" />
                <input 
                  type="text" 
                  placeholder="Search products in Zigzet..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
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
                  onClick={() => { navigatePage('shop', 'all'); setMobileMenuOpen(false); }}
                >
                  <ShoppingBag size={18} />
                  <span>All Products Catalog</span>
                  <ChevronRight size={15} className="drawer-nav-arrow" />
                </button>

                <button 
                  className={`mobile-drawer-nav-item ${currentPage === 'deals' ? 'active' : ''}`}
                  onClick={() => { navigatePage('deals'); setMobileMenuOpen(false); }}
                >
                  <Flame size={18} color="#ea580c" />
                  <span style={{ color: '#ea580c', fontWeight: '700' }}>Flash Deals & Offers</span>
                  <span className="mobile-deals-pill">HOT</span>
                </button>

                {/* Categories Accordion */}
                <div className="mobile-drawer-accordion-wrap">
                  <button 
                    className={`mobile-drawer-nav-item ${currentPage === 'categories' ? 'active' : ''}`}
                    onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                    style={{ justifyContent: 'space-between' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Grid size={18} />
                      <span>Categories</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="mobile-count-pill">{categories.length}</span>
                      <ChevronDown 
                        size={15} 
                        style={{ 
                          transition: 'transform 0.2s ease', 
                          transform: mobileCategoriesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          color: '#94a3b8' 
                        }} 
                      />
                    </div>
                  </button>

                  {mobileCategoriesOpen && (
                    <div className="mobile-drawer-sublist">
                      <div 
                        className="mobile-drawer-subitem view-all"
                        onClick={() => { navigatePage('categories'); setMobileMenuOpen(false); }}
                      >
                        <span>📁 All Categories Overview</span>
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
                <div className="mobile-drawer-accordion-wrap">
                  <button 
                    className={`mobile-drawer-nav-item ${currentPage === 'brands' ? 'active' : ''}`}
                    onClick={() => setMobileBrandsOpen(!mobileBrandsOpen)}
                    style={{ justifyContent: 'space-between' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Award size={18} color="#7c3aed" />
                      <span style={{ fontWeight: '700', color: '#7c3aed' }}>Official Brands</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="mobile-count-pill" style={{ background: '#7c3aed', color: '#fff', borderColor: '#7c3aed' }}>
                        {uniqueBrands.length}
                      </span>
                      <ChevronDown 
                        size={15} 
                        style={{ 
                          transition: 'transform 0.2s ease', 
                          transform: mobileBrandsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          color: '#7c3aed' 
                        }} 
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

              {/* Brands Quick Section */}
              {uniqueBrands.length > 0 && (
                <>
                  <div className="mobile-nav-section-title" style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Official Brands</span>
                    <span 
                      onClick={() => { navigatePage('brands'); setMobileMenuOpen(false); }}
                      style={{ fontSize: '11px', color: '#7c3aed', fontWeight: '700', cursor: 'pointer' }}
                    >
                      All ({uniqueBrands.length}) →
                    </span>
                  </div>
                  <div className="mobile-brand-chips">
                    {uniqueBrands.map((b) => (
                      <button
                        key={b.name}
                        className="mobile-brand-chip"
                        onClick={() => {
                          navigatePage('shop', 'all', b.name);
                          setMobileMenuOpen(false);
                        }}
                      >
                        <Award size={12} color="#7c3aed" />
                        <span>{b.name}</span>
                        <span className="brand-chip-qty">{b.count}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Categories Quick Section */}
              <div className="mobile-nav-section-title" style={{ marginTop: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Popular Categories</span>
                <span 
                  onClick={() => { navigatePage('categories'); setMobileMenuOpen(false); }}
                  style={{ fontSize: '11px', color: '#7c3aed', fontWeight: '700', cursor: 'pointer' }}
                >
                  All ({categories.length}) →
                </span>
              </div>
              <div className="mobile-category-chips">
                {categories.slice(0, 8).map((cat) => (
                  <button
                    key={cat.id}
                    className="mobile-cat-chip"
                    onClick={() => {
                      navigatePage('shop', cat.id);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
