import React from 'react';
import { ArrowRight, Sparkles, Layers } from 'lucide-react';
import { categories } from '../data/categories';
import { useStore } from '../context/StoreContext';

export const CategoriesPage = () => {
  const { products, navigatePage } = useStore();

  const handleExploreCategory = (catId) => {
    navigatePage('shop', catId);
  };

  return (
    <div className="categories-page-wrapper">
      {/* Header Banner */}
      <div className="shop-header-banner">
        <div className="container">
          <div style={{ maxWidth: '600px' }}>
            <span style={{ fontSize: '12.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6b7280' }}>
              Shop By Department
            </span>
            <h1 style={{ fontSize: '36px', fontWeight: '800', marginTop: '4px', marginBottom: '8px' }}>
              All Departments &amp; Categories
            </h1>
            <p style={{ color: '#4b5563', fontSize: '14.5px' }}>
              Discover curated departments designed for your modern lifestyle. Fast shipping across all departments.
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container" style={{ padding: '40px 20px 70px 20px' }}>
        <div className="category-directory-grid">
          {categories.map((cat) => {
            const dynamicCount = products.filter((p) => p.isActive !== false && p.category === cat.id).length;
            const countLabel = `${dynamicCount} Product${dynamicCount === 1 ? '' : 's'}`;

            return (
              <div 
                key={cat.id} 
                className="category-directory-card"
                onClick={() => handleExploreCategory(cat.id)}
              >
                <div className="category-banner-image">
                  <img src={cat.image} alt={cat.name} loading="lazy" />
                  <div className="category-overlay-badge">
                    {countLabel}
                  </div>
                </div>

                <div className="category-directory-info">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#111827' }}>
                      {cat.name}
                    </h3>
                    <div className="category-arrow-circle">
                      <ArrowRight size={16} />
                    </div>
                  </div>

                  <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '14px', lineHeight: '1.4' }}>
                    Explore top-rated {cat.name.toLowerCase()} selected for quality, durability, and value.
                  </p>

                  <div className="category-subtags-row">
                    <span className="category-subtag">Bestsellers</span>
                    <span className="category-subtag">New Arrivals</span>
                    <span className="category-subtag">Deals</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
