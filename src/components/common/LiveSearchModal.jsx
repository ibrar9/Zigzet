import React, { useState, useEffect, useRef } from 'react';
import { X, Search, ShoppingCart, ArrowRight, Sparkles, Star, TrendingUp } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { categories } from '../../data/categories';

export const LiveSearchModal = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    searchQuery, 
    setSearchQuery, 
    products, 
    setQuickViewProduct,
    addToCart,
    settings,
    showToast
  } = useStore();

  const [selectedCatFilter, setSelectedCatFilter] = useState('all');
  const inputRef = useRef(null);

  const curr = settings?.currency || 'AED';

  // Auto focus input on modal open
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const popularTags = ['Sunscreen', 'Serum', 'Cleanser', 'Centella', 'Moisturizer', 'Mask'];

  const filteredProducts = products.filter((prod) => {
    if (prod.isActive === false) return false;
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery = query === '' || 
      prod.name.toLowerCase().includes(query) ||
      (prod.categoryName && prod.categoryName.toLowerCase().includes(query)) ||
      (prod.brand && prod.brand.toLowerCase().includes(query)) ||
      (prod.description && prod.description.toLowerCase().includes(query));

    const matchesCategory = selectedCatFilter === 'all' || prod.category === selectedCatFilter;

    return matchesQuery && matchesCategory;
  });

  const handleSelectProduct = (prod) => {
    setIsSearchOpen(false);
    setQuickViewProduct(prod);
  };

  const handleQuickAdd = (e, prod) => {
    e.stopPropagation();
    addToCart(prod, 1);
    showToast('Added to Bag', `${prod.name} has been added to your shopping bag.`);
  };

  const handleTagClick = (tag) => {
    setSearchQuery(tag);
    setSelectedCatFilter('all');
  };

  return (
    <div className="modal-overlay live-search-overlay open" onClick={() => setIsSearchOpen(false)}>
      <div 
        className="modal-box live-search-modal-box" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Bar */}
        <div className="live-search-header">
          <div className="live-search-input-wrap">
            <Search size={19} className="live-search-input-icon" />
            <input 
              ref={inputRef}
              type="text" 
              className="live-search-input-field"
              placeholder="Search Korean skincare, SPF50, serums..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off"
            />
            {searchQuery && (
              <button 
                className="live-search-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button 
            className="live-search-close-btn"
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Popular Trending Tags Strip */}
        <div className="live-search-tags-section">
          <div className="live-search-tags-row">
            <span className="live-search-tags-label">
              <TrendingUp size={13} />
              <span>Trending:</span>
            </span>
            {popularTags.map((tag) => (
              <button
                key={tag}
                className={`live-search-tag-chip ${searchQuery.toLowerCase() === tag.toLowerCase() ? 'active' : ''}`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="live-search-cats-row">
          <button
            onClick={() => setSelectedCatFilter('all')}
            className={`live-search-cat-pill ${selectedCatFilter === 'all' ? 'active' : ''}`}
          >
            All Items ({products.filter(p => p.isActive !== false).length})
          </button>
          {categories.map((c) => {
            const count = products.filter(p => p.category === c.id && p.isActive !== false).length;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCatFilter(c.id)}
                className={`live-search-cat-pill ${selectedCatFilter === c.id ? 'active' : ''}`}
              >
                {c.name} {count > 0 && <span className="cat-count-sub">({count})</span>}
              </button>
            );
          })}
        </div>

        {/* Search Results / Products Area */}
        <div className="live-search-results-list">
          {filteredProducts.length === 0 ? (
            <div className="live-search-empty-state">
              <Search size={44} strokeWidth={1.5} color="var(--color-text-light, #94a3b8)" />
              <h4>No products found</h4>
              <p>We couldn't find any products matching "{searchQuery}". Try searching for sunscreens, serums, or cleansers.</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '12px' }}>
                {popularTags.map(tag => (
                  <button
                    key={tag}
                    className="live-search-tag-chip"
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="live-search-grid">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="live-search-card"
                  onClick={() => handleSelectProduct(prod)}
                >
                  <div className="live-search-card-img-wrap">
                    <img src={prod.image} alt={prod.name} loading="lazy" />
                  </div>

                  <div className="live-search-card-info">
                    <div className="live-search-card-meta">
                      {prod.brand && (
                        <span className="live-search-brand-badge">{prod.brand}</span>
                      )}
                      <span className="live-search-cat-label">{prod.categoryName || prod.category}</span>
                    </div>

                    <h4 className="live-search-card-title">{prod.name}</h4>

                    <div className="live-search-card-rating">
                      <Star size={12} fill="#f59e0b" color="#f59e0b" />
                      <span>{prod.rating || '4.9'}</span>
                      {prod.reviewsCount && (
                        <span className="rating-count">({prod.reviewsCount})</span>
                      )}
                    </div>
                  </div>

                  <div className="live-search-card-action">
                    <div className="live-search-card-price">
                      <span className="current-price">{curr} {Number(prod.price).toFixed(2)}</span>
                      {prod.originalPrice && Number(prod.originalPrice) > Number(prod.price) && (
                        <span className="orig-price">{curr} {Number(prod.originalPrice).toFixed(2)}</span>
                      )}
                    </div>

                    <button
                      className="live-search-add-btn"
                      onClick={(e) => handleQuickAdd(e, prod)}
                      title="Add to Bag"
                      aria-label={`Add ${prod.name} to bag`}
                    >
                      <ShoppingCart size={15} />
                      <span className="add-text">Add</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

