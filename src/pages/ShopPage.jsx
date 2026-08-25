import React, { useState, useMemo, useEffect } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  Grid3X3, 
  List, 
  RotateCcw, 
  Star, 
  Check, 
  Search,
  Tag,
  Sparkles,
  X
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { categories } from '../data/categories';
import { ProductCard } from '../components/common/ProductCard';
import { CustomDropdown } from '../components/common/CustomDropdown';

export const ShopPage = () => {
  const { 
    products, 
    activeCategory, 
    setActiveCategory, 
    searchQuery, 
    setSearchQuery 
  } = useStore();

  const [selectedCategories, setSelectedCategories] = useState(
    activeCategory !== 'all' ? [activeCategory] : []
  );
  const [priceRange, setPriceRange] = useState(500);
  const [minRating, setMinRating] = useState(0);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlySale, setOnlySale] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [viewLayout, setViewLayout] = useState('grid'); // 'grid' | 'list'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync activeCategory from store if changed externally
  useEffect(() => {
    if (activeCategory !== 'all') {
      setSelectedCategories([activeCategory]);
    }
  }, [activeCategory]);

  // Lock body scroll when mobile filter is open
  useEffect(() => {
    if (mobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileFilterOpen]);

  // Handle category checkbox
  const toggleCategory = (catId) => {
    if (selectedCategories.includes(catId)) {
      const next = selectedCategories.filter((c) => c !== catId);
      setSelectedCategories(next);
      setActiveCategory(next.length === 1 ? next[0] : 'all');
    } else {
      const next = [...selectedCategories, catId];
      setSelectedCategories(next);
      setActiveCategory(next.length === 1 ? next[0] : 'all');
    }
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setActiveCategory('all');
    setPriceRange(500);
    setMinRating(0);
    setOnlyInStock(false);
    setOnlySale(false);
    setSearchQuery('');
  };

  // Active filter count
  const activeFilterCount = (selectedCategories.length > 0 ? selectedCategories.length : 0) +
    (priceRange < 500 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (onlyInStock ? 1 : 0) +
    (onlySale ? 1 : 0) +
    (searchQuery.trim() !== '' ? 1 : 0);

  // Filter & Sort computation
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Inactive check
      if (prod.isActive === false) {
        return false;
      }
      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(prod.category)) {
        return false;
      }
      // Price filter
      if (Number(prod.price) > priceRange) {
        return false;
      }
      // Rating filter
      if (minRating > 0 && (prod.rating || 5) < minRating) {
        return false;
      }
      // In stock filter
      if (onlyInStock && (!prod.stock || prod.stock <= 0)) {
        return false;
      }
      // Sale filter
      if (onlySale && !prod.isSale) {
        return false;
      }
      // Search filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matches = prod.name.toLowerCase().includes(q) ||
          prod.categoryName.toLowerCase().includes(q) ||
          (prod.description && prod.description.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return Number(a.price) - Number(b.price);
      if (sortBy === 'price-desc') return Number(b.price) - Number(a.price);
      if (sortBy === 'rating') return (b.rating || 5) - (a.rating || 5);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // featured default
    });
  }, [products, selectedCategories, priceRange, minRating, onlyInStock, onlySale, searchQuery, sortBy]);

  return (
    <div className="shop-page-wrapper">
      {/* Header Banner */}
      <div className="shop-header-banner">
        <div className="container">
          <div style={{ maxWidth: '600px' }}>
            <span style={{ fontSize: '12.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6b7280' }}>
              Explore Everything
            </span>
            <h1 style={{ fontSize: '36px', fontWeight: '800', marginTop: '4px', marginBottom: '8px' }}>
              All Products Catalog
            </h1>
            <p style={{ color: '#4b5563', fontSize: '14.5px' }}>
              Browse our complete USA collection of electronics, fashion, home essentials, beauty, and more.
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '24px 20px 60px 20px' }}>
        <div className="shop-main-layout">
          {/* Mobile backdrop */}
          {mobileFilterOpen && (
            <div 
              className="shop-sidebar-backdrop" 
              onClick={() => setMobileFilterOpen(false)}
            />
          )}

          {/* Left Sidebar Filters (Desktop Sticky Sidebar / Mobile Off-Canvas Drawer) */}
          <aside className={`shop-sidebar ${mobileFilterOpen ? 'mobile-open' : ''}`}>
            <div className="sidebar-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', fontSize: '16px' }}>
                <SlidersHorizontal size={18} />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="sidebar-active-count">({activeFilterCount})</span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {activeFilterCount > 0 && (
                  <button 
                    onClick={handleResetFilters}
                    className="sidebar-reset-btn"
                  >
                    <RotateCcw size={12} />
                    <span>Reset</span>
                  </button>
                )}
                <button 
                  className="sidebar-close-btn"
                  onClick={() => setMobileFilterOpen(false)}
                  aria-label="Close Filters"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="sidebar-body-scroll">
              {/* Category Filter */}
              <div className="filter-group">
                <h4 className="filter-title">Categories</h4>
                <div className="filter-checkbox-list">
                  {categories.map((cat) => (
                    <label key={cat.id} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.id)}
                        onChange={() => toggleCategory(cat.id)}
                      />
                      <span className="checkbox-custom" />
                      <span className="label-text">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Slider */}
              <div className="filter-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h4 className="filter-title" style={{ margin: 0 }}>Max Price</h4>
                  <span style={{ fontSize: '14px', fontWeight: '800', color: '#111827' }}>
                    ${priceRange}
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#111827' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#9ca3af', marginTop: '4px' }}>
                  <span>$20</span>
                  <span>$250</span>
                  <span>$500+</span>
                </div>
              </div>

              {/* Star Rating Filter */}
              <div className="filter-group">
                <h4 className="filter-title">Customer Rating</h4>
                <div className="filter-radio-list">
                  {[
                    { label: 'All Ratings', value: 0 },
                    { label: '4.5 Stars & Above', value: 4.5 },
                    { label: '4.0 Stars & Above', value: 4.0 },
                    { label: '3.5 Stars & Above', value: 3.5 }
                  ].map((r) => (
                    <label key={r.value} className="radio-item" onClick={() => setMinRating(r.value)}>
                      <span className={`radio-dot ${minRating === r.value ? 'selected' : ''}`} />
                      <span style={{ fontSize: '13px', color: minRating === r.value ? '#111827' : '#4b5563', fontWeight: minRating === r.value ? '600' : '400' }}>
                        {r.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Special Badges Filter */}
              <div className="filter-group">
                <h4 className="filter-title">Preferences</h4>
                <div className="filter-checkbox-list">
                  <label className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={onlyInStock}
                      onChange={(e) => setOnlyInStock(e.target.checked)}
                    />
                    <span className="checkbox-custom" />
                    <span className="label-text">In Stock Only</span>
                  </label>

                  <label className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={onlySale}
                      onChange={(e) => setOnlySale(e.target.checked)}
                    />
                    <span className="checkbox-custom" />
                    <span className="label-text">On Sale / Discounted</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Mobile Footer with Apply button */}
            <div className="sidebar-mobile-footer">
              <button 
                className="sidebar-mobile-reset-btn"
                onClick={handleResetFilters}
              >
                Clear All
              </button>
              <button 
                className="sidebar-mobile-apply-btn"
                onClick={() => setMobileFilterOpen(false)}
              >
                Show {filteredProducts.length} Results
              </button>
            </div>
          </aside>

          {/* Right Column: Catalog Grid */}
          <main className="shop-content">
            {/* Top Toolbar */}
            <div className="shop-toolbar">
              {/* Mobile Filter Toggle Button */}
              <button
                className={`mobile-filter-trigger-btn ${activeFilterCount > 0 ? 'has-active' : ''}`}
                onClick={() => setMobileFilterOpen(true)}
                aria-label="Open Filter Options"
              >
                <SlidersHorizontal size={15} />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="mobile-filter-count-badge">{activeFilterCount}</span>
                )}
              </button>

              <div className="shop-product-count" style={{ fontSize: '13.5px', color: '#6b7280' }}>
                Showing <strong>{filteredProducts.length}</strong> of {products.length} products
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Sort Dropdown */}
                <CustomDropdown
                  options={[
                    { value: 'featured', label: 'Featured Deals' },
                    { value: 'price-asc', label: 'Price: Low to High' },
                    { value: 'price-desc', label: 'Price: High to Low' },
                    { value: 'rating', label: 'Highest Rated' },
                    { value: 'name', label: 'Product Name (A-Z)' }
                  ]}
                  value={sortBy}
                  onChange={(val) => setSortBy(val)}
                  minWidth="160px"
                  align="right"
                />

                {/* View Mode Switcher */}
                <div className="layout-switchers">
                  <button
                    className={`layout-btn ${viewLayout === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewLayout('grid')}
                    title="Grid View"
                  >
                    <Grid3X3 size={16} />
                  </button>
                  <button
                    className={`layout-btn ${viewLayout === 'list' ? 'active' : ''}`}
                    onClick={() => setViewLayout('list')}
                    title="List View"
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filter Chips */}
            {activeFilterCount > 0 && (
              <div className="active-filters-chips-bar">
                <span className="active-filters-label">Active:</span>
                {selectedCategories.map((catId) => {
                  const catObj = categories.find((c) => c.id === catId);
                  return (
                    <span key={catId} className="filter-chip">
                      {catObj?.name || catId}
                      <button onClick={() => toggleCategory(catId)} aria-label="Remove filter">
                        <X size={11} />
                      </button>
                    </span>
                  );
                })}
                {priceRange < 500 && (
                  <span className="filter-chip">
                    Under ${priceRange}
                    <button onClick={() => setPriceRange(500)} aria-label="Remove price filter">
                      <X size={11} />
                    </button>
                  </span>
                )}
                {minRating > 0 && (
                  <span className="filter-chip">
                    {minRating}+ Stars
                    <button onClick={() => setMinRating(0)} aria-label="Remove rating filter">
                      <X size={11} />
                    </button>
                  </span>
                )}
                {onlyInStock && (
                  <span className="filter-chip">
                    In Stock
                    <button onClick={() => setOnlyInStock(false)} aria-label="Remove in stock filter">
                      <X size={11} />
                    </button>
                  </span>
                )}
                {onlySale && (
                  <span className="filter-chip">
                    On Sale
                    <button onClick={() => setOnlySale(false)} aria-label="Remove sale filter">
                      <X size={11} />
                    </button>
                  </span>
                )}
                {searchQuery.trim() !== '' && (
                  <span className="filter-chip">
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} aria-label="Remove search filter">
                      <X size={11} />
                    </button>
                  </span>
                )}
                <button className="clear-all-chips-btn" onClick={handleResetFilters}>
                  Clear All
                </button>
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="empty-catalog-state">
                <Search size={48} color="#9ca3af" />
                <h3>No products match your criteria</h3>
                <p>Try resetting filters or adjusting your price and category options.</p>
                <button className="hero-cta-btn" onClick={handleResetFilters} style={{ marginTop: '16px' }}>
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className={`products-grid ${viewLayout === 'list' ? 'products-list-layout' : ''}`}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
