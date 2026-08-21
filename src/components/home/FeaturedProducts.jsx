import React from 'react';
import { ArrowRight, FilterX } from 'lucide-react';
import { ProductCard } from '../common/ProductCard';
import { useStore } from '../../context/StoreContext';

export const FeaturedProducts = () => {
  const { products, activeCategory, setActiveCategory } = useStore();

  const displayedProducts = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <section className="featured-products-section" id="featured-products">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h2 className="section-title">Featured Products</h2>
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
                  padding: '4px 10px',
                  borderRadius: '9999px'
                }}
              >
                <FilterX size={12} />
                <span>Reset Filter</span>
              </button>
            )}
          </div>

          <span 
            className="view-all-link"
            onClick={() => setActiveCategory('all')}
          >
            <span>View All</span>
            <ArrowRight size={15} />
          </span>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {displayedProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#6b7280' }}>
            <p>No products found in this category.</p>
            <button
              onClick={() => setActiveCategory('all')}
              style={{
                marginTop: '12px',
                padding: '8px 18px',
                backgroundColor: '#111827',
                color: '#fff',
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: '600'
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
