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
  X,
  Award,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { categories } from '../data/categories';
import { ProductCard } from '../components/common/ProductCard';
import { CustomDropdown } from '../components/common/CustomDropdown';
import { ProductGridSkeleton } from '../components/common/Skeleton';

export const ShopPage = () => {
  const { 
    products, 
    activeCategory, 
    setActiveCategory, 
    activeBrand,
    setActiveBrand,
    searchQuery, 
    setSearchQuery,
    settings
  } = useStore();

  const [selectedCategories, setSelectedCategories] = useState(
    activeCategory !== 'all' ? [activeCategory] : []
  );
  const [selectedBrands, setSelectedBrands] = useState(
    activeBrand !== 'all' ? [activeBrand] : []
  );
  const [brandSearchTerm, setBrandSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState(500);
  const [minRating, setMinRating] = useState(0);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlySale, setOnlySale] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [viewLayout, setViewLayout] = useState('grid'); // 'grid' | 'list'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  const curr = settings?.currency || 'AED';

  // Extract all available brands dynamically with product count
  const allBrands = useMemo(() => {
    const brandMap = new Map();
    products.forEach((p) => {
      if (p.brand && p.brand.trim() && p.isActive !== false) {
        const b = p.brand.trim();
        brandMap.set(b, (brandMap.get(b) || 0) + 1);
      }
    });
    return Array.from(brandMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [products]);

  // Filter brands by search term
  const filteredBrandList = useMemo(() => {
    if (!brandSearchTerm.trim()) return allBrands;
    const q = brandSearchTerm.toLowerCase();
    return allBrands.filter((b) => b.name.toLowerCase().includes(q));
  }, [allBrands, brandSearchTerm]);

  // Trigger smooth skeleton shimmer & reset pagination when filters change
  useEffect(() => {
    setIsFiltering(true);
    setVisibleCount(12);
    const timer = setTimeout(() => setIsFiltering(false), 200);
    return () => clearTimeout(timer);
  }, [selectedCategories, selectedBrands, priceRange, minRating, onlyInStock, onlySale, sortBy, searchQuery]);

  // Sync activeCategory from store if changed externally
  useEffect(() => {
    if (activeCategory !== 'all') {
      setSelectedCategories([activeCategory]);
    }
  }, [activeCategory]);

  // Sync activeBrand from store if changed externally
  useEffect(() => {
    if (activeBrand !== 'all') {
      setSelectedBrands([activeBrand]);
    } else {
      setSelectedBrands([]);
    }
  }, [activeBrand]);

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

  // Handle brand checkbox
  const toggleBrand = (brandName) => {
    if (selectedBrands.includes(brandName)) {
      const next = selectedBrands.filter((b) => b !== brandName);
      setSelectedBrands(next);
      setActiveBrand(next.length === 1 ? next[0] : 'all');
    } else {
      const next = [...selectedBrands, brandName];
      setSelectedBrands(next);
      setActiveBrand(next.length === 1 ? next[0] : 'all');
    }
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setActiveCategory('all');
    setSelectedBrands([]);
    setActiveBrand('all');
    setBrandSearchTerm('');
    setPriceRange(500);
    setMinRating(0);
    setOnlyInStock(false);
    setOnlySale(false);
    setSearchQuery('');
    setVisibleCount(12);
  };

  // Active filter count
  const activeFilterCount = (selectedCategories.length > 0 ? selectedCategories.length : 0) +
    (selectedBrands.length > 0 ? selectedBrands.length : 0) +
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
      // Brand filter
      if (selectedBrands.length > 0 && (!prod.brand || !selectedBrands.includes(prod.brand.trim()))) {
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
      if (onlySale && !prod.isSale && !(prod.originalPrice && Number(prod.originalPrice) > Number(prod.price))) {
        return false;
      }
      // Search filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matches = prod.name.toLowerCase().includes(q) ||
          prod.categoryName?.toLowerCase().includes(q) ||
          (prod.brand && prod.brand.toLowerCase().includes(q)) ||
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
  }, [products, selectedCategories, selectedBrands, priceRange, minRating, onlyInStock, onlySale, searchQuery, sortBy]);

  // Paginated slice
  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  // Page header title computation
  const bannerHeadline = useMemo(() => {
    if (selectedBrands.length === 1 && selectedCategories.length === 0) {
      return `${selectedBrands[0]} Collection`;
    }
    if (selectedCategories.length === 1 && selectedBrands.length === 0) {
      const cObj = categories.find(c => c.id === selectedCategories[0]);
      return cObj?.name || 'Category Catalog';
    }
    if (selectedBrands.length > 0 && selectedCategories.length > 0) {
      return 'Filtered Catalog';
    }
    return 'All Products Catalog';
  }, [selectedBrands, selectedCategories]);

  return (
    <div className="shop-page-wrapper">
      {/* Header Banner */}
      <div className="shop-header-banner">
        <div className="container">
          <div style={{ maxWidth: '640px' }}>
            <span className="shop-banner-tag">
              {selectedBrands.length === 1 ? (
                <>
                  <ShieldCheck size={14} color="#7c3aed" />
                  <span>Official Brand Store • 100% Authentic</span>
                </>
              ) : (
                <span>Curated K-Beauty & Skincare</span>
              )}
            </span>
            <h1 className="shop-banner-title">
              {bannerHeadline}
            </h1>
            <p className="shop-banner-desc">
              {selectedBrands.length === 1 
                ? `Discover genuine ${selectedBrands[0]} formulas with verified batch codes, authentic packaging, and express delivery.`
                : 'Explore our complete collection of Korean sunscreen sticks, gentle foaming cleansers, barrier repair ampoules, and value sets.'
              }
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '24px 20px 60px 20px' }}>
        <div className="shop-main-layout">
          {/* Left Column: Sidebar Filters */}
          <aside className={`shop-sidebar ${mobileFilterOpen ? 'mobile-open' : ''}`}>
            {/* Mobile Sidebar Header */}
            <div className="sidebar-mobile-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <SlidersHorizontal size={18} />
                <h3 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>Filter Products</h3>
              </div>
              <button 
                className="sidebar-close-btn" 
                onClick={() => setMobileFilterOpen(false)}
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>

            {/* Sticky Reset Filter Header */}
            <div className="filter-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Filter size={16} />
                <span style={{ fontWeight: '700', fontSize: '14px' }}>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="active-filter-badge">{activeFilterCount}</span>
                )}
              </div>
              {activeFilterCount > 0 && (
                <button className="reset-filter-btn" onClick={handleResetFilters}>
                  <RotateCcw size={12} />
                  <span>Reset</span>
                </button>
              )}
            </div>

            <div className="sidebar-body-scroll">
              {/* Brand Filter with Search */}
              <div className="filter-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h4 className="filter-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Award size={15} color="#7c3aed" />
                    <span>Brands</span>
                  </h4>
                  {selectedBrands.length > 0 && (
                    <button 
                      onClick={() => { setSelectedBrands([]); setActiveBrand('all'); }} 
                      className="filter-clear-btn"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Brand Search Input */}
                {allBrands.length > 5 && (
                  <div className="sidebar-search-box">
                    <Search size={13} color="var(--color-text-light, #9ca3af)" />
                    <input 
                      type="text" 
                      placeholder="Search brands..." 
                      value={brandSearchTerm}
                      onChange={(e) => setBrandSearchTerm(e.target.value)}
                    />
                    {brandSearchTerm && (
                      <button onClick={() => setBrandSearchTerm('')} style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', color: '#9ca3af' }}>
                        <X size={12} />
                      </button>
                    )}
                  </div>
                )}

                <div className="filter-checkbox-list" style={{ maxHeight: '180px', overflowY: 'auto' }}>
                  {filteredBrandList.map((b) => (
                    <label key={b.name} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(b.name)}
                        onChange={() => toggleBrand(b.name)}
                      />
                      <span className="checkbox-custom" />
                      <span className="label-text" style={{ flex: 1, fontWeight: selectedBrands.includes(b.name) ? '700' : '400' }}>
                        {b.name}
                      </span>
                      <span className="checkbox-count">
                        {b.count}
                      </span>
                    </label>
                  ))}
                  {filteredBrandList.length === 0 && (
                    <p style={{ fontSize: '12px', color: '#9ca3af', padding: '6px 0' }}>No matching brands</p>
                  )}
                </div>
              </div>

              {/* Category Filter */}
              <div className="filter-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h4 className="filter-title" style={{ margin: 0 }}>Categories</h4>
                  {selectedCategories.length > 0 && (
                    <button 
                      onClick={() => { setSelectedCategories([]); setActiveCategory('all'); }} 
                      className="filter-clear-btn"
                    >
                      Clear
                    </button>
                  )}
                </div>

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

              {/* Price Slider with Presets */}
              <div className="filter-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h4 className="filter-title" style={{ margin: 0 }}>Max Price</h4>
                  <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--color-text-primary, #111827)' }}>
                    {curr} {priceRange}
                  </span>
                </div>

                {/* Quick Price Preset Buttons */}
                <div className="price-presets-row">
                  {[
                    { label: 'All', val: 500 },
                    { label: `< 50`, val: 50 },
                    { label: `< 100`, val: 100 },
                    { label: `< 200`, val: 200 }
                  ].map((preset) => (
                    <button
                      key={preset.val}
                      type="button"
                      className={`price-preset-chip ${priceRange === preset.val ? 'active' : ''}`}
                      onClick={() => setPriceRange(preset.val)}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <input
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="shop-price-slider"
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-text-muted, #9ca3af)', marginTop: '4px' }}>
                  <span>{curr} 20</span>
                  <span>{curr} 250</span>
                  <span>{curr} 500+</span>
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
                      <span style={{ fontSize: '13px', color: minRating === r.value ? 'var(--color-text-primary, #111827)' : 'var(--color-text-secondary, #4b5563)', fontWeight: minRating === r.value ? '600' : '400' }}>
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
                    <span className="label-text">On Sale Deals Only</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Mobile Footer Apply Bar */}
            <div className="sidebar-mobile-footer">
              <button className="sidebar-mobile-reset-btn" onClick={handleResetFilters}>
                Reset
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

              <div className="shop-product-count" style={{ fontSize: '13.5px', color: 'var(--color-text-muted, #6b7280)' }}>
                Showing <strong>{Math.min(visibleCount, filteredProducts.length)}</strong> of {filteredProducts.length} products
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

                {/* Brand Chips */}
                {selectedBrands.map((bName) => (
                  <span key={bName} className="filter-chip brand-chip">
                    <Award size={11} />
                    <span>Brand: {bName}</span>
                    <button onClick={() => toggleBrand(bName)} aria-label="Remove brand filter">
                      <X size={11} />
                    </button>
                  </span>
                ))}

                {/* Category Chips */}
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
                    Under {curr} {priceRange}
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
            {isFiltering ? (
              <ProductGridSkeleton count={8} />
            ) : filteredProducts.length === 0 ? (
              <div className="empty-catalog-state">
                <Search size={48} color="var(--color-text-light, #9ca3af)" />
                <h3>No products match your criteria</h3>
                <p>Try resetting filters or adjusting your brand and category options.</p>
                <button className="hero-cta-btn" onClick={handleResetFilters} style={{ marginTop: '16px' }}>
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div className={`products-grid ${viewLayout === 'list' ? 'products-list-layout' : ''}`}>
                  {displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load More Pagination */}
                {displayedProducts.length < filteredProducts.length && (
                  <div className="catalog-load-more-box">
                    <div className="load-more-progress-text">
                      Showing <strong>{displayedProducts.length}</strong> of <strong>{filteredProducts.length}</strong> products
                    </div>
                    <div className="load-more-progress-bar">
                      <div 
                        className="load-more-progress-fill" 
                        style={{ width: `${(displayedProducts.length / filteredProducts.length) * 100}%` }}
                      />
                    </div>
                    <button
                      className="load-more-btn"
                      onClick={() => setVisibleCount((prev) => prev + 12)}
                    >
                      <span>Load More Products</span>
                      <ChevronDown size={15} />
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
