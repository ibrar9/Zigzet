import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, FilterX, Sparkles, ChevronDown, Check } from 'lucide-react';
import { ProductCard } from '../common/ProductCard';
import { ProductGridSkeleton } from '../common/Skeleton';
import { useStore } from '../../context/StoreContext';
import { categories } from '../../data/categories';

const INITIAL_BATCH_SIZE = 8;
const LOAD_MORE_STEP = 8;

export const FeaturedProducts = () => {
  const { products, activeCategory, setActiveCategory, navigatePage } = useStore();
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const observerTarget = useRef(null);

  // Reset pagination when category changes
  useEffect(() => {
    setIsSwitching(true);
    setVisibleCount(INITIAL_BATCH_SIZE);
    const timer = setTimeout(() => setIsSwitching(false), 200);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  const activeProducts = products.filter((p) => p.isActive !== false);

  const filteredProducts = activeCategory === 'all'
    ? activeProducts
    : activeProducts.filter((p) => p.category === activeCategory);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + LOAD_MORE_STEP, filteredProducts.length));
      setIsLoadingMore(false);
    }, 450);
  }, [isLoadingMore, hasMore, filteredProducts.length]);

  // Infinite Scroll via Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore && !isSwitching) {
          handleLoadMore();
        }
      },
      { threshold: 0.2, rootMargin: '120px' }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [handleLoadMore, hasMore, isLoadingMore, isSwitching]);

  const progressPercent = Math.min(100, Math.round((displayedProducts.length / Math.max(1, filteredProducts.length)) * 100));

  return (
    <section className="featured-products-section" id="featured-products">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="product-brand-tag" style={{ margin: 0, fontSize: '11.5px', color: '#7c3aed' }}>
                ⭐ Curated K-Beauty Collection
              </span>
            </div>
            <h2 className="section-title">Trending & Best Sellers</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {activeCategory !== 'all' && (
              <button
                onClick={() => setActiveCategory('all')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#ef4444',
                  backgroundColor: '#fee2e2',
                  padding: '4px 12px',
                  borderRadius: '9999px'
                }}
              >
                <FilterX size={12} />
                <span>Reset Filter</span>
              </button>
            )}

            <span 
              className="view-all-link"
              onClick={() => navigatePage('shop')}
            >
              <span>Explore All ({activeProducts.length})</span>
              <ArrowRight size={15} />
            </span>
          </div>
        </div>

        {/* Quick Category Filter Pills */}
        <div className="home-filter-pills-row">
          <button
            className={`home-filter-pill ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            <Sparkles size={13} />
            <span>All Products ({activeProducts.length})</span>
          </button>

          {categories.map((cat) => {
            const count = activeProducts.filter((p) => p.category === cat.id).length;
            if (count === 0) return null;
            return (
              <button
                key={cat.id}
                className={`home-filter-pill ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.name}</span>
                <span style={{ fontSize: '11px', opacity: 0.8 }}>({count})</span>
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        {isSwitching ? (
          <ProductGridSkeleton count={8} />
        ) : (
          <div className="products-grid">
            {displayedProducts.map((product, idx) => (
              <div 
                key={product.id} 
                className="product-card-animated"
                style={{ animationDelay: `${(idx % 8) * 0.05}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* Loading Shimmer Skeleton when scrolling down */}
        {isLoadingMore && (
          <div style={{ marginTop: '20px' }}>
            <ProductGridSkeleton count={4} />
          </div>
        )}

        {/* Observer Trigger Element */}
        <div ref={observerTarget} style={{ height: '20px', margin: '10px 0' }} />

        {/* Progressive Scroll Progress Bar & Manual Load Button */}
        {filteredProducts.length > 0 && !isSwitching && (
          <div className="home-scroll-loader-container">
            <div className="home-progress-indicator">
              <span>Showing {displayedProducts.length} of {filteredProducts.length} K-Beauty Products</span>
              <div className="home-progress-track">
                <div className="home-progress-fill" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>

            {hasMore ? (
              <button 
                className="home-load-more-btn"
                onClick={handleLoadMore}
                disabled={isLoadingMore}
              >
                <ChevronDown size={16} />
                <span>{isLoadingMore ? 'Loading Next Batch...' : 'Scroll or Click to Load More'}</span>
              </button>
            ) : (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 18px',
                borderRadius: '9999px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                fontSize: '12.5px',
                color: '#64748b',
                fontWeight: '600'
              }}>
                <Check size={14} color="#10b981" />
                <span>You've explored all {filteredProducts.length} products in this collection!</span>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && !isSwitching && (
          <div style={{ textAlign: 'center', padding: '54px 0', color: '#6b7280' }}>
            <p style={{ fontSize: '15px', fontWeight: '600' }}>No products found in this category.</p>
            <button
              onClick={() => setActiveCategory('all')}
              style={{
                marginTop: '14px',
                padding: '10px 22px',
                backgroundColor: '#0f172a',
                color: '#fff',
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: '700'
              }}
            >
              Show All Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
