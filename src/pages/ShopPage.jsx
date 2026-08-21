import React, { useState, useMemo } from 'react';
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
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { categories } from '../data/categories';
import { ProductCard } from '../components/common/ProductCard';

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

  // Filter & Sort computation
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
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

      <div className="container" style={{ padding: '32px 20px 60px 20px' }}>
        <div className="shop-main-layout">
          {/* Left Sidebar Filters */}
          <aside className={`shop-sidebar ${mobileFilterOpen ? 'mobile-open' : ''}`}>
            <div className="sidebar-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', fontSize: '16px' }}>
                <SlidersHorizontal size={18} />
                <span>Filters</span>
              </div>
              <button 
                onClick={handleResetFilters}
                style={{ fontSize: '12px', fontWeight: '600', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <RotateCcw size={12} />
                <span>Reset All</span>
              </button>
            </div>

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
                  { label: '4.5★ & Above', value: 4.5 },
                  { label: '4.0★ & Above', value: 4.0 },
                  { label: '3.5★ & Above', value: 3.5 }
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
          </aside>

          {/* Right Column: Catalog Grid */}
          <main className="shop-content">
            {/* Top Toolbar */}
            <div className="shop-toolbar">
              <div style={{ fontSize: '13.5px', color: '#6b7280' }}>
                Showing <strong>{filteredProducts.length}</strong> of {products.length} products
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {/* Sort Dropdown */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                  <span style={{ color: '#6b7280' }}>Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      fontSize: '13px',
                      fontWeight: '600',
                      backgroundColor: '#ffffff',
                      outline: 'none'
                    }}
                  >
                    <option value="featured">Featured Deals</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="name">Product Name (A-Z)</option>
                  </select>
                </div>

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
